<template>
  <div id="common_invest">
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
                <div id="classification"></div>
              </div>
            </div>
          </div>
          <div class="space_div">
          </div>
          <div class="DimensionFlexItem">
            <p class="title">TOP 事件类型</p>
            <div class="item_box">
              <div class="right">
                <div id="eventtype"></div>
              </div>
            </div>
          </div>
          <div class="space_div">
          </div>
          <div class="DimensionFlexItem">
            <p class="title">关联资产</p>
            <div class="item_box">
              <div class="right">
                <div id="server_name"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="DimensionFlexBox">
          <div class="DimensionFlexItem">
            <p class="title">账号</p>
            <div class="item_box">
              <div class="right">
                <div id="account"></div>
              </div>
            </div>
          </div>
          <div class="space_div">
          </div>
          <div class="DimensionFlexItem">
            <p class="title">国家</p>
            <div class="item_box">
              <div class="right">
                <div id="city_name"></div>
              </div>
            </div>
          </div>
          <div class="space_div">
          </div>
          <div class="DimensionFlexItem">
            <p class="title">TOP 应用</p>
            <div class="item_box">
              <div class="right">
                <div id="app"></div>
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
        <span class="export_i">导出归一化日志</span>
        <span class="export_o">导出原始日志</span>
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
                             align="center"
                             show-overflow-tooltip></el-table-column>
            <el-table-column prop="_source.direction"
                             label="方向"
                             align="center"
                             width="150"
                             show-overflow-tooltip></el-table-column>
            <el-table-column prop="_source.srcIp"
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
                             align="center"
                             show-overflow-tooltip></el-table-column>
            <el-table-column prop="_source.dst_name"
                             label="目的资产名"
                             align="center"
                             show-overflow-tooltip></el-table-column>
            <el-table-column prop="_source.dst_port"
                             label="目的端口"
                             align="center"
                             width="150"
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
                <div v-if="complete_log.length == 0">
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
                <div v-if="complete_log.length == 0">
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
        eventtype: [],
        account: [],
        city_name: [],
        server_name: [],
        app: [],
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
          animation: true,
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
        yAxis_data.push(item.key)
        xAxis_data.push(item.doc_count)
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
            // interval: 'auto',
            // splitNumber: 5,
            boundaryGap: false,
            axisTick: { //y轴刻度线
              show: false
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
        yAxis_data.push(item.key)
        xAxis_data.push(item.doc_count)
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
            boundaryGap: false,
            axisTick: { //y轴刻度线
              show: false
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
        yAxis_data.push(item.key)
        xAxis_data.push(item.doc_count)
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
            boundaryGap: false,
            axisTick: { //y轴刻度线
              show: false
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
        yAxis_data.push(item.key)
        xAxis_data.push(item.doc_count)
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
            boundaryGap: false,
            axisTick: { //y轴刻度线
              show: false
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
        yAxis_data.push(item.key)
        xAxis_data.push(item.doc_count)
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
            boundaryGap: false,
            axisTick: { //y轴刻度线
              show: false
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
        item.key = item.key == '' ? '其他' : item.key
        yAxis_data.push(item.key)
        xAxis_data.push(item.doc_count)
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
            boundaryGap: false,
            axisTick: { //y轴刻度线
              show: false
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
            field: 'geoip.city_name',
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
    padding-bottom: 0;
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
      height: 200px;
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
              height: 300px;
              #classification,
              #account,
              #city_name,
              #server_name,
              #app,
              #eventtype {
                width: 100%;
                height: 100%;
                // border: 1px solid red;
              }
            }
          }
        }
        .space_div {
          width: 100px;
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
            .original_log {
              line-height: 36px;
              text-align: left;
              font-size: 14px;
              color: #666666;
              flex: 1;
            }
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

