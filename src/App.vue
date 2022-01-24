<!--
 * @Author: Cogic
 * @Date: 2021-12-21 13:58:35
 * @LastEditors: Cogic
 * @LastEditTime: 2022-01-25 04:45:41
 * @Description: 
-->
<template>
  <!-- TODO 这里的 router-view 要不要加 keep-alive 呢？ -->
  <router-view />
</template>

<script>
export default {}
</script>

<style>
@charset "UTF-8";
@import url('~@/assets/iconfont/iconfont.css');
* {
  scrollbar-width: thin;
  scrollbar-base-color: green;
  scrollbar-track-color: red;
  scrollbar-arrow-color: blue;
}
*::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  background-color: rgb(255, 255, 255);
  /* border: 1px solid rgb(203, 203, 203); */
  /* outline: 1px solid rgb(203, 203, 203); */
  /* border-radius: 5px; */
}
*::-webkit-scrollbar-thumb {
  background-color: rgb(193, 193, 193);
  border: 3px solid rgb(255, 255, 255);
  border-radius: 5px;
}
*::-webkit-scrollbar-thumb:hover {
  border: 0px;
  background-color: rgb(130, 130, 130);
}
*::-webkit-scrollbar-corner {
  background-color: rgb(255, 255, 255);
}

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
