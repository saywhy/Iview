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
            <template v-for="(item,index) in FieldList">
              <template v-if="item.pop =='alert_time'">
                <el-table-column :prop="item.pop"
                                 min-width="150"
                                 :label="item.name"
                                 align="center"
                                 show-overflow-tooltip>
                </el-table-column>
              </template>
              <!-- 告警类型 -->
              <template v-if="item.pop =='category'">
                <el-table-column :prop="item.pop"
                                 :label="item.name"
                                 min-width="150"
                                 align="center"
                                 show-overflow-tooltip>
                </el-table-column>
              </template>
              <!-- 更新时间 -->
              <template v-if="item.pop =='update_time'">
                <el-table-column align="center"
                                 min-width="150"
                                 :label="item.name"
                                 show-overflow-tooltip>
                  <template slot-scope="scope">{{ scope.row.update_time | time }}</template>
                </el-table-column>
              </template>
              <!-- 威胁等级 -->
              <template v-if="item.pop =='degree'">
                <el-table-column align="center"
                                 min-width="100"
                                 show-overflow-tooltip
                                 :label="item.name">
                  <template slot-scope="scope">
                    <span class="btn_alert_background"
                          :class="{'high_background':scope.row.degree =='高','mid_background':scope.row.degree =='中','low_background':scope.row.degree =='低'}">
                      {{ scope.row.degree | degree_sino }}</span>
                  </template>
                </el-table-column>
              </template>
              <!-- 安全域 -->
              <template v-if="item.pop =='security_domain'">
                <el-table-column align="center"
                                 show-overflow-tooltip
                                 min-width="100"
                                 :label="item.name">
                  <template slot-scope="scope">{{ scope.row.security_domain | securityDomain }}</template>
                </el-table-column>
              </template>
              <!-- 状态 -->
              <template v-if="item.pop =='status'">
                <el-table-column align="center"
                                 show-overflow-tooltip
                                 min-width="100"
                                 :label="item.name">
                  <template slot-scope="scope">{{ scope.row.status | alert_status }}</template>
                </el-table-column>
              </template>
              <!-- 源地址 -->
              <template v-if="item.pop =='src_ip'">
                <el-table-column align="center"
                                 show-overflow-tooltip
                                 min-width="120"
                                 :label="item.name">
                  <template slot-scope="scope">{{ scope.row.src_ip.join(',') }}</template>
                </el-table-column>
              </template>
              <!-- 目的地址 -->
              <template v-if="item.pop =='dest_ip'">
                <el-table-column align="center"
                                 show-overflow-tooltip
                                 min-width="120"
                                 :label="item.name">
                  <template slot-scope="scope">{{ scope.row.dest_ip.join(',') }}</template>
                </el-table-column>
              </template>
              <!-- 工单状态 -->
              <template v-if="item.pop =='workorder_status'">
                <el-table-column align="center"
                                 show-overflow-tooltip
                                 min-width="120"
                                 :label="item.name">
                  <template slot-scope="scope">{{ scope.row.workorder_status | work_status }}</template>
                </el-table-column>
              </template>
              <!-- 描述 -->
              <template v-if="item.pop =='description'">
                <el-table-column align="center"
                                 show-overflow-tooltip
                                 min-width="150"
                                 :label="item.name">
                  <template slot-scope="scope">{{ JSON.parse(scope.row.description).join(',') }}</template>
                </el-table-column>
              </template>
              <!-- 关联资产名 -->
              <template v-if="item.pop =='asset_name'">
                <el-table-column align="center"
                                 show-overflow-tooltip
                                 min-width="120"
                                 :label="item.name">
                  <template slot-scope="scope">{{ JSON.parse(scope.row.asset_name).join(',') }}</template>
                </el-table-column>
              </template>
              <!-- 用户 -->
              <template v-if="item.pop =='user'">
                <el-table-column align="center"
                                 show-overflow-tooltip
                                 min-width="120"
                                 :label="item.name">
                  <template slot-scope="scope">{{ JSON.parse(scope.row.user).join(',') }}</template>
                </el-table-column>
              </template>
              <!-- 失陷确定性 -->
              <template v-if="item.pop =='fall_certainty'">
                <el-table-column align="center"
                                 show-overflow-tooltip
                                 :label="item.name">
                  <template slot-scope="scope">
                    <span :class="{'fall_certainty':scope.row.fall_certainty == '1'}">
                      {{ scope.row.fall_certainty | certainty }}</span>
                  </template>
                </el-table-column>
              </template>
              <!-- 标签 -->
              <template v-if="item.pop =='labels'">
                <el-table-column align="center"
                                 show-overflow-tooltip
                                 max-width="180"
                                 min-width="120"
                                 :label="item.name">
                  <template slot-scope="scope">{{ scope.row.labels.join(',') }}</template>
                </el-table-column>
              </template>
              <!-- 风险指数 -->
              <template v-if="item.pop =='risk_num'">
                <el-table-column min-width="80"
                                 :label="item.name"
                                 align="center"
                                 show-overflow-tooltip>
                  <template slot-scope="scope">{{ scope.row.risk_num | risk_num }}</template>
                </el-table-column>
              </template>
              <!-- 日志数量 -->
              <template v-if="item.pop =='log_count'">
                <el-table-column :prop="item.pop"
                                 min-width="80"
                                 :label="item.name"
                                 align="center"
                                 show-overflow-tooltip>
                </el-table-column>
              </template>
            </template>
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
            <template v-for="(item,index) in FieldList">
              <template v-if="item.pop =='alert_time'">
                <el-table-column :prop="item.pop"
                                 min-width="150"
                                 :label="item.name"
                                 align="center"
                                 show-overflow-tooltip>
                </el-table-column>
              </template>
              <!-- 告警类型 -->
              <template v-if="item.pop =='category'">
                <el-table-column :prop="item.pop"
                                 :label="item.name"
                                 min-width="150"
                                 align="center"
                                 show-overflow-tooltip>
                </el-table-column>
              </template>
              <!-- 更新时间 -->
              <template v-if="item.pop =='update_time'">
                <el-table-column align="center"
                                 min-width="150"
                                 :label="item.name"
                                 show-overflow-tooltip>
                  <template slot-scope="scope">{{ scope.row.update_time | time }}</template>
                </el-table-column>
              </template>
              <!-- 威胁等级 -->
              <template v-if="item.pop =='degree'">
                <el-table-column align="center"
                                 min-width="100"
                                 show-overflow-tooltip
                                 :label="item.name">
                  <template slot-scope="scope">
                    <span class="btn_alert_background"
                          :class="{'high_background':scope.row.degree =='高','mid_background':scope.row.degree =='中','low_background':scope.row.degree =='低'}">
                      {{ scope.row.degree | degree_sino }}</span>
                  </template>
                </el-table-column>
              </template>
              <!-- 安全域 -->
              <template v-if="item.pop =='security_domain'">
                <el-table-column align="center"
                                 show-overflow-tooltip
                                 min-width="100"
                                 :label="item.name">
                  <template slot-scope="scope">{{ scope.row.security_domain | securityDomain }}</template>
                </el-table-column>
              </template>
              <!-- 状态 -->
              <template v-if="item.pop =='status'">
                <el-table-column align="center"
                                 show-overflow-tooltip
                                 min-width="100"
                                 :label="item.name">
                  <template slot-scope="scope">{{ scope.row.status | alert_status }}</template>
                </el-table-column>
              </template>
              <!-- 源地址 -->
              <template v-if="item.pop =='src_ip'">
                <el-table-column align="center"
                                 show-overflow-tooltip
                                 min-width="120"
                                 :label="item.name">
                  <template slot-scope="scope">{{ scope.row.src_ip.join(',') }}</template>
                </el-table-column>
              </template>
              <!-- 目的地址 -->
              <template v-if="item.pop =='dest_ip'">
                <el-table-column align="center"
                                 show-overflow-tooltip
                                 min-width="120"
                                 :label="item.name">
                  <template slot-scope="scope">{{ scope.row.dest_ip.join(',') }}</template>
                </el-table-column>
              </template>
              <!-- 工单状态 -->
              <template v-if="item.pop =='workorder_status'">
                <el-table-column align="center"
                                 min-width="120"
                                 show-overflow-tooltip
                                 :label="item.name">
                  <template slot-scope="scope">{{ scope.row.workorder_status | work_status }}</template>
                </el-table-column>
              </template>
              <!-- 描述 -->
              <template v-if="item.pop =='description'">
                <el-table-column align="center"
                                 min-width="150"
                                 show-overflow-tooltip
                                 :label="item.name">
                  <template slot-scope="scope">{{ JSON.parse(scope.row.description).join(',') }}</template>
                </el-table-column>
              </template>
              <!-- 关联资产名 -->
              <template v-if="item.pop =='asset_name'">
                <el-table-column align="center"
                                 show-overflow-tooltip
                                 min-width="120"
                                 :label="item.name">
                  <template slot-scope="scope">{{ JSON.parse(scope.row.asset_name).join(',') }}</template>
                </el-table-column>
              </template>
              <!-- 用户 -->
              <template v-if="item.pop =='user'">
                <el-table-column align="center"
                                 show-overflow-tooltip
                                 min-width="120"
                                 :label="item.name">
                  <template slot-scope="scope">{{ JSON.parse(scope.row.user).join(',') }}</template>
                </el-table-column>
              </template>
              <!-- 失陷确定性 -->
              <template v-if="item.pop =='fall_certainty'">
                <el-table-column align="center"
                                 show-overflow-tooltip
                                 :label="item.name">
                  <template slot-scope="scope">
                    <span :class="{'fall_certainty':scope.row.fall_certainty == '1'}">
                      {{ scope.row.fall_certainty | certainty }}</span>
                  </template>
                </el-table-column>
              </template>
              <!-- 标签 -->
              <template v-if="item.pop =='labels'">
                <el-table-column align="center"
                                 show-overflow-tooltip
                                 max-width="180"
                                 min-width="120"
                                 :label="item.name">
                  <template slot-scope="scope">{{ scope.row.labels.join(',') }}</template>
                </el-table-column>
              </template>
              <!-- 风险指数 -->
              <template v-if="item.pop =='risk_num'">
                <el-table-column min-width="80"
                                 :label="item.name"
                                 align="center"
                                 show-overflow-tooltip>
                  <template slot-scope="scope">{{ scope.row.risk_num | risk_num }}</template>
                </el-table-column>
              </template>
              <!-- 日志数量 -->
              <template v-if="item.pop =='log_count'">
                <el-table-column :prop="item.pop"
                                 min-width="80"
                                 :label="item.name"
                                 align="center"
                                 show-overflow-tooltip>
                </el-table-column>
              </template>
            </template>
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
        data: [],
        pageNow: '1',
        rows: '10',
        count: '0',
      },
      FieldList: [],
      table_new: {
        data: [],
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
    // this.column_deploy()
  },

  watch: {
    selectIndicator: function (val) {
      this.column_deploy()
    }
  },
  methods: {
    handleClick () {

    },
    //获取显示的字段
    column_deploy () {
      this.$axios.get('/yiiapi/alert/FieldList')
        .then((resp) => {
          this.FieldList = []
          let { status, data } = resp.data;
          if (status == 0) {
           // console.log(data);
            data.config.map(item => {
              var obj = {
                name: '',
                pop: item
              }
              switch (item) {
                case 'alert_time':
                  obj.name = '告警时间'
                  break;
                case 'category':
                  obj.name = '告警类型'
                  break;
                case 'degree':
                  obj.name = '威胁等级'
                  break;
                case 'update_time':
                  obj.name = '更新时间'
                  break;
                case 'security_domain':
                  obj.name = '安全域'
                  break;
                case 'status':
                  obj.name = '状态'
                  break;
                case 'src_ip':
                  obj.name = '源地址'
                  break;
                case 'dest_ip':
                  obj.name = '目的地址'
                  break;
                case 'workorder_status':
                  obj.name = '工单状态'
                  break;
                case 'description':
                  obj.name = '描述'
                  break;
                case 'asset_name':
                  obj.name = '关联资产名'
                  break;
                case 'user':
                  obj.name = '用户'
                  break;
                case 'fall_certainty':
                  obj.name = '失陷确定性'
                  break;
                case 'labels':
                  obj.name = '标签'
                  break;
                case 'risk_num':
                  obj.name = '风险指数'
                  break;
                case 'log_count':
                  obj.name = '日志数量'
                  break;
                default:
                  break;
              }
              this.FieldList.push(obj)
            })
           // console.log(this.FieldList);
            this.get_alert_list('2', '1', this.table_old.rows);
            this.get_alert_list('0', '1', this.table_new.rows);
          }
        });
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
      console.log(this.table_new.rows);
      this.table_new.pageNow = 1;
      this.get_alert_list('0', '1', val);
    },
    //頁數點擊切換
    handleCurrentChange_new (val) {
      console.log(this.table_new.rows);
      this.table_new.pageNow = val;
      console.log(this.table_new.rows);
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
        // console.log(resp);
        let { status, data } = resp.data;
        switch (is_deal) {
          case '0':
            this.table_new.data = data.data
            this.table_new.pageNow = data.pageNow
            this.table_new.count = data.count
            break;
          case '2':
            this.table_old.data = data.data
            this.table_old.pageNow = data.pageNow
            this.table_old.count = data.count
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
  computed: {

  }
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
    width: 10px; // 横向滚动条
    height: 10px; // 纵向滚动条 必写
  }
  // 滚动条的滑块
  /deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
    background: #a8a8a8;
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

.btn_alert_background {
  width: 72px;
  /*height: 30px;*/
  display: inline-block;
  color: #fff;
  text-align: center;
  line-height: normal;
  border-radius: 2px;
}

.high_background {
  background: #dc5f5f;
}

.mid_background {
  background: #e0c840;
}

.low_background {
  background: #47cad9;
}
.fall_certainty {
  width: 72px;
  /*height: 30px;*/
  display: inline-block;
  color: #fff;
  background-color: #dc5f5f;
  text-align: center;
  line-height: normal;
  border-radius: 2px;
}
</style>
