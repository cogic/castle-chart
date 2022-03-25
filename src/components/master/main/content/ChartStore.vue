<template>
<!-- <component is="StoreStage" :stageConfig="stageConfig" :key="randNum"></component> -->
  <store-stage :stageConfig="stageConfig"></store-stage>
</template>

<script>
import StoreStage from '@/components/master/main/StoreStage.vue'
export default {
  mounted() {
    this.$API.getChartList((message) => {
      if (message.success) {
        this.stageConfig.files = message.info
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
  methods: {
    test(){
      this.$API.getChartList((message) => {
      if (message.success) {
        this.stageConfig.files = message.info
      }
    })
    },
  },
}
</script>

<style scoped></style>
