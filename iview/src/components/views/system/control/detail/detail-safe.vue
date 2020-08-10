<template>
  <div class="detail-safe" v-loading.fullscreen.lock="loading" v-cloak>
    <back-title :title-name="title_name"></back-title>
    <div class="detail_base">
      <div class="detail_base_top">
        <div class="top_left">
          <img src="@/assets/images/emerge/top1.png"
               alt="">
          <img src="@/assets/images/emerge/top2.png"
               alt="">
          <img src="@/assets/images/emerge/top3.png"
               alt="">
        </div>
      </div>

    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import backTitle from "@/components/common/back-title";
  export default {
    name: "detail-safe",
    data () {
      return {
        loading: false,
        title_name: "设备详情",
      };
    },
    components: {backTitle},
    mounted () {
      this.get_data();
      
    },
    methods: {
      // ^[0-9]*$
      // _-.@
      get_rex (str) {
        var pattern = (/[\u4e00-\u9fa5]| /)
        return pattern.test(str)
      },
      // 获取数据
      get_data () {
        this.loading = true
        console.log(this.$route.query.detail);
        this.$axios.get('/yiiapi/asset/alert-details', {
          params: {
            id: this.$route.query.detail
          }
        })
          .then(response => {
            this.loading = false

          })
          .catch(error => {
            console.log(error);
          })
      },
      // 下载payload
      download (value, item) {
        if (value.value == "点击下载" && value.name == "PayLoad信息") {
          var funDownload = function (content, filename) {
            // 创建隐藏的可下载链接
            var eleLink = document.createElement("a");
            eleLink.download = filename;
            eleLink.style.display = "none";
            // 字符内容转变成blob地址
            var blob = new Blob([content]);
            eleLink.href = URL.createObjectURL(blob);
            // 触发点击
            document.body.appendChild(eleLink);
            eleLink.click();
            // 然后移除
            document.body.removeChild(eleLink);
          };
          funDownload(item.network_event.payload, "payload.dat");
        }
        if (value.value == "点击下载" && value.name == '文件下载') {
          window.open('/yiiapi/asset/get-file?md5=' + value.md5);
        }
      },
      handleSizeChange (val) {
        this.emerge_list.now_data.rows = val;
        this.emerge_list.now_data.page = 1;
        this.new_list();
      },
      handleCurrentChange (val) {
        this.emerge_list.now_data.page = val;
        this.new_list();
      },
      handleSelectionChange () { },
      handleClick (tab, event) {
        console.log(tab);
      },
      //获取工单列表
      get_worksheets_list () {
        this.$axios.get('/yiiapi/asset/workorder-list', {
          params: {
            page: this.worksheets_data.page,
            rows: this.worksheets_data.rows,
            type: 'alert'
          }
        }).then((resp) => {
          let { status, data } = resp.data;
          console.log(data);
          console.log(status);
          if (status == 0) {
            console.log(data);
            this.worksheets_list = data
            this.worksheets_list.pageNow = data.pageNow * 1
            this.worksheets_data.pop = true;
            this.worksheets_list.data.forEach(element => {
              element.perator_cn = JSON.parse(element.perator).join(',')
              this.worksheets_data.level_list.forEach(item => {
                if (element.priority == item.value) {
                  element.priority_cn = item.label
                }
              });
              this.worksheets_data.status_type.forEach((ele, index) => {
                if (element.status == index) {
                  element.status_cn = this.worksheets_data.status_type[index]
                }
              });
            });
          }
        })
      },


    },
    filters: {

    }
  };
