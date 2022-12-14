<script setup lang="ts">
import { reactive } from "@vue/reactivity";
import ServicePieChart from "./ServicePieChart.vue";
import Tree from "./Tree.vue";
import BarChart from "./BarChart.vue";
</script>

<template>
  <div class="charts-container">
    <a-row :gutter="16">
      <a-col class="gutter-row" :span="8">
        <a-card style="width: 100%" hoverable>
          <ServicePieChart />
        </a-card>
      </a-col>
      <a-col class="gutter-row" :span="8">
        <a-card style="width: 100%" hoverable>
          <h3>常见的慈善服务</h3>
          <Tree />
        </a-card>
      </a-col>
      <a-col class="gutter-row" :span="8">
        <a-card style="width: 100%" hoverable>
          <BarChart />
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>



<style lang="less" scoped>
.charts-container {
  margin-top: 20px;
}
</style>