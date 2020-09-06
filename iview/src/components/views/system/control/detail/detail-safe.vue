<template>
  <div class="detail-safe" v-loading.fullscreen.lock="loading" v-cloak>
    <back-title :title-name="title_name"></back-title>

    <div class="detail_base_top">
      <div class="bt">
        <div class="gauge" id="gauge1"></div>
        <h4 class="name">CPU 使用率</h4>
        <div class="bline"></div>
      </div>
      <div class="bt">
        <div class="gauge" id="gauge2"></div>
        <h4 class="name">内存占用率</h4>
        <div class="bline"></div>
      </div>
      <div class="bt">
        <div class="gauge" id="gauge3"></div>
        <h4 class="name">磁盘占用率</h4>
        <div class="bline"></div>
      </div>
    </div>
    <div class="detail_base_mid">
      <div class="detail_title">
        <i class="dt_img"></i>
        <h3 class="title">日志流量</h3>
      </div>
      <div class="safe_flow" id="safe_flow"></div>

    </div>

    <div class="detail_base_bom">
      <div class="detail_title">
        <i class="dt_img"></i>
        <h3 class="title">设备日志</h3>
        <el-button class="s-download">下载</el-button>
      </div>
      <div class="role_table">
        <el-table ref="multipleTable"
                  class="reset_table"
                  align="center"
                  border
                  :data="role_list.data"
                  tooltip-effect="dark"
                  @selection-change="handleSelectionChange"
                  style="width: 100%">
          <el-table-column prop="index"
                           align="center"
                           label="序号"
                           width="50"
                           show-overflow-tooltip>
            <template slot-scope="scope">
              {{(role_data.page-1)*(role_data.rows) + scope.row.index_cn}}
            </template>
          </el-table-column>
          <el-table-column label="时间"
                           align="center"
                           width="300"
                           show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.created_at*1000 |formatDate }}</template>
          </el-table-column>
          <el-table-column prop="description"
                           align="center"
                           label="描述"
                           show-overflow-tooltip>
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
    </div>


  </div>
</template>

