<script setup lang="ts">
import { useHomeStore } from "@/store/home";
import type { serviceProportion } from "@/store/home";
import { onMounted, reactive, ref } from "@vue/runtime-core";
import * as echarts from "echarts";

const store = useHomeStore();
const charts = ref<HTMLElement>();
onMounted(() => {
  const data: serviceProportion[] = reactive([]); //饼图要展示的数据
  // 获取饼图数据
  store.getCharts().then(() => {
    data.push(...store.serviceProportion);
    // echarts配置项
    const options = reactive({
      title: {
        text: "慈善服务种类占比",
        left: "center",
      },
      tooltip: {
        trigger: "item",
        formatter: "{b}<br/>{d}%",
      },
      legend: {
        top: "5%",
        left: "center",
      },
      series: [
        {
          name: "慈善服务分类",
          type: "pie",
          radius: ["50%", "70%"],
          // avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: true,
            position: "outside",
          },
          labelLine: {
            show: true,
          },
          data,
        },
      ],
    });
    //获取完数据再初始化echarts实例
    let echartsInstance = echarts.init(charts.value as HTMLElement);
    echartsInstance.setOption(options);
  });
});
</script>

<template>
  <div class="charts" ref="charts"></div>
</template>


<style lang="less" scoped>
.charts {
  width: 100%;
  height: 435px;
}
</style>