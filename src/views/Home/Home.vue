<script setup lang="ts">
import { onMounted, reactive, ref, toRefs } from "@vue/runtime-core";
import { useHomeStore } from "@/store/home";
import { useRouter } from "vue-router";
import Charts from "./Charts.vue";


const store = useHomeStore();
const router = useRouter();
const result = reactive({
  imgList: [],
  rankList: [],
});
let { imgList, rankList } = toRefs(result);
//获取轮播图数据
store
  .getCarousel()
  .then(() => {
    imgList.value = store.imgList;
  })
  .catch((error: Error) => {
    console.log(error.message);
  });
//获取排名数据
store
  .getRank()
  .then(() => {
    rankList.value = store.rankList;
  })
  .catch((error: Error) => {
    console.log(error.message);
  });

//排名表格形式
const rankColumns = [
  {
    title: "排名",
    dataIndex: "rank",
    key: "rank",
    width: 60,
    align: "center",
  },
  {
    title: "慈善机构",
    dataIndex: "name",
    key: "name",
    width: 235,
  },
  {
    title: "服务方向",
    dataIndex: "kind",
    key: "kind",
    width: 135,
  },
  {
    title: "声誉评分",
    dataIndex: "rate",
    key: "rate",
    with: 60,
    align: "center",
  },
];

//跳转到指定路由
function getChaityName(text: string) {
  router.push({
    name: "Details",
    params: {
      keyword: text,
    },
  });
}

</script>

<template>
  <!-- 慈善机构排名 -->
  <div class="first-level">
    <div id="ranks">
      <a-table
        :columns="rankColumns"
        :data-source="rankList"
        :pagination="false"
        bordered
      >
        <template #bodyCell="{ column, text }">
          <template v-if="column.dataIndex === 'name'">
            <a @click="getChaityName(text)">{{ text }}</a>
          </template>
        </template>
        <template #title>
          <div style="text-align: center">慈善机构声誉评分排名</div>
        </template>
      </a-table>
    </div>
    <!-- 轮播图 -->
    <div class="carousel-container">
      <a-carousel arrows autoplay>
        <template #prevArrow>
          <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
            <left-circle-outlined />
          </div>
        </template>
        <template #nextArrow>
          <div class="custom-slick-arrow" style="right: 10px">
            <right-circle-outlined />
          </div>
        </template>
        <div class="carousel" v-for="img in imgList" :key="img.id">
          <img :src="img.url" alt="" />
        </div>
      </a-carousel>
    </div>
  </div>
  <Charts />
  <About />
</template>



<style lang="less" scoped>
.first-level {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 430px;
  margin-top: 10px;
  /deep/ .ant-table-tbody {
    > tr:hover:not(.ant-table-expanded-row) > td,
    .ant-table-row-hover,
    .ant-table-row-hover > td {
      background: #fff886 !important;
      //设置table鼠标移入时的背景色
    }
  }
  .carousel-container {
    width: 500px;
    flex: 1;
    .ant-carousel :deep(.slick-slide) {
      text-align: center;
      height: 430px;
      line-height: 460px;
      background: #364d79;
      overflow: hidden;
    }
    .ant-carousel :deep(.slick-arrow.custom-slick-arrow) {
      width: 25px;
      height: 25px;
      font-size: 25px;
      color: #fff;
      background-color: rgba(31, 45, 61, 0.11);
      opacity: 0.3;
      z-index: 1;
    }
    .ant-carousel :deep(.custom-slick-arrow:before) {
      display: none;
    }
    .ant-carousel :deep(.custom-slick-arrow:hover) {
      opacity: 0.5;
    }

    .ant-carousel :deep(.slick-slide h3) {
      color: #fff;
    }
    .carousel {
      height: 500px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>