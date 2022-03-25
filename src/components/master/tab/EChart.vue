<template>
  <div id="chart-box" ref="chartBox"></div>
</template>

<script>
// import * as echarts from 'echarts'
import echarts from '@/assets/script/myEcharts'
import 'echarts-countries-js/echarts-countries-js/china'
import { markRaw } from '@vue/reactivity'
export default {
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
  data() {
    return {
      myChart: {},
    }
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
  mounted() {
    this.myChart = markRaw(echarts.init(this.$refs.chartBox))
    if (this.data.length !== 0) {
      this.setOption(this.data, this.option)
    }
    setTimeout(() => {
      this.chartResize()
    }, 0)
    window.addEventListener('resize', this.chartResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.chartResize)
  },
  methods: {
    test() {
      console.log(this.myChart.getOption())
    },
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
        if (data.length - 1 != preSeries.length) {
          // 当'line', 'bar'等图的seires数变化时，需要清除一下series
          this.myChart.setOption(
            {
              series: undefined,
            },
            { replaceMerge: ['series'] }
          )
        }
        this.myChart.setOption({
          xAxis: {
            data: data[0].slice(1),
          },
          yAxis: {
            data: data[0].slice(1),
          },
          series,
        })
      } else if (preSeries[0] && ['pie', 'funnel', 'gauge', 'map'].includes(preSeries[0].type)) {
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
            data: data[0].slice(1),
          },
          yAxis: {
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
