<template>
  <div id="intellience-custom" v-cloak
       v-loading.fullscreen.lock="loading">
    <div class="custom-top">
      <!--搜索关键词-->
      <el-input class="select_box"
                placeholder="搜索指标"
                v-model="intel_name"
                @keyup.enter.native="search()"
                clearable>
        <i slot="prefix"
           class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-button class="c_search"  @click="search()">搜索</el-button>
      <div class="c_btn_group">
        <el-button class="c_add" @click="add_box('','add')">添加情报</el-button>
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
        <el-table-column prop="indicator"
                         align="center"
                         label="指标"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="type"
                         align="center"
                         label="指标类型"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="description"
                         align="center"
                         label="描述"
                         show-overflow-tooltip>
        </el-table-column>

        <el-table-column label="威胁度"
                         align="center"
                         show-overflow-tooltip>
          <template slot-scope="scope">
          <span class="btn_alert_background"
                :class="{'high_background':scope.row.degree =='high',
                      'mid_background':scope.row.degree =='medium',
                      'low_background':scope.row.degree =='low'}">
            {{ scope.row.degree | degree }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="score"
                         align="center"
                         label="置信度"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="created_at"
                         align="center"
                         label="导入时间"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作"
                         align="center"
                         width="180">
          <template slot-scope="scope">
            <el-button type="primary"
                       class="btn_edit"
                       @click.stop="add_box(scope.row,'edit')">编辑</el-button>
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

    <!-- 添加/编辑 -->
    <el-dialog class="add_box pop_box"
               :close-on-click-modal="false"
               :modal-append-to-body="false"
               :visible.sync="intel_state.tab">
      <img src="@/assets/images/emerge/closed.png"
           @click="closed_cancel_box"
           class="closed_img"
           alt="">
      <div class="title">
        <div class="mask"></div>
        <span class="title_name" v-if="intel_state.type == 'add'">添加情报</span>
        <span class="title_name" v-if="intel_state.type == 'edit'">编辑情报</span>
      </div>
      <div class="content">
        <div class="content_item_box">
          <div class="content_item">
            <p>
              <span class="title">指标</span>
            </p>
            <el-input class="select_box"
                      placeholder="请输入指标"
                      maxlength="255"
                      v-model="intel_tab.indicator"
                      clearable>
            </el-input>
          </div>
          <div class="content_item">
            <p>
              <span class="title">威胁度</span>
            </p>
            <el-select class="select_box"
                       v-model="intel_tab.degree"
                       placeholder="请选择威胁度">
              <el-option v-for="item in intel_list.degrees"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
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
                       v-model="intel_tab.type"
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
                      type="number"
                      placeholder="请输入0到100之间的数字"
                      v-model="intel_tab.score"
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
                    maxlength="255"
                    placeholder="请输入描述"
                    v-model="intel_tab.description"
                    clearable>
          </el-input>
        </div>
      </div>
      <div class="btn_box">
        <el-button @click="closed_cancel_box"
                   class="cancel_btn">取消</el-button>
        <el-button class="ok_btn" v-if="intel_state.type == 'add'"
                   @click="submit_add_box">确定</el-button>
        <el-button class="ok_btn" v-if="intel_state.type == 'edit'"
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
    props: {
      option: {
        type: Object,
        default: () => { }
      }
    },
    data () {
      return {
        key: "",
        intel_lists: [],
        loading: false,
        intel_name:'',
        role_list: {},
        role_data: {
          page: 1,
          rows: 10
        },
        intel_state:{
          tab:false,
          exp:false,
          type:'add'
        },

        intel_tab:{
          indicator:'',
          type:'',
          degree:'',
          score:'',
          description:'',
          id:''
        },
        intel_list:{
          degrees:[{value:'high',label:'高危'},{value:'medium',label:'中危'},{value:'low',label:'低危'}],
          types:['URL','domain','md5','sha1','sha256','IPv4']
        },
      };
    },
    mounted () {
      this.get_data();
    },
    methods: {
      get_data () {
        this.loading = true;
        this.$axios.get('/yiiapi/intelligences', {
          params: {
            page: this.role_data.page,
            rows: this.role_data.rows,
            filter:this.intel_name
          }
        })
          .then(resp => {
            this.loading = false;
            let {status,msg,data} = resp.data;

            if(status == 0){
              let datas = {
                count:data.count,
                data:data.data,
                pageNow:data.pageNow * 1,
                maxPage:data.maxPage
              }
              this.role_list = datas;
            }
          })
          .catch(error => {
            console.log(error);
          })
      },
      handleSelectionChange (val) {
        this.select_list = val
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
      //搜索
      search(){
        this.get_data();
      },
      ////////////////////////////////////////////////
      add_box(item,type) {
        this.intel_state.tab = true;
        this.intel_state.type = type;

        this.intel_tab.indicator = '';
        this.intel_tab.type = '';
        this.intel_tab.degree = '';
        this.intel_tab.score = '';
        this.intel_tab.description = '';
        this.intel_tab.id = '';

        if(item){
          this.intel_tab.indicator = item.indicator;
          this.intel_tab.type = item.type;
          this.intel_tab.degree = item.degree;
          this.intel_tab.score = item.score;
          this.intel_tab.description = item.description;
          this.intel_tab.id = item.id;
        }
      },
      //情报添加确定
      submit_add_box() {
        if(this.intel_tab.indicator == ''){
          this.$message({
            message: '指标名不能为空！',
            type: 'warning',
          });
          return false;
        }
        var pattern = new RegExp("[<>]");
        if (pattern.test(this.intel_tab.indicator)) {
          this.$message({
            message: '标签名称不能包含特殊字符！',
            type: 'warning',
          });
          return false
        }

        if(this.intel_tab.score == ''){
          this.$message({
            message: '置信度不能为空！',
            type: 'warning',
          });
          return false;
        }


        this.$axios.post('/yiiapi/intelligences',{
          CustomIntelligence: {
            indicator:this.intel_tab.indicator,
            type:this.intel_tab.type,
            degree:this.intel_tab.degree,
            score:parseInt(this.intel_tab.score),
            description:this.intel_tab.description
          }
        }).then(resp => {
          let {status,msg,data} = resp.data;
          if(status == 0){
            this.intel_state.tab = false;
            this.get_data();
            this.$message({
              message: '添加成功！',
              type: 'success',
            });
          }else {
            this.$message({
              message: msg,
              type: 'error',
            });
          }
        })
          .catch(error => {
            console.log(error);
          })
      },
      //情报编辑确定
      submit_edit_box() {
        if(this.intel_tab.indicator == ''){
          this.$message({
            message: '指标名不能为空！',
            type: 'warning',
          });
          return false;
        }
        var pattern = new RegExp("[<>]");
        if (pattern.test(this.intel_tab.indicator)) {
          this.$message({
            message: '标签名称不能包含特殊字符！',
            type: 'warning',
          });
          return false
        }
        if(this.intel_tab.score == ''){
          this.$message({
            message: '置信度不能为空！',
            type: 'warning',
          });
          return false;
        }
        this.$axios.put('/yiiapi/intelligences/'+this.intel_tab.id,{
          CustomIntelligence: {
            indicator:this.intel_tab.indicator,
            type:this.intel_tab.type,
            degree:this.intel_tab.degree,
            score:parseInt(this.intel_tab.score),
            description:this.intel_tab.description
          }
        }).then(resp => {
          let {status,msg,data} = resp.data;
          if(status == 0){
            this.intel_state.tab = false;
            this.get_data();
            this.$message({
              message: '编辑成功！',
              type: 'success',
            });
          }else {
            this.$message({
              message: msg,
              type: 'error',
            });
          }
        })
          .catch(error => {
            console.log(error);
          })
      },
      //添加、编辑情报取消
      closed_cancel_box () {
        this.intel_state.tab = false;
      },
      //删除情报
      remove_box(item){
        this.intel_tab.id = item.id;
        this.$confirm('此操作将删除此条情报信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.delete('/yiiapi/intelligences/'+this.intel_tab.id)
            .then(resp => {
              let {status,msg,data} = resp.data;
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
        });
      },

      /* **************************以上已完成********************* */
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


