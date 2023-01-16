<script setup lang="ts">
import { reactive, ref } from "@vue/reactivity";
import dayjs, { Dayjs } from "dayjs";
import { useRoute } from "vue-router";
import { useDonateStore } from "@/store/donate.ts";
import type { donateInfoType } from "@/store/donate.ts";
import API from "@/request/index";
import { Item } from "ant-design-vue/lib/menu";
import { message } from "ant-design-vue";
import { number } from "echarts";
import { nextTick, onMounted, watch } from "@vue/runtime-core";
const route = useRoute();
const id = route.params.id;
const name = route.params.name;
const store = useDonateStore();
const pagination = reactive({
  defaultPageSize: 5,
  current: 1,
  total: 0,
  pageSize: 5,
  pageSizeOptions: ["3", "5", "10", "20"],
  handlePageChange(current: number, pageSize: number) {
    getData(id, current, pageSize);
  },
});
onMounted(() => {
  message.success("挂载完成");
});
type edit = {
  key: string;
  isEdit: boolean;
};
type tableDataType = donateInfoType & edit;
let donateData = ref<{
  total: number;
  donate: donateInfoType[] | tableDataType[];
}>({
  total: 0,
  donate: [],
});
function getData(id: string | string[], current: number, pageSize: number) {
  store
    .getDonateInfo({
      id,
      current: pagination.current,
      pageSize: pagination.pageSize,
    })
    .then(() => {
      donateData.value = store.donateInfo;
      pagination.total = donateData.value.total;
      donateData.value.donate.forEach(
        (item: donateInfoType | tableDataType, index: number) => {
          item = Object.assign(item, {
            key: `${index + 1}`,
            isEdit: false,
          }) as tableDataType;
        }
      );
    });
}

const columns = [
  {
    title: "交易日期",
    key: "transcationDate",
  },
  {
    title: "受捐助方",
    key: "payee",
  },
  {
    title: "金额",
    key: "amount",
  },
  {
    title: "备注",
    key: "tips",
  },
  {
    title: "操作",
    key: "operations",
  },
];
function deleteItem(
  index: string,
  id: number,
  options: { id: string | string[]; current: number; pageSize: number }
) {
  API.user.deleteDonateInfo(index, id);
  getData(options.id, options.current, options.pageSize);
}
getData(id, pagination.current, pagination.pageSize);
</script>

<template>
  <top-header />
  <a-table
    :columns="columns"
    :data-source="donateData.donate"
    :pagination="false"
    bordered
  >
    <template #title>
      <h3 style="text-align: center">{{ name }} 的公开捐款流向</h3>
    </template>
    <template #bodyCell="{ column, record }">
      <template v-if="column.key == 'transcationDate'">
        <span>{{ record.transcationDate }}</span>
      </template>
      <template v-if="column.key == 'payee'">
        <span>{{ record.payee }}</span>
      </template>
      <template v-if="column.key == 'amount'">
        <span>{{ record.amount }}</span>
      </template>
      <template v-if="column.key == 'tips'">
        <span>{{ record.tips }}</span>
      </template>
      <template v-if="column.key == 'operations'">
        <a-button style="margin-right: 20px">
          <template #icon> <edit-outlined /></template>
          修改
        </a-button>
        <a-button
          type="primary"
          danger
          @click="
            deleteItem(id, record.id, {
              id,
              current: pagination.current,
              pageSize: pagination.pageSize,
            })
          "
        >
          <template #icon> <delete-outlined /></template>
          删除
        </a-button>
      </template>
    </template>
  </a-table>
  <a-pagination
    v-model:current="pagination.current"
    :defaultPageSize="pagination.defaultPageSize"
    :total="pagination.total"
    v-model:pageSize="pagination.pageSize"
    @change="pagination.handlePageChange(current, pageSize)"
    :pageSizeOptions="pagination.pageSizeOptions"
    :showSizeChanger="true"
  >
  </a-pagination>
</template>



<style>
</style>