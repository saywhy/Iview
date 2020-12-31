<template>
  <!--<div class="vm-screen-middle2">
    <el-table :data="tableData" class="screen-table">
       <el-table-column label="告警时间" show-overflow-tooltip>
         <template slot-scope="scope">
           <marquee direction="left" hspace="0" vspace="0"
                    behavior="scroll" scrollamount="1" align="left"
                    scrolldelay="0" loop="-1" width="100%">
             <div class="it" > {{ scope.row.alert_time | time }}</div>
           </marquee>
         </template>
       </el-table-column>

     &lt;!&ndash; <el-table-column prop="category" label="告警类型" show-overflow-tooltip></el-table-column>&ndash;&gt;

      <el-table-column label="告警类型" show-overflow-tooltip>
        <template slot-scope="scope">
          <marquee direction="left" align="left" border="1px solid red"
                   behavior="scroll" scrollamount="1"
                   scrolldelay="0" loop="-1" width="100%">
            <div class="it" >{{ scope.row.category }}</div>
          </marquee>
        </template>
      </el-table-column>
      <el-table-column label="威胁指标" show-overflow-tooltip>
        <template slot-scope="scope">
          <marquee direction="left" align="left" border="1px solid red"
                   behavior="scroll" scrollamount="1"
                   scrolldelay="0" loop="-1" width="100%">
            <div class="it" >{{ scope.row.indicator }}</div>
          </marquee>
        </template>
      </el-table-column>
      &lt;!&ndash;<el-table-column prop="indicator" label="威胁指标" show-overflow-tooltip></el-table-column>&ndash;&gt;
      <el-table-column prop="asset_ip" label="风险资产" show-overflow-tooltip></el-table-column>
      <el-table-column label="攻击阶段" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.attack_stage | stage }}
        </template>
      </el-table-column>

       &lt;!&ndash;<el-table-column label="告警类型" show-overflow-tooltip>
         <template slot-scope="scope">
           <marquee direction="left"
                    behavior="scroll" scrollamount="1"
                    scrolldelay="0" loop="-1" width="100%">
             {{ scope.row.category }}
           </marquee>
         </template>
       </el-table-column>
       <el-table-column label="威胁指标" show-overflow-tooltip>
         <template slot-scope="scope">
           <marquee direction="left"
                    behavior="scroll" scrollamount="1"
                    scrolldelay="0" loop="-1" width="100%">
             {{ scope.row.indicator }}
           </marquee>
         </template>
       </el-table-column>
       <el-table-column label="风险资产" show-overflow-tooltip>
         <template slot-scope="scope">
           <marquee direction="left"
                    behavior="scroll" scrollamount="1"
                    scrolldelay="0" loop="-1" width="100%">
             {{ scope.row.asset_ip }}
           </marquee>
         </template>
       </el-table-column>
       <el-table-column label="攻击阶段" show-overflow-tooltip>
         <template slot-scope="scope">
           <marquee direction="left" hspace="0"
                    behavior="scroll" scrollamount="1"
                    scrolldelay="0" loop="-1" width="100%">
             {{ scope.row.attack_stage }}
           </marquee>
         </template>
       </el-table-column>&ndash;&gt;
     &lt;!&ndash; <el-table-column label="告警时间" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.alert_time | time }}
        </template>
      </el-table-column>
      <el-table-column prop="category" label="告警类型" show-overflow-tooltip></el-table-column>
      <el-table-column prop="indicator" label="威胁指标" show-overflow-tooltip></el-table-column>
      <el-table-column prop="asset_ip" label="风险资产" show-overflow-tooltip></el-table-column>
      <el-table-column label="攻击阶段" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.attack_stage | stage }}
        </template>
      </el-table-column>&ndash;&gt;
    </el-table>
  </div>-->

  <div class="vm-screen-middle2" v-cloak>

    <div class="middle2-th">
      <div class="tc1">告警时间</div>
      <div class="ths">告警类型</div>
      <div class="ths">威胁指标</div>
      <div class="ths">风险资产</div>
      <div class="ths">攻击阶段</div>
    </div>
    <ul class="middle2-list">
      <li v-for="(item,index) in its" :key="item.id" class="item">
        <span class=" tc1">{{item.alert_time | time}}</span>
        <span class="t-content" :title="item.category">{{item.category}}</span>
        <span class="t-content" :title="item.indicator">{{item.indicator}}</span>
        <span class="t-content" :title="item.asset_ip">{{item.asset_ip}}</span>
        <span class="t-content">{{item.attack_stage | stage}}</span>
      </li>
    </ul>


    <!--<el-table :data="tableData" class="screen-table">
      <el-table-column label="告警时间" show-overflow-tooltip>
        <template slot-scope="scope">
          <marquee direction="left" hspace="0" vspace="0"
                   behavior="scroll" scrollamount="1" align="left"
                   scrolldelay="0" loop="-1" width="100%">
            <div class="it" > {{ scope.row.alert_time | time }}</div>
          </marquee>
        </template>
      </el-table-column>

      &lt;!&ndash; <el-table-column prop="category" label="告警类型" show-overflow-tooltip></el-table-column>&ndash;&gt;

      <el-table-column label="告警类型" show-overflow-tooltip>

      &lt;!&ndash;<el-table-column prop="indicator" label="威胁指标" show-overflow-tooltip></el-table-column>&ndash;&gt;
      <el-table-column prop="asset_ip" label="风险资产" show-overflow-tooltip></el-table-column>
      <el-table-column label="攻击阶段" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.attack_stage | stage }}
        </template>
      </el-table-column>
    </el-table>-->
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "vm-screen-main9",
    data() {
      return {
        animate:false,
        timer:null,
        timers:null,
        items:[{id:1,alert_time: "1609211388",asset_ip: ["33.24.24.41"],attack_stage: "Command and Control",category: "僵尸网络C&C",indicator: "118.25.139.71"},
          {id:2,alert_time: "1609211388",asset_ip: ["33.24.24.42"],attack_stage: "Command and Control",category: "僵尸网络C&C",indicator: "118.25.139.72"},
          {id:3,alert_time: "1609211388",asset_ip: ["33.24.24.43"],attack_stage: "Command and Control",category: "僵尸网络C&C",indicator: "118.25.139.73"},
          {id:4,alert_time: "1609211388",asset_ip: ["33.24.24.44"],attack_stage: "Command and Control",category: "僵尸网络C&C",indicator: "118.25.139.74"},
          {id:5,alert_time: "1609211388",asset_ip: ["33.24.24.45"],attack_stage: "Command and Control",category: "僵尸网络C&C",indicator: "118.25.139.75"}
        ],
        its:[]
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
    methods: {
      //获取数据
      getData() {
        this.$axios
          .get('/yiiapi/demonstration/ThreatRange')
          .then((resp) => {

            let {status, data} = resp.data;

            if (status == 0) {

              clearInterval(this.timer);

              if(status == 0){

                data.forEach((item,key) => {
                  item.asset_ip = item.asset_ip.join(',');
                  Object.assign(item,{id:key})
                })

                this.items = data;
                this.its = this.items.slice(0,5);

                //this.timer = setInterval(this.scroll,3000);
                if(data.length > 5){
                  this.timer = setInterval(this.scroller,2000);
                }
              }
            }
          })
          .catch((error) => {
            console.log(error);
          });
      },
      /*scroll(){
        this.animate= true;
        setTimeout(()=>{
          this.items.push(this.items[0]);
          this.items.shift();
          this.animate=false;
        },1000)
      },*/
      scroller(){
        setTimeout(()=>{
          this.items.push(this.items[0]);
          this.items.shift();
          this.its = this.items.slice(0,5)
        },1000)
      }
    }
  }
</script>

<style scoped lang="less">
  .vm-screen-middle2 {
    padding: 0 16px 16px;
    position: relative;
    z-index: 1;
    .middle2-th{
      height: 40px;
      line-height: 40px;
      background: #034061;
      display: flex;
      z-index: 2;
      position: absolute;
      width: calc(100% - 32px);
      .ths{
        flex: 1;
        color: #fff;
        font-size: 16px;
      }
      .tc1{
        width: 180px;
        color: #fff;
        font-size: 16px;
      }
    }
    .middle2-list{
      top: 40px;
      z-index: 0;
      position: absolute;
      width: calc(100% - 32px);
 /*     -webkit-animation: fadeIn 3s linear infinite;
      animation: fadeIn 3s linear infinite;*/
      .item{
        height: 40px;
        line-height: 40px;
        text-align: left;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #FFFFFF;
        display: flex;
        .t-content{
          flex: 1;
          text-align: center;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          display: inline-block;
        }
        .tc1{
          width: 180px;
          text-align: center;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          display: inline-block;
        }
        &:nth-child(even){
          background-color: #13224a;
          .t-content{
            color:#0599d4;
          }
          .tc1{
            color:#0599d4;
          }
        }
        /*&:nth-child(odd){
          background-color: #040d2d;
        }*/
      }
    }
    /*/deep/
    .screen-table {
      background-color: transparent !important;
      &:before {
        height: 0;
      }
      .el-table__body-wrapper{
        overflow-x: inherit;
      }

      .el-table__header {
        th {
          !*background: rgba(0,215,233,0.24);*!
          border-width: 0;
          padding: 0;
          height: 36px;
          line-height: 36px;
          background: #034061;
          text-align: center;
          .cell {
            color: #fff;
          }
        }
      }

      .el-table__body {
        td {
          border-width: 0;
          padding: 0;
          height: 40px;
          line-height: 40px;
          background: #00134A;

          .cell {
            color: #fff;
          }
          .it{
            width: 180px;
          }
        }
      }
    }*/
  }
  @keyframes fadeIn {
    0% {
      opacity:0;
      transform: translateY(20%);
    }
    10% {
      transform: translateY(0%);
    }
    50% {
      opacity:1;
      transform: translateY(0%);
    }
    100% {
      opacity:0;
      transform: translateY(0%);
    }
  }
</style>
