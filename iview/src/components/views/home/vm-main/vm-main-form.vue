<template>
  <div id="threatForm" v-cloak></div>
</template>

<script type="text/ecmascript-6">
  require('../../../../../static/js/echarts-auto-tooltip');
  export default {
    name: 'threatForm',
    props: {
      options: {
        type: Array,
        default: () => []
      }
    },
    mounted(){
      this.drawGraph();
    },
    methods:{
      drawGraph(){

        let data = this.options;
        //data = data.reverse();
        let xAxis = data.map(item => {return item.category});

        data.forEach(item => {
          Object.assign(item,{value:item.total_count,name:item.category});
        });

        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('threatForm'))
        // 绘制图表
        let option = {
          grid: {
            top: '20%',
            left: '5%',
            right: '5%',
            bottom: '5%',
            containLabel: true
          },
          color:['#0288D1','#CDDC39','#4CAF50','#00BCD4','#F57C00'],
          legend: {
            orient: 'vertical',
            x: 'left',
            top: 60,
            left: 10,
            selectedMode:false,
            data:xAxis
          },
          series: [
            {
              name:'访问来源',
              type:'pie',
              center: ['66%', '60%'],
              radius: ['36%', '60%'],
              avoidLabelOverlap: false,
              hoverOffset: 2,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
              },
              emphasis: {
                label:{
                  show: true,
                  formatter: ['{d|{d}%}','{b|{b}}'].join('\n'),
                  rich: {
                    d: {
                      fontSize: 20,
                      lineHeight: 40
                    },
                    b: {
                      color: '#999'
                    },
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:data
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
  }
</script>

<style scoped lang="less">
  #threatForm{
    height: 100%;
  }
</style>
