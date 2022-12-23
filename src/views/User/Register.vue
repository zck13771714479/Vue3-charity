<script setup lang="ts">
import { reactive } from "@vue/reactivity";

const registerInfo = reactive({
  username: "",
  phone: "",
  password: "",
  confirmPassword: "",
  agree: true,
});
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
      >
        <a-form-item
          label="用户名"
          name="username"
          :rules="[{ required: true, message: '用户名不能为空' }]"
        >
          <a-input
            v-model:value="registerInfo.username"
            placeholder="请输入用户名"
          />
        </a-form-item>

        <a-form-item
          label="手机号"
          name="phone"
          :rules="[{ required: true, message: '请输入正确手机号' }]"
        >
          <a-input
            v-model:value="registerInfo.phone"
            placeholder="请输入手机号"
          />
        </a-form-item>

        <a-form-item
          label="密码"
          name="password"
          :rules="[
            { required: true, message: '密码必须是大于6位的数字与字母的组合' },
          ]"
        >
          <a-input-password
            v-model:value="registerInfo.password"
            placeholder="请输入密码"
          />
        </a-form-item>

        <a-form-item
          label="确认密码"
          name="confirmPassword"
          :rules="[{ required: true, message: '确认密码要和密码一致' }]"
        >
          <a-input-password
            v-model:value="registerInfo.confirmPassword"
            placeholder="请输入确认密码"
          />
        </a-form-item>
        <a-form-item name="remember" :wrapper-col="{ offset: 6, span: 16 }">
          <a-checkbox v-model:checked="registerInfo.agree">同意协议</a-checkbox>
          <router-link to="/login">已有账号？点击登录</router-link>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 6, span: 16 }">
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
</style>