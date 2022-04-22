<template>
  <header>
    <div class="left-head">
      <img class="logo" src="@/assets/image/logo.png" alt="logo" @click="toManagement" />
      <h1 class="headline">CastleChart</h1>
      <div :class="['main-page', 'text-disable', { active: currentTabKey === 'main' }]" @click="tabSwitch({ key: 'main' })">
        <span class="iconfont">&#xe6bb;</span>
      </div>
    </div>
    <div class="center-head" id="tabbar" ref="tabbar">
      <div :class="['tab', 'text-disable', { active: currentTabKey === tab[1].key }]" v-for="(tab, index) in tabArr" :key="tab.tabKey" @click="tabSwitch(tab[1])">
        <span class="topic">{{ tab[1].topic }}</span>
        <span class="closebt iconfont text-disable" @click.stop="closeTab(tab[0], index)">&#xe611;</span>
      </div>
    </div>
    <div class="right-head">
      <div class="portrait">
        <span class="name">{{ username }}</span>
        <img :src="userPortrait" alt="portrait" />
        <div class="logout text-disable" @click="logout">退出登录</div>
      </div>
      <div class="fullscreen text-disable" @click="setFullScreen">
        <span class="iconfont" v-if="!isFull">&#xe667;</span>
        <span class="iconfont exit" v-else>&#xe6ce;</span>
      </div>
    </div>
  </header>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" :addTab="tabSwitch" :checkNewLoad="checkNewLoad" @new-tab="tabSwitch" :key="tabKey" />
    </keep-alive>
  </router-view>
  <footer>&copy;2021</footer>
</template>

