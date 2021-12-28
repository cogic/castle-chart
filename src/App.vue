<!--
 * @Author: Cogic
 * @Date: 2021-12-21 13:58:35
 * @LastEditors: Cogic
 * @LastEditTime: 2021-12-29 00:47:04
 * @Description: 
-->
<template>
  <!-- TODO 这里的 router-view 要不要加 keep-alive 呢？ -->
  <router-view />
</template>

<script>
export default {
}
</script>

<style>
@charset "UTF-8";
@import url('~@/assets/iconfont/iconfont.css');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  transition: all 0.3s;
}
html,
body {
  height: 100%;
  background-color: aliceblue;
}
a {
  outline: none;
  text-decoration: none;
}
li {
  list-style: none;
}
input {
  border: none;
  outline: none;
}
#app {
  display: flex;
  flex-direction: column;
  align-content: center;
  height: 100%;
}
</style>
