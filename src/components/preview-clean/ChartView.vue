<!--
 * @Author: Cogic
 * @Date: 2022-02-28 22:58:48
 * @LastEditors: Cogic
 * @LastEditTime: 2022-03-12 01:15:39
 * @Description: 
-->
<template>
  <e-chart ref="myChart" :data="chartData" :option="chartOption"></e-chart>
</template>

<script>
import API from '@/api'
import EChart from '@/components/master/tab/EChart.vue'
export default {
  components: { EChart },
  mounted() {
    API.getChart({ _id: this.$route.params.viewid }, (message) => {
      if (message.success) {
        this.chartData = message.info.data
        this.chartOption = message.info.option
      }
    })
  },
  data() {
    return {
      chartData: {},
      chartOption: {},
    }
  },
}
</script>

<style scoped></style>
