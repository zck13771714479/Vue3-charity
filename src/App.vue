<script setup lang="ts">
import "animate.css";

</script>

<template>
  <div id="app-container">
    <router-view v-slot="{ Component }">
      <transition
        appear
        name="animate__animated animate__bounce"
        enter-active-class="animate__bounceInUp"
        leave-active-class="animate__backOutUp"
      >
        <component :is="Component" />
      </transition>
    </router-view>
    
  </div>

</template>

<style lang="less">
body{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  a{
    text-decoration: none;
  }
  ul{
    list-style: none;
  }
}
#app-container {
  width: 100%;
  height: 100%;
}
</style>
