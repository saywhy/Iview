<template>
  <div id="intellience-custom" v-cloak
       v-loading.fullscreen.lock="loading">
    <div class="custom-top">
      <el-select class="select_box"
                 v-model="intel_name"
                 placeholder="请选择情报源管理设备">
        <el-option v-for="item in intel_attr"
                   :key="item.name"
                   :label="item.name"
                   :value="item.name">
        </el-option>
      </el-select>
      <el-button class="c_search">搜索</el-button>
      <div class="c_btn_group">
        <el-button class="c_add" @click="add_box">添加情报</el-button>
        <el-button class="c_exp" @click="exp_box">批量导入/导出</el-button>
      </div>
    </div>
    <div class="custom-bom">
      <el-table ref="multipleTable"
                class="reset_table"
                align="center"
                border
                :data="role_list.data"
                tooltip-effect="dark"
                @selection-change="handleSelectionChange"
                style="width: 100%">
        <el-table-column prop="name"
                         align="center"
                         label="指标"
                         width="180"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="description"
                         align="center"
                         label="指标类型"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="type"
                         align="center"
                         label="描述"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="label"
                         align="center"
                         label="威胁度"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="置信度"
                         align="center"
                         show-overflow-tooltip>
          <template slot-scope="scope">
          <span class="btn_alert_background"
                :class="{'high_background':scope.row.degree =='高',
                      'mid_background':scope.row.degree =='中',
                      'low_background':scope.row.degree =='低'}">
            {{ scope.row.degree | degree_sino }}</span>
          </template>
        </el-table-column>
        <el-table-column label="导入时间"
                         align="center"
                         width="180">
          <template slot-scope="scope">{{ scope.row.created_at*1000 |formatDate }}</template>
        </el-table-column>
        <el-table-column label="操作"
                         align="center"
                         width="180">
          <template slot-scope="scope">
            <el-button type="primary"
                       class="btn_edit"
                       @click.stop='edit_box(scope.row)'>编辑</el-button>
            <el-button type="primary"
                       class="btn_edit"
                       @click.stop='remove_box(scope.row)'>删除</el-button>
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

    <!-- 添加 -->
    <el-dialog class="add_box pop_box"
               :close-on-click-modal="false"
               :modal-append-to-body="false"
               :visible.sync="intel_state.add">
      <img src="@/assets/images/emerge/closed.png"
           @click="closed_add_box"
           class="closed_img"
           alt="">
      <div class="title">
        <div class="mask"></div>
        <span class="title_name">添加情报</span>
      </div>
      <div class="content">
        <div class="content_item_box">
          <div class="content_item">
            <p>
              <span class="title">指标</span>
            </p>
            <el-input class="select_box"
                      placeholder="请输入指标"
                      v-model="intel_add.index"
                      clearable>
            </el-input>
          </div>
          <div class="content_item">
            <p>
              <span class="title">威胁度</span>
            </p>
            <el-select class="select_box"
                       v-model="intel_add.threat"
                       placeholder="请选择威胁度">
              <el-option v-for="item in intel_list.threats"
                         :key="item"
                         :label="item"
                         :value="item">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="content_item_space">
        </div>
        <div class="content_item_box">
          <div class="content_item">
            <p>
              <span class="title">指标类型</span>
            </p>
            <el-select class="select_box"
                       v-model="intel_add.type"
                       placeholder="请选择指标类型">
              <el-option v-for="item in intel_list.types"
                         :key="item"
                         :label="item"
                         :value="item">
              </el-option>
            </el-select>
          </div>
          <div class="content_item">
            <p>
              <span class="title">置信度</span>
            </p>
            <el-input class="select_box"
                      placeholder="请输入置信度"
                      v-model="intel_add.degree"
                      clearable>
            </el-input>
          </div>
        </div>
      </div>
      <div class="content_sec">
        <div class="content_item">
          <p>
            <span class="title">描述</span>
          </p>
          <el-input class="select_box_textarea"
                    type="textarea"
                    :rows="4"
                    placeholder="请输入描述"
                    v-model="intel_add.describe"
                    clearable>
          </el-input>
        </div>
      </div>
      <div class="btn_box">
        <el-button @click="closed_add_box"
                   class="cancel_btn">取消</el-button>
        <el-button class="ok_btn"
                   @click="submit_add_box">确定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog class="add_box pop_box"
               :close-on-click-modal="false"
               :modal-append-to-body="false"
               :visible.sync="intel_state.edit">
      <img src="@/assets/images/emerge/closed.png"
           @click="closed_edit_box"
           class="closed_img"
           alt="">
      <div class="title">
        <div class="mask"></div>
        <span class="title_name">编辑情报</span>
      </div>
      <div class="content">
        <div class="content_item_box">
          <div class="content_item">
            <p>
              <span class="title">指标</span>
            </p>
            <el-input class="select_box"
                      placeholder="请输入指标"
                      v-model="intel_add.index"
                      clearable>
            </el-input>
          </div>
          <div class="content_item">
            <p>
              <span class="title">威胁度</span>
            </p>
            <el-select class="select_box"
                       v-model="intel_add.threat"
                       placeholder="请选择威胁度">
              <el-option v-for="item in intel_list.threats"
                         :key="item"
                         :label="item"
                         :value="item">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="content_item_space">
        </div>
        <div class="content_item_box">
          <div class="content_item">
            <p>
              <span class="title">指标类型</span>
            </p>
            <el-select class="select_box"
                       v-model="intel_add.type"
                       placeholder="请选择指标类型">
              <el-option v-for="item in intel_list.types"
                         :key="item"
                         :label="item"
                         :value="item">
              </el-option>
            </el-select>
          </div>
          <div class="content_item">
            <p>
              <span class="title">置信度</span>
            </p>
            <el-input class="select_box"
                      placeholder="请输入置信度"
                      v-model="intel_add.degree"
                      clearable>
            </el-input>
          </div>
        </div>
      </div>
      <div class="content_sec">
        <div class="content_item">
          <p>
            <span class="title">描述</span>
          </p>
          <el-input class="select_box_textarea"
                    type="textarea"
                    :rows="4"
                    placeholder="请输入描述"
                    v-model="intel_add.describe"
                    clearable>
          </el-input>
        </div>
      </div>
      <div class="btn_box">
        <el-button @click="closed_edit_box"
                   class="cancel_btn">取消</el-button>
        <el-button class="ok_btn"
                   @click="submit_edit_box">确定</el-button>
      </div>
    </el-dialog>
    <!-- 批量导入 -->
    <el-dialog class="add_box pop_box"
               :close-on-click-modal="false"
               :modal-append-to-body="false"
               :visible.sync="intel_state.exp">
      <img src="@/assets/images/emerge/closed.png"
           @click="closed_exp_box"
           class="closed_img"
           alt="">
      <div class="title">
        <div class="mask"></div>
        <span class="title_name">批量导入</span>
      </div>
      <div class="content_exp">
        <view-upload></view-upload>
      </div>
      <div class="btn_box">
        <el-button @click="closed_exp_box"
                   class="cancel_btn">取消</el-button>
        <el-button class="ok_btn"
                   @click="submit_exp_box">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import moment from 'moment';
  import { eventBus } from '@/components/common/eventBus.js';

  import viewUpload from './view-upload'
  export default {
    name: "intellience-custom",
    components:{viewUpload},
    data () {
      return {
        key: "",
        intel_lists: [],
        loading: false,
        intel_name:'',
        intel_attr:[{name:'ss'},{name:'cc'},{name:'dd'}],
        role_list: {},
        role_data: {
          page: 1,
          rows: 10
        },
        intel_state:{
          add:false,
          edit:false,
          exp:true
        },
        intel_add:{
          index:'',
          threat:'',
          degree:'',
          type:'',
          describe:''
        },
        intel_list:{
          threats:['高危','中危','低危'],
          types:['指标类型','指标类型1']
        },
      };
    },
    props: {
      option: {
        type: Object,
        default: () => { }
      }
    },
    mounted () {
      this.get_data()
    },
    methods: {
      get_data () {
        this.loading = true;
        this.$axios.get('/yiiapi/user/role-list', {
          params: {
            page: this.role_data.page,
            rows: this.role_data.rows
          }
        })
          .then(response => {
            this.loading = false;
            this.role_list = response.data.data;
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
      ////////////////////////////////////////////////
      add_box() {
        this.intel_state.add = true;
      },
      closed_add_box () {
        this.intel_state.add = false;
      },
      submit_add_box() {

      },
      //编辑
      edit_box() {
        this.intel_state.edit = true;
      },
      closed_edit_box () {
        this.intel_state.edit = false;
      },
      submit_edit_box() {

      },
      //批量导入
      exp_box() {
        this.intel_state.exp = true;
      },
      closed_exp_box(){
        this.intel_state.exp = false;
      },
      submit_exp_box(){
        this.intel_state.exp = false;
      },
      //删除
      remove_box(){

         this.$confirm('此操作删除信息, 是否继续?', '提示', {
           confirmButtonText: '确定',
           cancelButtonText: '取消',
           type: 'warning'
         }).then(() => {
           var id_list = []
           this.select_list.forEach(element => {
             id_list.push(element.id)
           });
           this.$axios.delete('/yiiapi/ipsegment/del', {
             data: {
               id: '11'
             }
           })
             .then(response => {
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
         });
      },
    },
    filters: {
      formatDate: function (value) {
        return moment(value).format('YYYY-MM-DD HH:mm:ss')
      }
    }
  };
</script>

<style scoped lang="less">
  #intellience-custom {
    text-align: left;
    .custom-top{
      width: 100%;
      display: block;
      font-size: 0;
      padding-right: 24px;
      /deep/
      .select_box {
        width: 360px;
        .el-input__inner {
          width: 360px;
          background: #f8f8f8 !important;
        }
      }
      /deep/
      .c_search{
        background: #0070FF;
        width: 102px;
        color: #fff;
        border: 1px solid #0070FF;
        outline: none;
        margin-left: 24px;
      }
      .c_btn_group{
        float: right;
        font-size: 0;
        /deep/
        .c_add{
          background: #0070FF;
          width: 148px;
          color: #fff;
          border: 1px solid #0070FF;
          outline: none;
          margin-left: 8px;
        }
        /deep/
        .c_exp{
          background: #fff;
          width: 148px;
          color: #0070FF;
          border: 1px solid #0070FF;
          outline: none;
        }
      }
      &:after{
        clear: both;
      }
    }
    .custom-bom{
      min-height: 600px;
      margin: 24px 24px 0 0;
      font-size: 0;
      text-align: center;
      /deep/
      .el-table{
        .btn_edit {
          padding: 0;
          background: #5389e0;
          border-radius: 2px;
          width: 72px;
          height: 30px;
          margin: 0 1px;
        }
        .high_background {
          background: #dc5f5f
        }
        .mid_background {
          background: #e0c840
        }
        .low_background {
          background: #47cad9
        }
      }
    }
    .add_box {
      /deep/
      .el-dialog {
        width: 840px;
        .el-dialog__body {
          width: 840px;
          .content{
            padding: 24px 10px;
            display: flex;
            height: 200px;
            .content_item_space {
              width: 20px;
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
          }
          .content_sec{
            padding: 24px 10px;
            display: flex;
            height: auto;
            .content_item {
              .title {
                font-size: 12px;
                color: #999999;
              }
              .select_box_textarea {
                height: 112px;
                width: 756px;
                margin-top: 6px;
                .el-textarea__inner {
                  background: #f8f8f8;
                  border: 0;
                  resize:none;
                }
              }
            }
          }
          .content_exp{
            display: flex;
            height: 400px;
            overflow-y: hidden;
          }
          .btn_box{
            .cancel_btn{
              border: 1px solid #0070ff;
              color: #0070ff;
              border-radius: 4px;
              width: 124px;
              height: 40px;
              margin-left: 16px;
            }
            .ok_btn{
              width: 124px;
              height: 40px;
              background: #0070ff;
              border-radius: 4px;
              color: #fff;
              border: 1px solid #0070ff;
            }
          }
        }
      }
    }
  }
</style>

<style lang="less">
  @import '../../../../../assets/css/less/reset_css/reset_table.less';
  @import '../../../../../assets/css/less/reset_css/reset_pop.less';
</style>


