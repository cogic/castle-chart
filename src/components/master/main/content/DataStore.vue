<!--
 * @Author: Cogic
 * @Date: 2021-12-21 16:48:31
 * @LastEditors: Cogic
 * @LastEditTime: 2021-12-29 00:54:27
 * @Description: 
-->
<template>
  <store-stage :stageConfig="stageConfig"></store-stage>
</template>

<script>
import StoreStage from '@/components/master/main/StoreStage.vue'
import api from '@/api'
export default {
  mounted() {
    // FIXME 此处即使是有 keep-alive，也会执行多次（4次），导致重复请求，原因暂不明。复现方式：进入主页，不断切换到【数据源】
    const result = api.getTableList()
    if (result.success) {
      this.stageConfig.files = result.filesInfo
    }
  },
  components: { StoreStage },
  data() {
    return {
      stageConfig: {
        type: 'data',
        title: '我的数据源',
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
            backgroundColor: 'rgb(226, 200, 152)',
          },
        },
      },
    }
  },
}
</script>

<style scoped>
</style>
