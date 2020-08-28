<template>
  <el-col class="vm-main-target" v-cloak>
    <el-tag class="vm-tag tag1" v-for="(item,index) in options" :key="index"
    :class="{'tag1':index % 5 == 0,'tag2':index % 5 == 1,'tag3':index % 5 == 2,'tag4':index % 5 == 3,'tag5':index % 5 == 4}">{{item.indicator}}</el-tag>
  </el-col>
</template>

<script type="text/ecmascript-6">
  export default {
    name:'vm-main-target',
    props: {
      options: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {}
    }
  }
</script>
<style scoped lang="less">
  .vm-main-target{
    height: 226px;
    margin-top: 60px;
    padding: 0 10px!important;
    text-align: left;
    overflow-y: auto;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 6px;
      /*高宽分别对应横竖滚动条的尺寸*/
      /* border-radius: 6px;*/
    }
    &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
      border-radius: 6px;
      background: #0070FF;
      /*background: red;*/
    }
    &::-webkit-scrollbar-track {/*滚动条里面轨道*/
      border-radius: 6px;
      background: #f4f4f4;
    }
    /deep/
    .vm-tag{
      background-color: #0288D1;
      display: inline-block;
      height: 38px;
      padding: 0 10px;
      margin-bottom: 8px;
      margin-left: 10px;
      line-height: 36px;
      font-size: 14px;
      color: #fff;
      border-width: 0;
      border-radius: 4px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      white-space: nowrap;
      &.tag2{
        background-color: #CDDC39;
      }
      &.tag3{
        background-color: #4CAF50;
      }
      &.tag4{
        background-color: #00BCD4;
      }
      &.tag5{
        background-color: #F57C00;
      }
    }
  }
</style>
