<!--
 * @Author: Cogic
 * @Date: 2022-03-02 22:25:02
 * @LastEditors: Cogic
 * @LastEditTime: 2022-03-03 02:49:30
 * @Description: 
-->
<template>
  <div id="popwin" @mousedown="close">
    <div class="middle-box">
      <div class="info-container">{{ info }}</div>
      <div class="button-box">
        <div class="button exit" id="exit" @click="close" v-if="isExitShow">取消</div>
        <div class="button confirm" id="confirm" @click="confirm">确认</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props: {
    trueFunc: {
      default: function () {},
      type: Function,
    },
    info: {
      default: 'info',
      type: String,
    },
    isExitShow: {
      default: true,
      type: Boolean,
    },
  },
  methods: {
    close(e) {
      if (!e || e.target.id === 'popwin' || e.target.id === 'exit') {
        // setTimeout(() => {
          this.$parent.toShow = false
        // }, 0)
      }
    },
    confirm() {
      this.trueFunc()
      this.close()
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
  width: 300px;
  height: 200px;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  overflow: hidden;
}
.middle-box .info-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  font-size: 20px;
  color: rgb(46, 46, 46);
  background-color: rgb(248, 248, 248);
}
.middle-box .button-box {
  display: flex;
  background-color: rgb(214, 188, 82);
}
.middle-box .button-box .button {
  display: inline-block;
  width: 50%;
  flex-grow: 1;
  color: rgb(255, 255, 255);
  font-size: 16px;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
}
.middle-box .button-box .button.exit {
  background-color: rgb(207, 134, 23);
}
.middle-box .button-box .button.exit:hover {
  background-color: rgb(184, 93, 57);
}
.middle-box .button-box .button.confirm {
  background-color: rgb(99, 155, 201);
}
.middle-box .button-box .button.confirm:hover {
  background-color: rgb(75, 113, 194);
}
</style>
