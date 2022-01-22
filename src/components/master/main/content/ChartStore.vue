<!--
 * @Author: Cogic
 * @Date: 2021-12-21 16:50:10
 * @LastEditors: Cogic
 * @LastEditTime: 2022-01-01 23:44:15
 * @Description: 
-->
<template>
  <store-stage :stageConfig="stageConfig"></store-stage>
</template>

<script>
import StoreStage from '@/components/master/main/StoreStage.vue'
import API from '@/api'
export default {
  mounted() {
    API.getChartList((result)=>{
      if (result.success) {
        this.stageConfig.files = result.filesInfo
      }
    })
  },
  components: { StoreStage },
  data() {
    return {
      stageConfig: {
        type: 'chart',
        title: '我的图表',
        tools: {
          build: {
            show: true,
          },
          copy: {
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
          {
            id: 3,
            name: 'file3',
          },
          {
            id: 4,
            name: 'file4',
          },
          {
            id: 5,
            name: 'file1',
          },
          {
            id: 6,
            name: 'file2',
          },
          {
            id: 7,
            name: 'file3',
          },
          {
            id: 8,
            name: 'file4',
          },
        ],
        style: {
          title: {
            backgroundColor: 'rgb(150, 207, 164)',
          },
        },
      },
    }
  },
}
</script>

<style scoped>
</style>
