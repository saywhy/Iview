<template>
    <div id="test"></div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "test",
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
    this.test();
  },
  methods: {
    test() {
      // 基于准备好的dom，初始化echarts实例

      let data = this.options.log;

      var xdata = [];
      var ydata = [];
      if(data){
        xdata = data.aggregations.types_count.buckets.map(v => {return v.key_as_string});
        ydata = data.aggregations.types_count.buckets.map(v => {return v.doc_count});
      }

     // console.log(this.options.log)
      let myChart = this.$echarts.init(document.getElementById("test"));
      // 绘制图表
      myChart.setOption({
        grid: {
          top: "10%",
          left: 0,
          right: "5%",
          bottom: "5%",
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          borderColor: "rgba(71,202,217,0.3)",
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
        color: ["#47CAD9"],
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
                str = strs[0] + '\n' + strs[1]+':00';
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
            name: "实验",
            type: "line",
            symbol: "none",
            cursor: "pointer",
            smooth: true,
            data: ydata,
            lineStyle: {
              color: "#47CAD9"
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
                    color: "rgba(71,202,217,0.3)" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(71,202,217,0.1)" // 100% 处的颜色
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
#test {
  height: 100%;
}
</style>
