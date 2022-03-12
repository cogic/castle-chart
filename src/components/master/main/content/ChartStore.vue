<!--
 * @Author: Cogic
 * @Date: 2021-12-21 16:50:10
 * @LastEditors: Cogic
 * @LastEditTime: 2022-03-12 10:49:12
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
    API.getChartList((message) => {
      if (message.success) {
        this.stageConfig.files = message.info
        // this.stageConfig.files.forEach((val) => {
        //   API.getChartImg({ _id: val._id }, (message) => {
        //     console.log('ok' + val._id)
        //     val.src = 'data:image/jpg;base64,' + message.info.imgStr
        //   })
        // })
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
        files: [],
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

<style scoped></style>
