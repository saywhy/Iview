<template>
  <div id="common_invest"
       class="common_invest">
    <div class="invest_box">
      <el-tabs v-model="activeName"
               class="reset_tab">
        <el-tab-pane label="自定义追查"
                     class="tabs-item"
                     name="first">
          adadsad

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
    };
  },
  computed: {

  },
  mounted () {
    this.check_passwd();
    this.test()
  },
  methods: {
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
    get_data () {
      this.dns_search.loading = true
      this.$axios.get('/yiiapi/investigate/DnsInvestigation', {
        params: {
          host_ip: this.dns_search.host_ip,
          dns_ip: this.dns_search.dns_ip,
          domain: this.dns_search.domain,
          resolve_ip: this.dns_search.resolve_ip,
          ttl: this.dns_search.ttl,
          resolve_result: this.dns_search.resolve_result,
          start_time: this.dns_search.start_time,
          end_time: this.dns_search.end_time,
          current_page: this.dns_search.page,
          per_page_count: this.dns_search.rows
        }
      })
        .then(response => {
          this.dns_search.loading = false
          let { status, data } = response.data;
          if (status == '602') {
            return false
          }
          this.dns_list = data
          this.dns_list.data.forEach((item, index) => {
            item.index_cn = index + 1
          });
        })
        .catch(error => {
          console.log(error);
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
        this.dns_search.start_time = parseInt(data[0].valueOf() / 1000);
        this.dns_search.end_time = parseInt(data[1].valueOf() / 1000)
      } else {
        this.dns_search.start_time = ''
        this.dns_search.end_time = ''
      }
    },
  }
}
</script>
<style  lang="less">
@import '../../../assets/css/less/reset_css/reset_table.less';
@import '../../../assets/css/less/reset_css/reset_invest.less';
@import '../../../assets/css/less/reset_css/reset_tab.less';
</style>
