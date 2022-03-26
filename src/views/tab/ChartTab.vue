<template>
  <div id="stage">
    <share-window ref="popwin" v-show="isPop" />
    <div class="head">
      <div class="name">{{ chartName }}</div>
      <div class="head-menu">
        <div class="menu-tip">{{ saveTip }}</div>
        <div class="menu-item text-disable" @click="save(true, true)">保存</div>
        <div class="menu-item text-disable" @click="share">分享</div>
      </div>
    </div>
    <div class="content">
      <div class="left-box" v-show="leftShow">
          <chart-select-box :keepData="keepData" :setKeepData="setKeepData" :chartSamples="chartSamples" :setProj="setChartByExample"></chart-select-box>
      </div>
      <div class="inout-button text-disable" @click="leftShow = !leftShow">
        <span class="iconfont" v-if="leftShow">&#xe619;</span>
        <span class="iconfont" v-else>&#xe61a;</span>
      </div>
      <div class="center-box">
        <div class="center-content" id="chartp">
          <e-chart ref="myChart" :data="chartData" :option="chartOption"></e-chart>
        </div>
      </div>
      <div class="inout-button" @click="rightShow = !rightShow">
        <span class="iconfont" v-if="!rightShow">&#xe619;</span>
        <span class="iconfont" v-else>&#xe61a;</span>
      </div>
      <div class="right-box" v-show="rightShow">
        <div class="option-menu">
          <div class="menu-item" :class="['text-disable', { current: !isDataBox }]" @click=";(isDataBox = false), (dataSoruceBox = false)">设置项</div>
          <div class="menu-item" :class="['text-disable', { current: isDataBox }]" @click="isDataBox = true">编辑数据</div>
        </div>
        <div class="option-box" ref="optionBox">
          <div class="set-box" v-show="!isDataBox">
            <set-box ref="setBox" :onSetChange="setChart"></set-box>
          </div>
          <div class="data-box" v-show="isDataBox && !dataSoruceBox">
            <div class="data-menu">
              <div class="menu-item text-disable" @click="importData">本地导入</div>
              <div class="menu-item text-disable" @click=";(dataSoruceBox = true), (dataProjectSelect = {})">数据源导入</div>
              <!-- TODO URL导入待做 -->
              <!-- <div class="menu-item text-disable" v-if="false">URL导入</div> -->
            </div>
            <h-table ref="myTable" :hookFunc="tableChange"></h-table>
            <div class="data-match text-disable" @click="transData">转置数据</div>
            <!-- <div class="data-match" @click="openMatch = !openMatch">数据匹配</div>
            <div class="match-box" v-show="openMatch">match-box</div> -->
          </div>
          <div class="data-import" v-show="dataSoruceBox">
            <div class="return text-disable" @click="dataSoruceBox = false">取消</div>
            <div class="title">数据源</div>
            <div class="source-box">
              <div :class="{ 'source-item': true, selected: project._id == dataProjectSelect._id }" v-for="project in dataProjects" @click="dataProjectSelect = project">{{ project.name }}</div>
            </div>
            <div :class="['confirm', 'text-disable', { disable: !dataProjectSelect._id }]" @click="loadData(dataProjectSelect.data), (dataSoruceBox = false)">确认导入</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EChart from '@/components/general/EChart.vue'
