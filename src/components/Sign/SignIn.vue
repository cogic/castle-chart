<!--
 * @Author: Cogic
 * @Date: 2021-12-22 11:48:59
 * @LastEditors: Cogic
 * @LastEditTime: 2021-12-23 19:06:34
 * @Description: 
-->
<template>
  <div id="stage">
    <div id="username">
      <label for="">用户名</label>
      <input type="text" />
    </div>
    <div id="password">
      <label for="">密码</label>
      <input type="password" />
    </div>
    <div id="safecode">
      <label for="">验证码</label>
      <input type="password" />
    </div>
    <div id="login">登录</div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
#stage {
  display: flex;
  flex-direction: column;
  /* flex-wrap:wrap; */
  justify-content: space-between;
  /* align-items:baseline; */
  /* align-content:space-evenly; */

  /* width: 100%; */
  height: 100%;
  padding: 50px 20px;
  background-color: rgb(251, 239, 213);
  border-radius: 10px;
}
#stage div {
  /* order: 1; */
  /* flex-grow: 0.5; */
  /* flex-shrink: 0.1; */
  /* flex-basis: 50px; */
  /* align-self: center; */

  width: 100%;
  text-align: center;
  /* background-color: aquamarine; */
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
  font-size: 24px;
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
