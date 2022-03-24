<!--
 * @Author: Cogic
 * @Date: 2021-12-21 16:50:26
 * @LastEditors: Cogic
 * @LastEditTime: 2022-03-23 17:19:34
 * @Description: 
-->
<template>
  <store-stage :stageConfig="stageConfig"></store-stage>
</template>

<script>
import StoreStage from '@/components/master/main/StoreStage.vue'
export default {
  mounted() {
    this.$API.getPanelList((message)=>{
      if (message.success) {
        this.stageConfig.files = message.info
      }
    })
  },
  components: { StoreStage },
  data() {
    return {
      stageConfig: {
        type: 'panel',
        title: '我的仪表板',
        tools: {
          build: {
            show: true,
          },
          copy: {
            show: true,
          },
          rename: {
            show: true,
          },
          delete: {
            show: true,
          },
          sort: {
            show: true,
          },
          view: {
            show: true,
          },
        },
        files: [],
        style: {
          title: {
            backgroundColor: 'rgb(207, 157, 150)',
          },
        },
      },
    }
  },
}
</script>

<style scoped>
</style>
