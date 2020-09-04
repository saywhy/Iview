<template>
  <div id="role_management"
       v-loading.fullscreen.lock="loading">
    <div class="role_title">
      <el-button type="primary"
                 class="btn_i"
                 @click="add_box">新增</el-button>
      <el-button type="primary"
                 class="btn_o"
                 @click="del_role">删除</el-button>
    </div>
    <div class="role_table">
      <el-table ref="multipleTable"
                class="reset_table"
                align="center"
                border
                :data="role_list.data"
                tooltip-effect="dark"
                @selection-change="handleSelectionChange"
                style="width: 100%">
        <el-table-column type="selection"
                         align="center"
                         :selectable="checkSelectable"
                         width="50">
        </el-table-column>
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
                         label="角色名称"
                         width="180"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="description"
                         align="center"
                         label="角色描述"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="创建时间"
                         align="center"
                         width="220"
                         show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.created_at }}</template>
        </el-table-column>
        <el-table-column prop="creatorname"
                         align="center"
                         label="创建人"
                         width="180"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作"
                         align="center"
                         width="150">
          <template slot-scope="scope">
            <el-button type="primary"
                       v-if="scope.row.creatorname!= 'SYSTEM' "
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
    <!-- 新增 -->
    <el-dialog class="add_box pop_box"
               :close-on-click-modal="false"
               :modal-append-to-body="false"
               :visible.sync="role_state.add">
      <img src="@/assets/images/emerge/closed.png"
           @click="closed_add_box"
           class="closed_img"
           alt="">
      <div class="title">
        <div class="mask"></div>
        <span class="title_name">添加角色</span>
      </div>
      <div class="content">
        <div class="content_item">
          <p>
            <span class="title">角色名称</span>
            <span class="red_necessary">*</span>
          </p>
          <el-input class="select_box"
                    placeholder="请输入角色名称"
                    v-model="role_add.name"
                    clearable>
          </el-input>
        </div>
        <div class="content_item">
          <p>
            <span class="title">角色权限</span>
            <span class="red_necessary">*</span>
          </p>
          <el-tree :data="data"
                   show-checkbox
                   highlight-current
                   ref="tree"
                   node-key="id"
                   :props="defaultProps"
                   :default-expand-all="false">
          </el-tree>
        </div>
        <div class="content_item">
          <p>
            <span class="title">角色描述</span>
          </p>
          <el-input class="select_box"
                    type="textarea"
                    :rows="2"
                    autosize
                    resize='none'
                    placeholder="请输入角色描述"
                    v-model="role_add.describe">
          </el-input>
        </div>
      </div>
      <div class="btn_box">
        <el-button @click="closed_add_box"
                   class="cancel_btn">取消</el-button>
        <el-button class="ok_btn"
                   @click="add_role">确定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog class="add_box pop_box"
               :close-on-click-modal="false"
               :modal-append-to-body="false"
               :visible.sync="role_state.edit">
      <img src="@/assets/images/emerge/closed.png"
           @click="closed_edit_box"
           class="closed_img"
           alt="">
      <div class="title">
        <div class="mask"></div>
        <span class="title_name">编辑角色</span>
      </div>
      <div class="content">
        <div class="content_item">
          <p>
            <span class="title">角色名称</span>
            <span class="red_necessary">*</span>
          </p>
          <el-input class="select_box"
                    placeholder="请输入角色名称"
                    v-model="role_edit.name"
                    clearable>
          </el-input>
        </div>
        <div class="content_item">
          <p>
            <span class="title">角色权限</span>
            <span class="red_necessary">*</span>
          </p>
          <el-tree :data="data"
                   show-checkbox
                   highlight-current
                   ref="tree_edit"
                   node-key="id"
                   :props="defaultProps"
                   :default-expand-all="false">
          </el-tree>
        </div>
        <div class="content_item">
          <p>
            <span class="title">角色描述</span>
          </p>
          <el-input class="select_box"
                    type="textarea"
                    :rows="4"
                    autosize
                    resize='none'
                    placeholder="请输入角色描述"
                    v-model="role_edit.description">
          </el-input>
        </div>
      </div>
      <div class="btn_box">
        <el-button @click="closed_edit_box"
                   class="cancel_btn">取消</el-button>
        <el-button class="ok_btn"
                   @click="edit_role">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import moment from 'moment'
