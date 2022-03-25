<template>
  <hot-table class="table-main" ref="hotTableComponent" :settings="hotSettings"></hot-table>
</template>

<script>
import XSheet from '@/assets/script/x-sheet'
import { HotTable } from '@handsontable/vue3'
// import { registerAllModules } from 'handsontable/registry'
// registerAllModules()
import {
  AutoColumnSize,
  AutoRowSize,
  // Autofill,
  // BasePlugin,
  // BindRowsWithHeaders,
  // CollapsibleColumns,
  // ColumnSorting,
  // ColumnSummary,
  // Comments,
  ContextMenu,
  CopyPaste,
  // CustomBorders,
  // DragToScroll,
  // DropdownMenu,
  // ExportFile,
  // Filters,
  // Formulas,
  // HiddenColumns,
  // HiddenRows,
  // ManualColumnFreeze,
  ManualColumnMove,
  ManualColumnResize,
  ManualRowMove,
  ManualRowResize,
  // MergeCells,
  // MultiColumnSorting,
  // MultipleSelectionHandles,
  // NestedHeaders,
  // NestedRows,
  // PersistentState,
  // Search,
  // TouchScroll,
  // TrimRows,
  UndoRedo,
  registerPlugin,
} from 'handsontable/plugins'
registerPlugin(AutoColumnSize)
// registerPlugin(Autofill);
registerPlugin(AutoRowSize)
// registerPlugin(BindRowsWithHeaders);
// registerPlugin(CollapsibleColumns);
// registerPlugin(ColumnSorting);
// registerPlugin(ColumnSummary);
// registerPlugin(Comments);
registerPlugin(ContextMenu)
registerPlugin(CopyPaste)
// registerPlugin(CustomBorders);
// registerPlugin(DragToScroll);
// registerPlugin(DropdownMenu);
// registerPlugin(ExportFile);
// registerPlugin(Filters);
// registerPlugin(Formulas);
// registerPlugin(HiddenColumns);
// registerPlugin(HiddenRows);
// registerPlugin(ManualColumnFreeze);
registerPlugin(ManualColumnMove)
registerPlugin(ManualColumnResize)
registerPlugin(ManualRowMove)
registerPlugin(ManualRowResize)
// registerPlugin(MergeCells);
// registerPlugin(MultiColumnSorting);
// registerPlugin(MultipleSelectionHandles);
// registerPlugin(NestedHeaders);
// registerPlugin(NestedRows);
// registerPlugin(PersistentState);
// registerPlugin(Search);
// registerPlugin(TouchScroll);
// registerPlugin(TrimRows);
registerPlugin(UndoRedo)
export default {
  components: {
    HotTable,
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
      default: undefined,
    },
    item: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      hot: {},
      hotSettings: {},
    }
  },
  created() {
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
    this.hotSettings = {
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
    }
  },
  mounted() {
    this.hot = this.$refs.hotTableComponent.hotInstance
    if (this.hookFunc) {
      this.addHook(this.hookFunc)
    }
  },
  methods: {
    test() {
      console.log(this.hot.getDataAtCol(0), this.hot.getDataAtRow(0))
    },
    importData() {
      XSheet.importFile((tableData, tableName) => {
        this.loadData(tableData)
      })
    },
    transData() {
      // 转置数据，矩阵的转置
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
    },
    render() {
      this.hot.render()
    },
    addHook(callback) {
      // 监听表格内容的变化并执行方法
      const hooks = ['afterChange', 'afterCreateRow', 'afterCreateCol', 'afterRemoveRow', 'afterRemoveCol', 'afterColumnMove', 'afterRowMove']
      hooks.forEach((hk) => {
        this.hot.addHook(hk, () => {
          callback(this.getData(), this.item)
        })
      })
    },
    loadData(newData) {
      this.hot.loadData(!newData || newData.length < 1 ? [[]] : this.cloneArray(newData)) // lodaData 的 参数不能为空数组[]，但可以为[[]]
    },
    getData(data) {
      // 去除 data 中无用的行或列
      if (!data) {
        data = this.hot.getData()
      }
      let trueRows = -1,
        trueCols = -1
      for (let i = data.length - 1; i >= 0; i--) {
        for (let j = data[i].length - 1; j >= 0; j--) {
          if (data[i][j] && data[i][j] != null && data[i][j] != '') {
            if (trueRows === -1) {
              trueRows = i
            }
            if (trueCols < j) {
              trueCols = j
            }
            break
          }
        }
      }
      return trueRows === -1 ? [[]] : this.hot.getData(trueRows, trueCols)
    },
    cloneArray(data) {
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

<style src="handsontable/dist/handsontable.full.css"></style>
<style scoped>
@import url('~@/assets/style/h-table.css');

.table-main {
  background-color: rgb(255, 255, 255);
}
</style>
