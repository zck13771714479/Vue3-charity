<script setup lang="ts">
import type { TreeProps } from "ant-design-vue";
import { defineComponent, reactive, ref, watch } from "vue";
import { useHomeStore } from "@/store/home";
import type { commonService } from "@/store/home";

const store = useHomeStore();
const serviceArr = reactive<commonService[]>([]);
const treeData: TreeProps["treeData"] = reactive([]);
const expandedKeys = ref<string[]>([]); //展开树形组件
store.getCharts().then(() => {
  serviceArr.push(...store.commonService);
  serviceArr.forEach((item: commonService) => {
    treeData.push({
      key: item.id,
      title: item.title,
      children: [{ key: `${item.id}-1`, title: item.detail }],
    });
    expandedKeys.value.push(item.id);
  });
});
</script>

<template>
  <div class="tree">
    <a-tree :tree-data="treeData"  v-model:expandedKeys="expandedKeys"> </a-tree>
  </div>
</template>


<style lang="less" scoped>
.tree {
  width: 100%;
  height: 400px;
}
</style>