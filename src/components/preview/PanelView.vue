<template>
  <div class="container-box">
    <g-layout ref="GLayout" :is-resizable="false" :is-draggable="false" :is-removable="false" :is-selectable="false"></g-layout>
  </div>
</template>

<script>
import GLayout from '@/components/general/GLayout.vue'
export default {
  components: { GLayout },
  data() {
    return {
      panelBackColor: '',
      panelItemMargin: '',
    }
  },
  mounted() {
    this.$API.getSharedPanel({ _id: this.$route.params.viewid }, (message) => {
      if (message.success) {
        this.setLayout(message.info.layout, message.info.back)
        this.panelBackColor = message.info.back.config.backgroundColor
        this.panelItemMargin = message.info.back.config.itemMargin
      }
    })
  },
  methods: {
    setLayout(layout, back) {
      this.$refs.GLayout.setLayout(layout)
      this.$refs.GLayout.back = back
    },
    loadData(data, itemI, flag) {},
    curItemChange() {},
  },
}
</script>

<style scoped>
.container-box {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
</style>
