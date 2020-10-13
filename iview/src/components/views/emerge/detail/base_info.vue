<template>
  <!-- 详细信息 -->
  <div class="base_info">
    <p class="content_right_title">详细信息</p>
    <!-- 日志 -->
    <div class="info_base"
         v-if="selectItem.detect_engine =='LOGRULE' || selectItem.detect_engine =='LOGDF'">
      <div class="info_base_top"
           v-if="selectItem.detect_engine =='LOGDF'">
        <li class="info_top_item">
          <span class="info_top_item_title">日志来源</span>
          <span class="info_top_item_content">{{selectItem.log_source}}</span>
        </li>
        <li class="info_top_item">
          <span class="info_top_item_title">告警类型</span>
          <span class="info_top_item_content">{{selectItem.category}}</span>
        </li>
        <li class="info_top_item">
          <span class="info_top_item_title">应用</span>
          <span class="info_top_item_content">{{selectItem.application}}</span>
        </li>
        <li class="info_top_item">
          <span class="info_top_item_title">描述</span>
          <span class="info_top_item_content">{{selectItem.json_description}}</span>
        </li>
        <li class="info_top_item">
          <span class="info_top_item_title">检测引擎</span>
          <span class="info_top_item_content">{{selectItem.detect_engine}}</span>
        </li>
        <li class="info_top_item">
          <span class="info_top_item_title">攻击阶段</span>
          <span class="info_top_item_content">{{selectItem.attack_stage|stage}}</span>
        </li>
        <li class="info_top_item">
          <span class="info_top_item_title">威胁指标</span>
          <span class="info_top_item_content">{{selectItem.indicator}}</span>
        </li>
        <li class="info_top_item">
          <span class="info_top_item_title">情报来源</span>
          <span class="info_top_item_content">
            {{selectItem.alert_description.sources.join(',')}}
          </span>
        </li>
      </div>
      <!-- 安全域为“网络安全域”，检测引擎为“LOGRULE”的时候 -->
      <div class="info_base_top"
           v-if="selectItem.detect_engine =='LOGRULE'&&  selectItem.security_domain =='network'">
        <li class="info_top_item">
          <span class="info_top_item_title">日志来源</span>
          <span class="info_top_item_content">{{selectItem.log_source}}</span>
        </li>
        <li class="info_top_item">
          <span class="info_top_item_title">告警类型</span>
          <span class="info_top_item_content">{{selectItem.category}}</span>
        </li>
        <li class="info_top_item">
          <span class="info_top_item_title">应用</span>
          <span class="info_top_item_content">{{selectItem.application}}</span>
        </li>
        <li class="info_top_item">
          <span class="info_top_item_title">描述</span>
          <span class="info_top_item_content">{{selectItem.json_description}}</span>
        </li>
        <li class="info_top_item">
          <span class="info_top_item_title">检测引擎</span>
          <span class="info_top_item_content">{{selectItem.detect_engine}}</span>
        </li>
        <li class="info_top_item">
          <span class="info_top_item_title">攻击阶段</span>
          <span class="info_top_item_content">{{selectItem.attack_stage|stage}}</span>
        </li>
        <li class="info_top_item">
          <span class="info_top_item_title">检测规则</span>
          <span class="info_top_item_content">{{selectItem.alert_description.rule}}</span>
        </li>
        <li class="info_top_item">
          <span class="info_top_item_title">参考信息</span>
          <div class="info_top_item_content">
            <p v-for="item in selectItem.alert_description.references">{{item}}</p>
          </div>
        </li>
        <li class="info_top_item">
          <span class="info_top_item_title">ATT&CK技术</span>
          <span class="info_top_item_content">{{selectItem.alert_description.att}}</span>
        </li>
      </div>
      <!-- 安全域是“端点”，在检测引擎为“LOGRULE”的时候 -->
      <div class="info_base_top"
           v-if="selectItem.detect_engine =='LOGRULE'&&  selectItem.security_domain =='terminal'">
        <li class="info_top_item">
          <span class="info_top_item_title">日志来源</span>
          <span class="info_top_item_content">{{selectItem.log_source}}</span>
        </li>
        <li class="info_top_item">
          <span class="info_top_item_title">告警类型</span>
          <span class="info_top_item_content">{{selectItem.category}}</span>
        </li>
        <li class="info_top_item">
          <span class="info_top_item_title">检测引擎</span>
          <span class="info_top_item_content">{{selectItem.detect_engine}}</span>
        </li>
        <li class="info_top_item">
          <span class="info_top_item_title">描述</span>
          <span class="info_top_item_content">{{selectItem.json_description}}</span>
        </li>
        <li class="info_top_item">
          <span class="info_top_item_title">检测规则</span>
          <span class="info_top_item_content">{{selectItem.alert_description.rule}}</span>
        </li>

        <li class="info_top_item">
          <span class="info_top_item_title">攻击阶段</span>
          <span class="info_top_item_content">{{selectItem.attack_stage|stage}}</span>
        </li>
        <li class="info_top_item">
          <span class="info_top_item_title">文件</span>
          <span class="info_top_item_content">{{selectItem.alert_description.file}}</span>
        </li>

        <li class="info_top_item">
          <span class="info_top_item_title">ATT&CK技术</span>
          <span class="info_top_item_content">{{selectItem.alert_description.att}}</span>
        </li>
        <li class="info_top_item">
          <span class="info_top_item_title">路径</span>
          <span class="info_top_item_content">{{selectItem.alert_description.path}}</span>
        </li>
        <li class="info_top_item">
          <span class="info_top_item_title">参考信息</span>
          <div class="info_top_item_content">
            <p v-for="item in selectItem.alert_description.references">{{item}}</p>
          </div>
        </li>
      </div>

      <div v-if="selectItem.detect_engine =='LOGDF'"
           class="info_base_bom">
        <div class="base_bom_left">
          <el-tabs v-model="baseInfo.left_activeName"
                   @tab-click="handleClick"
                   class="reset_tab">
            <el-tab-pane label="情报详情"
                         class="tabs-item"
                         name="1">
              <div class="base_box">
                <div>
                  <div class="base_left_item">
                    <p class="left_item_title">
                      <img src="@/assets/images/emerge/base/base1.png"
                           alt="">
                      <span>地理位置</span>
                    </p>
                    <p class="left_item_content">
                      <!-- 中国 · 上海 -->
                      {{selectItem.alert_description.ip_geo | country_code}}
                    </p>
                  </div>
                  <div class="base_left_item">
                    <p class="left_item_title">
                      <img src="@/assets/images/emerge/base/base2.png"
                           alt="">
                      <span>情报来源</span>
                    </p>
                    <p class="left_item_content">
                      {{selectItem.alert_description.sources.join(',')}}
                    </p>
                  </div>
                  <div class="base_left_item">
                    <p class="left_item_title">
                      <img src="@/assets/images/emerge/base/base3.png"
                           alt="">
                      <span>告警类型</span>
                    </p>
                    <p class="left_item_content">
                      <!-- 恶意IP -->
                      {{selectItem.alert_description.category}}
                    </p>
                  </div>
                  <div class="base_left_item">
                    <p class="left_item_title">
                      <img src="@/assets/images/emerge/base/base4.png"
                           alt="">
                      <span>置信度</span>
                    </p>
                    <p class="left_item_content">
                      <!-- 85 -->
                      {{selectItem.alert_description.confidence}}
                    </p>
                  </div>
                  <div class="base_left_item">
                    <p class="left_item_title">
                      <img src="@/assets/images/emerge/base/base5.png"
                           alt="">
                      <span>首次发现时间</span>
                    </p>
                    <p class="left_item_content">
                      {{selectItem.alert_description.first_seen }}
                    </p>
                  </div>
                  <div class="base_left_item">
                    <p class="left_item_title">
                      <img src="@/assets/images/emerge/base/base6.png"
                           alt="">
                      <span>最近发现时间</span>
                    </p>
                    <p class="left_item_content">
                      {{selectItem.alert_description.last_seen }}
                    </p>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="IP_whois信息"
                         class="tabs-item"
                         name="2">
              <div class="base_box">
                <div class="base_left_item"
                     v-for="item in selectItem.whois_list">
                  <p class="left_item_title">
                    {{item.name |ip_whois}}
                  </p>
                  <p class="left_item_content">
                    {{item.value}}
                  </p>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="关联域名"
                         class="tabs-item"
                         name="3">
              <div class="base_box">
                <p class="left_item_content"
                   v-for="item in selectItem.info_list"
                   v-if="item.name =='相关联域名'">
                  {{selectItem.alert_description.domains}}
                </p>
              </div>
            </el-tab-pane>
            <el-tab-pane label="关联文件"
                         class="tabs-item"
                         name="4">
              <div class="base_box">
                <div v-if="selectItem.sample_list.length!=0"
                     v-for="item in selectItem.sample_list">
                  <p class="left_item_content"
                     v-if="item.name=='相关联恶意文件'"
                     v-for="key in item.value">
                    {{key}}
                  </p>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="base_bom_right">
          <el-tabs v-model="baseInfo.right_activeName"
                   @tab-click="handleClick_right"
                   class="reset_tab">
            <el-tab-pane label="威胁及安全建议"
                         class="tabs-item"
                         name="1">
              <div class="base_box">
                <div class="suggest_bom">
                  <p class="suggest_bom_title">威胁描述</p>
                  <p class="suggest_bom_des"
                     v-for="(item,index) in suggest_list"
                     v-if="item.key==selectItem.safety_suggestion">{{ item.des}}</p>
                  <p class="suggest_bom_title">安全建议</p>
                  <p class="suggest_bom_list">
                    <img src="@/assets/images/emerge/detail_suggest.png"
                         class="suggest_icon"
                         alt="">
                    <span class="suggest_bom_title">处置建议</span>
                  </p>
                  <div v-for="(item,index)  in suggest_list"
                       v-if="item.key==selectItem.safety_suggestion">
                    <p class="suggest_bom_li"
                       v-for="it in item.handle">
                      {{it}}
                    </p>
                  </div>
                  <p class="suggest_bom_list">
                    <img src="@/assets/images/emerge/detail_suggest.png"
                         class="suggest_icon"
                         alt="">
                    <span class="suggest_bom_title">加固建议</span>
                  </p>
                  <div v-for="(item,index)  in suggest_list"
                       v-if="item.key==selectItem.safety_suggestion">
                    <p class="suggest_bom_li"
                       v-for="it in item.reinforce">
                      {{it}}
                    </p>
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div v-if="selectItem.detect_engine =='LOGRULE'">
        <!-- 威胁及安全建议 -->
        <div class="suggest_box">
          <div class="suggest_top">
            <img src="@/assets/images/emerge/detal_jianyi.png"
                 alt=""
                 class="icon_img">
            <span class="suggest_title">威胁及安全建议</span>
          </div>
          <div class="suggest_bom">
            <p class="suggest_bom_title">威胁描述</p>
            <p class="suggest_bom_des"
               v-for="(item,index) in suggest_list"
               v-if="item.key==selectItem.safety_suggestion">{{ item.des}}</p>
            <p class="suggest_bom_title">安全建议</p>
            <p class="suggest_bom_list">
              <img src="@/assets/images/emerge/detail_suggest.png"
                   class="suggest_icon"
                   alt="">
              <span class="suggest_bom_title">处置建议</span>
            </p>
            <div v-for="(item,index)  in suggest_list"
                 v-if="item.key==selectItem.safety_suggestion">
              <p class="suggest_bom_li"
                 v-for="it in item.handle">
                {{it}}
              </p>
            </div>
            <p class="suggest_bom_list">
              <img src="@/assets/images/emerge/detail_suggest.png"
                   class="suggest_icon"
                   alt="">
              <span class="suggest_bom_title">加固建议</span>
            </p>
            <div v-for="(item,index)  in suggest_list"
                 v-if="item.key==selectItem.safety_suggestion">
              <p class="suggest_bom_li"
                 v-for="it in item.reinforce">
                {{it}}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- threateye -->
    <div class="info_base"
         v-if="selectItem.detect_engine !='LOGRULE' && selectItem.detect_engine !='LOGDF'">
      <div class="info_base_top">
        <li class="info_top_item">
          <span class="info_top_item_title">日志来源</span>
          <span class="info_top_item_content">{{selectItem.log_source}}</span>
        </li>
        <li class="info_top_item">
          <span class="info_top_item_title">告警类型</span>
          <span class="info_top_item_content">{{selectItem.category}}</span>
        </li>
        <li class="info_top_item">
          <span class="info_top_item_title">应用</span>
          <span class="info_top_item_content">{{selectItem.application}}</span>
        </li>
        <li class="info_top_item">
          <span class="info_top_item_title">描述</span>
          <span class="info_top_item_content">{{selectItem.json_description}}</span>
        </li>
        <li class="info_top_item">
          <span class="info_top_item_title">检测引擎</span>
          <span class="info_top_item_content">{{selectItem.detect_engine}}</span>
        </li>
        <li class="info_top_item">
          <span class="info_top_item_title">攻击阶段</span>
          <span class="info_top_item_content">{{selectItem.attack_stage|stage}}</span>
        </li>
        <li class="info_top_item"
            v-for="value in selectItem.info_list"
            v-if="value.name !='文件行为'&&value.name !='taskID'">
          <span class="info_top_item_title">{{value.name}}</span>
          <span v-if="value.name=='文件大小'">
            {{value.value | filterType }}
          </span>
          <span class="info_top_item_content"
                v-if="value.name!='文件大小'"
                :class="value.value=='点击下载'?'download_text':''">
            <span @click="download(value,selectItem)">{{value.value}}</span>
          </span>
        </li>
      </div>
      <div class="info_base_top"
           style="padding-top:0">
        <div class="info_top_item">
          <div class="info_top_item_title"
               v-if="selectItem.whois_list.length!=0">Whois信息</div>
          <div class="whois_item_box">
            <div class="whois_item"
                 v-for="item in selectItem.whois_list">
              <p class="whois_item_left">
                {{item.name |ip_whois}}
              </p>
              <p class="whois_item_right">
                {{item.value}}
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- 网络事件 -->
      <div class="info_base_mid">
        <p class="title">网络事件</p>
        <div class="time_right_net">
          <div class="time_right_net_item"
               v-for="demo in selectItem.event_list">
            <div class="title_net">{{demo.name |network_event}}</div>
            <div class="value_net">{{demo.value}}</div>
          </div>
        </div>
      </div>
      <!-- 安全建议 -->
      <!-- 威胁及安全建议 -->
      <div class="suggest_box">
        <div class="suggest_top">
          <img src="@/assets/images/emerge/detal_jianyi.png"
               alt=""
               class="icon_img">
          <span class="suggest_title">威胁及安全建议</span>
        </div>
        <div class="suggest_bom">
          <p class="suggest_bom_title">威胁描述</p>
          <p class="suggest_bom_des"
             v-for="(item,index) in suggest_list"
             v-if="item.key==selectItem.safety_suggestion">{{ item.des}}</p>
          <p class="suggest_bom_title">安全建议</p>
          <p class="suggest_bom_list">
            <img src="@/assets/images/emerge/detail_suggest.png"
                 class="suggest_icon"
                 alt="">
            <span class="suggest_bom_title">处置建议</span>
          </p>
          <div v-for="(item,index)  in suggest_list"
               v-if="item.key==selectItem.safety_suggestion">
            <p class="suggest_bom_li"
               v-for="it in item.handle">
              {{it}}
            </p>
          </div>
          <p class="suggest_bom_list">
            <img src="@/assets/images/emerge/detail_suggest.png"
                 class="suggest_icon"
                 alt="">
            <span class="suggest_bom_title">加固建议</span>
          </p>
          <div v-for="(item,index)  in suggest_list"
               v-if="item.key==selectItem.safety_suggestion">
            <p class="suggest_bom_li"
               v-for="it in item.reinforce">
              {{it}}
            </p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import suggestJS from '@/assets/js/suggest.js'
