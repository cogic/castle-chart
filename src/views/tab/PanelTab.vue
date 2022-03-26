<template>
  <div id="stage">
    <share-window ref="popwin" v-show="isPop" />
    <pop-box ref="PopBox" :trueFunc="clear" :info="'确定要清空画布吗?'" v-if="toShow" />
    <div class="head">
      <div class="name">{{ panelName }}</div>
      <div class="head-menu">
        <div class="menu-tip">{{ saveTip }}</div>
        <div class="menu-item text-disable" @click="save(true, true)">保存</div>
        <div class="menu-item text-disable" @click="share">分享</div>
        <div class="menu-item text-disable" @click="toShow = true">清空</div>
      </div>
    </div>
    <div class="content">
      <div class="left-box" v-show="leftShow">
        <div class="menu-top" v-show="!chartProjectBox">
          <div class="top-label text-disable">添加资源<span class="iconfont">&#xe651;</span></div>
          <div class="item-box">
            <div class="top-item text-disable" v-for="source in sources" @click="addSource(source.id)">
              {{ source.name }}
              <div class="type-box" v-show="source.id === 'chart'">
                <div class="type-item text-disable" v-for="type in source.types" @click.stop="addSource(type.id)">{{ type.name }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="menu-label" v-show="getCurItem().type === 'chart' && !chartProjectBox">图表类型</div>
        <div class="menu-label check" v-show="getCurItem().type === 'chart' && !chartProjectBox">保留数据&nbsp;<el-switch v-model="keepData" active-color="#3B8DD7" width="50" active-text="是" inactive-text="否" inline-prompt /></div>
        <div class="menu-label" v-show="getCurItem().type === 'text' && !chartProjectBox">文本样式</div>
        <div class="menu-label" v-show="getCurItem().type === 'image' && !chartProjectBox">图片</div>
        <div class="menu-label return text-disable" v-show="chartProjectBox" @click="chartProjectBox = false"><span class="iconfont">&#xe608;</span>返回</div>
        <div class="menu-label" v-show="chartProjectBox">图表项目</div>
        <div class="model-main" v-show="chartProjectBox">
          <div class="model-box">
            <div class="model-item text-disable" v-for="project in chartProjects" @click="addSource('addOldChart', project)">
              <div class="item-img">
                <img class="project" :src="project.imgSrc" alt="img" />
              </div>
              <div class="item-name">{{ project.name }}</div>
            </div>
          </div>
        </div>
        <div class="model-main" v-show="getCurItem().type === 'chart' && !chartProjectBox">
          <div class="model-menu">
            <div class="menu-item text-disable" :class="{ current: isCurrentSample(sample) }" v-for="sample in chartSamples" @click="setCurSample($event, sample.name)">{{ sample.name }}</div>
          </div>
          <template v-for="sample in chartSamples">
            <div class="model-box" v-if="isCurrentSample(sample)">
              <div class="model-item text-disable" v-for="example in sample.examples" @click="setProj(example.tableData, example.option)">
                <div class="item-img">
                  <img :src="example.imgSrc" alt="" />
                </div>
                <div class="item-name">{{ example.name }}</div>
              </div>
            </div>
          </template>
        </div>
        <div class="model-main" v-if="getCurItem().type === 'text' && !chartProjectBox">
          <div class="model-box">
            <div class="model-item text-disable" v-for="example in textExamples" @click="textSetExample(example.config)">
              <div class="item-img text" :style="example.config">Text 文本</div>
              <div class="item-name">{{ example.name }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="inout-button text-disable" @click="leftShow = !leftShow">
        <span class="iconfont" v-if="leftShow">&#xe619;</span>
        <span class="iconfont" v-else>&#xe61a;</span>
      </div>
      <div class="center-box">
        <div class="center-inner">
          <div class="center-content" ref="panelBack" @click="setCurItemToBack" id="chartp">
            <g-layout ref="GLayout"></g-layout>
          </div>
        </div>
      </div>
      <div class="inout-button text-disable" @click="rightShow = !rightShow">
        <span class="iconfont" v-if="!rightShow">&#xe619;</span>
        <span class="iconfont" v-else>&#xe61a;</span>
      </div>
      <div class="right-box" v-show="rightShow">
        <div class="option-menu">
          <div class="menu-item text-disable" :class="{ current: !isDataBox }" @click=";(isDataBox = false), (dataSoruceBox = false)">设置项</div>
          <div class="menu-item text-disable" v-show="getCurItem().type === 'chart'" :class="{ current: isDataBox }" @click="isDataBox = true">编辑数据</div>
        </div>
        <template v-for="item in getLayout()" :key="item.i">
          <div class="option-box" v-show="getCurItem().i === item.i">
            <div class="set-box" v-show="!isDataBox">
              <set-box v-if="item.type === 'chart'" :ref="'setBox' + item.i" :onSetChange="setChart"></set-box>
              <div v-else-if="item.type === 'back'">
                <set-box-item :itemConfigs="getItemConfigsBack(item)"></set-box-item>
              </div>
              <div v-else-if="item.type === 'text'">
                <set-box-item :itemConfigs="getItemConfigsText(item)"></set-box-item>
              </div>
              <div v-else-if="item.type === 'image'">image</div>
            </div>
            <div class="data-box" v-show="isDataBox && !dataSoruceBox">
              <div class="data-menu">
                <div class="menu-item text-disable" @click="importData">本地导入</div>
                <div class="menu-item text-disable" @click=";(dataSoruceBox = true), (dataProjectSelectId = null)">数据源导入</div>
                <!-- TODO URL导入待做 -->
                <div class="menu-item text-disable" v-show="false">URL导入</div>
              </div>
              <h-table :ref="'table' + item.i" :hookFunc="tableChange" :item="item"></h-table>
              <div class="data-match text-disable" @click="transData">转置数据</div>
              <!-- <div class="data-match" @click="openMatch = !openMatch">数据匹配</div>
              <div class="match-box" v-show="openMatch">match-box</div> -->
            </div>
            <div class="data-import" v-show="dataSoruceBox">
              <div class="return text-disable" text-disable @click="dataSoruceBox = false"><span class="iconfont">&#xe608;</span>取消</div>
              <div class="title">数据源</div>
              <div class="source-box">
                <div :class="{ 'text-disable': true, 'source-item': true, selected: project._id == dataProjectSelect._id }" v-for="project in dataProjects" @click="dataProjectSelect = project">{{ project.name }}</div>
              </div>
              <div :class="['confirm', 'text-disable', { disable: !dataProjectSelect._id }]" @click="loadData(dataProjectSelect.data), (dataSoruceBox = false)">确认导入</div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import GLayout from '@/components/general/GLayout.vue'
import HTable from '@/components/general/HTable.vue'
import SetBox from '@/components/tab/SetBox.vue'
import ShareWindow from '@/components/tab/ShareWindow.vue'
import PopBox from '@/components/general/PopBox.vue'
import SetBoxItem from '@/components/tab/SetBoxItem.vue'
import XSheet from '@/assets/script/x-sheet'
import html2canvas from 'html2canvas'
export default {
  components: { GLayout, HTable, SetBox, SetBoxItem, ShareWindow, PopBox },
  props: {
    addTab: {
      type: Function,
    },
    checkNewLoad: {
      type: Function,
    },
  },
  data() {
    return {
      selectOptions: {
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
      },
      keepData: false,
      dataSoruceBox: false,
      dataProjects: [],
      dataProjectSelect: {},
      chartProjectBox: false,
      chartProjects: [],

      panelConfig: {
        panelBackColor: '',
        panelItemMargin: '',
      },

      isDataBox: false,

      openMatch: false,

      chartSamples: [],
      curSampleName: '',
      textExamples: [
        {
          name: '标题字',
          config: {
            fontFamily: 'sans-serif',
            fontSize: 22,
            fontWeight: 'bold',
            color: '#000000',
            backgroundColor: '#ffffff',
          },
        },
        {
          name: '正文字',
          config: {
            fontFamily: 'sans-serif',
            fontSize: 16,
            fontWeight: 'normal',
            color: '#000000',
            backgroundColor: '#ffffff',
          },
        },
        {
          name: '黑底标题',
          config: {
            fontFamily: 'sans-serif',
            fontSize: 22,
            fontWeight: 'bold',
            color: '#ffffff',
            backgroundColor: '#000000',
          },
        },
        {
          name: '黑底正文',
          config: {
            fontFamily: 'sans-serif',
            fontSize: 16,
            fontWeight: 'normal',
            color: '#ffffff',
            backgroundColor: '#000000',
          },
        },
      ],

      panelId: '',
      panelName: '',
      sources: [
        {
          id: 'chart',
          name: '图表',
          types: [
            {
              id: 'newChart',
              name: '新建',
            },
            {
              id: 'oldChart',
              name: '项目',
            },
          ],
        },
        {
          id: 'text',
          name: '文本',
        },
        // {
        //   id: 'image',
        //   name: '图片',
        // },
      ],
      autoSave: undefined,
      saveTip: '',
      leftShow: true,
      rightShow: true,
      isPop: false,
      toShow: false,
    }
  },
  watch: {
    leftShow() {
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 0)
    },
    rightShow() {
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 0)
    },
    openMatch() {
      setTimeout(() => {
        this.$refs.myTable.render()
      }, 0)
    },
    dataSoruceBox(newValue) {
      if (newValue) {
        this.loadDataSource()
      }
    },
  },
  mounted() {
    this.$API.getSampleList((message) => {
      if (message.success) {
        this.chartSamples = message.info
        this.curSampleName = null
      }
    })
  },
  activated() {
    // 在进入tab时会触发，检查是否是新打开的tab，新打开的话要重新加载一下数据，否则会因为keep-alive出现不好的事情
    this.checkNewLoad(this.$route.params.tabkey, (flag, callback) => {
      if (flag) {
        this.$refs.GLayout.clearLayout() // 在加载数据前清除一下画布，消除keepalive的影响
        this.$API.getPanel({ _id: this.$route.params.tabkey }, (message) => {
          if (message.success) {
            callback({ type: 'panel', topic: message.info.name, key: message.info._id })
            this.panelId = this.$route.params.tabkey
            this.panelName = message.info.name
            this.setLayout(message.info.layout, message.info.back)
            this.setCurItemToBack()
            this.panelConfig.panelBackColor = message.info.back.config.backgroundColor
            this.panelConfig.panelItemMargin = message.info.back.config.itemMargin
          }
        })
        this.isDataBox = false
        this.chartProjectBox = false
        this.dataSoruceBox = false
        this.keepData = false
        this.saveTip = ''
        this.leftShow = true
        this.rightShow = true
        this.isPop = false
      }
    })
    this.autoSave = setInterval(() => {
      // 每1分钟自动保存一次
      this.save(false, true)
    }, 1000 * 60)
  },
  deactivated() {
    this.save()
    clearInterval(this.autoSave)
  },
  methods: {
    getItemConfigsBack(item) {
      return [
        {
          close: false,
          name: '仪表板',
          show: true,
          projects: [
            {
              name: '基础',
              open: true,
              sets: [
                {
                  name: '背景颜色',
                  type: 'color',
                  model: this.panelConfig.panelBackColor,
                  event: (val) => {
                    this.panelConfig.panelBackColor = val
                    this.$refs.GLayout.back.config.backgroundColor = val
                  },
                },
                {
                  name: '组件块间距',
                  type: 'number',
                  min: 0,
                  max: 40,
                  model: this.panelItemMargin,
                  event: (val) => {
                    this.panelItemMargin = val
                    this.$refs.GLayout.margin = [val, val]
                    this.$refs.GLayout.back.config.itemMargin = val
                  },
                },
              ],
            },
          ],
        },
      ]
    },
    getItemConfigsText(item) {
      return [
        {
          close: false,
          name: '文本组件',
          show: true,
          projects: [
            {
              name: '基础',
              open: true,
              sets: [
                {
                  name: '文本内容',
                  type: 'text',
                  model: item.config.content,
                  placeholder: '输入文本',
                  event: (val) => {
                    item.config.content = val
                    this.textItemChange(item)
                  },
                },
                {
                  name: '字体',
                  type: 'select',
                  model: item.config.fontFamily,
                  options: this.selectOptions.fontFamilys,
                  placeholder: '选择字体',
                  event: (val) => {
                    item.config.fontFamily = val
                    this.textItemChange(item)
                  },
                },
                {
                  name: '字体大小',
                  type: 'number',
                  min: 12,
                  max: 50,
                  model: item.config.fontSize,
                  event: (val) => {
                    item.config.fontSize = val
                    this.textItemChange(item)
                  },
                },
                {
                  name: '字体粗细',
                  type: 'select',
                  model: item.config.fontWeight,
                  options: this.selectOptions.fontWeights,
                  placeholder: '选择字体粗细',
                  event: (val) => {
                    item.config.fontWeight = val
                    this.textItemChange(item)
                  },
                },
                {
                  name: '文字颜色',
                  type: 'color',
                  model: item.config.color,
                  event: (val) => {
                    item.config.color = val
                    this.textItemChange(item)
                  },
                },
                {
                  name: '背景颜色',
                  type: 'color',
                  model: item.config.backgroundColor,
                  event: (val) => {
                    item.config.backgroundColor = val
                    this.textItemChange(item)
                  },
                },
              ],
            },
          ],
        },
      ]
    },
    transData() {
      this.$refs['table' + this.getCurItem().i][0].transData()
    },
    share() {
      this.save(true)
      this.isPop = true
      this.$refs.popwin.isShared = true
      this.$API.savePanel({ _id: this.panelId, isShared: true }, (message) => {
        console.log(message)
      })
    },
    setProj(tableData, option) {
      this.clearChart()
      this.setChart(tableData, option, true)
      this.loadData(tableData, undefined, true)
      this.setSetBox(option)
    },
    textSetExample(config) {
      this.getCurItem().config = Object.assign(this.getCurItem().config, config)
      this.textItemChange(this.getCurItem())
    },
    loadDataSource() {
      this.$API.getTableList((message) => {
        this.dataProjects = message.info
      })
      this.dataProjects = this.dataProjects.map((val) => {
        this.$API.getTable({ _id: val.id }, (message) => {
          val.data = message.info.data
        })
        return val
      })
    },
    textItemChange(item) {
      this.$refs.GLayout.setTextItem(item)
    },
    tableChange(data, item) {
      setTimeout(() => {
        this.setChart(data, undefined, undefined, item)
      }, 0)
    },
    setChart(data, option, flag, item) {
      if (!item) {
        if (flag && this.keepData) {
          data = this.$refs['table' + this.getCurItem().i][0].getData()
        }
        this.$refs.GLayout.setChart(data, option, this.getCurItem())
      } else {
        if (flag && this.keepData) {
          data = this.$refs['table' + item.i][0].getData()
        }
        this.$refs.GLayout.setChart(data, option, item)
      }
    },
    clearChart() {
      this.$refs.GLayout.clearChart()
    },
    loadData(data, item, flag) {
      if (item) {
        if (flag && this.keepData) {
          data = this.$refs['table' + item.i][0].getData()
        }
        this.$refs['table' + item.i][0].loadData(data)
      } else {
        if (flag && this.keepData) {
          data = this.$refs['table' + this.getCurItem().i][0].getData()
        }
        this.$refs['table' + this.getCurItem().i][0].loadData(data)
      }
    },
    importData() {
      XSheet.importFile((tableData, tableName) => {
        this.loadData(tableData)
      })
    },
    setCurSample(e, sampleName) {
      this.curSampleName = sampleName
    },
    isCurrentSample(sample) {
      if (sample.name === this.chartSamples[0].name && (this.curSampleName === '' || this.curSampleName === null)) {
        return true
      } else {
        return sample.name === this.curSampleName
      }
    },
    curItemChange() {
      this.isDataBox = false
      this.curSampleName = null
    },
    save(isHand, isCur) {
      if (!this.$refs.GLayout) return
      if (isCur === true) {
        let $chartp = document.getElementById('chartp')
        html2canvas($chartp).then((canvas) => {
          let imgSrc = canvas.toDataURL('image/png', 1)
          // API.getPanelImg({ _id: this.panelId, path: 'http://localhost:8080/preview-clean/panel/' }, (result) => {
          //   console.log(result)
          //   if (!result.success) {
          //     console.log('getPanelImg error')
          //     return
          //   }
          this.$API.savePanel({ _id: this.panelId, name: this.panelName, back: this.$refs.GLayout.back, layout: this.$refs.GLayout.layout, imgSrc: imgSrc }, (message) => {
            console.log(message)
            if (isHand) {
              this.saveTip = '保存成功'
            } else {
              this.saveTip = new Date().toLocaleTimeString('chinese', { hour12: false, hour: '2-digit', minute: '2-digit' }) + ' 已保存'
            }
          })
        })
      } else {
        this.$API.savePanel({ _id: this.panelId, name: this.panelName, back: this.$refs.GLayout.back, layout: this.$refs.GLayout.layout }, (message) => {
          console.log(message)
          if (isHand) {
            this.saveTip = '保存成功'
          } else {
            this.saveTip = new Date().toLocaleTimeString('chinese', { hour12: false, hour: '2-digit', minute: '2-digit' }) + ' 已保存'
          }
        })
      }
    },
    setConfig(item, key, value) {
      item.config[key] = value
    },
    setCurItemToBack() {
      this.$refs.GLayout.curItem = this.$refs.GLayout.back
    },
    getCurItem() {
      return this.$refs.GLayout ? this.$refs.GLayout.curItem : {}
    },
    setLayout(layout, back) {
      this.$refs.GLayout.setLayout(layout)
      this.$refs.GLayout.back = back
    },
    getLayout() {
      return this.$refs.GLayout ? [...this.$refs.GLayout.layout, this.$refs.GLayout.back] : []
    },
    addSource(sourceType, project) {
      if (sourceType === 'newChart') {
        let curItem = this.$refs.GLayout.addItem('chart', {})
        let that = this
        setTimeout(function () {
          // 下面这行对图表的data和option进行设置应该是不需要的，因为后续对HTable和SetBox的设置也会导致图表的更新
          // that.$refs.GLayout.$refs['chart' + curItem.i][0].setOption(that.chartSamples[0].examples[0].tableData, that.chartSamples[0].examples[0].option)
          that.loadData(that.chartSamples[0].examples[0].tableData, curItem)
          that.setSetBox(that.chartSamples[0].examples[0].option, curItem)
          window.addEventListener('resize', that.$refs.GLayout.$refs['chart' + curItem.i][0].chartResize)
        }, 0)
      } else if (sourceType === 'oldChart') {
        this.$API.getChartList((message) => {
          this.chartProjects = message.info
        })
        this.chartProjects = this.chartProjects.map((val) => {
          this.$API.getChart({ _id: val.id }, (message) => {
            val.tableData = message.info.data
            val.option = message.info.option
          })
          return val
        })
        this.chartProjectBox = true
      } else if (sourceType === 'addOldChart') {
        let curItem = this.$refs.GLayout.addItem('chart', {})
        let that = this
        setTimeout(function () {
          // that.$refs.GLayout.$refs['chart' + curItem.i][0].setOption(project.data, project.option)
          that.loadData(project.data, curItem)
          that.setSetBox(project.option, curItem)
          window.addEventListener('resize', that.$refs.GLayout.$refs['chart' + curItem.i][0].chartResize)
        }, 0)
      } else if (sourceType === 'text') {
        this.$refs.GLayout.addItem(sourceType, {
          content: '文本内容',
          fontFamily: 'sans-serif',
          fontSize: 22,
          fontWeight: 'bold',
          color: '#000000',
          backgroundColor: '#ffffff',
        })
      } else if (sourceType === 'image') {
        this.$refs.GLayout.addItem(sourceType, {})
      }
    },
    setSetBox(option, item) {
      if (item) {
        this.$refs['setBox' + item.i][0].setSettings(option, item)
      } else {
        this.$refs['setBox' + this.getCurItem().i][0].setSettings(option)
      }
    },
    clear() {
      this.$refs.GLayout.clearLayout()
      this.save(true)
    },
  },
}
</script>

