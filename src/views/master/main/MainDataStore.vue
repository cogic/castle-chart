<template>
  <store-stage :stageConfig="stageConfig"></store-stage>
</template>

<script>
import StoreStage from '@/components/main/StoreStage.vue'
export default {
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
  mounted() {
    this.$API.getTableList((message) => {
      if (message.success) {
        this.stageConfig.files = message.info
      }
    })
  },
}
</script>

<style scoped></style>
