<!--
 * @Author: Cogic
 * @Date: 2021-12-24 21:15:51
 * @LastEditors: Cogic
 * @LastEditTime: 2022-01-24 04:20:53
 * @Description: 
-->
<template>
  <div id="stage">
    <div class="head">
      <div class="name">{{ panelName }}</div>
      <div class="head-menu">
        <div class="menu-item" @click="save">保存</div>
        <div class="menu-item">预览</div>
        <div class="menu-item">分享</div>
      </div>
    </div>
    <div class="content">
      <div class="left-box">
        <div class="menu-top" v-show="!chartProjectBox">
          <div class="top-label">添加资源</div>
          <div class="item-box">
            <div class="top-item" v-for="source in sources" @click="addSource(source.id)">
              {{ source.name }}
              <div class="type-box" v-show="source.id === 'chart'">
                <div class="type-item" v-for="type in source.types" @click.stop="addSource(type.id)">{{ type.name }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="menu-label" v-show="getCurItem().type === 'chart' && !chartProjectBox">图表类型</div>
        <div class="menu-label check" v-show="getCurItem().type === 'chart' && !chartProjectBox">保留数据<input type="checkbox" v-model="keepData" /></div>
        <div class="menu-label" v-show="getCurItem().type === 'text' && !chartProjectBox">文本样式</div>
        <div class="menu-label" v-show="getCurItem().type === 'image' && !chartProjectBox">图片</div>
        <div class="menu-label return" v-show="chartProjectBox" @click="chartProjectBox = false">返回</div>
        <div class="menu-label" v-show="chartProjectBox">图表项目</div>
        <div class="model-main" v-show="chartProjectBox">
          <div class="model-box">
            <div class="model-item" v-for="project in chartProjects" @click="addSource('addOldChart', project)">
              <div class="item-img">img</div>
              <div class="item-name">{{ project.name }}</div>
            </div>
          </div>
        </div>
        <div class="model-main" v-show="getCurItem().type === 'chart' && !chartProjectBox">
          <div class="model-menu">
            <div class="menu-item" :class="{ current: isCurrentSample(sample) }" v-for="sample in chartSamples" @click="setCurSample($event, sample.name)">{{ sample.name }}</div>
          </div>
          <template v-for="sample in chartSamples">
            <div class="model-box" v-if="isCurrentSample(sample)">
              <div class="model-item" v-for="example in sample.examples" @click="clearChart(), setChart(example.tableData, example.option, true), loadData(example.tableData, undefined, true), setSetBox(example.option)">
                <div class="item-img">img</div>
                <div class="item-name">{{ example.name }}</div>
              </div>
            </div>
          </template>
        </div>
        <div class="model-main" v-if="getCurItem().type === 'text' && !chartProjectBox">
          <div class="model-box">
            <div class="model-item" v-for="example in textExamples" @click="textSetExample(example.config)">
              <div class="item-img">img</div>
              <div class="item-name">{{ example.name }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="center-box">
        <div class="center-inner">
          <div class="center-content" ref="panelBack" @click="setCurItemToBack">
            <g-layout ref="GLayout"></g-layout>
          </div>
        </div>
      </div>
      <div class="right-box">
        <div class="option-menu">
          <div class="menu-item" :class="{ current: !isDataBox }" @click=";(isDataBox = false), (dataSoruceBox = false)">设置项</div>
          <div class="menu-item" v-show="getCurItem().type === 'chart'" :class="{ current: isDataBox }" @click="isDataBox = true">编辑数据</div>
        </div>
        <template v-for="item in getLayout()" :key="item.i">
          <div class="option-box" v-show="getCurItem().i === item.i">
            <div class="set-box" v-show="!isDataBox">
              <set-box v-if="item.type === 'chart'" :ref="'setBox' + item.i" :onSetChange="setChart"></set-box>
              <div v-if="item.type === 'back'">
                <div class="set-item">
                  <div class="name">背景</div>
                  <div class="setting">颜色<input type="color" v-model="panelBackColor" /></div>
                </div>
                <div class="set-item">
                  <div class="name">组件块</div>
                  <div class="setting">间距<input type="number" v-model="panelItemMargin" /></div>
                </div>
              </div>
              <div v-if="item.type === 'text'">
                <div class="set-item">
                  <div class="name">文本</div>
                  <div class="setting">内容<input type="text" v-model="item.config.content" @input="textItemChange(item)" /></div>
                  <div class="setting">字体<input type="text" v-model="item.config.fontFamily" @input="textItemChange(item)" /></div>
                  <div class="setting">字体大小<input type="number" v-model="item.config.fontSize" @input="textItemChange(item)" /></div>
                  <div class="setting">字体粗细<input type="text" v-model="item.config.fontWeight" @input="textItemChange(item)" /></div>
                  <div class="setting">文字颜色<input type="color" v-model="item.config.color" @input="textItemChange(item)" /></div>
                  <div class="setting">背景颜色<input type="color" v-model="item.config.backgroundColor" @input="textItemChange(item)" /></div>
                </div>
              </div>
              <div v-if="item.type === 'image'">image</div>
            </div>
            <div class="data-box" v-show="isDataBox && !dataSoruceBox">
              <div class="data-menu">
                <div class="menu-item" @click="importData">本地导入</div>
                <div class="menu-item" @click=";(dataSoruceBox = true), (dataProjectSelectId = null)">数据源导入</div>
                <!-- TODO URL导入待做 -->
                <div class="menu-item" v-show="false">URL导入</div>
              </div>
              <h-table :ref="'table' + item.i" :hookFunc="tableChange"></h-table>
              <div class="data-match" @click="openMatch = !openMatch">数据匹配</div>
              <div class="match-box" v-show="openMatch">match-box</div>
            </div>
            <div class="data-import" v-show="dataSoruceBox">
              <div class="return" @click="dataSoruceBox = false">取消</div>
              <div class="title">数据源</div>
              <div class="source-box">
                <div :class="{ 'source-item': true, selected: project.id == dataProjectSelect.id }" v-for="project in dataProjects" @click="dataProjectSelect = project">{{ project.name }}</div>
              </div>
              <div class="confirm" @click="loadData(dataProjectSelect.data), (dataSoruceBox = false)">确认导入</div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import API from '@/api'
import GLayout from '@/components/master/tab/GLayout.vue'
import HTable from '@/components/master/tab/HTable.vue'
import XSheet from '@/assets/script/x-sheet'
import SetBox from '@/components/master/tab/SetBox.vue'
export default {
  components: { GLayout, HTable, SetBox },
  activated() {
    // 在进入tab时会触发，检查是否是新打开的tab，新打开的话要重新加载一下数据，否则会因为keep-alive出现不好的事情
    this.checkNewLoad(this.$route.params.tabkey, (flag, callback) => {
      if (flag) {
        API.getPanel(this.$route.params.tabkey, (result) => {
          if (result.success) {
            callback({ type: 'panel', topic: result.fileData.name, key: result.fileData.id })
            this.panelName = result.fileData.name
            this.setLayout(result.fileData.layout, result.fileData.back)
            this.setCurItemToBack()
            this.panelBackColor = result.fileData.back.config.backgroundColor
            this.panelItemMargin = result.fileData.back.config.itemMargin
            // this.$refs.GLayout.index = result.fileData.layout.length
          }
        })
        this.isDataBox = false
        this.chartProjectBox = false
        this.dataSoruceBox = false
        this.keepData = false
      }
    })
  },
  mounted() {
    API.getPanel(this.$route.params.tabkey, (result) => {
      if (result.success) {
        this.addTab({ type: 'panel', topic: result.fileData.name, key: result.fileData.id })
        // this.panelBackColor = result.fileData.back.config.backgroundColor
        // this.panelName = result.fileData.name
        // this.setLayout(result.fileData.layout, result.fileData.back)
        // this.setCurItemToBack()
      }
    })
    API.getChartExamples((result) => {
      this.chartSamples = result
      this.curSampleName = null
    })
  },
  data() {
    return {
      keepData: false,
      dataSoruceBox: false,
      dataProjects: [],
      dataProjectSelect: {},
      chartProjectBox: false,
      chartProjects: [],

      panelBackColor: '',
      panelItemMargin: '',

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
        {
          id: 'image',
          name: '图片',
        },
      ],
    }
  },
  props: {
    addTab: {
      type: Function,
    },
    checkNewLoad: {
      type: Function,
    },
  },
  watch: {
    panelBackColor(newValue) {
      this.$refs.panelBack.style.backgroundColor = newValue
    },
    panelItemMargin(newValue) {
      this.$refs.GLayout.margin = [newValue, newValue]
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
  methods: {
    textSetExample(config) {
      this.getCurItem().config = Object.assign(this.getCurItem().config, config)
      this.textItemChange(this.getCurItem())
    },
    loadDataSource() {
      API.getTableList((result) => {
        this.dataProjects = result.filesInfo
      })
      this.dataProjects = this.dataProjects.map((val) => {
        API.getTable(val.id, (result) => {
          val.data = result.fileData.data
        })
        return val
      })
    },
    textItemChange(item) {
      this.$refs.GLayout.setTextItem(item)
    },
    tableChange(data) {
      setTimeout(() => {
        this.setChart(data)
      }, 0)
    },
    setChart(data, option, flag) {
      if (flag && this.keepData) {
        data = this.$refs['table' + this.getCurItem().i][0].getData()
      }
      this.$refs.GLayout.setChart(data, option)
    },
    clearChart() {
      this.$refs.GLayout.clearChart()
    },
    loadData(data, itemI, flag) {
      // console.log(this.$refs['table' + this.getCurItem().i][0]);
      if (itemI) {
        if (flag && this.keepData) {
          data = this.$refs['table' + itemI][0].getData()
        }
        this.$refs['table' + itemI][0].loadData(data)
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
    save() {
      let panelData = {
        layout: this.$refs.GLayout.layout,
        back: this.$refs.GLayout.back,
      }
      console.log(panelData)
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
        this.$refs.GLayout.addItem('chart', {})
        setTimeout(() => {
          this.$refs.GLayout.$refs['chart' + this.getCurItem().i][0].setOption(this.chartSamples[0].examples[0].tableData, this.chartSamples[0].examples[0].option)
          this.loadData(this.chartSamples[0].examples[0].tableData)
          this.setSetBox(this.chartSamples[0].examples[0].option, this.getCurItem().i)
          window.addEventListener('resize', this.$refs.GLayout.$refs['chart' + this.getCurItem().i][0].chartResize)
        }, 0)
      } else if (sourceType === 'oldChart') {
        API.getChartList((result) => {
          this.chartProjects = result.filesInfo
        })
        this.chartProjects = this.chartProjects.map((val) => {
          API.getChart(val.id, (result) => {
            val.tableData = result.fileData.data
            val.option = result.fileData.option
          })
          return val
        })
        this.chartProjectBox = true
      } else if (sourceType === 'addOldChart') {
        this.$refs.GLayout.addItem('chart', {})
        setTimeout(() => {
          this.$refs.GLayout.$refs['chart' + this.getCurItem().i][0].setOption(project.tableData, project.option)
          this.loadData(project.tableData)
          this.setSetBox(project.option, this.getCurItem().i)
          window.addEventListener('resize', this.$refs.GLayout.$refs['chart' + this.getCurItem().i][0].chartResize)
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
        // console.log('ttttttttttttttttttttext')
        // this.$refs.GLayout.layout[this.getCurItem().i].config = {
        //   content: '文本内容',
        //   fontFamily: 'sans-serif',
        //   fontSize: 22,
        //   fontWeight: 'bold',
        //   color: '#000000',
        //   backgroundColor: '#ffffff',
        // }
      } else if (sourceType === 'image') {
        this.$refs.GLayout.addItem(sourceType, {})
      }
    },
    setSetBox(option, itemI) {
      if (itemI) {
        this.$refs['setBox' + itemI][0].setSettings(option)
      } else {
        this.$refs['setBox' + this.getCurItem().i][0].setSettings(option)
      }
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
  flex-direction: column;
  width: 180px;
  /* height: 200px; */
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
  margin: 5px 0;
  color: rgb(253, 253, 253);
  font-size: 16px;
  text-align: center;
  line-height: 40px;
  background-color: rgb(149, 149, 149);
  border-radius: 20px;
}
.content .left-box .menu-top:hover .top-item {
  display: block;
}
.content .left-box .menu-top .top-item:hover {
  background-color: rgb(35, 152, 199);
}
.content .left-box .menu-top .top-item .type-box {
  display: none;
  position: absolute;
  top: 5px;
  left: 0px;
  width: 100%;
  padding: 0 10px;
}
.content .left-box .menu-top .top-item:nth-of-type(1):hover .type-box {
  display: flex;
  justify-content: space-between;
}
.content .left-box .menu-top .top-item .type-item {
  display: inline-block;
  width: 50px;
  line-height: 40px;
  background-color: rgb(137, 137, 137);
  border-radius: 20px;
}
.content .left-box .menu-top .top-item .type-item:hover {
  color: rgb(41, 41, 41);
  background-color: rgb(255, 255, 255);
}

.content .left-box .menu-label {
  color: rgb(253, 253, 253);
  font-size: 20px;
  text-align: center;
  line-height: 30px;
  background-color: rgb(97, 161, 103);
}
.content .left-box .menu-label.return {
  line-height: 50px;
  background-color: rgb(97, 137, 161);
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
  flex-grow: 1;
  width: 20px;
  height: 100%;
  padding: 10px 10px 0 10px;
  background-color: rgb(241, 241, 241);
  overflow-y: scroll;
}
.content .left-box .model-box .model-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.26);
}
.content .left-box .model-box .model-item .item-img {
  height: 80px;
  flex-grow: 1;
  border-radius: 5px 5px 0 0;
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
.content .right-box .option-box {
  width: 300px;
  display: flex;
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
.set-box .set-item .setting {
  margin: 2px 0;
  padding: 2px 5px;
  color: rgb(68, 68, 68);
  font-size: 16px;
  border-radius: 3px;
}
.set-box .set-item .setting input {
  width: 100px;
  border: 1px solid rgb(0, 0, 0);
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
  flex-shrink: 1;
  overflow: hidden;
}
.content .center-box .center-inner {
  height: 100%;
  padding: 5px;
  background-color: rgb(44, 44, 44);
  overflow-y: scroll;
}
.content .center-box .center-content {
  width: fit-content;
  height: fit-content;
  min-width: 100%;
  min-height: 100%;
  background-color: rgb(234, 234, 234);
}
</style>
