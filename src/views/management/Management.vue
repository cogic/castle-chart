<template>
  <div class="outer">
    <pop-box ref="PopBox" :trueFunc="deleteSample" :info="'确定要删除该模板吗？'" v-if="toShow" />
    <div class="headline">CastleChart&nbsp图表模板中心</div>
    <div class="menu-box">
      <el-button @click="showEditBox(newChartInfo)">新建</el-button>
      <el-button @click="flush">刷新</el-button>
    </div>
    <div class="main-box">
      <div class="item-box" v-for="chart in sampleCharts" @click="showEditBox(chart)">
        <div class="item-img"><img :src="chart.imgSrc" alt="" /></div>
        <div class="item-name">
          {{ chart.name }}
        </div>
      </div>
    </div>
    <div class="show-box" id="showBox" @mousedown="hideEditBox" v-show="isEditBoxShow">
      <div class="menu-box">
        <el-button type="primary" @click="save">保存</el-button>
        <el-button type="danger" @click="toShow = true">删除</el-button>
        <el-button type="warning" @click="hideEditBox(1)">取消</el-button>
      </div>
      <div class="content-box">
        <div class="left">
          <div class="tool-box">
            <el-button type="success" @click="run">运行</el-button>
          </div>
          <div class="content">
            <code-box ref="code"></code-box>
          </div>
        </div>
        <div class="center">
          <div class="tool-box">
            <el-input v-model="curChart.name" placeholder="Please input" />
            <el-input v-model="curChart.type" placeholder="Please input" />
          </div>
          <div class="content" id="chartp">
            <e-chart ref="chart" :data="chartData" :option="chartOption"></e-chart>
          </div>
        </div>
        <div class="right">
          <div class="tool-box">
            <el-button type="success" @click="importData">导入</el-button>
          </div>
          <div class="content">
            <h-table ref="table" :hookFunc="tableChange"></h-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CodeBox from '@/components/general/CodeBox.vue'
import EChart from '@/components/general/EChart.vue'
import HTable from '@/components/general/HTable.vue'
import PopBox from '@/components/general/PopBox'
import echarts from '@/assets/script/myEcharts'
import html2canvas from 'html2canvas'

