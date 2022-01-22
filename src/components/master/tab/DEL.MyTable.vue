<!--
 * @Author: Cogic
 * @Date: 2021-12-27 00:30:04
 * @LastEditors: Cogic
 * @LastEditTime: 2021-12-31 17:07:42
 * @Description: 
-->
<template>
    <table ref="table" @keydown="changeCurrent">
      <tr v-for="r in row">
        <td :contenteditable="isContenteditable(r, c)" :class="[{ current: isCurrent(r, c) }, { index: !isContenteditable(r, c) }]" v-for="c in column" @mousedown="setCurrent(r, c)"></td>
      </tr>
    </table>
</template>

<script>
// FIXME 当导入的表过大时，对表的快速修改就会很卡，原因暂不明确
// FIXME 在导入和保存等时，并没有把表删减到最小尺寸，只是保存时删掉了靠后的无用项，靠前的没删
export default {
  data() {
    return {
      row: 25,
      column: 22,
      initRow: 25,
      initColumn: 22,
      current: [0, 0],
      tableFlag: false,
    }
  },
  props: {
    tableData: {
      type: Object,
      default: [],
    },
  },
  watch: {
    tableData(newData, oldData) {
      // 当导入数据表时触发
      // 清空一下 table，以免原有数据干扰
      this.clearTable()
      // 在数据表行或列比较大时增大 row 或 column，结果相当于数据表将默认表的尺寸撑大了
      this.row = newData.length + 1 > this.initRow ? newData.length + 1 : this.initRow
      let maxcol = 0
      newData.forEach((e) => {
        maxcol = maxcol > e.length ? maxcol : e.length
      })
      this.column = maxcol + 1 > this.initColumn ? maxcol + 1 : this.initColumn
      setTimeout(() => {
        // 加一点延迟，然后将新数据设置到表，至于要主动更新表而不是借助在 HTML 中添加 {{tablecelldata}} 的方式，是因为后者在实现时发现会频繁响应（鼠标只是点击单元格就会响应），虽然不确定是否带来性能上的影响。不知是否有更好的方式。
        this.setTable(newData)
      }, 0)
    },
    row(newRow, oldRow) {
      // 当 row 增加时触发，设置最顶上的 ABC... 的索引
      setTimeout(() => {
        for (let i = oldRow; i < newRow; i++) {
          this.setRowIndex(i + 1)
        }
      }, 0)
    },
    column(newColumn, oldColumn) {
      // 当 column 增加时触发，设置最左边的 123... 的索引
      setTimeout(() => {
        for (let i = oldColumn; i < newColumn; i++) {
          this.setColumnIndex(i + 1)
        }
      }, 0)
    },
    current(newCurrent, oldCurrent) {
      // current改变时聚焦单元格
      setTimeout(() => {
        // 加一点延迟，否则会因为未 updated 获取不到。也可以放到生命周期 updated 中。
        if (this.$refs.table.rows[newCurrent[0] - 1] && this.$refs.table.rows[newCurrent[0] - 1].cells[newCurrent[1] - 1]) {
          this.$refs.table.rows[newCurrent[0] - 1].cells[newCurrent[1] - 1].focus()
        }
      }, 0)
    },
  },
  methods: {
    clearTable() {
      // 清空 table，同时还原 current
      this.current = [0, 0]
      const rows = this.$refs.table.rows
      for (let i = 1; i < rows.length; i++) {
        for (let j = 1; j < rows[i].cells.length; j++) {
          rows[i].cells[j].innerHTML = ''
        }
      }
    },
    getTableCells() {
      // 用于传输表格的数据，供保存或导出等
      // 经过处理后的数据会根据空单元格尽可能地减少行数和列数
      const rows = this.$refs.table.rows
      let newData = []
      let rowFlag = false // 当从末行向前读取到第一行非全空的行时 true
      for (let i = rows.length - 1; i > 0; i--) {
        let cellsValue = []
        let cellFlag = false // 当从一行的末单元格向前读取到第一个非全空单元格时 true
        for (let j = rows[i].cells.length - 1; j > 0; j--) {
          if (rows[i].cells[j].innerText.trim() === '' && !cellFlag) {
            continue
          }
          cellFlag = true
          rowFlag = true
          cellsValue.unshift(rows[i].cells[j].innerText)
        }
        if (rowFlag) {
          newData.unshift(cellsValue)
        }
      }
      return newData
    },
    setTable(newData) {
      // 设置数据到表
      for (let i = 0; i < newData.length; i++) {
        for (let j = 0; j < newData[i].length; j++) {
          this.$refs.table.rows[i + 1].cells[j + 1].innerHTML = newData[i][j]
        }
      }
    },
    isContenteditable(r, c) {
      // 决定单元格是否可编辑，首行和首列作为索引不可编辑
      if (r === 1 || c === 1) {
        return false
      } else {
        return true
      }
    },
    setCurrent(r, c) {
      // 设置当前单元格 current
      if (r > 1 && c > 1) {
        this.current = [r, c]
      }
    },
    isCurrent(r, c) {
      // 判断 [r,c] 是否是当前单元格
      if (this.current[0] === r && this.current[1] === c) {
        return true
      } else {
        return false
      }
    },
    changeCurrent(e) {
      // 上下左右键或 Enter、Tab 键用于改变当前单元格 current
      let r = this.current[0]
      let c = this.current[1]
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        if (r > 2) {
          r--
        }
      } else if (e.key === 'ArrowDown' || e.key === 'Enter') {
        e.preventDefault()
        r++
        if (r === this.row + 1) {
          this.row++
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        if (c > 2) {
          c--
        }
      } else if (e.key === 'ArrowRight' || e.key === 'Tab') {
        e.preventDefault()
        c++
        if (c === this.column + 1) {
          this.column++
        }
      }
      this.setCurrent(r, c)
    },
    setIndex(row, column) {
      // 设置首行首列索引
      this.setRowIndex(row)
      this.setColumnIndex(column)
    },
    setRowIndex(row) {
      // 设置首列索引
      this.$refs.table.rows[row - 1].cells[0].innerHTML = row - 1
    },
    setColumnIndex(column) {
      // 设置首行索引
      // 算法目的是实现首行索引显示为 A B C ... AA AB AC ... AAA AAB AAC ... ，这是一个类似26进制的序列
      let alphabetIndex = (column - 2).toString(26)
      let code = ''
      for (let i = 0; i < alphabetIndex.length; i++) {
        if (i === 0 && alphabetIndex.length > 1) {
          code += String.fromCharCode(64 + Number.parseInt(alphabetIndex[i], 26))
        } else {
          code += String.fromCharCode(65 + Number.parseInt(alphabetIndex[i], 26))
        }
      }
      this.$refs.table.rows[0].cells[column - 1].innerHTML = code
    },
  },
  mounted() {
    // mount 后设置首行首列的索引
    for (let i = 1; i < this.row; i++) {
      this.setRowIndex(i + 1)
    }
    for (let i = 1; i < this.column; i++) {
      this.setColumnIndex(i + 1)
    }
  },
}
</script>

<style scoped>
table {
  border: 1px solid rgb(230, 230, 230);
  border-spacing: 0px;
}
table td {
  min-width: 70px;
  padding: 0 2px;
  color: rgb(75, 75, 75);
  font-size: 16px;
  border: 1px solid rgb(230, 230, 230);
  white-space: nowrap;
}
table td:hover {
  background-color: rgb(246, 246, 246);
}
table tr:first-child {
  position: sticky;
  top: 0;
}
table td.index {
  padding: 0 5px;
  text-align: center;
  background-color: rgb(212, 201, 187);
  cursor: default;
}
table tr td:first-child {
  position: sticky;
  left: 0;
  min-width: auto;
  z-index: 1;
}
table tr:first-child td:first-child {
  position: unset;
  background-color: rgb(150, 120, 120);
}

table td:focus {
  outline: none;
}
table td.current {
  border: 1px solid rgb(0, 140, 255);
  outline: 1px solid rgb(0, 140, 255);
}
table td.select {
  background-color: azure;
}
</style>