</script>
<style lang="less">
  /*@import '../../../../../assets/css/less/reset_css/reset_tab.less';
  @import '../../../../../assets/css/less/reset_css/reset_pop.less';*/
  .el-input__inner {
    background: #f8f8f8;
    border: 0;
  }
  .dropdown_ul_box_detail {
    // width: 124px;
    // top: 209px !important;
    .el-dropdown-menu__item:hover {
      color: #606266;
    }
  }
  // tab栏
  .emerge_table {
    th {
      .cell {
        font-family: PingFangMedium;
        font-size: 14px;
        color: #333333;
      }
    }
    td {
      .cell {
        font-family: PingFang;
        font-size: 14px;
        color: #666;
      }
    }
  }
  .detail-network {
    .pagination_box {
      margin: 24px 0;
      text-align: center;
    }

    // 弹窗编辑标签
    .add_tag {
      .el-dialog {
        width: 440px;
        .el-dialog__body {
          width: 440px;
          .content {
            padding: 24px 5px;
            height: 120px;
            overflow-y: auto;
            &::-webkit-scrollbar {
              /*滚动条整体样式*/
              width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
              border-radius: 6px;
            }
            &::-webkit-scrollbar-thumb {
              /*滚动条里面小方块*/
              border-radius: 6px;
              background: #a8a8a8;
            }
            &::-webkit-scrollbar-track {
              /*滚动条里面轨道*/
              border-radius: 6px;
              background: #f4f4f4;
            }
            .content_item {
              margin-bottom: 24px;
              .item_addrs {
                margin-bottom: 12px;
                display: flex;
              }
              .img_box {
                width: 16px;
                height: 16px;
                margin-left: 10px;
                margin-top: 14px;
                cursor: pointer;
              }
              .title {
                font-size: 12px;
                color: #999999;
              }
              .title_color {
                color: #ff5f5c;
              }
              .select_box {
                width: 100%;
                height: 38px;
                margin-top: 6px;
                .el-input__inner {
                  background: #f8f8f8;
                  border: 0;
                }
              }
            }
          }
        }
      }
    }
    //添加到工单
    .pop_state_add {
      .el-dialog {
        width: 960px;
        .el-dialog__body {
          width: 960px;
          .content {
            padding-top: 24px;
            // 修改radio 改成对号
            height: 400px;
            overflow-y: auto;
            &::-webkit-scrollbar {
              /*滚动条整体样式*/
              width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
              border-radius: 6px;
            }
            &::-webkit-scrollbar-thumb {
              /*滚动条里面小方块*/
              border-radius: 6px;
              background: #a8a8a8;
            }
            &::-webkit-scrollbar-track {
              /*滚动条里面轨道*/
              border-radius: 6px;
              background: #f4f4f4;
            }

            .el-radio__input.is-checked .el-radio__inner::after {
              transform: rotate(45deg) scaleY(1);
            }
            .el-radio__inner::after {
              -webkit-box-sizing: content-box;
              box-sizing: content-box;
              background-color: transparent;
              content: '';
              border: 1px solid #fff;
              border-left: 0;
              border-top: 0;
              height: 0.4375rem;
              left: 0.25rem;
              position: absolute;
              top: 1px;
              -webkit-transform: rotate(45deg) scaleY(0);
              transform: rotate(45deg) scaleY(0);
              width: 0.1875rem;
              -webkit-transition: -webkit-transform 0.15s ease-in 0.05s;
              transition: -webkit-transform 0.15s ease-in 0.05s;
              transition: transform 0.15s ease-in 0.05s;
              transition: transform 0.15s ease-in 0.05s,
              -webkit-transform 0.15s ease-in 0.05s;
              transition: transform 0.15s ease-in 0.05s,
              -webkit-transform 0.15s ease-in 0.05s;
              -webkit-transform-origin: center;
              transform-origin: center;
            }
            .el-radio__inner {
              border-radius: 2px;
            }
          }
        }
      }
    }
    //  新建工单
    .task_new_box {
      .el-dialog {
        width: 960px;
        .el-dialog__body {
          width: 960px;
          .closed_img {
            position: absolute;
            top: -18px;
            right: -18px;
            cursor: pointer;
            width: 46px;
            height: 46px;
          }

          .title {
            height: 24px;
            line-height: 24px;
            text-align: left;

            .title_name {
              font-size: 20px;
              color: #333333;
              font-family: PingFangMedium;
              line-height: 24px;
            }

            .mask {
              width: 24px;
              height: 0px;
              border-top: 0px;
              border-right: 2px solid transparent;
              border-bottom: 5px solid #0070ff;
              border-left: 2px solid transparent;
              transform: rotate3d(0, 0, 1, 90deg);
              display: inline-block;
              margin-right: -5px;
              margin-bottom: 4px;
              margin-left: -10px;
            }
          }

          .step_box {
            height: 36px;
            margin: 20px 0 24px 0;
            .step_box1 {
              background-image: url('../../../../../assets/images/emerge/step1.png');
              background-repeat: no-repeat;
              background-size: 100% 100%;
              width: 120px;
              height: 36px;
              float: left;
              position: relative;
              line-height: 36px;
              text-align: center;

              .step1_span {
                font-size: 14px;
              }

              .selected_img {
                position: absolute;
                left: 0;
                top: 0;
              }
            }

            .step_box2 {
              width: 120px;
              height: 36px;
              background-image: url('../../../../../assets/images/emerge/step2.png');
              background-repeat: no-repeat;
              background-size: 100% 100%;
              float: left;
              position: relative;
              line-height: 36px;
              text-align: center;
              margin-left: -10px;

              .step2_span {
                font-size: 14px;
              }
            }

            .step_now {
              color: #0070ff;
            }

            .step_past {
              color: #999999;
            }
          }
          .task_new_content {
            /*height: 480px;*/

            .content_top {
              overflow: hidden;

              .content_top_left {
                float: left;
                width: 45%;

                .left_item {
                  margin-bottom: 16px;
                  display: flex;

                  .title {
                    width: 100px;
                    line-height: 38px;

                    .improtant_ico {
                      color: #ff3a36;
                    }
                  }

                  .task_new_input {
                    flex: 1;

                    .el-input__inner {
                      height: 38px;
                    }
                  }
                }
              }

              .content_top_right {
                float: right;
                width: 45%;

                .right_item {
                  margin-bottom: 16px;
                  display: flex;

                  .title {
                    width: 100px;
                    line-height: 38px;

                    .improtant_ico {
                      color: #ff3a36;
                    }
                  }

                  .task_new_input {
                    flex: 1;

                    .el-input__inner {
                      height: 38px;
                    }
                  }
                }
              }
            }

            .content_remarks {
              .title {
                font-size: 12px;
                color: #999999;
              }

              /deep/ .el-textarea {
                height: 92px;
                textarea {
                  resize: none;
                  height: 92px;
                  font-size: 14px;
                  color: #333;
                  font-family: PingFang;
                }
              }
              .el-textarea__inner:hover {
                border: none;
              }

              .el-textarea__inner {
                border: none;
                background: #f8f8f8;
              }
            }

            .content_table {
              margin-top: 16px;

              /deep/ .el-table td {
                padding: 0;
                height: 32px;
              }
              /deep/ .el-table th {
                padding: 0;
                height: 36px;
                background: #f8f8f8;
                .cell {
                }
              }

              /deep/ .el-pagination {
                margin-top: 20px;
                text-align: center;
              }
            }
          }
          .task_content_box {
            height: 400px;
            overflow-y: auto;
            &::-webkit-scrollbar {
              /*滚动条整体样式*/
              width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
              border-radius: 6px;
            }
            &::-webkit-scrollbar-thumb {
              /*滚动条里面小方块*/
              border-radius: 6px;
              background: #a8a8a8;
            }
            &::-webkit-scrollbar-track {
              /*滚动条里面轨道*/
              border-radius: 6px;
              background: #f4f4f4;
            }
          }
          .btn_box {
            margin-top: 36px;
            margin-bottom: 24px;
            height: 42px;
            text-align: center;

            .cancel_btn {
              border: 1px solid #0070ff;
              background: #fff;
              color: #0070ff;
              width: 136px;
              height: 42px;
              font-size: 16px;
            }

            .next_btn {
              background-color: #0070ff;
              color: #fff;
              width: 136px;
              height: 42px;
              font-size: 16px;
            }
          }
          .task_handle_content {
            .handle_content_top {
              height: 42px;
              text-align: left;
              .change_btn,
              .ref {
                background-color: #0070ff;
                border-color: #0070ff;
                width: 136px;
                height: 42px;
                color: #fff;
              }

              .cel {
                border: 1px solid #0070ff;
                background: #fff;
                color: #0070ff;
                width: 136px;
                height: 42px;
                margin-left: 0;
              }
            }

            .table_box {
              margin-top: 24px;

              .table_box_title {
                height: 38px;
                li {
                  height: 38px;
                  width: 92px;
                  float: left;
                  font-size: 14px;
                  line-height: 38px;
                  color: #bbbbbb;
                  text-align: center;
                  border-top: 2px solid #fff;
                }

                li.active {
                  cursor: pointer;
                  background: #eef6ff;
                  color: #0070ff;
                  border-top: 2px solid #0070ff;
                }
              }
              /deep/ .el-table {
                font-size: 12px;
                thead.has-gutter {
                  th {
                    color: #333333;
                    background: #f8f8f8;
                    .cell {
                    }
                  }
                }
                .cell {
                  color: #333333;
                }
              }

              /deep/ .el-pagination {
                margin-top: 20px;
                text-align: center;
              }
            }

            .btn_box {
              margin-top: 36px;
              margin-bottom: 24px;
              height: 42px;
              text-align: center;

              .cancel_btn {
                border: 1px solid #0070ff;
                background: #fff;
                color: #0070ff;
                width: 136px;
                height: 42px;
                font-size: 16px;
              }

              .prev_btn {
                background-color: #0070ff;
                color: #fff;
                width: 136px;
                height: 42px;
                font-size: 16px;
              }
            }
          }
        }
      }
    }
  }
</style>
