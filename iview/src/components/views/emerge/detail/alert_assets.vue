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
                    :data="alert.new"
                    tooltip-effect="dark">
            <el-table-column prop="time"
                             label="告警时间"
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
                             label="方向"
                             align="center"
                             width="150"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="time"
                             label="方向"
                             align="center"
                             width="150"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="time"
                             label="方向"
                             align="center"
                             width="150"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="time"
                             label="方向"
                             align="center"
                             width="150"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="time"
                             label="方向"
                             align="center"
                             width="150"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="time"
                             label="源账号"
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
                             label="源账号"
                             align="center"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="time"
                             label="源账号"
                             align="center"
                             width="150"
                             show-overflow-tooltip>
            </el-table-column>
          </el-table>

        </el-tab-pane>
        <el-tab-pane label="历史告警资产"
                     class="tabs-item"
                     name="2">
          <div class="reset_item_box">

          </div>
        </el-tab-pane>
      </el-tabs>

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
      }
    }
  },
  methods: {
    handleClick () { }
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