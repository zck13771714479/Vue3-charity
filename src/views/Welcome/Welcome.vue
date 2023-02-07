<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

//进入首页
function enterHome(): void {
  router.push("/home");
}
</script>

<template>
  <div class="welcome-container">
    <div id="welcome">
      <div class="charity-title">
        <h1>慈善追踪</h1>
        <h2>帮您找到的值得捐款的慈善机构</h2>
      </div>
      <div class="go-charity">
        <a-button class="enter-into" @click="enterHome">
          <template #icon><arrow-right-outlined /></template>
          点击进入
        </a-button>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.welcome-container {
  width: 100vw;
  height: 100vh;
  background: url(./images/charity1.jpg) no-repeat;
  background-size: 100%;
  #welcome {
    display: flex;
    margin: 0 auto;
    flex-direction: column;
    justify-content: space-around;
    width: 800px;
    height: 600px;
    text-align: center;
    .charity-title {
      h1 {
        font-size: 88px;
        font-weight: 700;
        text-shadow: 1px 1px 2px;
        color: #fff;
      }
      h2 {
        font-size: 36px;
        color: yellowgreen;
      }
    }
    .go-charity {
      display: flex;
      justify-content: space-around;
      .enter-into {
        width: 180px;
        height: 70px;
        border-radius: 35px;
        color: #fff;
        font-size: 16px;
        background: linear-gradient(to right, #43cbff, #9708cc);
      }
    }
  }
}
</style>