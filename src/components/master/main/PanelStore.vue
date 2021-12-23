<!--
 * @Author: Cogic
 * @Date: 2021-12-21 16:50:26
 * @LastEditors: Cogic
 * @LastEditTime: 2021-12-23 19:07:09
 * @Description: 
-->
<template>
  <store-stage :stageConfig="stageConfig"></store-stage>
</template>

<script>
import StoreStage from '@/components/master/StoreStage.vue'
export default {
  components: { StoreStage },
  data() {
    return {
      stageConfig: {
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
            name: 'file1',
          },
          {
            name: 'file2',
          },
          {
            name: 'file3',
          },
          {
            name: 'file4',
          },
        ],
      },
    }
  },
}
</script>

<style scoped></style>
