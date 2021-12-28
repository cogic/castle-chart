<!--
 * @Author: Cogic
 * @Date: 2021-12-21 15:14:41
 * @LastEditors: Cogic
 * @LastEditTime: 2021-12-28 23:48:18
 * @Description: 
-->
<template>
  <header>
    <div class="left-head">
      <img class="logo" src="@/assets/logo.png" alt="logo" />
      <h1 class="headline">CastleChart</h1>
      <div :class="['main-page', { active: currentTabKey === 'main' }]" @click="tabSwitch({ key: 'main' })">
        <span class="iconfont">&#xe6bb;</span>
      </div>
    </div>
    <div class="center-head" id="tabbar" ref="tabbar">
      <div :class="['tab', { active: currentTabKey === tab[1].key }]" v-for="(tab, index) in tabArr" @click="tabSwitch(tab[1])">
        <span class="topic">{{ tab[1].topic }}</span>
        <span class="closebt iconfont" @click.stop="closeTab(tab[0], index)">&#xe611;</span>
      </div>
    </div>
    <div class="right-head">
      <div id="portrait">
        <span class="name">{{ username }}</span>
        <img :src="userPortrait" alt="portrait" />
      </div>
    </div>
  </header>
  <section>
    <main>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" :addTab="tabSwitch" :checkNewLoad="checkNewLoad" @new-tab="tabSwitch" :key="tabKey" />
        </keep-alive>
      </router-view>
    </main>
  </section>
  <footer>&copy;2021</footer>
</template>

<script>
import api from '@/api'
export default {
  beforeUpdate() {
    // FIXME 这是为了切换回mainTab时能记住原来是哪个tab，但感觉这不是很好实现方式，不过可能也只能这样吧
    if (this.currentTabKey === 'main') {
      this.currentMainTabPath = this.$route.path
    }
  },
  beforeMount() {
    const result = api.checkLogin()
    if (result.success) {
      this.username = result.user.name
      this.userPortraitPath = result.user.portrait
      // this.currentMainTabPath = this.$route.path
    } else {
      this.$router.replace('/sign')
    }
  },
  data() {
    return {
      testdata: 1,
      currentTabKey: 'main',
      currentMainTabPath: '/master/main/home', // FIXME 这里默认设的是 home ，但是如果最初的不是 home，那么首次点击mainTab时切换回的也是 home，可改为生命周期中根据 $route 设置
      tabMap: new Map(),
      username: '用户名',
      userPortraitPath:'portrait.png'
    }
  },
  computed: {
    tabKey() {
      return this.$route.fullPath
    },
    tabArr() {
      return [...this.tabMap]
    },
    userPortrait(){
      return require('@/assets/' + this.userPortraitPath)
    }
  },
  methods: {
    closeTab(key, i) {
      // 关闭 tab，将其从 tabMap 删除
      this.tabMap.delete(key)
      // 判断应该切换到哪个 tab
      if (this.currentTabKey === key) {
        if (this.tabArr.length === 0) {
          this.tabSwitch({ key: 'main' })
        } else if (this.tabArr.length === i) {
          this.tabSwitch(this.tabArr[i - 1][1])
        } else {
          this.tabSwitch(this.tabArr[i][1])
        }
      }
    },
    tabSwitch(tabConfig) {
      // 负责切换 router-view 里面的内容
      this.currentTabKey = tabConfig.key
      if (tabConfig.key !== 'main') {
        this.$router.replace('/master/tab/' + tabConfig.type + '/' + tabConfig.key)
      } else {
        this.$router.replace(this.currentMainTabPath)
      }
    },
    checkNewLoad(tabKey,callback) {
      if(!this.tabMap.has(tabKey)) {
        callback(true,(tabConfig)=>{
          // 新 tab 加入 tabMap
          this.tabMap.set(tabConfig.key, tabConfig)
        })
      } else {
        callback(false)
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

  flex-shrink: 0;
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
  background-color: rgb(157, 195, 204);
  border-radius: 10px;
}
.left-head .main-page.active span {
  background-color: rgb(30, 177, 214);
}
.left-head .main-page span:hover {
  background-color: rgb(82, 165, 185);
}

.right-head {
  display: flex;
  align-items: center;

  flex-shrink: 0;
  /* background-color: aqua; */
}
.right-head .name {
  margin: 0 10px;
  color: rgb(107, 107, 107);
  vertical-align: middle;
  font-size: 14px;
  font-weight: bold;
}
.right-head img {
  width: 40px;
  height: 40px;
  margin-right: 10px;
  vertical-align: middle;
  border: 2px solid rgba(163, 163, 163, 0.52);
  border-radius: 50%;
}

header .center-head {
  display: flex;
  align-items: center;

  min-width: 100px;
  flex-grow: 1;

  padding: 0 20px;
  /* background-color: aquamarine; */
}
.center-head .tab {
  display: flex;
  justify-content: space-between;
  align-items: center;

  flex-basis: 150px;

  height: 35px;
  margin-right: 5px;
  padding: 0 10px;
  background-color: rgb(182, 182, 182);
  border-radius: 5px 5px 0 0;
  cursor: pointer;
  overflow: hidden;
}
.center-head .tab:hover {
  background-color: rgb(168, 199, 188);
}
.center-head .tab.active {
  background-color: rgb(58, 167, 130);
}
.center-head .topic {
  color: rgb(51, 51, 51);
  font-size: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: keep-all;
}
.center-head .closebt {
  color: rgb(70, 70, 70);
  font-size: 20px;
  /* background-color: antiquewhite; */
  border-radius: 5px;
}
.center-head .closebt:hover {
  color: rgb(255, 255, 255);
  background-color: rgba(214, 9, 9, 0.692);
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

main {
  flex-grow: 1;

  background-color: rgb(133, 133, 133);
}
</style>
