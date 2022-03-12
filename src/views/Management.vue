<!--
 * @Author: Cogic
 * @Date: 2022-03-12 18:41:02
 * @LastEditors: Cogic
 * @LastEditTime: 2022-03-12 20:38:30
 * @Description: 
-->
<template>manage</template>

<script>
import API from '@/api'
export default {
  beforeCreate() {
    API.checkAdmin((message) => {
      if (message.success) {
        this.username = message.info.username
      } else {
        this.$router.replace('/sign')
      }
    })
  },
}
</script>

<style scoped></style>
