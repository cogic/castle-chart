<!--
 * @Author: Cogic
 * @Date: 2021-12-21 15:14:41
 * @LastEditors: Cogic
 * @LastEditTime: 2021-12-23 19:05:31
 * @Description: 
-->
<template>
  <!-- <button @click="test">sdfsd</button> -->
  <header>
    <div class="left-head">
      <img class="logo" src="@/assets/logo.png" alt="logo" />
      <h1 class="headline">CastleChart</h1>
      <div :class="['main-page', { active: currentTabNum == -1 }]" @click="tabSwitch(-1)">
        <span class="iconfont">&#xe6bb;</span>
      </div>
    </div>
    <div class="center-head">
      <div :class="['tab', { active: currentTabNum == index }]" v-for="(tab, index) in topTabs" @click="tabSwitch(index)">{{ tab.topic }}</div>
    </div>
    <div class="right-head">
      <div id="portrait">
        <span class="name">用户名</span>
        <img src="@/assets/portrait.png" alt="portrait" />
      </div>
    </div>
  </header>
  <section>
    <!-- <component :is="currentTab"></component> -->
    <nav v-if="currentTabNum == -1">
      <ul>
        <li v-for="tab in mainTabs">
          <router-link :to="tab.to">{{ tab.topic }}</router-link>
        </li>
      </ul>
    </nav>
    <main>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
      <!-- <div v-else>dsfsd</div> -->
    </main>
  </section>
  <footer>&copy;2021</footer>
</template>

<script>
export default {
  beforeUpdate() {
    // FIXME 这是为了切换回mainTab时能记住原来是哪个tab，但感觉这不是很好实现方式
    if (this.currentTabNum == -1) {
      this.currentMainTabPath = this.$route.path
    }
  },
  data() {
    return {
      testdata: 1,
      currentTabNum: -1,
      currentMainTabPath: '/master/home',
      topTabs: [
        {
          topic: 'tab1',
        },
        {
          topic: 'tab2',
        },
        {
          topic: 'tab3',
        },
        {
          topic: 'tab4',
        },
      ],
      mainTabs: [
        {
          to: '/master/home',
          topic: '首页',
        },
        {
          to: '/master/data-source',
          topic: '数据源',
        },
        {
          to: '/master/chart-store',
          topic: '图表',
        },
        {
          to: '/master/panel-store',
          topic: '仪表板',
        },
        // {
        //   to: '/www.baidu.com',
        //   topic: '帮助中心',
        // },
      ],
    }
  },
  computed: {
    currentTab() {},
  },
  methods: {
    test() {
      this.testdata++
      console.log(this.testdata)
    },
    tabSwitch(index) {
      this.currentTabNum = index
      if (index != -1) {
        this.$router.replace('/master/tab/' + index)
      } else {
        this.$router.replace(this.currentMainTabPath)
      }
    },
  },
}
</script>

<style scoped>
header {
  display: flex;
  /* justify-content: space-between; */

  padding: 5px;
  background-color: rgb(246, 246, 246);
}

.left-head {
  display: flex;
  align-items: center;
}
.left-head .logo {
  width: 45px;
  height: 45px;
  padding: 5px;
  vertical-align: middle;
  /* background-color: aquamarine; */
}
.left-head .headline {
  display: inline-block;
  line-height: 40px;
  padding: 5px 5px 0 5px;
  margin-right: 12px;
  color: rgb(58, 58, 58);
  font-size: 24px;
  vertical-align: middle;
  /* background-color: burlywood; */
}
.left-head .main-page {
  display: inline-block;
  /* background-color: cadetblue; */
  cursor: pointer;
}
.left-head .main-page span {
  display: inline-block;
  width: 60px;
  color: rgb(255, 255, 255);
  font-size: 22px;
  line-height: 35px;
  text-align: center;
  background-color: rgb(127, 186, 201);
  border-radius: 10px;
}
.left-head .main-page.active span {
  background-color: rgb(37, 171, 204);
}

.right-head {
  display: flex;
  align-items: center;

  flex-shrink: 2;
  /* background-color: aqua; */
}
.right-head .name {
  margin: 0 5px;
  color: rgb(70, 70, 70);
  vertical-align: middle;
  font-size: 16px;
}
.right-head img {
  width: 35px;
  height: 35px;
  margin-right: 10px;
  vertical-align: middle;
  border-radius: 50%;
}

.center-head {
  display: flex;
  align-items: center;

  flex-grow: 1;

  padding: 0 20px;
  /* background-color: aquamarine; */
}
.center-head .tab {
  flex-basis: 150px;
  /* width: 150px; */
  height: 35px;
  margin-right: 5px;
  background-color: rgb(182, 182, 182);
  border-radius: 5px 5px 0 0;
  cursor: pointer;
}
.center-head .tab.active {
  background-color: rgb(58, 167, 130);
}

footer {
  /* position: absolute; */
  /* bottom: 0; */
  width: 100%;
  font-size: 14px;
  text-align: center;
  line-height: 30px;
  background-color: rgb(246, 246, 246);
}

section {
  display: flex;
  flex-grow: 1;
  /* flex-direction: column; */
}
nav {
  /* width: min-content; */
  /* height: calc(100%); */
  padding: 10px;
  background-color: rgb(246, 246, 246);
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

nav a.router-link-active {
  color: rgb(255, 255, 255);
  background-color: rgb(94, 156, 160);
}

main {
  flex-grow: 1;

  /* position: absolute; */
  /* top: 55px; */
  /* left: 120px; */
  /* width: calc(100% - 120px); */
  /* height: calc(100% - 85px); */
  background-color: rgb(133, 133, 133);
}
</style>
