<template>
  <div class='stage'>
    <div class="title">
      <img src="@/assets/images/emerge/detai_attack.png"
           class="icon_img">
      <span>攻击阶段分布</span>
    </div>
    <div class="stage_box">
      <div class="stage_box_top">
        <span class="name_box">初始访问</span>
        <div class="img_box">
          <img src="@/assets/images/emerge/detail_jiantou.png"
               alt=""
               class="img_horizontal">
        </div>
        <span class="name_box">执行</span>
        <div class="img_box">
          <img src="@/assets/images/emerge/detail_jiantou.png"
               alt=""
               class="img_horizontal">
        </div>
        <span class="name_box">持久化</span>
        <div class="img_box">
          <img src="@/assets/images/emerge/detail_jiantou.png"
               alt=""
               class="img_horizontal">
        </div>
        <span class="name_box">提权</span>
        <div class="img_box">
          <img src="@/assets/images/emerge/detail_jiantou.png"
               alt=""
               class="img_horizontal">
        </div>
        <span class="name_box">防御逃逸</span>
        <div class="img_box">
          <img src="@/assets/images/emerge/detail_jiantou.png"
               alt=""
               class="img_horizontal">
        </div>
        <span class="name_box">凭证访问</span>
      </div>
      <div class="stage_box_mid">
        <div class="mid_img_box">
          <img src="@/assets/images/emerge/detail_jiantou_down.png"
               alt=""
               class="img_down">
        </div>
      </div>
      <div class="stage_box_bom">
        <span class="name_box">毁坏</span>
        <div class="img_box">
          <img src="@/assets/images/emerge/detail_jiantou_left.png"
               alt=""
               class="img_horizontal">
        </div>
        <span class="name_box">信息泄露</span>
        <div class="img_box">
          <img src="@/assets/images/emerge/detail_jiantou_left.png"
               alt=""
               class="img_horizontal">
        </div>
        <span class="name_box">命令控制</span>
        <div class="img_box">
          <img src="@/assets/images/emerge/detail_jiantou_left.png"
               alt=""
               class="img_horizontal">
        </div>
        <span class="name_box">信息收集</span>
        <div class="img_box">
          <img src="@/assets/images/emerge/detail_jiantou_left.png"
               alt=""
               class="img_horizontal">
        </div>
        <span class="name_box">横向移动</span>
        <div class="img_box">
          <img src="@/assets/images/emerge/detail_jiantou_left.png"
               alt=""
               class="img_horizontal">
        </div>
        <span class="name_box">信息发现</span>
      </div>
      <!-- <div class="detail_base_top">

        <div class="stage_item_box">
          <span>初始访问</span>
        </div>
        <div class="stage_img_box">

        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  data () {
    return {}
  },
  methods: {},
  computed: {}
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