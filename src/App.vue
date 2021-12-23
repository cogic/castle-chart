<!--
 * @Author: Cogic
 * @Date: 2021-12-21 13:58:35
 * @LastEditors: Cogic
 * @LastEditTime: 2021-12-23 19:05:21
 * @Description: 
-->
<template>
  <router-view />
</template>

<script>
// import Master from '@/views/Master.vue'
export default {
  // components: { Master },
}
</script>

<style>
@charset "UTF-8";
@import url('~@/assets/iconfont/iconfont.css');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
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
