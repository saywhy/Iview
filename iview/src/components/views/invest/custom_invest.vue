<template>
  <div id="common_invest"
       class="common_invest">
    <div class="invest_box">
      <el-tabs v-model="activeName"
               class="reset_tab">
        <el-tab-pane label="自定义追查"
                     class="tabs-item"
                     name="first">
          <div class="search_box">
            <el-input class="search_box_left"
                      placeholder="请输入内容"
                      v-model="search_content">
              <template slot="append">
                <vm-emerge-picker @changeTime='changeTime'
                                  :option='time_list'></vm-emerge-picker>
              </template>
            </el-input>
            <div class="search_box_right">
              搜索
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import vmEmergePicker from "@/components/common/vm-emerge-picker";
import { eventBus } from '@/components/common/eventBus.js';
export default {
  name: "common_invest",
  components: {
    vmEmergePicker,
  },
  data () {
    return {
      activeName: 'first',
      search_content: '',
      time_list: {
        time: []
      },
    };
  },
  computed: {

  },
  mounted () {
    this.check_passwd();
    this.test()
    console.log(this.$route);
    if (this.$route.params.search) {
      this.search_content = 'IP为' + this.$route.params.search.ip
    }
    this.get_data()
  },
  methods: {
    get_data () {
      this.$axios
        .get("/yiiapi/alert/MoreLog", {
          params: {
            srcTime: this.search_log_item.srcTime,
            destTime: this.search_log_item.destTime,
            ip: this.search_log_item.ip,
            server_name: this.search_log_item.server_name,
          },
        })
        .then((resp) => {
          console.log(resp);

        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 测试600专用
    test () {
      this.$axios.get('/yiiapi/site/CheckAuthExist', {
        params: {
          pathInfo: 'investigate/DnsInvestigation',
          method: 'GET',
        }
      })
        .then(response => {

        })
        .catch(error => {
          console.log(error);
        })
    },
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
    // 分页
    handleSizeChange (val) {
      this.dns_search.rows = val;
      this.dns_search.page = 1
      this.get_data();
    },
    handleCurrentChange (val) {
      console.log(val);
      this.dns_search.page = val
      this.get_data();
    },
    changeTime (data) {
      console.log(data);
      if (data) {
        // this.dns_search.start_time = parseInt(data[0].valueOf() / 1000);
        // this.dns_search.end_time = parseInt(data[1].valueOf() / 1000)
      } else {
        // this.dns_search.start_time = ''
        // this.dns_search.end_time = ''
      }
    },
  }
}
</script>
<style  lang="less">
@import '../../../assets/css/less/reset_css/reset_table.less';
@import '../../../assets/css/less/reset_css/reset_invest.less';
@import '../../../assets/css/less/reset_css/reset_tab.less';
#common_invest {
  .el-input-group__append {
    border: 0;
  }
  .search_box {
    display: flex;
    .search_box_left {
      flex: 1;
    }
    .search_box_right {
      padding: 0;
      width: 102px;
      height: 38px;
      text-align: center;
      line-height: 38px;
      background: #0070ff;
      color: #fff;
      border-radius: 3px;
    }
  }
}
</style>

