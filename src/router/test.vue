<!--
 * @Author: Cogic
 * @Date: 2022-01-17 17:19:58
 * @LastEditors: Cogic
 * @LastEditTime: 2022-01-24 04:59:08
 * @Description: 
-->
<template>
  <div>TEST</div>
  <button @click="test">test</button>
</template>

<script>
import network from '@/api/network'
export default {
  methods: {
    test() {
      let url = '/test'
      let config
      network.post(url, config).then((result) => {
        console.log(result)
      })
    },
  },
}
</script>

<style scoped></style>