<style scoped>
#stage {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.head {
  display: flex;
  justify-content: space-between;
  background-color: rgb(218, 218, 218);
}
.head .name {
  margin: 0 20px;
  color: rgb(41, 41, 41);
  font-size: 20px;
  line-height: 35px;
  cursor: default;
}
.head .head-menu {
  display: flex;
  padding-right: 20px;
  background-color: rgba(255, 255, 255, 0.507);
}
.head .head-menu .menu-item {
  padding: 0 18px;
  color: rgb(47, 47, 47);
  font-size: 18px;
  line-height: 35px;
  cursor: pointer;
}
.head .head-menu .menu-item:hover {
  background-color: rgba(255, 255, 255, 0.801);
}
.head .head-menu .menu-item:active {
  background-color: rgba(228, 228, 228, 0.801);
}
.head .head-menu .menu-tip {
  padding-right: 5px;
  color: rgb(116, 138, 161);
  line-height: 35px;
  font-size: 14px;
  background-color: rgb(218, 218, 218);
}

.content {
  display: flex;
  flex-grow: 1;
  height: 100px;
  overflow: hidden;
}

.content .left-box {
  display: flex;
  flex-direction: column;
  width: 180px;
  background-color: rgb(255, 255, 255);
}
.content .left-box .menu-top {
  position: relative;
  margin: 0 10px;
  z-index: 10;
}
.content .left-box .top-label {
  margin: 5px 0 5px 0;
  color: rgb(253, 253, 253);
  font-size: 16px;
  text-align: center;
  line-height: 40px;
  background-color: rgb(25, 126, 166);
  border-radius: 20px;
  cursor: default;
}
.content .left-box .menu-top:hover .top-label {
  background-color: rgb(95, 175, 199);
}
.content .left-box .top-label .iconfont {
  margin-left: 5px;
}
.content .left-box .menu-top .item-box {
  position: absolute;
  width: calc(100%);
  padding: 0 20px 0 20px;
  background-color: rgba(233, 233, 233, 0.799);
  border-radius: 5px;
}
.content .left-box .menu-top .top-item {
  display: none;
  height: 40px;
  margin: 5px 0;
  color: rgb(253, 253, 253);
  font-size: 16px;
  text-align: center;
  line-height: 40px;
  background-color: rgb(149, 149, 149);
  border-radius: 20px;
  cursor: pointer;
  transition: height 1s;
}
.content .left-box .menu-top .top-item:nth-child(1) {
  cursor: default;
}
@keyframes fra1 {
  0% {
    height: 0;
  }
  100% {
    height: 40px;
  }
}
.content .left-box .menu-top:hover .top-item {
  display: block;
  animation: fra1 0.3s;
}
.content .left-box .menu-top .top-item:hover {
  background-color: rgb(35, 152, 199);
}
.content .left-box .menu-top .top-item:active {
  background-color: rgb(176, 209, 223);
}
.content .left-box .menu-top .top-item:nth-child(1):active {
  background-color: rgb(35, 152, 199);
}
.content .left-box .menu-top .top-item .type-box {
  display: none;
  position: absolute;
  top: 5px;
  left: 0px;
  width: 100%;
  padding: 0 10px;
  opacity: 50%;
}
@keyframes fra2 {
  0% {
    opacity: 50%;
  }
  100% {
    opacity: 100%;
  }
}
.content .left-box .menu-top .top-item:nth-of-type(1):hover .type-box {
  display: flex;
  justify-content: space-between;
  opacity: 100%;
  animation: fra2 0.3s;
}
.content .left-box .menu-top .top-item .type-item {
  display: inline-block;
  width: 50px;
  line-height: 40px;
  background-color: rgb(137, 137, 137);
  border-radius: 20px;
  cursor: pointer;
}
.content .left-box .menu-top .top-item .type-item:hover {
  color: rgb(41, 41, 41);
  background-color: rgb(255, 255, 255);
}
.content .left-box .menu-top .top-item .type-item:active {
  color: rgb(41, 41, 41);
  background-color: rgb(159, 225, 241);
}

