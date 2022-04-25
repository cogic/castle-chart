<template>
  <div id="stage">
    <h1 class="headtext">Welcome to CastleChart!</h1>
    <h1 class="headtext">一站式数据可视化搭建平台</h1>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
@media only screen and (max-width: 640px) {
  #stage .headtext {
    font-size: 20px;
  }
}

#stage {
  height: 100%;
  background-color: antiquewhite;
  border-radius: 7px 0 0 7px;
  background-size: 100% 130%;
  background-repeat: no-repeat;
  background-image: url('~@/assets/image/bac2.jpg');
  padding-top: 15%;
}
#stage h1 {
  color: rgb(255, 98, 7);
  text-shadow:  20px 20px 29px #929292,
             -20px -20px 29px #ffffff;
  text-align: center;
  line-height: 100px;
  /* padding-top: 60px; */
}
</style>
