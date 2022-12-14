<script setup lang="ts">
import { useHomeStore } from "@/store/home";
import type { charityParticipation } from "@/store/home";
import { onMounted, reactive, ref } from "@vue/runtime-core";
import * as echarts from "echarts";

const store = useHomeStore();
const charts = ref<HTMLElement>();
const data: number[] = reactive([]);
const Xaxis: string[] = reactive([]);
const options = {
  title: {
    text: "各国民众慈善参与度",
    left: "center",
  },
  tooltip: {
    show: true,
  },
  xAxis: {
    type: "category",
    data: Xaxis,
    axisTick: {
      show: false,
    },
    axisLabel: {
      interval: 0,
      //文字竖过来显示，其实就是给每个字加换行
      formatter: function (value: string) {
        return value.split("").join("\n");
      },
    },
  },
  yAxis: {
    type: "value",
    axisLabel: {
      formatter: function (value: string) {
        return value + "%";
      },
    },
  },
  series: [
    {
      data,
      type: "bar",
      showBackground: true,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "#FDD819" },
          { offset: 0.5, color: "#DE4313" },
          { offset: 1, color: "#E80505" },
        ]),
      },
    },
  ],
};
onMounted(() => {
  store.getCharts().then(() => {
    data.push(...store.charityParticipation.data);
    Xaxis.push(...store.charityParticipation.Xaxis);
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