.content .left-box .menu-label {
  color: rgb(253, 253, 253);
  font-size: 20px;
  text-align: center;
  line-height: 30px;
  background-color: rgb(97, 161, 103);
  cursor: default;
}
.content .left-box .menu-label.return {
  line-height: 50px;
  font-size: 15px;
  background-color: rgb(97, 137, 161);
}
.content .left-box .menu-label.return .iconfont {
  margin-right: 5px;
  font-size: 20px;
}
.content .left-box .menu-label.check {
  color: rgb(37, 37, 37);
  font-size: 14px;
  line-height: 30px;
  background-color: rgb(192, 192, 192);
}
.content .left-box .menu-label.check input {
  width: 20px;
  height: 20px;
  margin-left: 5px;
  vertical-align: middle;
  cursor: pointer;
}
.content .left-box .model-main {
  display: flex;
  flex-grow: 1;
  overflow: auto;
}
.content .left-box .model-main .model-menu {
  width: 60px;
  background-color: rgb(253, 253, 253);
}
.content .left-box .model-main .model-menu .menu-item {
  color: rgb(63, 63, 63);
  font-size: 14px;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
  border-left: 6px solid rgba(0, 0, 0, 0);
  border-right: 6px solid rgba(0, 0, 0, 0);
}
.content .left-box .model-menu .menu-item:hover {
  background-color: rgb(248, 248, 248);
}
.content .left-box .model-menu .menu-item.current {
  background-color: rgb(241, 241, 241);
  border-left-color: rgb(7, 107, 61);
}
.content .left-box .model-menu .menu-item:active {
  background-color: rgb(194, 194, 194);
}

