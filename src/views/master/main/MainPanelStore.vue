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
  mounted() {
    this.$API.getPanelList((message) => {
      if (message.success) {
        this.stageConfig.files = message.info
      }
    })
  },
}
</script>

<style scoped></style>
