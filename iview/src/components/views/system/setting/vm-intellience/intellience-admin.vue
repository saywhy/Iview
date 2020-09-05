<template>
  <div id="intellience-admin" v-cloak
       v-loading.fullscreen.lock="loading">
    <div class="admin-top">
      <el-select class="select_box"
                 @change="selectChanged"
                 v-model="intel_name"
                 placeholder="请选择情报源管理设备">
        <el-option v-for="item in intel_attr"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="admin-bom">
      <div class="item" v-for="(item,$index) in all_source_data"
           v-if="item.name.toUpperCase() !='MobileMaliciousHash_SHA1'.toUpperCase()&&
                  item.name.toUpperCase() !='MaliciousHash_SHA1'.toUpperCase()&&
                  item.name.toUpperCase() !='MaliciousHash_SHA256'.toUpperCase()&&
                  item.name.toUpperCase() !='MobileMaliciousHash_SHA256'.toUpperCase() ">
        <span class="sw">
          <el-switch v-model="item.choose" @change='changeStatus(item)'></el-switch>
          <span class="name" v-show="item.choose">启用</span>
          <span class="name" v-show="!item.choose">禁用</span>
        </span>
        <h3 class="num">{{item.confidence}}</h3>
        <h5 class="cop1">{{item.key}}</h5>
        <h5 class="cop2">{{item.name}}</h5>
        <h4 class="ad1">
          <span class="t1">上次更新时间：</span>
          <span class="t2">{{item.last_run | time}}</span>
        </h4>
        <h4 class="ad1">
          <span class="t1">上次成功更新时间：</span>
          <span class="t2">{{item.last_successful_run | time}}</span>
        </h4>
        <h4 class="ad2">
          <span class="tm1">结果：</span>
          <span class="tm2">{{item.sub_state_cn }}</span>
        </h4>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { eventBus } from '@/components/common/eventBus.js';
  export default {
    name: "intellience-admin",
    data () {
      return {
        key: "",
        loading: false,
        intel_name:'',
        intel_attr:[{value:1,label:'商业情报'},{value:2,label:'开源情报'},{value:3,label:'全部'}],
        full_version:'',
        full_data:[],
        cyberhunt_data:[],
        full_cyberhunt_data:[],
        source_data:{
          red: [],
          green: []
        },
        //商业情报+开源情报
        all_source_data:[]
      };
    },
    props: {
      option: {
        type: Object,
        default: () => { }
      }
    },
    mounted () {
      this.get_data()
    },

    methods: {
      // 获取网卡配置
      get_data () {
        this.loading = true;
        this.$axios.get('/yiiapi/intelligence/Config')
          .then(resp => {

            let {status,data} = resp.data;

            if (status == 0) {
              let {changed, fabric, mgmtbus, next_node_id, nodes, version} = data.result;

              this.full_version = version;

              this.full_data = nodes;

              this.full_data.forEach((item, index) => {
                if (item != null) {
                  item.id = index;
                  if (item.properties.inputs.length == 0) {
                    item.choose = true;
                  } else {
                    item.choose = false;
                  }
                }
              });

              //console.log(this.full_data)

              //第二个接口
              this.$axios.get('/yiiapi/intelligence/Status')
                .then(resp => {

                  let {status,data} = resp.data;

                  if (status == 0) {

                    this.cyberhunt_data = data.result;
                    //console.log(data)
                    this.full_data.forEach((item) => {
                      if (item != null) {
                        this.cyberhunt_data.forEach(ele => {
                          var obj = {};
                          if(item.name == ele.name) {
                            obj.name = item.name;
                            obj.prototype = item.properties.prototype;
                            obj.prototype_name = item.properties.prototype.split(
                              "."
                            )[1];
                            if (ele.last_successful_run) {
                              obj.last_successful_run = parseInt(ele.last_successful_run / 1000);
                            } else {
                              obj.last_successful_run = "";
                            }
                            if (ele.last_run) {
                              obj.last_run = parseInt(ele.last_run / 1000);
                            } else {
                              obj.last_run = "";
                            }
                            if (ele.sub_state) {
                              obj.sub_state = ele.sub_state;
                            } else {
                              obj.sub_state = "";
                            }
                            if (ele.inputs.length == 0) {
                              obj.choose = true;
                            } else {
                              obj.choose = false;
                            }
                            this.full_cyberhunt_data.push(obj);
                          }
                        })

                      }
                    });
                    //console.log(this.full_cyberhunt_data);
                    this.get_prototype();

                  }

                })
                .catch(error => {
                  console.log(error);
                })

              ///////////////

            }

          })
          .catch(error => {
            console.log(error);
          })
      },


      get_prototype(){

        this.$axios.get('/yiiapi/intelligence/Prototype')
          .then(resp => {
          let {status,msg,data} = resp.data;
          this.loading = false;

          if(status == 0){

            //zeroModal.close($scope.loading);
            let prototype_data = data.result;

            for (var k in prototype_data) {
              for (var item in prototype_data[k].prototypes) {
                var obj = {};
                obj.key = k;
                obj.name = item;
                obj.class = prototype_data[k].prototypes[item].class;
                obj.tags = prototype_data[k].prototypes[item].tags;
                obj.config = prototype_data[k].prototypes[item].config;
                obj.node_type = prototype_data[k].prototypes[item].node_type;
                obj.nodeType = prototype_data[k].prototypes[item].node_type;
                obj.indicator_types = prototype_data[k].prototypes[item].indicator_types;
                obj.indicatorTypes = prototype_data[k].prototypes[item].indicator_types;
                obj.description = prototype_data[k].prototypes[item].description;
                obj.author = prototype_data[k].prototypes[item].author;
                if (prototype_data[k].prototypes[item].tags) {
                  if (
                    prototype_data[k].prototypes[item].tags.length == 0
                  ) {
                    obj.type = "green";
                  } else {
                    prototype_data[k].prototypes[item].tags.forEach(ele => {
                      if (ele == "ShareLevelGreen") {
                        obj.type = "green";
                      }
                      if (ele == "ShareLevelRed") {
                        obj.type = "red";
                      }

                    })
                  }
                } else {
                  obj.type = "green";
                }
                if (prototype_data[k].prototypes[item].config.attributes) {
                  if (
                    prototype_data[k].prototypes[item].config.attributes
                      .confidence
                  ) {
                    obj.confidence =
                      prototype_data[k].prototypes[
                        item
                        ].config.attributes.confidence;
                  } else {
                    obj.confidence = 0;
                  }
                } else {
                  obj.confidence = 0;
                }
                if (obj.type == "green") {
                  this.source_data.green.push(obj);
                }
                if (obj.type == "red") {
                  this.source_data.red.push(obj);
                }
                //   $scope.prototype_list.push(obj);
              }
            }

            this.source_data.red.forEach(item => {
              item.choose = false;
              item.last_successful_run = "";
              item.last_run = "";
              item.sub_state = "";
            });
            this.source_data.green.forEach(item => {
              item.choose = false;
              item.last_successful_run = "";
              item.last_run = "";
              item.sub_state = "";
            });

            //判断开启状态
            this.source_data.red.forEach(item => {
              this.full_data.forEach(ele => {
                if (ele != null) {
                  if (item.name == ele.properties.prototype.split(".")[1]) {
                    if (ele.choose) {
                      item.choose = ele.choose;
                    }
                    item.id = ele.id;
                    item.version = ele.version;
                  }
                }
              })
            });
            this.source_data.green.forEach(item => {
              this.full_data.forEach(ele => {
                if (ele != null) {
                  if (item.name == ele.properties.prototype.split(".")[1]) {
                    if (ele.choose) {
                      item.choose = ele.choose;
                    }
                    item.id = ele.id;
                    item.version = ele.version;
                  }
                }
              })
            });

            //更新时间和状态
            this.source_data.red.forEach(item => {
              this.full_cyberhunt_data.forEach(ele => {
                if (item.key + '.' + item.name == ele.prototype) {
                  item.last_successful_run = ele.last_successful_run;
                  item.last_run = ele.last_run;
                  item.sub_state = ele.sub_state;
                  if (item.sub_state == "SUCCESS") {
                    item.sub_state_cn = "成功";
                  } else if (item.sub_state == "ERROR") {
                    item.sub_state_cn = "失败";
                  } else {
                    item.sub_state_cn = item.sub_state;
                  }
                }
              })
            });
            this.source_data.green.forEach(item => {
              this.full_cyberhunt_data.forEach(ele => {
                if (item.key + '.' + item.name == ele.prototype) {
                  item.last_successful_run = ele.last_successful_run;
                  item.last_run = ele.last_run;
                  item.sub_state = ele.sub_state;
                  if (item.sub_state == "SUCCESS") {
                    item.sub_state_cn = "成功";
                  } else if (item.sub_state == "ERROR") {
                    item.sub_state_cn = "失败";
                  } else {
                    item.sub_state_cn = item.sub_state;
                  }
                }
              })
            });

            //console.log(this.source_data);
            this.all_source_data = [...this.source_data.red,...this.source_data.green];
          }
        })
          .catch(error => {
            console.log(error);
          })
      },

      //情报选择
      selectChanged(val){
        switch (val) {
          case 1:
            this.all_source_data = this.source_data.red;
            break;
          case 2:
            this.all_source_data = this.source_data.green;
            break;
          case 3:
            this.all_source_data = [...this.source_data.red,...this.source_data.green];
            break;
          default:
            this.all_source_data = [...this.source_data.red,...this.source_data.green];
            break;
        }
      },

      changeStatus(item){

        //开启
        if(item.choose){
          var node = {
            name: item.key + "_" + item.name,
            properties: {
              inputs: [],
              output: true,
              prototype: item.key + "." + item.name
            },
            version: this.full_version
          };
          this.$axios.post("/yiiapi/intelligence/StatusOpen", node)
            .then(resp => {
              let {status,msg,data} = resp.data;
              console.log(resp)
              if(status == 0){
                this.get_data();
              }
            })
            .catch(error => {
              console.log(error);
            })
        }else {
          
          //禁止
          var node = {
            id:item.id,
            name: item.key + "_" + item.name,
            properties: {
              inputs: [],
              output: true,
              prototype: item.key + "." + item.name
            },
            version: this.full_version
          };
          this.$axios.post("/yiiapi/intelligence/StatusClose", node)
            .then(resp => {
              let {status,msg,data} = resp.data;
              console.log(resp)
              if(status == 0){
                this.get_data();
              }
            })
            .catch(error => {
              console.log(error);
            })

        }


        //禁止


      }
    },

    filters:{
      source_filter_red:function (list) {
        var array = [];
        list.forEach(item => {
          switch (item.key) {
            case 'hoohoolab':
              array.push(item);
              break;
            case 'knownsec':
              array.push(item);
              break;
            default:
              break;
          }
        })
        return array;
      }
    }
  };
