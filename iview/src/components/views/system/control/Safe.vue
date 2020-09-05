<template>
  <div id="system_control_safe" class="container" v-cloak
       v-loading.fullscreen.lock="loading">
    <div class="content_box">
      <div class="monitor_name">
        <h3 class="name">安全设备列表</h3>
      </div>
      <div class="monitor_title">
        <el-button type="primary"
                   class="btn_i"
                   @click="add_monitor('','add')">添加设备</el-button>
        <el-button type="primary"
                   class="btn_o"
                   @click="del_monitor">删除</el-button>
      </div>
      <div class="monitor_table">
        <el-table ref="multipleTable"
                  class="reset_table"
                  align="center"
                  :data="monitor_data.data"
                  tooltip-effect="dark"
                  style="width: 100%"
                  border
                  @row-click="detail_click"
                  @header-click="header_click"
                  @mousedown.native="mousedown"
                  @mouseup.native="mouseup"
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection"
                           align="center"
                           width="50">
          </el-table-column>
          <el-table-column prop="name"
                           align="center"
                           label="设备名称"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="ip"
                           align="center"
                           label="IP"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="type"
                           align="center"
                           label="主机类别"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="创建日期"
                           align="center"
                           width="180"
                           show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.updated_at }}</template>
          </el-table-column>
          <el-table-column align="center"
                           label="状态"
                           show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.status | statusSafe }}</template>
          </el-table-column>
          <el-table-column label="操作"
                           align="center">
            <template slot-scope="scope">
              <el-button type="primary"
                         class="btn_edit"
                         @click.stop='download_box(scope.row)'>日志下载</el-button>
              <el-button type="primary"
                         class="btn_edit"
                         @click.stop="add_monitor(scope.row,'edit')">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination class="pagination_box"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="monitor_data.pageNow"
                       :page-sizes="[10,20,50,100]"
                       :page-size="monitor_data.rows"
                       layout="total, sizes, prev, pager, next"
                       :total="monitor_data.count">
        </el-pagination >
      </div>

      <!-- 添加/编辑 -->
      <el-dialog class="add_box pop_box"
                 :close-on-click-modal="false"
                 :modal-append-to-body="false"
                 :visible.sync="monitor_state.tab">
        <img src="@/assets/images/emerge/closed.png"
             @click="closed_cancel_box"
             class="closed_img"
             alt="">
        <div class="title">
          <div class="mask"></div>
          <span class="title_name" v-if="monitor_state.type == 'add'">添加设备</span>
          <span class="title_name" v-if="monitor_state.type == 'edit'">编辑设备</span>
        </div>
        <div class="content">
          <div class="content_item_box">
            <div class="content_item">
              <p>
                <span class="title">工单名称</span>
                <!--<span class="title_color">*</span>-->
              </p>
              <el-input class="select_box"
                        placeholder="请输入工单名称"
                        v-model="monitor_add.name"
                        clearable>
              </el-input>
            </div>
            <div class="content_item">
              <p>
                <span class="title">IP地址</span>
              </p>
              <el-input class="select_box"
                        placeholder="请输入IP地址"
                        v-model="monitor_add.ip"
                        clearable>
              </el-input>
            </div>
            <div class="content_item">
              <p>
                <span class="title">端口</span>
              </p>
              <el-input class="select_box"
                        placeholder="请输入端口"
                        v-model="monitor_add.port"
                        clearable>
              </el-input>
            </div>
            <div class="content_item">
              <p>
                <span class="title">CPU</span>
              </p>
              <el-input class="select_box"
                        placeholder="1.2.3.1.4.1.2011.1.1.1.10.11111"
                        v-model="monitor_add.cpu"
                        clearable>
              </el-input>
            </div>
            <div class="content_item">
              <p>
                <span class="title">Disk</span>
              </p>
              <el-input class="select_box"
                        placeholder="1.2.3.1.4.1.2011.1.1.1.10.11111"
                        v-model="monitor_add.disk"
                        clearable>
              </el-input>
            </div>
          </div>
          <div class="content_item_space"></div>
          <div class="content_item_box">
            <div class="content_item">
              <p>
                <span class="title">主机类型</span>
                <!--<span class="title_color">*</span>-->
              </p>
              <el-input class="select_box"
                        placeholder="请输入主机类型"
                        v-model="monitor_add.type"
                        clearable>
              </el-input>
            </div>
            <div class="content_item">
              <p>
                <span class="title">snmp服务器</span>
              </p>
              <el-select class="select_box"
                         v-model="monitor_add.snmp"
                         placeholder="请选择snmp服务器类型">
                <el-option v-for="item in monitor_add.snmp_list"
                           :key="item"
                           :label="item"
                           :value="item">
                </el-option>
              </el-select>
            </div>
            <div class="content_item">
              <p>
                <span class="title">字符串</span>
              </p>
              <el-input class="select_box"
                        placeholder="请输入字符串"
                        v-model="monitor_add.character"
                        clearable>
              </el-input>
            </div>
            <div class="content_item">
              <p>
                <span class="title">Memory</span>
              </p>
              <el-input class="select_box"
                        placeholder="1.2.3.1.4.1.2011.1.1.1.10.11111"
                        v-model="monitor_add.memory"
                        clearable>
              </el-input>
            </div>
          </div>
        </div>
        <div class="btn_box">
          <el-button @click="closed_cancel_box"
                     class="cancel_btn">取消</el-button>
          <el-button class="ok_btn" v-if="monitor_state.type == 'add'"
                     @click="submit_add_box">确定</el-button>
          <el-button class="ok_btn" v-if="monitor_state.type == 'edit'"
                     @click="submit_edit_box">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import moment from 'moment'
  import { pca, pcaa } from "area-data";
  import { eventBus } from '@/components/common/eventBus.js';
  export default {
    name: "system_control_monitor",
    data () {
      return {
        loading:false,
        detail_click_val: {},
        detail_click_column: {},
        oldPositon: {
          x: '',
          y: ''
        },
        newPositon: {
          x: '',
          y: ''
        },
        monitor_data: {},
        monitor_page: {
          page: 1,
          rows: 10,
        },
        monitor_state: {
          tab: false,
          type: 'add',
          import: false,
          import_loading: false
        },
        monitor_add: {
          id:'',
          name: "",
          type: "",
          ip: "",
          snmp: "",
          snmp_list: ['V1','V2','V3'],
          port: "",
          character: "",
          cpu: "",
          memory:"",
          disk:""
        },
        select_list: [],
      };
    },
    mounted () {
      this.get_data();
    },
    methods: {
      // 获取列表
      get_data () {
        this.loading = true;
        this.$axios.get('/yiiapi/safetyequipments', {
          params: {
            page: this.monitor_page.page,
            rows: this.monitor_page.rows,
          }
        })
          .then(resp => {
            this.loading = false;
            let {status,data} = resp.data;

            if(status == 0){
              let datas = {
                count:data.count,
                data:data.data,
                pageNow:data.pageNow * 1,
                rows:data.rows * 1
              }
             // console.log(data.data)
              this.monitor_data = datas;
            }

          })
          .catch(error => {
            console.log(error);
          })
      },
      // 分页
      handleSizeChange (val) {
        this.monitor_page.rows = val;
        this.monitor_page.page = 1;
        this.get_data();
      },
      handleCurrentChange (val) {
        this.monitor_page.page = val;
        this.get_data();
      },
      //全选择
      handleSelectionChange (val) {
        this.select_list = val;
      },
      //删除确定
      del_monitor () {
        if(this.select_list.length == 0) {
          this.$message(
            {
              message: '请选择需要删除的数据！',
              type: 'warning',
            }
          );
          return false
        }
        this.$confirm(`是否将已勾选的 ${this.select_list.length}项删除, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var id_list = []
          this.select_list.forEach(element => {
            id_list.push(element.id);
          });
          this.$axios.delete('/yiiapi/safetyequipments/'+ id_list)
            .then(resp => {
              console.log(resp);
              let {status,data} = resp.data;
              if (status == 0) {
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
                    message: '删除失败！',
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
          this.$refs.multipleTable.clearSelection();
        });
      },
      //添加设备
      add_monitor(row,type) {
        this.monitor_state.tab = true;
        this.monitor_state.type = type;

        this.monitor_add.id = '';
        this.monitor_add.name = '';
        this.monitor_add.type = '';
        this.monitor_add.ip = '';

        this.monitor_add.snmp = '';
        this.monitor_add.port = '';
        this.monitor_add.character = '';
        this.monitor_add.cpu = '';
        this.monitor_add.memory = '';
        this.monitor_add.disk = '';

        if(row){
          this.monitor_add.id = row.id;
          this.monitor_add.name = row.name;
          this.monitor_add.type = row.type;
          this.monitor_add.ip = row.ip;

          this.monitor_add.snmp = row.snmp;
          this.monitor_add.port = row.port;
          this.monitor_add.character = row.string;
          this.monitor_add.cpu = row.cpu;
          this.monitor_add.memory = row.memory;
          this.monitor_add.disk = row.disk;
        }
      },

      //取消
      closed_cancel_box () {
        this.monitor_state.tab = false;
      },

      //添加确定
      submit_add_box () {
        var pattern = new RegExp("[`~!#%$^&*()=|{}':;',\\[\\]<>《》/?~！#￥……&*（）|{}【】‘；：”“'。，、？]");
        if (this.monitor_add.name == '') {
          this.$message(
            {
              message: '工单名称不能为空！',
              type: 'warning',
            }
          );
          return false
        }

        if (this.monitor_add.type == '') {
          this.$message(
            {
              message: '请选择snmp服务器类型！',
              type: 'warning',
            }
          );
          return false
        }
        if (this.monitor_add.ip == '') {
          this.$message(
            {
              message: 'IP地址不能为空。',
              type: 'warning',
            }
          );
          return false
        }
        if (pattern.test(this.monitor_add.name)) {
          this.$message({
            message: '工单名称不能包含特殊字符！',
            type: 'warning',
          });
          return false
        }
        this.$axios.post('/yiiapi/safetyequipments', {
          SafetyEquipment: {
            name: this.monitor_add.name,
            type: this.monitor_add.type,
            ip: this.monitor_add.ip,
            string:this.monitor_add.character,
            cpu:this.monitor_add.cpu,
            memory:this.monitor_add.memory,
            disk:this.monitor_add.disk,
            port:this.monitor_add.port,
            snmp:this.monitor_add.snmp
          }
        })
          .then(resp => {
            console.log(resp);

            let {status,msg,data} = resp.data;

            if (status == 0) {
              this.monitor_state.tab = false;
              this.get_data();
              this.$message(
                {
                  message: '添加成功',
                  type: 'success',
                }
              );
            } else {
              this.$message(
                {
                  message: msg,
                  type: 'error',
                }
              );
            }
          })
          .catch(error => {
            console.log(error);
          })
      },

      //编辑确定
      submit_edit_box () {
        var pattern = new RegExp("[`~!#%$^&*()=|{}':;',\\[\\]<>《》/?~！#￥……&*（）|{}【】‘；：”“'。，、？]");
        if (this.monitor_add.name == '') {
          this.$message(
            {
              message: '工单名称不能为空！',
              type: 'warning',
            }
          );
          return false
        }
        if (this.monitor_add.type == '') {
          this.$message(
            {
              message: '请选择snmp服务器类型！',
              type: 'warning',
            }
          );
          return false
        }
        if (this.monitor_add.ip == '') {
          this.$message(
            {
              message: 'IP地址不能为空。',
              type: 'warning',
            }
          );
          return false
        }
        if (pattern.test(this.monitor_add.name)) {
          this.$message({
            message: '工单名称不能包含特殊字符！',
            type: 'warning',
          });
          return false
        }
        this.$axios.put('/yiiapi/safetyequipments/'+this.monitor_add.id, {
          SafetyEquipment: {
            name: this.monitor_add.name,
            type: this.monitor_add.type,
            ip: this.monitor_add.ip,
            string:this.monitor_add.character,
            cpu:this.monitor_add.cpu,
            memory:this.monitor_add.memory,
            disk:this.monitor_add.disk,
            port:this.monitor_add.port,
            snmp:this.monitor_add.snmp
          }
        })
          .then(resp => {
            let {status,msg,data} = resp.data;

            if (status == 0) {
              this.monitor_state.tab = false;
              this.get_data();
              this.$message(
                {
                  message: '编辑成功',
                  type: 'success',
                }
              );
            } else {
              this.$message(
                {
                  message: msg,
                  type: 'error',
                }
              );
            }
          })
          .catch(error => {
            console.log(error);
          })
      },

      //日志下载
      download_box(row){
        var url = '/yiiapi/safetyequipment/DownloadLog?ip='+row.ip;
        window.location.href = url;
      },
      /************************************/
      //进入详情页面
      detail_click (val, column, cell) {
        this.detail_click_val = val
        this.detail_click_column = column
      },
      header_click (val) {
        this.detail_click_val = {}
      },
      mousedown (event) {
        this.oldPositon = {
          x: '',
          y: ''
        }
        this.newPositon = {
          x: '',
          y: ''
        }
        this.oldPositon.x = event.clientX;
        this.oldPositon.y = event.clientY;
      },
      mouseup (event) {
        this.newPositon.x = event.clientX;
        this.newPositon.y = event.clientY;
        if (this.oldPositon.x == this.newPositon.x) {
          setTimeout(() => {
            if (this.detail_click_val.id) {
              console.log('点击详情');
              if (Object.keys(this.detail_click_column).length != 0 && this.detail_click_column.type != 'selection') {
                this.$router.push({
                  path: '/detail/safe', name: 'detail_safe',
                  query: { id: '0'}
                });
              }
            } else {
              console.log('点击头部');
            }
          }, 10);
        } else {
          console.log('复制');
        }
      },
    },
    filters: {
      statusSafe:function(value){
        let attr = '';
        if(value == 0){
          attr = '正常';
        }else if(value == 1) {
          attr = '告警';
        }
        return attr;
      },
      formatDate: function (value) {
        return moment(value).format('YYYY-MM-DD HH:mm:ss')
      },
      upper: function (value) {
        let num = '';
        switch (value) {
          case 1:
            num =  '一';
            break;
          case 2:
            num =  '二';
            break;
          case 3:
            num =  '三';
            break;
          case 4:
            num =  '四';
            break;
          case 5:
            num =  '五';
            break;
          case 6:
            num =  '六';
            break;
          case 7:
            num =  '七';
            break;
          case 8:
            num =  '八';
            break;
          case 9:
            num =  '九';
            break;
          case 10:
            num = '十';
            break;
          default:
            num = ''
            break;
        }
        return num;
      }

    },
  };
</script>
<style lang='less'>
  #system_control_safe {
    .add_box {
      .el-dialog {
        width: 900px;
        .el-dialog__body {
          width: 900px;
          .content {
            padding: 24px 10px;
            display: flex;
            height: 500px;
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
            .content_item_box {
              flex: 1;
              .content_item {
                margin-bottom: 24px;
                .item_addrs {
                  margin-bottom: 12px;
                  display: flex;
                }
                .img_box {
                  width: 16px;
                  height: 16px;
                  margin-left: 10px;
                  margin-top: 14px;
                  cursor: pointer;
                }
                .title {
                  font-size: 12px;
                  color: #999999;
                }
                .title_color {
                  color: #ff5f5c;
                }
                .select_box {
                  width: 100%;
                  height: 38px;
                  margin-top: 6px;
                  .el-input__inner {
                    background: #f8f8f8;
                    border: 0;
                  }
                }
                .el-cascader {
                  width: 100%;
                }
              }
            }
            .content_item_space {
              width: 20px;
            }
          }
        }
      }
    }
  }
