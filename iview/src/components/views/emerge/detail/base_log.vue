<template>
  <div class="base_log">
    <p class="title">日志</p>
    <div class="log_content">
      <div class="log_content_top">
        <div class="log_btn_i">导出归一化日志</div>
        <div class="log_btn_o">导出原始日志</div>
      </div>
      <div class="log_table_box">
        <div class="log_table_left">
          <el-table class="reset_table"
                    ref="multipleTable"
                    align="center"
                    border
                    height="99%"
                    :data="log_list.data"
                    tooltip-effect="dark"
                    style="width: 100%"
                    :row-style="selectedHighlight"
                    @row-click="rowClick"
                    :highlight-current-row='true'
                    :row-class-name="tableRowClassName"
                    @selection-change="handleSelectionChange">
            <el-table-column prop="time"
                             label="日志时间"
                             align="center"
                             width="150"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="time"
                             label="日志来源"
                             align="center"
                             width="150"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="time"
                             label="日志类型"
                             align="center"
                             width="150"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="time"
                             label="事件类型"
                             align="center"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="time"
                             label="方向"
                             align="center"
                             width="150"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="time"
                             label="源地址"
                             align="center"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="time"
                             label="源资产名"
                             align="center"
                             width="150"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="time"
                             label="源端口"
                             align="center"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="time"
                             label="源账号"
                             align="center"
                             width="150"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="time"
                             label="目的地址"
                             align="center"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="time"
                             label="目的资产名"
                             align="center"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="time"
                             label="目的端口"
                             align="center"
                             width="150"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="time"
                             label="目的账号"
                             align="center"
                             width="150"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="time"
                             label="协议"
                             align="center"
                             width="150"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="time"
                             label="应用"
                             align="center"
                             width="150"
                             show-overflow-tooltip>
            </el-table-column>
          </el-table>
        </div>
        <div class="log_table_right">
          <el-tabs v-model="activeName"
                   @tab-click="handleClick"
                   class="reset_tab">
            <el-tab-pane label="完整日志"
                         class="tabs-item"
                         name="1">
              <div class="reset_item_box">
                <div class="complete_item">
                  <p class="complete_item_title">Log Count :</p>
                  <p class="complete_item_content">1</p>
                </div>
                <div class="complete_item">
                  <p class="complete_item_title">Classification :</p>
                  <p class="complete_item_content">Configuration</p>
                </div>
                <div class="complete_item">
                  <p class="complete_item_title">Common Event :</p>
                  <p class="complete_item_content">AIE Configuration: New Autorun Registry Key</p>
                </div>
                <div class="complete_item">
                  <p class="complete_item_title">Direction :</p>
                  <p class="complete_item_content">Unknow</p>
                </div>
                <div class="complete_item">
                  <p class="complete_item_title">Log Source Entity :</p>
                  <p class="complete_item_content">Log Source Entity</p>
                </div>
                <div class="complete_item">
                  <p class="complete_item_title">Log Source Host :</p>
                  <p class="complete_item_content">Log Source Host</p>
                </div>
                <div class="complete_item">
                  <p class="complete_item_title">Log Source Type :</p>
                  <p class="complete_item_content">Log Source Type</p>
                </div>
                <div class="complete_item">
                  <p class="complete_item_title">Log Date :</p>
                  <p class="complete_item_content">2019-11-04 14:33:16</p>
                </div>
                <div class="complete_item">
                  <p class="complete_item_title">Object :</p>
                  <p class="complete_item_content">Object :</p>
                </div>
                <div class="complete_item">
                  <p class="complete_item_title">Object Name :</p>
                  <p class="complete_item_content">Object Name</p>
                </div>
                <div class="complete_item">
                  <p class="complete_item_title">Priority :</p>
                  <p class="complete_item_content">Log Source Type</p>
                </div>
              </div>

            </el-tab-pane>
            <el-tab-pane label="原始日志"
                         class="tabs-item"
                         name="2">
              <div class="reset_item_box">
                <p class="original_log">{{original_log}}</p>
              </div>
            </el-tab-pane>
            <el-tab-pane label="更多日志"
                         class="tabs-item"
                         name="3">
              <div class="reset_item_box">
                <div class="more_title">
                  <p class="more_title_item">IP地址</p>
                  <p class="more_title_item">资产名</p>
                  <p class="more_title_item">属性</p>
                </div>
                <div class="more_item"
                     v-for="(item,index) in asset_list"
                     :class="item.icon?'text_color':''"
                     @click="select_asset(item,index)">
                  <p class="more_item_text">{{item.asset}}</p>
                  <p class="more_item_text">{{item.type}}</p>
                  <p class="more_item_text">{{item.type}}</p>
                  <div class="img_box"
                       v-if="item.icon">
                    <img src="@/assets/images/emerge/base/checked.png"
                         alt="">
                  </div>
                </div>
                <div class="time_box">
                  <div class="time_box_left">
                    <el-input-number v-model="num1"
                                     @change="before_hh"
                                     :max="24"
                                     :step='1'
                                     :min="0"
                                     label="小时"></el-input-number>
                    <span>hh</span>
                    <el-input-number v-model="num"
                                     @change="before_mm"
                                     :min="0"
                                     :max="60"
                                     label="分钟"></el-input-number>
                    <span>mm</span>
                  </div>
                  <div class="time">
                    2019-11-04 14:33:16
                  </div>
                  <div class="time_box_right">
                    <el-input-number v-model="num"
                                     @change="after_hh"
                                     :min="1"
                                     :max="10"
                                     label="描述文字"></el-input-number>
                    <el-input-number v-model="num"
                                     @change="after_mm"
                                     :min="1"
                                     :max="10"
                                     label="描述文字"></el-input-number>
                  </div>

                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ALERTS } from '@/apis/alert.js'

