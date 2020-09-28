<template>
  <div id="common_invest"
       v-loading.fullscreen.lock="fullscreenLoading">
    <div class="common_invest_top">
      <p class="title">提问</p>
      <div class="search_box">
        <el-input class="search_box_left"
                  placeholder="请输入内容"
                  v-model="search_data.name">
          <template slot="append">
            <el-date-picker v-model="time_list"
                            class="vm_emerge_picker"
                            type="datetimerange"
                            :picker-options="pickerOptions"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            align="right">
            </el-date-picker>
          </template>
        </el-input>
        <div class="search_box_right">
          搜索
        </div>
      </div>
    </div>

    <div class="log_content"
         v-if="searchShow">
      <div class="line"
           id="emergeLine"></div>
      <!-- 维度统计 -->
      <div class="DimensionAggregation">
        <div class="DimensionFlexBox">
          <div class="DimensionFlexItem">
            <p class="title">TOP 日志类型</p>
            <div class="item_box">
              <div class="right">
                <p class="tips"
                   v-if="!DimensionAggregation.classification_show">暂无数据分类</p>
                <div v-if="DimensionAggregation.classification_show"
                     id="classification"></div>
              </div>
            </div>
          </div>
          <div class="space_div">
          </div>
          <div class="DimensionFlexItem">
            <p class="title">TOP 事件类型</p>
            <div class="item_box">
              <div class="right">
                <p class="tips"
                   v-if="!DimensionAggregation.eventtype_show">暂无数据分类</p>
                <div v-if="DimensionAggregation.eventtype_show"
                     id="eventtype"></div>
                <!-- <div id="eventtype"></div> -->
              </div>
            </div>
          </div>
          <div class="space_div">
          </div>
          <div class="DimensionFlexItem">
            <p class="title">关联资产</p>
            <div class="item_box">
              <div class="right">
                <p class="tips"
                   v-if="!DimensionAggregation.server_name_show">暂无数据分类</p>
                <div v-if="DimensionAggregation.server_name_show"
                     id="server_name"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="DimensionFlexBox">
          <div class="DimensionFlexItem">
            <p class="title">账号</p>
            <div class="item_box">
              <div class="right">
                <p class="tips"
                   v-if="!DimensionAggregation.account_show">暂无数据分类</p>
                <div v-if="DimensionAggregation.account_show"
                     id="account"></div>
              </div>
            </div>
          </div>
          <div class="space_div">
          </div>
          <div class="DimensionFlexItem">
            <p class="title">国家</p>
            <div class="item_box">
              <div class="right">
                <p class="tips"
                   v-if="!DimensionAggregation.city_name_show">暂无数据分类</p>
                <div v-if="DimensionAggregation.city_name_show"
                     id="city_name"></div>
              </div>
            </div>
          </div>
          <div class="space_div">
          </div>
          <div class="DimensionFlexItem">
            <p class="title">TOP 应用</p>
            <div class="item_box">
              <div class="right">
                <p class="tips"
                   v-if="!DimensionAggregation.app_show">暂无数据分类</p>
                <div v-if="DimensionAggregation.app_show"
                     id="app"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div v-if="searchShow">
      <p class="list_title">日志</p>
    </div>
    <div class="log_content"
         v-if="searchShow">
      <div class="export_box">
        <!-- <span class="export_i">导出归一化日志</span> -->
        <span class="export_o"
              @click="OriginalLog">导出原始日志</span>
      </div>
      <!-- 日志列表 -->
      <div class="log_table_box">
        <div class="log_table_left">
          <el-table class="reset_table"
                    ref="multipleTable"
                    align="center"
                    border
                    height="90%"
                    :data="log_list.data.hits.hits"
                    tooltip-effect="dark"
                    style="width: 100%"
                    :row-style="selectedHighlight"
                    @row-click="rowClick"
                    :highlight-current-row="true"
                    :row-class-name="tableRowClassName"
                    @selection-change="handleSelectionChange">
            <el-table-column label="日志时间"
                             align="center"
                             width="150"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row._source.time | timestamp}}</span>
                <!-- <span>{{ scope.row._source.time}}</span> -->
              </template>
            </el-table-column>
            <el-table-column prop="_source.server_name"
                             label="日志来源"
                             align="center"
                             width="150"
                             show-overflow-tooltip></el-table-column>
            <el-table-column prop="_source.classification"
                             label="日志类型"
                             align="center"
                             width="150"
                             show-overflow-tooltip></el-table-column>
            <el-table-column prop="_source.eventtype"
                             label="事件类型"
                             width="150"
                             align="center"
                             show-overflow-tooltip></el-table-column>
            <el-table-column prop="_source.direction"
                             label="方向"
                             align="center"
                             width="150"
                             show-overflow-tooltip></el-table-column>
            <el-table-column prop="_source.srcIp"
                             width='150'
                             label="源地址"
                             align="center"
                             show-overflow-tooltip></el-table-column>
            <el-table-column prop="_source.src_name"
                             label="源资产名"
                             align="center"
                             width="150"
                             show-overflow-tooltip></el-table-column>
            <el-table-column prop="_source.src_port"
                             label="源端口"
                             align="center"
                             show-overflow-tooltip></el-table-column>
            <el-table-column prop="_source.src_account"
                             label="源账号"
                             align="center"
                             width="150"
                             show-overflow-tooltip></el-table-column>
            <el-table-column prop="_source.destIp"
                             label="目的地址"
                             width='150'
                             align="center"
                             show-overflow-tooltip></el-table-column>
            <el-table-column prop="_source.dst_name"
                             label="目的资产名"
                             width='150'
                             align="center"
                             show-overflow-tooltip></el-table-column>
            <el-table-column prop="_source.dst_port"
                             label="目的端口"
                             align="center"
                             show-overflow-tooltip></el-table-column>
            <el-table-column prop="_source.dst_account"
                             label="目的账号"
                             align="center"
                             width="150"
                             show-overflow-tooltip></el-table-column>
            <el-table-column prop="_source.proto"
                             label="协议"
                             align="center"
                             width="150"
                             show-overflow-tooltip></el-table-column>
            <el-table-column prop="_source.app"
                             label="应用"
                             align="center"
                             width="150"
                             show-overflow-tooltip></el-table-column>
          </el-table>
          <el-pagination class="handle_pagination"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :page-sizes="[10,20,50,100]"
                         :page-size="log_list.rows*1"
                         :current-page="log_list.pageNow*1"
                         :total="log_list.data.hits.total.value*1"
                         layout="total, sizes, prev, pager, next">
          </el-pagination>
        </div>
        <div class="log_table_right">
          <el-tabs v-model="activelog"
                   @tab-click="handleClick"
                   class="reset_tab">
            <el-tab-pane label="完整日志"
                         class="tabs-item"
                         name="1">
              <div class="reset_item_box">
                <div class="reset_img_box"
                     v-if="complete_log.length == 0">
                  <img src="@/assets/images/emerge/log_space.png"
                       class="img_box"
                       alt />
                  <p class="space_title">未选择日志</p>
                </div>
                <div class="complete_item"
                     v-for="item in complete_log"
                     v-if="complete_log.length != 0">
                  <p class="complete_item_title">{{item.name}}</p>
                  <div class="complete_item_content">{{item.value}}</div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="原始日志"
                         class="tabs-item"
                         name="2">
              <div class="reset_item_box">
                <div class="reset_img_box"
                     v-if="complete_log.length == 0">
                  <img src="@/assets/images/emerge/log_space.png"
                       class="img_box"
                       alt />
                  <p class="space_title">未选择日志</p>
                </div>
                <p v-if="complete_log.length != 0"
                   class="original_log">{{original_log}}</p>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import vmEmergePicker from "@/components/common/vm-emerge-picker";
