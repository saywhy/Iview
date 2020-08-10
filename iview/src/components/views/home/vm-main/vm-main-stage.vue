<template>
  <el-col class="vm-main-stage">

    <div class="attack_stage_bom">

      <div class="stage_item_box">
          <span class="circle_box"
                v-if="attack_stage_list[0].count>1">
            {{attack_stage_list[0].count}}
          </span>
        <span :class="attack_stage_list[0].count>0?'count_color':''">初始访问</span>
      </div>
      <div class="stage_img_box">
        <img src="@/assets/images/emerge/detail_jiantou.png"
             alt="">
      </div>
      <div class="stage_item_box">
          <span class="circle_box"
                v-if="attack_stage_list[1].count>1">
            {{attack_stage_list[1].count}}
          </span>
        <span :class="attack_stage_list[1].count>0?'count_color':''">执行</span>
      </div>
      <div class="stage_img_box">
        <img src="@/assets/images/emerge/detail_jiantou.png"
             alt="">
      </div>
      <div class="stage_item_box">
          <span class="circle_box"
                v-if="attack_stage_list[2].count>1">
            {{attack_stage_list[2].count}}
          </span>
        <span :class="attack_stage_list[2].count>0?'count_color':''">持久化</span>
      </div>
      <div class="stage_img_box">
        <img src="@/assets/images/emerge/detail_jiantou.png"
             alt="">
      </div>
      <div class="stage_item_box">
          <span class="circle_box"
                v-if="attack_stage_list[3].count>1">
            {{attack_stage_list[3].count}}
          </span>
        <span :class="attack_stage_list[3].count>0?'count_color':''">提权</span>
      </div>
      <div class="stage_img_box">
        <img src="@/assets/images/emerge/detail_jiantou.png"
             alt="">
      </div>
      <div class="stage_item_box">
          <span class="circle_box"
                v-if="attack_stage_list[4].count>1">
            {{attack_stage_list[4].count}}
          </span>
        <span :class="attack_stage_list[4].count>0?'count_color':''">防御逃逸</span>
      </div>
    </div>
    <div class="attack_stage_center a_right">
      <img  class="a_img" src="@/assets/images/emerge/detail_xiajiantou.png" alt="">
    </div>

    <div class="attack_stage_bom">
      <div class="stage_item_box">
          <span class="circle_box"
                v-if="attack_stage_list[9].count>1">
            {{attack_stage_list[9].count}}
          </span>
        <span :class="attack_stage_list[9].count>0?'count_color':''">凭证访问</span>
      </div>
      <div class="stage_img_box">
        <img src="@/assets/images/emerge/detail_jiantou_left.png"
             alt="">
      </div>
      <div class="stage_item_box">
          <span class="circle_box"
                v-if="attack_stage_list[8].count>1">
            {{attack_stage_list[8].count}}
          </span>
        <span :class="attack_stage_list[8].count>0?'count_color':''">信息发现</span>
      </div>
      <div class="stage_img_box">
        <img src="@/assets/images/emerge/detail_jiantou_left.png"
             alt="">
      </div>
      <div class="stage_item_box">
          <span class="circle_box"
                v-if="attack_stage_list[7].count>1">
            {{attack_stage_list[7].count}}
          </span>
        <span :class="attack_stage_list[7].count>0?'count_color':''">横向移动</span>
      </div>
      <div class="stage_img_box">
        <img src="@/assets/images/emerge/detail_jiantou_left.png"
             alt="">
      </div>
      <div class="stage_item_box">
          <span class="circle_box"
                v-if="attack_stage_list[6].count>1">
            {{attack_stage_list[6].count}}
          </span>
        <span :class="attack_stage_list[6].count>0?'count_color':''">信息收集</span>
      </div>
      <div class="stage_img_box">
        <img src="@/assets/images/emerge/detail_jiantou_left.png"
             alt="">
      </div>
      <div class="stage_item_box">
          <span class="circle_box"
                v-if="attack_stage_list[5].count>1">
            {{attack_stage_list[5].count}}
          </span>
        <span :class="attack_stage_list[5].count>0?'count_color':''">命令控制</span>
      </div>
    </div>

    <div class="attack_stage_center a_left">
      <img class="a_img" src="@/assets/images/emerge/detail_xiajiantou.png" alt="">
    </div>

    <div class="attack_stage_bom attack_stage_bom_last">
      <div class="stage_item_box">
        <span class="circle_box"
              v-if="attack_stage_list[10].count>1">
          {{attack_stage_list[10].count}}
        </span>
        <span :class="attack_stage_list[10].count>0?'count_color':''">信息泄露</span>
      </div>
      <div class="stage_img_box">
        <img src="@/assets/images/emerge/detail_jiantou.png"
             alt="">
      </div>
      <div class="stage_item_box">
          <span class="circle_box"
                v-if="attack_stage_list[11].count>1">
            {{attack_stage_list[11].count}}
          </span>
        <span :class="attack_stage_list[11].count>0?'count_color':''">毁坏</span>
      </div>
    </div>

  </el-col>
</template>

<script type="text/ecmascript-6">
    export default {
      name: "vm-main-stage",
      data(){
        return {
          attack_stage_list: [
            {
              name: "Initial Access",
              value: "初始访问",
              count: 10
            },
            {
              name: "Execution",
              value: "执行",
              count: 0
            },
            {
              name: "Persistence",
              value: "持久化",
              count: 0
            },
            {
              name: "Privilege Escalation",
              value: "提权",
              count: 0
            },
            {
              name: "Defense Evasion",
              value: "防御逃逸",
              count: 0
            },
            {
              name: "Credential Access",
              value: "凭证访问",
              count: 0
            },
            {
              name: "Discovery",
              value: "信息发现",
              count: 0
            },
            {
              name: "Lateral Movement",
              value: "横向移动",
              count: 0
            },
            {
              name: "Collection",
              value: "信息收集",
              count: 0
            },
            {
              name: "Command and Control",
              value: "命令控制",
              count: 0
            },
            {
              name: "Exfiltration",
              value: "信息泄露",
              count: 0
            },
            {
              name: "Impact",
              value: "毁坏",
              count: 0
            },
          ],
        }
      }
    }
</script>

<style scoped lang="less">
  .vm-main-stage{
    margin-top: 60px;
    padding: 0 20px;
    height: 242px;
    .attack_stage_bom {
      display: flex;
      justify-content: space-between;
      .stage_item_box {
        width: 104px;
        height: 48px;
        line-height: 48px;
        background: #eef6ff;
        border-radius: 2px;
        font-size: 16px;
        color: #aaaaaa;
        text-align: center;
        position: relative;
        .circle_box {
          display: block;
          font-size: 12px;
          box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.24);
          width: 20px;
          height: 20px;
          line-height: 20px;
          color: #fff;
          border-radius: 20px;
          background: #ff5f5c;
          position: absolute;
          top: -10px;
          right: -10px;
        }
      }
      .count_color {
        color: #0070ff;
      }
      .stage_img_box {
        flex: 1;
        margin: 0 5px;
        height: 48px;
        line-height: 48px;
        img {
          margin-top: 12px;
          width: 100%;
          height: 24px;
        }
      }
      &.attack_stage_bom_last{
        width: 275px;
      }
    }
    .attack_stage_center{
      margin: 5px 0;
      padding: 0 40px;
      &.a_right{
        text-align: right;
      }
      &.a_left{
        text-align: left;
      }
      .a_img{
        width: 24px;
        height: 28px;
      }
    }
  }

</style>
