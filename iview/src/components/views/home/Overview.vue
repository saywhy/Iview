<template>
 <div id="Overview" v-cloak>
   <vm-main-tabs :mountain="mountain"
                 v-if="mountain_show"></vm-main-tabs>
   <el-row :gutter="20" type="flex" class="va-main-2" justify="space-between">
     <el-col :span="12">
       <div class="vam-2">
         <div class="vam-title">威胁告警（7天）</div>
         <vm-main-emerge :options="top_left"
                         v-if="top_left_show"></vm-main-emerge>
         <div class="legend">
           <span class="legend_icon color1"></span>
           <span class="legend_name">低危</span>
           <span class="legend_icon color2"></span>
           <span class="legend_name">中危</span>
           <span class="legend_icon color3"></span>
           <span class="legend_name">高危</span>
         </div>
       </div>
     </el-col>
     <el-col :span="6">
       <div class="vam-2">
         <div class="vam-title">威胁类型 TOP5（7天）</div>
         <vm-main-form :options="top_mid"
                       v-if="top_mid_show"></vm-main-form>
        <!--<vm-main-time></vm-main-time>-->
       </div>
     </el-col>
     <el-col :span="6">
       <div class="vam-2">
         <div class="vam-title">高风险威胁指标（7天）</div>
         <vm-main-target :options="top_right"
                         v-if="top_right_show"></vm-main-target>
       </div>
     </el-col>
   </el-row>
   <el-row :gutter="20" type="flex" class="va-main-3" justify="space-between">
     <el-col :span="12">
       <div class="vam-3">
         <div class="vam-title">风险资产</div>
         <vm-main-capital :options="mid_left"
                          v-if="mid_left_show"></vm-main-capital>
         <el-col :span="16" class="vam-progress">
           <vm-main-progress :options="mid_left"
                             v-if="mid_left_show"></vm-main-progress>
         </el-col>
         <div class="legend">
           <span class="legend_icon color1"></span>
           <span class="legend_name">低危</span>
           <span class="legend_icon color2"></span>
           <span class="legend_name">中危</span>
           <span class="legend_icon color3"></span>
           <span class="legend_name">高危</span>
         </div>
       </div>
     </el-col>
     <el-col :span="12">
       <div class="vam-3">
         <div class="vam-title">风险资产 TOP5</div>
         <div class="vam-more" v-more="more" v-if="mid_right_show"
              @click="more_router_assets()"></div>
         <vm-main-top5 :options="mid_right" :split="5"
                       v-if="mid_right_show">
         </vm-main-top5>
       </div>
     </el-col>
   </el-row>
   <el-row :gutter="20" type="flex" class="va-main-4" justify="space-between">
     <el-col :span="12">
       <div class="vam-4">
         <div class="vam-title">攻击阶段分布（30天）</div>
         <vm-main-stage :options="bom_left"
                        v-if="bom_left_show"></vm-main-stage>
       </div>
     </el-col>
     <el-col :span="12">
       <div class="vam-4">
         <div class="vam-title">最新告警</div>
         <div class="vam-more" v-more="more"
              v-if="bom_right_show"
              @click="more_router_risks()"></div>
         <vm-main-threat :options="bom_right" :split="5"
                         v-if="bom_right_show">
         </vm-main-threat>
       </div>
     </el-col>
   </el-row>

   <!--更多风险资产弹出框-->
   <el-dialog class="pop_box"
              :close-on-click-modal="false"
              :modal-append-to-body="false"
              :visible.sync="more_visible.risk">
     <img src="@/assets/images/emerge/closed.png"
          @click="more_visible.risk = false"
          class="closed_img"
          alt="">
     <div class="title">
       <div class="mask"></div>
       <span class="title_name">风险资产</span>
     </div>
     <div class="content">
       <vm-main-top5 :options="mid_right" :split="0"
                       :claName="more_visible.risk_name">
       </vm-main-top5>
     </div>
   </el-dialog>

   <!--更多最新告警弹出框-->
   <el-dialog class="pop_box"
              :close-on-click-modal="false"
              :modal-append-to-body="false"
              :visible.sync="more_visible.alarm">
     <img src="@/assets/images/emerge/closed.png"
          @click="more_visible.alarm = false"
          class="closed_img"
          alt="">
     <div class="title">
       <div class="mask"></div>
       <span class="title_name">最新告警</span>
     </div>
     <div class="content">
       <vm-main-threat :options="bom_right" :split="0"
                       :claName="more_visible.alarm_name">
       </vm-main-threat>
     </div>
   </el-dialog>
 </div>
</template>