import { eventBus } from '@/components/common/eventBus.js';
export default {
  name: "common_invest",
  components: {
    vmEmergePicker,
  },
  data () {
    return {
      activeName: 'first',
      fullscreenLoading: false,
      activelog: '1',
      searchShow: false,
      query_data: {},
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      search_data: {
        start_time: '',
        end_time: '',
        name: ''
      },
      tableRowClassName: "",
      time_list: [],
      ecarts_data: {
        time: [],
        count: []
      },
      log_list: {
        data: {
          hits: {
            hits: [],
            total: {
              value: 0
            }
          }
        },
        rows: 10,
        pageNow: 1
      },
      original_log: "",
      complete_log: [],
      search_time: "",
      // 维度聚合数据
      DimensionAggregation: {
        classification: [],
        classification_show: true,
        eventtype: [],
        eventtype_show: true,
        account: [],
        account_show: true,
        city_name: [],
        city_name_show: true,
        server_name: [],
        server_name_show: true,
        app: [],
        app_show: true,
      }
    };
  },
  computed: {

  },
  mounted () {
    this.check_passwd();
    this.test()
    console.log(this.$route);

    if (this.$route.query.search) {
      this.searchShow = true
      this.query_data = JSON.parse(this.$route.query.search)
      console.log(new Date(this.query_data.srcTime));
      console.log(new Date(this.query_data.destTime));
      this.search_data.name = 'IP为' + this.query_data.ip
      this.search_data.start_time = this.query_data.srcTime
      this.search_data.end_time = this.query_data.destTime
      this.time_list.push(new Date(this.query_data.srcTime))
      this.time_list.push(new Date(this.query_data.destTime))
      this.get_data()
      this.get_log_list()
      this.classification()
      this.account()
      this.eventtype()
      this.city_name()
      this.server_name()
      this.app()

    }
  },
  methods: {
    get_data () {
      this.fullscreenLoading = true
      console.log(this.search_data);
      // 图表
      this.$axios
        .get("/yiiapi/site/HoursLogs", {
          params: {
            // srcIp或者destIp
            ip_type: this.query_data.type,
            srcTime: this.query_data.srcTime,
            destTime: this.query_data.destTime,
            ip: this.query_data.ip,
            server_name: this.query_data.server_name,
          },
        })
        .then((resp) => {
          this.fullscreenLoading = false
          console.log(resp.data.data.aggregations.types_count.buckets);
          resp.data.data.aggregations.types_count.buckets.map(item => {
            this.ecarts_data.time.push(item.key_as_string)
            this.ecarts_data.count.push(item.doc_count)
          })
          this.drawLine()
        })
        .catch((error) => {
          console.log(error);
        });

    },
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("emergeLine"));
      // 绘制图表
      myChart.setOption({
        grid: {
          top: "18%",
          left: "2%",
          right: "4%",
          bottom: "18%",
          containLabel: true
        },
        color: '#0070FF',
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: "#ddd",
            },
          },
          backgroundColor: "rgba(255,255,255,1)",
          padding: [5, 10],
          textStyle: {
            color: "#0070FF",
          },
          extraCssText: "box-shadow: 0 0 5px rgba(0,0,0,0.3)",
        },
        xAxis: {
          boundaryGap: false,
          //网格样式
          axisLine: {
            lineStyle: {
              color: "#ECECEC",
              width: 2
            }
          },
          axisLabel: {
            textStyle: {
              color: "#666666",
            },
            formatter: function (val) {
              var strs = val.split(' '); //字符串数组
              let str = ''
              if (val != '0') {
                str = strs[0] + '\n' + strs[1];
              }
              return str;
            }
          },
          axisTick: {
            show: false
          },
          data: this.ecarts_data.time
        },
        yAxis: {
          //网格样式
          splitLine: {
            show: true,
            lineStyle: {
              color: ["#F4F4F4"],
              width: 1,
              type: "solid"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#ECECEC",
              width: 2
            }
          },
          axisLabel: {
            textStyle: {
              color: "#666666"
            }
          },
          axisTick: {
            show: false
          },
        },
        series: {
          name: "日志数量",
          type: "line",
          smooth: true,
          showSymbol: false,
          symbolSize: 0,
          lineStyle: {
            normal: {
              width: 2,
              color: "#0070FF",
              opacity: 0.5
            },
          },
          symbol: "circle",
          areaStyle: {
            color: "#0070FF",
            opacity: 0.12
          },
          data: this.ecarts_data.count
        }
      });
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
    get_log_list () {
      // 日志列表
      this.$axios
        .get("/yiiapi/investigate/ListDetails", {
          params: {
            // srcIp或者destIp
            ip_type: this.query_data.type,
            ip: this.query_data.ip,
            srcTime: this.query_data.srcTime,
            destTime: this.query_data.destTime,
            server_name: this.query_data.server_name,
            size: this.log_list.rows,
            from: this.log_list.rows * (this.log_list.pageNow - 1),
          },
        })
        .then((resp) => {
          console.log(resp.data);
          this.log_list.data = resp.data.data;
          this.log_list.data.hits.hits.map(item => {
            for (var k in item._source) {
              if (k == "@timestamp") {
                item._source.time = item._source[k]
              }
            }
          })
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 测试600专用
    test () {
      this.$axios.get('/yiiapi/site/CheckAuthExist', {
        params: {
          pathInfo: 'investigate/DnsInvestigation',
          method: 'GET',
        }
      })
        .then(response => {

        })
        .catch(error => {
          console.log(error);
        })
    },
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
    eventtype_echarts () {
      var xAxis_data = []
      var yAxis_data = []

      this.DimensionAggregation.eventtype.map(item => {
        if (item.key == '') {
          this.DimensionAggregation.eventtype_show = false
        }
        item.key = item.key == '' ? '其他' : item.key

        yAxis_data.unshift(item.key)
        xAxis_data.unshift(item.doc_count)
      })
      let myChart = this.$echarts.init(document.getElementById("eventtype"));
      myChart.setOption(
        {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: 0,
            right: 50,
            bottom: 0,
            top: 0,
            containLabel: true
          },
          xAxis: {
            type: 'value',
            minInterval: 1,
            // splitNumber: 5,
            boundaryGap: false,
            axisTick: { //y轴刻度线
              show: false
            },
            axisLabel: {
              rotate: 60
            },
            axisLine: { //y轴
              show: false
            },
          },
          yAxis: {
            axisTick: { //y轴刻度线
              show: false
            },
            // axisLabel: {
            //   align: 'left'
            // },
            axisLine: { //y轴
              show: false
            },
            type: 'category',
            data: yAxis_data
          },
          color: ['#5389E0'],
          series: [
            {
              itemStyle: {
                normal: {
                  label: {
                    show: true,		//开启显示
                    position: 'right',	//在上方显示
                    textStyle: {	    //数值样式
                      color: '#5389E0',
                      fontSize: 14
                    }
                  }
                }
              },
              name: '日志数量',
              type: 'bar',
              barWidth: '20',
              data: xAxis_data
            }
          ]
        }
      );
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
    classification_echarts () {
      var xAxis_data = []
      var yAxis_data = []
      this.DimensionAggregation.classification.map(item => {
        if (item.key == '') {
          this.DimensionAggregation.classification_show = false
        }
        item.key = item.key == '' ? '其他' : item.key
        yAxis_data.unshift(item.key)
        xAxis_data.unshift(item.doc_count)
      })
      let myChart = this.$echarts.init(document.getElementById("classification"));
      myChart.setOption(
        {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: 0,
            right: 50,
            bottom: 0,
            top: 0,
            containLabel: true
          },
          xAxis: {
            type: 'value',
            minInterval: 1,
            boundaryGap: false,
            axisTick: { //y轴刻度线
              show: false
            },
            axisLabel: {
              rotate: 60
            },
            axisLine: { //y轴
              show: false
            },
          },
          yAxis: {
            axisTick: { //y轴刻度线
              show: false
            },
            // axisLabel: {
            //   align: 'left'
            // },
            axisLine: { //y轴
              show: false
            },
            type: 'category',
            data: yAxis_data
          },
          color: ['#5389E0'],
          series: [
            {
              itemStyle: {
                normal: {
                  label: {
                    show: true,		//开启显示
                    position: 'right',	//在上方显示
                    textStyle: {	    //数值样式
                      color: '#5389E0',
                      fontSize: 14
                    }
                  }
                }
              },
              name: '日志数量',
              type: 'bar',
              barWidth: '20',
              data: xAxis_data
            }
          ]
        }
      );
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
    account_echarts () {
      var xAxis_data = []
      var yAxis_data = []
      this.DimensionAggregation.account.map(item => {
        if (item.key == '') {
          this.DimensionAggregation.account_show = false
        }
        item.key = item.key == '' ? '其他' : item.key
        yAxis_data.unshift(item.key)
        xAxis_data.unshift(item.doc_count)
      })
      let myChart = this.$echarts.init(document.getElementById("account"));
      myChart.setOption(
        {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: 0,
            right: 50,
            bottom: 0,
            top: 0,
            containLabel: true
          },
          xAxis: {
            type: 'value',
            minInterval: 1,
            boundaryGap: false,
            axisTick: { //y轴刻度线
              show: false
            },
            axisLabel: {
              rotate: 60
            },
            axisLine: { //y轴
              show: false
            },
          },
          yAxis: {
            axisTick: { //y轴刻度线
              show: false
            },
            // axisLabel: {
            //   align: 'left'
            // },
            axisLine: { //y轴
              show: false
            },
            type: 'category',
            data: yAxis_data
          },
          color: ['#5389E0'],
          series: [
            {
              itemStyle: {
                normal: {
                  label: {
                    show: true,		//开启显示
                    position: 'right',	//在上方显示
                    textStyle: {	    //数值样式
                      color: '#5389E0',
                      fontSize: 14
                    }
                  }
                }
              },
              name: '日志数量',
              type: 'bar',
              barWidth: '20',
              data: xAxis_data
            }
          ]
        }
      );
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
    city_name_echarts () {
      var xAxis_data = []
      var yAxis_data = []
      this.DimensionAggregation.city_name.map(item => {
        if (item.key == '') {
          this.DimensionAggregation.city_name_show = false
        }
        item.key = this.filter_country(item.key)
        item.key = item.key == '' ? '其他' : item.key

        yAxis_data.unshift(item.key)
        xAxis_data.unshift(item.doc_count)
      })
      let myChart = this.$echarts.init(document.getElementById("city_name"));
      myChart.setOption(
        {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: 0,
            right: 50,
            bottom: 0,
            top: 0,
            containLabel: true
          },
          xAxis: {
            type: 'value',
            minInterval: 1,
            boundaryGap: true,
            axisTick: { //y轴刻度线
              show: false
            },
            axisLine: { //y轴
              show: false
            },
            axisLabel: {
              rotate: 60
            }
            // interval: 0,
          },
          yAxis: {
            axisTick: { //y轴刻度线
              show: false
            },
            axisLabel: {
              // align: 'left'
            },
            axisLine: { //y轴
              show: false
            },
            type: 'category',
            data: yAxis_data
          },
          color: ['#5389E0'],
          series: [
            {
              itemStyle: {
                normal: {
                  label: {
                    show: true,		//开启显示
                    position: 'right',	//在上方显示
                    textStyle: {	    //数值样式
                      color: '#5389E0',
                      fontSize: 14
                    }
                  }
                }
              },
              name: '日志数量',
              type: 'bar',
              barWidth: '15',
              data: xAxis_data
            }
          ]
        }
      );
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
    server_name_echarts () {
      var xAxis_data = []
      var yAxis_data = []
      this.DimensionAggregation.server_name.map(item => {
        if (item.key != '') {
          this.DimensionAggregation.server_name_show = true
        }
        item.key = item.key == '' ? '其他' : item.key
        yAxis_data.unshift(item.key)
        xAxis_data.unshift(item.doc_count)
      })
      let myChart = this.$echarts.init(document.getElementById("server_name"));
      myChart.setOption(
        {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: 0,
            right: 50,
            bottom: 0,
            top: 0,
            containLabel: true
          },
          xAxis: {
            type: 'value',
            minInterval: 1,
            boundaryGap: false,
            axisTick: { //y轴刻度线
              show: false
            },
            axisLabel: {
              rotate: 60
            },
            axisLine: { //y轴
              show: false
            },
          },
          yAxis: {
            axisTick: { //y轴刻度线
              show: false
            },
            // axisLabel: {
            //   align: 'left'
            // },
            axisLine: { //y轴
              show: false
            },
            type: 'category',
            data: yAxis_data
          },
          color: ['#5389E0'],
          series: [
            {
              itemStyle: {
                normal: {
                  label: {
                    show: true,		//开启显示
                    position: 'right',	//在上方显示
                    textStyle: {	    //数值样式
                      color: '#5389E0',
                      fontSize: 14
                    }
                  }
                }
              },
              name: '日志数量',
              type: 'bar',
              barWidth: '20',
              data: xAxis_data
            }
          ]
        }
      );
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
    app_echarts () {
      var xAxis_data = []
      var yAxis_data = []
      this.DimensionAggregation.app.map(item => {
        if (item.key == '') {
          this.DimensionAggregation.app_show = false
        }
        item.key = item.key == '' ? '其他' : item.key
        yAxis_data.unshift(item.key)
        xAxis_data.unshift(item.doc_count)
      })
      let myChart = this.$echarts.init(document.getElementById("app"));
      myChart.setOption(
        {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: 0,
            right: 50,
            bottom: 0,
            top: 0,
            containLabel: true
          },
          xAxis: {
            type: 'value',
            minInterval: 1,
            boundaryGap: false,
            axisTick: { //y轴刻度线
              show: false
            },
            axisLabel: {
              rotate: 60
            },
            axisLine: { //y轴
              show: false
            },
          },
          yAxis: {
            axisTick: { //y轴刻度线
              show: false
            },
            // axisLabel: {
            //   align: 'left'
            // },
            axisLine: { //y轴
              show: false
            },
            type: 'category',
            data: yAxis_data
          },
          color: ['#5389E0'],
          series: [
            {
              itemStyle: {
                normal: {
                  label: {
                    show: true,		//开启显示
                    position: 'right',	//在上方显示
                    textStyle: {	    //数值样式
                      color: '#5389E0',
                      fontSize: 14
                    }
                  }
                }
              },
              name: '日志数量',
              type: 'bar',
              barWidth: '20',
              data: xAxis_data
            }
          ]
        }
      );
      window.addEventListener("resize", () => {
        console.log('11111111111111');

        myChart.resize();
      });
    },
    classification () {
      this.$axios
        .get("/yiiapi/investigate/DimensionAggregation", {
          params: {
            ip_type: this.query_data.type,
            ip: this.query_data.ip,
            srcTime: this.query_data.srcTime,
            destTime: this.query_data.destTime,
            server_name: this.query_data.server_name,
            field: 'classification',
          },
        })
        .then((resp) => {
          console.log(resp.data);
          this.DimensionAggregation.classification = resp.data.data.aggregations.server_count.buckets
          this.classification_echarts()
        })
        .catch((error) => {
          console.log(error);
        });
    },
    account () {
      // 日志列表
      this.$axios
        .get("/yiiapi/investigate/DimensionAggregation", {
          params: {
            // srcIp或者destIp
            ip_type: this.query_data.type,
            ip: this.query_data.ip,
            srcTime: this.query_data.srcTime,
            destTime: this.query_data.destTime,
            server_name: this.query_data.server_name,
            field: 'account',
          },
        })
        .then((resp) => {
          console.log(resp.data);
          this.DimensionAggregation.account = resp.data.data.aggregations.server_count.buckets
          this.DimensionAggregation.account.map(item => {
            if (item.key == '') {
              this.DimensionAggregation.account_show = false
            }
          })
          this.account_echarts()
        })
        .catch((error) => {
          console.log(error);
        });
    },
    eventtype () {
      this.$axios
        .get("/yiiapi/investigate/DimensionAggregation", {
          params: {
            ip_type: this.query_data.type,
            ip: this.query_data.ip,
            srcTime: this.query_data.srcTime,
            destTime: this.query_data.destTime,
            server_name: this.query_data.server_name,
            field: 'eventtype',
          },
        })
        .then((resp) => {
          console.log(resp.data);
          this.DimensionAggregation.eventtype = resp.data.data.aggregations.server_count.buckets
          this.eventtype_echarts()
        })
        .catch((error) => {
          console.log(error);
        });
    },
    city_name () {
      this.$axios
        .get("/yiiapi/investigate/DimensionAggregation", {
          params: {
            ip_type: this.query_data.type,
            ip: this.query_data.ip,
            srcTime: this.query_data.srcTime,
            destTime: this.query_data.destTime,
            server_name: this.query_data.server_name,
            field: 'geoip.country_code2',
          },
        })
        .then((resp) => {
          console.log(resp.data);
          this.DimensionAggregation.city_name = resp.data.data.aggregations.server_count.buckets
          this.city_name_echarts()
        })
        .catch((error) => {
          console.log(error);
        });
    },
    server_name () {
      this.$axios
        .get("/yiiapi/investigate/DimensionAggregation", {
          params: {
            ip_type: this.query_data.type,
            ip: this.query_data.ip,
            srcTime: this.query_data.srcTime,
            destTime: this.query_data.destTime,
            server_name: this.query_data.server_name,
            field: 'server_name',
          },
        })
        .then((resp) => {
          console.log(resp.data);
          this.DimensionAggregation.server_name = resp.data.data.aggregations.server_count.buckets
          this.server_name_echarts()
        })
        .catch((error) => {
          console.log(error);
        });
    },
    app () {
      this.$axios
        .get("/yiiapi/investigate/DimensionAggregation", {
          params: {
            ip_type: this.query_data.type,
            ip: this.query_data.ip,
            srcTime: this.query_data.srcTime,
            destTime: this.query_data.destTime,
            server_name: this.query_data.server_name,
            field: 'app',
          },
        })
        .then((resp) => {
          console.log(resp.data);
          this.DimensionAggregation.app = resp.data.data.aggregations.server_count.buckets
          this.app_echarts()
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleSelectionChange () { },
    selectedHighlight ({ row, rowIndex }) {
      // console.log(row);
      // console.log(rowIndex);
    },
    rowClick (row, event, column) {
      console.log(row);
      this.original_log = row._source.message;
      this.complete_log = row._source;
      this.complete_log = [
        {
          name: 'srcIp',
          value: row._source.srcIp
        },
        {
          name: 'src_name',
          value: row._source.src_name
        },
        {
          name: 'src_port',
          value: row._source.src_port
        },
        {
          name: 'src_account',
          value: row._source.src_account
        },
        {
          name: 'destIp',
          value: row._source.destIp
        },
        {
          name: 'dst_account',
          value: row._source.dst_account
        },
        {
          name: 'dst_port',
          value: row._source.dst_port
        },
        {
          name: 'proto',
          value: row._source.proto
        },
        {
          name: 'app',
          value: row._source.app
        },
        {
          name: 'url',
          value: row._source.url
        },
        {
          name: 'hash',
          value: row._source.hash
        },
      ]
      this.$refs.multipleTable.setCurrentRow(row);
    },
    handleClick () { },
    //每頁多少條切換
    handleSizeChange (val) {
      this.log_list.rows = val;
      this.log_list.pageNow = 1;
      this.get_log_list();
    },
    //頁數點擊切換
    handleCurrentChange (val) {
      this.log_list.pageNow = val;
      this.get_log_list()
    },
    changeTime (data) {
      console.log(data);
      if (data) {
        this.search_data.start_time = parseInt(data[0].valueOf() / 1000);
        this.search_data.end_time = parseInt(data[1].valueOf() / 1000)
      } else {
        this.search_data.start_time = ''
        this.search_data.end_time = ''
      }
    },
    OriginalLog () {
      window.open(
        "/yiiapi/investigate/OriginalLog?ip_type=" +
        this.query_data.type +
        "&ip=" +
        this.query_data.ip + "&server_name=" + this.query_data.server_name
        + "&stime=" + this.query_data.srcTime
        + "&etime=" + this.query_data.destTime
      );
    },
    filter_country (args) {
      let country_cn = ''
      switch (args) {
        case 'O1':
          country_cn = '其他国家'
          break;
        case 'o1':
          country_cn = '其他国家'
          break;
        case 'AD':
          country_cn = '安道尔'
          break;
        case 'AE':
          country_cn = '阿拉伯联合酋长国'
          break;
        case 'AF':
          country_cn = '阿富汗'
          break;
        case 'AG':
          country_cn = '安提瓜和巴布达'
          break;
        case 'AI':
          country_cn = '安圭拉'
          break;
        case 'AL':
          country_cn = '阿尔巴尼亚'
          break;
        case 'AM':
          country_cn = '亚美尼亚'
          break;
        case 'AO':
          country_cn = '安哥拉'
          break;
        case 'AP':
          country_cn = '亚太地区'
          break;
        case 'AQ':
          country_cn = '南极洲'
          break;
        case 'AR':
          country_cn = '阿根廷'
          break;
        case 'AS':
          country_cn = '美属萨摩亚'
          break;
        case 'AT':
          country_cn = '奥地利'
          break;
        case 'AU':
          country_cn = '澳大利亚'
          break;
        case 'AW':
          country_cn = '阿鲁巴'
          break;
        case 'AX':
          country_cn = '奥兰群岛'
          break;
        case 'AZ':
          country_cn = '阿塞拜疆'
          break;
        case 'BA':
          country_cn = '波黑'
          break;
        case 'BB':
          country_cn = '巴巴多斯'
          break;
        case 'BD':
          country_cn = '孟加拉国'
          break;
        case 'BE':
          country_cn = '比利时'
          break;
        case 'BF':
          country_cn = '布基纳法索'
          break;
        case 'BG':
          country_cn = '保加利亚'
          break;
        case 'BH':
          country_cn = '巴林'
          break;
        case 'BI':
          country_cn = '布隆迪'
          break;
        case 'BJ':
          country_cn = '贝宁'
          break;
        case 'BL':
          country_cn = '圣巴泰勒米'
          break;
        case 'BM':
          country_cn = '百慕大'
          break;
        case 'BN':
          country_cn = '文莱达鲁萨兰国'
          break;
        case 'BO':
          country_cn = '玻利维亚'
          break;
        case 'BQ':
          country_cn = '博奈尔岛,圣尤斯达蒂斯和萨巴岛'
          break;
        case 'BR':
          country_cn = '巴西'
          break;
        case 'BS':
          country_cn = '巴哈马'
          break;
        case 'BT':
          country_cn = '不丹'
          break;
        case 'BV':
          country_cn = '布维岛'
          break;
        case 'BW':
          country_cn = '博茨瓦纳'
          break;
        case 'BY':
          country_cn = '白俄罗斯'
          break;
        case 'BZ':
          country_cn = '伯利兹'
          break;
        case 'CA':
          country_cn = '加拿大'
          break;
        case 'CC':
          country_cn = '科科斯（ 基林） 群岛'
          break;
        case 'CD':
          country_cn = '刚果民主共和国'
          break;
        case 'CF':
          country_cn = '中非共和国'
          break;
        case 'CG':
          country_cn = '刚果'
          break;
        case 'CH':
          country_cn = '瑞士'
          break;
        case 'CI':
          country_cn = '科特迪瓦'
          break;
        case 'CK':
          country_cn = '库克群岛'
          break;
        case 'CL':
          country_cn = '智利'
          break;
        case 'CM':
          country_cn = '喀麦隆'
          break;
        case 'CN':
          country_cn = '中国'
          break;
        case 'CO':
          country_cn = '哥伦比亚'
          break;
        case 'CR':
          country_cn = '哥斯达黎加'
          break;
        case 'CU':
          country_cn = '古巴'
          break;
        case 'CV':
          country_cn = '佛得角'
          break;
        case 'CW':
          country_cn = '库拉索'
          break;
        case 'CX':
          country_cn = '圣诞岛'
          break;
        case 'CY':
          country_cn = '塞浦路斯'
          break;
        case 'CZ':
          country_cn = '捷克共和国'
          break;
        case 'DE':
          country_cn = '德国'
          break;
        case 'DJ':
          country_cn = '吉布地'
          break;
        case 'DK':
          country_cn = '丹麦'
          break;
        case 'DM':
          country_cn = '多米尼加'
          break;
        case 'DO':
          country_cn = '多明尼加共和国'
          break;
        case 'DZ':
          country_cn = '阿尔及利亚'
          break;
        case 'EC':
          country_cn = '厄瓜多尔'
          break;
        case 'EE':
          country_cn = '爱沙尼亚'
          break;
        case 'EG':
          country_cn = '埃及'
          break;
        case 'EH':
          country_cn = '西撒哈拉'
          break;
        case 'ER':
          country_cn = '厄立特里亚'
          break;
        case 'ES':
          country_cn = '西班牙'
          break;
        case 'ET':
          country_cn = '埃塞俄比亚'
          break;
        case 'EU':
          country_cn = '欧洲'
          break;
        case 'FI':
          country_cn = '芬兰'
          break;
        case 'FJ':
          country_cn = '斐济'
          break;
        case 'FK':
          country_cn = '福克兰群岛（马尔维纳斯）'
          break;
        case 'FM':
          country_cn = '密克罗尼西亚联邦'
          break;
        case 'FO':
          country_cn = '法罗群岛'
          break;
        case 'FR':
          country_cn = '法国'
          break;
        case 'GA':
          country_cn = '加蓬'
          break;
        case 'GB':
          country_cn = '英国'
          break;
        case 'GD':
          country_cn = '格林纳达'
          break;
        case 'GE':
          country_cn = '佐治亚州'
          break;
        case 'GF':
          country_cn = '法属圭亚那'
          break;
        case 'GG':
          country_cn = '根西岛'
          break;
        case 'GH':
          country_cn = '加纳'
          break;
        case 'GI':
          country_cn = '直布罗陀'
          break;
        case 'GL':
          country_cn = '格陵兰'
          break;
        case 'GM':
          country_cn = '冈比亚'
          break;
        case 'GN':
          country_cn = '几内亚'
          break;
        case 'GP':
          country_cn = '瓜德罗普岛'
          break;
        case 'GQ':
          country_cn = '赤道几内亚'
          break;
        case 'GR':
          country_cn = '希腊'
          break;
        case 'GS':
          country_cn = '南乔治亚岛和南桑威奇群岛'
          break;
        case 'GT':
          country_cn = '危地马拉'
          break;
        case 'GU':
          country_cn = '关岛'
          break;
        case 'GW':
          country_cn = '几内亚比绍'
          break;
        case 'GY':
          country_cn = '圭亚那'
          break;
        case 'HK':
          country_cn = '香港'
          break;
        case 'HM':
          country_cn = '赫德岛和麦克唐纳群岛'
          break;
        case 'HN':
          country_cn = '洪都拉斯'
          break;
        case 'HR':
          country_cn = '克罗地亚'
          break;
        case 'HT':
          country_cn = '海地'
          break;
        case 'HU':
          country_cn = '匈牙利'
          break;
        case 'ID':
          country_cn = '印度尼西亚'
          break;
        case 'IE':
          country_cn = '爱尔兰'
          break;
        case 'IL':
          country_cn = '以色列'
          break;
        case 'IM':
          country_cn = '马恩岛'
          break;
        case 'IN':
          country_cn = '印度'
          break;
        case 'IO':
          country_cn = '英属印度洋领地'
          break;
        case 'IQ':
          country_cn = '伊拉克'
          break;
        case 'IR':
          country_cn = '伊朗伊斯兰共和国'
          break;
        case 'IS':
          country_cn = '冰岛'
          break;
        case 'IT':
          country_cn = '意大利'
          break;
        case 'JE':
          country_cn = '泽西岛'
          break;
        case 'JM':
          country_cn = '牙买加'
          break;
        case 'JO':
          country_cn = '约旦'
          break;
        case 'JP':
          country_cn = '日本'
          break;
        case 'KE':
          country_cn = '肯尼亚'
          break;
        case 'KG':
          country_cn = '吉尔吉斯斯坦'
          break;
        case 'KH':
          country_cn = '柬埔寨'
          break;
        case 'KI':
          country_cn = '基里巴斯'
          break;
        case 'KM':
          country_cn = '科摩罗'
          break;
        case 'KN':
          country_cn = '圣基茨和尼维斯'
          break;
        case 'KP':
          country_cn = '朝鲜民主主义人民共和国'
          break;
        case 'KR':
          country_cn = '韩国'
          break;
        case 'KW':
          country_cn = '科威特'
          break;
        case 'KY':
          country_cn = '开曼群岛'
          break;
        case 'KZ':
          country_cn = '哈萨克斯坦'
          break;
        case 'LA':
          country_cn = '老挝人民民主共和国'
          break;
        case 'LB':
          country_cn = '黎巴嫩'
          break;
        case 'LC':
          country_cn = '圣卢西亚'
          break;
        case 'LI':
          country_cn = '列支敦士登'
          break;
        case 'LK':
          country_cn = '斯里兰卡'
          break;
        case 'LR':
          country_cn = '利比里亚'
          break;
        case 'LS':
          country_cn = '莱索托'
          break;
        case 'LT':
          country_cn = '立陶宛'
          break;
        case 'LU':
          country_cn = '卢森堡'
          break;
        case 'LV':
          country_cn = '拉脱维亚'
          break;
        case 'LY':
          country_cn = '阿拉伯利比亚民众国'
          break;
        case 'MA':
          country_cn = '摩洛哥'
          break;
        case 'MC':
          country_cn = '摩纳哥'
          break;
        case 'MD':
          country_cn = '摩尔多瓦共和国'
          break;
        case 'ME':
          country_cn = '黑山共和国'
          break;
        case 'MF':
          country_cn = '圣马丁'
          break;
        case 'MG':
          country_cn = '马达加斯加'
          break;
        case 'MH':
          country_cn = '马绍尔群岛'
          break;
        case 'MK':
          country_cn = '马其顿'
          break;
        case 'ML':
          country_cn = '马里'
          break;
        case 'MM':
          country_cn = '缅甸'
          break;
        case 'MN':
          country_cn = '蒙古'
          break;
        case 'MO':
          country_cn = '澳门'
          break;
        case 'MP':
          country_cn = '北马里亚纳群岛'
          break;
        case 'MQ':
          country_cn = '马提尼克岛'
          break;
        case 'MR':
          country_cn = '毛里塔尼亚'
          break;
        case 'MS':
          country_cn = '蒙特塞拉特'
          break;
        case 'MT':
          country_cn = '马耳他'
          break;
        case 'MU':
          country_cn = '毛里求斯'
          break;
        case 'MV':
          country_cn = '马尔代夫'
          break;
        case 'MW':
          country_cn = '马拉维'
          break;
        case 'MX':
          country_cn = '墨西哥'
          break;
        case 'MY':
          country_cn = '马来西亚'
          break;
        case 'MZ':
          country_cn = '莫桑比克'
          break;
        case 'NA':
          country_cn = '纳米比亚'
          break;
        case 'NC':
          country_cn = '新喀里多尼亚'
          break;
        case 'NE':
          country_cn = '尼日尔'
          break;
        case 'NF':
          country_cn = '诺福克岛'
          break;
        case 'NG':
          country_cn = '尼日利亚'
          break;
        case 'NI':
          country_cn = '尼加拉瓜'
          break;
        case 'NL':
          country_cn = '荷兰'
          break;
        case 'NO':
          country_cn = '挪威'
          break;
        case 'NP':
          country_cn = '尼泊尔'
          break;
        case 'NR':
          country_cn = '瑙鲁'
          break;
        case 'NU':
          country_cn = '纽埃'
          break;
        case 'NZ':
          country_cn = '新西兰'
          break;
        case 'OM':
          country_cn = '阿曼'
          break;
        case 'PA':
          country_cn = '巴拿马'
          break;
        case 'PE':
          country_cn = '秘鲁'
          break;
        case 'PF':
          country_cn = '法属波利尼西亚'
          break;
        case 'PG':
          country_cn = '巴布亚新几内亚'
          break;
        case 'PH':
          country_cn = '菲律宾'
          break;
        case 'PK':
          country_cn = '巴基斯坦'
          break;
        case 'PL':
          country_cn = '波兰'
          break;
        case 'PM':
          country_cn = '圣皮埃尔和密克隆群岛'
          break;
        case 'PN':
          country_cn = '皮特凯恩'
          break;
        case 'PR':
          country_cn = '波多黎各'
          break;
        case 'PS':
          country_cn = '巴勒斯坦'
          break;
        case 'PT':
          country_cn = '葡萄牙'
          break;
        case 'PW':
          country_cn = '帕劳'
          break;
        case 'PY':
          country_cn = '巴拉圭'
          break;
        case 'QA':
          country_cn = '卡塔尔'
          break;
        case 'RE':
          country_cn = '留尼旺岛'
          break;
        case 'RO':
          country_cn = '罗马尼亚'
          break;
        case 'RS':
          country_cn = '塞尔维亚'
          break;
        case 'RU':
          country_cn = '俄罗斯联邦'
          break;
        case 'RW':
          country_cn = '卢旺达'
          break;
        case 'SA':
          country_cn = '沙特阿拉伯'
          break;
        case 'SB':
          country_cn = '所罗门群岛'
          break;
        case 'SC':
          country_cn = '塞舌尔'
          break;
        case 'SD':
          country_cn = '苏丹'
          break;
        case 'SE':
          country_cn = '瑞典'
          break;
        case 'SG':
          country_cn = '新加坡'
          break;
        case 'SH':
          country_cn = '圣海伦娜'
          break;
        case 'SI':
          country_cn = '斯洛文尼亚'
          break;
        case 'SJ':
          country_cn = '斯瓦尔巴群岛和扬马延'
          break;
        case 'SK':
          country_cn = '斯洛伐克'
          break;
        case 'SL':
          country_cn = '塞拉利昂'
          break;
        case 'SM':
          country_cn = '圣马力诺'
          break;
        case 'SN':
          country_cn = '塞内加尔'
          break;
        case 'SO':
          country_cn = '索马里'
          break;
        case 'SR':
          country_cn = '苏里南'
          break;
        case 'SS':
          country_cn = '南苏丹'
          break;
        case 'ST':
          country_cn = '圣多美和普林西比'
          break;
        case 'SV':
          country_cn = '萨尔瓦多'
          break;
        case 'SX':
          country_cn = '圣马丁'
          break;
        case 'SY':
          country_cn = '阿拉伯叙利亚共和国'
          break;
        case 'SZ':
          country_cn = '斯威士兰'
          break;
        case 'TC':
          country_cn = '特克斯和凯科斯群岛'
          break;
        case 'TD':
          country_cn = '乍得'
          break;
        case 'TF':
          country_cn = '法属南部领地'
          break;
        case 'TG':
          country_cn = '多哥'
          break;
        case 'TH':
          country_cn = '泰国'
          break;
        case 'TJ':
          country_cn = '塔吉克斯坦'
          break;
        case 'TK':
          country_cn = '托克劳'
          break;
        case 'TL':
          country_cn = '东帝汶'
          break;
        case 'TM':
          country_cn = '土库曼斯坦'
          break;
        case 'TN':
          country_cn = '突尼斯'
          break;
        case 'TO':
          country_cn = '汤加'
          break;
        case 'TR':
          country_cn = '土耳其'
          break;
        case 'TT':
          country_cn = '特立尼达和多巴哥'
          break;
        case 'TV':
          country_cn = '图瓦卢'
          break;
        case 'TW':
          country_cn = '台湾'
          break;
        case 'TZ':
          country_cn = '坦桑尼亚联合共和国'
          break;
        case 'UA':
          country_cn = '乌克兰'
          break;
        case 'UG':
          country_cn = '乌干达'
          break;
        case 'UM':
          country_cn = '美国本土外小岛屿'
          break;
        case 'US':
          country_cn = '美国'
          break;
        case 'UY':
          country_cn = '乌拉圭'
          break;
        case 'UZ':
          country_cn = '乌兹别克斯坦'
          break;
        case 'VA':
          country_cn = '罗马教廷（ 梵蒂冈城国）'
          break;
        case 'VC':
          country_cn = '圣文森特和格林纳丁斯'
          break;
        case 'VE':
          country_cn = '委内瑞拉'
          break;
        case 'VG':
          country_cn = '英属维尔京群岛'
          break;
        case 'VI':
          country_cn = '美国维尔京群岛'
          break;
        case 'VN':
          country_cn = '越南'
          break;
        case 'VU':
          country_cn = '瓦努阿图'
          break;
        case 'WF':
          country_cn = '瓦利斯和富图纳群岛'
          break;
        case 'WS':
          country_cn = '萨摩亚'
          break;
        case 'YE':
          country_cn = '也门'
          break;
        case 'YT':
          country_cn = '马约特岛'
          break;
        case 'ZA':
          country_cn = '南非'
          break;
        case 'ZM':
          country_cn = '赞比亚'
          break;
        case 'ZW':
          country_cn = '津巴布韦'
          break;

        default:
          break;
      }
      return country_cn;
    }
  }
}
</script>
<style  lang="less">
@import '../../../assets/css/less/reset_css/reset_table.less';
@import '../../../assets/css/less/reset_css/reset_invest.less';
@import '../../../assets/css/less/reset_css/reset_tab.less';
#common_invest {
  // border: 1px solid red;
  margin: 24px;
  background: #fff;
  text-align: center;
  .common_invest_top {
    padding: 24px;
    text-align: left;
    .title {
      font-size: 14px;
      color: #999999;
    }
    .search_box {
      .el-input {
        height: 48px;
      }
      .el-input-group > .el-input__inner {
        height: 48px;
      }
      margin: 8px 0 0 0;
      display: flex;
      .search_box_left {
        flex: 1;
      }
      .search_box_right {
        padding: 0;
        width: 164px;
        height: 48px;
        text-align: center;
        line-height: 48px;
        background: #0070ff;
        font-size: 16px;
        color: #ffffff;
        border-radius: 3px;
        cursor: pointer;
      }
    }
  }

  .el-input-group__append {
    border: 0;
  }

  .vm_emerge_picker {
    width: 400px !important;
    /deep/ .el-range-input {
      /*width: auto;*/
      background-color: #f8f8f8 !important;
    }
    /deep/ .el-range-separator {
      padding: 0 3px;
      // line-height: 48px;
      width: auto;
      color: #303133;
    }
    .el-date-table td.end-date span {
      background-color: #0070ff;
    }
    .el-button.is-active,
    .el-button.is-plain:active {
      color: #0070ff;
      border-color: #0070ff;
    }
  }
  .list_title {
    text-align: left;
    height: 48px;
    line-height: 48px;
    font-size: 16px;
    color: #333333;
    padding-left: 24px;
    border-bottom: 1px solid #ececec;
  }
  .log_content {
    padding: 0 24px;
    .export_box {
      text-align: left;
      margin: 24px 0;
      .export_i {
        cursor: pointer;
        display: inline-block;
        width: 148px;
        height: 38px;
        line-height: 38px;
        background: #0070ff;
        color: #fff;
        font-size: 14px;
        text-align: center;
        border: 1px solid #0070ff;
        margin-right: 8px;
      }
      .export_o {
        cursor: pointer;
        display: inline-block;
        width: 148px;
        height: 38px;
        line-height: 38px;
        font-size: 14px;
        color: #0070ff;
        border: 1px solid #0070ff;
        text-align: center;
      }
    }
    #emergeLine {
      width: 100%;
      height: 300px;
    }
    .DimensionAggregation {
      // border: 1px solid red;
      text-align: left;
      margin: 24px 0;
      .title {
        font-size: 20px;
        font-weight: 500;
        margin-bottom: 10px;
      }
      .DimensionFlexBox {
        margin-bottom: 48px;
        display: flex;
        // border: 1px solid red;
        .DimensionFlexItem {
          flex: 1;
          // border: 1px solid red;
          .title {
            font-size: 16px;
            color: #333333;
            margin-bottom: 24px;
          }
          .item_box {
            display: flex;
            .left {
              width: 150px;
              // border: 1px solid red;
              padding-bottom: 20px;
              .item_p {
                height: 20px;
                margin-bottom: 16px;
                // border-bottom: 1px solid red;
              }
            }
            .right {
              // border: 1px solid red;
              flex: 1;
              display: flex;
              height: 300px;
              #classification,
              #account,
              #city_name,
              #server_name,
              #app,
              #eventtype {
                flex: 1;
                height: 300px;
                // border: 1px solid red;
              }
              .tips {
                flex: 1;
                text-align: center;
                font-size: 18px;
                margin-top: 130px;
                color: #0070ff;
              }
            }
          }
        }
        .space_div {
          width: 100px;
        }
      }
    }
  }
  .log_table_box {
    height: 480px;
    display: flex;
    .log_table_left {
      width: 800px;
      // border: 1px solid green;
      // overflow: hidden;
      /deep/ .reset_table {
        thead {
          tr {
            th {
              padding: 0;
              height: 48px;
            }
          }
        }
      }
      .handle_pagination {
        margin-top: 10px;
      }
    }
    .log_table_right {
      flex: 1;
      border-left: 1px solid #f0f7ff;
      .reset_item_box {
        .reset_img_box {
          text-align: center;
        }
        text-align: left;
        height: 432px;
        background: #f0f7ff;
        padding: 16px;
        overflow-y: scroll;
        .img_box {
          margin: 100px auto;
          width: 100px;
          height: 80px;
        }
        .space_title {
          font-size: 24px;
          color: #bbbbbb;
          text-align: center;
          margin-top: 20px;
        }
        .complete_item {
          display: flex;
          min-height: 36px;
          line-height: 36px;
          text-align: left;
          .complete_item_title {
            font-size: 14px;
            color: #666666;
            width: 180px;
          }
          .complete_item_content {
            font-size: 14px;
            color: #666666;
            flex: 1;
          }
        }
        .original_log {
          word-wrap: break-word;
          word-break: break-all;
          line-height: 36px;
          text-align: left;
          font-size: 14px;
          color: #666666;
          flex: 1;
        }
        // 更多日志
        .more_title {
          height: 42px;
          line-height: 42px;
          background: #fff;
          display: flex;
          padding: 0 16px;
          .more_title_item {
            flex: 1;
            text-align: left;
            font-size: 14px;
            color: #333333;
            font-weight: bold;
          }
        }
        .more_item {
          height: 42px;
          line-height: 42px;
          position: relative;
          display: flex;
          padding: 0 16px;
          cursor: pointer;
          border-bottom: 1px solid #ececec;
          .more_item_text {
            flex: 1;
            text-align: left;
            font-size: 14px;
            color: #333333;
          }
          .img_more_box {
            cursor: pointer;
            position: absolute;
            top: 50%;
            right: 10px;
            transform: translateY(-50%);
            width: 20px;
            height: 20px;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
        .time_box {
          height: 32px;
          line-height: 32px;
          // border: 1px solid red;
          margin: 36px 0;
          text-align: center;
          display: flex;
          .time {
            width: 180px;
            height: 32px;
            text-align: center;
            // border: 1px solid red;
            margin: 0 5px;
            background: #f8f8f8;
            font-size: 14px;
            color: #333333;
          }
          .time_box_left {
            flex: 1;
          }
          .time_box_right {
            flex: 1;
          }
          /deep/ .el-input-number {
            // border: 1px solid red;
            height: 32px;
            width: 80px;
            padding: 0;
            line-height: 32px;
            margin-left: 5px;
            /deep/ .el-input-number__decrease,
            .el-input-number__increase {
              width: 20px !important;
              height: 32px !important;
            }
            .el-input__inner {
              height: 32px;
              padding: 0;
              width: 80px;
            }
          }
        }
        .text_color {
          p {
            color: #0070ff !important;
          }
        }
        .serch_btn {
          cursor: pointer;
          width: 162px;
          height: 38px;
          background: #0070ff;
          color: #fff;
          text-align: center;
          line-height: 38px;
          font-size: 14px;
          margin: 42px auto;
        }

        &::-webkit-scrollbar {
          /*滚动条整体样式*/
          width: 4px;
          /*高宽分别对应横竖滚动条的尺寸*/
          /* border-radius: 6px;*/
        }
        &::-webkit-scrollbar-thumb {
          /*滚动条里面小方块*/
          border-radius: 4px;
          background: #a8a8a8;
          // background: red;
        }
        &::-webkit-scrollbar-track {
          /*滚动条里面轨道*/
          border-radius: 4px;
          background: #fff;
        }
      }
    }
  }

  // 滚动条的宽度
  /deep/ .el-table__body-wrapper::-webkit-scrollbar {
    width: 4px; // 横向滚动条
    height: 4px; // 纵向滚动条 必写
  }
  // 滚动条的滑块
  /deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
    background: #a8a8a8;
    border-radius: 4px;
  }
  /deep/ .el-table__body tr.current-row > td {
    color: #0070ff !important;
    background: #eef6ff !important;
  }
  /deep/ .reset_tab {
    .el-tabs__item {
      height: 48px;
      line-height: 48px;
    }
    .el-tabs__header {
      margin: 0;
    }
  }
}
</style>

