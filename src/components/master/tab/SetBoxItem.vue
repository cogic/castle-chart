<!--
 * @Author: Cogic
 * @Date: 2022-03-10 21:41:11
 * @LastEditors: Cogic
 * @LastEditTime: 2022-03-10 23:30:35
 * @Description: 
-->
<template>
  <div class="item" v-if="itemCfg.show">
    <div class="name">{{ itemCfg.name }}</div>
    <div class="setting" v-for="set in itemCfg.sets">
      <span class="name">{{ set.name }}</span>
      <template v-if="set.type === 'select'">
        <select v-model="set.model">
          <template v-for="option in set.options">
            <option :value="option.value">{{ option.name }}</option>
          </template>
        </select>
      </template>
      <template v-else-if="set.type === 'text'">
        <el-input v-model="set.model" class="w-50 m-2" :placeholder="set.placeholder" />
      </template>
      <template v-else-if="set.type === 'color'">
        <el-color-picker v-model="set.model" show-alpha />
      </template>
      <template v-else-if="set.type === 'number'">
        <el-input-number v-model="set.model" class="mx-4" :min="set.min" :max="set.max" controls-position="right" />
      </template>
      <template v-else-if="set.type === 'switch'">
        <el-switch v-model="set.model" />
      </template>
      <template v-else> error </template>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.itemCfg = this.itemConfig
  },
  data() {
    return {
      itemCfg: {},
      // settings:{}
    }
  },
  computed: {
    // itemConfig(){
    //   return this.$parent.itemConfig
    // }
  },
  props: {
    itemConfig: {
      type: Object,
      default: {
        name: '标题',
        show: true,
        sets: [{ name: '标题内容', model: undefined }],
      },
    },
  },
  watch: {
    itemCfg: {
      handler(newVal) {
        console.log('wwwwwwwwwwwww')
        this.$parent.itemConfig = newVal
      },
      deep: true,
    },
  },
}
</script>

<style scoped>
.item {
  width: 100%;
  height: 100%;
}
</style>
