
<template>
  <div id="custom_invest"
       class="custom_invest"
       v-loading.fullscreen.lock="data_search.loading">
    <div class="invest_box">
      <el-input placeholder="请输入内容"
                v-model="input3"
                class="input-with-select">
        <el-select v-model="select"
                   slot="prepend"
                   placeholder="请选择">
          <el-option label="餐厅名"
                     value="1"></el-option>
          <el-option label="订单号"
                     value="2"></el-option>
          <el-option label="用户电话"
                     value="3"></el-option>
        </el-select>
        <el-button slot="append"
                   icon="el-icon-search"></el-button>
      </el-input>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import VmEmergePicker from "@/components/common/vm-emerge-picker";
import { eventBus } from '@/components/common/eventBus.js';
export default {
  name: "custom_invest",
  components: {
    VmEmergePicker
  },
  data () {
    return {
    };
  },
  mounted () {
    this.check_passwd();
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
    handleClick () { },

    get_data () {
      this.data_search.loading = true
      this.$axios.get('/yiiapi/investigate/flowsize-timelength-investigation', {
        params: {
          flow_size: this.data_search.flow_size,
          flow_duration: this.data_search.flow_duration,
          host_ip: this.data_search.host_ip,
          start_time: this.data_search.start_time,
          end_time: this.data_search.end_time,
          current_page: this.data_search.page,
          per_page_count: this.data_search.rows
        }
      })
        .then(response => {
          this.data_search.loading = false
          let { status, data } = response.data;
          if (status == '602') {
            return false
          }
          // if (data.count > 10000) {
          //   this.$message({
          //     type: 'warning',
          //     message: '数据超过一万条,请缩小搜索条件!'
          //   });
          //   return false
          // }
          this.data_list = data
          this.data_list_data = data.data
          this.data_list_data.data.forEach((item, index) => {
            item.index_cn = index + 1
          });
        })
        .catch(error => {
          console.log(error);
        })
    },
  },
  filters: {
    filterType: function (val) {
      if (val == '') return;
      if (val == undefined) return;
      if (val == 0) return '0B';
      var k = 1024;
      var size = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(val) / Math.log(k));
      return (val / Math.pow(k, i)).toPrecision(3) + ' ' + size[i]
    }
  }
}
</script>
<style lang="less">
@import '../../../assets/css/less/reset_css/reset_table.less';
@import '../../../assets/css/less/reset_css/reset_invest.less';
@import '../../../assets/css/less/reset_css/reset_tab.less';
</style>



