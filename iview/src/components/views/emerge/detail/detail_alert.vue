<template>
  <div class="detail_box">
    <back-title :title-name="title_name"></back-title>
    <!-- 顶部基础 -->
    <div class="detail_top">
      <div class="top_title">
        <div class="top_left">
          <img src="@/assets/images/emerge/top1.png"
               alt="">
          <img src="@/assets/images/emerge/top2.png"
               alt="">
          <img src="@/assets/images/emerge/top3.png"
               alt="">
        </div>
        <div class="top_right">
          <el-row class="common_btn common_btn_124">
            <el-col :span="24"
                    class="common_btn_list">
              <el-dropdown @command="change_state"
                           trigger="click"
                           placement='bottom-start'
                           size='148'>
                <el-button type="primary"
                           class="change_btn">
                  <span>状态变更</span>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown"
                                  class="dropdown_ul_box_124">
                  <el-dropdown-item command='2'
                                    class="select_item">处置中</el-dropdown-item>
                  <el-dropdown-item command="3"
                                    class="select_item">已处置</el-dropdown-item>
                  <el-dropdown-item command='4'
                                    class="select_item">已忽略</el-dropdown-item>
                  <el-dropdown-item command="5"
                                    class="select_item">误报</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-dropdown @command="change_task"
                           placement='bottom-start'
                           trigger="click">
                <el-button type="primary"
                           class="change_btn">
                  <span>工单任务</span>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown"
                                  class="dropdown_ul_box_124">
                  <el-dropdown-item command="1">新建工单</el-dropdown-item>
                  <el-dropdown-item command="2">添加到工单</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-button class="edit_btn"
                         @click="edit_tag_box">编辑标签</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="top_content">
        <div class="content_left">
          <div class="content_item">
            <span class="item_title">源地址：</span>
            <div class="item_right src_bg"
                 :class="more?'show_more_list':''">
              <el-dropdown @command="change_state_src(item)"
                           v-for="item in src_list"
                           :key="item.name"
                           trigger="click"
                           class="src_dropdown_box"
                           placement='bottom-start'
                           size='148'>
                <el-button class="change_src_btn">
                  <span>{{item.name}}</span>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown"
                                  style="width200px;"
                                  class="dropdown_ul_box_detail">
                  <el-dropdown-item command='1'
                                    class="select_item">威胁追查</el-dropdown-item>
                  <el-dropdown-item command="2"
                                    class="select_item">添加到外部动态列表</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div class="more_box">
              <span @click="show_more_active">{{more?'收起':'展开'}}</span>
            </div>
          </div>
          <div class="content_item">
            <span class="item_title">目的地址：</span>
            <div class="item_right">
              <div>
                <!-- <el-cascader :options="options"
                             v-model="selectedOptions"
                             :show-all-levels="false"></el-cascader> -->
              </div>
            </div>
          </div>
          <div class="content_item">
            <span class="item_title">关联资产名：</span>
            <div class="item_right text_color">
              <span @click="open_assets_info">关联资产000,</span>
              <span>关联资产001,</span>
              <span>关联资产001,</span>
              <span>关联资产001,</span>
              <span>关联资产001,</span>
              <span>关联资产001</span>
            </div>
          </div>
          <div class="content_item">
            <span class="item_title">用户：</span>
            <div class="item_right text_color">
              <span @click="open_user_info">Test001</span>
              <span>Test001</span>
            </div>
          </div>
          <div class="content_item">
            <span class="item_title">账号：</span>
            <div class="item_right ">
              <span>372742893748209</span>
            </div>
          </div>
          <div class="content_item">
            <span class="item_title">告警时间：</span>
            <div class="item_right ">
              <span>2019.11.08 15:33:24</span>
            </div>
          </div>

        </div>
        <div class="content_mid">
          <div class="content_item">
            <span class="item_title">更新时间：</span>
            <div class="item_right ">
              <span>2019.11.08 15:33:24</span>
            </div>
          </div>
          <div class="content_item">
            <span class="item_title">安全域：</span>
            <div class="item_right ">
              <span>网络</span>
            </div>
          </div>
          <div class="content_item">
            <span class="item_title">日志来源：</span>
            <div class="item_right ">
              <span>奇安信防火墙，启明星辰IDS，绿盟IPS</span>
            </div>
          </div>
          <div class="content_item">
            <span class="item_title">日志数量：</span>
            <div class="item_right ">
              <span>24</span>
            </div>
          </div>
          <div class="content_item">
            <span class="item_title">状态：</span>
            <div class="item_right ">
              <span>待处置</span>
            </div>
          </div>
          <div class="content_item">
            <span class="item_title">描述：</span>
            <div class="item_right ">
              <span>China Unicom Shandong Province Network, China Unicom, China Unicom Shandong Province Network, China Unicom, China Unicom Shandong Province Network, China Unicom, China Unicom Shandong Province Network, China Unicom</span>
            </div>
          </div>
        </div>
        <div class="content_right">

          <div class="content_item">
            <span class="item_title">标签：</span>
            <div class="item_right ">
              <span>恶意地址</span>
              <span>恶意地址</span>
              <span>恶意地址</span>
            </div>
          </div>
          <div class="content_item">
            <span class="item_title">威胁等级：</span>
            <div class="item_right ">
              <span>高危</span>
            </div>
          </div>
          <div class="content_item">
            <span class="item_title">失陷确定性：</span>
            <div class="item_right ">
              <span>已失陷</span>
            </div>
          </div>
          <div class="content_item">
            <span class="item_title">险指数：</span>
            <div class="item_right ">
              <span>100</span>
            </div>
          </div>
          <div class="content_item">
            <span class="item_title">工单名称：</span>
            <div class="item_right ">
              <span>告警1</span>
            </div>
          </div>
          <div class="content_item">
            <span class="item_title">工单状态：</span>
            <div class="item_right ">
              <span>未关联工单</span>
            </div>
          </div>

        </div>
      </div>

    </div>
    <!-- 攻击阶段分布 -->
    <div class="detail_mid">
      <detail-stage class="mid_item"></detail-stage>
      <div class="mid_space">
      </div>
      <detail-rate class="mid_item"></detail-rate>
    </div>
    <!-- 攻击频率视图 -->
    <!-- 检测时间轴 -->
    <detail-timeaxis></detail-timeaxis>
    <!-- 用户信息弹窗 -->
    <el-dialog class="pop_user_info pop_box"
               :close-on-click-modal="false"
               :modal-append-to-body="false"
               :visible.sync="pop_user_info">
      <img src="@/assets/images/emerge/closed.png"
           @click="closed_user_info"
           class="closed_img"
           alt="">
      <div class="title">
        <div class="mask"></div>
        <span class="title_name">用户信息</span>
      </div>
      <div class="user_content">
        <el-table class="reset_table"
                  ref="multipleTable"
                  align="center"
                  border
                  :data="user_info"
                  tooltip-effect="dark"
                  style="width: 100%">
          <el-table-column prop="name"
                           label="用户"
                           align="center"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="account"
                           label="账号"
                           align="center"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="account"
                           label="邮箱"
                           align="center"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="account"
                           label="电话"
                           align="center"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="account"
                           label="分支"
                           align="center"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="account"
                           label="部门"
                           align="center"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="account"
                           label="岗位"
                           align="center"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="account"
                           label="上级主管"
                           align="center"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="account"
                           label="入职时间"
                           align="center"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="department"
                           label="离职时间"
                           align="center"
                           show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
    <!-- 资产信息弹窗 -->
    <el-dialog class="pop_assets_info pop_box"
               :close-on-click-modal="false"
               :modal-append-to-body="false"
               :visible.sync="pop_assets_info">
      <img src="@/assets/images/emerge/closed.png"
           @click="closed_assets_info"
           class="closed_img"
           alt="">
      <div class="title">
        <div class="mask"></div>
        <span class="title_name">资产信息</span>
      </div>
      <div class="user_content">
        <el-table class="reset_table"
                  ref="multipleTable"
                  align="center"
                  border
                  :data="assets_info"
                  tooltip-effect="dark"
                  style="width: 100%">
          <el-table-column prop="ip_name"
                           label="资产名"
                           align="center"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="ip_addr"
                           label="当前IP"
                           align="center"
                           show-overflow-tooltip>
          </el-table-column>

          <el-table-column prop="tag"
                           label="标签"
                           align="center"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="responsible"
                           label="责任人"
                           align="center"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="type"
                           label="邮箱"
                           align="center"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="type"
                           label="电话"
                           align="center"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="type"
                           label="所在经度"
                           align="center"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="type"
                           label="所在维度"
                           align="center"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="type"
                           label="地理位置"
                           align="center"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="time"
                           label="更新时间"
                           align="center"
                           show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import backTitle from "@/components/common/back-title";
