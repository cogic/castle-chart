<!--
 * @Author: Cogic
 * @Date: 2021-12-22 11:46:24
 * @LastEditors: Cogic
 * @LastEditTime: 2021-12-23 19:05:39
 * @Description: 
-->
<template>
  <div id="board">
    <div class="placard">
      <div>
        <img class="logo" src="@/assets/logo.png" alt="logo" />
        <h1 class="headline">CastleChart</h1>
      </div>
      <!-- <footer>&copy;2021</footer> -->
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
}
</script>

<style scoped>
#board {
  display: flex;
  /* flex-direction: column; */
  /* flex-wrap: wrap; */
  /* justify-content:center; */
  /* align-items:baseline; */
  /* align-content: space-evenly; */

  flex-grow: 1;

  /* height: 100%; */
  width: 100%;
  background-color: rgb(241, 240, 240);
}

.placard {
  display: flex;
  flex-direction: column;
  /* flex-wrap: wrap; */
  justify-content: center;
  align-items: flex-end;
  /* align-content:center; */

  /* order: 1; */
  flex-grow: 1;
  /* flex-shrink: 2; */
  flex-basis: 300px;
  /* align-self: center; */

  margin: 30px 0;
  /* background-color: rgb(240, 255, 240); */
}
.placard img {
  width: 200px;
  height: 200px;
  margin: 0 100px;
  /* background-color: antiquewhite; */
}
.placard h1 {
  font-size: 50px;
  line-height: 80px;
  text-align: center;
  /* background-color: beige; */
}
.placard > div {
  /* background-color: azure; */
}
/* .placard > footer {
  position: absolute;
  bottom: 5px;
  color: rgb(105, 105, 105);
  font-size: 16px;
} */

.account {
  display: flex;
  flex-direction: column;
  /* flex-wrap: wrap; */
  justify-content: center;
  align-items: flex-start;
  align-content: center;

  /* order: 1; */
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 400px;
  /* flex: 0.5 0.1 50px; */
  /* align-self: center; */

  width: 200px;
  margin-bottom: 100px;
  /* background-color: rgb(136, 209, 154); */
}
.signbox {
  display: flex;
  flex-direction: column;
  /* flex-wrap:wrap; */
  justify-content: space-evenly;
  /* align-items:baseline; */
  /* align-content:space-evenly; */

  width: 390px;
  height: 400px;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
}
.signbox nav {
  /* order: 1; */
  /* flex-grow: 1; */
  /* flex-shrink: 0.1; */
  /* flex-basis: 50px; */
  /* flex: 0.5 0.1 50px; */
  /* align-self: center; */

  margin: 10px 5px;
  /* padding: 0 5px; */
  /* background-color: brown; */
}
.signbox nav > ul > li {
  display: inline-block;
  width: 50%;
  padding: 0 5px;
  /* background-color: cadetblue; */
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
.signbox main {
  /* order: 1; */
  flex-grow: 1;
  /* flex-shrink: 0.1; */
  /* flex-basis: 50px; */
  /* align-self: center; */

  /* width: calc(100% - 20px); */
  /* height: calc(100% - 70px); */
  margin: 0 10px 10px 10px;
  /* background-color: rgb(235, 185, 93); */
  /* border-radius: 10px; */
}
@media only screen and (max-width: 640px) {
  #board {
    flex-wrap: wrap;
  }
  .placard {
    align-items: center;
  }
  .account{
    align-items: center;
  }
}
</style>
