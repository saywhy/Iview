<template>
  <div class='rate'>
    <div class="title">
      <img src="@/assets/images/emerge/rate_icon.png"
           class="icon_img">
      <span>攻击频率视图</span>
    </div>
    <div class="rate_box">
      <div class="line"
           id="emergeLine"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Rate',
  data () {
    return {
      line_list: [
        {
          alert_count: "10",
          statistics_time: "2020-08-05 17:00"
        },
        {
          alert_count: "123",
          statistics_time: "2020-08-06 17:00"
        },
        {
          alert_count: "442",
          statistics_time: "2020-08-07 17:00"
        },
        {
          alert_count: "11",
          statistics_time: "2020-08-08 17:00"
        },
        {
          alert_count: "33",
          statistics_time: "2020-08-09 17:00"
        },
        {
          alert_count: "123",
          statistics_time: "2020-08-10 17:00"
        },
        {
          alert_count: "283",
          statistics_time: "2020-08-11 17:00"
        },
      ]
    }
  },
  mounted () {
    this.drawLine();
  },
  methods: {
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
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          },
          backgroundColor: "rgba(255,255,255,1)",
          padding: [5, 5],
          textStyle: {
            color: "#7588E4",
          },
          extraCssText: "box-shadow: 0 0 5px rgba(0,0,0,0.3)",
        },
        xAxis: {
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
          data: this.line_list.map(function (item) {
            return item.statistics_time;
          })
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
            show: false,
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
        dataZoom: [
          {
            show: true,
            type: "inside",
            realtime: true,
            start: 0,
            end: 100,
          },
          {
            type: 'slider',
            backgroundColor: '#fff',
            fillerColor: 'rgba(0,112,255,.1)',
            handleStyle: {
              color: '#0070ff'
            },
            bottom: 0,
            left: '18%',
            right: '18%',
            dataBackground: {
              areaStyle: {
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                shadowBlur: 10
              }
            }
          }
        ],
        series: {
          name: "告警",
          type: "bar",
          smooth: true,
          showSymbol: false,
          animation: true,
          label: {
            show: true,
            position: 'top',
            color: '#5389E0',
            fontSize: '12'
          },
          itemStyle: {
            color: '#5389E0',
            barBorderRadius: 4
          },
          barMaxWidth: '34',
          symbol: "circle",

          data: this.line_list.map(function (item) {
            return item.alert_count;
          })
        }
      });

      //myChart.hideLoading();

      window.addEventListener("resize", () => {
        myChart.resize();
      });
    }
  },
  computed: {}
}
</script>
<style scoped lang="less">
.rate {
  background: #fff;
  text-align: left;
  .title {
    height: 66px;
    padding-left: 24px;
    line-height: 66px;
    border: 1px solid #ececec;
    .icon_img {
      width: 24px;
      margin-right: 12px;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
      font-size: 16px;
      color: #333;
    }
  }
  .rate_box {
    height: 276px;
    padding: 24px;
    border: 1px solid green;
    #emergeLine {
      height: 100%;
    }
  }
}
</style>