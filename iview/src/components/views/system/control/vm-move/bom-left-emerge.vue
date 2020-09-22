<template>
    <div id="emerge"></div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "emerge",
  data() {
    return {};
  },
  props: {
    options: {
      type: Object,
      default: () => {}
    }
  },
  mounted() {
    this.emerge();
  },
  methods: {
    emerge() {

      let data = this.options.alert;

      var xdata = [];
      var ydata = [];
      if(data){
        xdata = data.aggregations.types_count.buckets.map(v => {return v.key_as_string});
        ydata = data.aggregations.types_count.buckets.map(v => {return v.doc_count});
      }

      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("emerge"));
      // 绘制图表
      myChart.setOption({
        grid: {
          top: "10%",
          left: 0,
          right: "2%",
          bottom: "5%",
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          borderColor: "rgba(220,95,95,0.3)",
          borderWidth: 2,
          backgroundColor: "#fff",
          textStyle: {
            color: "#ccc"
          },
          axisPointer: {
            lineStyle: {
              color: "#ccc"
            }
          }
        },
        color: ["#DC5F5F "],
        xAxis: {
          boundaryGap: false,
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
              color: "#666666",
            },
            formatter: function (val) {
              var strs = val.split(' '); //字符串数组
              let str = ''
              if (val != '0') {
                str = strs[0].substring(5,strs[0].length) + '\n' + strs[1];
              }
              return str;
            }
          },
          axisTick: {
            show: false
          },
          data: xdata
        },
        yAxis: {
          splitLine: {
            show: true,
            lineStyle: {
              color: "#F4F4F4",
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
          }
        },
        series: [
          {
            name: "告警日志",
            type: "line",
            symbol: "none",
            cursor: "pointer",
            smooth: true,
            data: ydata,
            lineStyle: {
              color: "#DC5F5F "
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(220,95,95,0.3)" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(220,95,95,0.1)" // 100% 处的颜色
                  }
                ]
              }
            }
          }
        ]
      });
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    }
  }
};
</script>

<style scoped lang="less">
#emerge {
  height: 100%;
}
</style>
