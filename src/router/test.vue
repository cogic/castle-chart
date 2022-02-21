<!--
 * @Author: Cogic
 * @Date: 2022-01-17 17:19:58
 * @LastEditors: Cogic
 * @LastEditTime: 2022-02-14 15:42:59
 * @Description: 
-->
<template>
  <div>TEST</div>
  <safe-code/>
</template>

<script>
import SafeCode from '@/components/sign/SafeCode.vue'
export default {
  components: { SafeCode },
}
// import network from '@/api/network'
// export default {
//   methods: {
//     test() {
//       let url = '/test'
//       let config
//       network.post(url, config).then((result) => {
//         console.log(result)
//       })
//     },
//   },
// }
</script>

<style scoped></style>
