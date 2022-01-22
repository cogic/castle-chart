<!--
 * @Author: Cogic
 * @Date: 2021-12-31 16:53:30
 * @LastEditors: Cogic
 * @LastEditTime: 2022-01-22 14:48:04
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
  },
  methods: {
    render() {
      this.hot.render()
    },
    addHook(callback) {
      this.hot.addHook('afterChange', () => {
        callback(this.getData())
      })
      this.hot.addHook('afterCreateRow', () => {
        callback(this.getData())
      })
      this.hot.addHook('afterCreateCol', () => {
        callback(this.getData())
      })
      this.hot.addHook('afterRemoveRow', () => {
        callback(this.getData())
      })
      this.hot.addHook('afterRemoveCol', () => {
        callback(this.getData())
      })
      this.hot.addHook('afterColumnMove', () => {
        callback(this.getData())
      })
      this.hot.addHook('afterRowMove', () => {
        callback(this.getData())
      })
    },
    loadData(data) {
      const newData = JSON.parse(JSON.stringify(data))
      this.hot.loadData(newData.length < 1 ? [[]] : newData) // lodaData 的 参数不能为空数组[]，但可以为[[]]
    },
    getData() {
      const data = this.hot.getData()
      let trueRows = 0
      for (let i = data.length - 1; i >= 0; i--) {
        for (let j = data[i].length - 1; j >= 0; j--) {
          if (data[i][j] != null && data[i][j] != '') {
            if (trueRows === 0) {
              trueRows = i + 1
            }
            data[i].length = j + 1
            break
          }
          if (j === 0) {
            data[i].length = 0
          }
        }
      }
      data.length = trueRows
      return data
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
