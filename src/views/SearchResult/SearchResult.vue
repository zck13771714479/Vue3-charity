<script setup lang="ts">
import { getCurrentInstance, reactive, ref } from "@vue/runtime-core";
import API from "@/request/index";
const { bus } = getCurrentInstance()!.appContext.config.globalProperties;
const searchList = reactive<string[]>([]);
const flag = ref<boolean>(false);

bus.on("matchSearch", (newList: string[]) => {
  console.log('newList',newList);
  
  searchList.splice(0,searchList.length);
  searchList.push(...newList);
  console.log('回调执行');
  getDetailList()  
  console.log('searchlist',searchList);
  

});

async function getDetailList(){
  let result = await API.mock.reqDetails(searchList); 
  console.log(result.data);
}


</script>

<template>
  <!-- <TopHeader /> -->
  <div class="main">
    <div class="main_title">关键词：s,搜索结果共4条</div>
    <ul class="main_content">
      <li>
        <img src="/images/save_the_children.png" alt="" />
        <div>
          <h3>save the children</h3>
          <span
            >The Save the Children Fund, commonly known as Save the Children, is
            an international non-governmental organization established in the
            United Kingdom in 1919 to improve the lives of children through
            better education, health care, and economic opportunities, as well
            as providing emergency aid in natural disasters, war, and other
            conflicts. After passing a century, which it celebrated in 2019, it
            is now a global movement made up of 30 national member organizations
            that work in 120 countries.\nHeadquartered in London, the
            organisation promotes policy changes to gain more rights for young
            people[4] especially by enforcing the UN Declaration of the Rights
            of the Child. Saving the Children through co-ordinate
            emergency-relief efforts, helping to protect children from the post
            effects of war and violence. Save the Children has a general
            consultative status in the United Nations Economic and Social
            Council.</span
          >
        </div>
      </li>
      <li>
        <img src="/images/save_the_children.png" alt="" />
        <div>
          <h3>save the children</h3>
          <span
            >The Save the Children Fund, commonly known as Save the Children, is
            an international non-governmental organization established in the
            United Kingdom in 1919 to improve the lives of children through
            better education, health care, and economic opportunities, as well
            as providing emergency aid in natural disasters, war, and other
            conflicts. After passing a century, which it celebrated in 2019, it
            is now a global movement made up of 30 national member organizations
            that work in 120 countries.\nHeadquartered in London, the
            organisation promotes policy changes to gain more rights for young
            people[4] especially by enforcing the UN Declaration of the Rights
            of the Child. Saving the Children through co-ordinate
            emergency-relief efforts, helping to protect children from the post
            effects of war and violence. Save the Children has a general
            consultative status in the United Nations Economic and Social
            Council.</span
          >
        </div>
      </li>
    </ul>
  </div>
</template>



<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;
}
.main {
  width: 1200px;
  height: 550px;
  background-color: #fff;
  margin: 10px auto;
  border: 1px solid;
  .main_title {
    text-indent: 15px;
    height: 50px;
    line-height: 50px;
    font-size: 24px;
    font-weight: 700;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
  }
  .main_content {
    width: 100%;
    li {
      height: 200px;
      border-bottom: 1px solid #ccc;
      margin-bottom: 20px;
    }
    img {
      float: left;
      width: 200px;
      height: 200px;
      margin-right: 20px;
    }
  }
}
</style>