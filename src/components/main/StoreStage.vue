<template>
  <pop-box ref="PopBox" :trueFunc="trueFunc" :info="info" v-if="toShow" :isExitShow="isExitShow" />
  <div id="stage" @mousedown="endRename">
    <div class="title" :style="titleStyle">{{ stageConfig.title }}</div>
    <div class="toolbar">
      <div :class="{ 'text-disable': true, tool: true, able: true }" v-if="toolShow('build')" @click.prevent="$emit('newTab', buildTabConfig)">新建</div>
      <div :class="{ 'text-disable': true, tool: true, able: selectedFile && selectedFile._id }" v-if="toolShow('edit')" @click.prevent="edit">打开</div>
      <div :class="{ 'text-disable': true, tool: true, able: selectedFile && selectedFile._id }" v-if="toolShow('rename')" @click.prevent="rename">重命名</div>
      <!-- <div class="tool copy" v-if="toolShow('copy')">复制</div> -->
      <div :class="{ 'text-disable': true, tool: true, able: selectedFile && selectedFile._id }" v-if="toolShow('delete')" @click.prevent="toDelete">删除</div>
      <!-- <div class="tool sort" v-if="toolShow('sort')">排序</div> -->
      <div :class="{ 'text-disable': true, tool: true, able: true }" @click="isImageView = !isImageView" v-if="toolShow('view')">切换视图</div>
      <div :class="{ 'text-disable': true, tool: true, able: true }" @click="flush">刷新</div>
    </div>
    <div :class="{ store: true, store2: !isImageView }">
      <div v-for="file in stageConfig.files" @click="selectedFile = file" @dblclick.stop.prevent="$emit('newTab', fileTabConfig(file))">
        <div :class="{ file: isImageView, file2: !isImageView, selected: selectedFile && selectedFile._id === file._id }" v-if="isDeleteId !== file._id">
          <div class="fileview">
            <img :src="file.imgSrc" alt="img" @error.once="onerror($event, stageConfig.type)" />
          </div>
          <div class="filename" @dblclick.stop.prevent="rename">
            <input v-model="file.name" readonly :id="file._id" maxlength="30" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PopBox from '@/components/general/PopBox.vue'
