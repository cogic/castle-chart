<template>
  <e-chart ref="myChart" :data="chartData" :option="chartOption"></e-chart>
</template>

<script>
import EChart from '@/components/master/tab/EChart.vue'
export default {
  components: { EChart },
  data() {
    return {
      chartData: {},
      chartOption: {},
    }
  },
  mounted() {
    this.$API.getChart({ _id: this.$route.params.viewid }, (message) => {
      if (message.success) {
        this.chartData = message.info.data
        this.chartOption = message.info.option
      }
    })
  },
}
</script>

<style scoped></style>
