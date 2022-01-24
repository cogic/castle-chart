<!--
 * @Author: Cogic
 * @Date: 2021-12-30 10:21:11
 * @LastEditors: Cogic
 * @LastEditTime: 2022-01-24 23:18:08
 * @Description: 
-->
<template>
  <div id="chart-box" ref="chartBox">555555</div>
</template>

<script>
import * as echarts from 'echarts'
import { markRaw } from '@vue/reactivity'
export default {
  mounted() {
    this.myChart = markRaw(echarts.init(this.$refs.chartBox))
    if (this.data.length !== 0) {
      this.setOption(this.data, this.option)
    }
    setTimeout(() => {
      this.chartResize()
    }, 0)
  },
  activated() {
    window.addEventListener('resize', this.chartResize)
  },
  deactivated() {
    window.removeEventListener('resize', this.chartResize)
  },
  props: {
    data: {
      type: Array,
      default: [],
    },
    option: {
      type: Object,
      default: {},
    },
  },
  watch: {
    data(newValueData) {
      this.setOption(newValueData, this.option)
    },
    option: {
      handler(newValue) {
        this.setOption(undefined, newValue)
      },
      deep: true,
    },
  },
  data() {
    return {
      myChart: {},
    }
  },
  methods: {
    chartResize() {
      this.myChart.resize()
    },
    clear() {
      this.myChart.clear()
    },
    getOption() {
      return this.myChart.getOption()
    },
    setOption(data, option = {}) {
      this.myChart.setOption(option)
      if (!data) {
        return
      }
      const preOption = this.myChart.getOption()
      const preSeries = preOption.series
      if (data.length === 0) {
        data = [[]]
      } else if (preSeries[0] && data.length <= 1) {
        let one = JSON.parse(JSON.stringify(preSeries[preSeries.length - 1]))
        one.data = []
        this.myChart.setOption({
          series: [one],
        })
      }
      if (preSeries[0] && ['line', 'bar'].includes(preSeries[0].type)) {
        let series = []
        for (let i = 1; i < data.length; i++) {
          let one
          if (preSeries[i - 1]) {
            one = JSON.parse(JSON.stringify(preSeries[i - 1]))
          } else {
            one = JSON.parse(JSON.stringify(preSeries[0]))
          }
          one.name = data[i][0]
          one.data = data[i].slice(1)
          series.push(one)
        }
        this.myChart.setOption({
          xAxis: {
            name: data[0][0],
            data: data[0].slice(1),
          },
          series,
        })
      } else if (preSeries[0] && ['pie', 'funnel'].includes(preSeries[0].type)) {
        let one = JSON.parse(JSON.stringify(preSeries[preSeries.length - 1]))
        let newData = []
        for (let i = 1; i < data.length; i++) {
          newData.push({
            name: data[i][0],
            value: data[i][1],
          })
        }
        one.data = newData
        this.myChart.setOption({
          series: [one],
        })
      } else if (preSeries[0] && preSeries[0].type === 'scatter') {
        let one = JSON.parse(JSON.stringify(preSeries[preSeries.length - 1]))
        let newData = []
        for (let i = 1; i < data.length; i++) {
          newData.push(data[i].slice(1))
        }
        one.data = newData
        this.myChart.setOption({
          xAxis: {
            name: data[0][0],
            data: data[0].slice(1),
          },
          series: [one],
        })
      }
    },
  },
}
</script>

<style scoped>
#chart-box {
  width: 100%;
  height: 100%;
}
</style>