export default {
  components: { CodeBox, EChart, HTable, PopBox },
  data() {
    return {
      toShow: false,
      newChartInfo: {
        name: '新建图表',
        type: 'line',
        tableData: [
          ['Week', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          ['value', 150, 230, 224, 218, 135, 147, 260],
        ],
        option: {
          xAxis: {
            type: 'category',
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              type: 'line',
            },
          ],
        },
        imgSrc: '@/assets/image/图表.png',
      },
      sampleCharts: [],
      chartOption: undefined,
      chartData: undefined,
      curChart: {},
      isEditBoxShow: false,
      settings: {
        title: [
          {
            text: '图表标题',
            show: true,
            textStyle: {
              color: 'rgb(0,0,0)',
              fontWeight: 'bolder',
              fontFamily: 'sans-serif',
              fontSize: 24,
            },
            padding: 24,
            subtext: '',
            subtextStyle: {
              color: '#000000',
              fontWeight: 'normal',
              fontFamily: 'sans-serif',
              fontSize: 12,
            },
            left: 'center',
            top: 'top',
          },
        ],
        legend: [
          {
            show: true,
            type: 'plain',
            left: 'center',
            top: 'bottom',
            orient: 'horizontal',
            padding: 20,
            textStyle: {
              color: '#333',
              fontWeight: 'normal',
              fontFamily: 'sans-serif',
              fontSize: 12,
            },
            itemGap: 10,
            icon: 'roundRect',
            itemWidth: 25,
            itemHeight: 14,
          },
        ],
        grid: [
          {
            show: false,
            left: '10%',
            top: '16%',
            right: '10%',
            bottom: '14%',
            containLabel: true,
          },
        ],
        xAxis: [
          {
            show: true,
            name: '',
            nameTextStyle: {
              color: '#000000',
              fontWeight: 'normal',
              fontFamily: 'sans-serif',
              fontSize: 12,
            },
            position: 'bottom',
            nameGap: 15,
            nameRotate: 0,
            inverse: false,
            boundaryGap: true,
            type: 'category',
            axisLine: {
              show: true,
              symbol: ['none', 'none'],
              symbolSize: [10, 15],
              symbolOffset: 0,
              lineStyle: {
                color: '#333',
                with: 1,
                shadowBlur: 0,
                shadowColor: 'rgba(0, 0, 0, 1)',
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                opacity: 1,
              },
              axisLabel: {
                show: true,
                inside: false,
                rotate: 0,
                margin: 8,
                hideOverlap: true,
                color: 'rgb(0,0,0)',
                fontWeight: 'bolder',
                fontFamily: 'sans-serif',
                fontSize: 24,
              },
            },
            axisPointer: {
              show: false,
              type: 'line',
              lineStyle: {
                color: 'rgba(150,150,150,0.3)',
                width: 1,
                opacity: 1,
              },
              shadowStyle: {
                color: 'rgba(150,150,150,0.3)',
                width: 1,
                opacity: 1,
              },
            },
          },
        ],
        yAxis: [
          {
            show: true,
            name: '',
            nameTextStyle: {
              color: '#000000',
              fontWeight: 'normal',
              fontFamily: 'sans-serif',
              fontSize: 12,
            },
            position: 'left',
            nameGap: 15,
            nameRotate: 0,
            inverse: false,
            boundaryGap: true,
            type: 'value',
            axisLine: {
              show: false,
              symbol: ['none', 'none'],
              symbolSize: [10, 15],
              symbolOffset: 0,
              lineStyle: {
                color: '#333',
                with: 1,
                shadowBlur: 0,
                shadowColor: 'rgba(0, 0, 0, 1)',
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                opacity: 1,
              },
              axisLabel: {
                show: true,
                inside: false,
                rotate: 0,
                margin: 8,
                hideOverlap: true,
                color: 'rgb(0,0,0)',
                fontWeight: 'bolder',
                fontFamily: 'sans-serif',
                fontSize: 24,
              },
            },
            axisPointer: {
              show: false,
              type: 'shadow',
              lineStyle: {
                color: 'rgba(150,150,150,0.3)',
                width: 1,
                opacity: 1,
              },
              shadowStyle: {
                color: 'rgba(150,150,150,0.3)',
                width: 1,
                opacity: 1,
              },
            },
          },
        ],
        polar: [],
        radiusAxis: [],
        angleAxis: [],
        radar: [],
        dataZoom: [],
        visualMap: [
          {
            type: 'continuous',
            text: ['High', 'Low'],
            textStyle: {},
            itemWidth: 20,
            itemHeight: 140,
            padding: 5,
            inRange: {
              color: ['#f6efa6', '#d88273', '#bf444c'],
              symbol: ['roundRect'],
              symbolSize: [20, 20],
            },
            outOfRange: {
              color: ['#aaa'],
              symbol: ['roundRect'],
              symbolSize: [20, 20],
            },
            controller: {
              inRange: {
                color: ['#f6efa6', '#d88273', '#bf444c'],
                symbol: ['roundRect'],
                symbolSize: [20, 20],
              },
              outOfRange: {
                color: ['#aaa'],
                symbol: ['roundRect'],
                symbolSize: [20, 20],
              },
            },
            target: {
              inRange: {
                color: ['#f6efa6', '#d88273', '#bf444c'],
                symbol: ['roundRect'],
                symbolSize: [20, 20],
              },
              outOfRange: {
                color: ['#aaa'],
                symbol: ['roundRect'],
                symbolSize: [20, 20],
              },
            },
          },
        ],
        tooltip: [
          {
            show: false,
            formatter: undefined,
            backgroundColor: 'rgba(50,50,50,0.7)',
            textStyle: {
              color: '#fff',
              fontWeight: 'normal',
              fontFamily: 'sans-serif',
              fontSize: 12,
            },
          },
        ],
        axisPointer: [
          {
            show: false,
            type: 'line',
          },
        ],
        toolbox: [],
        brush: [],
        geo: [],
        parallel: [],
        parallelAxis: [],
        singleAxis: [],
        timeline: [],
        graphic: [],
        calendar: [],
        dataset: [],
        aria: [],
        series: [],
        darkMode: 'auto',
        color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
        backgroundColor: '#ffffff',
        textStyle: {
          fontFamily: 'Microsoft YaHei',
          fontSize: 12,
          fontStyle: 'normal',
          fontWeight: 'normal',
        },
        animation: 'auto',
        animationThreshold: 2000,
        animationDuration: 1000,
        animationEasing: 'cubicInOut',
        animationDelay: 0,
        animationDurationUpdate: 300,
        animationEasingUpdate: 'cubicInOut',
        animationDelayUpdate: 0,
        stateAnimation: {
          duration: 300,
          easing: 'cubicOut',
        },
        blendMode: 'source-over',
        hoverLayerThreshold: 3000,
        useUTC: false,
        options: [],
        media: [],

        colorBy: 'series',
        gradientColor: ['#f6efa6', '#d88273', '#bf444c'],
        progressiveThreshold: 3000,
        progressive: 400,
        markArea: [],
        markLine: [],
        markPoint: [],
      },
      defaultSettings: {},
      cutSettingsOf: {
        line: ['radar', 'visualMap'],
        bar: ['polar', 'radar', 'visualMap'],
        pie: ['grid', 'xAxis', 'yAxis', 'polar', 'radar', 'visualMap', 'axisPointer'],
        scatter: ['radar', 'visualMap'],
        funnel: ['grid', 'xAxis', 'yAxis', 'polar', 'radar', 'visualMap', 'axisPointer'],
        gauge: ['legend', 'grid', 'xAxis', 'yAxis', 'polar', 'radar', 'visualMap', 'axisPointer'],
        map: ['legend', 'grid', 'xAxis', 'yAxis', 'polar', 'radar', 'axisPointer'],
      },
    }
  },
  beforeCreate() {
    this.$API.checkAdmin((message) => {
      if (message.success) {
        this.username = message.info.username
      } else {
        this.$router.replace({ name: 'Sign' })
      }
    })
  },
  mounted() {
    this.defaultSettings = JSON.parse(JSON.stringify(this.settings))
    this.$API.getSampleListDefault((message) => {
      this.sampleCharts = message.info
    })
  },
  methods: {
    flush() {
      this.sampleCharts = []
      this.$API.getSampleListDefault((message) => {
        this.sampleCharts = message.info
      })
    },
    save() {
      console.log(this.curChart)
      html2canvas(document.getElementById('chartp')).then((canvas) => {
        this.curChart.imgSrc = canvas.toDataURL('image/png', 1)
        if (this.curChart._id) {
          this.$API.saveSample(this.curChart, (message) => {
            console.log(message)
          })
        } else {
          this.$API.newSample(this.curChart, (message) => {
            this.curChart._id = message.info
            console.log(message)
          })
        }
      })
    },
    deleteSample() {
      this.$API.deleteSample({ _id: this.curChart._id }, (message) => {
        this.hideEditBox(1)
      })
    },
    cutSettings(settings, type) {
      if (type) {
        let cuts = this.cutSettingsOf[type]
        cuts.forEach((val) => {
          if (settings.hasOwnProperty(val)) {
            settings[val] = []
          }
        })
      } else {
        for (const key in settings) {
          if (Object.hasOwnProperty.call(settings, key)) {
            settings[key] = []
          }
        }
      }
    },
    formatOption(option, settings) {
      let tempDiv = document.createElement('div')
      let tempChart = echarts.init(tempDiv)
      tempChart.setOption(settings)
      if (option) {
        tempChart.setOption(option)
      }
      return tempChart.getOption()
    },
    run() {
      eval(this.$refs.code.getCopyText() + ';this.chartOption = option')
      this.chartOption = this.formatOption(this.chartOption, this.settings)
      this.curChart.option = this.chartOption
      setTimeout(() => {
        console.log(this.curChart.option);
        this.setChart(this.curChart.tableData)
      }, 0)
    },
    showEditBox(chartItem) {
      this.settings = JSON.parse(JSON.stringify(this.defaultSettings))
      this.cutSettings(this.settings, chartItem.type)
      this.$refs.chart.clear()
      this.curChart = chartItem
      // this.$refs.code.setValue(JSON.stringify(chartItem.option, null, '\t'))
      this.$refs.code.setValue('let option = ' + JSON.stringify(chartItem.option, null, '\t'))
      setTimeout(() => {
        this.$refs.chart.chartResize()
      }, 0)
      this.run()
      this.$refs.table.loadData(chartItem.tableData)
      this.isEditBoxShow = true
    },
    hideEditBox(e) {
      if (e === 1 || e.target.id === 'showBox') {
        this.isEditBoxShow = false
      }
    },
    tableChange(data) {
      // 当数据表修改时触发已修改图表数据
      setTimeout(() => {
        this.setChart(data)
        this.curChart.tableData = data
      }, 0)
    },
    setChart(data, option = {}) {
      this.$refs.chart.setOption(data, option)
    },
    importData() {
      this.$refs.table.importData()
    },
  },
}
</script>

