<template>
  <header>
    <img class="logo" src="@/assets/image/logo.png" alt="logo" />
    <h1 class="headline">CastleChart</h1>
  </header>
  <main>
    <div id="view-outer">
      <div id="view-container">
        <component :is="currentView"></component>
      </div>
    </div>
  </main>
</template>

<script>
import ChartView from '@/components/preview/ChartView.vue'
import PanelView from '@/components/preview/PanelView.vue'
export default {
  components: { ChartView, PanelView },
  data() {
    return {}
  },
  computed: {
    currentView() {
      if (this.$route.params.type === 'chart') {
        return 'chart-view'
      } else if (this.$route.params.type === 'panel') {
        return 'panel-view'
      }
    },
  },
}
</script>

<style scoped>
header {
  display: flex;
  justify-content: center;
  background-color: rgb(196, 206, 216);
}
header .logo {
  width: 60px;
  height: 60px;
  padding: 10px;
  vertical-align: middle;
}
header .headline {
  line-height: 50px;
  padding: 10px 0px 5px 5px;
  margin-right: 30px;
  color: rgb(58, 58, 58);
  font-size: 24px;
  vertical-align: middle;
}
main {
  display: flex;
  justify-content: center;
  height: 100%;
  /* padding: 10px; */
  background-color: rgb(196, 206, 216);
  overflow: hidden;
}
main #view-outer {
  width: 100%;
  height: 100%;
  padding: 5px;
}
main #view-container {
  width: 100%;
  height: 100%;
  /* background-color: rgb(255, 255, 255); */
}
</style>
