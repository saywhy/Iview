<template>
  <div class="vm-handle-local" v-cloak>
    <div id="locality"></div>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
      name: "vm-handle-local",
      props:{
        progress_data:{
          type:Array,
          default: []
        }
      },
      mounted() {
        this.drawGraph();
      },
      methods:{
        drawGraph(){

          let options = this.progress_data;
          var xData = [];
          var yData = [];

          //console.log(options);

         /* let xData = ['7bf2exe1.exe','kzreport2.exe','kzreport3.exe','kreport4.exe','krepor5.exe',
            'kreport6.exe','kreport7.exe','kreport8.exe','kreport9.exe','kreport10.exe'];
          let yData = [30,40,20,30,50,60,20,10,40,50];*/
          if (options.length > 0) {
            xData = options.map(item => {return item.ip});
            yData = options.map(item => {return item.count});
          }else {
            return false;
          }

          //console.log(xData)
          let myChart = this.$echarts.init(document.getElementById('locality'));
          myChart.showLoading({ text: '正在加载数据...' });
          myChart.clear();

          let option = {
            tooltip: {
              trigger: 'axis',
              backgroundColor:'rgba(0,122,255,0.5)',
              axisPointer: {
                type: 'shadow'
              },
              show:false
            },
            grid: {
              top:'5%',
              left: '0',
              right: '0',
              bottom: '0',
              containLabel: true
            },
            xAxis: {
              data: xData,
              axisLabel: {
                textStyle: {
                  color: '#666'
                }
              },
              axisTick: {
                show: false
              },
              axisLine: {
                show: true,
                lineStyle:{
                  color:'#ececec'
                }
              },
              splitLine:{
                show: true,
                lineStyle:{
                  color:'#f4f4f4'
                }
              }
            },
            yAxis: {
              axisLine: {
                show: true,
                lineStyle:{
                  color:'#ececec'
                }
              },
              splitLine:{
                show: true,
                lineStyle:{
                  color:'#f4f4f4'
                }
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                textStyle: {
                  color: '#666'
                }
              },
            },
            series: [{
              type: 'bar',
              emphasis:{
                show:false
              },
              itemStyle: {
                normal: {
                  //每根柱子颜色设置
                  color: function(params) {
                    let colorList = [
                      "#0288D1",
                      "#4A58D9",
                      "#CDDC39",
                      "#DCB539",
                      "#91D35D",
                      "#4CAF50",
                      "#26D4A4",
                      "#00BCD4",
                      "#F57C00",
                      "#E05353"
                    ];
                    let index = params.dataIndex % 10;
                    return colorList[index];
                  }
                }
              },
              barWidth: 30,
              data: yData
            }]
          };

          myChart.setOption(option);

          myChart.hideLoading();
          window.addEventListener("resize", () => {
            myChart.resize();
          });
        }
      }
    }
</script>

<style scoped lang="less">
  .vm-handle-local{
    height: auto;
    #locality{
      width: 100%;
      height: 220px;
    }
  }
</style>