<script type="text/ecmascript-6">
  import moment from 'moment'
  import backTitle from "@/components/common/back-title";
  export default {
    name: "detail-safe",
    data () {
      return {
        loading: false,
        title_name: "设备详情",
        role_list: {},
        role_data: {
          page: 1,
          rows: 10
        },
      };
    },
    components: {backTitle},
    mounted () {
      this.get_data();

      this.get_table();
    },
    methods: {
      // 获取数据
      get_data () {
        //this.loading = true
        this.$axios.get('/yiiapi/asset/alert-details', {
          params: {
            id: this.$route.query.detail
          }
        })
          .then(resp => {
            this.loading = false;
            this.drawGraphTop();
            this.drawFlow();
          })
          .catch(error => {
            console.log(error);
          })
      },
      get_table () {
        this.$axios.get('/yiiapi/user/role-list', {
          params: {
            page: this.role_data.page,
            rows: this.role_data.rows
          }
        }).then(response => {
            this.role_list = response.data.data;
            this.role_list.data.forEach((item, index) => {
              item.index_cn = index + 1
            });

            console.log(this.role_list)
          })
          .catch(error => {
            console.log(error);
          })
      },
      drawGraphTop(){

        let gauge1 = this.$echarts.init(document.getElementById('gauge1'));
        gauge1.showLoading({ text: '正在加载数据...' });
        gauge1.clear();
        let option1 = {
          tooltip: {
            show:false
          },
          series: [{
            type : "gauge",
            center: ["50%", "42%"], // 默认全局居中
            radius : "64%",
            startAngle: 220,
            endAngle: -40,
            axisLine: {
              show : true,
              lineStyle : {
                color: [ //表盘颜色
                  [ 0.5,"#0288D1"],
                  [ 0.51,"#ffffff"],
                  [ 1,"#EEF6FF"]
                ],
                width : 15//表盘宽度
              }
            },
            splitLine: { //分割线样式（及10、20等长线样式）
              show:false,
            },
            axisTick: { //刻度线样式（及短线样式）
              show:false
            },
            axisLabel : { //文字样式（及“10”、“20”等文字样式）
              show:false
            },
            detail: {
              show: false,
            },
            pointer: {
              length: '50%',
              width: 6
            },
            data: [{
              value: 50,
              label: {
                textStyle: {
                  fontSize: 12
                }
              }
            }]
          }]
        };
        gauge1.setOption(option1);
        gauge1.hideLoading();
        window.addEventListener("resize", () => {
          gauge1.resize();
        });

        let gauge2 = this.$echarts.init(document.getElementById('gauge2'));
        gauge2.showLoading({ text: '正在加载数据...' });
        gauge2.clear();
        let option2 = {
          tooltip: {
            show:false
          },
          series: [{
              type : "gauge",
              center: ["50%", "42%"], // 默认全局居中
              radius : "64%",
              startAngle: 220,
              endAngle: -40,
              axisLine: {
                show : true,
                lineStyle : {
                  color: [ //表盘颜色
                    [ 0.6,"#CDDC39"],//0-50%处的颜色
                    [ 0.61,"#ffffff"],
                    [ 1,"#EEF6FF"]//90%-100%处的颜色
                  ],
                  width : 15//表盘宽度
                }
              },
              splitLine: { //分割线样式（及10、20等长线样式）
                show:false,
              },
              axisTick: { //刻度线样式（及短线样式）
                show:false
              },
              axisLabel : { //文字样式（及“10”、“20”等文字样式）
                show:false
              },
              detail: {
                show: false,
              },
              pointer: {
                length: '50%',
                width: 6
              },
              data: [{
                value: 60,
                label: {
                  textStyle: {
                    fontSize: 12
                  }
                }
              }]
            }]
        };
        gauge2.setOption(option2);
        gauge2.hideLoading();
        window.addEventListener("resize", () => {
          gauge2.resize();
        });

        let gauge3 = this.$echarts.init(document.getElementById('gauge3'));
        gauge3.showLoading({ text: '正在加载数据...' });
        gauge3.clear();
        let option3 = {
          tooltip: {
            show:false
          },
          series: [
            {
              type : "gauge",
              center: ["50%", "42%"], // 默认全局居中
              radius : "64%",
              startAngle: 220,
              endAngle: -40,
              axisLine: {
                show : true,
                lineStyle : {
                  color: [ //表盘颜色
                    [ 0.7,"#4CAF50"],//0-50%处的颜色
                    [ 0.71,"#ffffff"],
                    [ 1,"#EEF6FF"]//90%-100%处的颜色
                  ],
                  width : 15//表盘宽度
                }
              },
              splitLine: { //分割线样式（及10、20等长线样式）
                show:false,
              },
              axisTick: { //刻度线样式（及短线样式）
                show:false
              },
              axisLabel : { //文字样式（及“10”、“20”等文字样式）
                show:false
              },
              detail: {
                show: false,
              },
              pointer: {
                length: '50%',
                width: 6
              },
              data: [{
                value: 70,
                label: {
                  textStyle: {
                    fontSize: 12
                  }
                }
              }]
            }]
        };
        gauge3.setOption(option3);
        gauge3.hideLoading();
        window.addEventListener("resize", () => {
          gauge3.resize();
        });

      },
      drawFlow(){
        let safe_flow = this.$echarts.init(document.getElementById('safe_flow'));
        safe_flow.showLoading({ text: '正在加载数据...' });
        safe_flow.clear();
        let option = {
          legend: {
            show: false
          },
          grid: {
            top:'20%',
            left: '1%',
            right: '2%',
            bottom: '10%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLine:{
              lineStyle:{
                color:'#ececec',
                width:2
              }
            },
            axisTick:{
              show: false
            },
            axisLabel:{
              color:'#666666'
            },
            splitLine:{
              show:true,
              lineStyle:{
                color:'#f4f4f4'
              }
            },
            data: ['08:00','08:01','08:02','08:03','08:04','08:05','08:06','08:07','08:08','08:09']
          },
          yAxis: {
            type: 'value',
            name: '流量(M/s)',
            nameLocation:'end',
            nameTextStyle:{
              color:'#999',
             /* padding:[0,0,0,-10]*/
            },
            axisLine:{
              lineStyle:{
                color:'#ececec',
                width:2
              }
            },
            axisTick:{
              show: false
            },
            axisLabel:{
              color:'#666666'
            },
            splitLine:{
              show:true,
              lineStyle:{
                color:'#f4f4f4'
              }
            }
          },
          series: [{
            type: 'line',
            smooth: true,
            symbol: "none",
            lineStyle:{
              color:'#47CAD9',
              width: 1
            },
            areaStyle: {
              color:{
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgba(71,202,217,0.7)'
                }, {
                  offset: 1, color: 'rgba(255,255,255,0.1)'
                }],
                global: false
              }
            },
            emphasis:{show:false},
            data: [5,11,14,18,5,12,14,20,25,10]
          }]
        };
        safe_flow.setOption(option);
        safe_flow.hideLoading();
        window.addEventListener("resize", () => {
          safe_flow.resize();
        });
      },

      // 下载payload
      download (value, item) {
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
          window.open('/yiiapi/asset/get-file?md5=' + value.md5);
        }
      },
      handleSizeChange (val) {
        this.emerge_list.now_data.rows = val;
        this.emerge_list.now_data.page = 1;
        this.new_list();
      },
      handleCurrentChange (val) {
        this.emerge_list.now_data.page = val;
        this.new_list();
      },
      handleSelectionChange () { },
      handleClick (tab, event) {
        console.log(tab);
      },
      //获取工单列表
      get_worksheets_list () {
        this.$axios.get('/yiiapi/asset/workorder-list', {
          params: {
            page: this.worksheets_data.page,
            rows: this.worksheets_data.rows,
            type: 'alert'
          }
        }).then((resp) => {
          let { status, data } = resp.data;
          if (status == 0) {
            console.log(data);
            this.worksheets_list = data
            this.worksheets_list.pageNow = data.pageNow * 1
            this.worksheets_data.pop = true;
            this.worksheets_list.data.forEach(element => {
              element.perator_cn = JSON.parse(element.perator).join(',')
              this.worksheets_data.level_list.forEach(item => {
                if (element.priority == item.value) {
                  element.priority_cn = item.label
                }
              });
              this.worksheets_data.status_type.forEach((ele, index) => {
                if (element.status == index) {
                  element.status_cn = this.worksheets_data.status_type[index]
                }
              });
            });
          }
        })
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
  .detail-safe{
    .detail_base_top{
      padding: 0 56px;
      height: 220px;
      background: #fff;
      font-size: 0;
      text-align: left;
      .bt{
        width: 220px;
        height: 220px;
        margin-right: 120px;
        display: inline-block;
        position: relative;
        .gauge{
          width: 220px;
          height: 220px;
        }
        .name{
          position: absolute;
          bottom: 20px;
          width: 220px;
          text-align: center;
          font-size: 16px;
          z-index: 999;
        }
        .bline{
          position: absolute;
          width: 114px;
          height: 4px;
          background: #EEF6FF;
          bottom: 56px;
          left: 52px;
        }
      }
    }
    .detail_base_mid{
      height: 340px;
      background: #fff;
      margin-bottom: 30px;
      .detail_title{
        padding: 0 56px;
        height: 60px;
        line-height: 60px;
        font-size: 0;
        text-align: left;
        border-bottom: 1px solid #ececec;
        .dt_img{
          width: 24px;
          height: 24px;
          vertical-align: middle;
          margin-top: -12px;
          display: inline-block;
          background-image: url("../../../../../assets/images/system/sys1.png");
          background-size: 24px 24px;
        }
        .title{
          display: inline-block;
          font-family: PingFangSC-Medium;
          font-size: 16px;
          color: #333333;
          text-align: center;
          margin-left: 10px;
        }
      }
      .safe_flow{
        padding: 0 56px;
        width: 100%;
        height: 280px;
      }
    }
    .detail_base_bom{
      min-height: 600px;
      background: #fff;
      margin-bottom: 30px;
      .detail_title{
        padding: 0 56px;
        height: 60px;
        line-height: 60px;
        font-size: 0;
        text-align: left;
        border-bottom: 1px solid #ececec;
        position: relative;
        .dt_img{
          width: 24px;
          height: 24px;
          vertical-align: middle;
          margin-top: -12px;
          display: inline-block;
          background-image: url("../../../../../assets/images/system/sys2.png");
          background-size: 24px 24px;
        }
        .title{
          display: inline-block;
          font-family: PingFangSC-Medium;
          font-size: 16px;
          color: #333333;
          text-align: center;
          margin-left: 10px;
        }
        /deep/
        .s-download{
          position: absolute;
          color: #fff;
          top: 13px;
          right: 56px;
          width: 124px;
          height: 34px;
          line-height: 0;
          border-width: 0;
          background: #0070FF;
        }
      }
      .role_table{
        padding: 0 56px;
        margin: 40px 0;
      }
    }
  }
</style>
<style  lang="less">
  @import '../../../../../assets/css/less/reset_css/reset_table.less';
</style>
