<template>
  <router-view />
</template>

<script>
export default {
  // components
  // props
  // emits
  // data
  // computed
  // watch
  // 生命周期事件 (按照它们被调用的顺序)
  // beforeCreate
  // created
  // beforeMount
  // mounted
  // beforeUpdate
  // updated
  // activated
  // deactivated
  // beforeUnmount
  // unmounted
  // errorCaptured
  // renderTracked
  // renderTriggered
  // methods
}
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
}
*::-webkit-scrollbar-thumb {
  background-color: rgb(193, 193, 193);
  border: 3px solid rgb(255, 255, 255);
  border-radius: 5px;
}
*::-webkit-scrollbar-thumb:hover {
  border-width: 0px;
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
.text-disable {
  user-select: none;
}
</style>