export default {
  name: '',
  data () {
    return {
      baseInfo: {
        left_activeName: '1',
        right_activeName: '1',
      },
      event_obj: {},
      suggest_list: [],

    }
  },
  props: {
    selectItem: {
      type: Object,
      default: () => { }
    }
  },
  mounted () {
    // console.log(suggestJS);
    this.suggest_list = JSON.parse(JSON.stringify(suggestJS))
    // console.log(this.suggest_list);
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab);
    },
    handleClick_right (tab, event) {
      console.log(tab);
    },
    // 下载payload
    download (value, item) {
      console.log(item);
      console.log(value);
      if (value.value == "点击下载" && value.name == "PayLoad信息") {
        var funDownload = function (content, filename) {
          // 创建隐藏的可下载链接
          var eleLink = document.createElement("a");
          eleLink.download = filename;
          eleLink.style.display = "none";
          // 字符内容转变成blob地址
          var blob = new Blob([content]);
          eleLink.href = URL.createObjectURL(blob);
          // 触发点击
          document.body.appendChild(eleLink);
          eleLink.click();
          // 然后移除
          document.body.removeChild(eleLink);
        };
        funDownload(item.network_event.payload, "payload.dat");

      }
      if (value.value == "点击下载" && value.name == '文件下载') {
        var window_open = ''
        console.log(item);
        console.log(value);
        // horizontalthreat  横向威胁告警  lateral
        // externalthreat  外部威胁告警  outside
        // outreachthreat  外联威胁告警  outreath
        switch (this.$route.query.type) {
          case 'alert':
            window_open = '/yiiapi/alert/GetFile?md5='
            break;
          case 'asset':
            window_open = '/yiiapi/asset/GetFile?md5='
            break;
          case 'lateral':
            window_open = '/yiiapi/horizontalthreat/GetFile?md5='
            break;
          case 'outside':
            window_open = '/yiiapi/externalthreat/GetFile?md5='
            break;
          case 'outreath':
            window_open = '/yiiapi/outreachthreat/GetFile?md5='
            break;
          default:
            break;
        }
        window.open(window_open + value.md5);
      }
    },
    download_sandbox (value, item) {
      console.log(value);
      console.log(item);
      var window_open = ''
      console.log(item);
      console.log(value);
      // horizontalthreat  横向威胁告警  lateral
      // externalthreat  外部威胁告警  outside
      // outreachthreat  外联威胁告警  outreath
      switch (this.$route.query.type) {
        case 'alert':
          window_open = '/yiiapi/alert/GetSignature?md5='
          break;
        case 'asset':
          window_open = '/yiiapi/asset/GetSignature?md5='
          break;
        case 'lateral':
          window_open = '/yiiapi/horizontalthreat/GetSignature?md5='
          break;
        case 'outside':
          window_open = '/yiiapi/externalthreat/GetSignature?md5='
          break;
        case 'outreath':
          window_open = '/yiiapi/outreachthreat/GetSignature?md5='
          break;
        default:
          break;
      }
      window.open(window_open + value.MD5 + '&id=' + value.taskID);
    },
  },
  watch: {
    selectItem: function (val) {
      console.log(this.selectItem);
      this.selectItem.whois_list = [];
      this.selectItem.sample_list = [];

      if (this.selectItem.description) {
        if (typeof (this.selectItem.description) == 'string') {
          this.selectItem.json_description = JSON.parse(this.selectItem.description).join(',')
        } else {
          this.selectItem.json_description = this.selectItem.description.join(",");
        }
      }
      this.selectItem.safety_suggestion = this.selectItem.safety_suggestion - 0
      // whios
      if (this.selectItem.alert_description.whois) {
        console.log(this.selectItem.alert_description.whois);
        for (let key in this.selectItem.alert_description.whois) {
          this.selectItem.whois_list.push({
            name: key,
            value: this.selectItem.alert_description.whois[key],
          })
        }
      } else if (this.selectItem.alert_description.ip_whois) {
        console.log(this.selectItem.alert_description.ip_whois);
        for (let key in this.selectItem.alert_description.ip_whois) {
          this.selectItem.whois_list.push({
            name: key,
            value: this.selectItem.alert_description.ip_whois[key],
          })
        }
      }
      this.event_obj = this.selectItem.network_event;
      // 情报类型匹配
      switch (this.selectItem.description_type) {
        case 'BotnetCAndCURL':
          // this.selectItem.sample_list = [];
          if (this.selectItem.alert_description.files) {
            this.selectItem.files_md5_cn = [];
            this.selectItem.alert_description.files.forEach(element => {
              this.selectItem.files_md5_cn.push(element.MD5);
            });
            this.selectItem.sample_list.push({
              name: "僵尸样本信息",
              value: this.selectItem.files_md5_cn,
            });
          }
          if (this.selectItem.alert_description.urls) {
            this.selectItem.urls_list = [];
            this.selectItem.alert_description.urls.forEach(element => {
              this.selectItem.urls_list.push(element.url);
            });
            this.selectItem.sample_list.push({
              name: "僵尸样本下载URL",
              value: this.selectItem.urls_list,
            });
          }
          this.selectItem.info_list = [{
            name: 'URL',
            value: this.selectItem.alert_description.mask
          },
          {
            name: '威胁细分',
            value: this.selectItem.alert_description.threat
          },
          {
            name: '全球首次发现时间',
            value: this.selectItem.alert_description.first_seen
          },
          {
            name: '流行度',
            value: this.selectItem.alert_description.popularity
          },
          {
            name: '主要受影响地区',
            value: this.selectItem.alert_description.geo
          },
          ];
        case 'RansomwareURL':
          this.selectItem.sample_list = [];
          if (this.selectItem.alert_description.files) {
            this.selectItem.files_md5_cn = [];
            this.selectItem.alert_description.files.forEach(element => {
              this.selectItem.files_md5_cn.push(element.MD5);
            });
            this.selectItem.sample_list.push({
              name: "僵尸样本信息",
              value: this.selectItem.files_md5_cn,
            });
          }
          if (this.selectItem.alert_description.urls) {
            this.selectItem.urls_list = [];
            this.selectItem.alert_description.urls.forEach(element => {
              this.selectItem.urls_list.push(element.url);
            });
            this.selectItem.sample_list.push({
              name: "僵尸样本下载URL",
              value: this.selectItem.urls_list,
            });
          }
          this.selectItem.info_list = [{
            name: 'URL',
            value: this.selectItem.alert_description.mask
          },
          {
            name: '全球首次发现时间',
            value: this.selectItem.alert_description.first_seen
          },
          {
            name: '流行度',
            value: this.selectItem.alert_description.popularity
          },
          {
            name: 'IP',
            value: this.selectItem.alert_description.IP
          },
          ];
          break;
        case 'IPReputation':
          this.selectItem.sample_list = [];
          if (this.selectItem.alert_description.files) {
            this.selectItem.files_md5_cn = [];
            this.selectItem.alert_description.files.forEach(element => {
              this.selectItem.files_md5_cn.push(element.MD5);
            });
            this.selectItem.sample_list.push({
              name: "相关联恶意文件",
              value: this.selectItem.files_md5_cn,
            });
          }
          this.selectItem.info_list = [{
            name: 'IP',
            value: this.selectItem.alert_description.ip
          },
          {
            name: '全球首次发现时间',
            value: this.selectItem.alert_description.first_seen
          },
          {
            name: '流行度',
            value: this.selectItem.alert_description.popularity
          },
          {
            name: '主要受影响地区',
            value: this.selectItem.alert_description.geo
          },
          {
            name: '相关联域名',
            value: this.selectItem.alert_description.domains
          },
          ];
          break;
        case 'MaliciousHash':
          this.selectItem.sample_list = [];
          if (this.selectItem.alert_description.urls) {
            this.selectItem.urls_cn = [];
            this.selectItem.alert_description.urls.forEach(element => {
              this.selectItem.urls_cn.push(element.url);
            });
            this.selectItem.sample_list.push({
              name: "样本下载URL",
              value: this.selectItem.urls_cn,
            });
          }

          this.selectItem.info_list = [{
            name: 'MD5',
            value: this.selectItem.alert_description.MD5
          },
          {
            name: 'SHA256',
            value: this.selectItem.alert_description.SHA256
          },
          {
            name: '文件大小',
            value: this.selectItem.alert_description.file_size
          },
          {
            name: '文件类型',
            value: this.selectItem.alert_description.file_type
          },
          {
            name: '常见文件名',
            value: this.selectItem.alert_description.file_name
          },
          {
            name: '威胁细分',
            value: this.selectItem.alert_description.threat
          },
          {
            name: '全球首次发现时间',
            value: this.selectItem.alert_description.first_seen
          },
          {
            name: '流行度',
            value: this.selectItem.alert_description.popularity
          },
          {
            name: "主要受影响地区",
            value: this.selectItem.alert_description.geo,
          },
          {
            name: "样本下载IP地址",
            value: this.selectItem.alert_description.IP,
          },
          ];
          break;
        case 'MaliciousURL':
          this.selectItem.info_list = [{
            name: 'URL',
            value: this.selectItem.alert_description.mask
          },
          {
            name: '全球首次发现时间',
            value: this.selectItem.alert_description.first_seen
          },
          {
            name: '流行度',
            value: this.selectItem.alert_description.popularity
          },
          {
            name: "主要受影响地区",
            value: this.selectItem.alert_description.geo,
          },
          ];

          if (this.selectItem.alert_description.file) {
            this.selectItem.sample_list.push({
              name: "相关联恶意文件",
              value: this.selectItem.alert_description.file,
            });
          }

          break;
        case 'PhishingURL':
          this.selectItem.info_list = [{
            name: 'URL',
            value: this.selectItem.alert_description.mask
          },
          {
            name: '全球首次发现时间',
            value: this.selectItem.alert_description.first_seen
          },
          {
            name: '流行度',
            value: this.selectItem.alert_description.popularity
          },
          {
            name: "主要受影响地区",
            value: this.selectItem.alert_description.geo,
          },
          {
            name: "被钓鱼IP",
            value: this.selectItem.alert_description.IP,
          },
          ];
          break;
        case 'MobileMaliciousHash':
          this.selectItem.info_list = [{
            name: 'MD5',
            value: this.selectItem.alert_description.MD5
          },
          {
            name: 'SHA256',
            value: this.selectItem.alert_description.SHA256
          },
          {
            name: '文件大小',
            value: this.selectItem.alert_description.file_size
          },
          {
            name: '威胁细分',
            value: this.selectItem.alert_description.threat
          },
          {
            name: '全球首次发现时间',
            value: this.selectItem.alert_description.first_seen
          },
          {
            name: '流行度',
            value: this.selectItem.alert_description.popularity
          },
          {
            name: "主要受影响地区",
            value: this.selectItem.alert_description.geo,
          },
          ];
          break;
        case 'sdk':
          this.selectItem.info_list = [
            {
              name: '文件名',
              value: this.selectItem.alert_description.file_name
            },
            {
              name: '文件大小',
              value: this.selectItem.alert_description.file_size
            },
            {
              name: '文件哈希值',
              value: this.selectItem.alert_description.md5
            },
            {
              name: 'SDK检测威胁',
              value: this.selectItem.alert_description.threat
            },
          ];

          if (this.selectItem.alert_description.category == '恶意程序') {
            this.selectItem.info_list.push({
              name: "文件下载",
              value: '点击下载',
              md5: this.selectItem.alert_description.md5
            })
          }
          break;
        case 'sandbox':
          this.selectItem.info_list = [
            {
              name: '文件名',
              value: this.selectItem.alert_description.filename
            },
            {
              name: '文件大小',
              value: this.selectItem.alert_description.size
            },
            {
              name: '文件类型',
              value: this.selectItem.alert_description.type
            },
            {
              name: 'MD5',
              value: this.selectItem.alert_description.md5
            },
            {
              name: 'SHA1',
              value: this.selectItem.alert_description.sha1
            },
            {
              name: 'SHA256',
              value: this.selectItem.alert_description.sha256
            },
            {
              name: 'taskID',
              value: this.selectItem.alert_description.taskID
            },
          ];
          this.selectItem.info_list.forEach(element => {
            if (element.name == 'taskID' && element.value) {
              this.selectItem.info_list.push({
                name: '文件行为',
                value: '点击下载',
                taskID: element.value,
                MD5: this.selectItem.alert_description.md5
              })
            }
          });

          if (this.selectItem.alert_description.category == '恶意程序') {
            this.selectItem.info_list.push({
              name: "文件下载",
              value: '点击下载',
              md5: this.selectItem.alert_description.md5
            })
          }
          break;
        case 'yara':
          this.selectItem.info_list = [{
            name: "文件名",
            value: this.selectItem.alert_description.file_name,
          },
          {
            name: "文件大小",
            value: this.selectItem.alert_description.file_size,
          },
          {
            name: "文件哈希值",
            value: this.selectItem.alert_description.md5,
          },
          {
            name: "Yara规则名称",
            value: this.selectItem.alert_description.rule_name,
          },
          ];
          if (this.selectItem.alert_description.category == '恶意程序') {
            this.selectItem.info_list.push({
              name: "文件下载",
              value: '点击下载',
              md5: this.selectItem.alert_description.md5
            })
          }
          break;
        case 'IDS':
          this.selectItem.info_list = [
            {
              name: "告警描述",
              value: this.selectItem.alert_description.threat,
            },
            {
              name: "PayLoad信息",
              value: "点击下载",
            },
          ];
          break;
        default:
          break;
      }


      if (this.selectItem.detect_engine != "LOGDF" && this.selectItem.detect_engine != "LOGRULE") {
        // 网络事件匹配
        switch (this.selectItem.network_event.event_type) {
          case 'fileinfo':
            switch (this.selectItem.network_event.app_proto) {
              case 'smtp':
                if (this.selectItem.network_event.email.to.length > 1) {
                  this.selectItem.network_event.email_to = this.selectItem.network_event.email.to.join(
                    ","
                  );
                }
                var srcIP = ''
                var desIP = ''
                if (this.selectItem.network_event.src_port == 0) {
                  srcIP = this.selectItem.network_event.src_ip
                } else {
                  srcIP = this.selectItem.network_event.src_ip + ':' + this.selectItem.network_event.src_port
                }
                if (this.selectItem.network_event.dest_port == 0) {
                  desIP = this.selectItem.network_event.dest_ip
                } else {
                  desIP = this.selectItem.network_event.dest_ip + ':' + this.selectItem.network_event.dest_port
                }
                this.selectItem.event_list = [{
                  name: 'Time',
                  value: this.selectItem.network_event.timestamp
                },
                {
                  name: 'Source IP',
                  value: srcIP
                },
                {
                  name: 'Destination IP',
                  value: desIP
                },
                {
                  name: 'Mail_from',
                  value: this.selectItem.network_event.email.from
                },
                {
                  name: 'Recpt_to',
                  value: this.selectItem.network_event.email_to
                },
                {
                  name: 'Traffic',
                  value: 'smtp'
                },
                ]

                break;
              case 'http':
                var srcIP = ''
                var desIP = ''
                if (this.selectItem.network_event.src_port == 0) {
                  srcIP = this.selectItem.network_event.src_ip
                } else {
                  srcIP = this.selectItem.network_event.src_ip + ':' + this.selectItem.network_event.src_port
                }
                if (this.selectItem.network_event.dest_port == 0) {
                  desIP = this.selectItem.network_event.dest_ip
                } else {
                  desIP = this.selectItem.network_event.dest_ip + ':' + this.selectItem.network_event.dest_port
                }
                this.selectItem.event_list = [{
                  name: 'Method',
                  value: this.selectItem.network_event.http.http_method
                },
                {
                  name: 'Source IP',
                  value: srcIP
                },
                {
                  name: 'Destination IP',
                  value: desIP
                },
                {
                  name: 'URL',
                  value: this.selectItem.network_event.http.url
                },
                {
                  name: 'User Agent',
                  value: this.selectItem.network_event.http.http_user_agent
                },
                {
                  name: 'Referrer',
                  value: this.selectItem.network_event.http.http_refer
                },
                {
                  name: 'Traffic',
                  value: 'http'
                },
                ]
                break;
              case 'ftp-data':
                var srcIP = ''
                var desIP = ''
                if (this.selectItem.network_event.src_port == 0) {
                  srcIP = this.selectItem.network_event.src_ip
                } else {
                  srcIP = this.selectItem.network_event.src_ip + ':' + this.selectItem.network_event.src_port
                }
                if (this.selectItem.network_event.dest_port == 0) {
                  desIP = this.selectItem.network_event.dest_ip
                } else {
                  desIP = this.selectItem.network_event.dest_ip + ':' + this.selectItem.network_event.dest_port
                }
                this.selectItem.event_list = [{
                  name: 'Time',
                  value: this.selectItem.network_event.timestamp
                },
                {
                  name: 'Source IP',
                  value: srcIP
                },
                {
                  name: 'Destination IP',
                  value: desIP
                },
                {
                  name: 'User',
                  value: '-'
                },
                {
                  name: 'Traffic',
                  value: 'FTP'
                },
                ]
                break;
              case 'imap':
                if (this.selectItem.network_event.email.to.length > 1) {
                  this.selectItem.network_event.email_to = this.selectItem.network_event.email.to.join(
                    ","
                  );
                }
                var srcIP = ''
                var desIP = ''
                if (this.selectItem.network_event.src_port == 0) {
                  srcIP = this.selectItem.network_event.src_ip
                } else {
                  srcIP = this.selectItem.network_event.src_ip + ':' + this.selectItem.network_event.src_port
                }
                if (this.selectItem.network_event.dest_port == 0) {
                  desIP = this.selectItem.network_event.dest_ip
                } else {
                  desIP = this.selectItem.network_event.dest_ip + ':' + this.selectItem.network_event.dest_port
                }
                this.selectItem.event_list = [{
                  name: 'Time',
                  value: this.selectItem.network_event.timestamp
                },
                {
                  name: 'Source IP',
                  value: srcIP
                },
                {
                  name: 'Destination IP',
                  value: desIP
                },
                {
                  name: 'Mail_from',
                  value: this.selectItem.network_event.email.from
                },
                {
                  name: 'Recpt_to',
                  value: this.selectItem.network_event.email_to
                },
                {
                  name: 'Traffic',
                  value: 'imap'
                },
                ]
                break;
              case 'pop3':
                if (this.selectItem.network_event.email.to.length > 1) {
                  this.selectItem.network_event.email_to = this.selectItem.network_event.email.to.join(
                    ","
                  );
                }
                var srcIP = ''
                var desIP = ''
                if (this.selectItem.network_event.src_port == 0) {
                  srcIP = this.selectItem.network_event.src_ip
                } else {
                  srcIP = this.selectItem.network_event.src_ip + ':' + this.selectItem.network_event.src_port
                }
                if (this.selectItem.network_event.dest_port == 0) {
                  desIP = this.selectItem.network_event.dest_ip
                } else {
                  desIP = this.selectItem.network_event.dest_ip + ':' + this.selectItem.network_event.dest_port
                }
                this.selectItem.event_list = [{
                  name: 'Time',
                  value: this.selectItem.network_event.timestamp
                },
                {
                  name: 'Source IP',
                  value: srcIP
                },
                {
                  name: 'Destination IP',
                  value: desIP
                },
                {
                  name: 'Mail_from',
                  value: this.selectItem.network_event.email.from
                },
                {
                  name: 'Recpt_to',
                  value: this.selectItem.network_event.email_to
                },
                {
                  name: 'Traffic',
                  value: 'pop3'
                },
                ]
                break;
              case 'smb':
                var srcIP = ''
                var desIP = ''
                if (this.selectItem.network_event.src_port == 0) {
                  srcIP = this.selectItem.network_event.src_ip
                } else {
                  srcIP = this.selectItem.network_event.src_ip + ':' + this.selectItem.network_event.src_port
                }
                if (this.selectItem.network_event.dest_port == 0) {
                  desIP = this.selectItem.network_event.dest_ip
                } else {
                  desIP = this.selectItem.network_event.dest_ip + ':' + this.selectItem.network_event.dest_port
                }
                this.selectItem.event_list = [{
                  name: 'Time',
                  value: this.selectItem.network_event.timestamp
                },
                {
                  name: 'Source IP',
                  value: srcIP
                },
                {
                  name: 'Destination IP',
                  value: desIP
                },
                {
                  name: 'Domain',
                  value: '-'
                },
                {
                  name: 'User',
                  value: '-'
                },
                {
                  name: 'Traffic',
                  value: 'smb'
                },
                ]
                break;
              default:
                if (!this.selectItem.network_event.app_proto) {
                  this.selectItem.network_event.app_proto = this.selectItem.network_event.proto
                } else if (this.selectItem.network_event.app_proto == 'failed') {
                  this.selectItem.network_event.app_proto = ''
                }
                var srcIP = ''
                var desIP = ''
                if (this.selectItem.network_event.src_port == 0) {
                  srcIP = this.selectItem.network_event.src_ip
                } else {
                  srcIP = this.selectItem.network_event.src_ip + ':' + this.selectItem.network_event.src_port
                }
                if (this.selectItem.network_event.dest_port == 0) {
                  desIP = this.selectItem.network_event.dest_ip
                } else {
                  desIP = this.selectItem.network_event.dest_ip + ':' + this.selectItem.network_event.dest_port
                }
                this.selectItem.event_list = [{
                  name: 'Time',
                  value: this.selectItem.network_event.timestamp
                },
                {
                  name: 'Source IP',
                  value: srcIP
                },
                {
                  name: 'Destination IP',
                  value: desIP
                },
                {
                  name: 'Traffic',
                  value: this.selectItem.network_event.app_proto
                },
                ]
                break;
            }
            break;
          case 'flow':
            switch (this.selectItem.network_event.app_proto) {
              case 'ftp':
                var srcIP = ''
                var desIP = ''
                if (this.selectItem.network_event.src_port == 0) {
                  srcIP = this.selectItem.network_event.src_ip
                } else {
                  srcIP = this.selectItem.network_event.src_ip + ':' + this.selectItem.network_event.src_port
                }
                if (this.selectItem.network_event.dest_port == 0) {
                  desIP = this.selectItem.network_event.dest_ip
                } else {
                  desIP = this.selectItem.network_event.dest_ip + ':' + this.selectItem.network_event.dest_port
                }
                this.selectItem.event_list = [{
                  name: 'Time',
                  value: this.selectItem.network_event.timestamp
                },
                {
                  name: 'Source IP',
                  value: srcIP
                },
                {
                  name: 'Destination IP',
                  value: desIP
                },
                {
                  name: 'User',
                  value: this.selectItem.network_event.user
                },
                {
                  name: 'Traffic',
                  value: this.selectItem.network_event.app_proto
                },
                ]
                break;
              default:
                if (!this.selectItem.network_event.app_proto) {
                  this.selectItem.network_event.app_proto = this.selectItem.network_event.proto
                } else if (this.selectItem.network_event.app_proto == 'failed') {
                  this.selectItem.network_event.app_proto = ''
                }
                var srcIP = ''
                var desIP = ''
                if (this.selectItem.network_event.src_port == 0) {
                  srcIP = this.selectItem.network_event.src_ip
                } else {
                  srcIP = this.selectItem.network_event.src_ip + ':' + this.selectItem.network_event.src_port
                }
                if (this.selectItem.network_event.dest_port == 0) {
                  desIP = this.selectItem.network_event.dest_ip
                } else {
                  desIP = this.selectItem.network_event.dest_ip + ':' + this.selectItem.network_event.dest_port
                }
                this.selectItem.event_list = [{
                  name: 'Time',
                  value: this.selectItem.network_event.timestamp
                },
                {
                  name: 'Source IP',
                  value: srcIP
                },
                {
                  name: 'Destination IP',
                  value: desIP
                },
                {
                  name: 'Traffic',
                  value: this.selectItem.network_event.app_proto
                },
                ]
                break;
            }
            break
          case 'smb':
            var srcIP = ''
            var desIP = ''
            if (this.selectItem.network_event.src_port == 0) {
              srcIP = this.selectItem.network_event.src_ip
            } else {
              srcIP = this.selectItem.network_event.src_ip + ':' + this.selectItem.network_event.src_port
            }
            if (this.selectItem.network_event.dest_port == 0) {
              desIP = this.selectItem.network_event.dest_ip
            } else {
              desIP = this.selectItem.network_event.dest_ip + ':' + this.selectItem.network_event.dest_port
            }
            this.selectItem.event_list = [{
              name: 'Time',
              value: this.selectItem.network_event.timestamp
            },
            {
              name: 'Source IP',
              value: srcIP
            },
            {
              name: 'Destination IP',
              value: desIP
            },
            {
              name: 'Domain',
              value: '-'
            },
            {
              name: 'User',
              value: '-'
            },
            {
              name: 'Traffic',
              value: this.selectItem.network_event.event_type
            },
            ]
            break
          case 'ssh':
            var srcIP = ''
            var desIP = ''
            if (this.selectItem.network_event.src_port == 0) {
              srcIP = this.selectItem.network_event.src_ip
            } else {
              srcIP = this.selectItem.network_event.src_ip + ':' + this.selectItem.network_event.src_port
            }
            if (this.selectItem.network_event.dest_port == 0) {
              desIP = this.selectItem.network_event.dest_ip
            } else {
              desIP = this.selectItem.network_event.dest_ip + ':' + this.selectItem.network_event.dest_port
            }
            this.selectItem.event_list = [{
              name: 'Time',
              value: this.selectItem.network_event.timestamp
            },
            {
              name: 'Source IP',
              value: srcIP
            },
            {
              name: 'Destination IP',
              value: desIP
            },
            {
              name: 'Tool',
              value: this.selectItem.network_event.ssh.client.software_version
            },
            {
              name: 'User',
              value: '-'
            },
            {
              name: 'Traffic',
              value: this.selectItem.network_event.event_type
            },
            ]
            break
          case 'tls':
            if (this.selectItem.network_event.tls.subject) {
              this.selectItem.network_event.tls.Authorizing = this.selectItem.network_event.tls.subject.substring(
                this.selectItem.network_event.tls.subject.indexOf("CN=") + 3
              );
            }
            var srcIP = ''
            var desIP = ''
            if (this.selectItem.network_event.src_port == 0) {
              srcIP = this.selectItem.network_event.src_ip
            } else {
              srcIP = this.selectItem.network_event.src_ip + ':' + this.selectItem.network_event.src_port
            }
            if (this.selectItem.network_event.dest_port == 0) {
              desIP = this.selectItem.network_event.dest_ip
            } else {
              desIP = this.selectItem.network_event.dest_ip + ':' + this.selectItem.network_event.dest_port
            }
            this.selectItem.event_list = [{
              name: 'Time',
              value: this.selectItem.network_event.timestamp
            },
            {
              name: 'Source IP',
              value: srcIP
            },
            {
              name: 'Destination IP',
              value: desIP
            },
            {
              name: 'URL',
              value: this.selectItem.network_event.tls.sni
            },
            {
              name: 'Issuerdn',
              value: this.selectItem.network_event.tls.issuerdn
            },
            {
              name: 'Authorizing',
              value: this.selectItem.network_event.tls.Authorizing
            },
            {
              name: 'Notafter',
              value: this.selectItem.network_event.tls.notafter
            },
            {
              name: 'Traffic',
              value: 'https'
            },
            ]
            break
          case 'dns':
            if (this.selectItem.network_event.dns.grouped) {
              this.selectItem.network_event.dns.HostAddr = this.selectItem.network_event.dns.grouped.join(
                ","
              );
            }
            if (this.selectItem.network_event.dns.answers) {
              this.selectItem.network_event.dns.answers.forEach(element => {
                if (this.selectItem.network_event.dns.rrname == element.rrname) {
                  this.selectItem.network_event.dns.ttl = element.ttl;
                  this.selectItem.network_event.dns.rrtype = element.rrtype;
                }
              });
            }
            var srcIP = ''
            var desIP = ''
            if (this.selectItem.network_event.src_port == 0) {
              srcIP = this.selectItem.network_event.src_ip
            } else {
              srcIP = this.selectItem.network_event.src_ip + ':' + this.selectItem.network_event.src_port
            }
            if (this.selectItem.network_event.dest_port == 0) {
              desIP = this.selectItem.network_event.dest_ip
            } else {
              desIP = this.selectItem.network_event.dest_ip + ':' + this.selectItem.network_event.dest_port
            }
            this.selectItem.event_list = [{
              name: 'Time',
              value: this.selectItem.network_event.timestamp
            },
            {
              name: 'Source IP',
              value: srcIP
            },
            {
              name: 'Destination IP',
              value: desIP
            },
            {
              name: 'SectianType',
              value: this.selectItem.network_event.dns.rrtype
            },
            {
              name: 'Domain',
              value: this.selectItem.network_event.dns.rrname
            },
            {
              name: 'TTL',
              value: this.selectItem.network_event.dns.HostAddr
            },
            {
              name: 'Traffic',
              value: 'dns'
            },
            ]
            break
          case 'krb5':
            var srcIP = ''
            var desIP = ''
            if (this.selectItem.network_event.src_port == 0) {
              srcIP = this.selectItem.network_event.src_ip
            } else {
              srcIP = this.selectItem.network_event.src_ip + ':' + this.selectItem.network_event.src_port
            }
            if (this.selectItem.network_event.dest_port == 0) {
              desIP = this.selectItem.network_event.dest_ip
            } else {
              desIP = this.selectItem.network_event.dest_ip + ':' + this.selectItem.network_event.dest_port
            }
            this.selectItem.event_list = [{
              name: 'Time',
              value: this.selectItem.network_event.timestamp
            },
            {
              name: 'Source IP',
              value: srcIP
            },
            {
              name: 'Destination IP',
              value: desIP
            },
            {
              name: 'Msg_type',
              value: this.selectItem.network_event.krb5.msg_type
            },
            {
              name: 'Cname',
              value: this.selectItem.network_event.krb5.cname
            },
            {
              name: 'Realm',
              value: this.selectItem.network_event.krb5.realm
            },
            {
              name: 'Sname',
              value: this.selectItem.network_event.krb5.sname
            },
            {
              name: 'Traffic',
              value: 'krb5'
            },
            ]
            break
          case 'http':
            var srcIP = ''
            var desIP = ''
            if (this.selectItem.network_event.src_port == 0) {
              srcIP = this.selectItem.network_event.src_ip
            } else {
              srcIP = this.selectItem.network_event.src_ip + ':' + this.selectItem.network_event.src_port
            }
            if (this.selectItem.network_event.dest_port == 0) {
              desIP = this.selectItem.network_event.dest_ip
            } else {
              desIP = this.selectItem.network_event.dest_ip + ':' + this.selectItem.network_event.dest_port
            }
            this.selectItem.event_list = [{
              name: 'Method',
              value: this.selectItem.network_event.http.http_method
            },
            {
              name: 'Source IP',
              value: srcIP
            },
            {
              name: 'Destination IP',
              value: desIP
            },
            {
              name: 'URL',
              value: this.selectItem.network_event.http.url
            },
            {
              name: 'User Agent',
              value: this.selectItem.network_event.http.http_user_agent
            },
            {
              name: 'Referrer',
              value: this.selectItem.network_event.http.http_refer
            },
            {
              name: 'Traffic',
              value: 'http'
            },
            ]
            break
          case 'alert':
            switch (this.selectItem.network_event.app_proto) {
              case 'tls':
                if (this.selectItem.network_event.tls.subject) {
                  this.selectItem.network_event.tls.Authorizing = this.selectItem.network_event.tls.subject.substring(
                    this.selectItem.network_event.tls.subject.indexOf("CN=") + 3
                  );
                }
                var srcIP = ''
                var desIP = ''
                if (this.selectItem.network_event.src_port == 0) {
                  srcIP = this.selectItem.network_event.src_ip
                } else {
                  srcIP = this.selectItem.network_event.src_ip + ':' + this.selectItem.network_event.src_port
                }
                if (this.selectItem.network_event.dest_port == 0) {
                  desIP = this.selectItem.network_event.dest_ip
                } else {
                  desIP = this.selectItem.network_event.dest_ip + ':' + this.selectItem.network_event.dest_port
                }
                this.selectItem.event_list = [{
                  name: 'Time',
                  value: this.selectItem.network_event.timestamp
                },
                {
                  name: 'Source IP',
                  value: srcIP
                },
                {
                  name: 'Destination IP',
                  value: desIP
                },
                {
                  name: 'URL',
                  value: this.selectItem.network_event.tls.sni
                },
                {
                  name: 'Issuerdn',
                  value: this.selectItem.network_event.tls.issuerdn
                },
                {
                  name: 'Authorizing',
                  value: this.selectItem.network_event.tls.Authorizing
                },
                {
                  name: 'Notafter',
                  value: this.selectItem.network_event.tls.notafter
                },
                {
                  name: 'Traffic',
                  value: 'https'
                },
                ]
                break;
              case 'http':
                var srcIP = ''
                var desIP = ''
                if (this.selectItem.network_event.src_port == 0) {
                  srcIP = this.selectItem.network_event.src_ip
                } else {
                  srcIP = this.selectItem.network_event.src_ip + ':' + this.selectItem.network_event.src_port
                }
                if (this.selectItem.network_event.dest_port == 0) {
                  desIP = this.selectItem.network_event.dest_ip
                } else {
                  desIP = this.selectItem.network_event.dest_ip + ':' + this.selectItem.network_event.dest_port
                }
                this.selectItem.event_list = [{
                  name: 'Method',
                  value: this.selectItem.network_event.http.http_method
                },
                {
                  name: 'Source IP',
                  value: srcIP
                },
                {
                  name: 'Destination IP',
                  value: desIP
                },
                {
                  name: 'URL',
                  value: this.selectItem.network_event.http.url
                },
                {
                  name: 'User Agent',
                  value: this.selectItem.network_event.http.http_user_agent
                },
                {
                  name: 'Referrer',
                  value: this.selectItem.network_event.http.http_refer
                },
                {
                  name: 'Traffic',
                  value: 'http'
                },
                ]
                break;
              default:
                if (!this.selectItem.network_event.app_proto) {
                  this.selectItem.network_event.app_proto = this.selectItem.network_event.proto
                } else if (this.selectItem.network_event.app_proto == 'failed') {
                  this.selectItem.network_event.app_proto = ''
                }
                var srcIP = ''
                var desIP = ''
                if (this.selectItem.network_event.src_port == 0) {
                  srcIP = this.selectItem.network_event.src_ip
                } else {
                  srcIP = this.selectItem.network_event.src_ip + ':' + this.selectItem.network_event.src_port
                }
                if (this.selectItem.network_event.dest_port == 0) {
                  desIP = this.selectItem.network_event.dest_ip
                } else {
                  desIP = this.selectItem.network_event.dest_ip + ':' + this.selectItem.network_event.dest_port
                }
                this.selectItem.event_list = [{
                  name: 'Time',
                  value: this.selectItem.network_event.timestamp
                },
                {
                  name: 'Source IP',
                  value: srcIP
                },
                {
                  name: 'Destination IP',
                  value: desIP
                },
                {
                  name: 'Traffic',
                  value: this.selectItem.network_event.app_proto
                },
                ]
                break;
            }
          default:
            if (!this.selectItem.network_event.app_proto) {
              this.selectItem.network_event.app_proto = this.selectItem.network_event.proto
            } else if (this.selectItem.network_event.app_proto == 'failed') {
              this.selectItem.network_event.app_proto = ''
            }
            var srcIP = ''
            var desIP = ''
            if (this.selectItem.network_event.src_port == 0) {
              srcIP = this.selectItem.network_event.src_ip
            } else {
              srcIP = this.selectItem.network_event.src_ip + ':' + this.selectItem.network_event.src_port
            }
            if (this.selectItem.network_event.dest_port == 0) {
              desIP = this.selectItem.network_event.dest_ip
            } else {
              desIP = this.selectItem.network_event.dest_ip + ':' + this.selectItem.network_event.dest_port
            }
            this.selectItem.event_list = [{
              name: 'Time',
              value: this.selectItem.network_event.timestamp
            },
            {
              name: 'Source IP',
              value: srcIP
            },
            {
              name: 'Destination IP',
              value: desIP
            },
            {
              name: 'Traffic',
              value: this.selectItem.network_event.app_proto
            },
            ]
            break;
            break;
        }
      }
    }
  },
  computed: {
    // ...mapGetters([
    //   'alertDetail'
    // ])
  },
  filters: {
    filterType: function (val) {
      if (val == '') return;
      if (val == undefined) return;
      if (val == 0) return '0B';
      var k = 1024;
      var size = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(val) / Math.log(k));
      return (val / Math.pow(k, i)).toPrecision(3) + ' ' + size[i]
    }
  }
}
</script>