</style>
<style scoped lang='less'>
  @import '../../../../assets/css/less/system/setting/common_box.less';
  #system_control_safe {
    .content_box {
      .monitor_name{
        margin-bottom: 24px;
        .name{
          font-family: PingFangSC-Medium;
          font-size: 18px;
          color: #333333;
          font-weight: 500;
        }
      }
      .monitor_title {
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
      .monitor_table {
        padding-right: 24px;
        .pagination_box {
          margin-top: 24px;
          text-align: center;
        }
        .btn_tag_box {
          margin: 2px;
          .btn_tag {
            background: #5389e0;
            border-radius: 2px;
            min-height: 20px;
            font-size: 10px;
            color: #ffffff;
            padding: 2px 5px;
          }
        }
        .btn_edit {
          padding: 0;
          background: #5389e0;
          border-radius: 2px;
          width: 72px;
          height: 30px;
          font-size: 14px;
        }
      }
    }
    /deep/
    .pop_state_box {
      .el-dialog {
        height: 260px;
        width: 480px;
        .el-dialog__header {
          display: none;
        }
        .el-dialog__body {
          padding: 30px;
          .closed_img {
            position: absolute;
            top: -18px;
            right: -18px;
            cursor: pointer;
            width: 46px;
            height: 46px;
          }
          .title {
            height: 24px;
            line-height: 24px;
            text-align: left;

            .title_name {
              font-size: 20px;
              color: #333333;
              line-height: 24px;
            }

            .mask {
              width: 24px;
              height: 0px;
              border-top: 0px;
              border-right: 2px solid transparent;
              border-bottom: 5px solid #0070ff;
              border-left: 2px solid transparent;
              transform: rotate3d(0, 0, 1, 90deg);
              display: inline-block;
              margin-right: -5px;
              margin-bottom: 4px;
              margin-left: -10px;
            }
          }
          .content {
            height: 128px;
            padding-top: 48px;
            font-size:0;
            text-align: center;
            span{
              font-size: 14px;
            }
          }
          .btn_box {
            height: 42px;
            text-align: center;
            margin-bottom: 24px;

            .ok_btn {
              width: 136px;
              height: 42px;
              background: #0070ff;
              color: #fff;
              border: 1px solid #0070ff;
            }

            .cancel_btn {
              width: 134px;
              height: 42px;
              border-color: #0070ff;
              background: #fff;
              color: #0070ff;
            }
          }
        }
      }
    }
  }
</style>

<style lang="less">
  @import '../../../../assets/css/less/reset_css/reset_table.less';
  @import '../../../../assets/css/less/reset_css/reset_pop.less';
</style>