<script type="text/ecmascript-6">
    import { eventBus } from '@/components/common/eventBus.js';
    import vmMainTabs from './vm-main/vm-main-tabs'
    import vmMainEmerge from './vm-main/vm-main-emerge'
    import vmMainTarget from './vm-main/vm-main-target'
    import vmMainForm from './vm-main/vm-main-form'
    import vmMainTime from './vm-main/vm-main-time'
    import vmMainCapital from './vm-main/vm-main-capital'
    import vmMainProgress from './vm-main/vm-main-progress'
    import vmMainTop5 from './vm-main/vm-main-top5'
    import vmMainRank from './vm-main/vm-main-rank'
    import vmMainStage from './vm-main/vm-main-stage'
    import vmMainThreat from './vm-main/vm-main-threat'

    import {isSynthetical} from "../../../assets/js/validate";

    export default {
      name: "Overview",
      data(){
        return {
          more:[{name:'醉在你世界'},{name:'走过冬日雪'}],
          gridData: [],
          more_visible:{
            risk:false,
            risk_name:'vm-main-top5_more',
            alarm: false,
            alarm_name:'vm-main-threat_more'
          },
          mountain:{},
          mountain_show:false,

          top_left: [],
          top_left_show: false,

          top_mid: [],
          top_mid_show: false,

          top_right: [],
          top_right_show: false,

          ///////////
          mid_left:{},
          mid_left_show: false,

          mid_right: [],
          mid_right_show: false,

          ///////////
          bom_left: [],
          bom_left_show: false,

          bom_right: [],
          bom_right_show: false,
        }
      },
      components:{
        vmMainTabs,
        vmMainEmerge,
        vmMainTarget,
        vmMainForm,
        vmMainTime,
        vmMainCapital,
        vmMainProgress,
        vmMainTop5,
        vmMainRank,
        vmMainStage,
        vmMainThreat
      },
      created () {
        this.check_passwd();
        //顶部
        this.init_mountain();

        //第一排
        this.init_top_left();
        this.init_top_mid();
        this.init_top_right();

        //第二排
        this.init_mid_left();
        this.init_mid_right();

        //第三排
        this.init_bom_left();
        this.init_bom_right();


      },
      methods:{
        // 测试密码过期
        check_passwd () {
          this.$axios.get('/yiiapi/site/CheckPasswdReset')
            .then((resp) => {
              let {
                status,
                msg,
                data
              } = resp.data;
              if (status == '602') {
                this.$message(
                  {
                    message: msg,
                    type: 'warning',
                  }
                );
                eventBus.$emit('reset')
              }
            })
        },
        //顶部
        init_mountain() {
          this.$axios.get('/yiiapi/overview/tabs')
            .then((resp) => {
              // console.log(resp)
              let {
                status,
                data
              } = resp.data;

              if (status == 0) {
                if(!isSynthetical(data)){
                  return false;
                }else {
                  this.mountain = data;
                  this.mountain_show = true;
                }
              }
            })
        },

        //第一排（左）
        init_top_left () {
          this.$axios.get('/yiiapi/overview/Last7DaysAlarm')
            .then((resp) => {
               //console.log(resp)
              let {
                status,
                data
              } = resp.data;
              if (status == 0) {
                if(!isSynthetical(data)){
                  return false;
                }else {
                  this.top_left = data;
                  this.top_left_show = true;
                }
              }
            })
        },
        //第一排（中）
        init_top_mid () {
          this.$axios.get('/yiiapi/overview/ThreatType')
            .then((resp) => {
              let {
                status,
                data
              } = resp.data;

              if (status == 0) {
                if(!isSynthetical(data)){
                   return false;
                }else {
                  this.top_mid = data;
                  this.top_mid_show = true;
                }
              }
            })
        },
        //第一排（右）
        init_top_right () {
          this.$axios.get('/yiiapi/overview/HighRiskIndicators')
            .then((resp) => {
              let {
                status,
                data
              } = resp.data;
              //console.log(data)
              if (status == 0) {
                if(!isSynthetical(data)){
                  return false;
                }else {
                  this.top_right = data;
                  this.top_right_show = true;
                }
              }
            })
        },

        //第二排（左）
        init_mid_left () {
          this.$axios.get('/yiiapi/overview/RiskAsset')
            .then((resp) => {
              let {
                status,
                data
              } = resp.data;
              //console.log(data)
              if (status == 0) {
                if(!isSynthetical(data)){
                  return false;
                }else {
                  this.mid_left = data;
                  this.mid_left_show = true;
                }
              }
            })
        },
        //第二排（右）
        init_mid_right () {
          this.$axios.get('/yiiapi/overview/RiskAssetTop5')
            .then((resp) => {
              let {
                status,
                data
              } = resp.data;

              //console.log(data);

              if (status == 0) {
                if(!isSynthetical(data)){
                  return false;
                }else {
                  this.mid_right = data;
                  this.mid_right_show = true;
                }
              }
            })
        },

        //第三排（左）
        init_bom_left () {
          this.$axios.get('/yiiapi/overview/AttackStageDistribution')
            .then((resp) => {
              // /console.log(resp)
              let {
                status,
                data
              } = resp.data;

              if (status == 0) {
                if(!isSynthetical(data)){
                  return false;
                }else {
                  this.bom_left = data;
                  this.bom_left_show = true;
                }
              }
            })
        },
        //第三排（右）
        init_bom_right () {
          this.$axios.get('/yiiapi/overview/LatestAlarms')
            .then((resp) => {
              let {
                status,
                data
              } = resp.data;

             // console.log(data);

              if (status == 0) {
                if(!isSynthetical(data)){
                  return false;
                }else {
                  this.bom_right = data;
                  this.bom_right_show = true;
                }
              }
            })
        },

        more_router_assets(){
          this.$router.push({path:'/handle/assets'});
        },
        more_router_risks(){
          this.$router.push({path:'/emerge/network'});
        }
      }
    }
