<template>
  <div id="report_create"
       v-loading.fullscreen.lock="report.loading">
    <div class="r_top">
      <div class="r_content_top">
        <h3 class="title">报表生成</h3>
      </div>
      <el-form class="r_content_main">
        <el-row type="flex"
                class="r_main_list">
          <el-col :span="3">
            <span class="title">时间范围</span>
          </el-col>
          <el-col :span="21">
            <div class="r_time">
              <vm-emerge-picker @changeTime='changeTime'></vm-emerge-picker>
            </div>
          </el-col>
        </el-row>
        <el-row type="flex"
                class="r_main_list">
          <el-col :span="3">
            <span class="title">发送格式</span>
          </el-col>
          <el-col :span="21">
            <div class="r_radio">
              <el-radio v-model="report.type"
                        label="csv"
                        class="r_radio_item">Excel</el-radio>
              <el-radio v-model="report.type"
                        label="doc"
                        class="r_radio_item">Word</el-radio>
              <el-radio v-model="report.type"
                        label="pdf"
                        class="r_radio_item">PDF</el-radio>
            </div>
          </el-col>
        </el-row>
        <el-row type="flex"
                class="r_main_list r_special_list">
          <el-col :span="3">
            <span class="title">报表名称</span>
          </el-col>
          <el-col :span="21">
            <el-input class="report-input"
                      placeholder="请输入报表名称"
                      v-model="report.name"
                      clearable>
            </el-input>
          </el-col>
          <div class="r_btn_group">
            <el-button class="b_btn b_ok"
                       @click="create">确定</el-button>
            <el-button class="b_btn b_cancel"
                       @click="reseet">取消</el-button>
          </div>
        </el-row>
      </el-form>
    </div>
    <div class="r_bottom">
      <el-row class="common-table-pattern">
        <el-col :span="24">
          <el-table class="reset_table"
                    ref="multipleTable"
                    align="center"
                    border
                    :data="report_lsit.data"
                    style="width: 100%;"
                    @selection-change="handleSelectionChange">
            <el-table-column label="序号"
                             align="center"
                             width="80">
              <template slot-scope="scope">
                {{(report_data.page-1)*(report_data.rows) + scope.row.index_cn}}
              </template>
            </el-table-column>
            <el-table-column prop="create_time"
                             align="center"
                             label="日期"></el-table-column>
            <el-table-column prop="report_name"
                             align="center"
                             label="名称"></el-table-column>
            <el-table-column label='时间范围'
                             align="center">
              <template slot-scope="scope">
                <span>{{scope.row.stime}}</span>
                <span>至</span>
                <span>{{scope.row.etime}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="report_type"
                             align="center"
                             label="格式"></el-table-column>
            <el-table-column label='操作'
                             align="center">
              <template slot-scope="scope">
                <img src="@/assets/images/common/download.png"
                     class="img_icon"
                     alt=""
                     @click.stop='download(scope.row)'>
                <img src="@/assets/images/common/delete.png"
                     class="img_icon"
                     alt=""
                     @click.stop='del_box(scope.row)'>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="24"
                class="e-pagination">
          <el-pagination style="margin-top:24px;"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :current-page="report_lsit.pageNow"
                         :page-sizes="[10,20,50,100]"
                         :page-size="10"
                         layout="total, sizes, prev, pager, next"
                         :total="report_lsit.count">
          </el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import VmEmergePicker from "@/components/common/vm-emerge-picker";
import { eventBus } from '@/components/common/eventBus.js';
export default {
  name: "report_create",
  data () {
    return {
      report: {
        name: '',
        type: 'csv',
        start_time: '',
        end_time: '',
        loading: false
      },
      report_data: {
        page: 1,
        rows: 10
      },
      report_lsit: {},
    }
  },
  components: { VmEmergePicker },
  mounted () {
    this.get_data()
    this.check_passwd()
  },
  methods: {
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
    // 生成报表
    create () {
      console.log(this.report);
      var pattern = new RegExp(
        "[`~!#%$^&*()=|{}':;',\\[\\]<>《》/?~！#￥……&*（）|{}【】‘；：”“'。，、？]"
      );

      if (this.report.name == '') {
        this.$message(
          {
            message: '请输入报表名称',
            type: 'warning',
          }
        );
        return false
      }
      if (pattern.test(this.report.name)) {
        this.$message.error("报表名称不能包含特殊字符");
        return false;
      }
      if (this.report.start_time == '' || this.report.end_time == '') {
        this.$message(
          {
            message: '请选择时间范围',
            type: 'warning',
          }
        );
        return false
      }
      this.report.loading = true

      // reports
      this.$axios.post('/yiiapi/reports', {
        Report: {
          report_type: this.report.type,
          stime: this.report.start_time,
          etime: this.report.end_time,
          report_name: this.report.name,
        }
      })
        .then(response => {
          this.report.loading = false
          let { status, data } = response.data;
          console.log(data);
          if (status == 0) {
            this.$message(
              {
                message: '生成成功',
                type: 'success',
              }
            );
            this.get_data()
          }

        })
        .catch(error => {
          console.log(error);
        })
    },
    demo () {
      var myChart = this.$echarts.init(document.getElementById("demo"));
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['新告警', '风险资产']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['2020-08-23', '2020-08-24', '2020-08-25', '2020-08-26', '2020-08-27', '2020-08-28', '2020-08-29', '2020-08-30', '2020-08-31', '2020-09-01', '2020-09-02', '2020-08-25', '2020-08-26', '2020-08-27', '2020-08-28', '2020-08-29', '2020-08-30', '2020-08-31', '2020-08-23', '2020-08-24', '2020-08-25', '2020-08-26', '2020-08-27', '2020-08-28', '2020-08-29', '2020-08-30', '2020-08-31']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '新告警',
            type: 'bar',
            data: [320, 332, 301, 334, 390, 330, 320, 320, 332, 301, 320, 332, 301, 334, 390, 330, 320, 320, 332, 301, 320, 332, 301, 334, 390, 330, 320, 320, 332, 301]
          },
          {
            name: '风险资产',
            type: 'bar',
            data: [120, 132, 101, 134, 90, 230, 210, 101, 134, 90, 120, 132, 101, 134, 90, 230, 210, 101, 134, 90, 120, 132, 101, 134, 90, 230, 210, 101, 134, 90]
          },
        ]
      };
      myChart.setOption(option);
    },
    // 取消
    reseet () {
      this.report.name = ''
      this.report.type = 'doc'
      this.report.type = 'doc'
      this.report.start_time = ''
      this.report.end_time = ''
      $(document.querySelector('.el-button--text')).trigger('click');
    },

    // 获取列表
    get_data () {
      this.$axios.get('/yiiapi/reports', {
        params: {
          page: this.report_data.page,
          rows: this.report_data.rows,
        }
      })
        .then(response => {
          let { status, data } = response.data;
          console.log(status);
          this.report_lsit = data
          this.report_lsit.data.forEach((item, index) => {
            item.index_cn = index + 1
          });
        })
        .catch(error => {
          console.log(error);
        })
    },
    // 下载
    download (item) {
      var url1 = '/yiiapi/report/DownloadReport?id=' + item.id;
      window.location.href = url1;
    },
    // 删除
    del_box (item) {
      this.$confirm('此操作删除信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.delete('/yiiapi/reports/' + item.id)
          .then(response => {
            let { status, data } = response.data;
            if (status == 0) {
              this.get_data();
              this.$message(
                {
                  message: '删除成功',
                  type: 'success',
                }
              );
            } else {
              this.$message(
                {
                  message: '删除失败',
                  type: 'error',
                }
              );
            }
          })
          .catch(error => {
            console.log(error);
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    changeTime (data) {
      console.log(data);
      this.report.start_time = parseInt(data[0].valueOf() / 1000)
      this.report.end_time = parseInt(data[1].valueOf() / 1000)
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange (val) {
      // this.multipleSelection = val;
    },
    // 分页
    handleSizeChange (val) {
      this.report_data.rows = val;
      this.report_data.page = 1
      this.get_data();
    },
    handleCurrentChange (val) {
      this.report_data.page = val
      this.get_data();
    },
  }
}
</script>

<style scoped lang="less">
@import '../../../assets/css/less/report_less/rewrite_radio.less';
#report_create {
  padding: 24px;
  .r_top {
    background: #fff;
    font-family: PingFangMedium;
    border-bottom: 1px solid #ececec;

    .r_content_top {
      height: 80px;
      line-height: 80px;
      text-align: left;
      border-bottom: 1px solid #ececec;
      .title {
        font-size: 18px;
        color: #333333;
        padding: 0 24px;
      }
    }
    .r_content_main {
      padding: 0 24px;
      text-align: left;
      .r_main_list {
        height: 62px;
        line-height: 60px;
        border-bottom: 1px solid #ececec;
        .title {
          font-size: 14px;
          color: #333;
        }
        .r_time {
          line-height: 58px;
        }
        .r_radio {
          .r_radio_item {
            font-size: 14px;
            color: #333;
          }
        }
        &.r_special_list {
          border-width: 0;
          height: auto;
          min-height: 164px;
          position: relative;
          .report-input {
            width: 240px;
          }
          .r_btn_group {
            position: absolute;
            left: 0;
            bottom: 24px;
            text-align: right;
            height: 42px;
            z-index: 999;
            font-size: 0;
            /deep/ .b_btn {
              width: 136px;
              height: 42px;
              font-size: 16px;
              vertical-align: text-bottom;
              border: 1px solid #0070ff;
              &.b_ok {
                background: #0070ff;
                color: #fff;
              }
              &.b_cancel {
                background: #fff;
                color: #0070ff;
                margin-left: 24px;
              }
            }
          }
        }
      }
    }
  }
  .r_middle {
    height: 90px;
    width: 100%;
    background: #fff;
    position: relative;
    text-align: left;
    padding: 0 24px;
    .r_btn_middle_group {
      position: absolute;
      top: 24px;
      height: 42px;
      z-index: 999;
      font-size: 0;
      .b_btn {
        width: 148px;
        height: 42px;
        font-size: 16px;
        vertical-align: text-bottom;
        border: 1px solid #0070ff;
        &.b_download {
          background: #0070ff;
          color: #fff;
        }
        &.b_delete {
          background: #fff;
          color: #0070ff;
          margin-left: 8px;
        }
      }
    }
  }
  .r_bottom {
    background: #fff;
    padding: 24px;
    min-height: 441px;
  }
  .img_icon {
    cursor: pointer;
    margin-right: 10px;
  }
}
</style>

<style lang="less">
@import '../../../assets/css/less/reset_css/reset_table.less';
</style>
