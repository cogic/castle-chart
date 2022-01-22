<!--
 * @Author: Cogic
 * @Date: 2021-12-22 11:48:59
 * @LastEditors: Cogic
 * @LastEditTime: 2022-01-01 23:49:34
 * @Description: 
-->
<template>
  <div id="stage">
    <div id="username">
      <label for="">用户名</label>
      <input type="text" ref="username" @input="fixText" />
    </div>
    <div id="password">
      <label for="">密码</label>
      <input type="password" ref="password" @input="fixText" />
    </div>
    <div id="safecode">
      <label for="">验证码</label>
      <input type="text" @input="fixText" />
    </div>
    <div id="login" @click="login">登录</div>
  </div>
</template>

<script>
import API from '@/api'
export default {
  methods: {
    // TODO 对输入长度、特殊字符等进行限制
    // TODO 设置验证码

    fixText(e) {
      // 不允许空格
      e.target.value = e.target.value.replaceAll(/\s/g, '')
    },
    login() {
      API.userLogin(
        {
          username: this.$refs.username.value,
          password: this.$refs.password.value,
        },
        (result) => {
          if (result.success) {
            this.$router.replace('/')
          } else {
            console.log('登录失败');
          }
        }
      )
    },
  },
}
</script>

<style scoped>
#stage {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 100%;
  padding: 50px 20px;
  background-color: rgb(251, 239, 213);
  border-radius: 10px;
}
#stage div {
  width: 100%;
  text-align: center;
  border-radius: 10px;
}
#stage label {
  display: inline-block;
  width: 30%;
  padding: 0 10px;
  color: rgb(243, 243, 243);
  font-size: 20px;
  line-height: 40px;
  text-align: center;
  vertical-align: middle;
  background-color: rgb(224, 148, 101);
  border-radius: 10px 0 0 10px;
}
#stage input {
  width: 70%;
  height: 100%;
  padding: 0 20px;
  color: rgb(0, 0, 0);
  font-size: 20px;
  vertical-align: middle;
  background-color: rgb(255, 255, 255);
  border-radius: 0 10px 10px 0;
}
#login {
  color: rgb(241, 240, 240);
  font-size: 25px;
  line-height: 50px;
  text-align: center;
  background-color: rgb(90, 154, 190);
  cursor: pointer;
  transition: background-color 0.5s;
}
#login:hover {
  background-color: rgb(12, 150, 230);
}
</style>
