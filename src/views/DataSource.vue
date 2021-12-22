<!--
 * @Author: Cogic
 * @Date: 2021-12-21 16:48:31
 * @LastEditors: Cogic
 * @LastEditTime: 2021-12-22 10:50:44
 * @Description: 
 * @FilePath: \castle-chart\src\views\DataSource.vue
-->
<template>
  <div id="stage">
    <div>
      <label>上传本地数据:</label>
      <input type="file" @change="handleFile" ref="fileInput" />
    </div>
    <div>
      <label>数据预览:</label>
      <h5>{{ fileName }}</h5>
      <table class="file-table">
        <tr v-for="line in table.data">
          <td v-for="cell in line">{{ cell }}</td>
        </tr>
      </table>
      <div>
        <label>重命名:</label>
        <input type="text" ref="renameInput" />
        <button @click="storeTable">保存</button>
        <button @click="download">下载</button>
      </div>
    </div>
  </div>
</template>

<script>
import XLSX from 'xlsx'
import network from '@/network'
export default {
  data() {
    return {
      fileName: '',
      workbook: {},
      table: {
        name: '',
        data: [],
      },
    }
  },
  methods: {
    storeTable() {
      this.table.name = this.$refs.renameInput.value
      // network.post('/user/login',{})
      network.post('/user/login', {
        data: {
          username: 'haha',
        },
      }).then((res)=>{
        console.log(res);
      })
    },
    download() {
      XLSX.writeFile(this.workbook, 'out.xlsx')
    },
    showTable() {
      this.table.data = XLSX.utils.sheet_to_json(this.workbook.Sheets[this.workbook.SheetNames[0]], { header: 1 })
      console.log(this.table.data)
    },
    handleFile(e) {
      // TODO 添加功能：当检测到上传的表格有多 sheet 时，要求用户选择其一（这样比较简单一点，包括自己的编写以及用户的使用）
      let rABS = true // true: readAsBinaryString ; false: readAsArrayBuffer
      let files = e.target.files,
        f = files[0]
      let reader = new FileReader()
      reader.onload = (e) => {
        let data = e.target.result
        if (!rABS) data = new Uint8Array(data)
        let workbook = XLSX.read(data, { type: rABS ? 'binary' : 'array' })
        /* DO SOMETHING WITH workbook HERE */
        this.$data.workbook = workbook
        console.log(workbook)
        this.showTable()
        this.fileName = this.$refs.fileInput.files[0].name
        this.$refs.renameInput.value = this.$refs.fileInput.files[0].name
      }
      if (rABS) reader.readAsBinaryString(f)
      else reader.readAsArrayBuffer(f)
    },
  },
}
</script>

<style scoped>
#stage {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgb(255, 255, 255);
  overflow: scroll;
}
.file-table {
  border-collapse: collapse;
  background-color: rgb(250, 244, 234);
}
.file-table td {
  padding: 5px 10px;
  font-size: 14px;
  border: solid;
}
</style>