import { eventBus } from '@/components/common/eventBus.js';
export default {
  name: "role_management",
  data () {
    return {
      data: [
        // 首页
        {
          id: 1,
          label: '首页',
          children: [{
            id: 2,
            label: '总览',
          }]
        },
        // 处置
        {
          id: 4,
          label: '处置',
          children: [
            {
              id: 5,
              label: '资产维度',
            },
            {
              id: 6,
              label: '风险维度',
              children: [
                {
                  id: 7,
                  label: '外部威胁',
                },
                {
                  id: 8,
                  label: '本机威胁',
                },
                {
                  id: 9,
                  label: '横向威胁',
                },
                {
                  id: 10,
                  label: '外联威胁',
                }
              ]
            },
            {
              id: 11,
              label: '工单中心',
            },
          ]
        },
        // 告警
        {
          id: 12,
          label: '告警',
        },
        // 追查
        {
          id: 14,
          label: '追查',
          children: [
            {
              id: 15,
              label: 'DNS追查',
            },
            {
              id: 16,
              label: 'IP/URL追查',
            },
            {
              id: 17,
              label: '主机追查',
            },
            {
              id: 18,
              label: '用户追查',
            },
            {
              id: 19,
              label: '文件追查',
            },
            {
              id: 20,
              label: '数据传输追查',
            },
            {
              id: 21,
              label: '流量方向追查',
            },
            {
              id: 22,
              label: 'IOC扫描器',
            },

          ]
        },
        // 报表
        {
          id: 24,
          label: '报表',
          children: [
            {
              id: 25,
              label: '报表生成',
            },
            {
              id: 26,
              label: '报表发送',
            },
          ]
        },
        // 系统
        {
          id: 27,
          label: '系统',
          children: [
            {
              id: 28,
              label: '系统监控',
              children: [
                {
                  id: 29,
                  label: '运行监控',
                },
                {
                  id: 30,
                  label: '安全设备',
                },

              ]
            },
            {
              id: 31,
              label: '系统设置',
              children: [
                {
                  id: 32,
                  label: '配置向导',
                },
                {
                  id: 33,
                  label: '网络配置',
                },
                {
                  id: 34,
                  label: '系统选项',
                },
                {
                  id: 35,
                  label: '受监控IP',
                },
                {
                  id: 36,
                  label: '威胁通知',
                },
                {
                  id: 37,
                  label: '账号管理',
                },
                {
                  id: 38,
                  label: '规则库及白名单',
                },
                {
                  id: 39,
                  label: '情报管理',
                },
                {
                  id: 40,
                  label: '标签管理',
                },
                {
                  id: 41,
                  label: '联动',
                },
                {
                  id: 42,
                  label: '日志',
                },
                {
                  id: 282,
                  label: '恢复/重启',
                },
              ]
            }
          ]
        },
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      role_list: {
      },
      role_data: {
        page: 1,
        rows: 10
      },
      role_state: {
        add: false,
        edit: false
      },
      role_add: {
        name: "",
        describe: "",
        permissions_id: []
      },
      role_edit: {
      },
      old_role_edit: '',
      select_list: [],
      loading: false
    };
  },
  props: {
    option: {
      type: Object,
      default: () => { }
    }
  },
  mounted () {
    this.get_data();
    this.get_version();
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
    // 获取license版本
    get_version () {
      this.$axios.get('/yiiapi/site/LicenseVersion')
        .then(response => {
          let { status, data } = response.data;
          console.log(data.edition);
          if (data.edition == 2) {
            this.data.forEach(element => {
              if (element.label == '追查') {
                element.children.push({
                  id: 23,
                  label: '沙箱',
                })
              }
            });
          }
        })
        .catch(error => {
          console.log(error);
        })
    },
    get_data () {
      this.loading = true
      this.$axios.get('/yiiapi/roles', {
        params: {
          page: this.role_data.page,
          rows: this.role_data.rows
        }
      })
        .then(response => {
          this.loading = false
          console.log(response.data);
          this.role_list = response.data.data;
          this.role_list.data.forEach((item, index) => {
            item.index_cn = index + 1
          });
        })
        .catch(error => {
          console.log(error);
        })
    },
    add_box () {
      this.role_state.add = true;
      this.role_add.name = ''
      this.role_add.describe = ''
      this.role_add.permissions_id = []
      this.resetChecked()
    },
    edit_box (item) {
      this.role_edit = {}
      this.old_role_edit = ''
      this.role_state.edit = true;
      this.old_role_edit = JSON.stringify(item);
      this.role_edit_cn = JSON.stringify(item);
      this.role_edit = JSON.parse(this.role_edit_cn);
      console.log(this.role_edit);
      this.role_edit.permissions_id_cn = JSON.parse(this.role_edit.permissions_id)
      console.log(this.role_edit.permissions_id_cn);
      var setCheckedKeys = []
      this.role_edit.permissions_id_cn.forEach(element => {
        if (element != 1 && element != 13 && element != 23 && element != 123 && element != 76 && element != 132 && element != 58) {
          setCheckedKeys.push(element)
        }
      });
      this.$nextTick(() => {
        this.$refs.tree_edit.setCheckedKeys(setCheckedKeys);
      });
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
    closed_add_box () {
      this.role_state.add = false;
    },
    closed_edit_box () {
      this.role_state.edit = false;
    },
    // tree
    // 添加角色
    add_role () {
      if (this.role_add.name == '') {
        this.$message(
          {
            message: '请输入角色名称',
            type: 'warning',
          }
        );
        return false
      }
      if (this.$refs.tree.getCheckedNodes().length == 0) {
        this.$message(
          {
            message: '请至少选择一项角色权限',
            type: 'warning',
          }
        );
        return false
      }
      // .concat
      this.$refs.tree.getCheckedNodes().forEach(item => {
        this.role_add.permissions_id.push(item.id)
      });
      this.$refs.tree.getHalfCheckedNodes().forEach(item => {
        this.role_add.permissions_id.push(item.id)
      });
      this.loading = true
      this.$axios.post('/yiiapi/roles', {
        Sysrole: {
          name: this.role_add.name,
          description: this.role_add.describe,
          permissions_id: this.role_add.permissions_id,
        }
      })
        .then(response => {
          this.loading = false
          console.log(response);
          if (response.data.status == 0) {
            this.role_state.add = false;
            this.get_data();
            this.$message(
              {
                message: '添加角色成功',
                type: 'success',
              }
            );
          }
        })
        .catch(error => {
          console.log(error);
        })

    },
    // 修改角色
    edit_role () {
      console.log(this.role_edit);
      this.role_edit.permissions_id_edit = [];
      if (this.role_edit.name == '') {
        this.$message(
          {
            message: '请输入角色名称',
            type: 'warning',
          }
        );
        return false
      }
      if (this.$refs.tree_edit.getCheckedNodes().length == 0) {
        this.$message(
          {
            message: '请至少选择一项角色权限',
            type: 'warning',
          }
        );
        return false
      }
      this.$refs.tree_edit.getCheckedNodes().forEach(item => {
        this.role_edit.permissions_id_edit.push(item.id)
      });
      this.$refs.tree_edit.getHalfCheckedNodes().forEach(item => {
        this.role_edit.permissions_id_edit.push(item.id)
      });
      this.$axios.put('/yiiapi/roles/' + this.role_edit.id, {
        Sysrole: {
          old_name: JSON.parse(this.old_role_edit).name,
          name: this.role_edit.name,
          description: this.role_edit.description,
          permissions_id: this.role_edit.permissions_id_edit,
        }
      })
        .then(response => {
          console.log(response);
          if (response.data.status == 0) {
            this.role_state.edit = false;
            this.get_data();
            this.$message(
              {
                message: '修改角色成功！',
                type: 'success',
              }
            );
          } else if (response.data.status == 1) {
            this.$message(
              {
                message: response.data.msg[Object.keys(response.data.msg)[0]][0],
                type: 'error',
              }
            );

          }
        })
        .catch(error => {
          console.log(error);
        })
    },
    // 删除角色
    del_role () {
      console.log(this.select_list);
      if (this.select_list.length == 0) {
        this.$message(
          {
            message: '请选择需要删除的角色！',
            type: 'warning',
          }
        );
        return false
      }
      this.$confirm('此操作删除信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var id_list = []
        this.select_list.forEach(element => {
          id_list.push(element.name)
        });
        this.$axios.delete('/yiiapi/roles/0', {
          data: {
            role_name: id_list
          }
        })
          .then(response => {
            console.log(response.data);
            if (response.data.status == 0) {
              this.get_data();
              this.$message(
                {
                  message: '删除成功！',
                  type: 'success',
                }
              );
            } else {
              this.$message(
                {
                  message: response.data.msg[Object.keys(response.data.msg)[0]][0],
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
    handleSelectionChange (val) {
      this.select_list = val
    },
    // 禁止选中的项目
    checkSelectable (row) {
      return row.creatorname != "SYSTEM"
    },
    getCheckedKeys () {
      console.log(this.$refs.tree.getCheckedKeys());
    },
    setCheckedNodes () {

    },
    setCheckedKeys () {
      // this.$refs.tree.setCheckedKeys([3]);
    },
    resetChecked () {
      this.$refs.tree.setCheckedKeys([]);
    }

  },
  filters: {
    formatDate: function (value) {
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
    }
  },
};
</script>
<style lang='less'>
@import '../../../../../assets/css/less/reset_css/reset_table.less';
@import '../../../../../assets/css/less/reset_css/reset_pop.less';
#role_management {
  .el-dialog {
    width: 440px;
    .el-dialog__body {
      width: 440px;
      .content {
        padding: 24px 0;
        height: 440px;
        overflow-y: auto;
        &::-webkit-scrollbar {
          /*滚动条整体样式*/
          width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
          border-radius: 6px;
        }
        &::-webkit-scrollbar-thumb {
          /*滚动条里面小方块*/
          border-radius: 6px;
          background: #a8a8a8;
        }
        &::-webkit-scrollbar-track {
          /*滚动条里面轨道*/
          border-radius: 6px;
          background: #f4f4f4;
        }
        .content_item {
          margin-bottom: 24px;
          .title {
            font-size: 12px;
            color: #999999;
          }
          .select_box {
            width: 100%;
            min-height: 38px;
            margin-top: 6px;
            .el-input__inner {
              background: #f8f8f8;
              border: 0;
            }
            .el-textarea__inner {
              background: #f8f8f8;
              border: 0;
            }
          }
        }
      }
    }
  }
}
</style>
<style scoped lang="less">
#role_management {
  padding-right: 24px;
  .role_title {
    margin-bottom: 24px;
    .btn_i {
      background: #0070ff;
      color: #fff;
      width: 148px;
      height: 42px;
    }

    .btn_o {
      background: #fff;
      border-color: #0070ff;
      color: #0070ff;
      width: 148px;
      height: 42px;
    }
  }
  .role_table {
    .btn_edit {
      padding: 0;
      background: #5389e0;
      border-radius: 2px;
      width: 72px;
      height: 30px;
    }
  }
  .pagination_box {
    margin-top: 24px;
    text-align: center;
  }
}
</style>
