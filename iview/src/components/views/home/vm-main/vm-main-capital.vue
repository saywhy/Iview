<template>
  <div id="dangerCapital" v-cloak></div>
</template>

<script type="text/ecmascript-6">
  require('../../../../../static/js/echarts-auto-tooltip');
  export default {
    name: 'dangerCapital',
    props: {
      options: {
        type: Object,
        default: () => {}
      }
    },
    mounted(){
      this.drawGraph();
    },
    methods:{
      drawGraph(){

        //console.log(this.options)

        if(this.options && this.options.length != 0){

          var data = this.options.RiskAssetDegree;
          data.forEach(item => {
            if(item.degree == 'low'){
              Object.assign(item,{value:item.count * 1,name:'低危'});
            }else if(item.degree == 'medium'){
              Object.assign(item,{value:item.count * 1,name:'中危'});
            }else if(item.degree == 'high'){
              Object.assign(item,{value:item.count * 1,name:'高危'});
            }
          });
        }else {
          return false;
        }

        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('dangerCapital'));
        // 绘制图表
        let option = {
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
          series: [
            {
              name:'访问来源',
              type:'pie',
              center: ['18%', '56%'],
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
                  formatter: ['{d|{d}%}','{b|{b}警告}'].join('\n'),
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

        /*myChart.dispatchAction({type: 'highlight',seriesIndex: 0,dataIndex: 0});//设置默认选中高亮部分

        myChart.on('mouseover',function(e){
          if(e.dataIndex != index){
            myChart.dispatchAction({type: 'downplay', seriesIndex: 0, dataIndex: index  });
          }
        });
        myChart.on('mouseout',function(e){
          index = e.dataIndex;
          myChart.dispatchAction({type: 'highlight',seriesIndex: 0,dataIndex: e.dataIndex});
        });*/

        window.addEventListener("resize", () => {
          myChart.resize();
        });
      }
    }
  }
</script>

<style scoped lang="less">
  #dangerCapital{
    height: 100%;
  }
</style>
