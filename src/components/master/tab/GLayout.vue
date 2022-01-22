<!--
 * @Author: Cogic
 * @Date: 2022-01-17 16:47:47
 * @LastEditors: Cogic
 * @LastEditTime: 2022-01-22 14:22:47
 * @Description: 
-->
<template>
  <grid-layout id="GridLayout" :layout.sync="layout" :auto-size="autoSize" :margin="margin" :col-num="colNum" :row-height="rowHeight" :is-draggable="draggable" :is-resizable="resizable" :vertical-compact="verticalCompact" :use-css-transforms="true">
    <grid-item v-for="(item, index) in layout" :class="{ selected: curItem.i === item.i }" @resize="resizeEvent(item)" @resized="resizeEvent(item)" @click="setCurItem($event, item)" :key="item.i" :static="item.static" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i">
      <!-- <div>edit remove</div> -->
      <div class="item-content" v-if="item.type === 'chart'"><e-chart :ref="'chart' + item.i" :data="item.config.data" :option="item.config.option"></e-chart></div>
      <div class="item-content" v-else-if="item.type === 'text'">文本</div>
      <div class="item-content" v-else-if="item.type === 'image'">图片</div>
      <div v-else>NULL</div>
      <!-- <span class="text">{{ itemTitle(item) }}</span> -->
      <span class="remove" @click="removeItem(item.i)">X</span>
    </grid-item>
  </grid-layout>
</template>

<script>
import { GridLayout, GridItem } from 'vue-grid-layout'
import EChart from '@/components/master/tab/EChart.vue'
export default {
  components: {
    GridLayout,
    GridItem,
    EChart,
  },
  data() {
    return {
      layout: [],
      back: {
        i: 'back',
        type: 'back',
        config: {},
      },
      curItem: {},
      draggable: true,
      resizable: true,
      colNum: 20,
      rowHeight: 30,
      index: 0,
      defaultW: 5,
      defaultH: 4,
      margin: [5, 5],
      autoSize: true,
      verticalCompact: true,
    }
  },
  watch: {
    curItem(newValue, oldValue) {
      this.$parent.curItemChange()
    },
  },
  methods: {
    resizeEvent(item){
      if(item.type === 'chart'){
        this.$refs['chart' + item.i][0].chartResize()
      }
    },
    setChart(data, option = {}) {
      // console.log(this.$refs['chart' + this.curItem().i])
      // eval('this.$refs.'+'chart' + this.curItem.i+'[0].setOption(data, option)')
      this.curItem.config.data = data
      this.curItem.config.option = option
      // this.$refs['chart' + this.curItem.i][0].setOption(data, option)
      this.$refs['chart' + this.curItem.i][0].chartResize()
    },
    clearChart() {
      this.$refs['chart' + this.curItem.i][0].clear()
    },
    // loadData(data) {
    //   // console.log(this.$refs)
    //   this.$refs['table' + this.curItem().i][0].loadData(data)
    // },
    setCurItem(e, item) {
      e.stopPropagation()
      this.curItem = item
    },
    itemTitle(item) {
      let result = item.i
      if (item.type === 'text') {
        result = item.config.content ? item.config.content : '这是文本'
      }
      return result
    },
    addItem(type, config) {
      let item = {
        x: (this.layout.length * this.defaultW) % this.colNum,
        y: this.layout.length + this.colNum, // puts it at the bottom
        w: this.defaultW,
        h: this.defaultH,
        i: this.index,
        type,
        config,
      }
      this.layout.push(item)
      this.curItem = item
      this.index++
      window.dispatchEvent(new Event('resize'))
    },
    removeItem(val) {
      const index = this.layout.map((item) => item.i).indexOf(val)
      this.layout.splice(index, 1)
      window.dispatchEvent(new Event('resize'))
      setTimeout(() => {
        this.curItem = this.back
      }, 0);
    },
  },
  mounted() {
    // this.index = this.layout.length
  },
}
</script>

<style>
.vue-grid-layout {
  /* background: #eee; */
}
.vue-grid-item:not(.vue-grid-placeholder) {
  background: rgb(255, 255, 255);
  /* border: 1px solid black; */
}
.vue-grid-item.selected:not(.vue-grid-placeholder) {
  outline: 2px solid rgb(68, 122, 185);
}
.vue-grid-item.vue-grid-placeholder {
  /* border: 1px solid black; */
  background: green !important;
}
</style>
<style scoped>
.remove {
  position: absolute;
  right: 2px;
  top: 0;
  cursor: pointer;
}
.item-content {
  width: 100%;
  height: 100%;
  /* background-color: bisque; */
}
</style>
