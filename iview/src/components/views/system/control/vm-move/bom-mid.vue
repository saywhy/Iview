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

      if(options == undefined || options == null || options == ''){
        return false;
      }

      if(!options.total_count){
        options.total_count = 0;
      }
      if(!options.alert_count){
        options.alert_count = 0;
      }
      if(!options.offline_count){
        options.offline_count = 0;
      }
      if(!options.online_count){
        options.online_count = 0;
      }

      if(options.alert_count == 0 &&
        options.offline_count == 0 &&
        options.online_count == 0){
        return false;
      }

      let datas = [
        { value: options.online_count, name: "正常", color:'#4CAF50'},
        { value: options.offline_count, name: "离线", color:'#47CAD9'},
        { value: options.alert_count, name: "告警", color:'#D53A35'}
      ];


      let newDatas = [];
      datas.forEach(item => {
        if(item.value != 0){
          newDatas.push(item);
        }
      })


      //datas.splice(datas.findIndex(item => item.value == 0),1);
      let colorAttr = newDatas.map(item => item.color);

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
        //["#47CAD9", "#2f4554", "#D53A35"]
        color: colorAttr,
        series: [
          {
            name: "来源",
            type: "pie",
            radius: ["45%", "80%"],
            avoidLabelOverlap: false,
            //hoverAnimation: false,
            legendHoverLink: false,
            hoverOffset: 0,
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
            data: newDatas
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