<style scoped lang="less">
/deep/ .reset_tab {
  .el-tabs__header {
    margin: 0;
  }
}

.base_info {
  .content_right_title {
    height: 60px;
    line-height: 60px;
    text-align: left;
    font-size: 16px;
    color: #333333;
    font-weight: bold;
    border-bottom: 1px solid #ececec;
    padding: 0 24px;
  }
  .info_base {
    padding: 24px;
    .info_base_top {
      // border: 1px solid red;
      overflow-y: auto;
      // border-bottom: 1px solid #ececec;
      padding-top: 16px;
      .download_text {
        color: #0070ff !important;
        cursor: pointer;
        text-decoration: underline;
      }
      .info_top_item {
        // height: 22px;
        margin-bottom: 16px;
        width: 50%;
        float: left;
        text-align: left;
        display: flex;
        .info_top_item_title {
          width: 150px;
          font-size: 16px;
          color: #333333;
        }
        .info_top_item_content {
          word-break: break-all;
          flex: 1;
          font-size: 16px;
          color: #666666;
        }
        .whois_item_box {
          flex: 1;
          .whois_item {
            display: flex;
            word-break: break-all;
            .whois_item_left {
              width: 180px;
              min-height: 38px;
            }
            .whois_item_right {
              word-break: break-all;
              flex: 1;
            }
          }
        }
      }
    }
    // 网络事件
    .info_base_mid {
      // border: 1px solid red;
      .title {
        height: 38px;
        line-height: 38px;
        text-align: left;
        border-bottom: 1px solid #ececec;
      }
      .time_right_net {
        padding: 10px 0;
        display: flex;
        .time_right_net_item {
          flex: 1;
          width: 0;
          .title_net {
            height: 42px;
            text-align: left;
            background: #f8f8f8;
            font-size: 14px;
            color: #333333;
            line-height: 42px;
            padding: 0 10px;
          }
          .value_net {
            min-height: 42px;
            word-wrap: break-word;
            word-break: break-all;
            overflow: hidden;
            font-size: 14px;
            color: #666;
            text-align: left;
            padding: 10px;
          }
        }
      }
    }
    // 威胁安全建议
    .suggest_box {
      text-align: left;
      background: #fff;
      .suggest_top {
        height: 62px;
        border-bottom: 1px solid #ececec;
        .suggest_title {
          font-size: 14px;
          color: #333333;
          line-height: 62px;
        }
        .icon_img {
          width: 16px;
          vertical-align: middle;
        }
      }
      .suggest_bom {
        padding-top: 16px;
        .suggest_icon {
          width: 13px;
          height: 6px;
          vertical-align: middle;
        }
        .suggest_bom_title {
          font-size: 14px;
          color: #333333;
        }
        .suggest_bom_des {
          margin: 8px 0 24px 0;
          font-size: 14px;
          color: #666666;
        }
        .suggest_bom_li {
          font-size: 14px;
          color: #666666;
        }
        .suggest_bom_list {
          margin: 12px 0 8px 0;
        }
      }
    }

    .info_base_bom {
      display: flex;
      text-align: left;
      // border: 1px solid red;
      .base_bom_left {
        margin-right: 24px;
        flex: 1;
        .base_box {
          height: 400px;
          overflow-y: scroll;
          // border: 1px solid green;
          background: #f8f8f8;
          padding: 24px;
          .base_left_item {
            display: flex;
            // height: 36px;
            line-height: 36px;
            margin-bottom: 20px;
            padding: 0 24px;
            .left_item_title {
              width: 220px;
              img {
                vertical-align: middle;
                width: 16px;
                margin-right: 5px;
              }
              span {
                font-size: 16px;
                color: #333333;
                vertical-align: middle;
              }
            }
            .left_item_content {
              flex: 1;
              line-height: 36px;
              font-size: 14px;
              color: #666666;
            }
          }
        }
      }
      .base_bom_right {
        flex: 1;
        .suggest_bom {
          padding: 0 24px;
          .suggest_icon {
            width: 13px;
            height: 6px;
            vertical-align: middle;
          }
          .suggest_bom_title {
            font-family: PingFangMedium;
            font-size: 14px;
            color: #333333;
          }
          .suggest_bom_des {
            margin: 8px 0 24px 0;
            font-size: 14px;
            color: #666666;
          }
          .suggest_bom_li {
            font-size: 14px;
            color: #666666;
          }
          .suggest_bom_list {
            margin: 12px 0 8px 0;
          }
        }
      }
      .base_box {
        height: 400px;
        overflow-y: scroll;
        // border: 1px solid green;
        background: #f8f8f8;
        padding: 24px 0;
        &::-webkit-scrollbar {
          /*滚动条整体样式*/
          width: 5px;
        }
        &::-webkit-scrollbar-thumb {
          /*滚动条里面小方块*/
          border-radius: 5px;
          background: #5389e0;
        }
        &::-webkit-scrollbar-track {
          /*滚动条里面轨道*/
          border-radius: 5px;
          background: #fff;
        }
      }
    }
  }
}
</style>