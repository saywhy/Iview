<template>
  <el-col class="vm-main-threat" :class="claName" v-cloak>
    <el-table class="common-table-home"
              ref="multipleTable"
              align="center"
              @row-click="detail_click"
              @header-click="header_click"
              :row-style="{cursor:'pointer'}"
              @mousedown.native="mousedown"
              @mouseup.native="mouseup"
              :data="tableData">
      <el-table-column label="告警时间"
                       align="center"
                       show-overflow-tooltip>
        <template slot-scope="scope">
          {{scope.row.alert_time | time}}
        </template>
      </el-table-column>
      <el-table-column prop="indicator"
                       align="center"
                       label="告警类型"
                       show-overflow-tooltip></el-table-column>
      <el-table-column prop="target"
                       align="center"
                       label="威胁指标"
                       show-overflow-tooltip></el-table-column>
      <el-table-column prop="capital"
                       align="center"
                       label="风险资产"
                       show-overflow-tooltip></el-table-column>
      <el-table-column prop="capital"
                       align="center"
                       label="攻击阶段"
                       show-overflow-tooltip></el-table-column>
      <el-table-column align="center"
                       label="威胁等级"
                       show-overflow-tooltip>
        <template slot-scope="scope">
          <span class="btn_alert_background"
                :class="{'high_background':scope.row.degree =='高',
                      'mid_background':scope.row.degree =='中',
                      'low_background':scope.row.degree =='低'}">
            {{ scope.row.degree | degree_sino }}</span>
        </template>
      </el-table-column>
    </el-table>
  </el-col>
</template>

<script type="text/ecmascript-6">
  export default {
    name:'vm-main-threat',
    props: {
      options: {
        type: Array,
        default: () => []
      },
      split:{
        type: Number,
        default: () => 0
      },
      claName:{
        type: String,
        default: () => ''
      }
    },
    data() {
      return {
        tableData: [],
        detail_click_val: {},
        oldPositon: {
          x: '',
          y: ''
        },
        newPositon: {
          x: '',
          y: ''
        }
      }
    },
    created(){
      let options = this.options;

      if (this.split != 0){
         options = options.slice(0,this.split);
      }else {
        options = options;
      }
      this.tableData = options;
    },
    methods: {
      //进入详情页面
      detail_click (val) {
        this.detail_click_val = val
      },
      header_click (val) {
        this.detail_click_val = {}
      },
      mousedown (event) {
        this.oldPositon = {
          x: '',
          y: ''
        }
        this.newPositon = {
          x: '',
          y: ''
        }
        this.oldPositon.x = event.clientX;
        this.oldPositon.y = event.clientY;
      },
      mouseup (event) {
        this.newPositon.x = event.clientX;
        this.newPositon.y = event.clientY;
        if (this.oldPositon.x == this.newPositon.x) {
          setTimeout(() => {
            if (this.detail_click_val.id) {
              console.log('点击详情');
              this.$router.push({ path: "/detail/network", query: { detail: this.detail_click_val.id, type: 'alert' } });
            } else {
              console.log('点击头部');
            }
          }, 10);
        } else {
          console.log('复制');
        }
      },
    },
  }
</script>
<style scoped lang="less">
  .vm-main-threat{
    margin-top: 60px;
    padding: 0 20px!important;
    /deep/
    .common-table-home {
      width: 100%;
      font-family: PingFangMedium;
      .el-table__header-wrapper {
        .el-table__header {
          thead.has-gutter {
            th {
              font-size: 16px;
              color: #333;
              padding: 0;
              height: 36px;
              line-height: 36px;
              background: #f8f8f8 !important;
              .cell {
                font-family: PingFangMedium;
                font-size: 18px;
              }
            }
          }
        }
      }
      .el-table__body-wrapper {
        tbody {
          td {
            font-family: PingFangMedium;
            font-size: 16px;
            color: #666;
            padding: 0;
            height: 36px;
            line-height: 36px;
            border-bottom: 1px solid #ececec;
            .cell {
              .btn_alert_background{
                width: 56px;
              }
              .fall_certainty {
                width: 72px;
                display: inline-block;
                color: #fff;
                background-color: #dc5f5f;
                text-align: center;
                line-height: normal;
                border-radius: 2px;
              }
              .el-checkbox {
                display: grid;
              }
              .a_label {
                padding: 0 2px;
                margin: 0 2px;
                color: #fff;
                background: #5389e0;
                border-radius: 2px;
              }
              .high {
                color: #dc5f5f;
              }
              .mid {
                color: #e0c840;
              }
              .low {
                color: #47cad9;
              }
              .high_background {
                background: #dc5f5f
              }
              .mid_background {
                background: #e0c840
              }
              .low_background {
                background: #47cad9
              }
            }
          }
        }
      }
    }
    &.vm-main-threat_more{
      /deep/
      .common-table-home{
        .el-table__body-wrapper{
          height: 475px!important;
          overflow-y: auto;

          &::-webkit-scrollbar {
            width: 6px;
          }
          &::-webkit-scrollbar-thumb {
            border-radius: 6px;
            background: #0070FF;
          }
          &::-webkit-scrollbar-track {
            border-radius: 6px;
            background: #f4f4f4;
          }
        }
      }
    }
  }
</style>
