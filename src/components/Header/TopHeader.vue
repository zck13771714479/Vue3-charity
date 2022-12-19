<script setup lang="ts">
import { reactive, ref } from "@vue/reactivity";
import { useHomeStore } from "@/store/home";
import { stringifyQuery, useRoute, useRouter } from "vue-router";
import { getCurrentInstance, inject, watch } from "@vue/runtime-core";
import { message } from "ant-design-vue";
import { useDetailStore } from "../../store/details";
const store = useHomeStore();
const router = useRouter();
const route = useRoute();
const keyword = ref<string>(""); //输入搜索的关键词
const inputFlag = ref<boolean>(false); //是否展示输入列表推荐结果
const charityList = reactive<string[]>([]); //慈善机构名字列表
const searchList = reactive<string[]>([]); //搜索结果匹配列表
const { bus } = getCurrentInstance()!.appContext.config.globalProperties;
const detailStore = useDetailStore();
type rank = {
  rank: number;
  id: number;
  name: string;
  kind: string;
  rate: number;
};
//通过慈善机构排名数据获取机构名字列表
store.getRank().then(() => {
  store.rankList.forEach((item: rank) => {
    charityList.push(item.name);
  });
});

//自定义简单模糊匹配规则
function matchSearch(ipt: string, pattern: string): boolean {
  ipt = ipt.replaceAll("[-_s]", "").toLowerCase();
  pattern = pattern.replaceAll("[-_s]", "").toLowerCase();
  return pattern.indexOf(ipt) !== -1;
}
//输入关键词后的回调
function inputKeyword() {
  searchList.splice(0, searchList.length); //每次输入都清空搜索数组,重新赋值
  let ipt = keyword.value.trim();
  if (ipt == "") {
    inputFlag.value = false;
  }
  inputFlag.value = charityList.some((charityName: string) => {
    return ipt !== "" && matchSearch(ipt, charityName);
  });
  let count = 0; //最多只显示3个提示，不要过多的联想
  charityList.forEach((charityName: string) => {
    if (ipt !== "" && matchSearch(ipt, charityName) && count < 3) {
      count++;
      searchList.push(charityName);
    }
  });
}
//点击推荐选择输入,联想功能
function clickChoose(name: string) {
  keyword.value = name;
  inputFlag.value = false;
  let tmp = searchList.filter((item: string) => {
    return item == name;
  });
  searchList.splice(0, searchList.length);
  searchList.push(...tmp);
}
//点击搜索按钮的回调
function searchCharity() {
  sessionStorage.removeItem("storeSearchList"); //先清空仓库中的列表
  if (keyword.value.trim() == "") {
    message.warning("请输入内容");
    return;
  }
  if (searchList.length == 1) {
    keyword.value = "";
    router.push({
      name: "Details",
      params: {
        keyword: searchList[0],
      },
    });
    searchList.splice(0, searchList.length);
  } else {
    let sessionSearchList = JSON.stringify(searchList);
    sessionStorage.setItem("storeSearchList", sessionSearchList);
    detailStore.searchList = JSON.parse(sessionStorage.getItem('storeSearchList') as string)
    router.push({
      name: "Search404",
      params: {
        keyword: keyword.value,
      },
    });
  }
  keyword.value = "";
}
</script>

<template>
  <div id="header-container">
    <ul class="header_ul">
      <li>
        <router-link to="/home">首页</router-link>
      </li>
      <li>
        <a href="javascript:;">捐款流向</a>
      </li>
      <li id="charity-search">
        <a-input-search
          class="search"
          v-model:value="keyword"
          placeholder="请输入您想搜索的慈善机构"
          enter-button
          @input="inputKeyword"
          @search="searchCharity"
          @focus="inputFlag = true"
          @blur="inputFlag = false"
        />
        <div class="search-tip" v-show="inputFlag">
          <ul class="search_list">
            <!-- mousedown会在blur前触发,用click直接blur不会触发 -->
            <li
              class="search_list_item"
              @mousedown="clickChoose(name)"
              v-for="(name, index) in searchList"
              :key="index"
            >
              {{ name }}
            </li>
          </ul>
        </div>
      </li>
      <li id="login-register">
        <a href="javascript:;">登录</a>
        <a href="javascript:;">注册</a>
      </li>
    </ul>
  </div>
</template>


<style lang="less" scoped>
@container-height: 40px;
* {
  padding: 0;
  margin: 0;
}
#header-container {
  width: 100%;
  height: @container-height;
  background-color: #eee;
  .header_ul {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    li {
      flex: 1;
      width: 100%;
      height: 100%;
      line-height: @container-height;
      text-align: center;
      .search-tip {
        position: relative;
        top: -8px;
        width: 100%;

        background-color: #eee;
        z-index: 999;
        .search_list {
          .search_list_item {
            height: 40px;
            line-height: 40px;
            text-indent: 5px;
            text-align: left;
            cursor: pointer;
            &:hover {
              background-color: #abdcff;
            }
          }
        }
      }
      a {
        display: block;
        width: 100%;
        height: 100%;
        color: #606266;
        &:hover {
          background: linear-gradient(to right, #f0ff00, #58cffb);
        }
      }
    }
    #login-register {
      display: flex;
      flex: 1;
      a {
        display: block;
        width: 50%;
      }
    }
    #charity-search {
      padding-top: 5px;
    }
  }
}
</style>