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
                 :class="more.src?'show_more_list':''">
              <div>
                <el-menu class="el_menu_src"
                         mode="horizontal"
                         @select="handleSelect_src">
                  <el-submenu :index="index+'0'"
                              :key="index"
                              v-for="(item,index) in detail_main.src_ip_list">
                    <template slot="title">{{item}}</template>
                    <el-submenu :index="index+'1-1'">
                      <template slot="title">威胁追查</template>
                      <el-menu-item :index="index+'1'"
                                    @click="select_src_name(item)">网络视角</el-menu-item>
                      <el-menu-item :index="index+'2'"
                                    @click="select_src_name(item)">端点视角</el-menu-item>
                    </el-submenu>
                    <el-menu-item :index="index+'3'"
                                  @click="select_src_name(item)">添加到外部动态列表</el-menu-item>
                    <el-menu-item :index="index+'4'"
                                  @click="select_src_name(item)">IP段详情</el-menu-item>
                  </el-submenu>
                </el-menu>
              </div>
            </div>
            <div class="more_box">
              <span @click="show_more_active_src">{{more.src?'收起':'展开'}}</span>
            </div>
          </div>
          <div class="content_item">
            <span class="item_title">目的地址：</span>
            <div class="item_right src_bg"
                 :class="more.des?'show_more_list':''">
              <div>
                <el-menu class="el_menu_src"
                         mode="horizontal"
                         @select="handleSelect_des">
                  <el-submenu :index="index+'0'"
                              :key="index"
                              v-for="(item,index) in detail_main.dest_ip_list">
                    <template slot="title">{{item}}</template>
                    <el-submenu :index="index+'1-1'">
                      <template slot="title">威胁追查</template>
                      <el-menu-item :index="index+'1'"
                                    @click="select_des_name(item)">网络视角</el-menu-item>
                      <el-menu-item :index="index+'2'"
                                    @click="select_des_name(item)">端点视角</el-menu-item>
                    </el-submenu>
                    <el-menu-item :index="index+'3'"
                                  @click="select_des_name(item)">添加到外部动态列表</el-menu-item>
                    <el-menu-item :index="index+'4'"
                                  @click="select_des_name(item)">IP段详情</el-menu-item>
                  </el-submenu>
                </el-menu>
              </div>
            </div>
            <div class="more_box">
              <span @click="show_more_active_des">{{more.des?'收起':'展开'}}</span>
            </div>
          </div>
          <div class="content_item">
            <span class="item_title">关联资产名：</span>
            <div class="item_right text_color">
              <span @click="open_assets_info"
                    v-for="item in detail_main.asset_name_list">{{item}}</span>
            </div>
          </div>
          <div class="content_item">
            <span class="item_title">用户：</span>
            <div class="item_right text_color">
              <span @click="open_user_info"
                    v-for="item in detail_main.user_list">{{item}}</span>
            </div>
          </div>
          <div class="content_item">
            <span class="item_title">账号：</span>
            <div class="item_right ">
              <span>{{detail_main.account_number}}</span>
            </div>
          </div>
          <div class="content_item">
            <span class="item_title">告警时间：</span>
            <div class="item_right ">
              <span>{{detail_main.alert_time | time }}</span>
            </div>
          </div>
        </div>
        <div class="content_mid">
          <div class="content_item">
            <span class="item_title">更新时间：</span>
            <div class="item_right ">
              <span>{{detail_main.updated_at }}</span>
            </div>
          </div>
          <div class="content_item">
            <span class="item_title">安全域：</span>
            <div class="item_right ">
              <span>{{detail_main.security_domain | securityDomain }}</span>
            </div>
          </div>
          <div class="content_item">
            <span class="item_title">日志来源：</span>
            <div class="item_right ">
              <span>{{detail_main.log_source }}</span>
            </div>
          </div>
          <div class="content_item">
            <span class="item_title">日志数量：</span>
            <div class="item_right ">
              <span>{{detail_main.log_count }}</span>
            </div>
          </div>
          <div class="content_item">
            <span class="item_title">状态：</span>
            <div class="item_right ">
              <span>{{detail_main.status | alert_status}}</span>
            </div>
          </div>
          <div class="content_item">
            <span class="item_title">描述：</span>
            <div class="item_right ">
              <span>{{detail_main.json_description}}</span>
            </div>
          </div>
        </div>
        <div class="content_right">

          <div class="content_item">
            <span class="item_title">标签：</span>
            <div class="item_right">
              <ul>
                <li class="tag_btn_box"
                    v-for="item in detail_main.label_obj">
                  <span class="tag_btn">{{item}}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="content_item">
            <span class="item_title">威胁等级：</span>
            <div class="item_right ">
              <span> {{detail_main.degree | degree }}</span>
            </div>
          </div>
          <div class="content_item">
            <span class="item_title">失陷确定性：</span>
            <div class="item_right ">
              <span> {{detail_main.fall_certainty | certainty }}</span>
            </div>
          </div>
          <div class="content_item">
            <span class="item_title">风险指数：</span>
            <div class="item_right ">
              <span>{{detail_main.risk_num}}</span>
            </div>
          </div>
          <div class="content_item">
            <span class="item_title">工单名称：</span>
            <div class="item_right ">
              <span class="item_li_content Goto_workorder"
                    @click="Goto_workorder"
                    v-if="detail_main.work_name!=''">{{detail_main.work_name}}</span>
            </div>
          </div>
          <div class="content_item">
            <span class="item_title">工单状态：</span>
            <div class="item_right ">
              <span class="item_li_content">{{detail_main.work_order_status}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 攻击阶段分布 -->
    <div class="detail_mid">
      <detail-stage class="mid_item"
                    :detailArray="detailArray"></detail-stage>
      <div class="mid_space">
      </div>
      <detail-rate class="mid_item"></detail-rate>
    </div>
    <!-- 攻击频率视图 -->
    <!-- 检测时间轴 -->
    <detail-timeaxis :detailArray="detailArray"></detail-timeaxis>
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
    <!-- 编辑标签 -->
    <el-dialog class="add_tag pop_box"
               :close-on-click-modal="false"
               :modal-append-to-body="false"
               :visible.sync="edit_tag.pop">
      <img src="@/assets/images/emerge/closed.png"
           @click="closed_edit_tag_box"
           class="closed_img"
           alt="">
      <div class="title">
        <div class="mask"></div>
        <span class="title_name">编辑标签</span>
      </div>
      <div class="content">
        <div class="content_item">
          <div class="item_addrs"
               v-for="(item,index) in edit_tag.tag_list">
            <el-input class="select_box"
                      placeholder="请输入标签，最多可以设置5个标签"
                      v-model="item.name"
                      clearable>
            </el-input>
            <img src="@/assets/images/common/add.png"
                 alt=""
                 class="img_box"
                 v-if="item.icon"
                 @click="add_tag">
            <img src="@/assets/images/common/del.png"
                 alt=""
                 class="img_box"
                 @click="del_tag(item,index)"
                 v-if="!item.icon">
          </div>
        </div>
      </div>
      <div class="btn_box">
        <el-button @click="closed_edit_tag_box"
                   class="cancel_btn">取消</el-button>
        <el-button class="ok_btn"
                   @click="edit_tag_true">确定</el-button>
      </div>
    </el-dialog>
    <!-- ip段详情 -->
    <el-dialog class="pop_assets_info pop_box"
               :close-on-click-modal="false"
               :modal-append-to-body="false"
               :visible.sync="ipDes.pop">
      <img src="@/assets/images/emerge/closed.png"
           @click="closed_ipDes_info"
           class="closed_img"
           alt="">
      <div class="title">
        <div class="mask"></div>
        <span class="title_name">IP段详情</span>
      </div>
      <div class="user_content">
        <el-table class="reset_table"
                  ref="multipleTable"
                  align="center"
                  border
                  :data="ipDes.data"
                  tooltip-effect="dark"
                  style="width: 100%">
          <el-table-column prop="name"
                           align="center"
                           label="IP段名称"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="IP地址段"
                           align="center"
                           show-overflow-tooltip>
            <template slot-scope="scope">
              <li v-for="item in scope.row.ip_segment"
                  class="btn_tag_box">
                <p>{{item}}</p>
              </li>
            </template>
          </el-table-column>
          <el-table-column prop="network_type"
                           align="center"
                           label="网段类型"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="标签"
                           align="center"
                           width="300">
            <template slot-scope="scope">
              <span class="btn_tag_box"
                    v-for="item in scope.row.label">
                <el-button type="primary"
                           class="btn_tag">
                  {{item}}
                </el-button>
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="person"
                           align="center"
                           label="责任人"
                           width="100"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="更新时间"
                           align="center"
                           width="180"
                           show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.updated_at }}</template>
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
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
        }]
      }],
      selectedOptions: '',
      more: {
        src: false,
        src_name: '',
        des_name: '',
        des: false
      },
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
      //---------------------
      detail_list: [],
      detail_main: {},
      detailArray: [],
      // 编辑标签
      edit_tag: {
        tag_list: [
        ],
        pop: false
      },
      // ip段详情
      ipDes: {
        pop: false,
        data: []
      }
    }
  },
  components: {
    backTitle,
    detailStage,
    detailRate,
    detailTimeaxis
  },
  methods: {

    activeIndex (item) {

    },

    // 原地址和目的地址相关-----------------------------------------
    handleSelect_src (key, keyPath) {
      console.log(key, keyPath);
      switch (key.substr(key.length - 1, 1)) {
        // IP段详情
        case '4':
          this.ipDes.pop = true
          break;
        // 威胁追查-网络视角
        case '1':
          break;
        // 威胁追查-端点视角
        case '2':
          break;
        // 添加到外部动态列表
        case '3':
          this.JoinExternalDynamics(this.more.src_name)
          break;

        default:
          break;
      }
    },
    //加入外部链接
    JoinExternalDynamics (ip_addr) {
      console.log(ip_addr);
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
            join = '/yiiapi/alert/JoinExternalDynamics'
            break;
          case 'asset':
            join = '/yiiapi/asset/JoinExternalDynamics'
            break;
          case 'lateral':
            join = '/yiiapi/horizontalthreat/JoinExternalDynamics'
            break;
          case 'outside':
            join = '/yiiapi/externalthreat/JoinExternalDynamics'
            break;
          case 'outreath':
            join = '/yiiapi/outreachthreat/JoinExternalDynamics'
            break;
          default:
            break;
        }
        this.$axios.post(join, {
          addr: ip_addr,
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
    },
    handleSelect_des (key, keyPath) {
      console.log(key, keyPath);
      switch (key.substr(key.length - 1, 1)) {
        // IP段详情
        case '4':
          this.ipDes.pop = true
          break;
        // 威胁追查-网络视角
        case '1':
          break;
        // 威胁追查-端点视角
        case '2':
          break;
        // 添加到外部动态列表
        case '3':
          this.JoinExternalDynamics(this.more.des_name)
          break;

        default:
          break;
      }
    },
    select_src_name (item) {
      console.log(item);
      this.more.src_name = item
    },
    select_des_name (item) {
      console.log(item);
      this.more.des_name = item
    },
    show_more_active_src () {
      this.more.src = !this.more.src
    },
    show_more_active_des () {
      this.more.des = !this.more.des
    },
    // 关闭ip段详情弹出框
    closed_ipDes_info () {
      this.ipDes.pop = false
    },
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
          alarm = '/yiiapi/alerts/'
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
      this.$axios.put(alarm + id_list.join(','), {
        status: item
      })
        .then(response => {
          let { status, data } = response.data;
          console.log(data);
          console.log(response);
          if (status == 0) {
            this.alert_detail();
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
      console.log(this.detail_main.label_obj);
      if (this.detail_main.label_obj.length == 0) {
        this.edit_tag.tag_list.push({ name: '', icon: true })
      } else {
        this.detail_main.label_obj.forEach(element => {
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
    edit_tag_true () {
      console.log(this.edit_tag.tag_list);
      // /alert/label-edit
      var label_list = [];
      this.edit_tag.tag_list.forEach(element => {
        if (element.name != '') {
          label_list.push(element.name)
        }
      });
      var label = ''
      // horizontalthreat  横向威胁告警  lateral
      // externalthreat  外部威胁告警  outside
      // outreachthreat  外联威胁告警  outreath
      switch (this.$route.query.type) {
        case 'alert':
          label = '/yiiapi/alert/LabelEdit'
          break;
        case 'asset':
          label = '/yiiapi/asset/LabelEdit'
          break;
        case 'lateral':
          label = '/yiiapi/horizontalthreat/LabelEdit'
          break;
        case 'outside':
          label = '/yiiapi/externalthreat/LabelEdit'
          break;
        case 'outreath':
          label = '/yiiapi/outreachthreat/LabelEdit'
          break;
        default:
          break;
      }
      this.$axios.put(label, {
        id: this.$route.query.detail,
        label: label_list
      })
        .then(response => {
          let { status, data } = response.data;
          console.log(data);
          if (status == 0) {
            this.$message(
              {
                message: '修改标签成功!',
                type: 'success',
              }
            );
            this.edit_tag.pop = false;
            this.alert_detail()
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
    },
    closed_edit_tag_box () {
      this.edit_tag.pop = false
    },
    //  添加标签
    add_tag () {
      if (this.edit_tag.tag_list.length < 5) {
        this.edit_tag.tag_list.forEach(item => {
          item.icon = false;
        });
        this.edit_tag.tag_list.push({ name: '', icon: true })
      } else {
        this.$message.warning(
          {
            message: '最多可以设置5个标签。',
            offset: 50
          })
      }
    },
    del_tag (item, index) {
      this.edit_tag.tag_list.splice(index, 1);
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
    alert_detail () {
      // "10009" 10024
      this.$axios.get('/yiiapi/alerts/' + this.$route.query.detail).then(resp => {
        let { status, data } = resp.data;
        this.detail_list.push(data)
        this.detail_main = data
        this.detail_main.label_obj = JSON.parse(this.detail_main.label)
        this.detail_main.json_description = JSON.parse(this.detail_main.description).join(',')
        this.detail_main.json_label = JSON.parse(this.detail_main.label).join(',')
        this.detail_main.src_ip_list = JSON.parse(this.detail_main.src_ip)
        // this.detail_main.src_ip_list = ['192.168.1.1', '192.12.23.123', '192.168.1.1', '192.12.23.123', '192.168.1.1', '192.12.23.123']
        this.detail_main.dest_ip_list = JSON.parse(this.detail_main.dest_ip)
        this.detail_main.user_list = JSON.parse(this.detail_main.user)
        this.detail_main.asset_name_list = JSON.parse(this.detail_main.asset_name)
        console.log(this.detail_main);
        JSON.parse(data.alarm_merger).map(item => {
          this.detail_list.push(item)
        })
        console.log(this.detail_list);
        this.detail_list.map(item => {
          item.selected = false

        })
        this.detail_list[0].selected = true
        this.detailArray = this.detail_list
        if (this.detail_main.workorder_id == '0') {
          this.detail_main.work_order_status = '未关联工单'
          this.detail_main.work_name = ''
        } else {
          switch (this.detail_main.workorder_status + '') {
            case '0':
              this.detail_main.work_order_status = '待分配'
              break;
            case '1':
              this.detail_main.work_order_status = '已分配';
              break;
            case '2':
              this.detail_main.work_order_status = '处置中';
              break;
            case '3':
              this.detail_main.work_order_status = '已处置';
              break;
            case '4':
              this.detail_main.work_order_status = '已取消';
              break;
            default:
              break;
          }
          this.detail_main.work_name = this.detail_main.workorder_name
        }

      })
        .catch(error => {
          console.log(error);
        })

    },
    // 跳转到工单详情
    Goto_workorder () {
      switch (this.$route.query.type) {
        case 'alert':
          this.$router.push({ path: "/detail/works", query: { id: this.detail_main.workorder_id, type: 'alert_detail' } });
          break;
        case 'asset':
          this.$router.push({ path: "/detail/works", query: { id: this.detail_main.workorder_id, type: 'asset' } });
          break;
        case 'lateral':
          this.$router.push({ path: "/detail/works", query: { id: this.detail_main.workorder_id, type: 'lateral' } });
          break;
        case 'outside':
          this.$router.push({ path: "/detail/works", query: { id: this.detail_main.workorder_id, type: 'outside' } });
          break;
        case 'outreath':
          this.$router.push({ path: "/detail/works", query: { id: this.detail_main.workorder_id, type: 'outreath' } });
          break;
        default:
          break;
      }

    },
  },
  computed: {
  },
  mounted () {
    // this.alert()
    this.alert_detail()
  }
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
        margin-bottom: 10px;
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
          .el-menu--horizontal > .el-submenu {
            height: 38px;
          }
          .el-menu--horizontal > .el-submenu {
            height: 38px;
          }
          /deep/ .el-menu--horizontal {
            border: 0;
            background: #f8f8f8;
            .el-submenu .el-submenu__title {
              height: 38px;
              line-height: 38px;
            }
            .el-submenu .el-submenu__title:hover {
              background: #f8f8f8;
            }
          }
          /deep/
            .el-menu--horizontal
            > .el-submenu.is-active
            .el-submenu__title {
            border: 0;
            border-color: #f8f8f8;
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
          }
          .tag_btn {
            height: 20px;
            font-size: 14px;
            line-height: 20px;
            padding: 0 3px;
            // transform: scale(0.8);
            display: block;
          }
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
  .pop_user_info {
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
  /deep/.pop_assets_info {
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
  /deep/.detail_mid {
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
  // 弹窗编辑标签
  /deep/.add_tag {
    .el-dialog {
      width: 440px;
      .el-dialog__body {
        width: 440px;
        .content {
          padding: 24px 5px;
          height: 120px;
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
          }
        }
      }
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