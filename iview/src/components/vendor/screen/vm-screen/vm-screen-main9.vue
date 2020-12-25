<template>
  <div class="vm-screen-main9">
    <div class="block-all">
      <div id="flow"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "vm-screen-middle2",
    data(){
      return{
        flow: {
          legendData:[],
          xAxisData:[],
          yAxisData:[],
          series:[],
          legendColor:[]
        },
        timers:null
      }
    },
    created() {
      this.getData();
    },
    mounted() {
      this.timers = setInterval(()=>{
        this.getData();
      },10000 * 30);
    },
    destroyed(){
      clearInterval(this.timers);
    },
    methods:{
      //获取数据
      getData() {
        this.$axios
          .get('/yiiapi/demonstration/FlowStatistics')
          .then((resp) => {

            this.flow = {
              legendData:[],
              xAxisData:[],
              yAxisData:[],
              series:[],
              legendColor:[]
            };
            this.realData = [];

            let {status, data} = resp.data;

            if(status == 0){

              this.flow.legendData = Object.keys(data);
              this.flow.legendData = this.flow.legendData.map(item => {return item.toUpperCase();});

              Object.values(data).forEach((val,key) => {

                if(key == 0){
                  this.flow.xAxisData = val.map(item => {
                    return item.statistics_time;
                  });
                }

                let flow = val.map(item => {
                  return item.flow;
                });

                flow = flow.reverse();

                this.flow.xAxisData = this.flow.xAxisData.reverse();

                let legendName = this.flow.legendData[key];

                legendName = legendName.toUpperCase();

                if(legendName == 'http' || legendName == 'HTTP'){
                  var colors = '#007AFF';
                }else if(legendName == 'https' || legendName == 'HTTPS'){
                  var colors = '#7C00FF';
                }else if(legendName == 'ssh' || legendName == 'SSH'){
                  var colors = '#CC9D3B';
                }else if(legendName == 'dns' || legendName == 'DNS'){
                  var colors = '#00C800';
                }else if(legendName == 'ftp' || legendName == 'FTP'){
                  var colors = '#FF00C9';
                }

                this.flow.legendColor.push(colors);

                this.flow.series.push({
                  data: flow,
                  type: 'line',
                  smooth:true,
                  symbol:'none',
                  name: legendName,
                  itemStyle:{
                    normal:{
                      textStyle:{
                        color: 'red',
                        opacity: .5,
                      },
                      lineStyle: {
                        width: 2,
                        opacity: .5,
                        color: colors
                      },
                      areaStyle: {
                        opacity: .2,
                        color: colors
                      }
                    }
                  }
                });
              });
              this.$nextTick(() => {
                this.drawGraph();
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      },
      drawGraph() {
        let myChart = this.$echarts.init(document.getElementById('flow'));
        myChart.showLoading({ text: '正在加载数据...' });
        myChart.clear();
        let option = {
          tooltip: {
            trigger: 'axis',
            textStyle:{
              align:'left'
            },
            axisPointer: {
              type: 'shadow'
            }
          },
          color: this.flow.legendColor,
          legend: {
            bottom: 5,
            left: 5,
            orient: "horizontal",
            itemWidth:12,
            itemHeight: 8,
            textStyle: {
              color: '#fff',
              fontSize: 10
            },
            data: this.flow.legendData
          },
          grid: {
            top:'5%',
            left: '3%',
            right: '3%',
            bottom: '15%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLabel: {
              color:'#ffffff'
            },
            axisLine:{
              lineStyle:{
                color:'#00D7E9'
              }
            },
            axisTick:{
              show:false
            },
            splitLine:{
              lineStyle:{
                color:'rgba(255,255,255,.12)'
              }
            },
            data: this.flow.xAxisData
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              color: '#ffffff'
            },
            axisLine:{
              lineStyle:{
                color:'#00D7E9'
              }
            },
            axisTick:{
              show: false
            },
            splitLine:{
              lineStyle:{
                color:'rgba(255,255,255,.12)'
              }
            }
          },
          series: this.flow.series
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
  .vm-screen-main9{
    padding: 0 16px 16px;
    .block-all{
      #flow{
        height: 245px;
        width: 100%;
      }
    }
  }
</style>
