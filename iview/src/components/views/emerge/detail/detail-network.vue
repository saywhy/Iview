<template>
  <div class="detail_box"
       v-loading.fullscreen.lock="loading">
    <back-title :title-name="title_name"></back-title>
    <!-- 顶部基础 -->
    <div class="detail_top">
      <div class="top_title">
        <div class="top_left">
          <img src="@/assets/images/emerge/top1.png"
               alt />
          <img src="@/assets/images/emerge/top2.png"
               v-if="detail_main.security_domain!='terminal'"
               alt />
          <img src="@/assets/images/emerge/top3.png"
               v-if="detail_main.security_domain!='terminal'"
               alt />
        </div>
        <div class="top_right">
          <el-row class="common_btn common_btn_124">
            <el-col :span="24"
                    class="common_btn_list">
              <el-dropdown @command="change_state"
                           trigger="click"
                           placement="bottom-start"
                           size="148">
                <el-button type="primary"
                           class="change_btn">
                  <span>状态变更</span>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown"
                                  class="dropdown_ul_box_124">
                  <el-dropdown-item command="2"
                                    class="select_item">处置中</el-dropdown-item>
                  <el-dropdown-item command="3"
                                    class="select_item">已处置</el-dropdown-item>
                  <el-dropdown-item command="4"
                                    class="select_item">已忽略</el-dropdown-item>
                  <el-dropdown-item command="5"
                                    class="select_item">误报</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-dropdown @command="change_task"
                           placement="bottom-start"
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
                         @mouseover="mouseover(item)"
                         @select="handleSelect_src">
                  <el-submenu :index="index+'0'"
                              :key="index"
                              v-for="(item,index) in detail_main.src_ip">
                    <template slot="title">{{item}}</template>
                    <el-submenu :index="index+'1-1'">
                      <template slot="title">威胁追查</template>
                      <el-menu-item :index="index+'1'"
                                    @click="select_src_name(item)">网络视角</el-menu-item>
                      <!-- <el-menu-item :index="index+'2'"
                                    @click="select_src_name(item)">端点视角</el-menu-item> -->
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
                              @mouseover="mouseover(item)"
                              v-for="(item,index) in detail_main.dest_ip">
                    <template slot="title">{{item}}</template>
                    <el-submenu :index="index+'1-1'">
                      <template slot="title">威胁追查</template>
                      <el-menu-item :index="index+'1'"
                                    @click="select_des_name(item)">网络视角</el-menu-item>
                      <!-- <el-menu-item :index="index+'2'"
                                    @click="select_des_name(item)">端点视角</el-menu-item> -->
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
                    v-for="item in detail_main.asset_name">{{item}}</span>
            </div>
          </div>
          <div class="content_item">
            <span class="item_title">用户：</span>
            <div class="item_right text_color">
              <span @click="open_user_info"
                    v-for="item in detail_main.user">{{item}}</span>
            </div>
          </div>
          <div class="content_item">
            <span class="item_title">账号：</span>
            <div class="item_right">
              <span>{{detail_main.account_number}}</span>
            </div>
          </div>
          <div class="content_item">
            <span class="item_title">告警时间：</span>
            <div class="item_right">
              <span>{{detail_main.alert_time | time }}</span>
            </div>
          </div>
        </div>
        <div class="content_mid">
          <div class="content_item">
            <span class="item_title">更新时间：</span>
            <div class="item_right">
              <span>{{detail_main.update_time|time }}</span>
            </div>
          </div>
          <div class="content_item">
            <span class="item_title">安全域：</span>
            <div class="item_right">
              <span>{{detail_main.security_domain | securityDomain }}</span>
            </div>
          </div>
          <div class="content_item">
            <span class="item_title">日志来源：</span>
            <div class="item_right">
              <span>{{detail_main.log_source }}</span>
            </div>
          </div>
          <div class="content_item">
            <span class="item_title">日志数量：</span>
            <div class="item_right">
              <span>{{detail_main.log_count }}</span>
            </div>
          </div>
          <div class="content_item">
            <span class="item_title">状态：</span>
            <div class="item_right">
              <span>{{detail_main.status | alert_status}}</span>
            </div>
          </div>
          <div class="content_item">
            <span class="item_title">描述：</span>
            <div class="item_right">
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
                    v-for="item in detail_main.label">
                  <span class="tag_btn">{{item}}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="content_item">
            <span class="item_title">威胁等级：</span>
            <div class="item_right">
              <span>{{detail_main.degree | degree }}</span>
            </div>
          </div>
          <div class="content_item">
            <span class="item_title">失陷确定性：</span>
            <div class="item_right">
              <span>{{detail_main.fall_certainty | certainty }}</span>
            </div>
          </div>
          <div class="content_item">
            <span class="item_title">风险指数：</span>
            <div class="item_right">
              <span>{{detail_main.risk_num | risk_num}}</span>
            </div>
          </div>
          <div class="content_item">
            <span class="item_title">工单名称：</span>
            <div class="item_right">
              <span class="item_li_content Goto_workorder"
                    @click="Goto_workorder"
                    v-if="detail_main.work_name!=''">{{detail_main.work_name}}</span>
            </div>
          </div>
          <div class="content_item">
            <span class="item_title">工单状态：</span>
            <div class="item_right">
              <span class="item_li_content">{{detail_main.work_order_status}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 攻击阶段分布 -->
    <div class="detail_mid">
      <detail-stage class="mid_item"
                    v-if="detailArray.length!=0"
                    :detailArray="detailArray"></detail-stage>
      <div class="mid_space"></div>
      <detail-rate class="mid_item"
                   :detailArray="detailArray"
                   v-if="detailArray.length!=0 &&detail_main.security_domain!='terminal'"></detail-rate>

    </div>
    <!-- 攻击频率视图 -->
    <!-- 检测时间轴 -->
    <detail-timeaxis v-if="detailArray.length!=0"
                     :detailArray="detailArray"></detail-timeaxis>
    <!-- 用户信息弹窗 -->
    <el-dialog class="pop_user_info pop_box"
               :close-on-click-modal="false"
               :modal-append-to-body="false"
               :visible.sync="pop_user_info">
      <img src="@/assets/images/emerge/closed.png"
           @click="closed_user_info"
           class="closed_img"
           alt />
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
                           show-overflow-tooltip></el-table-column>
          <el-table-column prop="account"
                           label="账号"
                           align="center"
                           show-overflow-tooltip></el-table-column>
          <el-table-column prop="account"
                           label="邮箱"
                           align="center"
                           show-overflow-tooltip></el-table-column>
          <el-table-column prop="account"
                           label="电话"
                           align="center"
                           show-overflow-tooltip></el-table-column>
          <el-table-column prop="account"
                           label="分支"
                           align="center"
                           show-overflow-tooltip></el-table-column>
          <el-table-column prop="account"
                           label="部门"
                           align="center"
                           show-overflow-tooltip></el-table-column>
          <el-table-column prop="account"
                           label="岗位"
                           align="center"
                           show-overflow-tooltip></el-table-column>
          <el-table-column prop="account"
                           label="上级主管"
                           align="center"
                           show-overflow-tooltip></el-table-column>
          <el-table-column prop="account"
                           label="入职时间"
                           align="center"
                           show-overflow-tooltip></el-table-column>
          <el-table-column prop="department"
                           label="离职时间"
                           align="center"
                           show-overflow-tooltip></el-table-column>
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
           alt />
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
                           show-overflow-tooltip></el-table-column>
          <el-table-column prop="ip_addr"
                           label="当前IP"
                           align="center"
                           show-overflow-tooltip></el-table-column>

          <el-table-column prop="tag"
                           label="标签"
                           align="center"
                           show-overflow-tooltip></el-table-column>
          <el-table-column prop="responsible"
                           label="责任人"
                           align="center"
                           show-overflow-tooltip></el-table-column>
          <el-table-column prop="type"
                           label="邮箱"
                           align="center"
                           show-overflow-tooltip></el-table-column>
          <el-table-column prop="type"
                           label="电话"
                           align="center"
                           show-overflow-tooltip></el-table-column>
          <el-table-column prop="type"
                           label="所在经度"
                           align="center"
                           show-overflow-tooltip></el-table-column>
          <el-table-column prop="type"
                           label="所在维度"
                           align="center"
                           show-overflow-tooltip></el-table-column>
          <el-table-column prop="type"
                           label="地理位置"
                           align="center"
                           show-overflow-tooltip></el-table-column>
          <el-table-column prop="time"
                           label="更新时间"
                           align="center"
                           show-overflow-tooltip></el-table-column>
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
           alt />
      <div class="title">
        <div class="mask"></div>
        <span class="title_name">编辑标签</span>
      </div>
      <div class="content">
        <div class="content_item">
          <div class="item_addrs"
               v-for="(item,index) in edit_tag.tag_list">
            <el-autocomplete class="inline-input select_box"
                             :value="item.name"
                             @input="e => item.name = validSe(e)"
                             :fetch-suggestions="querySearch"
                             :maxlength='25'
                             :debounce='500'
                             show-word-limit
                             placeholder="请输入标签，最多可以设置5个标签"
                             @select="handleSelect"></el-autocomplete>
            <!-- <el-input class="select_box"
                      placeholder="请输入标签，最多可以设置5个标签"
                      v-model="item.name"
                      clearable></el-input> -->
            <img src="@/assets/images/common/add.png"
                 alt
                 class="img_box"
                 v-if="item.icon"
                 @click="add_tag" />
            <img src="@/assets/images/common/del.png"
                 alt
                 class="img_box"
                 @click="del_tag(item,index)"
                 v-if="!item.icon" />
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
           alt />
      <div class="title">
        <div class="mask"></div>
        <span class="title_name">IP段详情</span>
      </div>
      <div class="content">
        <el-table class="reset_table"
                  ref="multipleTable"
                  align="center"
                  border
                  :data="more.IpDetails"
                  tooltip-effect="dark"
                  style="width: 100%">
          <el-table-column prop="name"
                           align="center"
                           label="IP段名称"
                           show-overflow-tooltip></el-table-column>
          <el-table-column label="IP地址段"
                           align="center"
                           show-overflow-tooltip>
            <template slot-scope="scope">
              <li v-for="item in JSON.parse(scope.row.ip_segment)"
                  class="btn_tag_box">
                <p>{{item}}</p>
              </li>
            </template>
          </el-table-column>
          <el-table-column prop="network_type"
                           align="center"
                           label="网段类型"
                           show-overflow-tooltip></el-table-column>
          <el-table-column label="标签"
                           align="center"
                           width="300">
            <template slot-scope="scope">
              <span class="btn_tag_box"
                    v-for="item in scope.row.label">
                <el-button type="primary"
                           class="btn_tag">{{item}}</el-button>
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="person"
                           align="center"
                           label="责任人"
                           width="100"
                           show-overflow-tooltip></el-table-column>
          <el-table-column prop="updated_at"
                           label="更新时间"
                           align="center"
                           width="180"
                           show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
    <!-- 弹窗 -->
    <!-- 添加到工单 -->
    <!--:visible.sync="worksheets_data.pop" class="pop_state_add pop_box"-->
    <el-dialog class="pop_state_add pop_box"
               :close-on-click-modal="false"
               :modal-append-to-body="false"
               :visible.sync="add_state_change">
      <img src="@/assets/images/emerge/closed.png"
           @click="add_closed_state1"
           class="closed_img"
           alt />
      <div class="title">
        <div class="mask"></div>
        <span class="title_name">添加到工单</span>
      </div>
      <div class="content">
        <div class="add_works">
          <el-table ref="multipleTable_add"
                    class="reset_table add_worker"
                    align="center"
                    border
                    :data="table_add_works.tableData"
                    tooltip-effect="dark"
                    @selection-change="handle_sel_table_add_works"
                    style="width: 100%">
            <el-table-column type="selection"
                             align="center"
                             width="50"></el-table-column>
            <el-table-column prop="name"
                             label="工单名称"
                             align="center"
                             show-overflow-tooltip></el-table-column>
            <el-table-column prop="creator"
                             align="center"
                             label="创建人"
                             show-overflow-tooltip></el-table-column>
            <el-table-column label="优先级"
                             align="center"
                             width="120">
              <template slot-scope="scope">{{ scope.row.priority | priority}}</template>
            </el-table-column>
            <!--<el-table-column prop="perator_cn"
                             label="经办人"
                             show-overflow-tooltip>
            </el-table-column>-->
            <el-table-column prop="new_perator"
                             align="center"
                             label="经办人"
                             show-overflow-tooltip></el-table-column>
            <el-table-column label="状态"
                             align="center"
                             width="80"
                             show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.status | work_status }}</template>
            </el-table-column>
          </el-table>
          <el-pagination class="pagination_box"
                         @size-change="sc_table_add_works"
                         @current-change="hcc_table_add_works"
                         :current-page="table_add_works.pageNow"
                         :page-sizes="[10,20,50,100]"
                         :page-size="table_add_works.eachPage"
                         layout="total, sizes, prev, pager, next"
                         :total="table_add_works.count"></el-pagination>
        </div>
      </div>
      <div class="btn_box">
        <el-button @click="add_closed_state1"
                   class="cancel_btn">取消</el-button>
        <el-button @click="add_ok_state"
                   class="ok_btn">确定</el-button>
      </div>
    </el-dialog>

    <!-- 弹窗 -->
    <!-- 新建工单任务 -->
    <el-dialog class="task_new_box pop_box"
               :close-on-click-modal="false"
               :modal-append-to-body="false"
               :visible.sync="new_worksheets_data.pop">
      <img src="@/assets/images/emerge/closed.png"
           @click="closed_task_new"
           class="closed_img"
           alt />
      <div class="title">
        <div class="mask"></div>
        <span class="title_name">编辑工单</span>
      </div>
      <div class="step_box">
        <div class="step_box1">
          <span class="step1_span"
                :class="new_worksheets_data.new_contet?'step_now':'step_past'">基本信息</span>
          <img src="@/assets/images/emerge/selected01.png"
               class="selected_img"
               alt />
        </div>
        <div class="step_box2">
          <span class="step2_span"
                :class="!new_worksheets_data.new_contet?'step_now':'step_past'">处置内容</span>
        </div>
      </div>
      <!-- 基本信息 -->
      <div class="task_new_content"
           v-if="new_worksheets_data.new_contet">
        <div class="task_content_box">
          <div class="content_top">
            <div class="content_top_left">
              <li class="left_item">
                <div class="title">
                  <span>工单名称</span>
                  <span class="improtant_ico">*</span>
                </div>
                <el-input class="task_new_input"
                          placeholder="请输入工单名称"
                          v-model="new_worksheets_list.name"
                          show-word-limit
                          maxlength="32"
                          clearable></el-input>
              </li>
              <li class="left_item">
                <div class="title">
                  <span>经办人</span>
                  <span class="improtant_ico">*</span>
                </div>
                <el-select class="task_new_input"
                           v-model="new_worksheets_list.operator"
                           clearable
                           placeholder="请选择经办人">
                  <el-option v-for="item in new_worksheets_data.operator_list"
                             @click.native="select_changced(item)"
                             :key="item.id"
                             :label="item.username"
                             :value="item.username"></el-option>
                </el-select>
              </li>
            </div>
            <div class="content_top_right">
              <li class="right_item">
                <div class="title">
                  <span>优先级</span>
                  <span class="improtant_ico">*</span>
                </div>
                <el-select class="task_new_input"
                           v-model="new_worksheets_list.level"
                           clearable
                           placeholder="请选择优先级">
                  <el-option v-for="item in new_worksheets_data.level_list"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </li>
              <li class="right_item">
                <el-checkbox-group v-model="new_worksheets_list.notice">
                  <el-checkbox label="email"
                               value="email">邮件通知</el-checkbox>
                  <el-checkbox label="message"
                               value="message">短信通知</el-checkbox>
                  <el-checkbox label="news"
                               value="news">消息中心通知</el-checkbox>
                </el-checkbox-group>
              </li>
            </div>
          </div>
          <div class="content_remarks">
            <p class="title">备注</p>
            <el-input type="textarea"
                      :rows="4"
                      placeholder="请输入内容"
                      maxlength="500"
                      show-word-limit
                      v-model="new_worksheets_list.textarea"></el-input>
          </div>
          <div class="content_table">
            <el-table :data="new_worksheets_data.table_operator.tableData"
                      class="reset_table"
                      align="center"
                      border
                      style="width: 100%">
              <el-table-column prop="username"
                               align="center"
                               label="经办人"></el-table-column>
              <el-table-column prop="department"
                               align="center"
                               label="部门"></el-table-column>
              <el-table-column prop="email_addr"
                               align="center"
                               label="邮箱"></el-table-column>
            </el-table>
          </div>
        </div>

        <div class="btn_box">
          <el-button @click="closed_task_new"
                     class="cancel_btn">取消</el-button>
          <el-button @click="next_task"
                     class="next_btn">下一步</el-button>
        </div>
      </div>

      <!-- 处置内容 -->
      <div class="task_handle_content"
           v-if="!new_worksheets_data.new_contet">
        <div class="task_content_box">
          <div class="table_box">
            <div>
              <div>
                <el-table align="center"
                          class="reset_table"
                          border
                          :data="new_worksheets_data.network_detail"
                          @selection-change="select_alert_new"
                          tooltip-effect="dark"
                          style="width: 100%">
                  <el-table-column prop="category"
                                   align="center"
                                   label="告警类型"
                                   show-overflow-tooltip></el-table-column>
                  <el-table-column prop="indicator"
                                   align="center"
                                   label="威胁指标"
                                   show-overflow-tooltip></el-table-column>
                  <el-table-column align="center"
                                   label="源地址"
                                   show-overflow-tooltip>
                    <template slot-scope="scope">
                      <p v-for="item in scope.row.src_ip">{{item }}</p>
                    </template>
                  </el-table-column>
                  <el-table-column align="center"
                                   label="目的地址"
                                   show-overflow-tooltip>
                    <template slot-scope="scope">
                      <p v-for="item in scope.row.dest_ip">{{item }}</p>
                    </template>
                  </el-table-column>
                  <el-table-column prop="application"
                                   align="center"
                                   label="应用"
                                   show-overflow-tooltip></el-table-column>
                  <el-table-column label="威胁等级"
                                   align="center"
                                   width="100"
                                   show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span class="btn_alert_background"
                            :class="{'high_background':scope.row.degree =='high','mid_background':scope.row.degree =='medium','low_background':scope.row.degree =='low'}">{{ scope.row.degree | degree }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="失陷确定性"
                                   align="center"
                                   width="100"
                                   show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span :class="{'fall_certainty':scope.row.fall_certainty == '1'}">{{ scope.row.fall_certainty | certainty }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="状态"
                                   align="center"
                                   width="80">
                    <template slot-scope="scope">{{ scope.row.status | alert_status }}</template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </div>
        <div class="btn_box">
          <el-button @click="closed_task_new"
                     class="cancel_btn">取消</el-button>
          <el-button @click="prev_task_handle"
                     class="prev_btn">上一步</el-button>
          <el-button @click="prev_task_handle_assign"
                     class="prev_btn">分配</el-button>
          <el-button @click="prev_task_handle_save"
                     class="prev_btn">保存</el-button>
        </div>
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
  name: "detail_network",
  data () {
    return {
      loading: false,
      title_name: "告警详情",
      selectedOptions: "",
      detailArrayShow: false,
      more: {
        src: false,
        name: "",
        des: false,
        IpDetails: [],
      },
      pop_user_info: false,
      pop_assets_info: false,
      user_info: [
        {
          name: "11231223",
          account: "123123123@126.com",
          department: "312312312312",
        },
      ],
      assets_info: [
        {
          ip_name: "内网服务器",
          ip_addr: "182.169.231.1",
          type: "动态",
          tag: "xx业务，网络设备",
          tag: "xx业务，网络设备",
          responsible: "admin",
          time: "2019.11.03 19:00:00",
        },
      ],
      //---------------------
      detail_list: [],
      detail_main: {},
      detailArray: [],
      // 编辑标签
      edit_tag: {
        tag_list: [],
        pop: false,
      },
      // ip段详情
      ipDes: {
        pop: false,
        data: [],
      },

      //添加到工单
      worksheets_data: {
        page: 1,
        rows: 10,
        pop: false,
        tableRadio: {},
        level_list: [
          {
            value: "highest",
            label: "极高",
          },
          {
            value: "high",
            label: "高",
          },
          {
            value: "medium",
            label: "中",
          },
          {
            value: "low",
            label: "低",
          },
        ],
        status_type: ["无", "待分配", "已分配", "处置中", "已取消", "已处置"],
      },
      worksheets_list: {},
      // 新建工单
      new_worksheets_list: {
        name: "",
        level: "",
        operator: "",
        new_operator: [],
        notice: ["email"],
        textarea: "",
        multiple: [],
        select_list: [],
      },
      new_worksheets_data: {
        pop: false,
        new_contet: true,
        operator_list: [],
        level_list: [
          {
            value: "highest",
            label: "最高",
          },
          {
            value: "high",
            label: "高",
          },
          {
            value: "medium",
            label: "中",
          },
          {
            value: "low",
            label: "低",
          },
        ],
        //经办人数组
        table_operator: {
          tableData: [],
          tableData_new: [],
          count: 0,
          pageNow: 1,
          maxPage: 1,
          eachPage: 5,
        },
        // 告警数组
        network_detail: [],
      },

      //
      table_alerts: {
        tableData: [],
        count: 0,
        pageNow: 1,
        maxPage: 1,
        eachPage: 10,
        loading: true,
        multipleSelection: [],
      },
      //添加到工单
      add_state_change: false,
      table_add_works: {
        tableData: [],
        count: 0,
        pageNow: 1,
        maxPage: 1,
        eachPage: 10,
        loading: true,
        multipleSelection: [],
      },
      add_params: {
        name: "",
        level: "",
        operator: [],
        notice: ["email"],
        remarks: "",
        multiple: [],
        old_as: [],
      },
      restaurants: []
    };
  },
  components: {
    backTitle,
    detailStage,
    detailRate,
    detailTimeaxis,
  },
  methods: {
    activeIndex (item) { },
    querySearch (queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString != '' ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect (item) {
      console.log(item);
    },
    GetLabels () {
      this.$axios
        .get("/yiiapi/site/GetLabels", {
          params: {
            label_name: '',
          },
        })
        .then((resp) => {
          this.restaurants = []
          resp.data.data.map(item => {
            this.restaurants.push({
              value: item.label_name,
              id: item.id
            })
          })

        })
        .catch((error) => {
          console.log(error);
        });
    },
    alert_detail () {
      var join = "";
      // horizontalthreat  横向威胁告警  lateral
      // externalthreat  外部威胁告警  outside
      // outreachthreat  外联威胁告警  outreath
      // locality  本机威胁告警  outreath
      console.log(this.$route.query.type);
      switch (this.$route.query.type) {
        case "alert":
          join = "/yiiapi/alerts/";
          console.log(join);
          this.alertDetail(join)
          break;
        case "asset":
          join = "/yiiapi/riskasset/AlertDetails";
          this.alert_detail_risk(join)
          break;
        case "lateral":
          join = "/yiiapi/horizontalthreats/";
          this.alertDetail(join)
          break;
        case "locality":
          join = "/yiiapi/nativethreats/";
          this.alertDetail(join)
          break;
        case "outside":
          join = "/yiiapi/externalthreats/";
          this.alertDetail(join)
          break;
        case "outreath":
          join = "/yiiapi/outreachthreats/";
          this.alertDetail(join)
          break;
        default:
          break;
      }
    },
    alertDetail (join) {
      console.log(join);
      this.loading = true;
      this.$axios
        .get(join + this.$route.query.detail)
        .then((resp) => {
          this.loading = false;
          let { status, data, msg } = resp.data;
          console.log(resp);

          if (status == 1) {
            this.$message({
              message: msg,
              type: "error",
            });
            return false;
          }
          this.detailArray = [];
          this.detail_main = JSON.parse(JSON.stringify(data));
          console.log(this.detail_main);
          if (this.detail_main.detect_engine != 'LOGDF' && this.detail_main.detect_engine != 'LOGRULE') {
            this.detail_main.network_event = JSON.parse(this.detail_main.network_event);
          }
          // this.detail_main.label = JSON.parse(this.detail_main.label);
          this.detail_main.asset_name = JSON.parse(this.detail_main.asset_name);
          this.detail_main.description = JSON.parse(this.detail_main.description);
          if (this.detail_main.category_list) {
            this.detail_main.category_list = JSON.parse(this.detail_main.category_list);
          }
          if (this.detail_main.dest_label_list) {
            this.detail_main.dest_label_list = JSON.parse(this.detail_main.dest_label_list);
          }
          if (this.detail_main.src_label_list) {
            this.detail_main.src_label_list = JSON.parse(this.detail_main.src_label_list);
          }
          if (this.detail_main.security_domain_list) {
            this.detail_main.security_domain_list = JSON.parse(this.detail_main.security_domain_list);
          }
          this.detail_main.dest_ip = JSON.parse(this.detail_main.dest_ip);
          this.detail_main.dest_label = JSON.parse(this.detail_main.dest_label);
          this.detail_main.src_ip = JSON.parse(this.detail_main.src_ip);
          this.detail_main.src_label = JSON.parse(this.detail_main.src_label);
          this.detail_main.user = JSON.parse(this.detail_main.user);
          this.detail_main.json_description = this.detail_main.description.join(",");
          if (this.detail_main.workorder_id == "0") {
            this.detail_main.work_order_status = "未关联工单";
            this.detail_main.work_name = "";
          } else {
            switch (this.detail_main.workorder_status + "") {
              case "0":
                this.detail_main.work_order_status = "待分配";
                break;
              case "1":
                this.detail_main.work_order_status = "已分配";
                break;
              case "2":
                this.detail_main.work_order_status = "处置中";
                break;
              case "3":
                this.detail_main.work_order_status = "已处置";
                break;
              case "4":
                this.detail_main.work_order_status = "已取消";
                break;
              default:
                break;
            }
            this.detail_main.work_name = this.detail_main.workorder_name;
          }
          this.detail_main.selected = true;
          this.detailArray.push(this.detail_main);
          this.detail_main.alarm_merger.map((item) => {
            item.selected = false;
            this.detailArray.push(item);
          });
          this.detailArrayShow = true
          this.table_alerts.tableData.push(this.detail_main)
          this.get_Workorders();

        })
        .catch((error) => {
          console.log(error);
        });
    },
    alert_detail_risk (join) {
      this.$axios
        .get(join, {
          params: {
            id: this.$route.query.detail
          }
        })
        .then((resp) => {
          this.loading = false;
          let { status, data, msg } = resp.data;
          if (status == 1) {
            this.$message({
              message: msg,
              type: "error",
            });
            return false;
          }
          this.detailArray = [];
          this.detail_main = JSON.parse(JSON.stringify(data));
          console.log(this.detail_main);
          if (this.detail_main.detect_engine != 'LOGDF' && this.detail_main.detect_engine != 'LOGRULE') {
            this.detail_main.network_event = JSON.parse(this.detail_main.network_event);
          }
          // this.detail_main.label = JSON.parse(this.detail_main.label);
          this.detail_main.asset_name = JSON.parse(this.detail_main.asset_name);
          this.detail_main.description = JSON.parse(this.detail_main.description);
          if (this.detail_main.category_list) {
            this.detail_main.category_list = JSON.parse(this.detail_main.category_list);
          }
          if (this.detail_main.dest_label_list) {
            this.detail_main.dest_label_list = JSON.parse(this.detail_main.dest_label_list);
          }
          if (this.detail_main.src_label_list) {
            this.detail_main.src_label_list = JSON.parse(this.detail_main.src_label_list);
          }
          if (this.detail_main.security_domain_list) {
            this.detail_main.security_domain_list = JSON.parse(this.detail_main.security_domain_list);
          }
          this.detail_main.dest_ip = JSON.parse(this.detail_main.dest_ip);
          this.detail_main.dest_label = JSON.parse(this.detail_main.dest_label);
          this.detail_main.src_ip = JSON.parse(this.detail_main.src_ip);
          this.detail_main.src_label = JSON.parse(this.detail_main.src_label);
          this.detail_main.user = JSON.parse(this.detail_main.user);
          this.detail_main.json_description = this.detail_main.description.join(",");
          if (this.detail_main.workorder_id == "0") {
            this.detail_main.work_order_status = "未关联工单";
            this.detail_main.work_name = "";
          } else {
            switch (this.detail_main.workorder_status + "") {
              case "0":
                this.detail_main.work_order_status = "待分配";
                break;
              case "1":
                this.detail_main.work_order_status = "已分配";
                break;
              case "2":
                this.detail_main.work_order_status = "处置中";
                break;
              case "3":
                this.detail_main.work_order_status = "已处置";
                break;
              case "4":
                this.detail_main.work_order_status = "已取消";
                break;
              default:
                break;
            }
            this.detail_main.work_name = this.detail_main.workorder_name;
          }
          this.detail_main.selected = true;
          this.detailArray.push(this.detail_main);
          this.detail_main.alarm_merger.map((item) => {
            item.selected = false;
            this.detailArray.push(item);
          });
          this.table_alerts.tableData.push(this.detail_main)
          this.get_Workorders();

        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 获取告警工单状态
    get_Workorders () {
      var join = "";
      // horizontalthreat  横向威胁告警  lateral
      // externalthreat  外部威胁告警  outside
      // outreachthreat  外联威胁告警  outreath
      // locality  本机威胁告警  outreath
      console.log(this.$route.query.type);
      switch (this.$route.query.type) {
        case "alert":
          join = "/yiiapi/alert/Workorders";
          break;
        case "asset":
          join = "/yiiapi/riskasset/Workorders";
          break;
        case "lateral":
          join = "/yiiapi/horizontalthreat/Workorders";
          break;
        case "locality":
          join = "/yiiapi/nativethreat/Workorders";
          break;
        case "outside":
          join = "/yiiapi/externalthreat/Workorders";
          break;
        case "outreath":
          join = "/yiiapi/outreachthreat/Workorders";
          break;
        default:
          break;
      }
      this.$axios
        .get(join, {
          params: {
            id: this.detail_main.id
          }
        })
        .then((resp) => {
        })
        .catch((error) => {
          console.log(error);
        });

    },

    // 原地址和目的地址相关-----------------------------------------
    handleSelect_src (key, keyPath) {
      console.log(key, keyPath);
      console.log(key.substr(key.length - 1, 1));
      switch (key.substr(key.length - 1, 1)) {
        // IP段详情
        case "4":
          this.ipDes.pop = true;
          break;
        // 威胁追查-网络视角
        case "1":
          setTimeout(() => {
            this.$router.push({ path: "/invest/url", query: { src_ip: this.more.name, dest_ip: '' } });
          }, 100);
          break;
        // 威胁追查-端点视角
        case "2":
          break;
        // 添加到外部动态列表
        case "3":
          setTimeout(() => {
            this.JoinExternalDynamics(this.more.name);
          }, 500);
          break;

        default:
          break;
      }
    },
    mouseover (item) {
      this.more.name = item
      console.log(item);
    },
    spance_pattern (item) {
      var pattern = new RegExp("[`~!#%$^&*()=|{}':;',\\[\\]<>《》/?~！#￥……&*（）|{}【】‘；：”“'。，、？]");
      if (pattern.test(item)) {
        return 'false'
      } else {
        return 'true'
      }
    },

    handleSelect_des (key, keyPath) {
      // console.log(key, keyPath);
      switch (key.substr(key.length - 1, 1)) {
        // IP段详情
        case "4":
          this.ipDes.pop = true;
          break;
        // 威胁追查-网络视角
        case "1":
          setTimeout(() => {
            this.$router.push({ path: "/invest/url", query: { src_ip: '', dest_ip: this.more.name } });
          }, 100);
          break;
        // 威胁追查-端点视角
        case "2":
          break;
        // 添加到外部动态列表
        case "3":
          setTimeout(() => {
            this.JoinExternalDynamics(this.more.name);
          }, 500);
          break;

        default:
          break;
      }
    },
    select_src_name (item) {
      console.log(item);
      this.more.name = item;
      this.$axios
        .get("/yiiapi/site/IpDetails", {
          params: {
            ip: this.more.name,
          },
        })
        .then((resp) => {
          let { status, data } = resp.data;
          this.more.IpDetails = data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    select_des_name (item) {
      console.log(item);
      this.more.name = item;
      var url_ipdetail_des = "";
      this.$axios
        .get("/yiiapi/site/IpDetails", {
          params: {
            ip: this.more.name,
          },
        })
        .then((resp) => {
          // console.log(resp);
          let { status, data } = resp.data;
          this.more.IpDetails = data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //加入外部链接
    JoinExternalDynamics (ip_addr) {
      console.log(ip_addr);
      this.$confirm(
        "本地址会被加入外部动态列表，第三方设备读取后可以对本地址进行告警提示或者拦截。",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          var join = "";
          // horizontalthreat  横向威胁告警  lateral
          // externalthreat  外部威胁告警  outside
          // outreachthreat  外联威胁告警  outreath
          // locality  本机威胁告警  outreath
          console.log(this.$route.query.type);
          switch (this.$route.query.type) {
            case "alert":
              join = "/yiiapi/alert/JoinExternalDynamics";
              break;
            case "asset":
              join = "/yiiapi/riskasset/JoinExternalDynamics";
              break;
            case "lateral":
              join = "/yiiapi/horizontalthreat/JoinExternalDynamics";
              break;
            case "locality":
              join = "/yiiapi/nativethreat/JoinExternalDynamics";
              break;
            case "outside":
              join = "/yiiapi/externalthreat/JoinExternalDynamics";
              break;
            case "outreath":
              join = "/yiiapi/outreachthreat/JoinExternalDynamics";
              break;
            default:
              break;
          }
          this.loading = true;
          this.$axios
            .post(join, {
              addr: ip_addr,
              type: 1,
            })
            .then((response) => {
              this.loading = false;
              let { status, data } = response.data;
              // console.log(data);
              if (status == 0) {
                this.$message({
                  message: "加入外部动态列表成功!",
                  type: "success",
                });
              } else {
                this.$message({
                  message: data.msg,
                  type: "error",
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
          });
        });
    },
    show_more_active_src () {
      this.more.src = !this.more.src;
    },
    show_more_active_des () {
      this.more.des = !this.more.des;
    },
    // 关闭ip段详情弹出框
    closed_ipDes_info () {
      this.ipDes.pop = false;
    },
    // -----------------顶部数据--------------------
    // 状态变更
    change_state (item) {
      var join = "";
      // horizontalthreat  横向威胁告警  lateral
      // externalthreat  外部威胁告警  outside
      // outreachthreat  外联威胁告警  outreath
      // locality  本机威胁告警  outreath
      console.log(this.$route.query.type);
      switch (this.$route.query.type) {
        case "alert":
          join = "/yiiapi/alerts/";
          this.changeState(join, item)
          break;
        case "asset":
          join = "/yiiapi/riskasset/DoAlarm";
          this.changeStateRisk(join, item)
          break;
        case "lateral":
          join = "/yiiapi/horizontalthreats/";
          this.changeState(join, item)
          break;
        case "locality":
          join = "/yiiapi/nativethreats/";
          this.changeState(join, item)
          break;
        case "outside":
          join = "/yiiapi/externalthreats/";
          this.changeState(join, item)
          break;
        case "outreath":
          join = "/yiiapi/outreachthreats/";
          this.changeState(join, item)
          break;
        default:
          break;
      }

    },
    changeState (join, item) {
      var id_list = [];
      id_list.push(this.$route.query.detail);
      this.loading = true;
      this.$axios
        .put(join + id_list.join(","), {
          status: item,
        })
        .then((response) => {
          this.loading = false;
          let { status, data } = response.data;
          if (status == 0) {
            this.alert_detail();
            this.$message({
              message: "修改状态成功!",
              type: "success",
            });
          } else {
            this.$message({
              message: response.data.msg,
              type: "error",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    changeStateRisk (join, item) {
      var id_list = [];
      id_list.push(this.$route.query.detail);
      this.loading = true;
      this.$axios
        .put(join, {
          id: id_list,
          status: item,
        })
        .then((response) => {
          this.loading = false;
          let { status, data } = response.data;
          if (status == 0) {
            this.alert_detail();
            this.$message({
              message: "修改状态成功!",
              type: "success",
            });
          } else {
            this.$message({
              message: response.data.msg,
              type: "error",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    closed_task_new () {
      this.new_worksheets_data.pop = false;
    },
    //工单任务选择
    change_task (command) {
      if (command == "1") {
        this.new_worksheets_list.name = "";
        this.new_worksheets_list.level = "";
        this.new_worksheets_list.operator = "";
        this.new_worksheets_list.new_operator = "";
        this.new_worksheets_list.notice = ["email"];
        this.new_worksheets_list.textarea = "";
        this.new_worksheets_list.multiple = [];
        this.new_worksheets_list.select_list = [];

        this.new_worksheets_data.operator_list = [];
        this.new_worksheets_data.operator_list = [];
        this.new_worksheets_data.table_operator.tableData = [];
        this.new_worksheets_data.table_operator.tableData = [];
        this.new_worksheets_data.table_operator.count = 0;
        this.new_worksheets_data.table_operator.pageNow = 1;
        this.new_worksheets_data.table_operator.maxPage = 1;
        this.new_worksheets_data.table_operator.eachPage = 5;
        this.new_worksheets_data.network_detail = [];
        // 存在被创建工单的告警
        // console.log(this.detail_main.status);
        if (this.detail_main.workorder_id != "0") {
          this.$message({
            message: "此告警已经关联工单，请勿重复新建",
            type: "warning",
          });
          return false;
        }
        if (
          this.detail_main.status == "3" ||
          this.detail_main.status == "4" ||
          this.detail_main.status == "5"
        ) {
          this.$message({
            message: "告警状态为已处置、已忽略、误报的不能新建工单。",
            type: "warning",
          });
          return false;
        }

        this.get_user_list();
      } else if (command == "2") {
        if (this.detail_main.workorder_id != "0") {
          this.$message({
            message: "此告警已经关联工单，请勿重复添加",
            type: "warning",
          });
          return false;
        }
        this.open_add_new();
        // 添加到工单，只有告警状态 0 1
        // 告警：0新告警，1待处置，2处置中，3已处置，4已忽略，5误报
      }
    },
    // 编辑标签
    edit_tag_box () {
      this.edit_tag.tag_list = [];
      // console.log(this.detail_main.label);
      if (this.detail_main.label.length == 0) {
        this.edit_tag.tag_list.push({
          name: "",
          icon: true,
        });
      } else {
        this.detail_main.label.forEach((element) => {
          var obj = {
            name: element,
            icon: false,
          };
          this.edit_tag.tag_list.push(obj);
        });
        this.edit_tag.tag_list[this.edit_tag.tag_list.length - 1].icon = true;
      }
      this.edit_tag.pop = true;
    },
    isRepeat (arr) {
      let hash = {};
      for (let i in arr) {
        if (hash[arr[i]]) {
          return true;        }
        hash[arr[i]] = true;
      }
      return false;
    },
    edit_tag_true () {
      // console.log(this.edit_tag.tag_list);
      // /alert/label-edit
      var label_list = [];
      this.edit_tag.tag_list.forEach((element) => {
        if (element.name != "") {
          label_list.push(element.name);
        }
      });
      if (this.isRepeat(label_list)) {
        this.$message({
          message: "标签有重复项",
          type: "warning",
        });
        return false
      }
      label_list.map(item => {
        console.log(this.spance_pattern(item));

        if (this.spance_pattern(item) == 'false') {
          console.log('12312312');
          this.$message({
            message: '标签类型名不能包含特殊字符！',
            type: 'warning',
          });
          return false
        }
      })
      var join = "";
      // horizontalthreat  横向威胁告警  lateral
      // externalthreat  外部威胁告警  outside
      // outreachthreat  外联威胁告警  outreath
      // locality  本机威胁告警  outreath
      console.log(this.$route.query.type);
      switch (this.$route.query.type) {
        case "alert":
          join = "/yiiapi/alert/LabelEdit";
          break;
        case "asset":
          join = "/yiiapi/riskasset/LabelEdit";
          break;
        case "lateral":
          join = "/yiiapi/horizontalthreat/LabelEdit";
          break;
        case "locality":
          join = "/yiiapi/nativethreat/LabelEdit";
          break;
        case "outside":
          join = "/yiiapi/externalthreat/LabelEdit";
          break;
        case "outreath":
          join = "/yiiapi/outreachthreat/LabelEdit";
          break;
        default:
          break;
      }
      console.log(label_list);
      this.loading = true;
      this.$axios
        .put(join, {
          id: this.$route.query.detail,
          label_name: label_list,
        })
        .then((response) => {
          this.loading = false;
          let { status, data } = response.data;
          // console.log(data);
          if (status == 0) {
            this.$message({
              message: "修改标签成功!",
              type: "success",
            });
            this.edit_tag.pop = false;
            this.alert_detail();
          } else {
            this.$message({
              message: data.msg,
              type: "error",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    closed_edit_tag_box () {
      this.edit_tag.pop = false;
    },
    //  添加标签
    add_tag () {
      if (this.edit_tag.tag_list.length < 5) {
        this.edit_tag.tag_list.forEach((item) => {
          item.icon = false;
        });
        this.edit_tag.tag_list.push({
          name: "",
          icon: true,
        });
      } else {
        this.$message.warning({
          message: "最多可以设置5个标签。",
          offset: 50,
        });
      }
    },
    del_tag (item, index) {
      this.edit_tag.tag_list.splice(index, 1);
    },

    // 加入外部链接
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

    // 跳转到工单详情
    Goto_workorder () {
      switch (this.$route.query.type) {
        case "alert":
          this.$router.push({
            path: "/detail/works",
            query: {
              id: this.detail_main.workorder_id,
              type: "alert_detail",
            },
          });
          break;
        case "asset":
          this.$router.push({
            path: "/detail/works",
            query: {
              id: this.detail_main.workorder_id,
              type: "asset",
            },
          });
          break;
        case "locality":
          this.$router.push({
            path: "/detail/works",
            query: {
              id: this.detail_main.workorder_id,
              type: "locality",
            },
          });
          break;
        case "lateral":
          this.$router.push({
            path: "/detail/works",
            query: {
              id: this.detail_main.workorder_id,
              type: "lateral",
            },
          });
          break;
        case "outside":
          this.$router.push({
            path: "/detail/works",
            query: {
              id: this.detail_main.workorder_id,
              type: "outside",
            },
          });
          break;
        case "outreath":
          this.$router.push({
            path: "/detail/works",
            query: {
              id: this.detail_main.workorder_id,
              type: "outreath",
            },
          });
          break;
        default:
          break;
      }
    },
    // -新加到工单取消状态
    add_closed_state () {
      this.worksheets_data.pop = false;
      this.table_add_works.multipleSelection = []
    },

    ///----------------------------------------------新建工单
    /***************新加到工单*****************/

    //添加到工单打开
    open_add_new () {
      this.add_open_state();
      if (this.$refs.multipleTable_add) {
        this.$refs.multipleTable_add.clearSelection()
      }
    },

    //新加到工单打开状态
    add_open_state () {
      let status = this.detailArray[0].status;
      if (status == "3" || status == "4" || status == "5") {
        this.$message({
          message: "告警状态为已处置、已忽略、误报的不能添加到工单。",
          type: "warning",
        });
      } else {
        this.add_state_change = true;
        this.get_table_works_list();
      }
    },
    //新加到工单取消状态
    add_closed_state1 () {
      this.add_state_change = false;
      this.add_params = {
        name: "",
        level: "",
        operator: "",
        new_operator: [],
        notice: ["email"],
        textarea: "",
        multiple: [],
        old_as: [],
      };
    },
    //获取列表
    get_table_works_list () {
      let workorder_list = "";
      let workorder_type = "";
      switch (this.$route.query.type) {
        case "alert":
          workorder_list = "/yiiapi/alert/WorkorderList";
          workorder_type = "alert";
          break;
        case "asset":
          workorder_list = "/yiiapi/riskasset/WorkorderList";
          workorder_type = "alert";
          break;
        case "locality":
          workorder_list = "/yiiapi/nativethreat/WorkorderList";
          workorder_type = "alert";
          break;
        case "lateral":
          workorder_list = "/yiiapi/horizontalthreat/WorkorderList";
          workorder_type = "alert";
          break;
        case "outside":
          workorder_list = "/yiiapi/externalthreat/WorkorderList";
          workorder_type = "alert";
          break;
        case "outreath":
          workorder_list = "/yiiapi/outreachthreat/WorkorderList";
          workorder_type = "alert";
          break;
        default:
          break;
      }

      this.$axios
        .get(workorder_list, {
          params: {
            page: this.table_add_works.pageNow,
            rows: this.table_add_works.eachPage,
            type: workorder_type,
          },
        })
        .then((resp) => {
          console.log("*************8");
          // console.log(resp);
          this.table_add_works.loading = false;
          let { status, data } = resp.data;
          let datas = data;
          if (status == 0) {
            let { data, count, maxPage, pageNow } = datas;
            data.map(function (v, k) {
              v.new_perator = JSON.parse(v.perator).join(",");
              v.checked = false;
            });
            this.table_add_works.tableData = data;
            this.table_add_works.count = count;
            this.table_add_works.maxPage = maxPage;
            this.table_add_works.pageNow = Number(pageNow);

          }
        });
    },

    //新加工单列表勾选某一条记录
    handle_sel_table_add_works (row) {
      // el-radio单选框,不需要这一步
      // console.log(row);
      if (row.length > 1) {
        // console.log('22222');
        this.$refs.multipleTable_add.toggleRowSelection(row[0], false)
        // this.$refs.multipleTable_add.setCurrentRow(row[0], false)
        row.splice(0, 1)
      }
      // console.log("&&&&&3434");
      // console.log(row);
      this.table_add_works.multipleSelection = row;
    },

    //新加到工单确定
    add_ok_state () {
      let selected_attr = this.detailArray[0].id * 1;
      this.add_params.multiple = selected_attr;

      //判断工单列表长度
      let multipe = this.table_add_works.multipleSelection;

      if (multipe.length == 0) {
        this.$message({
          message: "请选择需要添加的工单！",
          type: "warning",
        });
      } else if (multipe.length > 1) {
        this.$message({
          message: "资产/告警不能添加到多个工单，请重新选择！",
          type: "warning",
        });
      } else {
        // console.log("******************");
        this.add_params.id = multipe[0].id;
        this.add_params.name = multipe[0].name;
        this.add_params.level = multipe[0].priority;
        this.add_params.perator = JSON.parse(multipe[0].perator);
        this.add_params.remarks = multipe[0].remarks;
        this.add_params.remind = JSON.parse(multipe[0].remind);
        this.add_params.multiple = []
        this.add_params.multiple.push(this.detail_main.id * 1)
        this.add_params.old_as = JSON.parse(multipe[0].te_alert);
        //console.log(this.add_params);
        this.add_params.multiple = [
          ...this.add_params.multiple,
          ...this.add_params.old_as,
        ];

        // console.log(this.add_params.multiple);
        this.add_params.multiple = [...new Set(this.add_params.multiple)];

        var newArr = this.add_params.multiple.filter((item) => item);

        this.add_params.multiple = newArr;

        // console.log(this.add_params);
        // console.log(this.add_params.perator);
        this.loading = true;


        var join = "";
        // horizontalthreat  横向威胁告警  lateral
        // externalthreat  外部威胁告警  outside
        // outreachthreat  外联威胁告警  outreath
        // locality  本机威胁告警  outreath
        switch (this.$route.query.type) {
          case "alert":
            join = "/yiiapi/alert/AddWorkorder";
            break;
          case "asset":
            join = "/yiiapi/riskasset/AddWorkorder";
            break;
          case "locality":
            join = "/yiiapi/nativethreat/AddWorkorder";
            break;
          case "lateral":
            join = "/yiiapi/horizontalthreat/AddWorkorder";
            break;
          case "outside":
            join = "/yiiapi/externalthreat/AddWorkorder";
            break;
          case "outreath":
            join = "/yiiapi/outreachthreat/AddWorkorder";
            break;
          default:
            break;
        }
        this.loading = true;
        this.$axios
          .post(join, {
            id: this.add_params.id,
            type: "alert",
            name: this.add_params.name,
            priority: this.add_params.level,
            perator: this.add_params.perator,
            remind: this.add_params.remind,
            remarks: this.add_params.remarks,
            te_alert: this.add_params.multiple,
          })
          .then((resp) => {
            this.loading = false;
            this.loading = false;
            let { status, msg, data } = resp.data;
            if (status == 0) {
              this.$message.success("添加成功");
              //清空状态
              this.add_closed_state1();
              this.alert_detail();
            } else if (status == 1) {
              this.$message.error(msg);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    //每页显示多少条
    sc_table_add_works (val) {
      this.table_add_works.eachPage = val;
      this.table_add_works.pageNow = 1;
      this.get_table_works_list();
    },

    //新加工单列表分页页面切换
    hcc_table_add_works (val) {
      this.table_add_works.pageNow = val;
      this.get_table_works_list();
    },

    //获取用户列表(经办人使用)
    get_user_list () {
      this.$axios
        .get("/yiiapi/site/UserList")
        .then((resp) => {
          let { status, data } = resp.data;
          if (status == 0) {
            this.new_worksheets_data.operator_list = data;
          } else {
            this.new_worksheets_data.operator_list = [];
          }
          this.new_worksheets_data.pop = true;
          this.new_worksheets_data.new_contet = true;
        })
        .catch((err) => {
          console.log("用户列表错误");
          console.log(err);
        });
    },

    //经办人change处理
    select_changced (item) {
      // console.log(item);
      // this.new_worksheets_data.table_operator.tableData.push(item)
      let level_list = this.new_worksheets_data.table_operator.tableData;
      let selected_id_attr = level_list.map((x) => {
        return x.id;
      });
      if (selected_id_attr.includes(item.id)) {
        this.$message.error("已存在");
      } else {
        this.new_worksheets_data.table_operator.tableData.unshift(item);
      }
      let pageNow = this.new_worksheets_data.table_operator.pageNow;
      let handle_data_operator = this.new_worksheets_data.table_operator.tableData.slice(
        (pageNow - 1) * 5,
        pageNow * 5
      );
      this.new_worksheets_data.table_operator.tableData_new = handle_data_operator;
      let selected_name_attr = this.new_worksheets_data.table_operator.tableData.map(
        (x) => {
          return x.username;
        }
      );
      // console.log(selected_name_attr);
      // console.log(this.new_worksheets_data.table_operator.tableData);
      // this.task_params.new_operator = selected_name_attr;
    },
    //经办人页数点击
    hcc_table_operator (val) {
      this.new_worksheets_data.table_operator.pageNow = val;
    },
    //下一步时候验证工单名称，优先级、经办人等参数
    next_task () {
      var pattern = new RegExp(
        "[`~!#%$^&*()=|{}':;',\\[\\]<>《》/?~！#￥……&*（）|{}【】‘；：”“'。，、？]"
      );
      if (this.new_worksheets_list.name == "") {
        this.$message.error("工单名称不能为空");
        return false;
      }
      if (pattern.test(this.new_worksheets_list.name)) {
        // console.log(true);
        this.$message.error("工单名称不能包含特殊字符");
        return false;
      }
      if (this.new_worksheets_list.level == "") {
        this.$message.error("优先级未选择");
        return false;
      }
      if (this.new_worksheets_list.level == "") {
        this.$message.error("优先级未选择");
        return false;
      }
      if (this.new_worksheets_list.operator == "") {
        this.$message.error("经办人未选择");
        return false;
      }
      this.new_worksheets_data.new_contet = false;
      // this.handle.active = 0;
      this.new_worksheets_data.network_detail.push(this.detail_main);
      // console.log(this.detail_main);
    },
    // 上一步
    prev_task_handle () {
      this.new_worksheets_data.network_detail = [];
      this.new_worksheets_data.new_contet = true;
    },
    // 添加工单 选择告警列表
    select_alert_new (val) {
      this.new_worksheets_list.select_list = val;
      // console.log(val);
    },
    // 分配
    prev_task_handle_assign () {
      var te_alert = [];
      var perator_list = [];
      te_alert.push(this.detail_main.id * 1);
      this.new_worksheets_data.table_operator.tableData.forEach((element) => {
        perator_list.push(element.username);
      });
      // console.log(te_alert);
      // console.log(perator_list);
      // console.log(this.new_worksheets_list);
      var distribution_workorder = "";
      // horizontalthreat  横向威胁告警  lateral
      // externalthreat  外部威胁告警  outside
      // outreachthreat  外联威胁告警  outreath
      switch (this.$route.query.type) {
        case "alert":
          distribution_workorder = "/yiiapi/alert/DistributionWorkorder";
          break;
        case "asset":
          distribution_workorder = "/yiiapi/riskasset/DistributionWorkorder";
          break;
        case "locality":
          distribution_workorder = "/yiiapi/nativethreat/DistributionWorkorder";
          break;
        case "lateral":
          distribution_workorder =
            "/yiiapi/horizontalthreat/DistributionWorkorder";
          break;
        case "outside":
          distribution_workorder =
            "/yiiapi/externalthreat/DistributionWorkorder";
          break;
        case "outreath":
          distribution_workorder =
            "/yiiapi/outreachthreat/DistributionWorkorder";
          break;
        default:
          break;
      }
      this.loading = true;
      this.$axios
        .put(distribution_workorder, {
          type: "alert",
          name: this.new_worksheets_list.name,
          priority: this.new_worksheets_list.level,
          perator: perator_list,
          remarks: this.new_worksheets_list.textarea,
          te_alert: te_alert,
          remind: this.new_worksheets_list.notice,
        })
        .then((resp) => {
          this.loading = false;
          let { status, msg, data } = resp.data;
          // console.log(data);
          if (status == 0) {
            this.alert_detail();
            this.new_worksheets_data.pop = false;
            this.$message.success("分配成功");
          } else if (status == 1) {
            this.$message.error(msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 保存
    prev_task_handle_save () {
      var te_alert = [];
      var perator_list = [];
      this.new_worksheets_data.table_operator.tableData.forEach((element) => {
        perator_list.push(element.username);
      });
      te_alert.push(this.detail_main.id * 1);
      // console.log(te_alert);
      // console.log(this.new_worksheets_list);

      var add_workorder = "";
      // horizontalthreat  横向威胁告警  lateral
      // externalthreat  外部威胁告警  outside
      // outreachthreat  外联威胁告警  outreath
      switch (this.$route.query.type) {
        case "alert":
          add_workorder = "/yiiapi/alert/AddWorkorder";
          break;
        case "asset":
          add_workorder = "/yiiapi/riskasset/AddWorkorder";
          break;
        case "locality":
          add_workorder = "/yiiapi/nativethreat/AddWorkorder";
          break;
        case "lateral":
          add_workorder = "/yiiapi/horizontalthreat/AddWorkorder";
          break;
        case "outside":
          add_workorder = "/yiiapi/externalthreat/AddWorkorder";
          break;
        case "outreath":
          add_workorder = "/yiiapi/outreachthreat/AddWorkorder";
          break;
        default:
          break;
      }
      this.loading = true;
      this.$axios
        .post(add_workorder, {
          type: "alert",
          name: this.new_worksheets_list.name,
          perator: perator_list,
          priority: this.new_worksheets_list.level,
          remind: this.new_worksheets_list.notice,
          remarks: this.new_worksheets_list.textarea,
          te_alert: te_alert,
        })
        .then((resp) => {
          this.loading = false;
          let { status, msg, data } = resp.data;
          // console.log(data);
          if (status == 0) {
            this.new_worksheets_data.pop = false;
            this.$message.success("添加成功");
            this.alert_detail();
          } else if (status == 1) {
            this.$message.error(msg);
          }
          this.add_closed_state();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {},
  mounted () {
    // this.alert()
    this.alert_detail();
    this.GetLabels();
  },
};
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
        .Goto_workorder {
          color: #0070ff;
          cursor: pointer;
        }
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
            width: 6px;
            /*高宽分别对应横竖滚动条的尺寸*/
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
            width: 6px;
            /*高宽分别对应横竖滚动条的尺寸*/
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
      width: 540px;

      .el-dialog__body {
        width: 540px;

        .content {
          padding: 24px 5px;
          height: 200px;
          overflow-y: auto;

          &::-webkit-scrollbar {
            /*滚动条整体样式*/
            width: 6px;
            /*高宽分别对应横竖滚动条的尺寸*/
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

  //添加到工单
  .pop_state_add {
    .el-dialog {
      width: 960px;

      .el-dialog__body {
        width: 960px;

        .content {
          padding-top: 24px;
          // 修改radio 改成对号
          height: 400px;
          overflow-y: auto;

          &::-webkit-scrollbar {
            /*滚动条整体样式*/
            width: 6px;
            /*高宽分别对应横竖滚动条的尺寸*/
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
          /deep/.add_worker {
            thead {
              .el-checkbox {
                display: none;
              }
            }
          }

          .el-radio__input.is-checked .el-radio__inner::after {
            transform: rotate(45deg) scaleY(1);
          }

          .el-radio__inner::after {
            -webkit-box-sizing: content-box;
            box-sizing: content-box;
            background-color: transparent;
            content: '';
            border: 1px solid #fff;
            border-left: 0;
            border-top: 0;
            height: 0.4375rem;
            left: 0.25rem;
            position: absolute;
            top: 1px;
            -webkit-transform: rotate(45deg) scaleY(0);
            transform: rotate(45deg) scaleY(0);
            width: 0.1875rem;
            -webkit-transition: -webkit-transform 0.15s ease-in 0.05s;
            transition: -webkit-transform 0.15s ease-in 0.05s;
            transition: transform 0.15s ease-in 0.05s;
            transition: transform 0.15s ease-in 0.05s,
              -webkit-transform 0.15s ease-in 0.05s;
            transition: transform 0.15s ease-in 0.05s,
              -webkit-transform 0.15s ease-in 0.05s;
            -webkit-transform-origin: center;
            transform-origin: center;
          }

          .el-radio__inner {
            border-radius: 2px;
          }
        }
      }
    }
  }

  //  新建工单
  .task_new_box {
    .el-dialog {
      width: 960px;

      .el-dialog__body {
        width: 960px;

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
            font-family: PingFangMedium;
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

        .step_box {
          height: 36px;
          margin: 20px 0 24px 0;

          .step_box1 {
            background-image: url('../../../../assets/images/emerge/step1.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;
            width: 120px;
            height: 36px;
            float: left;
            position: relative;
            line-height: 36px;
            text-align: center;

            .step1_span {
              font-size: 14px;
            }

            .selected_img {
              position: absolute;
              left: 0;
              top: 0;
            }
          }

          .step_box2 {
            width: 120px;
            height: 36px;
            background-image: url('../../../../assets/images/emerge/step2.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;
            float: left;
            position: relative;
            line-height: 36px;
            text-align: center;
            margin-left: -10px;

            .step2_span {
              font-size: 14px;
            }
          }

          .step_now {
            color: #0070ff;
          }

          .step_past {
            color: #999999;
          }
        }

        .task_new_content {
          /*height: 480px;*/
          .content_top {
            overflow: hidden;

            .content_top_left {
              float: left;
              width: 45%;

              .left_item {
                margin-bottom: 16px;
                display: flex;

                .title {
                  width: 100px;
                  line-height: 38px;

                  .improtant_ico {
                    color: #ff3a36;
                  }
                }

                .task_new_input {
                  flex: 1;

                  .el-input__inner {
                    height: 38px;
                  }
                }
              }
            }

            .content_top_right {
              float: right;
              width: 45%;

              .right_item {
                margin-bottom: 16px;
                display: flex;

                .title {
                  width: 100px;
                  line-height: 38px;

                  .improtant_ico {
                    color: #ff3a36;
                  }
                }

                .task_new_input {
                  flex: 1;

                  .el-input__inner {
                    height: 38px;
                  }
                }
              }
            }
          }

          .content_remarks {
            .title {
              font-size: 12px;
              color: #999999;
            }

            /deep/ .el-textarea {
              height: 92px;

              textarea {
                resize: none;
                height: 92px;
                font-size: 14px;
                color: #333;
                font-family: PingFang;
              }
            }

            .el-textarea__inner:hover {
              border: none;
            }

            .el-textarea__inner {
              border: none;
              background: #f8f8f8;
            }
          }

          .content_table {
            margin-top: 16px;

            /deep/ .el-table td {
              padding: 0;
              height: 32px;
            }

            /deep/ .el-table th {
              padding: 0;
              height: 36px;
              background: #f8f8f8;

              .cell {
              }
            }

            /deep/ .el-pagination {
              margin-top: 20px;
              text-align: center;
            }
          }
        }

        .task_content_box {
          height: 400px;
          overflow-y: auto;

          &::-webkit-scrollbar {
            /*滚动条整体样式*/
            width: 6px;
            /*高宽分别对应横竖滚动条的尺寸*/
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

        .btn_box {
          margin-top: 36px;
          margin-bottom: 24px;
          height: 42px;
          text-align: center;

          .cancel_btn {
            border: 1px solid #0070ff;
            background: #fff;
            color: #0070ff;
            width: 136px;
            height: 42px;
            font-size: 16px;
          }

          .next_btn {
            background-color: #0070ff;
            color: #fff;
            width: 136px;
            height: 42px;
            font-size: 16px;
          }
        }

        .task_handle_content {
          .handle_content_top {
            height: 42px;
            text-align: left;

            .change_btn,
            .ref {
              background-color: #0070ff;
              border-color: #0070ff;
              width: 136px;
              height: 42px;
              color: #fff;
            }

            .cel {
              border: 1px solid #0070ff;
              background: #fff;
              color: #0070ff;
              width: 136px;
              height: 42px;
              margin-left: 0;
            }
          }

          .table_box {
            margin-top: 24px;

            .table_box_title {
              height: 38px;

              li {
                height: 38px;
                width: 92px;
                float: left;
                font-size: 14px;
                line-height: 38px;
                color: #bbbbbb;
                text-align: center;
                border-top: 2px solid #fff;
              }

              li.active {
                cursor: pointer;
                background: #eef6ff;
                color: #0070ff;
                border-top: 2px solid #0070ff;
              }
            }

            /deep/ .el-table {
              font-size: 12px;

              thead.has-gutter {
                th {
                  color: #333333;
                  background: #f8f8f8;

                  .cell {
                  }
                }
              }

              .cell {
                color: #333333;
              }
            }

            /deep/ .el-pagination {
              margin-top: 20px;
              text-align: center;
            }
          }

          .btn_box {
            margin-top: 36px;
            margin-bottom: 24px;
            height: 42px;
            text-align: center;

            .cancel_btn {
              border: 1px solid #0070ff;
              background: #fff;
              color: #0070ff;
              width: 136px;
              height: 42px;
              font-size: 16px;
            }

            .prev_btn {
              background-color: #0070ff;
              color: #fff;
              width: 136px;
              height: 42px;
              font-size: 16px;
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
