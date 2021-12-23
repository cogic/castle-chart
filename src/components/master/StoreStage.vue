<!--
 * @Author: Cogic
 * @Date: 2021-12-23 16:15:53
 * @LastEditors: Cogic
 * @LastEditTime: 2021-12-23 19:06:20
 * @Description: 
-->
<template>
  <div id="stage">
    <div class="title">{{stageConfig.title}}</div>
    <div class="toolbar">
      <div class="tool build" v-if="toolShow('build')">新建</div>
      <div class="tool rename" v-if="toolShow('rename')">重命名</div>
      <div class="tool copy" v-if="toolShow('copy')">复制</div>
      <div class="tool delete" v-if="toolShow('delete')">删除</div>
      <div class="tool sort" v-if="toolShow('sort')">排序</div>
      <div class="tool view" v-if="toolShow('view')">视图</div>
    </div>
    <div class="store">
      <div class="file" v-for="file in stageConfig.files">{{ file.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  computed: {},
  props: ['stageConfig'],
  methods: {
    test() {
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
  background-color: rgb(255, 255, 255);
}
.title {
  padding-left: 40px;
  color: rgb(97, 97, 97);
  font-size: 25px;
  line-height: 40px;
  background-color: antiquewhite;
}

.toolbar {
  display: flex;
  background-color: azure;
}
.toolbar .tool {
  margin: 5px;
  padding: 3px 10px;
  background-color: cadetblue;
  border-radius: 5px;
}

.store {
  display: flex;
  flex-wrap: wrap;
  /* align-items: flex-start; */
  align-content: flex-start;

  flex-grow: 1;
  background-color: burlywood;
}
.store .file {
  width: 60px;
  height: 60px;
  margin: 5px;
  background-color: cornflowerblue;
}
</style>
