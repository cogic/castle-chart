<template>
  <template v-for="itemConfig in itemConfigs">
    <div class="set-item" v-if="itemConfig">
        <div class="name text-disable" @click="itemConfig.close = !itemConfig.close">
        {{ itemConfig.name }}
        <span class="iconfont" v-if="itemConfig.close">&#xe633;</span>
        <span class="iconfont" v-else>&#xe62f;</span>
      </div>
      <div v-show="!itemConfig.close">
        <div class="project" v-for="project in itemConfig.projects">
          <div class="name text-disable" @click="project.open = !project.open">
            <span class="iconfont" v-if="!project.open">&#xe633;</span>
            <span class="iconfont" v-else>&#xe62f;</span>
            {{ project.name }}
          </div>
          <div v-show="project.open">
            <div class="setting" v-for="set in project.sets">
              <span class="name">{{ set.name }}</span>
              <template v-if="set.type === 'select'">
                <el-select v-model="set.model" class="m-2" size="small" :placeholder="set.placeholder" @change="set.event">
                  <el-option v-for="option in set.options" :key="option.value" :label="option.label" :value="option.value"> </el-option>
                </el-select>
                <div class="aline" v-if="set.type2 === 'color'">
                  <template v-for="(color, index) in set.model">
                    <el-color-picker v-model="set.model[index]" size="small" show-alpha />
                  </template>
                </div>
              </template>
              <template v-else-if="set.type === 'text'">
                <el-input v-model="set.model" class="w-50 m-2" size="small" :placeholder="set.placeholder" @input="set.event" />
              </template>
              <template v-else-if="set.type === 'color'">
                <div class="aline">
                  <el-color-picker v-model="set.model" size="small" show-alpha @active-change="set.event" />
                  <span :style="{ color: set.model }">{{ set.model }}</span>
                </div>
              </template>
              <template v-else-if="set.type === 'number'">
                <el-slider v-model="set.model" show-input size="small" :step="set.step" :min="set.min" :max="set.max" @input="set.event" :format-tooltip="set.format"> </el-slider>
              </template>
              <template v-else-if="set.type === 'switch'">
                <el-switch v-model="set.model" size="small" @input="set.event" />
              </template>
              <template v-else> error </template>
            </div>
          </div>
        </div>
        <div class="close text-disable" @click="itemConfig.close = !itemConfig.close"><span class="iconfont">&#xe65e;</span></div>
      </div>
    </div>
  </template>
</template>

<script>
export default {
  props: {
    itemConfigs: {
      type: Array,
      default: [
        {
          name: 'name',
          show: false,
          projects: [
            {
              name: 'name',
              sets: [
                {
                  name: 'name',
                  type: 'type',
                  type2: 'type2',
                  model: undefined,
                  options: undefined,
                  placeholder: 'placeholder',
                  event: () => {},
                },
              ],
            },
          ],
        },
      ],
    },
  },
  data(){
    return {
      myItemConfigs:[]
    }
  },
  beforeCreate(){
    this.myItemConfigs = this.itemConfigs
  }
}
</script>

<style scoped>
.set-item {
  margin: 0 0 5px 0;
  padding: 0 5px 5px 5px;
  background-color: rgb(140 160 182);
  border-radius: 5px;
}
.set-item:hover {
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.26);
}
.set-item .close {
  color: rgb(255, 255, 255);
  text-align: center;
  font-size: 20px;
  cursor: pointer;
}
.set-item > .name {
  color: rgb(255, 255, 255);
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  line-height: 50px;
  cursor: pointer;
}
.set-item > .name .iconfont {
  float: right;
}
.set-item .project {
  margin-top: 10px;
  padding: 5px;
  border-radius: 3px;
  background-color: rgb(255, 255, 255);
}

.set-item .project > .name {
  padding: 5px;
  color: #6b6b6b;
  font-size: 18px;
  font-weight: bold;
  border-radius: 3px;
  cursor: pointer;
}
.set-item .project > .name:hover {
  background-color: rgb(175, 196, 202);
}
.set-item .setting {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 2px 0;
  padding: 5px 20px;
  border-radius: 3px;
}
.set-item .setting .name {
  width: 170px;
  line-height: 30px;
  color: rgb(82, 99, 93);
  font-size: 14px;
  cursor: default;
}
.set-item .setting:hover {
  box-shadow: 5px 5px 10px rgba(208, 208, 208, 0.4), -5px -5px 10px rgba(240, 240, 240, 0.4);
}
.set-item .aline {
  display: flex;
}
.set-item .aline span {
  font-size: 14px;
  line-height: 24px;
  margin-left: 10px;
  font-weight: bold;
}
.aaaa {
  color: #d6ecff #5f5de0 #c368ff;
  color: #d6ffd9 #61e05d #069743;
  color: #fbffd6 #c58031 #970b06;
}
</style>
