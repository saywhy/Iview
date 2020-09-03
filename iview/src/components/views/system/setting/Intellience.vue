<template>
  <div id="system_setting_intellience"
       class="container"
       v-cloak>
    <div class="content_box">
      <div class="network_tab">
        <el-tabs v-model="activeName"
                 @tab-click="handleClick"
                 class="reset_tab">
          <el-tab-pane label="情报源管理"
                       class="tabs-item"
                       name="first">
            <intel-admin v-if="tab_show.first"></intel-admin>
          </el-tab-pane>
          <el-tab-pane label="自定义情报"
                       class="tabs-item"
                       name="second">
            <intel-custom v-if="tab_show.second"></intel-custom>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import intelAdmin from "@/components/views/system/setting/vm-intellience/intellience-admin";
import intelCustom from "@/components/views/system/setting/vm-intellience/intellience-custom";
import { eventBus } from '@/components/common/eventBus.js';
export default {
  components: {
    intelAdmin,
    intelCustom
  },
  name: "system_setting_intellience",
  data () {
    return {
      activeName: "first",
      tab_show: {
        first: true,
        second: false
      }
    };
  },
  mounted () {
    //this.check_passwd()
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
    handleClick (tab, event) {
      console.log(tab);
      switch (tab.name) {
        case "first":
          this.tab_show.first = true;
          this.tab_show.second = false;
          break;
        case "second":
          this.tab_show.first = false;
          this.tab_show.second = true;
          break;
        default:
          break;
      }

    }

  }
}
</script>


<style scoped lang='less'>
@import '../../../../assets/css/less/system/setting/common_box.less';
</style>
<style lang='less'>
@import '../../../../assets/css/less/reset_css/reset_tab.less';
</style>