<style scoped>
.outer {
  position: relative;
  height: 100%;
  overflow: hidden;
}
.outer .headline {
  padding-left: 50px;
  line-height: 60px;
  font-size: 30px;
  font-weight: bold;
  color: rgb(255, 255, 255);
  background-color: rgb(13, 101, 128);
}

.outer > .menu-box {
  padding: 10px;
  background-color: rgb(94, 141, 194);
}

.main-box {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;

  height: 100%;
  background-color: rgb(255, 255, 255);
  overflow: auto;
}
.main-box .item-box {
  width: 150px;
  margin: 10px;
  border: 2px solid rgb(167, 167, 167);
  border-radius: 6px;
  overflow: hidden;
  transition: all 0.3s;
  cursor: pointer;
}
.main-box .item-box:hover {
  border: 2px solid rgb(0, 0, 0);
  box-shadow: 6px 6px 12px #c1c1c1, -6px -6px 12px #ffffff;
}
.main-box .item-box .item-img {
  height: 80px;
  background-color: rgb(230, 230, 230);
  overflow: hidden;
}
.main-box .item-box .item-img img {
  width: 100%;
}

.main-box .item-box .item-name {
  padding: 0 5px;
  height: 30px;
  line-height: 30px;
  background-color: rgb(247, 247, 247);
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: keep-all;
}

.show-box {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(131, 131, 131, 0.212);
}
.show-box .menu-box {
  padding: 5px;
  background-color: rgb(19, 19, 19);
}
.content-box {
  position: relative;
  display: flex;
  width: 100%;
  flex-grow: 1;
  background-color: rgb(173, 34, 34);
}
.content-box .left {
  display: flex;
  flex-direction: column;
  width: 30%;
}
.content-box .left .tool-box {
  padding: 5px;
  background-color: #e9e9e9;
}
.content-box .left .content {
  flex-grow: 1;
}
.content-box .center {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: rgb(66, 66, 66);
}
.content-box .center .tool-box {
  padding: 5px;
}
.content-box .center .content {
  flex-grow: 1;
  padding: 5px;
}
.content-box .right {
  display: flex;
  flex-direction: column;
  width: 30%;
}
.content-box .right .tool-box {
  padding: 5px;
  background-color: #ddc6b1;
}
.content-box .right .content {
  flex-grow: 1;
}
</style>
