<template>
  <set-box-item :itemConfigs="itemConfigs"></set-box-item>
</template>

<script>
import echarts from '@/assets/script/myEcharts'
import SetBoxItem from '@/components/tab/SetBoxItem.vue'
export default {
  components: { SetBoxItem },
  props: {
    onSetChange: {
      type: Function,
      default: undefined,
    },
  },
  data() {
    return {
      selectOptions: {
        direction: [
          { label: '竖直', value: 'vertical' },
          { label: '水平', value: 'horizontal' },
        ],
        legendIcon: [
          { label: '圆形', value: 'circle' },
          { label: '矩形', value: 'rect' },
          { label: '圆角矩形', value: 'roundRect' },
          { label: '三角', value: 'triangle' },
          { label: '菱形', value: 'diamond' },
          { label: '箭头', value: 'arrow' },
          { label: '无', value: 'none' },
        ],
        horizontal: [
          { label: '居左', value: 'left' },
          { label: '居中', value: 'center' },
          { label: '居右', value: 'right' },
        ],
        vertical: [
          { label: '居上', value: 'top' },
          { label: '居中', value: 'middle' },
          { label: '居下', value: 'bottom' },
        ],
        inRanges: [
          { label: '调色1', value: ['#f6efa6', '#d88273', '#bf444c'] },
          { label: '调色2', value: ['#d6ecff', '#5f5de0', '#c368ff'] },
          { label: '调色3', value: ['#fbffd6', '#c58031', '#970b06'] },
          { label: '调色4', value: ['#d6ffd9', '#61e05d', '#069743'] },
        ],
        formatters: [null, '{b}{c}', '{b}<br/>{c}', '{b}: {c}'],
        fontWeights: [
          { label: 'normal', value: ['normal'] },
          { label: 'bold', value: ['bold'] },
          { label: 'bolder', value: ['bolder'] },
          { label: 'lighter', value: ['lighter'] },
        ],
        fontFamilys: [
          { label: 'sans-serif', value: ['sans-serif'] },
          { label: 'serif', value: ['serif'] },
          { label: 'monospace', value: ['monospace'] },
          { label: 'Arial', value: ['Arial'] },
          { label: 'Courier New', value: ['Courier New'] },
          { label: 'Microsoft YaHei', value: ['Microsoft YaHei'] },
          { label: 'Cursive', value: ['Cursive'] },
          { label: 'Fantasy', value: ['Fantasy'] },
        ],
        colorTheme: [
          { label: '主题1', value: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'] },
          { label: '主题2', value: ['#893448', '#d95850', '#eb8146', '#ffb248', '#f2d643', '#ebdba4'] },
          { label: '主题3', value: ['#516b91', '#59c4e6', '#edafda', '#93b7e3', '#a5e7f0', '#cbb0e3'] },
          { label: '主题4', value: ['#3fb1e3', '#6be6c1', '#626c91', '#a0a7e6', '#c4ebad', '#96dee8'] },
          { label: '主题5', value: ['#c12e34', '#e6b600', '#0098d9', '#2b821d', '#005eaa', '#339ca8', '#cda819', '#32a487'] },
        ],
      },
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
      thisItem: undefined,
      itemConfigs: [],
    }
  },
  watch: {
    settings: {
      handler(newValue) {
        // newValue.series = undefined
        console.log(newValue);
        this.onSetChange(undefined, newValue, undefined, this.thisItem)
      },
      deep: true,
    },
  },
  mounted() {
    this.defaultSettings = JSON.parse(JSON.stringify(this.settings))
  },
  methods: {
    test() {
      console.log(this.settings)
    },
    setSetItems(settings) {
      this.itemConfigs = [
        !(this.selectOptions.colorTheme[0] && settings.title[0])
          ? undefined
          : {
              name: '主题',
              show: this.selectOptions.colorTheme[0] && settings.title[0],
              projects: [
                {
                  name: '基础',
                  sets: [
                    {
                      name: '主题色',
                      type: 'select',
                      type2: 'color',
                      model: settings.color,
                      options: this.selectOptions.colorTheme,
                      placeholder: '选择主题色',
                      event: (val, index) => {
                        settings.color = val
                      },
                    },
                  ],
                },
                {
                  name: '背景',
                  sets: [
                    {
                      name: '背景颜色',
                      type: 'color',
                      model: settings.backgroundColor,
                      event: (val) => {
                        settings.backgroundColor = val
                      },
                    },
                  ],
                },
              ],
            },
        !settings.title[0]
          ? undefined
          : {
              name: '标题',
              show: settings.title[0],
              projects: [
                {
                  name: '基础',
                  sets: [
                    {
                      name: '是否显示',
                      type: 'switch',
                      model: settings.title[0].show,
                      event: (val) => {
                        settings.title[0].show = val
                      },
                    },
                    {
                      name: '边距',
                      type: 'number',
                      min: 0,
                      max: 120,
                      model: settings.title[0].padding,
                      event: (val) => {
                        settings.title[0].padding = val
                      },
                    },
                    {
                      name: '水平位置',
                      type: 'select',
                      model: settings.title[0].left,
                      options: this.selectOptions.horizontal,
                      placeholder: '选择水平位置',
                      event: (val) => {
                        settings.title[0].left = val
                      },
                    },
                    {
                      name: '竖直位置',
                      type: 'select',
                      model: settings.title[0].top,
                      options: this.selectOptions.vertical,
                      placeholder: '选择竖直位置',
                      event: (val) => {
                        settings.title[0].top = val
                      },
                    },
                  ],
                },
                {
                  name: '主标题',
                  sets: [
                    {
                      name: '标题内容',
                      type: 'text',
                      model: settings.title[0].text,
                      placeholder: '输入标题',
                      event: (val) => {
                        settings.title[0].text = val
                      },
                    },
                    {
                      name: '字体',
                      type: 'select',
                      model: settings.title[0].textStyle.fontFamily,
                      options: this.selectOptions.fontFamilys,
                      placeholder: '选择字体',
                      event: (val) => {
                        settings.title[0].textStyle.fontFamily = val
                      },
                    },
                    {
                      name: '字体大小',
                      type: 'number',
                      min: 12,
                      max: 50,
                      model: settings.title[0].textStyle.fontSize,
                      event: (val) => {
                        settings.title[0].textStyle.fontSize = val
                      },
                    },
                    {
                      name: '字体粗细',
                      type: 'select',
                      model: settings.title[0].textStyle.fontWeight,
                      options: this.selectOptions.fontWeights,
                      placeholder: '选择字体粗细',
                      event: (val) => {
                        settings.title[0].textStyle.fontWeight = val
                      },
                    },
                    {
                      name: '文字颜色',
                      type: 'color',
                      model: settings.title[0].textStyle.color,
                      event: (val) => {
                        settings.title[0].textStyle.color = val
                      },
                    },
                  ],
                },
                {
                  name: '副标题',
                  sets: [
                    {
                      name: '副标题',
                      type: 'text',
                      model: settings.title[0].subtext,
                      placeholder: '输入副标题',
                      event: (val) => {
                        settings.title[0].subtext = val
                      },
                    },
                    {
                      name: '副标题字体',
                      type: 'select',
                      model: settings.title[0].subtextStyle.fontFamily,
                      options: this.selectOptions.fontFamilys,
                      placeholder: '选择字体',
                      event: (val) => {
                        settings.title[0].subtextStyle.fontFamily = val
                      },
                    },
                    {
                      name: '副标题字体大小',
                      type: 'number',
                      min: 8,
                      max: 40,
                      model: settings.title[0].subtextStyle.fontSize,
                      event: (val) => {
                        settings.title[0].subtextStyle.fontSize = val
                      },
                    },
                    {
                      name: '副标题字体粗细',
                      type: 'select',
                      model: settings.title[0].subtextStyle.fontWeight,
                      options: this.selectOptions.fontWeights,
                      placeholder: '选择字体粗细',
                      event: (val) => {
                        settings.title[0].subtextStyle.fontWeight = val
                      },
                    },
                    {
                      name: '副标题文字颜色',
                      type: 'color',
                      model: settings.title[0].subtextStyle.color,
                      event: (val) => {
                        settings.title[0].subtextStyle.color = val
                      },
                    },
                  ],
                },
              ],
            },
        !settings.legend[0]
          ? undefined
          : {
              name: '图例',
              show: settings.legend[0],
              projects: [
                {
                  name: '基础',
                  sets: [
                    {
                      name: '是否显示',
                      type: 'switch',
                      model: settings.legend[0].show,
                      event: (val) => {
                        settings.legend[0].show = val
                      },
                    },
                    {
                      name: '布局朝向',
                      type: 'select',
                      model: settings.legend[0].orient,
                      options: this.selectOptions.direction,
                      placeholder: '选择布局朝向',
                      event: (val) => {
                        settings.legend[0].orient = val
                      },
                    },
                    {
                      name: '水平位置',
                      type: 'select',
                      model: settings.legend[0].left,
                      options: this.selectOptions.horizontal,
                      placeholder: '选择水平位置',
                      event: (val) => {
                        settings.legend[0].left = val
                      },
                    },
                    {
                      name: '竖直位置',
                      type: 'select',
                      model: settings.legend[0].top,
                      options: this.selectOptions.vertical,
                      placeholder: '选择竖直位置',
                      event: (val) => {
                        settings.legend[0].top = val
                      },
                    },
                    {
                      name: '边距',
                      type: 'number',
                      min: 0,
                      max: 120,
                      model: settings.legend[0].padding,
                      event: (val) => {
                        settings.legend[0].padding = val
                      },
                    },
                    {
                      name: '图例项间距',
                      type: 'number',
                      min: 0,
                      max: 50,
                      model: settings.legend[0].itemGap,
                      event: (val) => {
                        settings.legend[0].itemGap = val
                      },
                    },
                  ],
                },
                {
                  name: '图标',
                  sets: [
                    {
                      name: '图标样式',
                      type: 'select',
                      model: settings.legend[0].icon,
                      options: this.selectOptions.legendIcon,
                      placeholder: '图标样式',
                      event: (val) => {
                        settings.legend[0].icon = val
                      },
                    },
                    {
                      name: '图标宽度',
                      type: 'number',
                      min: 0,
                      max: 100,
                      model: settings.legend[0].itemWidth,
                      event: (val) => {
                        settings.legend[0].itemWidth = val
                      },
                    },
                    {
                      name: '图标高度',
                      type: 'number',
                      min: 0,
                      max: 100,
                      model: settings.legend[0].itemHeight,
                      event: (val) => {
                        settings.legend[0].itemHeight = val
                      },
                    },
                  ],
                },
                {
                  name: '文字',
                  sets: [
                    {
                      name: '字体',
                      type: 'select',
                      model: settings.legend[0].textStyle.fontFamily,
                      options: this.selectOptions.fontFamilys,
                      placeholder: '选择字体',
                      event: (val) => {
                        settings.legend[0].textStyle.fontFamily = val
                      },
                    },
                    {
                      name: '字体大小',
                      type: 'number',
                      min: 12,
                      max: 50,
                      model: settings.legend[0].textStyle.fontSize,
                      event: (val) => {
                        settings.legend[0].textStyle.fontSize = val
                      },
                    },
                    {
                      name: '字体粗细',
                      type: 'select',
                      model: settings.legend[0].textStyle.fontWeight,
                      options: this.selectOptions.fontWeights,
                      placeholder: '选择字体粗细',
                      event: (val) => {
                        settings.legend[0].textStyle.fontWeight = val
                      },
                    },
                    {
                      name: '文字颜色',
                      type: 'color',
                      model: settings.legend[0].textStyle.color,
                      event: (val) => {
                        settings.legend[0].textStyle.color = val
                      },
                    },
                  ],
                },
              ],
            },
        !settings.grid[0]
          ? undefined
          : {
              name: '绘图网格',
              show: settings.grid[0],
              projects: [
                {
                  name: '基础',
                  sets: [
                    {
                      name: '显示网格',
                      type: 'switch',
                      model: settings.grid[0].show,
                      event: (val) => {
                        settings.grid[0].show = val
                      },
                    },
                    {
                      name: '左边距',
                      type: 'number',
                      min: 0,
                      max: 50,
                      model: parseInt(settings.grid[0].left),
                      format: (val) => {
                        return val + '%'
                      },
                      event: (val) => {
                        settings.grid[0].left = val + '%'
                      },
                    },
                    {
                      name: '右边距',
                      type: 'number',
                      min: 0,
                      max: 50,
                      model: parseInt(settings.grid[0].right),
                      format: (val) => {
                        return val + '%'
                      },
                      event: (val) => {
                        settings.grid[0].right = val + '%'
                      },
                    },
                    {
                      name: '上边距',
                      type: 'number',
                      min: 0,
                      max: 50,
                      model: parseInt(settings.grid[0].top),
                      format: (val) => {
                        return val + '%'
                      },
                      event: (val) => {
                        settings.grid[0].top = val + '%'
                      },
                    },
                    {
                      name: '下边距',
                      type: 'number',
                      min: 0,
                      max: 50,
                      model: parseInt(settings.grid[0].bottom),
                      format: (val) => {
                        return val + '%'
                      },
                      event: (val) => {
                        settings.grid[0].bottom = val + '%'
                      },
                    },
                  ],
                },
              ],
            },
        !settings.tooltip[0]
          ? undefined
          : {
              name: '提示框组件',
              show: settings.tooltip[0],
              projects: [
                {
                  name: '基础',
                  sets: [
                    {
                      name: '是否显示',
                      type: 'switch',
                      model: settings.tooltip[0].show,
                      event: (val) => {
                        settings.tooltip[0].show = val
                      },
                    },
                    {
                      name: '背景颜色',
                      type: 'color',
                      model: settings.tooltip[0].backgroundColor,
                      event: (val) => {
                        settings.tooltip[0].backgroundColor = val
                      },
                    },
                  ],
                },
                {
                  name: '文字',
                  sets: [
                    {
                      name: '字体',
                      type: 'select',
                      model: settings.tooltip[0].textStyle.fontFamily,
                      options: this.selectOptions.fontFamilys,
                      placeholder: '选择字体',
                      event: (val) => {
                        settings.tooltip[0].textStyle.fontFamily = val
                      },
                    },
                    {
                      name: '字体大小',
                      type: 'number',
                      min: 12,
                      max: 50,
                      model: settings.tooltip[0].textStyle.fontSize,
                      event: (val) => {
                        settings.tooltip[0].textStyle.fontSize = val
                      },
                    },
                    {
                      name: '字体粗细',
                      type: 'select',
                      model: settings.tooltip[0].textStyle.fontWeight,
                      options: this.selectOptions.fontWeights,
                      placeholder: '选择字体粗细',
                      event: (val) => {
                        settings.tooltip[0].textStyle.fontWeight = val
                      },
                    },
                    {
                      name: '文字颜色',
                      type: 'color',
                      model: settings.tooltip[0].textStyle.color,
                      event: (val) => {
                        settings.tooltip[0].textStyle.color = val
                      },
                    },
                  ],
                },
              ],
            },
        !settings.visualMap[0]
          ? undefined
          : {
              name: '视觉映射组件',
              show: settings.visualMap[0],
              projects: [
                {
                  name: '基础',
                  sets: [
                    {
                      name: '是否显示',
                      type: 'switch',
                      model: settings.visualMap[0].show,
                      event: (val) => {
                        settings.visualMap[0].show = val
                      },
                    },
                    {
                      name: '方向',
                      type: 'select',
                      model: settings.visualMap[0].orient,
                      options: this.selectOptions.direction,
                      placeholder: '选择组件方向',
                      event: (val) => {
                        settings.visualMap[0].orient = val
                      },
                    },
                    {
                      name: '水平位置',
                      type: 'select',
                      model: settings.visualMap[0].left,
                      options: this.selectOptions.horizontal,
                      placeholder: '选择水平位置',
                      event: (val) => {
                        settings.visualMap[0].left = val
                      },
                    },
                    {
                      name: '竖直位置',
                      type: 'select',
                      model: settings.visualMap[0].top,
                      options: this.selectOptions.vertical,
                      placeholder: '选择竖直位置',
                      event: (val) => {
                        settings.visualMap[0].top = val
                      },
                    },
                    {
                      name: '宽度',
                      type: 'number',
                      min: 10,
                      max: 400,
                      model: settings.visualMap[0].itemWidth,
                      event: (val) => {
                        settings.visualMap[0].itemWidth = val
                      },
                    },
                    {
                      name: '高度',
                      type: 'number',
                      min: 10,
                      max: 400,
                      model: settings.visualMap[0].itemHeight,
                      event: (val) => {
                        settings.visualMap[0].itemHeight = val
                      },
                    },
                    {
                      name: '边距',
                      type: 'number',
                      min: 0,
                      max: 120,
                      model: settings.visualMap[0].padding,
                      event: (val) => {
                        settings.visualMap[0].padding = val
                      },
                    },
                    {
                      name: '调色主题',
                      type: 'select',
                      type2: 'color',
                      model: settings.visualMap[0].inRange.color,
                      options: this.selectOptions.inRanges,
                      placeholder: '选择调色主题',
                      event: (val) => {
                        settings.visualMap[0].inRange.color = val
                        settings.visualMap[0].controller.inRange.color = val
                        settings.visualMap[0].target.inRange.color = val
                      },
                    },
                  ],
                },
                {
                  name: '文字',
                  sets: [
                    {
                      name: '字体',
                      type: 'select',
                      model: settings.visualMap[0].textStyle.fontFamily,
                      options: this.selectOptions.fontFamilys,
                      placeholder: '选择字体',
                      event: (val) => {
                        settings.visualMap[0].textStyle.fontFamily = val
                      },
                    },
                    {
                      name: '字体大小',
                      type: 'number',
                      min: 12,
                      max: 50,
                      model: settings.visualMap[0].textStyle.fontSize,
                      event: (val) => {
                        settings.visualMap[0].textStyle.fontSize = val
                      },
                    },
                    {
                      name: '字体粗细',
                      type: 'select',
                      model: settings.visualMap[0].textStyle.fontWeight,
                      options: this.selectOptions.fontWeights,
                      placeholder: '选择字体粗细',
                      event: (val) => {
                        settings.visualMap[0].textStyle.fontWeight = val
                      },
                    },
                    {
                      name: '文字颜色',
                      type: 'color',
                      model: settings.visualMap[0].textStyle.color,
                      event: (val) => {
                        settings.visualMap[0].textStyle.color = val
                      },
                    },
                  ],
                },
              ],
            },
        !settings.xAxis[0]
          ? undefined
          : {
              name: 'x 轴',
              show: settings.yAxis[0],
              projects: [
                {
                  name: '基础',
                  sets: [
                    {
                      name: '是否显示坐标轴',
                      type: 'switch',
                      model: settings.xAxis[0].show,
                      event: (val) => {
                        settings.xAxis[0].show = val
                      },
                    },
                    {
                      name: '是否留白',
                      type: 'switch',
                      model: settings.xAxis[0].boundaryGap,
                      event: (val) => {
                        settings.xAxis[0].boundaryGap = val
                      },
                    },
                    {
                      name: '类型',
                      type: 'select',
                      model: settings.xAxis[0].type,
                      options: [
                        { label: '类目轴', value: 'category' },
                        { label: '数值轴', value: 'value' },
                      ],
                      placeholder: '选择类型',
                      event: (val) => {
                        settings.xAxis[0].type = val
                      },
                    },
                    {
                      name: '方位',
                      type: 'select',
                      model: settings.xAxis[0].position,
                      options: [
                        { label: '上方', value: 'top' },
                        { label: '下方', value: 'bottom' },
                      ],
                      placeholder: '选择方位',
                      event: (val) => {
                        settings.xAxis[0].position = val
                      },
                    },
                  ],
                },
                {
                  name: '坐标轴名称',
                  sets: [
                    {
                      name: '名称',
                      type: 'text',
                      model: settings.xAxis[0].name,
                      placeholder: '输入名称',
                      event: (val) => {
                        settings.xAxis[0].name = val
                      },
                    },
                    {
                      name: '字体',
                      type: 'select',
                      model: settings.xAxis[0].nameTextStyle.fontFamily,
                      options: this.selectOptions.fontFamilys,
                      placeholder: '选择字体',
                      event: (val) => {
                        settings.xAxis[0].nameTextStyle.fontFamily = val
                      },
                    },
                    {
                      name: '字体大小',
                      type: 'number',
                      min: 12,
                      max: 50,
                      model: settings.xAxis[0].nameTextStyle.fontSize,
                      event: (val) => {
                        settings.xAxis[0].nameTextStyle.fontSize = val
                      },
                    },
                    {
                      name: '字体粗细',
                      type: 'select',
                      model: settings.xAxis[0].nameTextStyle.fontWeight,
                      options: this.selectOptions.fontWeights,
                      placeholder: '选择字体粗细',
                      event: (val) => {
                        settings.xAxis[0].nameTextStyle.fontWeight = val
                      },
                    },
                    {
                      name: '文字颜色',
                      type: 'color',
                      model: settings.xAxis[0].nameTextStyle.color,
                      event: (val) => {
                        settings.xAxis[0].nameTextStyle.color = val
                      },
                    },
                    {
                      name: '离轴距离',
                      type: 'number',
                      min: 0,
                      max: 50,
                      model: settings.xAxis[0].nameGap,
                      event: (val) => {
                        settings.xAxis[0].nameGap = val
                      },
                    },
                    {
                      name: '旋转角度',
                      type: 'number',
                      min: 0,
                      max: 360,
                      model: settings.xAxis[0].nameRotate,
                      event: (val) => {
                        settings.xAxis[0].nameRotate = val
                      },
                    },
                  ],
                },
                {
                  name: '轴标',
                  sets: [
                    {
                      name: '轴标样式',
                      type: 'select',
                      model: settings.xAxis[0].axisLine.symbol[1],
                      options: this.selectOptions.legendIcon,
                      placeholder: '轴标样式',
                      event: (val) => {
                        settings.xAxis[0].axisLine.symbol[1] = val
                      },
                    },
                    {
                      name: '轴标大小',
                      type: 'number',
                      min: 5,
                      max: 30,
                      model: settings.xAxis[0].axisLine.symbolSize[0],
                      event: (val) => {
                        settings.xAxis[0].axisLine.symbolSize[0] = val
                        settings.xAxis[0].axisLine.symbolSize[1] = val * 1.5
                      },
                    },
                    {
                      name: '轴标偏移',
                      type: 'number',
                      min: 0,
                      max: 30,
                      model: settings.xAxis[0].axisLine.symbolOffset,
                      event: (val) => {
                        settings.xAxis[0].axisLine.symbolOffset = val
                      },
                    },
                  ],
                },
                {
                  name: '轴线',
                  sets: [
                    {
                      name: '是否显示',
                      type: 'switch',
                      model: settings.xAxis[0].axisLine.show,
                      event: (val) => {
                        settings.xAxis[0].axisLine.show = val
                      },
                    },
                    {
                      name: '颜色',
                      type: 'color',
                      model: settings.xAxis[0].axisLine.lineStyle.color,
                      event: (val) => {
                        settings.xAxis[0].axisLine.lineStyle.color = val
                      },
                    },
                    {
                      name: '宽度',
                      type: 'number',
                      min: 1,
                      max: 30,
                      model: settings.xAxis[0].axisLine.lineStyle.width,
                      event: (val) => {
                        settings.xAxis[0].axisLine.lineStyle.width = val
                      },
                    },
                    {
                      name: '透明度',
                      type: 'number',
                      min: 0,
                      max: 1,
                      step: 0.01,
                      model: settings.xAxis[0].axisLine.lineStyle.opacity,
                      event: (val) => {
                        settings.xAxis[0].axisLine.lineStyle.opacity = val
                      },
                    },
                  ],
                },
                {
                  name: '刻度标签',
                  sets: [
                    {
                      name: '是否显示',
                      type: 'switch',
                      model: settings.xAxis[0].axisLabel.show,
                      event: (val) => {
                        settings.xAxis[0].axisLabel.show = val
                      },
                    },
                    {
                      name: '字体',
                      type: 'select',
                      model: settings.xAxis[0].axisLabel.fontFamily,
                      options: this.selectOptions.fontFamilys,
                      placeholder: '选择字体',
                      event: (val) => {
                        settings.xAxis[0].axisLabel.fontFamily = val
                      },
                    },
                    {
                      name: '字体大小',
                      type: 'number',
                      min: 12,
                      max: 50,
                      model: settings.xAxis[0].axisLabel.fontSize,
                      event: (val) => {
                        settings.xAxis[0].axisLabel.fontSize = val
                      },
                    },
                    {
                      name: '字体粗细',
                      type: 'select',
                      model: settings.xAxis[0].axisLabel.fontWeight,
                      options: this.selectOptions.fontWeights,
                      placeholder: '选择字体粗细',
                      event: (val) => {
                        settings.xAxis[0].axisLabel.fontWeight = val
                      },
                    },
                    {
                      name: '文字颜色',
                      type: 'color',
                      model: settings.xAxis[0].axisLabel.color,
                      event: (val) => {
                        settings.xAxis[0].axisLabel.color = val
                      },
                    },
                    {
                      name: '离轴距离',
                      type: 'number',
                      min: 0,
                      max: 50,
                      model: settings.xAxis[0].axisLabel.margin,
                      event: (val) => {
                        settings.xAxis[0].axisLabel.margin = val
                      },
                    },
                    {
                      name: '旋转角度',
                      type: 'number',
                      min: -90,
                      max: 90,
                      model: settings.xAxis[0].axisLabel.rotate,
                      event: (val) => {
                        settings.xAxis[0].axisLabel.rotate = val
                      },
                    },
                  ],
                },
                {
                  name: '坐标轴指示器',
                  sets: [
                    {
                      name: '是否显示',
                      type: 'switch',
                      model: settings.xAxis[0].axisPointer.show,
                      event: (val) => {
                        settings.xAxis[0].axisPointer.show = val
                      },
                    },
                    {
                      name: '类型',
                      type: 'select',
                      model: settings.xAxis[0].axisPointer.type,
                      options: [
                        { label: '直线指示器', value: 'line' },
                        { label: '阴影指示器', value: 'shadow' },
                      ],
                      placeholder: '选择类型',
                      event: (val) => {
                        settings.xAxis[0].axisPointer.type = val
                      },
                    },
                    {
                      name: '颜色',
                      type: 'color',
                      model: settings.xAxis[0].axisPointer.lineStyle.color,
                      event: (val) => {
                        settings.xAxis[0].axisPointer.lineStyle.color = val
                        settings.xAxis[0].axisPointer.shadowStyle.color = val
                      },
                    },
                    {
                      name: '透明度',
                      type: 'number',
                      min: 0,
                      max: 1,
                      step: 0.01,
                      model: settings.xAxis[0].axisPointer.lineStyle.opacity,
                      event: (val) => {
                        settings.xAxis[0].axisPointer.lineStyle.opacity = val
                        settings.xAxis[0].axisPointer.shadowStyle.opacity = val
                      },
                    },
                  ],
                },
              ],
            },
        !settings.yAxis[0]
          ? undefined
          : {
              name: 'y 轴',
              show: settings.yAxis[0],
              projects: [
                {
                  name: '基础',
                  sets: [
                    {
                      name: '是否显示坐标轴',
                      type: 'switch',
                      model: settings.yAxis[0].show,
                      event: (val) => {
                        settings.yAxis[0].show = val
                      },
                    },
                    {
                      name: '是否留白',
                      type: 'switch',
                      model: settings.yAxis[0].boundaryGap,
                      event: (val) => {
                        settings.yAxis[0].boundaryGap = val
                      },
                    },
                    {
                      name: '类型',
                      type: 'select',
                      model: settings.yAxis[0].type,
                      options: [
                        { label: '类目轴', value: 'category' },
                        { label: '数值轴', value: 'value' },
                      ],
                      placeholder: '选择类型',
                      event: (val) => {
                        settings.yAxis[0].type = val
                      },
                    },
                    {
                      name: '方位',
                      type: 'select',
                      model: settings.yAxis[0].position,
                      options: [
                        { label: '左侧', value: 'left' },
                        { label: '右侧', value: 'right' },
                      ],
                      placeholder: '选择方位',
                      event: (val) => {
                        settings.yAxis[0].position = val
                      },
                    },
                  ],
                },
                {
                  name: '坐标轴名称',
                  sets: [
                    {
                      name: '名称',
                      type: 'text',
                      model: settings.yAxis[0].name,
                      placeholder: '输入名称',
                      event: (val) => {
                        settings.yAxis[0].name = val
                      },
                    },
                    {
                      name: '字体',
                      type: 'select',
                      model: settings.yAxis[0].nameTextStyle.fontFamily,
                      options: this.selectOptions.fontFamilys,
                      placeholder: '选择字体',
                      event: (val) => {
                        settings.yAxis[0].nameTextStyle.fontFamily = val
                      },
                    },
                    {
                      name: '字体大小',
                      type: 'number',
                      min: 12,
                      max: 50,
                      model: settings.yAxis[0].nameTextStyle.fontSize,
                      event: (val) => {
                        settings.yAxis[0].nameTextStyle.fontSize = val
                      },
                    },
                    {
                      name: '字体粗细',
                      type: 'select',
                      model: settings.yAxis[0].nameTextStyle.fontWeight,
                      options: this.selectOptions.fontWeights,
                      placeholder: '选择字体粗细',
                      event: (val) => {
                        settings.yAxis[0].nameTextStyle.fontWeight = val
                      },
                    },
                    {
                      name: '文字颜色',
                      type: 'color',
                      model: settings.yAxis[0].nameTextStyle.color,
                      event: (val) => {
                        settings.yAxis[0].nameTextStyle.color = val
                      },
                    },
                    {
                      name: '离轴距离',
                      type: 'number',
                      min: 0,
                      max: 50,
                      model: settings.yAxis[0].nameGap,
                      event: (val) => {
                        settings.yAxis[0].nameGap = val
                      },
                    },
                    {
                      name: '旋转角度',
                      type: 'number',
                      min: 0,
                      max: 360,
                      model: settings.yAxis[0].nameRotate,
                      event: (val) => {
                        settings.yAxis[0].nameRotate = val
                      },
                    },
                  ],
                },
                {
                  name: '轴标',
                  sets: [
                    {
                      name: '轴标样式',
                      type: 'select',
                      model: settings.yAxis[0].axisLine.symbol[1],
                      options: this.selectOptions.legendIcon,
                      placeholder: '轴标样式',
                      event: (val) => {
                        settings.yAxis[0].axisLine.symbol[1] = val
                      },
                    },
                    {
                      name: '轴标大小',
                      type: 'number',
                      min: 5,
                      max: 30,
                      model: settings.yAxis[0].axisLine.symbolSize[0],
                      event: (val) => {
                        settings.yAxis[0].axisLine.symbolSize[0] = val
                        settings.yAxis[0].axisLine.symbolSize[1] = val * 1.5
                      },
                    },
                    {
                      name: '轴标偏移',
                      type: 'number',
                      min: 0,
                      max: 30,
                      model: settings.yAxis[0].axisLine.symbolOffset,
                      event: (val) => {
                        settings.yAxis[0].axisLine.symbolOffset = val
                      },
                    },
                  ],
                },
                {
                  name: '轴线',
                  sets: [
                    {
                      name: '是否显示',
                      type: 'switch',
                      model: settings.yAxis[0].axisLine.show,
                      event: (val) => {
                        settings.yAxis[0].axisLine.show = val
                      },
                    },
                    {
                      name: '颜色',
                      type: 'color',
                      model: settings.yAxis[0].axisLine.lineStyle.color,
                      event: (val) => {
                        settings.yAxis[0].axisLine.lineStyle.color = val
                      },
                    },
                    {
                      name: '宽度',
                      type: 'number',
                      min: 1,
                      max: 30,
                      model: settings.yAxis[0].axisLine.lineStyle.width,
                      event: (val) => {
                        settings.yAxis[0].axisLine.lineStyle.width = val
                      },
                    },
                    {
                      name: '透明度',
                      type: 'number',
                      min: 0,
                      max: 1,
                      step: 0.01,
                      model: settings.yAxis[0].axisLine.lineStyle.opacity,
                      event: (val) => {
                        settings.yAxis[0].axisLine.lineStyle.opacity = val
                      },
                    },
                  ],
                },
                {
                  name: '刻度标签',
                  sets: [
                    {
                      name: '是否显示',
                      type: 'switch',
                      model: settings.yAxis[0].axisLabel.show,
                      event: (val) => {
                        settings.yAxis[0].axisLabel.show = val
                      },
                    },
                    {
                      name: '字体',
                      type: 'select',
                      model: settings.yAxis[0].axisLabel.fontFamily,
                      options: this.selectOptions.fontFamilys,
                      placeholder: '选择字体',
                      event: (val) => {
                        settings.yAxis[0].axisLabel.fontFamily = val
                      },
                    },
                    {
                      name: '字体大小',
                      type: 'number',
                      min: 12,
                      max: 50,
                      model: settings.yAxis[0].axisLabel.fontSize,
                      event: (val) => {
                        settings.yAxis[0].axisLabel.fontSize = val
                      },
                    },
                    {
                      name: '字体粗细',
                      type: 'select',
                      model: settings.yAxis[0].axisLabel.fontWeight,
                      options: this.selectOptions.fontWeights,
                      placeholder: '选择字体粗细',
                      event: (val) => {
                        settings.yAxis[0].axisLabel.fontWeight = val
                      },
                    },
                    {
                      name: '文字颜色',
                      type: 'color',
                      model: settings.yAxis[0].axisLabel.color,
                      event: (val) => {
                        settings.yAxis[0].axisLabel.color = val
                      },
                    },
                    {
                      name: '离轴距离',
                      type: 'number',
                      min: 0,
                      max: 50,
                      model: settings.yAxis[0].axisLabel.margin,
                      event: (val) => {
                        settings.yAxis[0].axisLabel.margin = val
                      },
                    },
                    {
                      name: '旋转角度',
                      type: 'number',
                      min: -90,
                      max: 90,
                      model: settings.yAxis[0].axisLabel.rotate,
                      event: (val) => {
                        settings.yAxis[0].axisLabel.rotate = val
                      },
                    },
                  ],
                },
                {
                  name: '坐标轴指示器',
                  sets: [
                    {
                      name: '是否显示',
                      type: 'switch',
                      model: settings.yAxis[0].axisPointer.show,
                      event: (val) => {
                        settings.yAxis[0].axisPointer.show = val
                      },
                    },
                    {
                      name: '类型',
                      type: 'select',
                      model: settings.yAxis[0].axisPointer.type,
                      options: [
                        { label: '直线指示器', value: 'line' },
                        { label: '阴影指示器', value: 'shadow' },
                      ],
                      placeholder: '选择类型',
                      event: (val) => {
                        settings.yAxis[0].axisPointer.type = val
                      },
                    },
                    {
                      name: '颜色',
                      type: 'color',
                      model: settings.yAxis[0].axisPointer.lineStyle.color,
                      event: (val) => {
                        settings.yAxis[0].axisPointer.lineStyle.color = val
                        settings.yAxis[0].axisPointer.shadowStyle.color = val
                      },
                    },
                    {
                      name: '透明度',
                      type: 'number',
                      min: 0,
                      max: 1,
                      step: 0.01,
                      model: settings.yAxis[0].axisPointer.lineStyle.opacity,
                      event: (val) => {
                        settings.yAxis[0].axisPointer.lineStyle.opacity = val
                        settings.yAxis[0].axisPointer.shadowStyle.opacity = val
                      },
                    },
                  ],
                },
              ],
            },
      ]
    },
    setSettings(option, item) {
      if (item) this.thisItem = item
      let tempSetting
      tempSetting = JSON.parse(JSON.stringify(this.defaultSettings))
      tempSetting = Object.assign({}, this.formatOption(option, tempSetting))
      if (option && option.series[0]) {
        this.cutSettings(tempSetting, option.series[0].type)
      } else {
        this.cutSettings(tempSetting)
      }
      tempSetting.series[0].name = undefined // 此举目的是防止仅设置图表样式而不改变图表数据时，series[0].name这一属性对图表数据的影响
      this.settings = tempSetting
      this.setSetItems(this.settings)
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
  },
}
</script>

<style scoped>
</style>