export default {
  name: 'baseLog',
  data () {
    return {
      num: '',
      num1: '',
      log_list: {
        data: [
          {
            time: '2019-11-04 14:33:16',
            src: '奇安信防火墙，启明星…',
            type: 'XXXXXXXX',
            src: '奇安信防火墙，启明星…',
          },
          {
            time: '2019-11-04 14:33:16',
            src: '奇安信防火墙，启明星…',
            type: 'XXXXXXXX',
            src: '奇安信防火墙，启明星…',
          },
          {
            time: '2019-11-04 14:33:16',
            src: '奇安信防火墙，启明星…',
            type: 'XXXXXXXX',
            src: '奇安信防火墙，启明星…',
          },
          {
            time: '2019-11-04 14:33:16',
            src: '奇安信防火墙，启明星…',
            type: 'XXXXXXXX',
            src: '奇安信防火墙，启明星…',
          },
          {
            time: '2019-11-04 14:33:16',
            src: '奇安信防火墙，启明星…',
            type: 'XXXXXXXX',
            src: '奇安信防火墙，启明星…',
          },
          {
            time: '2019-11-04 14:33:16',
            src: '奇安信防火墙，启明星…',
            type: 'XXXXXXXX',
            src: '奇安信防火墙，启明星…',
          },
          {
            time: '2019-11-04 14:33:16',
            src: '奇安信防火墙，启明星…',
            type: 'XXXXXXXX',
            src: '奇安信防火墙，启明星…',
          },
          {
            time: '2019-11-04 14:33:16',
            src: '奇安信防火墙，启明星…',
            type: 'XXXXXXXX',
            src: '奇安信防火墙，启明星…',
          },
          {
            time: '2019-11-04 14:33:16',
            src: '奇安信防火墙，启明星…',
            type: 'XXXXXXXX',
            src: '奇安信防火墙，启明星…',
          },
          {
            time: '2019-11-04 14:33:16',
            src: '奇安信防火墙，启明星…',
            type: 'XXXXXXXX',
            src: '奇安信防火墙，启明星…',
          },
          {
            time: '2019-11-04 14:33:16',
            src: '奇安信防火墙，启明星…',
            type: 'XXXXXXXX',
            src: '奇安信防火墙，启明星…',
          },
          {
            time: '2019-11-04 14:33:16',
            src: '奇安信防火墙，启明星…',
            type: 'XXXXXXXX',
            src: '奇安信防火墙，启明星…',
          },
          {
            time: '2019-11-04 14:33:16',
            src: '奇安信防火墙，启明星…',
            type: 'XXXXXXXX',
            src: '奇安信防火墙，启明星…',
          },
          {
            time: '2019-11-04 14:33:16',
            src: '奇安信防火墙，启明星…',
            type: 'XXXXXXXX',
            src: '奇安信防火墙，启明星…',
          },
          {
            time: '2019-11-04 14:33:16',
            src: '奇安信防火墙，启明星…',
            type: 'XXXXXXXX',
            src: '奇安信防火墙，启明星…',
          },
          {
            time: '2019-11-04 14:33:16',
            src: '奇安信防火墙，启明星…',
            type: 'XXXXXXXX',
            src: '奇安信防火墙，启明星…',
          },
          {
            time: '2019-11-04 14:33:16',
            src: '奇安信防火墙，启明星…',
            type: 'XXXXXXXX',
            src: '奇安信防火墙，启明星…',
          },
          {
            time: '2019-11-04 14:33:16',
            src: '奇安信防火墙，启明星…',
            type: 'XXXXXXXX',
            src: '奇安信防火墙，启明星…',
          },
          {
            time: '2019-11-04 14:33:16',
            src: '奇安信防火墙，启明星…',
            type: 'XXXXXXXX',
            src: '奇安信防火墙，启明星…',
          },
          {
            time: '2019-11-04 14:33:16',
            src: '奇安信防火墙，启明星…',
            type: 'XXXXXXXX',
            src: '奇安信防火墙，启明星…',
          },
          {
            time: '2019-11-04 14:33:16',
            src: '奇安信防火墙，启明星…',
            type: 'XXXXXXXX',
            src: '奇安信防火墙，启明星…',
          },
        ]
      },
      tableRowClassName: '',
      activeName: '1',
      original_log: '< aie v=“1”> <_0 Dhdfakjshdaskhdas;jdajshfakshaks;fhasjkfhas;kfhskdjsfkdfks<_0 Dhdfakjshdaskhdas;jdajshfakshaks;fhasjkfhas;kfhskdjsfkdfks<_0 Dhdfakjshdaskhdas;jdajshfakshaks;fhasjkfhas;kfhskdjsfkdfks<_0 Dhdfakjshdaskhdas;jdajshfakshaks;fhasjkfhas;kfhskdjsfkdfks<_0 Dhdfakjshdaskhdas;jdajshfakshaks;fhasjkfhas;kfhskdjsfkdfks<_0 Dhdfakjshdaskhdas;jdajshfakshaks;fhasjkfhas;kfhskdjsfkdfks<_0 Dhdfakjshdaskhdas;jdajshfakshaks;fhasjkfhas;kfhskdjsfkdfks<_0 Dhdfakjshdaskhdas;jdajshfakshaks;fhasjkfhas;kfhskdjsfkdfks<_0 Dhdfakjshdaskhdas;jdajshfakshaks;fhasjkfhas;kfhskdjsfkdfks> </aie>',
      asset_list: [
        {
          asset: '关联资产001',
          type: '源地址',
          icon: true
        },
        {
          asset: '关联资产002',
          type: '目的地址',
          icon: false
        },
      ]
    }
  },
  mounted () {
    this.login()
  },
  methods: {
    async login () {
      let user_list = await ALERTS({ page: 1, rows: 10, start_time: '', end_time: '', fall_certainty: '', category: '', degree: '', status: '' })

      //  this.$axios.get('/yiiapi/alert/list', {
      this.$axios.get('/yiiapi/alerts', {
        params: {
          start_time: '',
          end_time: '',
          key_word: '',
          fall_certainty: '',
          status: '',
          degree: '',
          page: '1',
          rows: '10',
        }
      }).then(resp => {
        console.log(resp);
      })
        .catch(error => {
          console.log(error);
        })


    },
    handleSelectionChange () {

    },
    selectedHighlight ({ row, rowIndex }) {
      // console.log(row);
      // console.log(rowIndex);
    },
    rowClick (row, event, column) {
      console.log(row);
      this.$refs.multipleTable.setCurrentRow(row)
    },
    handleClick () {

    },
    select_asset (item, index) {
      this.asset_list.map(item => {
        item.icon = false
      })
      this.asset_list[index].icon = true

    },
    before_hh () { },
    before_mm () { },
    after_hh () { },
    after_mm () { },
  },
  computed: {}
}
</script>
<style scoped lang="less">
.base_log {
  .title {
    height: 50px;
    line-height: 50px;
    padding: 0 24px;
    font-size: 16px;
    color: #333333;
    font-weight: bold;
    text-align: left;
    border-bottom: 1px solid #ececec;
  }
  .log_content {
    padding: 0 24px;
    .log_content_top {
      height: 86px;
      padding-top: 24px;
      .log_btn_i {
        float: left;
        background: #0070ff;
        width: 148px;
        height: 38px;
        color: #fff;
        line-height: 38px;
        text-align: center;
        font-size: 14px;
        margin-right: 8px;
        cursor: pointer;
      }
      .log_btn_o {
        float: left;
        width: 148px;
        height: 38px;
        line-height: 38px;
        cursor: pointer;
        text-align: center;
        border: 1px solid #0070ff;
        color: #0070ff;
        font-size: 14px;
      }
    }
    .log_table_box {
      height: 480px;
      display: flex;
      .log_table_left {
        width: 800px;
        // border: 1px solid green;
        // overflow: hidden;
        /deep/ .reset_table {
          thead {
            tr {
              th {
                padding: 0;
                height: 48px;
              }
            }
          }
        }
      }
      .log_table_right {
        flex: 1;
        border-left: 1px solid #f0f7ff;
        .reset_item_box {
          height: 432px;
          background: #f0f7ff;
          padding: 16px;
          overflow-y: scroll;
          .complete_item {
            display: flex;
            height: 36px;
            line-height: 36px;
            text-align: left;
            .complete_item_title {
              font-size: 14px;
              color: #666666;
              width: 180px;
            }
            .complete_item_content {
              font-size: 14px;
              color: #666666;
              flex: 1;
            }
            .original_log {
              line-height: 36px;
              text-align: left;
              font-size: 14px;
              color: #666666;
              flex: 1;
            }
          }
          // 更多日志
          .more_title {
            height: 42px;
            line-height: 42px;
            background: #fff;
            display: flex;
            padding: 0 16px;
            .more_title_item {
              flex: 1;
              text-align: left;
              font-size: 14px;
              color: #333333;
              font-weight: bold;
            }
          }
          .more_item {
            height: 42px;
            line-height: 42px;
            position: relative;
            display: flex;
            padding: 0 16px;
            cursor: pointer;
            border-bottom: 1px solid #ececec;
            .more_item_text {
              flex: 1;
              text-align: left;
              font-size: 14px;
              color: #333333;
            }
            .img_box {
              cursor: pointer;
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              width: 20px;
              height: 20px;
              img {
                width: 100%;
                height: 100%;
              }
            }
          }
          .time_box {
            height: 32px;
            line-height: 32px;
            // border: 1px solid red;
            margin: 36px 0;
            text-align: center;
            display: flex;
            .time {
              width: 180px;
              height: 32px;
              text-align: center;
              border: 1px solid red;
              margin: 0 5px;
              background: #f8f8f8;
              font-size: 14px;
              color: #333333;
            }
            .time_box_left {
              flex: 1;
            }
            .time_box_right {
              flex: 1;
            }
            /deep/ .el-input-number {
              // border: 1px solid red;
              height: 32px;
              width: 80px;
              padding: 0;
              line-height: 32px;
              margin-left: 5px;
              /deep/ .el-input-number__decrease,
              .el-input-number__increase {
                width: 20px !important;
                height: 32px !important;
              }
              .el-input__inner {
                height: 32px;
                padding: 0;
                width: 80px;
              }
            }
          }
          .text_color {
            p {
              color: #0070ff !important;
            }
          }

          &::-webkit-scrollbar {
            /*滚动条整体样式*/
            width: 4px;
            /*高宽分别对应横竖滚动条的尺寸*/
            /* border-radius: 6px;*/
          }
          &::-webkit-scrollbar-thumb {
            /*滚动条里面小方块*/
            border-radius: 4px;
            background: #0070ff;
            // background: red;
          }
          &::-webkit-scrollbar-track {
            /*滚动条里面轨道*/
            border-radius: 4px;
            background: #fff;
          }
        }
      }
    }
  }

  // 滚动条的宽度
  /deep/ .el-table__body-wrapper::-webkit-scrollbar {
    width: 4px; // 横向滚动条
    height: 4px; // 纵向滚动条 必写
  }
  // 滚动条的滑块
  /deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
    background: #0070ff;
    border-radius: 4px;
  }
  /deep/ .el-table__body tr.current-row > td {
    color: #0070ff !important;
    background: #eef6ff !important;
  }
  /deep/ .reset_tab {
    .el-tabs__item {
      height: 48px;
      line-height: 48px;
    }
    .el-tabs__header {
      margin: 0;
    }
  }
}
</style>