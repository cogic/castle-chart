<!--
 * @Author: Cogic
 * @Date: 2021-12-23 16:15:53
 * @LastEditors: Cogic
 * @LastEditTime: 2021-12-29 00:29:30
 * @Description: 
-->
<template>
  <div id="stage">
    <div class="title" :style="titleStyle">{{ stageConfig.title }}</div>
    <div class="toolbar">
      <div class="tool build" v-if="toolShow('build')" @click="$emit('newTab', buildTabConfig)">新建</div>
      <div class="tool rename" v-if="toolShow('rename')">重命名</div>
      <div class="tool copy" v-if="toolShow('copy')">复制</div>
      <div class="tool delete" v-if="toolShow('delete')">删除</div>
      <div class="tool sort" v-if="toolShow('sort')">排序</div>
      <div class="tool view" v-if="toolShow('view')">视图</div>
    </div>
    <div class="store">
      <div class="file" v-for="file in stageConfig.files" @click="$emit('newTab', fileTabConfig(file))">
        <div class="fileview">img</div>
        <div class="filename">{{ file.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    buildTabConfig() {
      return {
        type: this.stageConfig.type,
        topic: 'new' + this.stageConfig.type,
        key: 'build' + this.stageConfig.type,
      }
    },
    titleStyle() {
      if (this.stageConfig.style && this.stageConfig.style.title) {
        return this.stageConfig.style.title
      }
    },
  },
  props: {
    stageConfig: {
      type: Object,
      default: {},
    },
  },
  methods: {
    test() {},
    fileTabConfig(file) {
      return {
        type: this.stageConfig.type,
        topic: file.name,
        key: file.id,
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
  font-size: 25px;
  line-height: 40px;
  background-color: rgb(230, 213, 201);
  border-radius: 7px 0 0 0;
}

.toolbar {
  display: flex;
  background-color: rgb(255, 255, 255);
}
.toolbar .tool {
  margin: 5px;
  padding: 0 10px;
  color: rgb(71, 71, 71);
  font-size: 18px;
  line-height: 30px;
  background-color: rgb(216, 216, 216);
  border-radius: 5px;
  cursor: pointer;
}
.toolbar .tool:hover {
  background-color: rgb(175, 175, 175);
}

.store {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;

  flex-grow: 1;
  background-color: rgb(240, 237, 233);
  border-radius: 0 0 0 7px;
}
.store .file {
  display: flex;
  flex-direction: column;

  width: 100px;
  height: 100px;
  margin: 5px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px -8px #000000;
}
.store .file:hover {
  box-shadow: 0px 0px 10px -5px #000000;
}
.store .file .fileview {
  flex-grow: 1;

  background-color: rgb(243, 243, 243);
  border-radius: 10px 10px 0 0;
}
.store .file .filename {
  padding: 0 5px;
  color: rgb(34, 34, 34);
  font-size: 18px;
  text-align: center;
  line-height: 30px;
  background-color: rgb(198, 207, 218);
  border-radius: 0 0 10px 10px;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: keep-all;
}
</style>
