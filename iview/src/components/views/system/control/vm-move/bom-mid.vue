<template>
    <div id="safe"></div>
</template>

<script type="text/ecmascript-6">
  require('../../../../../../static/js/echarts-auto-tooltip');
export default {
  name: "safe",
  props: {
    options: {
      type: Object,
      default: () => {}
    }
  },
  mounted() {
    this.safe();
  },
  methods: {
    safe() {

      let options = this.options;
      if(!options.total_count){
        options.total_count = 0;
      }
      if(!options.alert_count){
        options.alert_count = 0;
      }
      if(!options.offline_count){
        options.offline_count = 0;
      }
      let datas = [
        { value: options.total_count, name: "设备总数" },
        { value: options.alert_count, name: "告警总数" },
        { value: options.offline_count, name: "离线总数" }
      ];

      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("safe"));
      // 绘制图表
      let option = {
        grid: {
          top: "20%",
          left: "5%",
          right: "5%",
          bottom: "5%",
          containLabel: true
        },
        color: ["#47CAD9", "#DC5F5F", "#E0C840"],
        series: [
          {
            name: "来源",
            type: "pie",
            radius: ["45%", "80%"],
            avoidLabelOverlap: false,
            //hoverAnimation: false,
            legendHoverLink: false,
            hoverOffset: 3,
            selectedOffset: 0,
            label: {
              normal: {
                show: false,
                position: "center"
              }
            },
            emphasis: {
              label: {
                show: true,
                formatter: ["{d|{d}%}", "{b|{b}}"].join("\n"),
                rich: {
                  d: {
                    fontSize: 20,
                    lineHeight: 40
                  },
                  b: {
                    color: "#999"
                  }
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: datas
          }
        ]
      }
      myChart.setOption(option);

      tools.loopShowTooltip(myChart, option, {loopSeries: true});

      window.addEventListener("resize", () => {
        myChart.resize();
      });
    }
  }
};
</script>

<style scoped lang="less">
#safe {
  height: 100%;
}
</style>
