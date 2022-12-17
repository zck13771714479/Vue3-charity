<script setup lang="ts">
</script>

<template>
  <div id="app-container">
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
