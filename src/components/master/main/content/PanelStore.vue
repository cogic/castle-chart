<!--
 * @Author: Cogic
 * @Date: 2021-12-21 16:50:26
 * @LastEditors: Cogic
 * @LastEditTime: 2021-12-29 00:54:08
 * @Description: 
-->
<template>
  <store-stage :stageConfig="stageConfig"></store-stage>
</template>

<script>
import StoreStage from '@/components/master/main/StoreStage.vue'
export default {
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
        files: [
          {
            id: 1,
            name: 'file1',
          },
          {
            id: 2,
            name: 'file2',
          },
        ],
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
