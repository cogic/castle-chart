<!--
 * @Author: Cogic
 * @Date: 2021-12-24 21:15:41
 * @LastEditors: Cogic
 * @LastEditTime: 2022-01-25 04:36:06
 * @Description: 
-->
<template>
  <div id="stage">
    <div class="head">
      <div class="name">{{ chartName }}</div>
      <div class="head-menu">
        <div class="menu-item" @click="save">保存</div>
        <div class="menu-item">预览</div>
        <div class="menu-item">分享</div>
      </div>
    </div>
    <div class="content">
      <div class="left-box">
        <div class="model-menu">
          <div class="menu-label">图表类型</div>
          <div class="menu-label check">保留数据<input type="checkbox" v-model="keepData" /></div>
          <div class="menu-item" :class="{ current: curSampleName === sample.name }" v-for="sample in chartSamples" @click="setCurSample($event, sample.name)">{{ sample.name }}</div>
        </div>
        <template v-for="sample in chartSamples">
          <div class="model-box" v-if="curSampleName === sample.name">
            <div class="model-item" v-for="example in sample.examples" @click="clearChart(), setChart(example.tableData, example.option, true), loadData(example.tableData, true), setSetBox(example.option)">
              <div class="item-img">
                <img src="@/assets/image/折线图.png" alt="" v-show="sample.name === '折线图'">
                <img src="@/assets/image/柱状图.png" alt="" v-show="sample.name === '柱状图'">
                <img src="@/assets/image/饼图.png" alt="" v-show="sample.name === '饼图'">
                <img src="@/assets/image/散点图.png" alt="" v-show="sample.name === '散点图'">
                <img src="@/assets/image/漏斗图.png" alt="" v-show="sample.name === '漏斗图'">
                <img src="@/assets/image/雷达图.png" alt="" v-show="sample.name === '雷达图'">
              </div>
              <div class="item-name">{{ example.name }}</div>
            </div>
          </div>
        </template>
      </div>
      <div class="center-box">
        <div class="center-content">
          <e-chart ref="myChart" :data="chartData" :option="chartOption"></e-chart>
        </div>
      </div>
      <div class="right-box">
        <div class="option-menu">
          <div class="menu-item" :class="{ current: !isDataBox }" @click=";(isDataBox = false), (dataSoruceBox = false)">设置项</div>
          <div class="menu-item" :class="{ current: isDataBox }" @click="isDataBox = true">编辑数据</div>
        </div>
        <div class="option-box" ref="optionBox">
          <div class="set-box" v-show="!isDataBox">
            <set-box ref="setBox" :onSetChange="setChart"></set-box>
          </div>
          <div class="data-box" v-show="isDataBox && !dataSoruceBox">
            <div class="data-menu">
              <div class="menu-item" @click="importData">本地导入</div>
              <div class="menu-item" @click=";(dataSoruceBox = true), (dataProjectSelectId = null)">数据源导入</div>
              <!-- TODO URL导入待做 -->
              <div class="menu-item" v-show="false">URL导入</div>
            </div>
            <h-table ref="myTable" :hookFunc="tableChange"></h-table>
            <div class="data-match" @click="openMatch = !openMatch">数据匹配</div>
            <div class="match-box" v-show="openMatch">match-box</div>
          </div>
          <div class="data-import" v-show="dataSoruceBox">
            <div class="return" @click="dataSoruceBox = false">取消</div>
            <div class="title">数据源</div>
            <div class="source-box">
              <div :class="{ 'source-item': true, selected: project._id == dataProjectSelect._id }" v-for="project in dataProjects" @click="dataProjectSelect = project">{{ project.name }}</div>
            </div>
            <div class="confirm" @click="loadData(dataProjectSelect.data), (dataSoruceBox = false)">确认导入</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// TODO 切换图表时询问是否保留数据
