<template>
  <div class="vm-progress-list" v-cloak>
    <div class="item" v-for="(item,$index) in proData" :key="$index">
      <span class="vam-progress-title" :title="item.name">{{item.name}}</span>
      <el-progress color="#5389E0" :text-inside="true" :stroke-width="20" :percentage="item.count"></el-progress>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'vm-progress-list',
    props: {
      options: {
        type: Object,
        default: () => {
        }
      }
    },
    data() {
      return {}
    },
    computed: {

      proData() {

        if(!this.options.RiskAsset){
          return [];
        }else {
          let data = this.options.RiskAsset;

          let dataAttr = [];

          for (let key in data) {
            dataAttr.push({name:key,count:data[key] * 1});
          }
          //console.log(dataAttr);

          return dataAttr;
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .vm-progress-list {
    height: 240px;

    .item {
      display: flex;
      line-height: 60px;

      .vam-progress-title {
        width: 90px;
        padding-right: 10px;
        ont-family: PingFangSC-Regular;
        font-size: 14px;
        color: #333333;
        text-align: right;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
      }

      /deep/
      .el-progress {
        flex: 1;
        line-height: 58px;

        .el-progress-bar {
          .el-progress-bar__outer {
            border-radius: 2px;
            background: #F8F8F8;

            .el-progress-bar__inner {
              border-radius: 2px 0 0 2px;

              .el-progress-bar__innerText {
                display: none;
              }
            }
          }
        }
      }
    }
  }
</style>
