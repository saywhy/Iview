<template>
  <div class='stage'>
    <div class="title">
      <img src="@/assets/images/emerge/detai_attack.png"
           class="icon_img">
      <span>攻击阶段分布</span>
    </div>
    <div class="stage_box">
      <div class="stage_box_top">
        <el-badge :value="attack_stage_list[0].count"
                  :hidden="attack_stage_list[0].count-0<2">
          <span class="name_box"
                :class="attack_stage_list[0].count>0?'color_active':''">初始访问</span>
        </el-badge>
        <div class="img_box">
          <img src="@/assets/images/emerge/detail_jiantou.png"
               alt=""
               class="img_horizontal">
        </div>
        <el-badge :value="attack_stage_list[1].count"
                  :hidden="attack_stage_list[1].count-0<2">
          <span class="name_box"
                :class="attack_stage_list[1].count>0?'color_active':''">执行</span>
        </el-badge>
        <div class="img_box">
          <img src="@/assets/images/emerge/detail_jiantou.png"
               alt=""
               class="img_horizontal">
        </div>
        <el-badge :value="attack_stage_list[2].count"
                  :hidden="attack_stage_list[2].count-0<2">
          <span class="name_box"
                :class="attack_stage_list[2].count>0?'color_active':''">持久化</span>
        </el-badge>
        <div class="img_box">
          <img src="@/assets/images/emerge/detail_jiantou.png"
               alt=""
               class="img_horizontal">
        </div>

        <el-badge :value="attack_stage_list[3].count"
                  :hidden="attack_stage_list[3].count-0<2">
          <span class="name_box"
                :class="attack_stage_list[3].count>0?'color_active':''">提权</span>
        </el-badge>

        <div class="img_box">
          <img src="@/assets/images/emerge/detail_jiantou.png"
               alt=""
               class="img_horizontal">
        </div>
        <el-badge :value="attack_stage_list[4].count"
                  :hidden="attack_stage_list[4].count-0<2">
          <span class="name_box"
                :class="attack_stage_list[4].count>0?'color_active':''">防御逃逸</span>
        </el-badge>
        <div class="img_box">
          <img src="@/assets/images/emerge/detail_jiantou.png"
               alt=""
               class="img_horizontal">
        </div>
        <el-badge :value="attack_stage_list[5].count"
                  :hidden="attack_stage_list[5].count-0<2">
          <span class="name_box"
                :class="attack_stage_list[5].count>0?'color_active':''">凭证访问</span>
        </el-badge>
      </div>
      <div class="stage_box_mid">
        <div class="mid_img_box">
          <img src="@/assets/images/emerge/detail_jiantou_down.png"
               alt=""
               class="img_down">
        </div>
      </div>
      <div class="stage_box_bom">
        <el-badge :value="attack_stage_list[11].count"
                  :hidden="attack_stage_list[11].count-0<2">
          <span class="name_box"
                :class="attack_stage_list[11].count>0?'color_active':''">毁坏</span>
        </el-badge>
        <div class="img_box">
          <img src="@/assets/images/emerge/detail_jiantou_left.png"
               alt=""
               class="img_horizontal">
        </div>
        <el-badge :value="attack_stage_list[10].count"
                  :hidden="attack_stage_list[10].count-0<2">
          <span class="name_box"
                :class="attack_stage_list[10].count>0?'color_active':''">信息泄露</span>
        </el-badge>
        <div class="img_box">
          <img src="@/assets/images/emerge/detail_jiantou_left.png"
               alt=""
               class="img_horizontal">
        </div>
        <el-badge :value="attack_stage_list[9].count"
                  :hidden="attack_stage_list[9].count < 2 ">
          <span class="name_box"
                :class="attack_stage_list[9].count > 0?'color_active':''">命令控制
          </span>
        </el-badge>
        <div class="img_box">
          <img src="@/assets/images/emerge/detail_jiantou_left.png"
               alt=""
               class="img_horizontal">
        </div>
        <el-badge :value="attack_stage_list[8].count"
                  :hidden="attack_stage_list[8].count-0<2">
          <span class="name_box"
                :class="attack_stage_list[8].count > 0?'color_active':''">信息收集</span>
        </el-badge>
        <div class="img_box">
          <img src="@/assets/images/emerge/detail_jiantou_left.png"
               alt=""
               class="img_horizontal">
        </div>
        <el-badge :value="attack_stage_list[7].count"
                  :hidden="attack_stage_list[7].count-0<2">
          <span class="name_box"
                :class="attack_stage_list[7].count>0?'color_active':''">横向移动</span>
        </el-badge>
        <div class="img_box">
          <img src="@/assets/images/emerge/detail_jiantou_left.png"
               alt=""
               class="img_horizontal">
        </div>
        <el-badge :value="attack_stage_list[6].count"
                  :hidden="attack_stage_list[6].count-0<2">
          <span class="name_box"
                :class="attack_stage_list[6].count>0?'color_active':''">信息发现</span>
        </el-badge>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  data () {
    return {
      attack_stage_list: [
        {
          name: "Initial Access",
          value: "初始访问",
          count: 0
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
  },
  methods: {},
  computed: {},
  props: {
    detailArray: {
      type: Array,
      default: () => { }
    }
  },
  mounted () {
    this.attack_stage_list.map(ele => {
      ele.count = 0
    })
    this.detailArray.map(item => {
      this.attack_stage_list.map(ele => {
        if (item.attack_stage == ele.name) {
          ele.count++
        }
      })
    })
  },
  watch: {
    detailArray: function (val) {
      console.log('detail_stage');
      this.attack_stage_list.map(ele => {
        ele.count = 0
      })
      this.detailArray.map(item => {
        this.attack_stage_list.map(ele => {
          if (item.attack_stage == ele.name) {
            ele.count++
          }
        })
      })
      // console.log(this.attack_stage_list);
    }
  },
}
</script>
<style scoped lang="less">
.stage {
  background: #fff;
  text-align: left;
  width: 100%;
  height: 100%;
  // overflow: hidden;
  .title {
    height: 66px;
    padding-left: 56px;
    line-height: 66px;
    border: 1px solid #ececec;
    .icon_img {
      width: 24px;
      margin-right: 12px;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
      font-size: 16px;
      color: #333;
    }
  }
  .stage_box {
    padding: 34px 28px 34px 56px;
    .stage_box_top {
      display: flex;
      .name_box {
        display: inline-block;
        text-align: center;
        width: 104px;
        height: 42px;
        line-height: 42px;
        background: #eef6ff;
        border-radius: 2px;
        font-size: 16px;
        color: #aaaaaa;
      }
      .color_active {
        color: #0070ff !important;
      }
      .img_box {
        flex: 1;
        margin: 0 5px;
        position: relative;
        .img_horizontal {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          height: 20px;
          width: 100%;
        }
      }
    }
    .stage_box_mid {
      height: 56px;
      position: relative;
      margin: 5px 0;
      .mid_img_box {
        width: 104px;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
        .img_down {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          height: 100%;
          width: 20px;
        }
      }
    }
    .stage_box_bom {
      display: flex;
      .name_box {
        display: inline-block;
        text-align: center;
        width: 104px;
        height: 42px;
        line-height: 42px;
        background: #eef6ff;
        border-radius: 2px;
        font-size: 16px;
        color: #aaaaaa;
      }
      .color_active {
        color: #0070ff !important;
      }
      .img_box {
        flex: 1;
        margin: 0 5px;
        position: relative;
        .img_horizontal {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          height: 20px;
          width: 100%;
        }
      }
    }
  }
}
</style>