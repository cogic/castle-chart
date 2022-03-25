<template>
  <div id="popwin" @mousedown="close">
    <div class="middle-box">
      <div class="check"><input type="checkbox" v-model="isShared" />分享当前项目</div>
      <div class="link" v-show="!isShared">
        <div class="tip">已取消分享</div>
      </div>
      <div class="link" v-show="isShared">
        <div class="tip">启用分享后所有人都可以通过该链接查看当前项目</div>
        <span class="linklable">链接: </span><input type="text" ref="sharedLink" readonly :value="link" />
        <button @click="copy">复制</button>
        <span class="copytip" v-show="isCopied">已复制</span>
      </div>
    </div>
  </div>
</template>

<script> 
export default {
  data() {
    return {
      isShared: true,
      isCopied: false,
    }
  },
  watch: {
    isShared(newValue) {
      if (this.$route.name === 'ChartTab') {
        this.$API.saveChart({ _id: this.$parent.chartId, isShared: newValue }, (message) => {
          console.log(message)
        })
      } else if (this.$route.name === 'PanelTab') {
        this.$API.savePanel({ _id: this.$parent.panelId, isShared: newValue }, (message) => {
          console.log(message)
        })
      }
    },
  },
  computed: {
    link() {
      let type
      if (this.$route.name === 'ChartTab') {
        type = 'chart'
      } else if (this.$route.name === 'PanelTab') {
        type = 'panel'
      }
      return window.location.origin + '/preview/' + type + '/' + this.$route.params.tabkey
    },
  },
  methods: {
    copy() {
      this.$refs.sharedLink.select()
      document.execCommand('copy') // FIXME 这是一个不太好的复制方法
      this.isCopied = true
      setTimeout(() => {
        this.isCopied = false
      }, 1000)
    },
    close(e) {
      if (e.target.id === 'popwin') {
        this.$parent.isPop = false
      }
    },
  },
}
</script>

<style scoped>
#popwin {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(122, 122, 122, 0.39);
  z-index: 250;
}
.middle-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 650px;
  height: 300px;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
}
.middle-box .check {
  height: 50px;
  font-size: 25px;
  text-align: center;
  /* background-color: antiquewhite; */
}
.middle-box .check input {
  width: 25px;
  height: 25px;
  margin-right: 10px;
  vertical-align: middle;
}
.middle-box .link {
  height: 100px;
  color: rgb(58, 58, 58);
  font-size: 16px;
  text-align: center;
  /* background-color: aqua; */
}
.middle-box .link .tip {
  margin: 0 0 10px 0;
}
.middle-box .link span.linklable {
  display: inline-block;
  height: 30px;
  padding: 0 10px;
  font-size: 20px;
  color: rgb(255, 255, 255);
  background-color: rgb(105, 158, 204);
  border: solid rgb(0, 0, 0);
  border-radius: 5px 0 0 5px;
  border-width: 1px 0 1px 1px;
  vertical-align: middle;
}
.middle-box .link input {
  display: inline-block;
  width: 400px;
  height: 30px;
  padding: 0 10px;
  color: rgb(88, 88, 88);
  /* line-height: 30px; */
  border: solid rgb(0, 0, 0);
  border-width: 1px 0 1px 0;
  vertical-align: middle;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: keep-all;
}
.middle-box .link button {
  height: 30px;
  padding: 0 10px;
  color: rgb(255, 255, 255);
  font-size: 20px;
  background-color: rgb(8, 125, 155);
  border: solid rgb(0, 0, 0);
  border-width: 1px 1px 1px 0;
  border-radius: 0 5px 5px 0;
  vertical-align: middle;
  cursor: pointer;
}
.middle-box .link button:hover {
  background-color: rgb(50, 173, 204);
}
.middle-box .link button:active {
  background-color: rgb(67, 129, 211);
}
.middle-box .copytip {
  position: absolute;
  margin-left: 5px;
  line-height: 30px;
  color: rgb(185, 185, 185);
  font-size: 14px;
}
</style>