.content .left-box .model-box {
  flex-grow: 1;
  width: 20px;
  height: 100%;
  padding: 10px 10px 0 10px;
  background-color: rgb(241, 241, 241);
  overflow-y: auto;
}
.content .left-box .model-box .model-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.26);
  cursor: pointer;
}
.content .left-box .model-box .model-item:hover {
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.4);
}
.content .left-box .model-box .model-item:active {
  box-shadow: 0px 0px 15px 0px rgba(7, 161, 27, 0.671);
}
.content .left-box .model-box .model-item .item-img {
  height: 80px;
  flex-grow: 1;
  text-align: center;
  border-radius: 5px 5px 0 0;
  overflow: hidden;
}
.content .left-box .model-box .model-item .item-img img {
  width: 100px;
}
.content .left-box .model-box .model-item .item-img img.project {
  width: 100%;
  height: unset;
}
.content .left-box .model-box .model-item .item-img.text {
  line-height: 80px;
}
.content .left-box .model-box .model-item .item-name {
  padding: 2px 5px;
  color: rgb(66, 66, 66);
  font-size: 12px;
  text-align: center;
  background-color: rgb(228, 228, 228);
  border-radius: 0 0 5px 5px;
}

.content .right-box {
  display: flex;
  flex-direction: row-reverse;
}
.content .right-box .option-menu {
  background-color: rgb(253, 253, 253);
}
.content .right-box .option-menu .menu-item {
  height: 100px;
  padding: 0 5px;
  color: rgb(44, 44, 44);
  font-size: 20px;
  writing-mode: vertical-lr;
  letter-spacing: 2px;
  text-align: center;
  cursor: pointer;
  background-color: rgb(218, 218, 218);
}
.content .right-box .option-menu .menu-item:hover {
  background-color: rgb(177, 177, 177);
}
.content .right-box .option-menu .menu-item.current {
  color: rgb(255, 255, 255);
  background-color: rgb(80, 136, 78);
}
.content .right-box .option-menu .menu-item:active {
  background-color: rgb(116, 116, 116);
}
.content .right-box .option-box {
  width: 300px;
  display: flex;
}

