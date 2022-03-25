<template>
  <div id="stage" @keypress.enter="login">
    <div id="username">
      <label for="">用户名</label>
      <input type="text" v-model="username" @input="fixText" @click="this.mesg = ''"/>
    </div>
    <div id="password">
      <label for="">密码</label>
      <input type="password" v-model="password" @input="fixText" @click="this.mesg = ''" />
    </div>
    <div id="safecode">
      <label for="">验证码</label>   
      <input type="text" v-model="safecode" @input="fixText" @click="this.mesg = ''"  />
      <safe-code class="codebox" ref="codebox" />
    </div>
    <div id="login" class="text-disable" @click="login">登录</div>
    <div id="mesg">{{ mesg }}</div>
  </div>
</template>

<script>
import SafeCode from '@/components/sign/SafeCode.vue'
export default {
  components: { SafeCode },
  activated() {
    this.mesg = ''
  },
  data() {
    return {
      username: '',
      password: '',
      safecode: '',
      mesg: '',
    }
  },
  methods: {
    // TODO 对输入长度、特殊字符等进行限制
    // TODO 设置验证码

    fixText(e) {
      // 不允许空格
      e.target.value = e.target.value.replaceAll(/\s/g, '')
    },
    login() {
      if (this.username.length === 0) {
        this.mesg = '请输入用户名!'
      } else if (this.password.length === 0) {
        this.mesg = '请输入密码!'
      } else if (this.safecode.length === 0) {
        this.mesg = '请输入验证码!'
      } else if (this.safecode.toLowerCase() !== this.$refs.codebox.getCode().toLowerCase()) {
        this.$refs.codebox.refreshCode()
        this.mesg = '验证码错误!'
      } else {
        this.$API.userLogin(
          {
            username: this.username,
            password: this.password,
          },
          (message) => {
            console.log(message)
            if (message.success) {
              this.mesg = '登录成功!'
              this.$router.replace('/')
            } else if (message.code === 40) {
              this.mesg = '用户不存在!'
            } else if (message.code === 41) {
              this.mesg = '密码错误!'
            } else {
              this.mesg = message.info ? message.info : 'unknown error'
            }
            this.$refs.codebox.refreshCode()
          }
        )
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
#stage input:focus {
  background-color: rgb(244, 253, 255);
  box-shadow: inset 0px 0px 3px 0px rgba(8, 123, 218, 0.726);
}
#safecode input {
  width: 40%;
  border-radius: 0;
}
#safecode .codebox {
  float: right;
  width: 30%;
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
#login:active {
  background-color: rgb(118, 174, 206);
}
#mesg {
  color: rgb(229, 73, 73);
  font-size: 16px;
  font-weight: bold;
  height: 20px;
}
</style>
