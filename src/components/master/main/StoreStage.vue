<!--
 * @Author: Cogic
 * @Date: 2021-12-23 16:15:53
 * @LastEditors: Cogic
 * @LastEditTime: 2022-01-25 04:33:01
 * @Description: 
-->
<template>
  <div id="stage" @click="endRename">
    <div class="title" :style="titleStyle">{{ stageConfig.title }}</div>
    <div class="toolbar">
      <div class="tool build" v-if="toolShow('build')" @click="$emit('newTab', buildTabConfig)">新建</div>
      <div class="tool rename" v-if="toolShow('rename')" @click="rename">重命名</div>
      <div class="tool copy" v-if="toolShow('copy')">复制</div>
      <div class="tool delete" v-if="toolShow('delete')" @click="deleteFile">删除</div>
      <div class="tool sort" v-if="toolShow('sort')">排序</div>
      <div class="tool view" v-if="toolShow('view')">视图</div>
    </div>
    <div class="store">
      <div :class="{ file: true, selected: selectedFile._id === file._id }" v-for="file in stageConfig.files" :key="file._id" @click="selectedFile = file" @dblclick="$emit('newTab', fileTabConfig(file))">
        <div class="fileview">
          <img src="@/assets/image/表格.png" alt="" v-show="stageConfig.type === 'data'"/>
          <img src="@/assets/image/图表.png" alt=""  v-show="stageConfig.type === 'chart'"/>
          <img src="@/assets/image/仪表板.png" alt=""  v-show="stageConfig.type === 'panel'"/>
        </div>
        <div class="filename" @dblclick.stop.prevent="rename"><input v-model="file.name" readonly :id="file._id" /></div>
      </div>
    </div>
  </div>
</template>

