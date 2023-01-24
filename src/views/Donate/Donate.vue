<script setup lang="ts">
import { reactive, ref } from "@vue/reactivity";
import dayjs, { Dayjs } from "dayjs";
import { useRoute } from "vue-router";
import { useDonateStore } from "@/store/donate.ts";
import type { donateInfoType } from "@/store/donate.ts";
import API from "@/request/index";
import updateDonate from "./updateDonate.vue";
import { message } from "ant-design-vue";
const route = useRoute();
const id = route.params.id;
const name = route.params.name;
const isUpdated = ref<boolean>(false);
export type updateOperationType = "edit" | "add";
const editOrAdd = ref<updateOperationType>("add");
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
type row = {
  key: string;
};
//表格数据类型
export type tableDataType = donateInfoType & row;
let donateData = ref<{
  total: number;
  donate: donateInfoType[] | tableDataType[];
}>({
  total: 0,
  donate: [],
});
//获取数据
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
//表格格式
const columns = [
  {
    title: "序号",
    key: "key",
    align: "center",
    width: 80,
  },
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
//删除数据
async function deleteItem(id: number, current: number, pageSize: number) {
  let result = await API.user.deleteDonateInfo(id);
  if (result.data.code == 200) {
    message.success("删除成功");
    if (current == 1) {
      getData(route.params.id, current, pageSize);
      return;
    }
    if (Math.ceil(pagination.total / pageSize) == current) {
      //处理最后一页删除完的情况
      let restSize = pagination.total - 1;
      if (restSize <= (current - 1) * pageSize) {
        pagination.current = current - 1;
        getData(route.params.id, pagination.current, pageSize);
        return;
      }
    }
    getData(route.params.id, current, pageSize);
  } else {
    message.error("删除失败");
  }
}
//添加数据
function addDonateEntry() {
  isUpdated.value = true;
  editOrAdd.value = "add";
}
//修改数据
let editRecord = ref<tableDataType>({});
function editDonateEntry(record: tableDataType) {
  isUpdated.value = true;
  editOrAdd.value = "edit";
  editRecord.value = record;
}
//关闭对话框
function destoryModal() {
  isUpdated.value = false;
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
      <a-button type="primary" @click="addDonateEntry">
        <template #icon>
          <plus-circle-outlined />
        </template>
        添加捐款项</a-button
      >
      <updateDonate
        v-if="isUpdated"
        @destoryModal="destoryModal"
        @finishUpdate="getData(id, pagination.current, pagination.pageSize)"
        :mode="editOrAdd"
        :editRecord="editRecord"
      />
    </template>
    <template #bodyCell="{ column, record }">
      <template v-if="column.key == 'key'">
        <div>{{ record.key }}</div>
      </template>
      <template v-if="column.key == 'transcationDate'">
        <span>{{ record.transcation_date }}</span>
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
        <a-button style="margin-right: 20px" @click="editDonateEntry(record)">
          <template #icon> <edit-outlined /></template>
          修改
        </a-button>
        <a-button
          type="primary"
          danger
          @click="
            deleteItem(record.id, pagination.current, pagination.pageSize)
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



<style scoped lang="less">
/deep/ .ant-table-tbody {
  > tr:hover:not(.ant-table-expanded-row) > td,
  .ant-table-row-hover,
  .ant-table-row-hover > td {
    background: #c2ffd8 !important;
    //设置table鼠标移入时的背景色
  }
}
</style>