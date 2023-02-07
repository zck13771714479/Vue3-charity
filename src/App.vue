<script setup lang="ts">
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/user";
const router = useRouter();
const store = useUserStore();
router.beforeEach((to, from) => {
  if (!store.isLogin) {
    //未登录状态
    if (to.name == "Donate") {
      message.warn("请先登录");
      return router.push(`/login?redirect=${to.path}`);
    }
  } else {
    //已登录状态
    if (to.name == "Login" || to.name == "Register") {
      return false;
    }
  }
});
const title = "慈善追踪网";
router.afterEach((to, from) => {
  document.title = title + "-" + to.meta.title;
});
</script>

<template>
  <div id="app-container">
    <top-header />
    <router-view> </router-view>
  </div>
</template>

<style lang="less">
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  a {
    text-decoration: none;
  }
  ul {
    list-style: none;
  }
}
#app-container {
  width: 100%;
  height: 100%;
}
</style>
