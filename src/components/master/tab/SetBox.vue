<!--
 * @Author: Cogic
 * @Date: 2022-01-23 00:15:49
 * @LastEditors: Cogic
 * @LastEditTime: 2022-03-03 13:26:47
 * @Description: 
-->
<template>
  <div class="set-item" v-if="colorTheme[0] && settings.title[0]">
    <div class="name">主题</div>
    <div class="setting">
      主题色
      <select v-model="settings.color">
        <template v-for="(theme, index) in colorTheme">
          <option :value="theme">主题 {{ index + 1 }}</option>
        </template>
      </select>
    </div>
  </div>
  <div class="set-item" v-if="settings.title[0]">
    <div class="name">标题</div>
    <div class="setting">是否显示<input type="checkbox" v-model="settings.title[0].show" /></div>
    <div class="setting">标题内容<input type="text" v-model="settings.title[0].text" /></div>
    <div class="setting">
      字体
      <select v-model="settings.title[0].textStyle.fontFamily">
        <template v-for="(fontFamily, index) in fontFamilys">
          <option :value="fontFamily">{{ fontFamily }}</option>
        </template>
      </select>
    </div>
    <div class="setting">字体大小<input type="number" v-model="settings.title[0].textStyle.fontSize" /></div>
    <div class="setting">
      字体粗细
      <select v-model="settings.title[0].textStyle.fontWeight">
        <template v-for="(fontWeight, index) in fontWeights">
          <option :value="fontWeight">{{ fontWeight }}</option>
        </template>
      </select>
    </div>
    <div class="setting">文字颜色<input type="color" v-model="settings.title[0].textStyle.color" /></div>
    <div class="setting">距左侧<input type="text" v-model="settings.title[0].left" /></div>
    <div class="setting">距顶部<input type="text" v-model="settings.title[0].top" /></div>
    <div class="setting">副标题<input type="text" v-model="settings.title[0].subtext" /></div>
    <div class="setting">
      副标题字体
      <!-- <input type="text" v-model="settings.title[0].subtextStyle.fontFamily" /> -->
      <select v-model="settings.title[0].subtextStyle.fontFamily">
        <template v-for="(fontFamily, index) in fontFamilys">
          <option :value="fontFamily">{{ fontFamily }}</option>
        </template>
      </select>
    </div>
    <div class="setting">副标题字体大小<input type="number" v-model="settings.title[0].subtextStyle.fontSize" /></div>
    <div class="setting">
      副标题字体粗细
      <!-- <input type="text" v-model="settings.title[0].subtextStyle.fontWeight" /> -->
      <select v-model="settings.title[0].subtextStyle.fontWeight">
        <template v-for="(fontWeight, index) in fontWeights">
          <option :value="fontWeight">{{ fontWeight }}</option>
        </template>
      </select>
    </div>
    <div class="setting">副标题文字颜色<input type="color" v-model="settings.title[0].subtextStyle.color" /></div>
  </div>
  <div class="set-item" v-if="settings.legend[0]">
    <div class="name">图例</div>
    <div class="setting">是否显示<input type="checkbox" v-model="settings.legend[0].show" /></div>
    <div class="setting">类型<input type="text" v-model="settings.legend[0].type" /></div>
    <div class="setting">
      字体
      <!-- <input type="text" v-model="settings.legend[0].textStyle.fontFamily" /> -->
      <select v-model="settings.legend[0].textStyle.fontFamily">
        <template v-for="(fontFamily, index) in fontFamilys">
          <option :value="fontFamily">{{ fontFamily }}</option>
        </template>
      </select>
    </div>
    <div class="setting">字体大小<input type="number" v-model="settings.legend[0].textStyle.fontSize" /></div>
    <div class="setting">
      字体粗细
      <!-- <input type="text" v-model="settings.legend[0].textStyle.fontWeight" /> -->
      <select v-model="settings.legend[0].textStyle.fontWeight">
        <template v-for="(fontWeight, index) in fontWeights">
          <option :value="fontWeight">{{ fontWeight }}</option>
        </template>
      </select>
    </div>
    <div class="setting">文字颜色<input type="color" v-model="settings.legend[0].textStyle.color" /></div>
    <div class="setting">布局朝向<input type="text" v-model="settings.legend[0].orient" /></div>
    <div class="setting">距左侧<input type="text" v-model="settings.legend[0].left" /></div>
    <div class="setting">距顶部<input type="text" v-model="settings.legend[0].top" /></div>
  </div>
  <div class="set-item" v-if="settings.grid[0]">
    <div class="name">绘图网格</div>
    <div class="setting">是否显示<input type="checkbox" v-model="settings.grid[0].show" /></div>
    <div class="setting">左侧<input type="text" v-model="settings.grid[0].left" /></div>
    <div class="setting">顶部<input type="text" v-model="settings.grid[0].top" /></div>
    <div class="setting">右侧<input type="text" v-model="settings.grid[0].right" /></div>
    <div class="setting">底部<input type="text" v-model="settings.grid[0].bottom" /></div>
    <div class="setting">containLabel<input type="checkbox" v-model="settings.grid[0].containLabel" /></div>
  </div>
  <div class="set-item" v-if="settings.tooltip[0]">
    <div class="name">提示框组件</div>
    <div class="setting">是否显示<input type="checkbox" v-model="settings.tooltip[0].show" /></div>
    <div class="setting">
      内容格式
      <!-- <input type="text" v-model="settings.tooltip[0].formatter" /> -->
      <select v-model="settings.tooltip[0].formatter">
        <template v-for="(formatter, index) in formatters">
          <option :value="formatter">{{ formatter == null ? '默认' : formatter }}</option>
        </template>
      </select>
    </div>
    <div class="setting">背景颜色<input type="color" v-model="settings.tooltip[0].backgroundColor" /></div>
    <div class="setting">
      字体
      <!-- <input type="text" v-model="settings.tooltip[0].textStyle.fontFamily" /> -->
      <select v-model="settings.tooltip[0].textStyle.fontFamily">
        <template v-for="(fontFamily, index) in fontFamilys">
          <option :value="fontFamily">{{ fontFamily }}</option>
        </template>
      </select>
    </div>
    <div class="setting">字体大小<input type="number" v-model="settings.tooltip[0].textStyle.fontSize" /></div>
    <div class="setting">
      字体粗细
      <!-- <input type="text" v-model="settings.tooltip[0].textStyle.fontWeight" /> -->
      <select v-model="settings.tooltip[0].textStyle.fontWeight">
        <template v-for="(fontWeight, index) in fontWeights">
          <option :value="fontWeight">{{ fontWeight }}</option>
        </template>
      </select>
    </div>
    <div class="setting">文字颜色<input type="color" v-model="settings.tooltip[0].textStyle.color" /></div>
  </div>
  <div class="set-item" v-if="settings.visualMap[0]">
    <div class="name">视觉映射组件</div>
    <div class="setting">是否显示<input type="checkbox" v-model="settings.visualMap[0].show" /></div>
    <!-- <div class="setting">
      类型
      <select v-model="settings.visualMap[0].type">
        <template v-for="type in ['continuous', 'piecewise']">
          <option :value="type">{{ type }}</option>
        </template>
      </select>
    </div> -->
    <div class="setting">
      方向
      <select v-model="settings.visualMap[0].orient">
        <template v-for="orient in ['vertical', 'horizontal']">
          <option :value="orient">{{ orient }}</option>
        </template>
      </select>
    </div>
    <div class="setting">距左侧<input type="text" v-model="settings.visualMap[0].left" /></div>
    <div class="setting">距顶部<input type="text" v-model="settings.visualMap[0].top" /></div>
    <div class="setting">最小值<input type="number" v-model="settings.visualMap[0].min" /></div>
    <div class="setting">最大值<input type="number" v-model="settings.visualMap[0].max" /></div>
    <div class="setting">宽度<input type="number" v-model="settings.visualMap[0].itemWidth" /></div>
    <div class="setting">高度<input type="number" v-model="settings.visualMap[0].itemHeight" /></div>
    <div class="setting">
      调色
      <select v-model="settings.visualMap[0].controller.inRange.color" @change="settings.visualMap[0].target.inRange.color = settings.visualMap[0].controller.inRange.color">
        <template v-for="(inRange, index) in inRanges">
          <option :value="inRange">调色 {{ index + 1 }}</option>
        </template>
      </select>
    </div>
    <!-- <div class="setting">提示文本<input type="text" v-model="settings.visualMap[0]" /></div> -->
    <!-- <div class="setting">显示拖拽手柄<input type="checkbox" v-model="settings.visualMap[0].calculable" /></div> -->
    <!-- <div class="setting">背景颜色<input type="color" v-model="settings.visualMap[0].backgroundColor" /></div> -->
    <div class="setting">
      字体
      <!-- <input type="text" v-model="settings.tooltip[0].textStyle.fontFamily" /> -->
      <select v-model="settings.visualMap[0].textStyle.fontFamily">
        <template v-for="(fontFamily, index) in fontFamilys">
          <option :value="fontFamily">{{ fontFamily }}</option>
        </template>
      </select>
    </div>
    <div class="setting">字体大小<input type="number" v-model="settings.visualMap[0].textStyle.fontSize" /></div>
    <div class="setting">
      字体粗细
      <!-- <input type="text" v-model="settings.tooltip[0].textStyle.fontWeight" /> -->
      <select v-model="settings.visualMap[0].textStyle.fontWeight">
        <template v-for="(fontWeight, index) in fontWeights">
          <option :value="fontWeight">{{ fontWeight }}</option>
        </template>
      </select>
    </div>
    <div class="setting">文字颜色<input type="color" v-model="settings.tooltip[0].textStyle.color" /></div>
  </div>
  <div class="set-item" v-if="settings.xAxis[0]">
    <div class="name">x 轴</div>
    <div class="setting">是否显示<input type="checkbox" v-model="settings.xAxis[0].show" /></div>
    <div class="setting">名称<input type="text" v-model="settings.xAxis[0].name" /></div>
    <div class="setting">
      名称字体
      <!-- <input type="text" v-model="settings.xAxis[0].nameTextStyle.fontFamily" /> -->
      <select v-model="settings.xAxis[0].nameTextStyle.fontFamily">
        <template v-for="(fontFamily, index) in fontFamilys">
          <option :value="fontFamily">{{ fontFamily }}</option>
        </template>
      </select>
    </div>
    <div class="setting">名称字体大小<input type="number" v-model="settings.xAxis[0].nameTextStyle.fontSize" /></div>
    <div class="setting">
      名称字体粗细
      <!-- <input type="text" v-model="settings.xAxis[0].nameTextStyle.fontWeight" /> -->
      <select v-model="settings.xAxis[0].nameTextStyle.fontWeight">
        <template v-for="(fontWeight, index) in fontWeights">
          <option :value="fontWeight">{{ fontWeight }}</option>
        </template>
      </select>
    </div>
    <div class="setting">名称文字颜色<input type="color" v-model="settings.xAxis[0].nameTextStyle.color" /></div>
    <div class="setting">轴距<input type="number" v-model="settings.xAxis[0].nameGap" /></div>
    <div class="setting">轴旋转角度<input type="number" v-model="settings.xAxis[0].nameRotate" /></div>
    <div class="setting">反向<input type="text" v-model="settings.xAxis[0].inverse" /></div>
    <!-- <div class="setting">留白策略<input type="checkbox" v-model="settings.xAxis[0].boundaryGap" /></div> -->
  </div>
  <div class="set-item" v-if="settings.yAxis[0]">
    <div class="name">y 轴</div>
    <div class="setting">是否显示<input type="checkbox" v-model="settings.yAxis[0].show" /></div>
    <div class="setting">名称<input type="text" v-model="settings.yAxis[0].name" /></div>
    <div class="setting">
      名称字体
      <!-- <input type="text" v-model="settings.yAxis[0].nameTextStyle.fontFamily" /> -->
      <select v-model="settings.yAxis[0].nameTextStyle.fontFamily">
        <template v-for="(fontFamily, index) in fontFamilys">
          <option :value="fontFamily">{{ fontFamily }}</option>
        </template>
      </select>
    </div>
    <div class="setting">名称字体大小<input type="number" v-model="settings.yAxis[0].nameTextStyle.fontSize" /></div>
    <div class="setting">
      名称字体粗细
      <!-- <input type="text" v-model="settings.yAxis[0].nameTextStyle.fontWeight" /> -->
      <select v-model="settings.yAxis[0].nameTextStyle.fontWeight">
        <template v-for="(fontWeight, index) in fontWeights">
          <option :value="fontWeight">{{ fontWeight }}</option>
        </template>
      </select>
    </div>
    <div class="setting">名称文字颜色<input type="color" v-model="settings.yAxis[0].nameTextStyle.color" /></div>
    <div class="setting">轴距<input type="number" v-model="settings.yAxis[0].nameGap" /></div>
    <div class="setting">轴旋转角度<input type="number" v-model="settings.yAxis[0].nameRotate" /></div>
    <div class="setting">反向<input type="text" v-model="settings.yAxis[0].inverse" /></div>
    <!-- <div class="setting">留白策略<input type="checkbox" v-model="settings.yAxis[0].boundaryGap" /></div> -->
  </div>
  <div class="set-item" v-if="settings.axisPointer[0]">
    <div class="name">指示器</div>
    <div class="setting">是否显示<input type="checkbox" v-model="settings.axisPointer[0].show" /></div>
    <div class="setting">类型<input type="text " v-model="settings.axisPointer[0].type" /></div>
  </div>
  <div class="set-item" v-if="settings.backgroundColor && settings.title[0]">
    <div class="name">背景颜色</div>
    <div class="setting">颜色<input type="color" v-model="settings.backgroundColor" /></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  mounted() {
    this.defaultSettings = this.settings
    // let tempDiv = document.createElement('div')
    // let tempChart = echarts.init(tempDiv)
    // tempChart.setOption(this.settings)
  },
  data() {
    return {
      inRanges: [
        ['#f6efa6', '#d88273', '#bf444c'],
        ['#d6ecff', '#5f5de0', '#c368ff'],
        ['#fbffd6', '#c58031', '#970b06'],
        ['#d6ffd9', '#61e05d', '#069743'],
      ],
      formatters: [null, '{b}{c}', '{b}<br/>{c}', '{b}: {c}'],
      fontWeights: ['normal', 'bold', 'bolder', 'lighter'],
      fontFamilys: ['sans-serif', 'serif', 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', 'Cursive', 'Fantasy'],
      colorTheme: [
        ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
        ['#893448', '#d95850', '#eb8146', '#ffb248', '#f2d643', '#ebdba4'],
        ['#516b91', '#59c4e6', '#edafda', '#93b7e3', '#a5e7f0', '#cbb0e3'],
        ['#3fb1e3', '#6be6c1', '#626c91', '#a0a7e6', '#c4ebad', '#96dee8'],
        ['#c12e34', '#e6b600', '#0098d9', '#2b821d', '#005eaa', '#339ca8', '#cda819', '#32a487'],
      ],
      settings: {
        title: [
          {
            text: '图表标题',
            show: false,
            textStyle: {
              color: '#000000',
              fontWeight: 'bolder',
              fontFamily: 'sans-serif',
              fontSize: 18,
            },
            subtext: '',
            subtextStyle: {
              color: '#000000',
              fontWeight: 'normal',
              fontFamily: 'sans-serif',
              fontSize: 12,
            },
            left: 'left',
            top: 'top',
          },
        ],
        legend: [
          {
            show: false,
            type: 'plain',
            left: 'auto',
            top: 'auto',
            orient: 'horizontal',
            textStyle: {
              color: '#333',
              fontWeight: 'normal',
              fontFamily: 'sans-serif',
              fontSize: 12,
            },
          },
        ],
        grid: [
          {
            show: false,
            left: '2%',
            top: '16%',
            right: '4%',
            bottom: '14%',
            containLabel: true,
          },
        ],
        xAxis: [
          {
            show: true,
            name: '',
            nameTextStyle: {
              color: '#ffffff',
              fontWeight: 'normal',
              fontFamily: 'sans-serif',
              fontSize: 12,
            },
            nameGap: 15,
            nameRotate: 0,
            inverse: false,
            // boundaryGap: true,
          },
        ],
        yAxis: [
          {
            show: true,
            name: '',
            nameTextStyle: {
              color: '#ffffff',
              fontWeight: 'normal',
              fontFamily: 'sans-serif',
              fontSize: 12,
            },
            nameGap: 15,
            nameRotate: 0,
            inverse: false,
            // boundaryGap: true,
          },
        ],
        polar: [],
        radiusAxis: [],
        angleAxis: [],
        radar: [],
        dataZoom: [],
        visualMap: [
          {
            seriesIndex: 0,
            min: 0,
            max: 200,
            left: 'left',
            top: 'bottom',
            text: ['高', '低'],
            calculable: true,
            show: true,
            z: 4,
            right: null,
            bottom: null,
            itemWidth: null,
            itemHeight: null,
            inverse: false,
            orient: 'vertical',
            backgroundColor: 'rgba(0,0,0,0)',
            borderColor: '#ccc',
            contentColor: '#5793f3',
            inactiveColor: '#aaa',
            borderWidth: 0,
            padding: 5,
            textGap: 10,
            precision: 0,
            textStyle: {
              color: '#333',
            },
            align: 'auto',
            hoverLink: true,
            realtime: true,
            handleIcon: 'path://M-11.39,9.77h0a3.5,3.5,0,0,1-3.5,3.5h-22a3.5,3.5,0,0,1-3.5-3.5h0a3.5,3.5,0,0,1,3.5-3.5h22A3.5,3.5,0,0,1-11.39,9.77Z',
            handleSize: '120%',
            handleStyle: {
              borderColor: '#fff',
              borderWidth: 1,
            },
            indicatorIcon: 'circle',
            indicatorSize: '50%',
            indicatorStyle: {
              borderColor: '#fff',
              borderWidth: 2,
              shadowBlur: 2,
              shadowOffsetX: 1,
              shadowOffsetY: 1,
              shadowColor: 'rgba(0,0,0,0.2)',
            },
            target: {
              inRange: {
                color: ['#f6efa6', '#d88273', '#bf444c'],
              },
              outOfRange: {
                color: ['rgba(0,0,0,0)'],
                opacity: [0, 0],
              },
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
            range: [0, 200],
            type: 'continuous',
          },
        ],
        // visualMap: [

        //   {
        //     type: 'continuous',
        //     text: ['High', 'Low'],
        //     controller: {
        //       inRange: {
        //         color: ['#f6efa6', '#d88273', '#bf444c'],
        //         symbol: ['roundRect'],
        //         symbolSize: [20, 20],
        //       },
        //       outOfRange: {
        //         color: ['#aaa'],
        //         symbol: ['roundRect'],
        //         symbolSize: [20, 20],
        //       },
        //     },
        //   },
        // ],
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
        pie: ['grid', 'xAxis', 'yAxis', 'polar', 'radar', 'visualMap','axisPointer'],
        scatter: ['radar', 'visualMap'],
        funnel: ['grid', 'xAxis', 'yAxis', 'polar', 'radar', 'visualMap','axisPointer'],
        gauge: ['legend','grid', 'xAxis', 'yAxis', 'polar', 'radar', 'visualMap','axisPointer'],
        map: ['legend', 'grid', 'xAxis', 'yAxis', 'polar', 'radar','axisPointer'],
      },
    }
  },
  props: {
    onSetChange: {
      type: Function,
      default: function () {},
    },
  },
  watch: {
    settings: {
      handler(newValue) {
        this.onSetChange(undefined, newValue)
      },
      deep: true,
    },
  },
  methods: {
    setSettings(option) {
      // this.resetSettings()
      // this.tempChart.setOption(option)
      this.settings = this.defaultSettings
      this.settings = Object.assign({}, this.formatOption(option))
      if (option && option.series[0]) {
        this.cutSettings(this.settings, option.series[0].type)
      } else {
        this.cutSettings(this.settings)
      }
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
    // resetSettings() {
    //   this.settings = this.defaultSettings
    //   let tempDiv = document.createElement('div')
    //   let tempChart = echarts.init(tempDiv)
    //   tempChart.setOption(this.settings)
    // },
    formatOption(option) {
      let tempDiv = document.createElement('div')
      let tempChart = echarts.init(tempDiv)
      // tempChart.setOption({})
      // option = Object.assign(tempChart.getOption(),option)
      tempChart.setOption(this.settings)
      if (option) {
        tempChart.setOption(option)
      }
      // let tempOption = tempChart.getOption()
      // tempChart.setOption(tempOption)
      return tempChart.getOption()
    },
  },
}
</script>

<style scoped>
.set-item {
  margin: 0 0 5px 0;
  padding: 0 5px 5px 5px;
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
}
.set-item:hover {
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.26);
}
.set-item .name {
  color: rgb(109, 134, 159);
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  border-bottom: 2px solid rgb(197, 197, 197);
}
.set-item .setting {
  display: flex;
  justify-content: space-between;
  margin: 2px 0;
  padding: 5px 5px;
  color: rgb(17, 106, 77);
  font-size: 16px;
  border-radius: 3px;
}
.set-item .setting:hover {
  background-color: rgb(241, 239, 237);
}
.set-item .setting input {
  width: 100px;
  height: 23px;
  padding: 0 5px;
  border: 1px solid rgb(212, 212, 212);
}
.set-item .setting select {
  width: 100px;
  border: 1px solid rgb(212, 212, 212);
}
.aaaa {
  color: #d6ecff #5f5de0 #c368ff;
  color: #d6ffd9 #61e05d #069743;
  color: #fbffd6 #c58031 #970b06;
}
</style>
