<template>
    <div id="system_setting_wizard" v-loading.fullscreen.lock="loading" v-cloak>
      <div class="wizard_top">
        <div class="wizard_top_title">
          <i class="dt_img"></i>
          <h3 class="title">网络配置</h3>
          <el-button class="s-download">下载</el-button>
        </div>
        <div class="wizard_top_content">
          <div class="bom_item">
            <li class="item">
              <span class="title">网络设备：</span>
              <span class="content">ens32</span>
            </li>
            <li class="item">
              <span class="title">角色：</span>
              <span class="content">管理口</span>
            </li>
            <li class="item">
              <span class="title">是否启用：</span>
              <span class="content"><el-switch v-model="wizard.switch">
        </el-switch></span>
            </li>
            <li class="item">
              <span class="title">获取IP方式：</span>
              <span class="content">手工获取</span>
            </li>
            <li class="item">
              <span class="title">IP地址：</span>
              <span class="content">192.168.1.101</span>
            </li>
          </div>
          <div class="bom_item">
            <li class="item">
              <span class="title">子网掩码：</span>
              <span class="content">255.255.255.0</span>
            </li>
            <li class="item">
              <span class="title">默认网关：</span>
              <span class="content">192.168.2.1</span>
            </li>
            <li class="item">
              <span class="title">首选DNS服务器：</span>
              <span class="content">http://dns.aizhan.com/</span>
            </li>
            <li class="item">
              <span class="title">备用DNS服务器：</span>
              <span class="content">http://dns.aizhan.com/</span>
            </li>
          </div>
        </div>

      </div>
      <div class="wizard_bom">
        <div class="wizard_bom_title">
          <h3 class="title">安全设备列表</h3>
        </div>
        <div class="wizard_bom_content">
          <el-table ref="multipleTable"
                    class="reset_table"
                    align="center"
                    border
                    :data="role_list.data"
                    tooltip-effect="dark"
                    @selection-change="handleSelectionChange"
                    style="width: 100%">
            <el-table-column prop="index"
                             align="center"
                             label="序号"
                             width="50"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                {{(role_data.page-1)*(role_data.rows) + scope.row.index_cn}}
              </template>
            </el-table-column>
            <el-table-column prop="name"
                             align="center"
                             label="IP段名称"
                             width="180"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="description"
                             align="center"
                             label="IP地址段"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="type"
                             align="center"
                             label="网络类型"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="label"
                             align="center"
                             label="标签"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="更新日期"
                             align="center"
                             width="220"
                             show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.created_at*1000 |formatDate }}</template>
            </el-table-column>
            <el-table-column label="操作"
                             align="center"
                             width="150">
              <template slot-scope="scope">
                <el-button type="primary"
                           class="btn_edit"
                           @click.stop='edit_box(scope.row)'>编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination class="pagination_box"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :current-page="role_list.pageNow"
                         :page-sizes="[10,20,50,100]"
                         :page-size="10"
                         layout="total, sizes, prev, pager, next"
                         :total="role_list.count">
          </el-pagination>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import moment from 'moment'
  export default {
      name: "system_setting_wizard",
      data () {
        return {
          wizard: {
            switch:true
          },
          role_list: {},
          role_data: {
            page: 1,
            rows: 10
          },
        };
      },
      mounted () {
        this.get_data();
      },
      methods:{
        get_data () {
          this.loading = true
          this.$axios.get('/yiiapi/user/role-list', {
            params: {
              page: this.role_data.page,
              rows: this.role_data.rows
            }
          })
            .then(response => {
              this.loading = false
              this.role_list = response.data.data;
              this.role_list.data.forEach((item, index) => {
                item.index_cn = index + 1
              });
            })
            .catch(error => {
              console.log(error);
            })
        },
        handleSelectionChange (val) {
          this.select_list = val
        },
        // 禁止选中的项目
        checkSelectable (row) {
          return row.creatorname != "SYSTEM"
        },
        // 分页
        handleSizeChange (val) {
          this.role_data.rows = val;
          this.role_data.page = 1
          this.get_data();
        },
        handleCurrentChange (val) {
          this.role_data.page = val
          this.get_data();
        },
      },
      filters: {
        formatDate: function (value) {
          return moment(value).format('YYYY-MM-DD HH:mm:ss')
        }
      },
    }
</script>

<style scoped lang="less">
  #system_setting_wizard{
    padding: 24px 56px 24px 24px;
    text-align: left;
    .wizard_top{
      width: 100%;
      height: auto;
      background: #fff;
      margin-bottom: 24px;
      border-radius: 4px;
      .wizard_top_title {
        padding: 0 24px;
        height: 60px;
        line-height: 60px;
        font-size: 0;
        text-align: left;
        position: relative;
        border-bottom: 1px solid #ececec;
        .dt_img{
          width: 24px;
          height: 24px;
          vertical-align: middle;
          margin-top: -14px;
          display: inline-block;
          background-image: url("../../../../assets/images/system/sys3.png");
          background-size: 24px 24px;
        }
        .title{
          display: inline-block;
          font-family: PingFangSC-Medium;
          font-size: 18px;
          color: #333333;
          text-align: center;
          margin-left: 10px;
        }
        /deep/
        .s-download{
          position: absolute;
          color: #fff;
          top: 13px;
          right: 24px;
          width: 124px;
          height: 34px;
          line-height: 0;
          border-width: 0;
          background: #0070FF;
        }
      }
      .wizard_top_content {
        padding: 16px 24px;
        background: #fff;
        display: flex;
        .bom_item {
          flex: 1;
          li.item {
            display: flex;
            margin-bottom: 16px;
            line-height: 28px;
            .title {
              width: 150px;
              font-family: PingFang;
              font-size: 16px;
              color: #333333;
              .b_i {
                width: 18px;
                height: 16px;
                margin-right: 8px;
                display: inline-block;
                &.b_name {
                  vertical-align: unset;
                  background-repeat: no-repeat;
                  background-size: 18px 16px;
                  background-image: url('../../../../assets/images/handle/others/works-name.png');
                }
              }
            }
            .content {
              flex: 1;
              font-size: 16px;
              color: #666;
              &.Goto_workorder {
                color: #0070ff;
                cursor: pointer;
              }
              .tag_btn_box {
                margin: 0 2px;
                display: inline-block;
                height: 20px;
                padding: 0 3px;
                border-radius: 2px;
                color: #ffffff;
                background: #5389e0;
                text-align: center;
                .tag_btn {
                  height: 20px;
                  font-size: 10px;
                  line-height: 20px;
                  font-family: PingFang;
                  transform: scale(0.8);
                  display: block;
                }
              }
              .status {
                background: #eef6ff;
                border-radius: 2px;
                font-size: 10px;
                color: #999999;
                padding: 5px 14px;
              }
              /deep/
              .el-switch{
                .el-switch__core{
                  width: 36px!important;
                  @media screen and (max-width: 1601px){
                    &:after{
                      top: 0;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    .wizard_bom{
      width: 100%;
      height: 690px;
      background: #fff;
      border-radius: 4px;
      .wizard_bom_title{
        padding: 0 24px;
        height: 60px;
        line-height: 60px;
        text-align: left;;
        .title{
          display: inline-block;
          font-family: PingFangSC-Medium;
          font-size: 18px;
          color: #333333;
          text-align: center;
        }
      }
      .wizard_bom_content{
        padding: 0 24px;
        .btn_edit {
          padding: 0;
          background: #5389e0;
          border-radius: 2px;
          width: 72px;
          height: 30px;
        }
      }
    }
  }
</style>
<style lang="less">
@import '../../../../assets/css/less/reset_css/reset_table.less';
</style>