<script>
import API from '@/api'
export default {
  directives() {
    this.selectedFile = {}
  },
  data() {
    return {
      selectedFile: {},
    }
  },
  watch: {
    selectedFile(newV, oldV) {
      if (oldV._id && document.getElementById(oldV._id).readOnly === false) {
        document.getElementById(oldV._id).readOnly = true
        document.getElementById(oldV._id).className = ''
        if (this.stageConfig.type === 'data') {
          API.saveTable({ _id: oldV._id, name: document.getElementById(oldV._id).value }, (message) => {
            console.log(message)
          })
        } else if (this.stageConfig.type === 'chart') {
          API.saveChart({ _id: oldV._id, name: document.getElementById(oldV._id).value }, (message) => {
            console.log(message)
          })
        } else if (this.stageConfig.type === 'panel') {
          API.savePanel({ _id: oldV._id, name: document.getElementById(oldV._id).value }, (message) => {
            console.log(message)
          })
        }
      }
    },
  },
  computed: {
    titleStyle() {
      if (this.stageConfig.style && this.stageConfig.style.title) {
        return this.stageConfig.style.title
      }
    },
  },
  props: {
    stageConfig: {
      type: Object,
      default: {},
    },
  },
  methods: {
    test() {},
    endRename(e) {
      if (!this.selectedFile._id || document.getElementById(this.selectedFile._id).readOnly === true) return
      if (e.target != document.getElementById(this.selectedFile._id)) {
        document.getElementById(this.selectedFile._id).readOnly = true
        document.getElementById(this.selectedFile._id).className = ''
        if (this.stageConfig.type === 'data') {
          API.saveTable({ _id: this.selectedFile._id, name: document.getElementById(this.selectedFile._id).value }, (message) => {
            console.log(message)
          })
        } else if (this.stageConfig.type === 'chart') {
          API.saveChart({ _id: this.selectedFile._id, name: document.getElementById(this.selectedFile._id).value }, (message) => {
            console.log(message)
          })
        } else if (this.stageConfig.type === 'panel') {
          API.savePanel({ _id: this.selectedFile._id, name: document.getElementById(this.selectedFile._id).value }, (message) => {
            console.log(message)
          })
        }
      }
    },
    rename() {
      setTimeout(() => {
        document.getElementById(this.selectedFile._id).focus()
        document.getElementById(this.selectedFile._id).readOnly = false
        document.getElementById(this.selectedFile._id).className = 'editing'
      }, 0)
    },
    deleteFile() {
      if (this.stageConfig.type === 'data' && this.selectedFile._id) {
        API.deleteTable({ _id: this.selectedFile._id }, (message) => {
          console.log(message)
          this.selectedFile = {}
          API.getTableList((message) => {
            if (message.success) {
              this.$parent.stageConfig.files = message.info
            }
          })
        })
      } else if (this.stageConfig.type === 'chart' && this.selectedFile._id) {
        API.deleteChart({ _id: this.selectedFile._id }, (message) => {
          console.log(message)
          this.selectedFile = {}
          API.getChartList((message) => {
            if (message.success) {
              this.$parent.stageConfig.files = message.info
            }
          })
        })
      } else if (this.stageConfig.type === 'panel' && this.selectedFile._id) {
        API.deletePanel({ _id: this.selectedFile._id }, (message) => {
          console.log(message)
          this.selectedFile = {}
          API.getPanelList((message) => {
            if (message.success) {
              this.$parent.stageConfig.files = message.info
            }
          })
        })
      }
    },
    buildTabConfig(callback) {
      if (this.stageConfig.type === 'data') {
        let defaultTable = {
          name: '新建数据源',
          data: [],
        }
        API.newTable(defaultTable, (message) => {
          if (message.success) {
            callback({
              type: this.stageConfig.type,
              topic: defaultTable.name,
              key: message.info,
            })
            API.getTableList((message) => {
              if (message.success) {
                this.$parent.stageConfig.files = message.info
              }
            })
          }
        })
      } else if (this.stageConfig.type === 'chart') {
        let defaultChart = {
          name: '新建图表',
          data: [],
          option: {},
        }
        API.newChart(defaultChart, (message) => {
          if (message.success) {
            callback({
              type: this.stageConfig.type,
              topic: defaultChart.name,
              key: message.info,
            })
            API.getChartList((message) => {
              if (message.success) {
                this.$parent.stageConfig.files = message.info
              }
            })
          }
        })
      } else if (this.stageConfig.type === 'panel') {
        let defaultPanel = {
          name: '新建仪表板',
          layout: [],
          back: {
            i: 'back',
            type: 'back',
            config: {
              backgroundColor: '#eaeaea',
              itemMargin: 5,
            },
          },
        }
        API.newPanel(defaultPanel, (message) => {
          if (message.success) {
            callback({
              type: this.stageConfig.type,
              topic: defaultPanel.name,
              key: message.info,
            })
            API.getPanelList((message) => {
              if (message.success) {
                this.$parent.stageConfig.files = message.info
              }
            })
          }
        })
      }
    },
    fileTabConfig(file) {
      return {
        type: this.stageConfig.type,
        topic: file.name,
        key: file._id,
      }
    },
    toolShow(name) {
      if (this.stageConfig && this.stageConfig.tools && this.stageConfig.tools[name]) {
        return this.stageConfig.tools[name].show
      } else {
        return true
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
.title {
  padding-left: 40px;
  color: rgb(97, 97, 97);
  font-size: 22px;
  line-height: 40px;
  background-color: rgb(230, 213, 201);
  border-radius: 7px 0 0 0;
}

.toolbar {
  display: flex;
  background-color: rgb(255, 255, 255);
}
.toolbar .tool {
  margin: 5px;
  padding: 0 10px;
  color: rgb(71, 71, 71);
  font-size: 16px;
  line-height: 30px;
  background-color: rgb(216, 216, 216);
  border-radius: 5px;
  cursor: pointer;
}
.toolbar .tool:hover {
  background-color: rgb(175, 175, 175);
}

.store {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;

  flex-grow: 1;
  height: 100px;
  background-color: rgb(240, 237, 233);
  border-radius: 0 0 0 7px;
  overflow-y: scroll;
}
.store .file {
  display: flex;
  flex-direction: column;

  width: 100px;
  height: 100px;
  margin: 5px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px -8px #000000;
  cursor: pointer;
}
.store .file.selected {
  outline: 2px solid rgb(89, 105, 163);
}
.store .file:hover {
  box-shadow: 0px 0px 10px -5px #000000;
}
.store .file .fileview {
  flex-grow: 1;
  text-align: center;
  background-color: rgb(243, 243, 243);
  border-radius: 10px 10px 0 0;
}
.store .file .fileview img {
  width: 50px;
  height: 50px;
  margin-top: 10px;
}
.store .file .filename {
  /* padding: 0 5px; */
  /* color: rgb(34, 34, 34); */
  /* font-size: 18px; */
  /* text-align: center; */
  /* line-height: 30px; */
  border-radius: 0 0 10px 10px;
  /* text-overflow: ellipsis;
  overflow: hidden;
  word-break: keep-all; */
}
.store .file .filename input {
  width: 100%;
  padding: 0 10px;
  color: rgb(34, 34, 34);
  font-size: 14px;
  line-height: 24px;
  background-color: rgb(198, 207, 218);
  border-radius: 0 0 10px 10px;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: keep-all;
}
.store .file .filename input.editing {
  background-color: rgb(255, 255, 255);
}
</style>
