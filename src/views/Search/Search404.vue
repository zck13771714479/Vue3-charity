<script setup lang='ts'>
import { useDetailStore } from "../../store/details";
import API from "@/request/index";
import { reactive, ref } from "@vue/reactivity";
import { useRoute } from "vue-router";
import { nextTick, watch } from "@vue/runtime-core";

const store = useDetailStore();
const route = useRoute();
//同路由跳转
watch(route, (to) => {
  if (to.name == "Search404") {
    getPossibleDetail();
  }
});
const keyword = ref<string>("");

type possibleDetailShow = {
  id: number;
  name: string;
  logo: string;
  introduction: string;
};
const possibleDetails = reactive<possibleDetailShow[]>([]); //搜索结果的细节，用于渲染数据
const isHaveResult = ref<boolean>(true); //用于检查是否有可能结果
//获取数据
async function getPossibleDetail() {
  const possible = store.searchList; //可能是搜索结果的列表
  possibleDetails.splice(0, possibleDetails.length);
  keyword.value = route.params.keyword as string;
  if (possible.length > 0) {
    isHaveResult.value = true;
  } else {
    isHaveResult.value = false;
    return;
  }
  //遍历多次发请求，性能有点低，但是联想列表最多只有3个元素，影响不大，后期可以从接口方面优化
  //多次请求会导致刷新页面乱序,但总结果不变
  possible.forEach(async (item: string) => {
    let result = await API.mock.reqDetails(item);
    if (result.status == 200) {
      let tmp: possibleDetailShow = {
        id: result.data.data.id,
        name: result.data.data.name,
        logo: result.data.data.logo,
        introduction: result.data.data.introduction,
      };
      possibleDetails.push(tmp);
    }
  });
}
getPossibleDetail();
</script>

<template>
  <div class="container">
    <div class="input-keyword" v-if="isHaveResult">
      您搜索的关键词是：“{{ keyword }}”，未能精确匹配结果，可能的结果如下：
    </div>
    <div class="input-keyword" v-else>
      您搜索的关键词是：“{{ keyword }}”，没有找到结果
    </div>
    <ul class="possible-list" v-if="isHaveResult">
      <li
        class="possible-list-item"
        v-for="item in possibleDetails"
        :key="item.id"
      >
        <div class="possible-logo">
          <img :src="item.logo" alt="" />
        </div>
        <div class="possible-content">
          <div class="possbile-name">
            <router-link :to="`/details/${item.name}`">{{
              item.name
            }}</router-link>
          </div>
          <div class="possbile-intr">{{ item.introduction }}</div>
        </div>
      </li>
    </ul>
    <div class="not-found" v-if="!isHaveResult">
      <img src="/images/no_search_result.jpg" alt="" />
      <h4>未能找到结果，请更换关键词</h4>
    </div>
  </div>
</template>



<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;
}

.container {
  width: 1200px;
  padding-top: 20px;
  margin: 0 auto;
  .input-keyword {
    font-size: 24px;
    border-bottom: 1px solid #ccc;
    font-weight: 700;
  }
  .possible-list {
    width: 100%;
    height: 150px;
    margin-top: 30px;
    .possible-list-item {
      display: flex;
      justify-content: space-around;
      border-bottom: 1px solid #ccc;
      .possible-logo {
        img {
          width: 150px;
          height: 150px;
        }
      }
      .possible-content {
        margin-left: 10px;
        overflow: hidden;
        .possible-name {
          font-size: 18px;
          font-weight: 600;
        }
        .possbile-intr{
          //多行文字省略显示
          margin-top: 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
  .not-found {
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 400px;
    margin: 0 auto;
    margin-top: 30px;
    opacity: 0.6;
  }
}
</style>