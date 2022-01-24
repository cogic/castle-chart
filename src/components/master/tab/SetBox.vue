<!--
 * @Author: Cogic
 * @Date: 2022-01-23 00:15:49
 * @LastEditors: Cogic
 * @LastEditTime: 2022-01-25 03:43:48
 * @Description: 
-->
<template>
  <div class="set-item">
    <div class="name">主题</div>
    <div class="setting">
      主题色
      <select v-model="settings.color">
        <option :value="colorTheme[0]">主题 1</option>
        <option :value="colorTheme[1]">主题 2</option>
        <option :value="colorTheme[2]">主题 3</option>
        <option :value="colorTheme[3]">主题 4</option>
        <option :value="colorTheme[4]">主题 5</option>
      </select>
    </div>
  </div>
  <div class="set-item">
    <div class="name">标题</div>
    <div class="setting">是否显示<input type="checkbox" v-model="settings.title[0].show" /></div>
    <div class="setting">标题内容<input type="text" v-model="settings.title[0].text" /></div>
    <div class="setting">字体<input type="text" v-model="settings.title[0].textStyle.fontFamily" /></div>
    <div class="setting">字体大小<input type="number" v-model="settings.title[0].textStyle.fontSize" /></div>
    <div class="setting">字体粗细<input type="text" v-model="settings.title[0].textStyle.fontWeight" /></div>
    <div class="setting">文字颜色<input type="color" v-model="settings.title[0].textStyle.color" /></div>
    <div class="setting">距左侧<input type="text" v-model="settings.title[0].left" /></div>
    <div class="setting">距顶部<input type="text" v-model="settings.title[0].top" /></div>
    <div class="setting">副标题<input type="text" v-model="settings.title[0].subtext" /></div>
    <div class="setting">副标题字体<input type="text" v-model="settings.title[0].subtextStyle.fontFamily" /></div>
    <div class="setting">副标题字体大小<input type="number" v-model="settings.title[0].subtextStyle.fontSize" /></div>
    <div class="setting">副标题字体粗细<input type="text" v-model="settings.title[0].subtextStyle.fontWeight" /></div>
    <div class="setting">副标题文字颜色<input type="color" v-model="settings.title[0].subtextStyle.color" /></div>
  </div>
  <div class="set-item">
    <div class="name">图例</div>
    <div class="setting">是否显示<input type="checkbox" v-model="settings.legend[0].show" /></div>
    <div class="setting">类型<input type="text" v-model="settings.legend[0].type" /></div>
    <div class="setting">字体<input type="text" v-model="settings.legend[0].textStyle.fontFamily" /></div>
    <div class="setting">字体大小<input type="number" v-model="settings.legend[0].textStyle.fontSize" /></div>
    <div class="setting">字体粗细<input type="text" v-model="settings.legend[0].textStyle.fontWeight" /></div>
    <div class="setting">文字颜色<input type="color" v-model="settings.legend[0].textStyle.color" /></div>
    <div class="setting">布局朝向<input type="text" v-model="settings.legend[0].orient" /></div>
    <div class="setting">距左侧<input type="text" v-model="settings.legend[0].left" /></div>
    <div class="setting">距顶部<input type="text" v-model="settings.legend[0].top" /></div>
  </div>
  <div class="set-item">
    <div class="name">绘图网格</div>
    <div class="setting">是否显示<input type="checkbox" v-model="settings.grid[0].show" /></div>
    <div class="setting">左侧<input type="text" v-model="settings.grid[0].left" /></div>
    <div class="setting">顶部<input type="text" v-model="settings.grid[0].top" /></div>
    <div class="setting">右侧<input type="text" v-model="settings.grid[0].right" /></div>
    <div class="setting">底部<input type="text" v-model="settings.grid[0].bottom" /></div>
    <div class="setting">containLabel<input type="checkbox" v-model="settings.grid[0].containLabel" /></div>
  </div>
  <div class="set-item">
    <div class="name">提示框组件</div>
    <div class="setting">是否显示<input type="checkbox" v-model="settings.tooltip[0].show" /></div>
    <div class="setting">内容格式<input type="text" v-model="settings.tooltip[0].formatter" /></div>
    <div class="setting">背景颜色<input type="text" v-model="settings.tooltip[0].backgroundColor" /></div>
    <div class="setting">字体<input type="text" v-model="settings.tooltip[0].textStyle.fontFamily" /></div>
    <div class="setting">字体大小<input type="number" v-model="settings.tooltip[0].textStyle.fontSize" /></div>
    <div class="setting">字体粗细<input type="text" v-model="settings.tooltip[0].textStyle.fontWeight" /></div>
    <div class="setting">文字颜色<input type="color" v-model="settings.tooltip[0].textStyle.color" /></div>
  </div>
  <div class="set-item">
    <div class="name">x 轴</div>
    <div class="setting">是否显示<input type="checkbox" v-model="settings.xAxis[0].show" /></div>
    <div class="setting">名称<input type="text" v-model="settings.xAxis[0].name" /></div>
    <div class="setting">名称字体<input type="text" v-model="settings.xAxis[0].nameTextStyle.fontFamily" /></div>
    <div class="setting">名称字体大小<input type="number" v-model="settings.xAxis[0].nameTextStyle.fontSize" /></div>
    <div class="setting">名称字体粗细<input type="text" v-model="settings.xAxis[0].nameTextStyle.fontWeight" /></div>
    <div class="setting">名称文字颜色<input type="color" v-model="settings.xAxis[0].nameTextStyle.color" /></div>
    <div class="setting">轴距<input type="number" v-model="settings.xAxis[0].nameGap" /></div>
    <div class="setting">轴旋转角度<input type="number" v-model="settings.xAxis[0].nameRotate" /></div>
    <div class="setting">反向<input type="text" v-model="settings.xAxis[0].inverse" /></div>
    <!-- <div class="setting">留白策略<input type="checkbox" v-model="settings.xAxis[0].boundaryGap" /></div> -->
  </div>
  <div class="set-item">
    <div class="name">y 轴</div>
    <div class="setting">是否显示<input type="checkbox" v-model="settings.yAxis[0].show" /></div>
    <div class="setting">名称<input type="text" v-model="settings.yAxis[0].name" /></div>
    <div class="setting">名称字体<input type="text" v-model="settings.yAxis[0].nameTextStyle.fontFamily" /></div>
    <div class="setting">名称字体大小<input type="number" v-model="settings.yAxis[0].nameTextStyle.fontSize" /></div>
    <div class="setting">名称字体粗细<input type="text" v-model="settings.yAxis[0].nameTextStyle.fontWeight" /></div>
    <div class="setting">名称文字颜色<input type="color" v-model="settings.yAxis[0].nameTextStyle.color" /></div>
    <div class="setting">轴距<input type="number" v-model="settings.yAxis[0].nameGap" /></div>
    <div class="setting">轴旋转角度<input type="number" v-model="settings.yAxis[0].nameRotate" /></div>
    <div class="setting">反向<input type="text" v-model="settings.yAxis[0].inverse" /></div>
    <!-- <div class="setting">留白策略<input type="checkbox" v-model="settings.yAxis[0].boundaryGap" /></div> -->
  </div>
  <div class="set-item">
    <div class="name">指示器</div>
    <div class="setting">是否显示<input type="checkbox" v-model="settings.axisPointer[0].show" /></div>
    <div class="setting">类型<input type="text " v-model="settings.axisPointer[0].type" /></div>
  </div>
  <div class="set-item">
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
      colorTheme: [
        ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
        ['#893448', '#d95850', '#eb8146', '#ffb248', '#f2d643', '#ebdba4'],
        ['#516b91', '#59c4e6', '#edafda', '#93b7e3', '#a5e7f0', '#cbb0e3'],
        ['#3fb1e3', '#6be6c1', '#626c91', '#a0a7e6', '#c4ebad', '#96dee8'],
        ['#c12e34', '#e6b600', '#0098d9', '#2b821d', '#005eaa', '#339ca8', '#cda819', '#32a487'],
      ],
      settings: {
        darkMode: 'auto',
        colorBy: 'series',
        color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
        gradientColor: ['#f6efa6', '#d88273', '#bf444c'],
        aria: {
          decal: {
            decals: [
              {
                color: 'rgba(0, 0, 0, 0.2)',
                dashArrayX: [1, 0],
                dashArrayY: [2, 5],
                symbolSize: 1,
                rotation: 0.5235987755982988,
              },
              {
                color: 'rgba(0, 0, 0, 0.2)',
                symbol: 'circle',
                dashArrayX: [
                  [8, 8],
                  [0, 8, 8, 0],
                ],
                dashArrayY: [6, 0],
                symbolSize: 0.8,
              },
              {
                color: 'rgba(0, 0, 0, 0.2)',
                dashArrayX: [1, 0],
                dashArrayY: [4, 3],
                rotation: -0.7853981633974483,
              },
              {
                color: 'rgba(0, 0, 0, 0.2)',
                dashArrayX: [
                  [6, 6],
                  [0, 6, 6, 0],
                ],
                dashArrayY: [6, 0],
              },
              {
                color: 'rgba(0, 0, 0, 0.2)',
                dashArrayX: [
                  [1, 0],
                  [1, 6],
                ],
                dashArrayY: [1, 0, 6, 0],
                rotation: 0.7853981633974483,
              },
              {
                color: 'rgba(0, 0, 0, 0.2)',
                symbol: 'triangle',
                dashArrayX: [
                  [9, 9],
                  [0, 9, 9, 0],
                ],
                dashArrayY: [7, 2],
                symbolSize: 0.75,
              },
            ],
          },
        },
        textStyle: {
          fontFamily: 'Microsoft YaHei',
          fontSize: 12,
          fontStyle: 'normal',
          fontWeight: 'normal',
        },
        stateAnimation: {
          duration: 300,
          easing: 'cubicOut',
        },
        animation: 'auto',
        animationDuration: 1000,
        animationDurationUpdate: 500,
        animationEasing: 'cubicInOut',
        animationEasingUpdate: 'cubicInOut',
        animationThreshold: 2000,
        progressiveThreshold: 3000,
        progressive: 400,
        hoverLayerThreshold: 3000,
        useUTC: false,
        backgroundColor: '#ffffff',
        axisPointer: [
          {
            show: false,
            type: 'line',
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
        series: [],
        visualMap: [],
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
        markArea: [],
        markLine: [],
        markPoint: [],
        brush: [],
        dataZoom: [],
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
      },
      defaultSettings: {},
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
</style>