export default {
  components: { PopBox },
  props: {
    stageConfig: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      selectedFile: undefined,
      isDeleteId: '',
      isImageView: true,
      toShow: false,
      info: '',
      isExitShow: true,
      trueFunc: undefined,
    }
  },
  computed: {
    titleStyle() {
      if (this.stageConfig.style && this.stageConfig.style.title) {
        return this.stageConfig.style.title
      }
    },
  },
  watch: {
    selectedFile(newV, oldV) {
      if (oldV && oldV._id && document.getElementById(oldV._id) && document.getElementById(oldV._id).readOnly === false) {
        document.getElementById(oldV._id).readOnly = true
        document.getElementById(oldV._id).className = ''
        if (this.stageConfig.type === 'data') {
          this.$API.saveTable({ _id: oldV._id, name: document.getElementById(oldV._id).value }, (message) => {
            console.log(message)
          })
        } else if (this.stageConfig.type === 'chart') {
          this.$API.saveChart({ _id: oldV._id, name: document.getElementById(oldV._id).value }, (message) => {
            console.log(message)
          })
        } else if (this.stageConfig.type === 'panel') {
          this.$API.savePanel({ _id: oldV._id, name: document.getElementById(oldV._id).value }, (message) => {
            console.log(message)
          })
        }
      }
    },
  },
  activated() {
    this.selectedFile = {}
  },
  methods: {
    flush() {
      this.$parent.stageConfig.files = []
      if (this.stageConfig.type === 'data') {
        this.$API.getTableList((message) => {
          if (message.success) {
            this.$parent.stageConfig.files = message.info
          }
        })
      } else if (this.stageConfig.type === 'chart') {
        this.$API.getChartList((message) => {
          if (message.success) {
            this.$parent.stageConfig.files = message.info
          }
        })
      } else if (this.stageConfig.type === 'panel') {
        this.$API.getPanelList((message) => {
          if (message.success) {
            this.$parent.stageConfig.files = message.info
          }
        })
      }
    },
    onerror(e, type) {
      if (type === 'data') {
        e.path[0].setAttribute('src', require('@/assets/image/project-store/表格.png'))
      } else if (type === 'chart') {
        e.path[0].setAttribute('src', require('@/assets/image/project-store/图表.png'))
      } else if (type === 'panel') {
        e.path[0].setAttribute('src', require('@/assets/image/project-store/仪表板.png'))
      }
    },
    // setChartImg(e, fileId) {
    //   API.getChartImg({ _id: fileId, path: 'http://localhost:8080/preview-clean/chart/' }, (message) => {
    //     e.path[0].setAttribute('src', message.info.path)
    //   })
    // },
    endRename(e) {
      if (!this.selectedFile || !this.selectedFile._id || !document.getElementById(this.selectedFile._id) || document.getElementById(this.selectedFile._id).readOnly === true) return
      if (e.target != document.getElementById(this.selectedFile._id)) {
        document.getElementById(this.selectedFile._id).readOnly = true
        document.getElementById(this.selectedFile._id).className = ''
        if (this.stageConfig.type === 'data') {
          this.$API.saveTable({ _id: this.selectedFile._id, name: document.getElementById(this.selectedFile._id).value }, (message) => {
            console.log(message)
          })
        } else if (this.stageConfig.type === 'chart') {
          this.$API.saveChart({ _id: this.selectedFile._id, name: document.getElementById(this.selectedFile._id).value }, (message) => {
            console.log(message)
          })
        } else if (this.stageConfig.type === 'panel') {
          this.$API.savePanel({ _id: this.selectedFile._id, name: document.getElementById(this.selectedFile._id).value }, (message) => {
            console.log(message)
          })
        }
      }
    },
    edit() {
      if (this.selectedFile._id) {
        this.$emit('newTab', this.fileTabConfig(this.selectedFile))
      }
    },
    rename() {
      if (!this.selectedFile._id) return
      if (this.$store.state.tabMap && this.$store.state.tabMap.has(this.selectedFile._id)) {
        this.toShow = true
        this.info = '无法重命名已打开的项目.'
        this.isExitShow = false
        this.trueFunc = undefined
        return
      }
      setTimeout(() => {
        document.getElementById(this.selectedFile._id).select()
        document.getElementById(this.selectedFile._id).readOnly = false
        document.getElementById(this.selectedFile._id).className = 'editing'
      }, 0)
    },
    toDelete() {
      if (!this.selectedFile._id) return
      if (this.$store.state.tabMap && this.$store.state.tabMap.has(this.selectedFile._id)) {
        this.toShow = true
        this.info = '无法删除已打开的项目。'
        this.isExitShow = false
        this.trueFunc = undefined
        return
      }
      this.toShow = true
      this.info = '确定要删除该项目吗?'
      this.isExitShow = true
      this.trueFunc = this.deleteFile
    },
    deleteFile() {
      this.isDeleteId = this.selectedFile._id
      if (this.stageConfig.type === 'data' && this.selectedFile._id) {
        this.$API.deleteTable({ _id: this.selectedFile._id }, (message) => {
          console.log(message)
          this.selectedFile = {}
          this.$API.getTableList((message) => {
            if (message.success) {
              this.$parent.stageConfig.files = message.info
            }
          })
        })
      } else if (this.stageConfig.type === 'chart' && this.selectedFile._id) {
        this.$API.deleteChart({ _id: this.selectedFile._id }, (message) => {
          console.log(message)
          this.selectedFile = {}
          this.$API.getChartList((message) => {
            if (message.success) {
              this.$parent.stageConfig.files = message.info
            }
          })
        })
      } else if (this.stageConfig.type === 'panel' && this.selectedFile._id) {
        this.$API.deletePanel({ _id: this.selectedFile._id }, (message) => {
          console.log(message)
          this.selectedFile = {}
          this.$API.getPanelList((message) => {
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
          imgSrc: '@/assets/image/表格.png',
        }
        this.$API.newTable(defaultTable, (message) => {
          if (message.success) {
            callback({
              type: this.stageConfig.type,
              topic: defaultTable.name,
              key: message.info,
            })
            this.$API.getTableList((message) => {
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
          imgSrc: '@/assets/image/图表.png',
        }
        this.$API.newChart(defaultChart, (message) => {
          if (message.success) {
            callback({
              type: this.stageConfig.type,
              topic: defaultChart.name,
              key: message.info,
            })
            this.$API.getChartList((message) => {
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
          imgSrc: '@/assets/image/仪表板.png',
        }
        this.$API.newPanel(defaultPanel, (message) => {
          if (message.success) {
            callback({
              type: this.stageConfig.type,
              topic: defaultPanel.name,
              key: message.info,
            })
            this.$API.getPanelList((message) => {
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
  cursor: default;
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  background-color: rgb(255, 255, 255);
}
.toolbar .tool {
  margin: 5px;
  padding: 0 10px;
  color: rgb(187, 187, 187);
  font-size: 16px;
  line-height: 30px;
  background-color: rgb(167, 167, 167);
  border-radius: 5px;
  cursor: default;
}
.toolbar .tool.able {
  color: rgb(71, 71, 71);
  background-color: rgb(216, 216, 216);
  cursor: pointer;
}
.toolbar .tool.able:hover {
  background-color: rgb(175, 175, 175);
}
.toolbar .tool.able:active {
  background-color: rgb(119, 119, 119);
}

.store {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;

  flex-grow: 1;
  height: 100px;
  background-color: rgb(240, 237, 233);
  border-radius: 0 0 0 7px;
  overflow-y: auto;
}
.store.store2 {
  flex-direction: column;
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
.store .file:active {
  box-shadow: 0px 0px 20px -5px #62a3bd;
}
.store .file .fileview {
  flex-grow: 1;
  text-align: center;
  background-color: rgb(243, 243, 243);
  border-radius: 10px 10px 0 0;
  overflow: hidden;
}
.store .file .fileview img {
  max-width: 100px;
  min-height: 70px;
}
.store .file .filename {
  border-radius: 0 0 10px 10px;
}
.store .file .filename input {
  width: 100%;
  padding: 0 10px;
  color: rgb(34, 34, 34);
  font-size: 14px;
  line-height: 30px;
  background-color: rgb(198, 207, 218);
  border-radius: 0 0 10px 10px;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: keep-all;
}
.store .file .filename input.editing {
  background-color: rgb(255, 255, 255);
}

.store .file2 {
  display: flex;
  height: 40px;
  margin: 5px;
  border-radius: 6px;
  box-shadow: 0px 0px 10px -8px #000000;
  cursor: pointer;
}
.store .file2.selected {
  outline: 2px solid rgb(89, 105, 163);
}
.store .file2:hover {
  box-shadow: 0px 0px 10px -5px #000000;
}
.store .file2:active {
  box-shadow: 0px 0px 20px -5px #62a3bd;
}
.store .file2 .fileview {
  width: 60px;
  height: 40px;
  background-color: rgb(238, 238, 238);
  border-radius: 6px 0 0 6px;
  overflow: hidden;
}
.store .file2 .fileview img {
  width: 60px;
}
.store .file2 .filename {
  border-radius: 0 6px 6px 0;
}
.store .file2 .filename input {
  width: 100%;
  padding: 0 10px;
  color: rgb(34, 34, 34);
  font-size: 14px;
  line-height: 40px;
  background-color: rgb(198, 207, 218);
  border-radius: 0 6px 6px 0;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: keep-all;
}
.store2 .file2 .filename input.editing {
  background-color: rgb(255, 255, 255);
}
</style>
