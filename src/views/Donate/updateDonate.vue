<script setup lang="ts">
import { useRoute } from "vue-router";
import { reactive, ref } from "@vue/reactivity";
import type { Rule } from "ant-design-vue/es/form";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/zh-cn";
import locale from "ant-design-vue/es/date-picker/locale/zh_CN";
import type { updateOperationType, tableDataType } from "./Donate.vue";
import { computed, onMounted } from "@vue/runtime-core";
import API from "@/request/index";
import { message } from "ant-design-vue";
dayjs.locale("zh-cn");
const props = defineProps<{
  mode: updateOperationType;
  editRecord: tableDataType;
}>();
let operationMode = computed(() => {
  return props.mode == "add" ? "添加捐款项" : "修改捐款项";
});
const visible = ref<boolean>(true); //对话框是否可见
let emit = defineEmits<{
  (event: "destoryModal"): void;
  (event: "finishUpdate"): void;
}>();
const route = useRoute();
const dateFormat = "YYYY-MM-DD";
let charityName = ref<string | string[]>(route.params.name);
//表单数据类型
type donateEnrtryType = {
  charityIndex: string | string[];
  transcationDate: Dayjs | null;
  payee: string;
  amount: number;
  tips: string;
};
//表单数据
let donateEnrtry = reactive<donateEnrtryType>({
  charityIndex: route.params.id,
  transcationDate: null,
  payee: "",
  amount: -1,
  tips: "",
});
//表单验证前处理
function transformValue(value: string) {
  return value.trim();
}
//验证正确日期
let validateDate = async (_rule: Rule, value: Dayjs) => {
  if (!value) {
    return;
  }
  if (value.isAfter(dayjs())) {
    //不能在今天之后
    return Promise.reject("请输入正确的日期");
  }
  if (value.isBefore(dayjs("2019-01-01"))) {
    return Promise.reject("请输入最近3年的日期");
  }
  return Promise.resolve();
};
//数额为正验证
let validateAmount = async (_rule: Rule, value: number) => {
  if (value <= 0) {
    return Promise.reject("请输入正值金额");
  } else {
    return Promise.resolve();
  }
};
//表单验证规则
const rules: Record<string, Rule[]> = {
  transcationDate: [
    { required: true, message: "日期不能为空", trigger: "change" },
    {
      validator: validateDate,
      trigger: "change",
    },
  ],
  amount: [
    {
      required: true,
      message: "捐款数额不能为空",
      trigger: "change",
    },
    {
      validator: validateAmount,
      trigger: "change",
    },
  ],
  payee: [
    {
      required: true,
      message: "受捐助者不能为空",
      trigger: "change",
      transform: transformValue,
    },
  ],
};
//发送请求类型规定
export type requestType = {
  id?: number;
  charityIndex: number;
  transcation_date: string;
  payee: string;
  amount: number;
  tips: string;
};
//添加或修改捐款项
async function onFinish() {
  let tmp: requestType = {
    charityIndex: Number.parseInt(donateEnrtry.charityIndex as string),
    transcation_date: donateEnrtry.transcationDate?.format(dateFormat)!,
    payee: donateEnrtry.payee,
    amount: donateEnrtry.amount,
    tips: donateEnrtry.tips,
  };
  if (props.mode == "add") {
    let result = await API.user.addDonateEntry(tmp);
    if (result.data.code == 200) {
      message.success("添加成功");
      emit("finishUpdate");
      emit("destoryModal");
    } else {
      message.error("添加失败");
    }
  }
  if (props.mode == "edit") {
    Object.assign(tmp, { id: props.editRecord.id });
    let result = await API.user.updateDonateEntry(tmp);
    if (result.data.code == 200) {
      message.success("更新成功");
      emit("finishUpdate");
      emit("destoryModal");
    } else {
      message.error("更新失败");
    }
  }
}
//修改时获取数据
onMounted(() => {
  if (props.mode == "edit") {
    donateEnrtry.transcationDate = dayjs(props.editRecord.transcationDate);
    donateEnrtry.payee = props.editRecord.payee;
    donateEnrtry.amount = props.editRecord.amount;
    donateEnrtry.tips = props.editRecord.tips;
  }
});
//点击取消和叉的回调
function handleCancel() {
  emit("destoryModal");
}
</script>


<template>
  <a-modal
    v-model:visible="visible"
    :title="operationMode"
    cancelText="取消"
    okText="保存"
    :maskClosable="false"
    :keyboard="false"
    :footer="null"
    @cancel="handleCancel"
  >
    <a-form
      :model="donateEnrtry"
      name="updateForm"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
      :rules="rules"
      @finish="onFinish"
    >
      <a-form-item label="慈善机构" name="charityIndex">
        {{ charityName }}
      </a-form-item>
      <a-form-item label="捐款日期" name="transcationDate">
        <a-config-provider :locale="locale">
          <a-date-picker
            v-model:value="donateEnrtry.transcationDate"
            :locale="locale"
            :format="dateFormat"
          />
        </a-config-provider>
      </a-form-item>
      <a-form-item label="受捐助者" name="payee">
        <a-input
          v-model:value="donateEnrtry.payee"
          placeholder="请输入受捐助者"
        >
          <template #prefix>
            <user-outlined type="user" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item label="金额" name="amount">
        <a-input-number
          v-model:value="donateEnrtry.amount"
          :formatter="
            (value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          "
          :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
          :precision="2"
          :step="1000"
          style="width: 200px"
        />
      </a-form-item>
      <a-form-item label="备注" name="tips">
        <a-textarea
          v-model:value="donateEnrtry.tips"
          placeholder="请输入备注"
          :auto-size="{ minRows: 3, maxRows: 10 }"
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 6, span: 16 }">
        <a-button type="primary" html-type="submit">提交</a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>



<style>
</style>