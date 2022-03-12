<!--
 * @Author: Cogic
 * @Date: 2022-01-17 17:19:58
 * @LastEditors: Cogic
 * @LastEditTime: 2022-03-10 23:04:19
 * @Description: 
-->
<template>
<el-input  class="w-50 m-2" :placeholder="'asdads'" />
<el-input v-model="input" placeholder="Please input" />
<div v-for="set in item.sets">555</div>
</template>

<script>
import API from "@/api";
export default {
  data(){
    return{
      item:{
        sets:[
          {},{},{}
        ]
      },
      input:'sdfsdfsdf'
    }
  },
  methods:{
    test(){
      console.log('test')
      API.getChartImg({_id:'6225fffce313c0da4324a62a'},(message)=>{
        this.imgBase64 = message.info.imgStr
        console.log(message.info.imgStr)
        console.log(Buffer.isBuffer(new Buffer([0x48, 0x65, 0x6c, 0x6c, 0x6f])))
        console.log(Buffer.isBuffer(message.info.imgStr))
      })
    }
  }
}
</script>

<style scoped>

</style>