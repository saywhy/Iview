<template>
  <div class="alert_assets">
    <p class="title">告警资产</p>
    <div class="asset_list_box">
      <el-tabs v-model="activeName"
               @tab-click="handleClick"
               class="reset_tab">
        <el-tab-pane label="当前告警资产"
                     class="tabs-item"
                     name="1">
          <el-table class="reset_table"
                    ref="multipleTable"
                    align="center"
                    border
                    style="width: 100%"
                    :data="table_new.data"
                    tooltip-effect="dark">
            <el-table-column prop="alert_time"
                             label="时间"
                             align="center"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="category"
                             label="告警类型"
                             align="center"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="indicator"
                             label="威胁指标"
                             align="center"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="源地址"
                             align="center"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{JSON.parse(scope.row.src_ip).join(',')}}</span>
              </template>
            </el-table-column>
            <el-table-column label="目的地址"
                             align="center"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{JSON.parse(scope.row.dest_ip).join(',')}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="application"
                             label="应用"
                             align="center"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column align="center"
                             label="威胁等级">
              <template slot-scope="scope">
                <span class="btn_alert_background"
                      :class="{'high_background':scope.row.degree =='高','mid_background':scope.row.degree =='中','low_background':scope.row.degree =='低'}">
                  {{ scope.row.degree | degree_sino }}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态"
                             align="center"
                             width="80"
                             show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.status | alert_status }}</template>
            </el-table-column>
          </el-table>

        </el-tab-pane>
        <el-tab-pane label="历史告警资产"
                     class="tabs-item"
                     name="2">
          <el-table class="reset_table"
                    ref="multipleTable"
                    align="center"
                    border
                    style="width: 100%"
                    :data="table_old.data"
                    tooltip-effect="dark">
            <el-table-column prop="alert_time"
                             label="时间"
                             align="center"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="category"
                             label="告警类型"
                             align="center"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="indicator"
                             label="威胁指标"
                             align="center"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="源地址"
                             align="center"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{JSON.parse(scope.row.src_ip).join(',')}}</span>
              </template>
            </el-table-column>
            <el-table-column label="目的地址"
                             align="center"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{JSON.parse(scope.row.dest_ip).join(',')}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="application"
                             label="应用"
                             align="center"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column align="center"
                             label="威胁等级">
              <template slot-scope="scope">
                <span class="btn_alert_background"
                      :class="{'high_background':scope.row.degree =='高','mid_background':scope.row.degree =='中','low_background':scope.row.degree =='低'}">
                  {{ scope.row.degree | degree_sino }}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态"
                             align="center"
                             width="80"
                             show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.status | alert_status }}</template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <el-pagination class="handle-pagination"
                     v-if="activeName=='2'"
                     @size-change="handleSizeChange_old"
                     @current-change="handleCurrentChange_old"
                     :page-sizes="[10,20,50,100]"
                     :page-size="table_old.rows*1"
                     :current-page="table_old.pageNow*1"
                     :total="table_old.count*1"
                     layout="total, sizes, prev, pager, next">
      </el-pagination>
      <el-pagination class="handle-pagination"
                     v-if="activeName=='1'"
                     @size-change="handleSizeChange_new"
                     @current-change="handleCurrentChange_new"
                     :page-sizes="[10,20,50,100]"
                     :page-size="table_new.rows*1"
                     :current-page="table_new.pageNow*1"
                     :total="table_new.count*1"
                     layout="total, sizes, prev, pager, next">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: 'alertAssets',
  data () {
    return {
      activeName: '1',
      alert: {
        new: [
          { time: '2019.11.08 15:33:24' }
        ]
      },
      table_old: {
        pageNow: '1',
        rows: '10',
        count: '0',
      },
      table_new: {
        pageNow: '1',
        rows: '10',
        count: '0',
      },
    }
  },
  props: {
    selectIndicator: {
      type: String,
      default: () => { }
    }
  },
  mounted () {


  },

  watch: {
    selectIndicator: function (val) {
      console.log('val监听selectIndicator:', val)
      this.get_alert_list('2', '1', this.table_old.rows);
      this.get_alert_list('0', '1', this.table_new.rows);
    }
  },
  methods: {
    handleClick () {

    },
    //每頁多少條切換
    handleSizeChange_old (val) {
      this.table_old.rows = val;
      this.table_old.pageNow = 1;
      this.get_alert_list('2', '1', val);
    },
    //頁數點擊切換
    handleCurrentChange_old (val) {
      this.table_old.pageNow = val;
      this.get_alert_list('2', val, this.table_old.rows);
    },
    //每頁多少條切換
    handleSizeChange_new (val) {
      this.table_new.rows = val;
      this.table_new.pageNow = 1;
      this.get_alert_list('0', '1', val);
    },
    //頁數點擊切換
    handleCurrentChange_new (val) {
      this.table_new.pageNow = val;
      this.get_alert_list('0', val, this.table_new.rows);
    },
    get_alert_list (is_deal, page, rows) {
      this.$axios.get('/yiiapi/alert/GetSameIndicatorAlert', {
        params: {
          page: page,
          rows: rows,
          indicator: this.selectIndicator,
          is_deal: is_deal
        }
      }).then(resp => {
        console.log(resp);
        let { status, data } = resp.data;
        switch (is_deal) {
          case '0':
            this.table_new = data
            break;
          case '2':
            this.table_old = data
            break;
          default:
            break;
        }
      })
        .catch(error => {
          console.log(error);
        })
    }
  },
  computed: {}
}
</script>
<style scoped lang="less">
.alert_assets {
  margin-top: 24px;
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
  .asset_list_box {
    padding: 24px;
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
}
</style>
<style lang="less">
@import '../../../../assets/css/less/reset_css/reset_tab.less';
@import '../../../../assets/css/less/reset_css/reset_pop.less';
@import '../../../../assets/css/less/common-table-pattern.less';
@import '../../../../assets/css/less/common-dropdown.less';
@import '../../../../assets/css/less/reset_css/reset_table.less';
body {
  > ul.dropdown_ul_box_124 {
    width: 128px !important;
  }
}
</style>