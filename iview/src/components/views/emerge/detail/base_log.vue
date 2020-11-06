<template>
  <div class="base_log">
    <p class="title">日志</p>
    <div class="log_content">
      <div class="log_content_top">
        <div class="log_btn_i"
             @click="NormalizedLog">导出归一化日志</div>
        <div class="log_btn_o"
             @click="OriginalLog">导出原始日志</div>
      </div>
      <div class="log_table_box">
        <div class="log_table_left">
          <el-table class="reset_table"
                    ref="multipleTable"
                    align="center"
                    border
                    height="90%"
                    :data="log_list.data.hits.hits"
                    tooltip-effect="dark"
                    style="width: 100%"
                    :row-style="selectedHighlight"
                    @row-click="rowClick"
                    :highlight-current-row="true"
                    :row-class-name="tableRowClassName"
                    @selection-change="handleSelectionChange">
            <el-table-column label="日志时间"
                             align="center"
                             width="150"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row._source.time | timestamp}}</span>
                <!-- <span>{{ scope.row._source.time}}</span> -->
              </template>
            </el-table-column>
            <el-table-column prop="_source.server_name"
                             label="日志来源"
                             align="center"
                             width="150"
                             show-overflow-tooltip></el-table-column>
            <el-table-column prop="_source.classification"
                             label="日志类型"
                             align="center"
                             width="150"
                             show-overflow-tooltip></el-table-column>
            <el-table-column prop="_source.eventtype"
                             label="事件类型"
                             width="150"
                             align="center"
                             show-overflow-tooltip></el-table-column>
            <el-table-column prop="_source.direction"
                             label="方向"
                             align="center"
                             width="150"
                             show-overflow-tooltip></el-table-column>
            <el-table-column prop="_source.srcIp"
                             label="源地址"
                             width='150'
                             align="center"
                             show-overflow-tooltip></el-table-column>
            <el-table-column prop="_source.src_name"
                             label="源资产名"
                             align="center"
                             width="150"
                             show-overflow-tooltip></el-table-column>
            <el-table-column prop="_source.src_port"
                             label="源端口"
                             align="center"
                             show-overflow-tooltip></el-table-column>
            <el-table-column prop="_source.src_account"
                             label="源账号"
                             align="center"
                             width="150"
                             show-overflow-tooltip></el-table-column>
            <el-table-column prop="_source.destIp"
                             label="目的地址"
                             width='150'
                             align="center"
                             show-overflow-tooltip></el-table-column>
            <el-table-column prop="_source.dst_name"
                             label="目的资产名"
                             width="150"
                             align="center"
                             show-overflow-tooltip></el-table-column>
            <el-table-column prop="_source.dst_port"
                             label="目的端口"
                             align="center"
                             show-overflow-tooltip></el-table-column>
            <el-table-column prop="_source.dst_account"
                             label="目的账号"
                             align="center"
                             width="150"
                             show-overflow-tooltip></el-table-column>
            <el-table-column prop="_source.proto"
                             label="协议"
                             align="center"
                             width="150"
                             show-overflow-tooltip></el-table-column>
            <el-table-column prop="_source.app"
                             label="应用"
                             align="center"
                             width="150"
                             show-overflow-tooltip></el-table-column>
          </el-table>
          <el-pagination class="handle_pagination"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :page-sizes="[10,20,50,100]"
                         :page-size="log_list.rows*1"
                         :current-page="log_list.pageNow*1"
                         :total="log_list.data.hits.total.value*1"
                         layout="total, sizes, prev, pager, next">
          </el-pagination>
        </div>
        <div class="log_table_right">
          <el-tabs v-model="activeName"
                   @tab-click="handleClick"
                   class="reset_tab">
            <el-tab-pane label="完整日志"
                         class="tabs-item"
                         name="1">
              <div class="reset_item_box">
                <div class="reset_img_box"
                     v-if="complete_log.length == 0">
                  <img src="@/assets/images/emerge/log_space.png"
                       class="img_box"
                       alt />
                  <p class="space_title">未选择日志</p>
                </div>
                <div class="complete_item"
                     v-for="item in complete_log"
                     v-if="complete_log.length != 0">
                  <p class="complete_item_title">{{item.name}}</p>
                  <div class="complete_item_content">{{item.value}}</div>

                  <!-- <div class="complete_item_content"
                       v-if="item.name =='hash'">
                    <p v-for="key in item.value">
                      <span>{{key}}</span>
                    </p>
                  </div> -->

                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="原始日志"
                         class="tabs-item"
                         name="2">
              <div class="reset_item_box">
                <div class="reset_img_box"
                     v-if="complete_log.length == 0">
                  <img src="@/assets/images/emerge/log_space.png"
                       class="img_box"
                       alt />
                  <p class="space_title">未选择日志</p>
                </div>
                <p v-if="complete_log.length != 0"
                   class="original_log">{{original_log}}</p>
              </div>
            </el-tab-pane>
            <el-tab-pane label="更多日志"
                         class="tabs-item"
                         name="3">
              <div class="reset_item_box">
                <div class="reset_img_box"
                     v-if="complete_log.length == 0">
                  <img src="@/assets/images/emerge/log_space.png"
                       class="img_box"
                       alt />
                  <p class="space_title">未选择日志</p>
                </div>
                <div v-if="complete_log.length != 0">
                  <div class="more_title">
                    <p class="more_title_item">IP地址</p>
                    <p class="more_title_item">资产名</p>
                    <p class="more_title_item">属性</p>
                  </div>
                  <div class="more_item"
                       v-for="(item,index) in asset_list"
                       :class="item.icon?'text_color':''"
                       @click="select_asset(item,index)">
                    <p class="more_item_text">{{item.ip}}</p>
                    <p class="more_item_text">{{item.server_name}}</p>
                    <p class="more_item_text">{{item.type}}</p>
                    <div class="img_more_box"
                         v-if="item.icon">
                      <img src="@/assets/images/emerge/base/checked.png"
                           alt />
                    </div>
                  </div>
                  <div class="time_box">
                    <div class="time_box_left">
                      <el-input-number v-model="b_hh"
                                       @change="before_hh"
                                       :max="24"
                                       :step="1"
                                       :min="0"></el-input-number>
                      <span>hh</span>
                      <el-input-number v-model="b_mm"
                                       @change="before_mm"
                                       :min="0"
                                       :step="1"
                                       :max="60"></el-input-number>
                      <span>mm</span>
                    </div>
                    <div class="time">{{search_time |timestamp}}</div>
                    <div class="time_box_right">
                      <el-input-number v-model="a_hh"
                                       @change="after_hh"
                                       :min="0"
                                       :step="1"
                                       :max="24"
                                       label="小时"></el-input-number>
                      <span>hh</span>
                      <el-input-number v-model="a_mm"
                                       @change="after_mm"
                                       :min="0"
                                       :step="1"
                                       :max="60"></el-input-number>
                      <span>mm</span>
                    </div>
                  </div>
                  <div>
                    <p class="serch_btn"
                       @click="serch_more_log">搜索</p>
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
import moment from "moment"
export default {
  name: "baseLog",
  data () {
    return {
      b_hh: 0,
      b_mm: 0,
      a_hh: 0,
      a_mm: 0,
      log_list: {
        data: {
          hits: {
            hits: [],
            total: {
              value: 0
            }
          }
        },
        rows: 10,
        pageNow: 1
      },
      tableRowClassName: "",
      activeName: "1",
      original_log: "",
      complete_log: [],
      search_time: "",
      search_log_item: {},
      asset_list: [
        {
          asset: "关联资产001",
          type: "源地址",
          icon: true,
        },
        {
          asset: "关联资产002",
          type: "目的地址",
          icon: false,
        },
      ],
    };
  },
  props: {
    selectItem: {
      type: Object,
      default: () => { },
    },
    timeaxis: {
      type: Object,
      default: () => { },
    },
    iPAddr: {
      type: Object,
      default: () => { },
    },
  },
  watch: {
    selectItem: function (val) {
      this.LogList(val);
    },
  },

  mounted () {
    // console.log('2222');
    this.LogList();
    // console.log(this.timeaxis);
  },
  methods: {
    LogList (val) {
      this.original_log = '';
      this.complete_log = [];

      console.log('我要测试')
      console.log(this.selectItem);
      this.$axios
        .get("/yiiapi/alert/LogList", {
          params: {
            srcIp: this.iPAddr.src,
            destIp: this.iPAddr.des,
            size: this.log_list.rows,
            from: this.log_list.rows * (this.log_list.pageNow - 1),
            indicator: this.selectItem.indicator,
            stime: this.selectItem.alert_time * 1000,
            etime: (Number(this.timeaxis.update_time) + 1) * 1000
          },
        })
        .then((resp) => {

          this.log_list.data = resp.data.data;

          this.log_list.data.hits.hits.map(item => {
            for (var k in item._source) {
              if (k == "@timestamp") {
                item._source.time = item._source[k]
              }
            }
          })
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleSelectionChange () { },
    selectedHighlight ({ row, rowIndex }) {
      // console.log(row);
      // console.log(rowIndex);
    },
    rowClick (row, event, column) {
      this.original_log = row._source.message;
      this.complete_log = row._source;
      this.complete_log = [
        {
          name: 'srcIp',
          value: row._source.srcIp
        },
        {
          name: 'src_name',
          value: row._source.src_name
        },
        {
          name: 'src_port',
          value: row._source.src_port
        },
        {
          name: 'src_account',
          value: row._source.src_account
        },
        {
          name: 'destIp',
          value: row._source.destIp
        },
        {
          name: 'dst_account',
          value: row._source.dst_account
        },
        {
          name: 'dst_port',
          value: row._source.dst_port
        },
        {
          name: 'proto',
          value: row._source.proto
        },
        {
          name: 'app',
          value: row._source.app
        },
        {
          name: 'url',
          value: row._source.url
        },
        {
          name: 'hash',
          value: row._source.hash
        },
      ]
      this.asset_list = [];
      let src_obj = {
        ip: row._source.srcIp,
        asset: row._source.src_name,
        server_name: row._source.server_name,
        type: "源地址",
        icon: true,
        key: "srcIp",
      };
      let des_obj = {
        ip: row._source.destIp,
        asset: row._source.dst_name,
        server_name: row._source.server_name,
        type: "目的地址",
        icon: false,
        key: "destIp",
      };
      this.asset_list.push(src_obj);
      this.asset_list.push(des_obj);
      this.search_time = row._source.time
      this.$refs.multipleTable.setCurrentRow(row);
    },
    //每頁多少條切換
    handleSizeChange (val) {
      this.log_list.rows = val;
      this.log_list.pageNow = 1;
      this.LogList();
    },
    //頁數點擊切換
    handleCurrentChange (val) {
      this.log_list.pageNow = val;
      this.LogList()
    },
    handleClick () { },
    select_asset (item, index) {
      console.log(item);
      this.asset_list.map((item) => {
        item.icon = false;
      });
      this.asset_list[index].icon = true;
    },
    // 更多日志搜索
    serch_more_log () {

      this.asset_list.map(item => {
        if (item.icon == true) {
          this.search_log_item.srcTime = srcTime;
          this.search_log_item.destTime = destTime;
          if (item.key == 'srcIp') {
            this.search_log_item.ip = item.ip;
            this.search_log_item.type = 'srcIp';
          }
          if (item.key == 'destIp') {
            this.search_log_item.ip = item.ip;
            this.search_log_item.type = 'destIp';
          }
          this.search_log_item.server_name = item.server_name;
        }
      })
      var time = new Date(this.search_time)
      var srcTime = time.getTime() - this.b_hh * 60 * 60 * 1000 - this.b_mm * 60 * 1000
      var destTime = time.getTime() + this.a_hh * 60 * 60 * 1000 + this.a_mm * 60 * 1000
      //console.log(moment(srcTime).format('YYYY-MM-DD HH:mm:ss'));
      //console.log(moment(destTime).format('YYYY-MM-DD HH:mm:ss'));
      this.search_log_item.srcTime = srcTime
      this.search_log_item.destTime = destTime

      this.$router.push({        path: '/invest/custom_invest', query: {
          search: JSON.stringify(this.search_log_item)
        }      });
      // this.$axios
      //   .get("/yiiapi/alert/MoreLog", {
      //     params: {
      //       srcTime: srcTime,
      //       destTime: Number(destTime) + 1000,
      //       ip: this.search_log_item.ip,
      //       indicator: this.selectItem.indicator
      //     },
      //   })
      //   .then((resp) => {
      //     console.log(resp);

      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    },
    before_hh () { },
    before_mm () { },
    after_hh () { },
    after_mm () { },
    NormalizedLog () {
      console.log("/yiiapi/alert/NormalizedLog?destIp=" +
        this.iPAddr.des +
        "&srcIp=" +
        this.iPAddr.src +
        "&indicator=" +
        this.selectItem.indicator +
        "&stime=" +
        moment(this.selectItem.alert_time * 1000).format('YYYY-MM-DD HH:mm:ss') +
        "&etime=" +
        moment(this.timeaxis.update_time * 1000).format('YYYY-MM-DD HH:mm:ss'));
      window.open(
        "/yiiapi/alert/NormalizedLog?destIp=" +
        this.iPAddr.des +
        "&srcIp=" +
        this.iPAddr.src +
        "&indicator=" +
        this.selectItem.indicator +
        "&stime=" +
        moment(this.selectItem.alert_time * 1000).format('YYYY-MM-DD HH:mm:ss') +
        "&etime=" +
        moment(this.timeaxis.update_time * 1000).format('YYYY-MM-DD HH:mm:ss')
      );
    },
    OriginalLog () {
      /* window.open(
         "/yiiapi/alert/OriginalLog?destIp=" +
         this.iPAddr.des +
         "&srcIp=" +
         this.iPAddr.src
       );*/
      console.log("/yiiapi/alert/OriginalLog?destIp=" +
        this.iPAddr.des +
        "&srcIp=" +
        this.iPAddr.src +
        "&indicator=" +
        this.selectItem.indicator +
        "&stime=" +
        this.selectItem.alert_time * 1000 +
        "&etime=" +
        (Number(this.timeaxis.update_time * 1000) + 1000));

      window.open(
        "/yiiapi/alert/OriginalLog?destIp=" +
        this.iPAddr.des +
        "&srcIp=" +
        this.iPAddr.src +
        "&indicator=" +
        this.selectItem.indicator +
        "&stime=" +
        this.selectItem.alert_time * 1000 +
        "&etime=" +
        (Number(this.timeaxis.update_time * 1000) + 1000)
      );
    },
  },
  computed: {},
};
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
        .handle_pagination {
          margin-top: 10px;
        }
      }
      .log_table_right {
        flex: 1;
        border-left: 1px solid #f0f7ff;
        .reset_item_box {
          .reset_img_box {
            text-align: center;
          }
          text-align: left;
          height: 432px;
          background: #f0f7ff;
          padding: 16px;
          overflow-y: scroll;
          .img_box {
            margin: 100px auto;
            width: 100px;
            height: 80px;
          }
          .space_title {
            font-size: 24px;
            color: #bbbbbb;
            text-align: center;
            margin-top: 20px;
          }
          .complete_item {
            display: flex;
            min-height: 36px;
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
          }
          .original_log {
            word-wrap: break-word;
            word-break: break-all;
            line-height: 36px;
            text-align: left;
            font-size: 14px;
            color: #666666;
            flex: 1;
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
            .img_more_box {
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
              // border: 1px solid red;
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
          .serch_btn {
            cursor: pointer;
            width: 162px;
            height: 38px;
            background: #0070ff;
            color: #fff;
            text-align: center;
            line-height: 38px;
            font-size: 14px;
            margin: 42px auto;
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
            background: #a8a8a8;
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
    width: 10px; // 横向滚动条
    height: 10px; // 纵向滚动条 必写
  }
  // 滚动条的滑块
  /deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
    background: #a8a8a8;
    border-radius: 4px;
  }
  /deep/ .el-table__body tr.current-row > td {
    color: #a8a8a8 !important;
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
