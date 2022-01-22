<!--
 * @Author: Cogic
 * @Date: 2021-12-24 21:15:51
 * @LastEditors: Cogic
 * @LastEditTime: 2022-01-22 14:50:01
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
        <div class="menu-top">
          <div class="top-label">添加资源</div>
          <div class="item-box">
            <div class="top-item" v-for="source in sources" @click="addSource(source.id)">
              {{ source.name }}
              <div class="type-box" v-show="source.id === 'chart'">
                <div class="type-item" v-for="type in source.types">{{ type.name }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="menu-label" v-show="getCurItem().type === 'chart'">图表类型</div>
        <div class="menu-label" v-show="getCurItem().type === 'text'">文本</div>
        <div class="menu-label" v-show="getCurItem().type === 'image'">图片</div>
        <div class="model-main" v-show="getCurItem().type === 'chart'">
          <div class="model-menu">
            <div class="menu-item" :class="{ current: isCurrentSample(sample) }" v-for="sample in chartSamples" @click="setCurSample($event, sample.name)">{{ sample.name }}</div>
          </div>
          <template v-for="sample in chartSamples">
            <div class="model-box" v-if="isCurrentSample(sample)">
              <div class="model-item" v-for="example in sample.examples" @click="clearChart(), setChart(example.tableData, example.option), loadData(example.tableData)">
                <div class="item-img">img</div>
                <div class="item-name">{{ example.name }}</div>
              </div>
            </div>
          </template>
        </div>
        <div class="model-main" v-if="getCurItem().type === 'text'">
          <!-- <template v-for="sample in textSamples"> -->
          <div class="model-box">
            <div class="model-item" v-for="example in textExamples" @click="clearChart(), setChart(example.tableData, example.option), loadData(example.tableData)">
              <div class="item-img">img</div>
              <div class="item-name">{{ example.name }}</div>
            </div>
          </div>
          <!-- </template> -->
        </div>
      </div>
      <div class="center-box">
        <div class="center-inner">
          <div class="center-content" @click="setCurItemToBack">
            <g-layout ref="GLayout"></g-layout>
          </div>
        </div>
      </div>
      <div class="right-box">
        <div class="option-menu">
          <div class="menu-item" :class="{ current: !isDataBox }" @click="isDataBox = false">设置项</div>
          <div class="menu-item" v-show="getCurItem().type === 'chart'" :class="{ current: isDataBox }" @click="isDataBox = true">编辑数据</div>
        </div>
        <template v-for="item in getLayout()" :key="item.i">
          <div class="option-box" v-show="getCurItem().i === item.i">
            <div class="set-box" v-show="!isDataBox">
              <input type="text" v-model="aaa.a" />
              <input type="text" v-model="aaa.b" />
              <input type="text" @change="setConfig(item, 'content', $event.target.value)" />
              <div class="set-item" v-for="item in 10">
                <div class="name">设置项目 items</div>
                <div class="setting">项目 item</div>
                <div class="setting">项目 item</div>
              </div>
            </div>
            <div class="data-box" v-show="isDataBox">
              <div class="data-menu">
                导入数据
                <div class="menu-item" @click="importData">本地导入</div>
                <div class="menu-item">数据源导入</div>
                <div class="menu-item">URL导入</div>
              </div>
              <h-table :ref="'table' + item.i" :hookFunc="tableChange"></h-table>
              <div class="data-match" @click="openMatch = !openMatch">数据匹配</div>
              <div class="match-box" v-show="openMatch">match-box</div>
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
export default {
  components: { GLayout, HTable },
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
            this.$refs.GLayout.index = result.fileData.layout.length
          }
        })
        this.isDataBox = false
      }
    })
  },
  mounted() {
    // this.$refs.myTable.addHook(() => {
    //   setTimeout(() => {
    //     this.setChart(this.$refs.myTable.getData())
    //   }, 0)
    // })
    API.getPanel(this.$route.params.tabkey, (result) => {
      if (result.success) {
        this.addTab({ type: 'panel', topic: result.fileData.name, key: result.fileData.id })
        this.panelName = result.fileData.name
        this.setLayout(result.fileData.layout, result.fileData.back)
        this.setCurItemToBack()
      }
    })
    API.getChartExamples((result) => {
      this.chartSamples = result
      this.curSampleName = null
    })
  },
  data() {
    return {
      isDataBox: false,

      chartSamples: [],
      curSampleName: '',
      textExamples: [{ name: '标题一' }, { name: '标题二' }, { name: '正文一' }, { name: '正文二' }],

      aaa: {
        a: 'hhh',
        b: 'dsfsdfsdf',
      },

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
  methods: {
    tableChange(data){
      setTimeout(() => {
        this.setChart(data)
      }, 0)
    },
    setChart(data, option = {}) {
      this.$refs.GLayout.setChart(data, option)
      // console.log(this.$refs.GLayout.$refs['chart' + this.getCurItem().i])
      // this.$refs.GLayout.$refs['chart' + this.getCurItem().i][0].setOption(data, option)
    },
    clearChart() {
      this.$refs.GLayout.clearChart()
      // this.$refs.GLayout.$refs['chart' + this.getCurItem().i][0].clear()
    },
    loadData(data) {
      // console.log(this.$refs)
      this.$refs['table' + this.getCurItem().i][0].loadData(data)
    },

    setCurSample(e, sampleName) {
      // if (this.curSampleName === sampleName) {
      //   this.curSampleName = null
      // } else {
      this.curSampleName = sampleName
      // }
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
      this.$refs.GLayout.layout = layout
      this.$refs.GLayout.back = back
    },
    getLayout() {
      return this.$refs.GLayout ? [...this.$refs.GLayout.layout, this.$refs.GLayout.back] : []
    },
    addSource(sourceType) {
      this.$refs.GLayout.addItem(sourceType, {})
      if (sourceType === 'chart') {
        setTimeout(() => {
          this.$refs.GLayout.$refs['chart' + this.getCurItem().i][0].setOption(this.chartSamples[0].examples[0].tableData,this.chartSamples[0].examples[0].option)
          window.addEventListener('resize', this.$refs.GLayout.$refs['chart' + this.getCurItem().i][0].chartResize)
          window.dispatchEvent(new Event('resize'))
        }, 0)
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
  /* display: flex; */
  /* flex-direction: column; */
  position: relative;
  margin: 0 10px;
  /* background-color: antiquewhite; */
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
  /* display: flex; */
  /* flex-direction: column; */
  /* align-items: center; */
  position: absolute;
  width: calc(100%);
  /* margin-top: -5px; */
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
/* .content .left-box .menu-top .top-item:nth-of-type(1):hover {
  border-radius: 20px 0 0 20px;
} */
.content .left-box .menu-top .top-item .type-box {
  display: none;
  position: absolute;
  top: 5px;
  left: 0px;
  width: 100%;
  padding: 0 10px;
  /* width: max-content; */
  /* margin: auto; */
  /* padding: 0 15px 0 0; */
  /* background-color: rgb(35, 152, 199); */
  /* border-radius: 0 20px 20px 0; */
}
.content .left-box .menu-top .top-item:nth-of-type(1):hover .type-box {
  display: flex;
  justify-content: space-between;
}
.content .left-box .menu-top .top-item .type-item {
  display: inline-block;
  width: 50px;
  /* margin-right: 5px; */
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
.content .left-box .model-main {
  display: flex;
  /* flex-direction: column; */
  flex-grow: 1;
  /* height: 100%; */
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
  /* width: 100%; */
  margin-bottom: 10px;
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.26);
}
.content .left-box .model-box .model-item .item-img {
  /* width: 100px; */
  height: 80px;
  flex-grow: 1;
  border-radius: 5px 5px 0 0;
}
.content .left-box .model-box .model-item .item-name {
  /* width: 100px; */
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
.content .right-box .option-box .set-box .set-item {
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

.content .center-box {
  flex-grow: 1;
  flex-shrink: 1;
  overflow: hidden;
}
.content .center-box .center-inner {
  height: 100%;
  /* padding: 20px; */
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
