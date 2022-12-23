<script setup lang="ts">
import { toRefs } from "vue";
const props = defineProps(["title", "text"]);
const { title,text} = toRefs(props);
</script>

<template>
  <a :title="title">
    <a-button v-bind="$attrs">{{text}}</a-button>
  </a>
</template>



<style>
</style>