</script>

<style scoped lang="less">
  #Overview{
    padding:24px;
    .vam-title{
      position: absolute;
      top: 16px;
      left: 20px;
      font-size: 16px;
      color: #333;
      font-weight: bold;
      font-family: PingFangSC-Medium;
    }
    .vam-more{
      position: absolute;
      top: 16px;
      right: 20px;
      cursor: pointer;
    }
    .va-main-2{
      margin-top: 20px;
      .vam-2{
        height: 302px;
        border-radius: 4px;
        background-color: #fff;
        position: relative;
        .legend{
          position: absolute;
          top: 14px;
          right: 24px;
          .legend_icon {
            margin-left: 12px;
            margin-right: 5px;
            border-radius: 2px;
            height: 14px;
            width: 28px;
            vertical-align: middle;
            display: inline-block;
            &.color1 {
              background: #47CAD9;
            }
            &.color2 {
              background: #E0C840;
            }
            &.color3 {
              background: #DC5F5F;
            }
          }
          .legend_name{
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #333333;
          }
        }
      }

    }
    .va-main-3{
      margin-top: 20px;
      .vam-3{
        height: 302px;
        border-radius: 4px;
        background-color: #fff;
        position: relative;
        .vam-progress{
          position: absolute;
          right: 10px;
          top: 54px;
          z-index: 999;
        }
        .legend{
          position: absolute;
          top: 14px;
          right: 24px;
          .legend_icon {
            margin-left: 12px;
            margin-right: 5px;
            border-radius: 2px;
            height: 14px;
            width: 28px;
            vertical-align: middle;
            display: inline-block;
            &.color1 {
              background: #47CAD9;
            }
            &.color2 {
              background: #E0C840;
            }
            &.color3 {
              background: #DC5F5F;
            }
          }
          .legend_name{
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #333333;
          }
        }
      }
    }
    .va-main-4{
      margin-top: 20px;
      .vam-4{
        height: 302px;
        border-radius: 4px;
        background-color: #fff;
        position: relative;
      }
    }
    /deep/
    .pop_box {
      .el-dialog {
        height: 640px;
        width: 1280px;
        .el-dialog__header {
          display: none;
        }
        .el-dialog__body {
          max-height: 640px;
          padding: 30px;

          .closed_img {
            position: absolute;
            top: -18px;
            right: -18px;
            cursor: pointer;
            width: 46px;
            height: 46px;
          }

          .title {
            height: 24px;
            line-height: 24px;
            text-align: left;

            .title_name {
              font-size: 20px;
              color: #333333;
              line-height: 24px;
            }
            .mask {
              width: 24px;
              height: 0px;
              border-top: 0px;
              border-right: 2px solid transparent;
              border-bottom: 5px solid #0070ff;
              border-left: 2px solid transparent;
              transform: rotate3d(0, 0, 1, 90deg);
              display: inline-block;
              margin-right: -5px;
              margin-bottom: 4px;
              margin-left: -10px;
            }
          }
          .content {
            padding-top: 20px;
            .vm-main-top5{
              margin-top: 0;
            }
            .vm-main-threat{
              margin-top: 0;
            }
          }
        }
      }
    }
  }
</style>
