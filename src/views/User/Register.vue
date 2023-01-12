<script setup lang="ts">
import { reactive, ref } from "@vue/reactivity";
import API from "@/request/index";
import type { Rule } from "ant-design-vue/es/form";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
const router = useRouter();
const registerInfo = reactive({
  username: "",
  phone: "",
  password: "",
  confirmPassword: "",
  nickname: "",
  agree: true,
});

//表单验证前处理
function transformValue(value: string) {
  return value.trim();
}
//确认密码验证
let validateConfirmPassword = async (_rule: Rule, value: string) => {
  if (value === "") {
    return Promise.reject("请输入确认密码");
  }
  if (value == registerInfo.password) {
    return Promise.resolve();
  } else {
    return Promise.reject("确认密码与密码不一致");
  }
};
const rules: Record<string, Rule[]> = {
  username: [
    {
      required: true,
      message: "用户名不能为空",
      transform: transformValue,
      trigger: "change",
    },
    { max: 20, message: "用户名最多有20个字符", trigger: "change" },
  ],
  phone: [
    {
      required: true,
      message: "手机号不能为空",
      transform: transformValue,
      trigger: "change",
    },
    {
      pattern: /^1\d{10}$/,
      message: "请输入正确格式的手机号",
      transform: transformValue,
      trigger: "change",
    },
  ],
  password: [
    {
      required: true,
      message: "密码不能为空",
      trigger: "change",
    },
    {
      max: 12,
      message: "密码需要是6-12个字符",
      trigger: "change",
    },
    {
      min: 6,
      message: "密码需要是6-12个字符",
      trigger: "change",
    },
  ],
  confirmPassword: [
    {
      required: true,
      validator: validateConfirmPassword,
      trigger: "change",
    },
  ],
  nickname: [
    {
      required: true,
      message: "昵称不能为空",
      trigger: "change",
      transform: transformValue,
    },
  ],
};
export type regSubmit = {
  username: string;
  phone: string;
  password: string;
  nickname: string;
};
//提交注册
async function submitRegister() {
  if (registerInfo.agree == false) {
    return message.warning("请同意协议");
  }
  let info: regSubmit = {
    username: registerInfo.username,
    phone: registerInfo.phone,
    password: registerInfo.password,
    nickname: registerInfo.nickname,
  };
  let result = await API.user.reqRegister(info);
  if (result.data.code == 200) {
    message.success("注册成功，请登录");
    setTimeout(() => {
      router.push("/login");
    }, 1000);
  } else {
    message.error("注册失败，请重试");
  }
}
</script>

<template>
  <div id="register-container">
    <div id="register-form">
      <h1>新用户注册</h1>
      <a-form
        :model="registerInfo"
        name="registerForm"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        :rules="rules"
        @finish="submitRegister"
      >
        <a-form-item label="用户名" name="username">
          <a-input
            v-model:value="registerInfo.username"
            placeholder="请输入用户名"
          />
        </a-form-item>

        <a-form-item label="手机号" name="phone">
          <a-input
            v-model:value="registerInfo.phone"
            placeholder="请输入手机号"
          />
        </a-form-item>

        <a-form-item label="密码" name="password">
          <a-input-password
            v-model:value="registerInfo.password"
            placeholder="请输入密码"
          />
        </a-form-item>

        <a-form-item label="确认密码" name="confirmPassword">
          <a-input-password
            v-model:value="registerInfo.confirmPassword"
            placeholder="请输入确认密码"
          />
        </a-form-item>
        <a-form-item label="昵称" name="nickname">
          <a-input
            v-model:value="registerInfo.nickname"
            placeholder="请输入昵称"
          />
        </a-form-item>
        <a-form-item name="remember" :wrapper-col="{ offset: 6, span: 16 }">
          <a-checkbox v-model:checked="registerInfo.agree">同意协议</a-checkbox>
          <router-link to="/login">已有账号？点击登录</router-link>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 6, span: 16 }">
          <a-button size="large" style="margin-right: 20px" @click="router.push('/home')">
            <template #icon>
              <arrow-left-outlined />
            </template>
            返回首页</a-button
          >
          <a-button type="primary" html-type="submit" size="large"
            >提交注册</a-button
          >
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>



<style scoped lang="less">
#register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: url(/images/registerbg.jpg) no-repeat;
  background-size: 40%;
  background-position-y: 5%;
  background-position-x: -8%;
  #register-form {
    display: flex;
    flex-direction: column;
    width: 800px;
    height: 500px;
    h1 {
      text-align: center;
      font-size: 30px;
      text-shadow: 1px 1px 2px;
    }
  }
}
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>