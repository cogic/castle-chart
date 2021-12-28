<!--
 * @Author: Cogic
 * @Date: 2021-12-23 21:11:03
 * @LastEditors: Cogic
 * @LastEditTime: 2021-12-29 00:54:04
 * @Description: 
-->
<template>
  <div class="outer">
    <nav>
      <ul>
        <li v-for="tab in mainTabs">
          <!-- <router-link :to="tab.to">{{ tab.topic }}</router-link> -->
          <a :class="{ current: isCurrent(tab.to) }" @click="routerTo(tab.to)">{{ tab.topic }}</a>
        </li>
      </ul>
    </nav>
    <div class="content">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" @new-tab="$emit('newTab', $event)" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mainTabs: [
        {
          to: { name: 'Home' },
          topic: '首页',
        },
        {
          to: { name: 'DataStore' },
          topic: '数据源',
        },
        {
          to: { name: 'ChartStore' },
          topic: '图表',
        },
        {
          to: { name: 'PanelStore' },
          topic: '仪表板',
        },
      ],
    }
  },
  methods: {
    isCurrent(to) {
      return this.$route.name === to.name
    },
    routerTo(to) {
      // console.log(this.$route);
      // console.log(this.$router);
      this.$router.replace(to)
    },
  },
}
</script>

<style scoped>
.outer {
  display: flex;
  /* flex-grow: 1; */

  width: 100%;
  height: 100%;
  background-color: rgb(246, 246, 246);
}

nav {
  padding: 10px;
  /* background-color: rgb(246, 246, 246); */
}
nav li {
  margin-bottom: 10px;
}
nav a {
  display: inline-block;
  width: 100px;
  color: rgb(93, 93, 93);
  line-height: 50px;
  text-align: center;
  font-size: 15px;
  background-color: rgb(228, 235, 236);
  border-radius: 10px;
  transition: background-color 0.5s;
}
nav a:hover {
  background-color: rgb(197, 222, 224);
}
nav a.current {
  color: rgb(255, 255, 255);
  background-color: rgb(94, 156, 160);
}

.content {
  flex-grow: 1;
}
</style>
