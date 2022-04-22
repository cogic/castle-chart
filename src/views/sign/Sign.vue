<template>
  <div id="board">
    <div class="placard">
      <div>
        <img class="logo" src="@/assets/image/logo.png" alt="logo" />
        <h1 class="headline">CastleChart</h1>
        <h1 class="headline2">数据可视化搭建平台</h1>
      </div>
    </div>
    <div class="account">
      <div class="signbox">
        <nav>
          <ul>
            <li v-for="tab in tabs">
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
        </main>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // TODO 这里的 登录 注册 之间切换相当于 $router.push, 改成编程式导航的 $router.replace 更好
      tabs: [
        {
          to: '/sign/in',
          topic: '登录',
        },
        {
          to: '/sign/up',
          topic: '注册',
        },
      ],
    }
  },
  beforeCreate() {
    this.$API.checkLogin((result) => {
      if (result.success) {
        this.$router.replace({name:'Master'})
      }
    })
  },
}
</script>

<style scoped>
#board {
  display: flex;

  flex-grow: 1;

  width: 100%;
  min-width: min-content;
  height: 100%;
  background-color: rgb(241, 240, 240);
}

.placard {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;

  flex-grow: 1;
  flex-basis: 300px;

  margin: 30px 0;
}
.placard img {
  width: 200px;
  height: 200px;
  margin: 0 100px;
}
.placard h1 {
  font-size: 50px;
  line-height: 80px;
  text-align: center;
}
h1.headline2{
  font-size: 30px;
  font-weight: normal;
  color: #333333;
}

.account {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  align-content: center;

  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 400px;

  width: 200px;
  margin-bottom: 30px;
}
.signbox {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  width: 390px;
  height: 400px;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
}
.signbox:hover {
  box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
}
.signbox nav {
  margin: 10px 5px;
}
.signbox nav > ul > li {
  display: inline-block;
  width: 50%;
  padding: 0 5px;
}
.signbox nav > ul > li > a {
  display: inline-block;
  width: 100%;
  color: rgb(177, 177, 177);
  font-size: 20px;
  text-align: center;
  line-height: 40px;
  background-color: rgb(233, 233, 233);
  border-radius: 10px;
  transition: background-color 0.5s;
}
.signbox nav > ul > li > a:hover {
  background-color: rgb(211, 211, 211);
}
.signbox nav > ul > li > a.router-link-active {
  color: rgb(250, 250, 250);
  background-color: rgb(138, 138, 138);
}
.signbox nav > ul > li > a:active {
  background-color: rgb(173, 173, 173);
}
.signbox main {
  flex-grow: 1;
  margin: 0 10px 10px 10px;
}
@media only screen and (max-width: 640px) {
  #board {
    flex-wrap: wrap;
  }
  .placard {
    align-items: center;
  }
  .account {
    align-items: center;
  }
}
</style>
