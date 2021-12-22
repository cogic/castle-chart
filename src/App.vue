<!--
 * @Author: Cogic
 * @Date: 2021-12-21 13:58:35
 * @LastEditors: Cogic
 * @LastEditTime: 2021-12-22 14:20:34
 * @Description: 
 * @FilePath: \castle-chart\src\App.vue
-->
<template>
  <router-view v-slot="{ Component }">
    <master>
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </master>
  </router-view>
</template>

<script>
import Master from '@/components/Master.vue'
export default {
  components: { Master },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
