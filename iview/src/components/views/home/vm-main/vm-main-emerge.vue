<template>
  <div id="threatWarn"></div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'vh-threatWarn',
    props: {
      option: {
        type: Object,
        default: () => {}
      }
    },
    mounted(){
      this.drawGraph();
    },
    methods:{
      drawGraph(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('threatWarn'));
        // 绘制图表
        myChart.setOption({
          grid: {
            top: '24%',
            left: '4%',
            right: '5%',
            bottom: '8%',
            containLabel: true
          },
          color:['#47CAD9','#E0C840','#DC5F5F'],
          legend: {
            orient: 'horizontal',
            top: 10,
            right: 10,
            icon: 'stack',
            textStyle:{
              padding:[3,2,0,0]
            }
          },
          tooltip:{
            trigger: 'axis',
            axisPointer:{
              lineStyle:{
                color:'#ccc'
              }
            }
          },
          xAxis: {
            boundaryGap:false,
            axisLine:{
              lineStyle:{
                color: '#ececec',
                width: 2
              }
            },
            axisTick:{
              show:false
            },
            axisLabel:{
              color:'#666666'
            },
            splitLine:{
              show:true,
              lineStyle:{
                color: '#F4F4F4'
              }
            },
            data: ["11-11","11-12","11-13","11-14","11-15","11-16"]
          },
          yAxis: {
            axisLine:{
              lineStyle:{
                color: '#ececec',
                width: 2
              }
            },
            axisTick:{
              show:false
            },
            axisLabel:{
              color:'#666666'
            },
            splitLine:{
              show:true,
              lineStyle:{
                color: '#F4F4F4'
              }
            },
          },
          series: [{
            name: '低危',
            type: 'line',
            symbol: "none",
            smooth: true,
            data: [5, 20, 36, 10, 10, 30],
            lineStyle:{
              color: 'rgba(71,202,217,0.5)'
            },
            areaStyle:{
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgba(71,202,217,0.24)' // 0% 处的颜色
                }, {
                  offset: 1, color: '#fff' // 100% 处的颜色
                }]
              }
            }
          },{
            name: '中危',
            type: 'line',
            symbol: "none",
            smooth: true,
            data: [22, 24, 26, 20, 20, 10],
            lineStyle:{
              color: 'rgba(224,200,64,0.5)'
            },
            areaStyle:{
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgba(224,200,64,0.24)' // 0% 处的颜色
                }, {
                  offset: 1, color: '#fff' // 100% 处的颜色
                }]
              }
            }
          },{
            name: '高危',
            type: 'line',
            symbol: "none",
            smooth: true,
            data: [32, 14, 16, 30, 35, 20],
            lineStyle:{
              color: 'rgba(220,95,95,0.5)'
            },
            areaStyle:{
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgba(220,95,95,0.24)' // 0% 处的颜色
                }, {
                  offset: 1, color: '#fff' // 100% 处的颜色
                }]
              }
            }
          }]
        });

        window.addEventListener("resize", () => {
          myChart.resize();
        });

      }
    }
  }
</script>

<style scoped lang="less">
  #threatWarn{
    height: 100%;
  }
</style>
