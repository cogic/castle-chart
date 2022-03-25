<template>
  <div class="outer">
    <nav>
      <ul>
        <li v-for="tab in mainTabs">
          <a :class="{ 'text-disable': true, current: isCurrent(tab.to) }" @click="routerTo(tab.to)">{{ tab.topic }}</a>
        </li>
      </ul>
    </nav>
    <div class="content">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" @new-tab="$emit('newTab', $event)" :key="tabKey" />
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
  computed: {
    tabKey() {
      return this.$route.fullPath
    },
  },
  methods: {
    isCurrent(to) {
      return this.$route.name === to.name
    },
    routerTo(to) {
      this.$router.replace(to)
    },
  },
}
</script>

<style scoped>
.outer {
  display: flex;

  width: 100%;
  height: 100%;
  background-color: rgb(246, 246, 246);
}

nav {
  padding: 10px;
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
  cursor: pointer;
}
nav a:hover {
  background-color: rgb(197, 222, 224);
}
nav a.current {
  color: rgb(255, 255, 255);
  background-color: rgb(94, 156, 160);
}
nav a:active {
  background-color: rgb(110, 185, 190);
}

.content {
  flex-grow: 1;
}
</style>
