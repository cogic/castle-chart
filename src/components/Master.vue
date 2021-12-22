<!--
 * @Author: Cogic
 * @Date: 2021-12-21 15:14:41
 * @LastEditors: Cogic
 * @LastEditTime: 2021-12-22 14:19:47
 * @Description: 
 * @FilePath: \castle-chart\src\components\Master.vue
-->
<template>
  <header>
    <img class="logo" src="@/assets/logo.png" alt="logo" />
    <h1 class="headline">CastleChart</h1>
  </header>
  <nav>
    <ul>
      <li v-for="tab in tabs">
        <router-link :to="tab.to">{{ tab.topic }}</router-link>
      </li>
    </ul>
  </nav>
  <main>
    <slot></slot>
  </main>
  <footer>&copy;2021</footer>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        {
          to: '/',
          topic: '首页',
        },
        {
          to: '/data-source',
          topic: '数据源',
        },
        {
          to: '/chart-store',
          topic: '图表',
        },
        {
          to: '/panel-store',
          topic: '仪表板',
        },
      ],
    }
  },
  methods: {
  },
}
</script>

<style scoped>
header {
  background-color: rgb(246, 246, 246);
  padding: 5px;
}
header .logo {
  width: 45px;
  height: 45px;
  padding: 5px;
  vertical-align: middle;
  /* background-color: aquamarine; */
}
header .headline {
  display: inline-block;
  line-height: 40px;
  padding: 5px 5px 0 5px;
  color: rgb(58, 58, 58);
  font-size: 24px;
  vertical-align: middle;
  /* background-color: burlywood; */
}
footer {
  position: absolute;
  width: 100%;
  bottom: 0;
  font-size: 14px;
  text-align: center;
  line-height: 30px;
  background-color: rgb(246, 246, 246);
}
nav {
  width: min-content;
  height: calc(100% - 70px);
  padding: 10px 10px;
  background-color: rgb(246, 246, 246);
}
nav li {
  margin-bottom: 10px;
  list-style: none;
}
nav a {
  display: inline-block;
  width: 100px;
  color: rgb(93, 93, 93);
  line-height: 50px;
  text-align: center;
  font-size: 15px;
  background-color: rgb(228, 235, 236);
  text-decoration: none;
  outline: none;
  border-radius: 10px;
  transition: background-color 0.5s;
}

nav a:hover {
  background-color: rgb(197, 222, 224);
}

nav a.router-link-active {
  color: rgb(255, 255, 255);
  background-color: rgb(94, 156, 160);
}

main {
  position: absolute;
  top: 55px;
  left: 120px;
  width: calc(100% - 120px);
  height: calc(100% - 85px);
  background-color: rgb(133, 133, 133);
}
</style>
