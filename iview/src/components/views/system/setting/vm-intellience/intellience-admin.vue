<template>
  <div id="intellience-admin" v-cloak
       v-loading.fullscreen.lock="loading">
    <div class="admin-top">
      <el-select class="select_box"
                 v-model="intel_name"
                 placeholder="请选择情报源管理设备">
        <el-option v-for="item in intel_attr"
                   :key="item.name"
                   :label="item.name"
                   :value="item.name">
        </el-option>
      </el-select>
    </div>
    <div class="admin-bom">
      <div class="item" v-for="(item,$index) in intel_lists" >
        <span class="sw">
          <el-switch v-model="item.switchFlag"></el-switch>
          <span class="name" v-show="item.switchFlag">启用</span>
          <span class="name" v-show="!item.switchFlag">禁用</span>
        </span>
        <h3 class="num">85</h3>
        <h5 class="cop1">Hoohoolab</h5>
        <h5 class="cop2">BotnetCAndCURL</h5>
        <h4 class="ad1">
          <span class="t1">上次更新时间：</span>
          <span class="t2">2019-01-12</span>
        </h4>
        <h4 class="ad1">
          <span class="t1">上次成功更新时间：</span>
          <span class="t2">2019-01-13</span>
        </h4>
        <h4 class="ad2">
          <span class="tm1">结果：</span>
          <span class="tm2">成功</span>
        </h4>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { eventBus } from '@/components/common/eventBus.js';
  export default {
    name: "intellience-admin",
    data () {
      return {
        key: "",
        intel_lists: [{count:85,name:'Hoohoolab',corporate:'BotnetCAndCURL',update_time:'2019-01-03',last_time:'2019-01-04',status:false,switchFlag:true},
          {count:85,name:'Hoohoolab',corporate:'BotnetCAndCURL',update_time:'2019-01-03',last_time:'2019-01-04',status:true,switchFlag:true},
          {count:85,name:'Hoohoolab',corporate:'BotnetCAndCURL',update_time:'2019-01-03',last_time:'2019-01-04',status:true,switchFlag:false},
          {count:85,name:'Hoohoolab',corporate:'BotnetCAndCURL',update_time:'2019-01-03',last_time:'2019-01-04',status:false,switchFlag:true},
          {count:85,name:'Hoohoolab',corporate:'BotnetCAndCURL',update_time:'2019-01-03',last_time:'2019-01-04',status:true,switchFlag:true},
          {count:85,name:'Hoohoolab',corporate:'BotnetCAndCURL',update_time:'2019-01-03',last_time:'2019-01-04',status:false,switchFlag:false},
          {count:85,name:'Hoohoolab',corporate:'BotnetCAndCURL',update_time:'2019-01-03',last_time:'2019-01-04',status:false,switchFlag:true},
          {count:85,name:'Hoohoolab',corporate:'BotnetCAndCURL',update_time:'2019-01-03',last_time:'2019-01-04',status:true,switchFlag:true},
          {count:85,name:'Hoohoolab',corporate:'BotnetCAndCURL',update_time:'2019-01-03',last_time:'2019-01-04',status:false,switchFlag:false},
          {count:85,name:'Hoohoolab',corporate:'BotnetCAndCURL',update_time:'2019-01-03',last_time:'2019-01-04',status:false,switchFlag:false}],
        loading: false,
        intel_name:'',
        intel_attr:[{name:'商业情报'},{name:'开源情报'}]
      };
    },
    props: {
      option: {
        type: Object,
        default: () => { }
      }
    },
    mounted () {
      this.get_data()
    },

    methods: {
      // 获取网卡配置
      get_data () {
        this.loading = true;
        this.$axios.get('/yiiapi/intelligence/Prototype')
          .then(resp => {
            this.loading = false;
            let {status,data} = resp.data

            console.log(data)


          })
          .catch(error => {
            console.log(error);
          })
      },

    }
  };
</script>

<style scoped lang="less">
  #intellience-admin {
    text-align: left;
    .admin-top{
      width: 100%;
      display: block;
      /deep/
      .select_box {
        width: 360px;
        .el-input__inner {
          width: 360px;
          background: #f8f8f8 !important;
        }
      }
    }
    .admin-bom{
      height: auto;
      margin: 24px 0 4px 0;
      font-size: 0;
      .item{
        width: 376px;
        height: 208px;
        margin-right: 20px;
        margin-bottom: 20px;
        background-color: #FFFFFF;
        box-shadow: 0 2px 6px 0 rgba(0,0,0,0.16);
        border-radius: 2px;
        display: inline-block;
        padding: 12px 24px;
        position: relative;
        background-size: 136px 136px;
        background-position: right bottom;
        background-repeat: no-repeat;
        .num{
          font-family: PingFangSC-Medium;
          font-size: 48px;
          line-height: 1;
        }
        .cop1{
          font-family: PingFangSC-Medium;
          font-size: 14px;
          color: #333333;
          line-height: 24px;
          margin-top: 6px;
        }
        .cop2{
          font-family: PingFangSC-Medium;
          font-size: 14px;
          color: #666666;
          line-height: 24px;
          margin-bottom: 16px;
        }
        .ad1{
          font-family: PingFangSC-Regular;
          font-size: 0;
          line-height: 18px;
          .t1{
             width: 132px;
             @media screen and (max-width: 1601px){
               width: 152px;
             }
             font-size: 14px;
             color: #999999;
             display: inline-block;
          }
          .t2{
            font-size: 14px;
            color: #999999;
            display: inline-block;
          }
        }
        .ad2{
          font-size: 0;
          line-height: 18px;
          .tm1{
            width: 45px;
            @media screen and (max-width: 1601px){
              width: 56px;
            }
            font-size: 14px;
            color: #999999;
            display: inline-block;
            font-family: PingFangSC-Regular;
          }
          .tm2{
            font-size: 14px;
            color: #999999;
            display: inline-block;
            font-family: PingFangSC-Regular;
          }
        }
        .sw{
          position: absolute;
          right: 24px;
          top: 16px;
          /deep/
          .el-switch{
            .el-switch__core{
              width: 32px!important;
              @media screen and (max-width: 1601px){
                &:after{
                  width: 15px;
                  height: 15px;
                }
              }
            }
          }
          .name{
            margin-left: 5px;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #333333;
            vertical-align: top;
          }
        }
        &:nth-child(odd){
          background-image: url("../../../../../assets/images/system/bg1.png");
        }
        &:nth-child(even){
          background-image: url("../../../../../assets/images/system/bg2.png");
        }
        &:nth-child(4n){
          .num{
            color: #FEAA00;
          }
        }
        &:nth-child(4n + 1){
          .num{
            color: #0070FF;
          }
        }
        &:nth-child(4n + 2){
          .num{
            color: #7ACE4C;
          }
        }
        &:nth-child(4n + 3){
          .num{
            color: #12DCFF;
          }
        }
      }
    }
  }
</style>

