<template>
  <div class="time_axis">
    <p class="title">检测时间轴</p>
    <div class="content">
      <div class="content_left">
        <div class="time_item"
             @click="selected_time(item,index)"
             :class="item.selected?'item_background':''"
             v-for="(item,index) in timeaxis">
          <div class="time_item_left">
            <img src="@/assets/images/emerge/time_i.png"
                 class="time_img"
                 v-if="!item.selected"
                 alt />
            <img src="@/assets/images/emerge/time_o.png"
                 class="time_img"
                 v-if="item.selected"
                 alt />
            <div class="line"
                 v-if="!item.selected"></div>
          </div>
          <div class="time_item_right">
            <p :class="item.selected?'item_text':''">{{item.alert_time | time}}</p>
          </div>
        </div>
      </div>
      <div class="content_right">
        <!-- 详细信息 -->
        <base-info :selectItem="select_item"></base-info>
        <!-- 日志 -->
        <base-log :selectItem='select_item'
                  :iPAddr='iP_addr'
                  v-if='select_item.detect_engine=="LOGDF"'></base-log>
        <!-- <base-log :selectItem="select_item"></base-log> -->
        <!-- 告警资产 -->
        <alert-assets :selectIndicator="select_item.indicator"></alert-assets>
      </div>
    </div>
  </div>
</template>
<script>
import baseInfo from "@/components/views/emerge/detail/base_info";
import baseLog from "@/components/views/emerge/detail/base_log";
import baseAssets from "@/components/views/emerge/detail/base_assets";
import alertAssets from "@/components/views/emerge/detail/alert_assets";
export default {
  name: "time_axis",
  data () {
    return {
      timeaxis: [],
      select_item: {},
      iP_addr: {
        src: '',
        des: ''
      },
    };
  },
  props: {
    detailArray: {
      type: Array,
      default: () => { },
    },
  },
  components: {
    baseInfo,
    baseLog,
    alertAssets,
  },
  mounted () {
    this.timeaxis = JSON.parse(JSON.stringify(this.detailArray));
    this.select_item = this.timeaxis[0];
    this.iP_addr.src = this.select_item.src_ip[0]
    this.iP_addr.des = this.select_item.dest_ip[0]
  },
  watch: {
    detailArray: function (val) {
      console.log('val监听:', val)
      console.log(this.detailArray);
      this.timeaxis = JSON.parse(JSON.stringify(this.detailArray));
      this.select_item = this.timeaxis[0];
    },
  },
  methods: {
    selected_time (item, index) {
      console.log(item);
      console.log(index);
      this.select_item = item;
      this.timeaxis.map((x) => {
        x.selected = false;
      });
      this.timeaxis[index].selected = true;
    },
  },
  computed: {},
};
</script>
<style scoped lang="less">
.time_axis {
  // border: 1px solid red;
  padding: 35px 56px;
  .title {
    font-size: 18px;
    color: #333333;
    font-weight: bold;
    line-height: 24px;
    margin-bottom: 24px;
    text-align: left;
  }
  .content {
    display: flex;
    .content_left {
      width: 190px;
      margin-right: 12px;
      background: #fff;
      height: 700px;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 4px;
        /*高宽分别对应横竖滚动条的尺寸*/
        /* border-radius: 6px;*/
      }
      &::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 4px;
        background: #ececec;
        // background: red;
      }
      &::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        border-radius: 4px;
        background: #fff;
      }
      .time_item {
        cursor: pointer;
        height: 60px;
        width: 100%;
        display: flex;
        .time_item_left {
          width: 48px;
          height: 60px;
          position: relative;
          .line {
            width: 4px;
            height: 100%;
            background: #f8f8f8;
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            z-index: 11;
          }
          .time_img {
            width: 20px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 99;
          }
        }
        .time_item_right {
          flex: 1;
          height: 60px;
          position: relative;
          p {
            width: 100%;
            font-size: 14px;
            padding: 0 10px;
            color: #999999;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          .item_text {
            color: #fff;
            padding: 0 10px;
          }
        }
      }
      .item_background {
        background: #0070ff;
      }
    }
    .content_right {
      flex: 1;
      overflow: hidden;
      background: #fff;
    }
  }
}
</style>