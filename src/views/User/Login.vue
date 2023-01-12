<script setup lang="ts">
import { reactive } from "@vue/reactivity";
import API from "@/request/index";
import type { Rule } from "ant-design-vue/es/form";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
const router = useRouter();
export type loginInput = {
  username: string;
  password: string;
};
const loginInfo = reactive<loginInput>({
  username: "",
  password: "",
});
const rules: Record<string, Rule[]> = {
  username: [
    {
      required: true,
      message: "用户名不能为空",
      transform: (value: string): string => {
        return value.trim();
      },
      trigger: "change",
    },
    { max: 20, message: "用户名最多有20个字符", trigger: "change" },
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
};
async function loginSubmit() {
  let result = await API.user.reqLogin(loginInfo);
  if (result.data.code == 200) {
    message.success("登录成功");
    let token: string = result.data.token;
    sessionStorage.setItem("TOKEN", token);
    router.push("/home");
  } else {
    message.error("登录失败," + result.data.message);
  }
}
</script>
<template>
  <div id="login-container">
    <div id="loginForm">
      <h1>慈善追踪网登录</h1>
      <a-form
        :model="loginInfo"
        name="loginForm"
        autocomplete="off"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 16 }"
        :rules="rules"
        @finish="loginSubmit"
      >
        <a-form-item label="用户名" name="username">
          <a-input
            v-model:value="loginInfo.username"
            placeholder="请输入用户名"
          >
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item label="密码" name="password">
          <a-input-password
            v-model:value="loginInfo.password"
            placeholder="请输入密码"
          >
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>
        <a-form-item name="register" :wrapper-col="{ offset: 6, span: 16 }">
          <router-link to="/register">没有账号？点击注册</router-link>
        </a-form-item>
        <a-form-item name="loginButton" :wrapper-col="{ offset: 6, span: 16 }">
          <a-button
            size="large"
            style="margin-right: 20px"
            @click="router.push('/home')"
          >
            <template #icon>
              <arrow-left-outlined />
            </template>
            返回首页</a-button
          >
          <a-button type="primary" html-type="submit" size="large">
            <template #icon><login-outlined /> </template>
            登录</a-button
          >
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>



<style lang="less" scoped>
#login-container {
  width: 100vw;
  height: 100vh;
  background: url(/images/loginbg.jpg) no-repeat;
  background-size: cover;
}
#loginForm {
  position: absolute;
  left: 10%;
  top: 40%;
  transform: translateY(-50%);
  width: 500px;
  height: 300px;
  background-color: #f1f2f4;
  opacity: 0.9;
  border: 1px solid #fafbfd;
  border-radius: 10px;
  box-shadow: 2px 2px 2px;
  h1 {
    text-align: center;
    font-size: 30px;
    text-shadow: 1px 1px 2px;
  }
}
</style>