</script>

<style scoped lang="less">
  #intellience-admin {
    text-align: left;
    .admin-top{
      width: 100%;
      display: block;
      /deep/
      .select_box {
        width: 360px;
        .el-input__inner {
          width: 360px;
          background: #f8f8f8 !important;
        }
      }
    }
    .admin-bom{
      height: auto;
      margin: 24px 0 4px 0;
      font-size: 0;
      .item{
        width: 376px;
        height: 208px;
        margin-right: 20px;
        margin-bottom: 20px;
        background-color: #FFFFFF;
        box-shadow: 0 2px 6px 0 rgba(0,0,0,0.16);
        border-radius: 2px;
        display: inline-block;
        padding: 12px 24px;
        position: relative;
        background-size: 136px 136px;
        background-position: right bottom;
        background-repeat: no-repeat;
        .num{
          font-family: PingFangSC-Medium;
          font-size: 48px;
          line-height: 1;
        }
        .cop1{
          font-family: PingFangSC-Medium;
          font-size: 14px;
          color: #333333;
          line-height: 24px;
          margin-top: 6px;
        }
        .cop2{
          font-family: PingFangSC-Medium;
          font-size: 14px;
          color: #666666;
          line-height: 24px;
          margin-bottom: 16px;
        }
        .ad1{
          font-family: PingFangSC-Regular;
          font-size: 0;
          line-height: 18px;
          .t1{
             width: 132px;
             @media screen and (max-width: 1601px){
               width: 152px;
             }
             font-size: 14px;
             color: #999999;
             display: inline-block;
          }
          .t2{
            font-size: 14px;
            color: #999999;
            display: inline-block;
          }
        }
        .ad2{
          font-size: 0;
          line-height: 18px;
          .tm1{
            width: 45px;
            @media screen and (max-width: 1601px){
              width: 56px;
            }
            font-size: 14px;
            color: #999999;
            display: inline-block;
            font-family: PingFangSC-Regular;
          }
          .tm2{
            font-size: 14px;
            color: #999999;
            display: inline-block;
            font-family: PingFangSC-Regular;
          }
        }
        .sw{
          position: absolute;
          right: 24px;
          top: 16px;
          /deep/
          .el-switch{
            .el-switch__core{
              width: 32px!important;
              @media screen and (max-width: 1601px){
                &:after{
                  width: 15px;
                  height: 15px;
                }
              }
            }
          }
          .name{
            margin-left: 5px;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #333333;
            vertical-align: top;
          }
        }
        &:nth-child(odd){
          background-image: url("../../../../../assets/images/system/bg1.png");
        }
        &:nth-child(even){
          background-image: url("../../../../../assets/images/system/bg2.png");
        }
        &:nth-child(4n){
          .num{
            color: #FEAA00;
          }
        }
        &:nth-child(4n + 1){
          .num{
            color: #0070FF;
          }
        }
        &:nth-child(4n + 2){
          .num{
            color: #7ACE4C;
          }
        }
        &:nth-child(4n + 3){
          .num{
            color: #12DCFF;
          }
        }
      }
    }
  }
</style>

