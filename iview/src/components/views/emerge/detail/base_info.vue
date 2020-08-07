<template>
  <!-- 详细信息 -->
  <div class="base_info">
    <p class="content_right_title">详细信息</p>

    <div class="info_base">
      <div class="info_base_top">
        <div class="base_top_left">
          <div class="base_item">
            <p class="base_item_title">日志来源：</p>
            <p class="base_item_content">奇安信防火墙，启明星辰IDS</p>
          </div>
          <div class="base_item">
            <p class="base_item_title">应用：</p>
            <p class="base_item_content">http</p>
          </div>
          <div class="base_item">
            <p class="base_item_title">检测引擎：</p>
            <p class="base_item_content">XXXXXXX</p>
          </div>
          <div class="base_item">
            <p class="base_item_title">威胁指标：</p>
            <p class="base_item_content">223.17.229.272</p>
          </div>
        </div>
        <div class="base_top_right">
          <div class="base_item">
            <p class="base_item_title">威胁类型：</p>
            <p class="base_item_content">恶意地址</p>
          </div>
          <div class="base_item">
            <p class="base_item_title">描述：</p>
            <p class="base_item_content">攻击者在机器上装了恶意程序，该恶意程序通过常见的协议或者定制的协议和外部服务器通…</p>
          </div>
          <div class="base_item">
            <p class="base_item_title">攻击阶段：</p>
            <p class="base_item_content">防御逃逸</p>
          </div>
          <div class="base_item">
            <p class="base_item_title">情报来源：</p>
            <p class="base_item_content">http://www.baidu.com</p>
          </div>
        </div>
      </div>

      <div class="info_base_bom">
        <div class="base_bom_left">
          <el-tabs v-model="baseInfo.left_activeName"
                   @tab-click="handleClick"
                   class="reset_tab">
            <el-tab-pane label="情报详情"
                         class="tabs-item"
                         name="1">
              <div class="base_box">
                <div class="base_left_item">
                  <p class="left_item_title">
                    <img src="@/assets/images/emerge/base/base1.png"
                         alt="">
                    <span>地理位置</span>
                  </p>
                  <p class="left_item_content">
                    中国 · 上海
                  </p>
                </div>
                <div class="base_left_item">
                  <p class="left_item_title">
                    <img src="@/assets/images/emerge/base/base2.png"
                         alt="">
                    <span>情报来源</span>
                  </p>
                  <p class="left_item_content">
                    Saic_IPReputation
                  </p>
                </div>

                <div class="base_left_item">
                  <p class="left_item_title">
                    <img src="@/assets/images/emerge/base/base3.png"
                         alt="">
                    <span>威胁类型</span>
                  </p>
                  <p class="left_item_content">
                    恶意IP
                  </p>
                </div>

                <div class="base_left_item">
                  <p class="left_item_title">
                    <img src="@/assets/images/emerge/base/base4.png"
                         alt="">
                    <span>置信度</span>
                  </p>
                  <p class="left_item_content">
                    85
                  </p>
                </div>

                <div class="base_left_item">
                  <p class="left_item_title">
                    <img src="@/assets/images/emerge/base/base5.png"
                         alt="">
                    <span>首次发现时间</span>
                  </p>
                  <p class="left_item_content">
                    2017-03-23
                  </p>
                </div>

                <div class="base_left_item">
                  <p class="left_item_title">
                    <img src="@/assets/images/emerge/base/base6.png"
                         alt="">
                    <span>最近发现时间</span>
                  </p>
                  <p class="left_item_content">
                    2019-04-16
                  </p>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="IP_whois信息"
                         class="tabs-item"
                         name="2">
              IP_whois信息
            </el-tab-pane>
            <el-tab-pane label="关联域名"
                         class="tabs-item"
                         name="3">
              关联域名
            </el-tab-pane>
            <el-tab-pane label="关联文件"
                         class="tabs-item"
                         name="4">
              关联文件
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
                  <p class="suggest_bom_des">攻击者在机器上装了恶意程序，该恶意程序通过常见的协议或者定制的协议和外部服务器通讯。</p>
                  <p class="suggest_bom_title">安全建议</p>
                  <p class="suggest_bom_list">
                    <img src="@/assets/images/emerge/detail_suggest.png"
                         class="suggest_icon"
                         alt="">
                    <span class="suggest_bom_title">处置建议</span>
                  </p>
                  <div>
                    <!-- <p class="suggest_bom_li"
                     v-for="item in suggest_list[network_times_active.safety_suggestion].handle">
                    {{item}}
                  </p> -->
                    <p class="suggest_bom_li">
                      1、把机器从网络隔离；
                    </p>
                    <p class="suggest_bom_li">
                      2、根据告警详情里的“网络事件”里的机器端口定位机器的恶意进程；
                    </p>
                    <p class="suggest_bom_li">
                      3、做安全分析确认根因以及威胁扩散程度。如果安装有EDR解决方案，可以直接通过历史信息做安全事件调查快速定位问题；
                    </p>
                    <p class="suggest_bom_li">
                      4、安装防病毒软件做全盘扫描。
                    </p>
                  </div>
                  <p class="suggest_bom_list">
                    <img src="@/assets/images/emerge/detail_suggest.png"
                         class="suggest_icon"
                         alt="">
                    <span class="suggest_bom_title">加固建议</span>
                  </p>
                  <div>
                    <!-- <p class="suggest_bom_li"
                     v-for="item in suggest_list[network_times_active.safety_suggestion].reinforce">
                    {{item}}
                  </p> -->
                    <p class="suggest_bom_li">
                      1、提升端点安全能力；
                    </p>
                    <p class="suggest_bom_li">
                      2、用网络安全设备禁止不需要联网的设备联网；
                    </p>
                    <p class="suggest_bom_li">
                      3、用网络威胁检测工具及早发现外联威胁。
                    </p>
                  </div>
                </div>
              </div>

            </el-tab-pane>
          </el-tabs>
        </div>
      </div>

    </div>

  </div>
</template>
<script>
export default {
  name: '',
  data () {
    return {
      baseInfo: {
        left_activeName: '1',
        right_activeName: '1'
      }
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab);
    },
    handleClick_right (tab, event) {
      console.log(tab);
    },
  },
  computed: {}
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
      display: flex;
      .base_item {
        display: flex;
        min-height: 30px;
        line-height: 30px;
        margin-bottom: 16px;
        .base_item_title {
          width: 104px;
          font-size: 16px;
          color: #333333;
          text-align: left;
        }
        .base_item_content {
          text-align: left;
          flex: 1;
          font-size: 16px;
          color: #666666;
        }
      }
      .base_top_left {
        margin-right: 24px;
        flex: 1;
      }
      .base_top_right {
        flex: 1;
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
          padding-top: 30px;
          .base_left_item {
            display: flex;
            height: 36px;
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