<script>
export default {
  data() {
    return {
      testdata: 1,
      currentTabKey: 'main',
      currentMainTabPath: '/master/main/home',
      tabMap: new Map(),
      username: '用户名',
      userPortraitPath: 'image/portrait.png',
      isFull: false,
    }
  },
  computed: {
    tabKey() {
      // 项目的tab只需返回其fullPath，但主页tab会有内部的路由切换，若也直接返回fullPath的话会重复加载主页
      if (this.$route.matched[1].name === 'MainPage') {
        return 'MainPage'
      }
      return this.$route.fullPath
    },
    tabArr() {
      return [...this.tabMap]
    },
    userPortrait() {
      return require('@/assets/' + this.userPortraitPath)
    },
  },
  watch: {
    tabMap: {
      handler(newValue) {
        this.$store.commit('setTabMap', newValue)
      },
      deep: true,
    },
  },
  beforeCreate() {
    this.$API.checkLogin((message) => {
      if (message.success) {
        this.username = message.info.username
      } else {
        this.$router.replace({ name: 'Sign' })
      }
    })
  },
  beforeUpdate() {
    // FIXME 这是为了切换回mainTab时能记住原来是哪个tab，但感觉这不是很好实现方式，不过可能也只能这样吧
    if (this.currentTabKey === 'main' && ['Home', 'DataStore', 'ChartStore', 'PanelStore'].includes(this.$route.name)) {
      this.currentMainTabPath = this.$route.path
    }
  },
  methods: {
    toManagement() {
      console.log(window.location.origin)
      this.$API.checkAdmin((message) => {
        if (message.success) {
          window.open(window.location.origin + '/management', '_blank ')
        }
      })
    },
    isFullScreen() {
      return document.fullscreenElement || document.mozFullScreenElement || document.msFullScreenElement || document.webkitFullscreenElement || null
    },
    setFullScreen() {
      this.isFull = !this.isFull
      if (this.isFullScreen()) {
        if (document.exitFullScreen) {
          document.exitFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        if (document.body.requestFullscreen) {
          document.body.requestFullscreen()
        } else if (document.body.mozRequestFullScreen) {
          document.body.mozRequestFullScreen()
        } else if (document.body.webkitRequestFullscreen) {
          ele.webkitRequestFullscreen()
        } else if (document.body.msRequestFullscreen) {
          document.body.msRequestFullscreen()
        }
      }
    },
    logout() {
      this.$API.userLogout((message) => {
        console.log(message)
        if (message.success) {
          this.$router.replace({ name: 'Sign' })
        }
      })
    },
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
      if (typeof tabConfig === 'function') {
        // 负责切换 router-view 里面的内容
        tabConfig((config) => {
          this.currentTabKey = config.key
          if (config.key !== 'main') {
            this.$router.replace(`/master/tab/${config.type}/${config.key}`)
          } else {
            this.$router.replace(this.currentMainTabPath)
          }
        })
      } else {
        this.currentTabKey = tabConfig.key
        if (tabConfig.key !== 'main') {
          this.$router.replace(`/master/tab/${tabConfig.type}/${tabConfig.key}`)
        } else {
          this.$router.replace(this.currentMainTabPath)
        }
      }
    },
    checkNewLoad(tabKey, callback) {
      if (!this.tabMap.has(tabKey)) {
        callback(true, (tabConfig) => {
          // 新 tab 加入 tabMap
          this.currentTabKey = tabConfig.key
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
@media only screen and (max-width: 640px) {
  .left-head .headline {
    display: none;
  }
}

header {
  display: flex;
  padding: 5px;
  background-color: rgb(246, 246, 246);
}

.left-head {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  cursor: default;
}
.left-head .logo {
  width: 45px;
  height: 45px;
  padding: 5px;
}
.left-head .headline {
  line-height: 40px;
  padding: 5px 5px 0 5px;
  margin-right: 12px;
  color: rgb(58, 58, 58);
  font-size: 24px;
}

.left-head .main-page {
  display: inline-block;
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
.left-head .main-page span:active {
  background-color: rgb(48, 179, 212);
}

.right-head {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}
.right-head .name {
  margin: 0 10px;
  color: rgb(107, 107, 107);
  vertical-align: middle;
  font-size: 14px;
  font-weight: bold;
  cursor: default;
}
.right-head img {
  width: 40px;
  height: 40px;
  margin-right: 10px;
  vertical-align: middle;
  border: 2px solid rgba(163, 163, 163, 0.52);
  border-radius: 50%;
}
.right-head .portrait {
  height: 100%;
}
.right-head .portrait:hover .logout {
  display: block;
}
.right-head .portrait .logout {
  display: none;
  position: absolute;
  right: 50px;
  margin-top: 2px;
  padding: 5px 10px;
  color: rgb(63, 63, 63);
  font-size: 14px;
  font-weight: bold;
  background-color: rgb(255, 255, 255);
  border: 3px solid rgb(181, 181, 181);
  border-radius: 5px;
  cursor: pointer;
  z-index: 260;
}
.right-head .portrait .logout:hover {
  color: rgb(255, 255, 255);
  background-color: rgb(171, 84, 84);
}
.right-head .portrait .logout:active {
  color: rgb(255, 255, 255);
  background-color: rgb(212, 138, 138);
}

.right-head .fullscreen span {
  color: rgb(82, 126, 96);
  font-size: 30px;
  vertical-align: middle;
  cursor: pointer;
}
.right-head .fullscreen span:hover {
  color: rgb(91, 167, 202);
}
.right-head .fullscreen span.exit {
  color: rgb(7, 190, 65);
}

header .center-head {
  display: flex;
  align-items: center;
  flex-grow: 1;
  padding: 0 20px;
  min-width: 100px;
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
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;
}
.center-head .tab:hover {
  background-color: rgb(168, 199, 188);
}
.center-head .tab.active {
  background-color: rgb(58, 167, 130);
}
.center-head .tab:active {
  background-color: rgb(104, 202, 168);
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
  border-radius: 5px;
}
.center-head .closebt:hover {
  color: rgb(255, 255, 255);
  background-color: rgba(214, 9, 9, 0.692);
}
.center-head .closebt:active {
  background-color: rgba(219, 133, 133, 0.692);
}

footer {
  width: 100%;
  font-size: 14px;
  text-align: center;
  line-height: 30px;
  background-color: rgb(246, 246, 246);
}

section {
  display: flex;
  flex-grow: 1;
}

main {
  flex-grow: 1;
  background-color: rgb(133, 133, 133);
  /* FIXME 此处设置hidden是因为在chartTab页面在一些情况如打开DevTools并拉伸DevTools时，页面会不时出现横向overflow的现象，但最终应该是要找出overflow的原因而不是在这里设置hidden。复现方式：将次hidden设置注释掉，然后打开控制台并拉伸。 */
  overflow: hidden;
}
</style>
