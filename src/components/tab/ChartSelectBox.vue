<template>
  <div class="menu-label">图表类型</div>
  <div class="menu-label check">保留数据&nbsp;<el-switch v-model="keepData" active-color="#3B8DD7" width="50" active-text="是" inactive-text="否" inline-prompt @input="setKeepData"/></div>
  <div class="model-main">
    <div class="model-menu">
      <div class="menu-item text-disable" :class="{ current: isCurrentSample(sample) }" v-for="sample in chartSamples" @click="setCurSample($event, sample.name)">{{ sample.name }}</div>
    </div>
    <template v-for="sample in chartSamples">
      <div class="model-box" v-if="isCurrentSample(sample)">
        <div class="model-item text-disable" v-for="example in sample.examples" @click="setProj(example)">
          <div class="item-img">
            <img :src="example.imgSrc" alt="" />
          </div>
          <div class="item-name">{{ example.name }}</div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    keepData: {
      type: Boolean,
      default: false,
    },
    setKeepData: {
      type: Function,
      default: () => {},
    },
    chartSamples: {},
    setProj: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      curSampleName: '',
    }
  },
  created() {
    this.curSampleName = null
  },
  methods: {
    setCurSample(e, sampleName) {
      this.curSampleName = sampleName
    },
    isCurrentSample(sample) {
      if (sample.name === this.chartSamples[0].name && (this.curSampleName === '' || this.curSampleName === null)) {
        return true
      } else {
        return sample.name === this.curSampleName
      }
    },
  },
}
</script>

<style scoped>
.menu-label {
  color: rgb(253, 253, 253);
  font-size: 20px;
  text-align: center;
  line-height: 30px;
  background-color: rgb(97, 161, 103);
  cursor: default;
}
.menu-label.check {
  color: rgb(37, 37, 37);
  font-size: 14px;
  line-height: 30px;
  background-color: rgb(192, 192, 192);
}
.model-main {
  display: flex;
  flex-grow: 1;
  overflow: auto;
}
.model-main .model-menu {
  width: 60px;
  background-color: rgb(253, 253, 253);
}
.model-main .model-menu .menu-item {
  color: rgb(63, 63, 63);
  font-size: 14px;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
  border-left: 6px solid rgba(0, 0, 0, 0);
  border-right: 6px solid rgba(0, 0, 0, 0);
}
.model-menu .menu-item:hover {
  background-color: rgb(248, 248, 248);
}
.model-menu .menu-item.current {
  background-color: rgb(241, 241, 241);
  border-left-color: rgb(7, 107, 61);
}
.model-menu .menu-item:active {
  background-color: rgb(194, 194, 194);
}

.model-box {
  flex-grow: 1;
  width: 20px;
  height: 100%;
  padding: 10px 10px 0 10px;
  background-color: rgb(241, 241, 241);
  overflow-y: auto;
}
.model-box .model-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.26);
  cursor: pointer;
}
.model-box .model-item:hover {
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.4);
}
.model-box .model-item:active {
  box-shadow: 0px 0px 15px 0px rgba(7, 161, 27, 0.671);
}
.model-box .model-item .item-img {
  height: 80px;
  flex-grow: 1;
  text-align: center;
  border-radius: 5px 5px 0 0;
  overflow: hidden;
}
.model-box .model-item .item-img img {
  width: 100px;
}
.model-box .model-item .item-img img.project {
  width: 100%;
  height: unset;
}
.model-box .model-item .item-img.text {
  line-height: 80px;
}
.model-box .model-item .item-name {
  padding: 2px 5px;
  color: rgb(66, 66, 66);
  font-size: 12px;
  text-align: center;
  background-color: rgb(228, 228, 228);
  border-radius: 0 0 5px 5px;
}
</style>
