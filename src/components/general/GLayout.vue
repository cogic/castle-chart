<template>
  <div id="layout-box" ref="layoutBox">
    <grid-layout id="GridLayout" :layout.sync="layout" :auto-size="autoSize" :margin="margin" :col-num="colNum" :row-height="rowHeight" :is-draggable="isDraggable" :is-resizable="isResizable" :vertical-compact="verticalCompact" :use-css-transforms="true">
      <grid-item
        v-for="(item, index) in layout"
        :class="{ selected: curItem.i === item.i && isSelectable }"
        @resize="resizeEvent(item)"
        @resized="resizeEvent(item)"
        @container-resized="resizeEvent(item)"
        @mousedown="setCurItem($event, item)"
        @click="setCurItem($event, item)"
        :key="item.i"
        :static="item.static"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        drag-ignore-from=".no-drag"
      >
        <div class="item-content" v-if="item.type === 'chart'"><e-chart :ref="'chart' + item.i" :data="item.config.data" :option="item.config.option"></e-chart></div>
        <div class="item-content text" v-else-if="item.type === 'text'" :id="'textParent' + item.i"><h1 :id="'text' + item.i"></h1></div>
        <div class="item-content" v-else-if="item.type === 'image'">图片</div>
        <div v-else>NULL</div>
        <span class="remove no-drag text-disable" v-show="isRemovable" @click.stop="removeItem($event, item.i)" @mousedown.stop=""><span class="iconfont">&#xe673;</span></span>
      </grid-item>
    </grid-layout>
  </div>
</template>

<script>
import { GridLayout, GridItem } from 'vue-grid-layout'
import EChart from '@/components/general/EChart.vue'
export default {
  components: {
    GridLayout,
    GridItem,
    EChart,
  },
  props: {
    isResizable: {
      type: Boolean,
      default: true,
    },
    isDraggable: {
      type: Boolean,
      default: true,
    },
    isRemovable: {
      type: Boolean,
      default: true,
    },
    isSelectable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      layout: [],
      back: {
        i: 'back',
        type: 'back',
        config: {
          backgroundColor: '',
        },
      },
      curItem: {},
      // draggable: true,
      // resizable: true,
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
    back: {
      handler(newValue) {
        this.$refs.layoutBox.style.backgroundColor = newValue.config.backgroundColor
      },
      deep: true,
    },
  },
  methods: {
    clearLayout() {
      this.setLayout([])
    },
    setTextItem(item) {
      document.getElementById('text' + item.i).innerHTML = item.config.content
      document.getElementById('text' + item.i).style.fontFamily = item.config.fontFamily
      document.getElementById('text' + item.i).style.fontSize = item.config.fontSize + 'px'
      document.getElementById('text' + item.i).style.fontWeight = item.config.fontWeight
      document.getElementById('text' + item.i).style.color = item.config.color
      document.getElementById('textParent' + item.i).style.backgroundColor = item.config.backgroundColor
    },
    setLayout(layoutData) {
      this.layout = []
      layoutData.forEach((el) => {
        // this.addItem(el.type, el.config)
        this.layout.push(el)
        this.curItem = el
        if (el.type === 'chart') {
          setTimeout(() => {
            this.$parent.loadData(el.config.data, el)
            window.addEventListener('resize', this.$refs['chart' + el.i][0].chartResize)
            window.dispatchEvent(new Event('resize'))
          }, 0)
        } else if (el.type === 'text') {
          setTimeout(() => {
            this.setTextItem(el)
          }, 0)
        }
        this.index++
      })
      this.curItem = this.back
    },
    resizeEvent(item) {
      if (item.type === 'chart') {
        setTimeout(() => {
          this.$refs['chart' + item.i][0].chartResize()
        }, 0)
        // setTimeout(() => {
        //   this.$refs['chart' + item.i][0].chartResize()
        // }, 10)
      }
    },
    setChart(data, option, item) {
      if (!item) {
        if (data) {
          this.curItem.config.data = data
        }
        if (option) {
          this.curItem.config.option = option
        }
      } else {
        if (data) {
          item.config.data = data
        }
        if (option) {
          item.config.option = option
        }
      }
      // this.$refs['chart' + this.curItem.i][0].chartResize()
    },
    clearChart() {
      this.$refs['chart' + this.curItem.i][0].clear()
    },
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
      if (item.type === 'text') {
        setTimeout(() => {
          this.setTextItem(item)
        }, 0)
      }
      // console.log('11111' + new Date().toLocaleTimeString())
      return item
    },
    removeItem(e, val) {
      const index = this.layout.map((item) => item.i).indexOf(val)
      this.layout.splice(index, 1)
      window.dispatchEvent(new Event('resize'))
      setTimeout(() => {
        this.curItem = this.back
      }, 0)
    },
    // getItemById(id){
    //   for (const key in this.layout) {
    //     if (Object.hasOwnProperty.call(this.layout, key)) {
    //       const item = this.layout[key];
    //       if(item.i === id) {
    //         return item
    //       }
    //     }
    //   }
    // }
  },
}
</script>

<style>
.vue-grid-item:not(.vue-grid-placeholder) {
  background: rgb(255, 255, 255);
  /* border: 1px solid black; */
}
.vue-grid-item.selected:not(.vue-grid-placeholder) {
  outline: 2px solid rgb(68, 122, 185);
}
.vue-grid-item.vue-grid-placeholder {
  /* border: 1px solid black; */
  background: rgb(0, 0, 0) !important;
}
.vue-resizable-handle {
  display: none;
}
.vue-grid-item:hover .vue-resizable-handle {
  display: block;
}
</style>
<style scoped>
#layout-box {
  min-width: 100%;
  min-height: 100%;
}
.remove {
  display: none;
  position: absolute;
  right: 2px;
  top: 2px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  /* background-color: antiquewhite; */
}
.vue-grid-item:hover .remove {
  display: block;
}
.remove:hover span {
  color: rgb(193, 61, 61);
}
.remove span {
  float: right;
  color: rgb(159, 159, 159);
  font-size: 14px;
}
.item-content {
  width: 100%;
  height: 100%;
  /* background-color: bisque; */
}
.item-content.text {
  display: flex;
  align-items: center;
  /* background-color: antiquewhite; */
  overflow: hidden;
  vertical-align: middle;
}
.item-content.text h1 {
  flex-grow: 1;
  /* display: inline-block; */
  text-align: center;
}
</style>
