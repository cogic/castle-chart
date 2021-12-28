<!--
 * @Author: Cogic
 * @Date: 2021-12-22 11:49:29
 * @LastEditors: Cogic
 * @LastEditTime: 2021-12-28 01:13:27
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
    <div id="repassword">
      <label for="">确认密码</label>
      <input type="password" @input="fixText" />
    </div>
    <div id="safecode">
      <label for="">验证码</label>
      <input type="text" @input="fixText" />
    </div>
    <div id="register" @click="register">注册</div>
  </div>
</template>

<script>
import api from '@/api'
export default {
  methods: {
    // TODO 对输入长度、特殊字符等进行限制
    // TODO 设置验证码

    fixText(e) {
      // 不允许空格
      e.target.value = e.target.value.replaceAll(/\s/g, '')
    },
    register() {
      const message = api.userRegister({
        username: this.$refs.username.value,
        password: this.$refs.password.value,
      })
      if (message.success) {
        this.$router.replace('/')
      }
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
  padding: 20px 20px;
  background-color: rgb(243, 227, 222);
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
  color: rgb(243, 243, 243);
  font-size: 20px;
  line-height: 40px;
  text-align: center;
  vertical-align: middle;
  background-color: rgb(223, 158, 115);
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
#register {
  color: rgb(241, 240, 240);
  font-size: 25px;
  line-height: 50px;
  text-align: center;
  background-color: rgb(76, 155, 86);
  cursor: pointer;
  transition: background-color 0.5s;
}
#register:hover {
  background-color: rgb(10, 177, 35);
}
</style>