import API from '@/api'
import EChart from '@/components/master/tab/EChart.vue'
import HTable from '@/components/master/tab/HTable.vue'
import XSheet from '@/assets/script/x-sheet'
import SetBox from '@/components/master/tab/SetBox.vue'
export default {
  components: { EChart, HTable, SetBox },
  activated() {
    // 在进入tab时会触发，检查是否是新打开的tab，新打开的话要重新加载一下数据，否则会因为keep-alive出现不好的事情
    this.checkNewLoad(this.$route.params.tabkey, (flag, callback) => {
      if (flag) {
        API.getChart({_id:this.$route.params.tabkey}, (message) => {
          if (message.success) {
            callback({ type: 'chart', topic: message.info.name, key: message.info._id })
            this.chartName = message.info.name
            this.loadData(message.info.data)
            this.chartData = message.info.data
            this.chartOption = message.info.option
            this.$refs.setBox.setSettings(message.info.option)
            // this.setChart(result.fileData.data, result.fileData.option)
          }
        })
        this.isDataBox = false
        this.hasTableData = false
        this.dataSoruceBox = false
        this.keepData = false
        this.curSampleName = null
      }
    })
  },
  mounted() {
    // API.getChart(this.$route.params.tabkey, (result) => {
    //   if (result.success) {
    //     this.addTab({ type: 'chart', topic: result.fileData.name, key: result.fileData.id })
    //     // this.chartName = result.fileData.name
    //     // this.loadData(result.fileData.data)
    //     // this.setChart(result.fileData.data, result.fileData.option)
    //   }
    // })
    API.getChartExamples((result) => {
      // TODO chartSamples 可以设置为 store 中的全局变量，这样就不用每次都 get 了，包括 PanelTab 中的也是
      this.chartSamples = result
      this.curSampleName = null
    })
  },
  data() {
    return {
      keepData: false,
      chartName: '',
      chartSamples: [],
      chartData: [],
      chartOption: {},
      isDataBox: true,
      curSampleName: '',
      openMatch: false,
      dataSoruceBox: false,
      dataProjects: [],
      dataProjectSelect: {},
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
  props: {
    addTab: {
      type: Function,
    },
    checkNewLoad: {
      type: Function,
    },
  },
  methods: {
    loadDataSource() {
      API.getTableList((message) => {
        this.dataProjects = message.info
      })
      this.dataProjects = this.dataProjects.map((val) => {
        API.getTable({_id:val.id}, (message) => {
          val.data = message.info.data
        })
        return val
      })
    },
    tableChange(data) {
      setTimeout(() => {
        this.setChart(data)
      }, 0)
    },
    save() {
      API.saveChart({ _id: this.$route.params.tabkey, name: this.chartName, data: this.$refs.myTable.getData(),option:this.$refs.myChart.getOption() }, (message) => {
        console.log(message)
      })
    },
    setCurSample(e, sampleName) {
      if (this.curSampleName === sampleName) {
        this.curSampleName = null
      } else {
        this.curSampleName = sampleName
      }
    },
    setChart(data, option = {}, flag) {
      if (flag && this.keepData) {
        data = this.$refs.myTable.getData()
      }
      this.$refs.myChart.setOption(data, option)
    },
    clearChart() {
      this.$refs.myChart.clear()
    },
    loadData(data, flag) {
      if (flag && this.keepData) {
        data = this.$refs.myTable.getData()
      } else {
        // this.chartData = data
      }
      this.$refs.myTable.loadData(data)
    },
    importData() {
      XSheet.importFile((tableData, tableName) => {
        this.$refs.myTable.loadData(tableData)
      })
    },
    setSetBox(option) {
      this.$refs.setBox.setSettings(this.$refs.myChart.getOption())
    },
  },
  updated() {
    this.$refs.myChart.chartResize()
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

.content {
  display: flex;
  flex-grow: 1;
  height: 100px;
  overflow: hidden;
}

.content .left-box {
  display: flex;
}
.content .left-box .model-menu {
  width: 100px;
  background-color: rgb(253, 253, 253);
}
.content .left-box .menu-label {
  color: rgb(253, 253, 253);
  font-size: 20px;
  text-align: center;
  line-height: 60px;
  background-color: rgb(97, 161, 103);
}
.content .left-box .menu-label.check {
  color: rgb(37, 37, 37);
  font-size: 14px;
  line-height: 30px;
  background-color: rgb(192, 192, 192);
}
.content .left-box .menu-label.check input {
  margin-left: 5px;
  vertical-align: middle;
}

.content .left-box .model-menu .menu-item {
  color: rgb(63, 63, 63);
  font-size: 16px;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
  border-left: 6px solid rgba(0, 0, 0, 0);
  border-right: 6px solid rgba(0, 0, 0, 0);
  user-select: none;
}
.content .left-box .model-menu .menu-item:hover {
  background-color: rgb(248, 248, 248);
}
.content .left-box .model-menu .menu-item.current {
  background-color: rgb(241, 241, 241);
  border-left-color: rgb(7, 107, 61);
}

.content .left-box .model-box {
  background-color: rgb(241, 241, 241);
  overflow-y: scroll;
}
.content .left-box .model-box .model-item {
  display: flex;
  flex-direction: column;
  margin: 15px;
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.26);
  cursor: pointer;
}
.content .left-box .model-box .model-item .item-img {
  width: 100px;
  height: 80px;
  flex-grow: 1;
  text-align: center;
  border-radius: 5px 5px 0 0;
}
.content .left-box .model-box .model-item .item-img img {
  width:60px;
  height:60px;
  margin-top: 10px;
}
.content .left-box .model-box .model-item .item-name {
  width: 100px;
  padding: 2px 5px;
  color: rgb(66, 66, 66);
  font-size: 16px;
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
.content .right-box .option-box {
  display: flex;
  width: 300px;
}
.content .right-box .option-box .drag-bar {
  background-color: beige;
  cursor: ew-resize;
}
.content .right-box .option-box .drag-bar:hover {
  background-color: rgb(187, 187, 141);
}
.content .right-box .option-box .set-box {
  width: 100%;
  height: 100%;
  padding: 5px;
  background-color: rgb(241, 241, 241);
  overflow-y: scroll;
}
/* .content .right-box .option-box .set-box .set-item {
  margin: 0 0 5px 0;
  padding: 0 5px 5px 5px;
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
}
.content .right-box .option-box .set-box .set-item:hover {
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.26);
}
.content .right-box .option-box .set-box .set-item .name {
  color: rgb(68, 68, 68);
  font-size: 16px;
  text-align: center;
  border-bottom: 1px solid rgb(151, 151, 151);
}
.content .right-box .option-box .set-box .set-item .setting {
  margin: 2px 0;
  padding: 2px 5px;
  color: rgb(68, 68, 68);
  font-size: 16px;
  border-radius: 3px;
} */
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

.content .right-box .option-box .data-import {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.content .right-box .option-box .data-import .return {
  text-align: center;
  line-height: 50px;
  background-color: rgb(144, 168, 151);
}
.content .right-box .option-box .data-import .confirm {
  color: rgb(255, 255, 255);
  text-align: center;
  line-height: 50px;
  background-color: rgb(49, 133, 181);
}
.content .right-box .option-box .data-import .title {
  color: rgb(255, 255, 255);
  text-align: center;
  line-height: 30px;
  background-color: rgb(138, 138, 138);
}
.content .right-box .option-box .data-import .source-box {
  flex-grow: 1;
  padding: 5px 5px 0 5px;
  overflow-y: scroll;
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
  word-break: keep-all;
}
.content .right-box .option-box .data-import .source-box .source-item:hover {
  background-color: rgb(234, 246, 252);
}
.content .right-box .option-box .data-import .source-box .source-item.selected {
  outline: 2px solid rgb(22, 115, 169);
}

.content .center-box {
  flex-grow: 1;
  flex-shrink: 0;
  padding: 20px;
  background-color: rgb(44, 44, 44);
}
.content .center-box .center-content {
  height: 100%;
  background-color: rgb(255, 255, 255);
}
</style>