import detailStage from "@/components/views/emerge/detail/detail_stage";
import detailRate from "@/components/views/emerge/detail/detail_rate";
import detailTimeaxis from "@/components/views/emerge/detail/detail_timeaxis";

export default {
  name: 'detail_network',
  data () {
    return {
      title_name: "告警详情",
      src_list: [
        {
          name: '192.168.1.1'
        },
        {
          name: '192.168.23.153'
        },
        {
          name: '192.168.1.103'
        },
        {
          name: '192.168.21.13'
        },
        {
          name: '192.168.23.13'
        },
        {
          name: '192.168.212.13'
        },
        {
          name: '192.168.62.13'
        },

      ],
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
        }]
      }],
      selectedOptions: '',
      more: false,
      pop_user_info: false,
      pop_assets_info: false,
      user_info: [{
        name: "11231223",
        account: "123123123@126.com",
        department: '312312312312'
      }],
      assets_info: [{
        ip_name: "内网服务器",
        ip_addr: "182.169.231.1",
        type: "动态",
        tag: "xx业务，网络设备",
        tag: "xx业务，网络设备",
        responsible: 'admin',
        time: "2019.11.03 19:00:00",
      }],

    }
  },
  components: {
    backTitle,
    detailStage,
    detailRate,
    detailTimeaxis
  },
  methods: {
    // -----------------顶部数据--------------------
    // 状态变更
    change_state (item) {
      console.log(item);
      var id_list = []
      id_list.push(this.$route.query.detail)
      var alarm = ''
      // horizontalthreat  横向威胁告警  lateral
      // externalthreat  外部威胁告警  outside
      // outreachthreat  外联威胁告警  outreath
      switch (this.$route.query.type) {
        case 'alert':
          alarm = '/yiiapi/alert/do-alarm'
          break;
        case 'asset':
          alarm = '/yiiapi/asset/do-alarm'
          break;
        case 'lateral':
          alarm = '/yiiapi/horizontalthreat/do-alarm'
          break;
        case 'outside':
          alarm = '/yiiapi/externalthreat/do-alarm'
          break;
        case 'outreath':
          alarm = '/yiiapi/outreachthreat/do-alarm'
          break;
        default:
          break;
      }
      this.$axios.put(alarm, {
        id: id_list,
        status: item
      })
        .then(response => {
          let { status, data } = response.data;
          console.log(data);
          console.log(response);
          if (status == 0) {
            this.get_data();
            this.$message(
              {
                message: '修改状态成功!',
                type: 'success',
              }
            );
          } else {
            this.$message(
              {
                message: response.data.msg,
                type: 'error',
              }
            );
          }
        })
        .catch(error => {
          console.log(error);
        })
    },
    //工单任务选择
    change_task (command) {
      if (command == "1") {
        this.new_worksheets_list.name = ''
        this.new_worksheets_list.level = ''
        this.new_worksheets_list.operator = ''
        this.new_worksheets_list.new_operator = ''
        this.new_worksheets_list.notice = ['email']
        this.new_worksheets_list.textarea = ''
        this.new_worksheets_list.multiple = []
        this.new_worksheets_list.select_list = []

        this.new_worksheets_data.operator_list = []
        this.new_worksheets_data.operator_list = []
        this.new_worksheets_data.table_operator.tableData = []
        this.new_worksheets_data.table_operator.tableData = []
        this.new_worksheets_data.table_operator.count = 0
        this.new_worksheets_data.table_operator.pageNow = 1
        this.new_worksheets_data.table_operator.maxPage = 1
        this.new_worksheets_data.table_operator.eachPage = 5
        this.new_worksheets_data.network_detail = []
        // 存在被创建工单的告警
        console.log(this.network_detail.status);

        // this.table_alerts.tableData[0].status
        if (this.network_detail.status == '3' || this.network_detail.status == '4' || this.network_detail.status == '5') {
          this.$message({ message: '告警状态为已处置、已忽略、误报的不能新建工单。', type: 'warning' });
          return false
        }
        this.get_user_list();
      } else if (command == "2") {

        this.open_add_new();
        // 添加到工单，只有告警状态 0 1
        // 告警：0新告警，1待处置，2处置中，3已处置，4已忽略，5误报
      }
    },
    // 编辑标签
    edit_tag_box () {
      this.edit_tag.tag_list = [];
      console.log(this.network_detail.label_obj);
      if (this.network_detail.label_obj.length == 0) {
        this.edit_tag.tag_list.push({ name: '', icon: true })
      } else {
        this.network_detail.label_obj.forEach(element => {
          var obj = {
            name: element,
            icon: false
          }
          this.edit_tag.tag_list.push(obj)
        });
        this.edit_tag.tag_list[this.edit_tag.tag_list.length - 1].icon = true
      }
      this.edit_tag.pop = true
    },
    // 加入外部链接
    change_state_src (item, index) {
      console.log(item);
      // 只能是1和2；动态类型，1Ip，2url
      // 选择“威胁追查“后就直接跳到威胁调查页面的IP/URL通讯调查页面，把该IP地址作为搜索条件得出搜索结果。
      if (item == '1') {
        // var label = ''
        // if (this.$route.query.type == 'alert') {
        //   label = '/yiiapi/alert/label-edit'
        // } else if (this.$route.query.type == 'risks') {
        //   label = '/yiiapi/outreachthreat/label-edit'
        // }
        this.$router.push({ path: "/invest/url", query: { src_ip: this.network_detail.src_ip, dest_ip: '' } });

      }
      //加入外部链接
      if (item == '2') {
        this.$confirm('本地址会被加入外部动态列表，第三方设备读取后可以对本地址进行告警提示或者拦截。', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var join = ''
          // horizontalthreat  横向威胁告警  lateral
          // externalthreat  外部威胁告警  outside
          // outreachthreat  外联威胁告警  outreath
          switch (this.$route.query.type) {
            case 'alert':
              join = '/yiiapi/alert/join-external-dynamics'
              break;
            case 'asset':
              join = '/yiiapi/asset/join-external-dynamics'
              break;
            case 'lateral':
              join = '/yiiapi/horizontalthreat/join-external-dynamics'
              break;
            case 'outside':
              join = '/yiiapi/externalthreat/join-external-dynamics'
              break;
            case 'outreath':
              join = '/yiiapi/outreachthreat/join-external-dynamics'
              break;
            default:
              break;
          }



          this.$axios.post(join, {
            addr: this.network_detail.src_ip,
            type: 1
          })
            .then(response => {
              let { status, data } = response.data;
              console.log(data);
              if (status == 0) {
                this.$message(
                  {
                    message: '加入外部动态列表成功!',
                    type: 'success',
                  }
                );
              } else {
                this.$message(
                  {
                    message: data.msg,
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
            message: '已取消操作'
          });
        });
      }
    },

    show_more_active () {
      console.log('1111');
      this.more = !this.more
    },
    // 用户信息
    open_user_info () {
      this.pop_user_info = true;
    },
    closed_user_info () {
      this.pop_user_info = false;
    },
    // 资产信息
    open_assets_info () {
      this.pop_assets_info = true;
    },
    closed_assets_info () {
      this.pop_assets_info = false;
    },
  },
  computed: {}
}

</script>
<style scoped lang="less">
.detail_box {
  // border: 1px solid red;
  // 顶部基础信息
  .detail_top {
    background: #fff;
    padding-bottom: 48px;
    .top_title {
      height: 62px;
      padding: 0 56px;
      border-bottom: 1px solid #ececec;
      .top_left {
        float: left;
        line-height: 62px;
        img {
          vertical-align: middle;
        }
      }
      .top_right {
        float: right;
        .change_btn {
          height: 34px;
          width: 124px;
          padding: 0;
          background: #0070ff;
        }
        .edit_btn {
          height: 34px;
          width: 124px;
          padding: 0;
          background: #fff;
          border: 1px solid #0070ff;
          color: #0070ff;
        }
      }
    }
    .top_content {
      margin-top: 16px;
      padding: 0 56px;
      min-height: 100px;
      display: flex;
      .content_item {
        min-height: 38px;
        line-height: 38px;
        display: flex;
        .item_title {
          width: 100px;
          font-size: 16px;
          text-align: right;
        }
        .item_right {
          text-align: left;
          flex: 1;
          min-height: 38px;
          color: #666666;
          overflow: hidden;
          // border: 1px solid green;
          word-break: break-all;
          word-wrap: break-word;
        }
        .src_bg {
          height: 38px;
          background: #f8f8f8;
          word-break: break-all;
          word-wrap: break-word;
        }
        .text_color {
          font-size: 16px;
          color: #0070ff;
          cursor: pointer;
        }
        .show_more_list {
          height: auto !important;
          overflow: auto !important;
        }
      }
      .content_left {
        flex: 45%;
        .src_dropdown_box {
          text-align: left;
          float: left;
          width: 24%;
          min-width: 125px;
          max-width: 30%;
          .el-button {
            border: 0;
            background: #f8f8f8;
            padding: 0;
          }
        }
        .more_box {
          width: 75px;
          border-left: 1px solid #ddd;
          font-size: 14px;
          color: #0070ff;
          cursor: pointer;
          background: #f8f8f8;
        }
      }
      .content_mid {
        flex: 30%;
      }
      .content_right {
        flex: 25%;
      }
    }
  }
  // 用户信息弹窗
  /deep/ .pop_user_info {
    .el-dialog {
      width: 1200px;
      .el-dialog__body {
        width: 1200px;
        .content {
          padding-top: 24px;
          // 修改radio 改成对号
          height: 400px;
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
        }
      }
    }
  }
  // 资产信息弹窗
  /deep/ .pop_assets_info {
    .el-dialog {
      width: 1200px;
      .el-dialog__body {
        width: 1200px;
        .content {
          padding-top: 24px;
          // 修改radio 改成对号
          height: 400px;
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
        }
      }
    }
  }
  .detail_mid {
    height: 344px;
    margin-top: 20px;
    display: flex;
    .mid_space {
      width: 24px;
    }
    .mid_item {
      flex: 50%;
    }
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