import HTable from '@/components/general/HTable.vue'
import SetBox from '@/components/tab/SetBox.vue'
import ChartSelectBox from '@/components/tab/ChartSelectBox.vue'
import ShareWindow from '@/components/tab/ShareWindow.vue'
import html2canvas from 'html2canvas'
export default {
  components: { EChart, HTable, SetBox,ChartSelectBox, ShareWindow },
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
      keepData: false,
      chartName: '',
      chartSamples: [],
      chartData: [],
      chartOption: {},
      chartId: '',
      isDataBox: true,
      openMatch: false,
      dataSoruceBox: false,
      dataProjects: [],
      dataProjectSelect: {},
      autoSave: undefined,
      saveTip: '',
      leftShow: true,
      rightShow: true,
      isPop: false,
    }
  },
  watch: {
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
    // TODO chartSamples 可以设置为 store 中的全局变量，这样就不用每次都 get 了，包括 PanelTab 中的也是
    this.$API.getSampleList((message) => {
      if (message.success) {
        this.chartSamples = message.info
        // this.curSampleName = message.info[0].name
      }
    })
  },
  updated() {
    this.$refs.myChart.chartResize()
  },
  activated() {
    // 在进入tab时会触发，检查是否是新打开的tab，新打开的话要重新加载一下数据，否则会因为keep-alive出现不好的事情
    this.checkNewLoad(this.$route.params.tabkey, (flag, callback) => {
      if (flag) {
        this.clearChart() // 在加载数据前清除一下画布，消除keepalive的影响
        this.$API.getChart({ _id: this.$route.params.tabkey }, (message) => {
          if (message.success) {
            callback({ type: 'chart', topic: message.info.name, key: message.info._id })
            this.chartId = this.$route.params.tabkey
            this.chartName = message.info.name
            this.loadData(message.info.data)
            this.chartData = message.info.data
            this.chartOption = message.info.option
            this.$refs.setBox.setSettings(message.info.option)
          }
        })
        this.isDataBox = false
        this.hasTableData = false
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
    setKeepData(val) {
      this.keepData = val
    },
    setChartByExample(example) {
      this.clearChart()
      this.loadData(example.tableData, true)
      this.$refs.setBox.setSettings(example.option)
    },
    transData() {
      this.$refs.myTable.transData()
    },
    loadDataSource() {
      this.$.getTableList((message) => {
        this.dataProjects = message.info
      })
      this.dataProjects = this.dataProjects.map((val) => {
        this.$API.getTable({ _id: val.id }, (message) => {
          val.data = message.info.data
        })
        return val
      })
    },
    tableChange(data) {
      // 当数据表修改时触发已修改图表数据
      setTimeout(() => {
        this.setChart(data)
      }, 0)
    },
    setChart(data, option = {}) {
      this.$refs.myChart.setOption(data, option)
    },
    loadData(data, flag) {
      if (flag && this.keepData) {
        data = this.$refs.myTable.getData()
      }
      this.$refs.myTable.loadData(data)
    },
    clearChart() {
      // 清除图表
      this.$refs.myChart.clear()
    },
    importData() {
      this.$refs.myTable.importData()
    },
    save(isHand, isCur) {
      if (!this.$refs.myChart) return
      if (isCur === true) {
        let $chartp = document.getElementById('chartp')
        html2canvas($chartp).then((canvas) => {
          let imgSrc = canvas.toDataURL('image/png', 1)
          // API.getChartImg({ _id: this.chartId, path: 'http://localhost:8080/preview-clean/chart/' }, (result) => {
          //   console.log(result)
          //   if (!result.success) {
          //     console.log('getChartImg error')
          //     return
          //   }
          this.$API.saveChart({ _id: this.chartId, name: this.chartName, data: this.$refs.myTable.getData(), option: this.$refs.myChart.getOption(), imgSrc: imgSrc }, (message) => {
            console.log(message)
            if (isHand) {
              this.saveTip = '保存成功'
            } else {
              this.saveTip = new Date().toLocaleTimeString('chinese', { hour12: false, hour: '2-digit', minute: '2-digit' }) + ' 已保存'
            }
          })
        })
      } else {
        this.$API.saveChart({ _id: this.chartId, name: this.chartName, data: this.$refs.myTable.getData(), option: this.$refs.myChart.getOption() }, (message) => {
          console.log(message)
          if (isHand) {
            this.saveTip = '保存成功'
          } else {
            this.saveTip = new Date().toLocaleTimeString('chinese', { hour12: false, hour: '2-digit', minute: '2-digit' }) + ' 已保存'
          }
        })
      }
    },
    share() {
      this.save(true)
      this.isPop = true
      this.$refs.popwin.isShared = true
      this.$API.saveChart({ _id: this.chartId, isShared: true }, (message) => {
        console.log(message)
      })
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
  display: flex;
  width: 300px;
}
.content .right-box .option-box .set-box {
  width: 100%;
  height: 100%;
  padding: 5px;
  background-color: rgb(241, 241, 241);
  overflow-y: auto;
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
  /* word-break: keep-all; */
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
  flex-shrink: 0;
  padding: 5px;
  background-color: rgb(44, 44, 44);
}
.content .center-box .center-content {
  height: 100%;
  background-color: rgb(255, 255, 255);
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
