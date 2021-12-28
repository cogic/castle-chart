<!--
 * @Author: Cogic
 * @Date: 2021-12-24 21:14:54
 * @LastEditors: Cogic
 * @LastEditTime: 2021-12-29 00:30:33
 * @Description: 
-->
<template>
  <div id="stage">
    <div class="head">
      <span class="title">{{ tableName }}</span>
    </div>
    <div class="menubar">
      <div class="menu save" @click="saveTableData">保存</div>
      <div class="menu import" @click="importData">导入</div>
      <div class="menu export" @click="downloadFile">导出</div>
    </div>
    <div class="sheet">
      <my-table ref="table" :tableData="tableData"></my-table>
    </div>
  </div>
</template>

<script>
import MyTable from '@/components/master/tab/MyTable.vue'
import XLSX from 'xlsx'
import api from '@/api'
export default {
  activated() {
    // 在进入tab时会触发，检查是否是新打开的tab，新打开的话要重新加载一下数据，否则会因为keep-alive出现不好的事情
    this.checkNewLoad(this.$route.params.tabkey, (flag, callback) => {
      if (flag) {
        const result = api.getTable(this.$route.params.tabkey)
        if (result.success) {
          callback({ type: 'data', topic: result.fileData.name, key: result.fileData.id })
          this.tableData = result.fileData.data
        }
      }
    })
  },
  props: {
    addTab: {
      type: Function,
    },
    checkNewLoad: {
      type: Function,
    },
  },
  components: { MyTable },
  mounted() {
    const result = api.getTable(this.$route.params.tabkey)
    if (result.success) {
      this.addTab({ type: 'data', topic: result.fileData.name, key: result.fileData.id })
      this.tableName = result.fileData.name
      this.tableData = result.fileData.data
    }
  },
  data() {
    return {
      workbook: {},
      tableName: '新建数据源',
      tableData: [],
      reloadFlag: false,
    }
  },
  methods: {
    downloadFile() {
      // TODO 可以添加【导出前设置导出的文件名】功能
      const sheet = XLSX.utils.aoa_to_sheet(this.$refs.table.getTableCells())
      const newWorkbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(newWorkbook, sheet)
      XLSX.writeFile(newWorkbook, 'out.xlsx')
    },
    saveTableData() {
      // 保存 tabledata 到数据库
      api.newTable({ name: this.tableName, data: this.$refs.table.getTableCells() })
    },
    setTableData() {
      // 将 workbook 转为利于建 HTML table 的二维数组
      // NOTE 注意这里只取导入的表格的 sheets[0]
      this.tableData = XLSX.utils.sheet_to_json(this.workbook.Sheets[this.workbook.SheetNames[0]], { header: 1 })
    },
    importData() {
      // 建临时的 文件上传Input，其上传功能由“导入”按钮间接触发，因为原生的 Input 文件上传比较丑
      let tempInput = document.createElement('input')
      tempInput.type = 'file'
      tempInput.setAttribute('accept', 'text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
      tempInput.addEventListener('change', (e) => {
        // 监听文件上传，然后利用 xlsx 解析
        let rABS = true // true: readAsBinaryString ; false: readAsArrayBuffer
        let files = e.target.files,
          f = files[0]
        this.tableName = f.name.slice(0, f.name.lastIndexOf('.')) // 上传的表名
        let reader = new FileReader()
        reader.onload = (e) => {
          let data = e.target.result
          if (!rABS) data = new Uint8Array(data)
          let workbook = XLSX.read(data, { type: rABS ? 'binary' : 'array' })
          this.$data.workbook = workbook
          this.$refs.table.changeTableFlag()
          this.setTableData()
        }
        if (rABS) reader.readAsBinaryString(f)
        else reader.readAsArrayBuffer(f)
      })
      // 由“导入”按钮间接触发 Input 的点击事件
      tempInput.click()
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

.sheet {
  display: flex;
  flex-grow: 1;
  height: 100px;
  background-color: cadetblue;
}
</style>
