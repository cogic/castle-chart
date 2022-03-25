<template>
  <div id="editor"></div>
</template>

<script>
export default {
  data() {
    return {
      codeEditor: undefined,
    }
  },
  mounted() {
    let editor = ace.edit('editor')
    editor.setTheme('ace/theme/dawn')
    editor.session.setMode('ace/mode/javascript')
    editor.setFontSize(18)
    editor.setReadOnly(false)
    editor.setOption('wrap', 'free')
    ace.require('ace/ext/language_tools')
    editor.setOptions({
      enableBasicAutocompletion: true,
      enableSnippets: true,
      enableLiveAutocompletion: true,
    })
    this.codeEditor = editor
  },
  methods: {
    getCopyText() {
      return this.codeEditor.getValue()
    },
    setValue(str) {
      this.codeEditor.setValue(str)
      this.codeEditor.clearSelection()
    },
  },
}
</script>

<style scoped>
@import url('~@/assets/style/code-box.css');
#editor {
  height: 100%;
}
</style>
