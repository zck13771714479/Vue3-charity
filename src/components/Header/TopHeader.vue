<script setup lang="ts">
import { reactive, ref } from "@vue/reactivity";
const keyword = ref("");
</script>

<template>
  <div id="header-container">
    <ul>
      <li>
        <router-link to="/home">首页</router-link>
      </li>
      <li>
        <a href="javascript:;">捐款流向</a>
      </li>
      <li id="charity-search">
        <a-input-search
          class="search"
          v-model="keyword"
          placeholder="请输入您想搜索的慈善机构"
          enter-button
        />
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
#header-container {
  width: 100%;
  height: @container-height;
  background-color: #eee;
  ul {
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