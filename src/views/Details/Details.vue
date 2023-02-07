<script setup lang="ts">
import { useDetailStore } from "@/store/details";
import { reactive, ref, nextTick, watch, onMounted } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
//处理点击锚点后正常的锚点链接跳转
type link = {
  href: string;
  title: string;
};
function anchorClickHandler(e: Event, link: link): void {
  e.preventDefault(); //阻止antd锚点的默认跳转
  let element = document.querySelector(link.href); //link.href带#号
  element!.scrollIntoView({ block: "start", behavior: "smooth" });
}
//内容动态展示
const store = useDetailStore();
const route = useRoute();
//防止同一路由下不同params参数不跳转
watch(route, (to, from) => {
  getData(to.params.keyword as string);
});

type charityDetails = {
  id: number;
  name: string;
  logo: string;
  link: string;
  introduction: string;
  [propName: string]: any;
};
let details = ref<charityDetails>({
  id: 0,
  name: "",
  logo: "",
  link: "",
  introduction: "",
});
type infoType = {
  [propName: string]: string[];
};
let info = reactive<infoType[]>([]);
//分割段落
function splitParagraph(text: string): string[] {
  return text.split("\n");
}
//将title首字母大写
function convertTitle(infoObj: infoType | string): string {
  if (typeof infoObj !== "string") {
    let key = Object.keys(infoObj)[0].trim();
    return key.replace(key[0], key[0].toUpperCase());
  } else {
    return infoObj.replace(infoObj[0], infoObj[0].toUpperCase());
  }
}
//从仓库中获取数据
function getData(keyword: string) {
  store.getDetails(keyword).then(() => {
    details.value = store.details;
    details.value.introductionSplit = splitParagraph(
      details.value.introduction
    );
    info.splice(0, info.length);
    for (let key in details.value) {
      if (
        !["id", "name", "logo", "link", "introduction", "tag"].includes(key)
      ) {
        info.push({ [key]: splitParagraph(details.value[key]) });
      }
    }
  });
}
getData(route.params.keyword as string);
//跳转至捐款流向路由
function toDonate(name: string, id: number): void {
  router.push({
    name: "Donate",
    params: {
      id,
      name,
    },
  });
}
</script>

<template>
  
  <div class="container" ref="container">
    <a-anchor class="anchor" @click="anchorClickHandler">
      <a-anchor-link href="#introduction" title="Introduction" />
      <a-anchor-link
        :href="`#${Object.keys(infoObj)[0].replaceAll(' ', '-')}`"
        :title="convertTitle(infoObj)"
        v-for="(infoObj, index) in info"
        :key="index"
      />
    </a-anchor>
    <div class="content">
      <div class="title">
        {{ details.name }}
        <a-button
          size="large"
          type="primary"
          style="border-radius: 10px"
          @click="toDonate(route.params.keyword, details.id)"
        >
          <template #icon><arrow-right-outlined /> </template>
          查看捐款流向
        </a-button>
      </div>
      <div id="introduction">
        <div class="logo">
          <img :src="details.logo" alt="logo" />
          <div class="tag">
            <ul class="key">
              <li v-for="(key, index) in Object.keys(details.tag)" :key="index">
                {{ convertTitle(key) }}
              </li>
            </ul>
            <ul class="value">
              <li
                v-for="(value, index) in Object.values(details.tag)"
                :key="index"
              >
                {{ value }}
              </li>
            </ul>
          </div>
        </div>
        <div class="details">
          <p
            v-for="(paragraph, index) in details.introductionSplit"
            :key="index"
          >
            {{ paragraph }}
          </p>
          <p>
            了解更多点击
            <a :href="details.link">维基百科</a>
          </p>
        </div>
      </div>
      <div
        class="wiki"
        :id="Object.keys(infoObj)[0].replaceAll(' ', '-')"
        v-for="(infoObj, index) in info"
        :key="index"
      >
        <div class="title">{{ convertTitle(infoObj) }}</div>
        <p v-for="(paragraph, index) in Object.values(infoObj)[0]" :key="index">
          {{ paragraph }}
        </p>
      </div>
    </div>
  </div>
</template>



<style lang="less" scoped>
@introHeight: 430px;
@imgHeight: 300px;
@anchorWidth: 140px;
* {
  padding: 0;
  margin: 0;
}
.container {
  position: relative;
  .anchor {
    display: block;
    position: fixed;
    width: @anchorWidth;
  }
  .content {
    position: absolute;
    left: @anchorWidth;
    margin: 10px 10px;
    .title {
      width: 100%;
      height: 50px;
      border-bottom: 1px solid #000;
      font-size: 24px;
      margin: 20px 0;
      font-weight: 500;
    }
    #introduction {
      height: @introHeight;
      margin-bottom: 20px;
      .logo {
        float: left;
        width: 400px;
        border: 1px solid #000;

        img {
          width: 100%;
          padding: 20px;
          height: @imgHeight;
        }
        .tag {
          display: flex;
          justify-content: space-around;
          .key li {
            width: 50px;
            text-align: left;
            font-weight: 700;
          }
          .value li {
            width: 150px;
            text-align: left;
          }
        }
      }
      .details {
        margin-left: 30px;
        p {
          width: 100%;
          font-size: 16px;
        }
      }
    }
    .wiki {
      margin-bottom: 20px;
      width: 90%;
    }
  }
}
</style>