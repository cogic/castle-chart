<!--
 * @Author: Cogic
 * @Date: 2021-12-24 21:14:54
 * @LastEditors: Cogic
 * @LastEditTime: 2022-03-24 16:17:57
 * @Description: 
-->
<template>
  <div id="stage">
    <div class="head">
      <span class="title">{{ tableName }}</span>
    </div>
    <div class="menubar">
      <div class="menu import text-disable" @click="importData">导入</div>
      <div class="menu export text-disable" @click="downloadFile">导出</div>
      <!-- <div class="menu export" @click="">撤销</div> -->
      <!-- <div class="menu export" @click="">重做</div> -->
      <div class="menu save text-disable" @click="saveTableData(true)">保存</div>
      <div class="menu-tip">{{ saveTip }}</div>
    </div>
    <div class="sheet">
      <div class="table-box">
        <h-table ref="table" :tableData="tableData"></h-table>
      </div>
    </div>
  </div>
</template>

<script>
import HTable from '@/components/master/tab/HTable.vue'
import XSheet from '@/assets/script/x-sheet'
export default {
  activated() {
    // 在进入tab时会触发，检查是否是新打开的tab，新打开的话要重新加载一下数据，否则会因为keep-alive出现不好的事情
    this.checkNewLoad(this.$route.params.tabkey, (flag, callback) => {
      if (flag) {
        this.$API.getTable({ _id: this.$route.params.tabkey }, (message) => {
          this.tableId = this.$route.params.tabkey
          if (message.success) {
            callback({ type: 'data', topic: message.info.name, key: message.info._id })
            this.tableName = message.info.name
            this.tableData = message.info.data
          }
        })
        this.saveTip = ''
      }
    })
    this.autoSave = setInterval(() => {
      // 每1分钟自动保存一次
      this.saveTableData()
    }, 1000 * 60)
  },
  deactivated() {
    this.saveTableData()
    clearInterval(this.autoSave)
  },
  components: { HTable },
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
      tableId: '',
      tableName: '新建数据源',
      tableData: [],
      autoSave: undefined,
      saveTip: '',
    }
  },
  watch: {
    tableData(newData, oldData) {
      this.$refs.table.loadData(newData)
    },
  },
  methods: {
    downloadFile() {
      // TODO 可以添加【导出前设置导出的文件名】功能
      XSheet.downloadFile(this.$refs.table.getData(), 'out.xlsx')
    },
    saveTableData(isHand) {
      // 保存 tabledata 到数据库
      if (!this.$refs.table) return
      this.$API.saveTable({ _id: this.tableId, name: this.tableName, data: this.$refs.table.getData() }, (message) => {
        console.log(message)
        if (isHand) {
          this.saveTip = '保存成功'
        } else {
          this.saveTip = new Date().toLocaleTimeString('chinese', { hour12: false, hour: '2-digit', minute: '2-digit' }) + ' 已保存'
        }
      })
    },
    importData() {
      XSheet.importFile((tableData, tableName) => {
        // this.tableName = tableName
        this.tableData = tableData
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
  background-color: rgb(224, 166, 77);
}
.head .title {
  display: inline-block;
  margin: 0 20px;
  color: rgb(41, 41, 41);
  font-size: 20px;
  line-height: 35px;
  cursor: default;
}

.menubar {
  display: flex;
  padding: 0 10px;
  background-color: rgb(189, 81, 30);
}
.menubar .menu {
  padding: 0 15px;
  color: rgba(255, 255, 255, 0.795);
  font-size: 16px;
  line-height: 30px;
  cursor: pointer;
}
.menubar .menu:hover {
  background-color: rgba(233, 233, 233, 0.397);
}
.menubar .menu:active {
  background-color: rgba(22, 22, 22, 0.397);
}
.menubar .menu-tip {
  padding-right: 5px;
  color: rgb(141, 197, 212);
  line-height: 30px;
  font-size: 14px;
  /* background-color: rgb(218, 218, 218); */
}

.sheet {
  display: flex;
  flex-grow: 1;
  height: 100px;
  background-color: cadetblue;
}
.table-box {
  flex-grow: 1;
  width: 100px;
  background-color: rgb(255, 255, 255);
  /* overflow: scroll; */
}
</style>
