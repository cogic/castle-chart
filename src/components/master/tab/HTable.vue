<!--
 * @Author: Cogic
 * @Date: 2021-12-31 16:53:30
 * @LastEditors: Cogic
 * @LastEditTime: 2022-03-03 09:32:15
 * @Description: 
-->
<template>
  <div class="table-main" ref="tableMain"></div>
</template>

<script>
import Handsontable from 'handsontable'
import 'handsontable/dist/handsontable.full.css'
export default {
  mounted() {
    const container = this.$refs.tableMain
    const menuConfig = {
      items: {
        undo: {
          name: '撤销',
        },
        redo: {
          name: '重做',
        },
        sp1: '---------',
        cut: {
          name: '剪切',
        },
        copy: {
          name: '复制',
        },
        // paste: {
        //   name: '粘贴',
        // },
        sp2: '---------',
        row_above: {
          name: '在上方插入一行',
        },
        row_below: {
          name: '在下方插入一行',
        },
        col_left: {
          name: '在左侧插入一行',
        },
        col_right: {
          name: '在右侧插入一行',
        },
        sp3: '---------',
        remove_row: {
          name: '删除行',
        },
        remove_col: {
          name: '删除列',
        },
      },
    }
    this.hot = new Handsontable(container, {
      minRows: this.rows,
      minCols: this.cols,
      startRows: this.rows,
      startCols: this.cols,
      rowHeaders: true,
      colHeaders: true,
      minSpareRows: 1,
      minSpareCols: 1,
      contextMenu: menuConfig,
      manualRowMove: true,
      manualColumnMove: true,
      manualRowResize: true,
      manualColumnResize: true,
      width: '100%',
      height: '100%',
      licenseKey: 'non-commercial-and-evaluation',
    })
    this.addHook(this.hookFunc)
  },
  data() {
    return {
      hot: {},
    }
  },
  props: {
    rows: {
      type: Number,
      default: 28,
    },
    cols: {
      type: Number,
      default: 30,
    },
    hookFunc: {
      type: Function,
      default: function () {},
    },
    item: {
      type: String,
      default: undefined,
    },
  },
  methods: {
    transData() {
      let data = this.getData()
      let newData = []
      let maxRow = 0
      for (let i = 0; i < data.length; i++) {
        if (data[i].length > maxRow) {
          maxRow = data[i].length
        }
      }
      for (let i = 0; i < maxRow; i++) {
        let temp = []
        for (let j = 0; j < data.length; j++) {
          temp.push(data[j][i])
        }
        newData.push(temp)
      }
      this.loadData(newData)
      // return newData
    },
    render() {
      this.hot.render()
    },
    addHook(callback) {
      this.hot.addHook('afterChange', () => {
        callback(this.getData(), this.item)
      })
      this.hot.addHook('afterCreateRow', () => {
        callback(this.getData(), this.item)
      })
      this.hot.addHook('afterCreateCol', () => {
        callback(this.getData(), this.item)
      })
      this.hot.addHook('afterRemoveRow', () => {
        callback(this.getData(), this.item)
      })
      this.hot.addHook('afterRemoveCol', () => {
        callback(this.getData(), this.item)
      })
      this.hot.addHook('afterColumnMove', () => {
        callback(this.getData(), this.item)
      })
      this.hot.addHook('afterRowMove', () => {
        callback(this.getData(), this.item)
      })
    },
    loadData(data) {
      // let newData = []
      // data.forEach((el) => {
      //   newData.push(el)
      // })
      // console.log(data)
      let newData = this.cloneData(data)
      // let newData = this.getData(data)
      this.hot.loadData(newData.length < 1 ? [[]] : newData) // lodaData 的 参数不能为空数组[]，但可以为[[]]
    },
    getData(oriData) {
      // let ran = Math.random()
      // console.log(ran, oriData)

      if (!oriData) {
        oriData = this.hot.getData()
      }
      let data = this.cloneData(oriData)
      let trueRows = 0
      for (let i = data.length - 1; i >= 0; i--) {
        // console.log(ran, data)
        // console.log(ran, oriData)
        for (let j = data[i].length - 1; j >= 0; j--) {
          if (data[i][j] && data[i][j] != null && data[i][j] != 'null' && data[i][j] != '') {
            if (trueRows === 0) {
              trueRows = i + 1
            }
            data[i].length = j + 1
            data[i].splice(j + 1)
            // console.log(j + 1)
            break
          }
          if (j === 0) {
            data[i].length = 0
            data[i] = []
          }
        }
      }
      // console.log(ran, data)
      // console.log(trueRows)
      data.length = trueRows
      data.splice(trueRows)
      // console.log(ran, data)
      return this.cloneData(data)
    },
    cloneData(data) {
      let newData = []
      for (let i = 0; i < data.length; i++) {
        let temp = []
        for (let j = 0; j < data[i].length; j++) {
          temp.push(data[i][j])
        }
        newData.push(temp)
      }
      return newData
    },
  },
}
</script>

<style scoped>
@import url('~@/assets/style/h-table.css');

.table-main {
  background-color: rgb(255, 255, 255);
}
</style>
