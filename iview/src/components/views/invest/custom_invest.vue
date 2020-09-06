
<template>
  <div id="custom_invest"
       class="custom_invest"
      >
    <div class="invest_box">
      打算大苏打
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



