/**
 * @Author: Cogic
 * @Date: 2022-01-01 15:27:47
 * @LastEditors: Cogic
 * @LastEditTime: 2022-01-01 15:54:54
 * @Description:
 */
import XLSX from 'xlsx'

function importFile(callback) {
  // TODO 此处的导入功能是直接复制官方样例后修改的，具体的一些细节没有深究，后续需要再处理一下
  // 建临时的 文件上传Input，其上传功能由自定义的“导入”按钮间接触发，因为原生的 Input 文件上传比较丑
  let tempInput = document.createElement('input')
  tempInput.type = 'file'
  tempInput.setAttribute('accept', 'text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  tempInput.addEventListener('change', (e) => {
    // 监听文件上传，然后利用 xlsx 解析
    let rABS = true // true: readAsBinaryString ; false: readAsArrayBuffer
    let files = e.target.files,
      f = files[0]
    let tableName = f.name.slice(0, f.name.lastIndexOf('.')) // 上传的表名
    let reader = new FileReader()
    reader.onload = (e) => {
      let data = e.target.result
      if (!rABS) data = new Uint8Array(data)
      let workbook = XLSX.read(data, { type: rABS ? 'binary' : 'array' })
      let tableData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1 }) // 将 workbook 转为二维数组,注意这里只取导入的表格的 sheets[0]
      callback(tableData, tableName)
    }
    if (rABS) reader.readAsBinaryString(f)
    else reader.readAsArrayBuffer(f)
  })
  // 由自定义的“导入”按钮间接触发 Input 的点击事件
  tempInput.click()
}

function downloadFile(tableData, outName = 'out.xlsx') {
  const sheet = XLSX.utils.aoa_to_sheet(tableData)
  const newWorkbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(newWorkbook, sheet)
  XLSX.writeFile(newWorkbook, outName)
}

export default { importFile, downloadFile }