.content .right-box .option-box .set-box {
  width: 100%;
  height: 100%;
  padding: 5px;
  background-color: rgb(241, 241, 241);
  overflow-y: auto;
}
.set-box .set-item {
  margin: 0 0 5px 0;
  padding: 0 5px 5px 5px;
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
}
.set-box .set-item:hover {
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.26);
}
.set-box .set-item .name {
  color: rgb(109, 134, 159);
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  border-bottom: 1px solid rgb(151, 151, 151);
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
.content .right-box .option-box .data-box {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.content .right-box .option-box .data-box .data-menu {
  display: flex;
  padding: 0 5px;
  color: rgb(29, 29, 29);
  font-size: 16px;
  line-height: 30px;
  background-color: rgb(226, 189, 121);
}
.content .right-box .option-box .data-box .data-menu .menu-item {
  padding: 0 10px;
  color: rgb(88, 88, 88);
  font-size: 14px;
  line-height: 30px;
  cursor: pointer;
}
.content .right-box .option-box .data-box .data-menu .menu-item:hover {
  background-color: rgba(255, 255, 255, 0.671);
}
.content .right-box .option-box .data-box .data-menu .menu-item:active {
  background-color: rgba(197, 197, 197, 0.671);
}
.content .right-box .option-box .data-box .data-match {
  color: rgb(255, 255, 255);
  font-size: 20px;
  text-align: center;
  line-height: 30px;
  background-color: rgb(218, 128, 76);
  cursor: pointer;
}
.content .right-box .option-box .data-box .data-match:hover {
  background-color: rgb(214, 113, 54);
}
.content .right-box .option-box .data-box .data-match:active {
  background-color: rgb(224, 162, 126);
}

.content .right-box .option-box .data-import {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.content .right-box .option-box .data-import .return {
  color: rgb(65, 65, 65);
  font-size: 20px;
  text-align: center;
  line-height: 50px;
  background-color: rgb(144, 168, 151);
  cursor: pointer;
}
.content .right-box .option-box .data-import .return:hover {
  background-color: rgb(67, 168, 97);
}
.content .right-box .option-box .data-import .return:active {
  background-color: rgb(103, 175, 125);
}
.content .right-box .option-box .data-import .confirm {
  font-size: 20px;
  color: rgb(255, 255, 255);
  text-align: center;
  line-height: 50px;
  background-color: rgb(49, 133, 181);
  cursor: pointer;
}
.content .right-box .option-box .data-import .confirm:hover {
  background-color: rgb(75, 171, 226);
}
.content .right-box .option-box .data-import .confirm:active {
  background-color: rgb(99, 149, 179);
}
.content .right-box .option-box .data-import .confirm.disable {
  background-color: rgb(211, 220, 221);
  cursor: default;
}
.content .right-box .option-box .data-import .title {
  font-size: 24px;
  color: rgb(255, 255, 255);
  text-align: center;
  line-height: 35px;
  background-color: rgb(138, 138, 138);
  cursor: default;
}
.content .right-box .option-box .data-import .source-box {
  flex-grow: 1;
  padding: 5px 5px 0 5px;
  overflow-y: auto;
  background-color: rgb(233, 233, 233);
}
.content .right-box .option-box .data-import .source-box .source-item {
  margin-bottom: 5px;
  padding: 5px;
  background-color: rgb(255, 255, 255);
  border-radius: 3px;
  text-overflow: ellipsis;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: pointer;
}
.content .right-box .option-box .data-import .source-box .source-item:hover {
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.26);
  background-color: rgb(231, 204, 127);
}
.content .right-box .option-box .data-import .source-box .source-item.selected {
  outline: 2px solid rgb(196, 118, 17);
  background-color: rgb(231, 204, 127);
}
.content .right-box .option-box .data-import .source-box .source-item:active {
  background-color: rgb(218, 171, 45);
}

.content .center-box {
  flex-grow: 1;
  flex-shrink: 1;
  overflow: hidden;
}
.content .center-box .center-inner {
  position: relative;
  height: 100%;
  padding: 5px;
  background-color: rgb(44, 44, 44);
}
.content .center-box .center-content {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

.inout-button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgb(255, 255, 255);
  cursor: pointer;
}
.inout-button:hover {
  background-color: rgb(19, 160, 49);
}
.inout-button:hover .iconfont {
  color: rgb(255, 255, 255);
}
.inout-button .iconfont {
  color: rgb(9, 136, 57);
  font-weight: bold;
  font-size: 20px;
}
</style>
