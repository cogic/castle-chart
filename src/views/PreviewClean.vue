<template>
  <div id="view-container">
    <component :is="currentView"></component>
  </div>
</template>

<script>
import ChartView from '@/components/preview-clean/ChartView.vue'
import PanelView from '@/components/preview-clean/PanelView.vue'
export default {
  components: { ChartView, PanelView },
  data() {
    return {}
  },
  computed: {
    currentView() {
      if (this.$route.params.type === 'chart') {
        return 'chart-view'
      } else if (this.$route.params.type === 'panel') {
        return 'panel-view'
      }
    },
  },
}
</script>

<style scoped>
#view-container {
  width: 100%;
  height: 100%;
}
.container-box{
  overflow-y: initial;
}
</style>
