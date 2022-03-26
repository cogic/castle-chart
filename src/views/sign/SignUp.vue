<template>
  <div id="stage" @keypress.enter="register">
    <div id="username">
      <label for="">用户名</label>
      <input type="text" v-model="username" @input="fixText" @click="this.mesg = ''" maxlength="20" placeholder="不超过 20 个字符" />
    </div>
    <div id="password">
      <label for="">密码</label>
      <input type="password" v-model="password" @input="fixText" @click="this.mesg = ''" maxlength="25" placeholder="不超过 25 个字符" />
    </div>
    <div id="repassword">
      <label for="">确认密码</label>
      <input type="password" v-model="repassword" @input="fixText" @click="this.mesg = ''" />
    </div>
    <div id="safecode">
      <label for="">验证码</label>
      <input type="text" v-model="safecode" @input="fixText" @click="this.mesg = ''" />
      <safe-code class="codebox" ref="codebox" />
    </div>
    <div id="register" class="text-disable" @click="register">注册</div>
    <div id="mesg">{{ mesg }}</div>
  </div>
</template>

<script>
import SafeCode from '@/components/sign/SafeCode.vue'
export default {
  components: { SafeCode },
  data() {
    return {
      username: '',
      password: '',
      repassword: '',
      safecode: '',
      mesg: '',
    }
  },
  activated() {
    this.mesg = ''
  },
  methods: {
    // TODO 对输入特殊字符等进行限制

    fixText(e) {
      // 不允许空格
      e.target.value = e.target.value.replaceAll(/\s/g, '')
    },
    register() {
      if (this.username.length === 0) {
        this.mesg = '请输入用户名!'
      } else if (this.password.length === 0) {
        this.mesg = '请输入密码!'
      } else if (this.repassword.length === 0) {
        this.mesg = '请输入确认密码!'
      } else if (this.repassword !== this.password) {
        this.mesg = '两次输入密码不一致!'
      } else if (this.safecode.length === 0) {
        this.mesg = '请输入验证码!'
      } else if (this.safecode.toLowerCase() !== this.$refs.codebox.getCode().toLowerCase()) {
        this.$refs.codebox.refreshCode()
        this.mesg = '验证码错误!'
      } else {
        this.$API.userRegister(
          {
            username: this.username,
            password: this.password,
          },
          (message) => {
            console.log(message)
            if (message.success) {
              this.mesg = '注册成功!'
              this.$router.replace({name:'Master'})
            } else if (message.code === 40) {
              this.mesg = '用户名已存在!'
            } else {
              this.mesg = message.info ? message.info : 'unknown error'
            }
            this.$refs.codebox.refreshCode()
          }
        )
      }
      this.safecode = ''
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
#register:active {
  background-color: rgb(107, 192, 120);
}
#mesg {
  color: rgb(229, 73, 73);
  font-size: 16px;
  font-weight: bold;
  height: 20px;
}
</style>
