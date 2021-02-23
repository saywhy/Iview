<template>
  <div id="system_config"
       v-loading.fullscreen.lock="loading"
       class="container">
    <div class="content_box">
      <el-button class="btn_i"
                 @click="exportConfig">导出配置</el-button>
      <el-button class="btn_i"
                 @click="uploadConfig">导入配置</el-button>
      <uploader :options="options"
                style="display:none"
                :autoStart='true'
                :fileStatusText='fileStatusText'
                @file-added="onFileAdded"
                @upload-start="onFilestart"
                @file-success="onFileSuccess"
                @file-progress="onFileProgress"
                @file-error="onFileError"
                class="uploader_box">
        <uploader-unsupport></uploader-unsupport>
        <uploader-drop style="display:none">
          <uploader-btn class="select_btn"
                        :directory="false"
                        :attrs="attrs"
                        :single='true'>
            <p style="text-align: center;">
            </p>
            <span ref="upload">点击上传</span>
          </uploader-btn>
        </uploader-drop>
        <uploader-list></uploader-list>
      </uploader>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import moment from 'moment'
import { eventBus } from '@/components/common/eventBus.js';
export default {
  name: "system_control_licence",
  data () {
    return {
      loading: false,
      // 修改上传插件
      options: {
        target: '/yiiapi/configinfo/UploadExcel',
        chunkSize: '10048000',   //分块大小
        singleFile: true,
        testChunks: false,     //是否开启服务器分片校验
        parseTimeRemaining: function (timeRemaining, parsedTimeRemaining) {
          return parsedTimeRemaining
            .replace(/\syears?/, '年')
            .replace(/\days?/, '天')
            .replace(/\shours?/, '小时')
            .replace(/\sminutes?/, '分钟')
            .replace(/\sseconds?/, '秒')
        },
      },
      attrs: {
      },
      fileStatusText: {
        success: '上传成功',
        error: '上传失败，请重新上传',
        uploading: '上传中',
        paused: '暂停',
        waiting: '等待'
      },
    };
  },
  beforeCreate () {

  },
  mounted () {
    this.check_passwd();
  },
  methods: {
    // 测试密码过期
    check_passwd () {
      this.$axios.get('/yiiapi/site/CheckPasswdReset')
        .then((resp) => {
          let {
            status,
            msg,
            data
          } = resp.data;
          if (status == '602') {
            this.$message(
              {
                message: msg,
                type: 'warning',
              }
            );
            eventBus.$emit('reset')
          }
        })
    },
    // 导出
    // https://192.168.1.77/yiiapi/configinfo/Export
    exportConfig () {
      this.$confirm('此操作将导出配置, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var url1 = "/yiiapi/configinfo/Export";
        window.location.href = url1;
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    },
    // 导入配置
    // https://192.168.1.77/yiiapi/configinfo/UploadExcel

    uploadConfig () {
      this.$confirm('此操作将“安全设备”和“受监控IP”列表覆盖,是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log('111111');
        this.$refs.upload.click()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    },
    onFilestart () {

    },
    onFileProgress () {

    },
    // 上传
    onFileAdded (file) {
      this.loading = true
      console.log(file);
      // if (file.name.indexOf('.txt') < 0 && file.name.indexOf('.ioc') < 0) {
      //   this.$message({
      //     message: '请上传.txt或者.ioc的格式文件',
      //     type: 'warning'
      //   });
      //   file.ignored = true
      // }
    },
    onFileSuccess (rootFile, file, params_response, chunk) {
      this.loading = false
      console.log(rootFile);
      console.log(file);
      console.log(params_response);
      console.log(chunk);
      if (JSON.parse(params_response).status == 1) {
        rootFile.ignored = true
        // file.cancel()
        this.$message(
          {
            message: JSON.parse(params_response).msg,
            type: 'error',
          }
        );
      } else if (JSON.parse(params_response).status == 0) {
        this.$message(
          {
            message: '导入成功！',
            type: 'success',
          }
        );
        file.cancel()
      }

      console.log(chunk);
    },
    onFileError (params, file) {
      this.loading = false
      console.log(params);
      console.log(file);
      file.ignored = true
      this.$message(
        {
          message: '上传失败!',
          type: 'error',
        }
      );
    },
  },
  filters: {
    formatDate: function (value) {
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
    }
  },
}
</script>
<style scoped lang='less'>
@import '../../../../assets/css/less/system/setting/common_box.less';
#system_config {
  .content_box {
    padding-right: 24px;
    .btn_i {
      font-size: 14px;
      width: 148px;
      height: 42px;
      background: #0070ff;
      color: #fff;
      padding: 0;
    }
  }
}
</style>
<style lang='less'>
@import '../../../../assets/css/less/reset_css/reset_table.less';
@import '../../../../assets/css/less/reset_css/reset_pop.less';
#system_control_licence {
  .el-dialog {
    width: 440px;
    .content_item {
      margin-top: 24px;
      .select_box {
        width: 100%;
        height: 38px;
        margin-top: 6px;
        .el-input__inner {
          background: #f8f8f8;
          border: 0;
        }
      }
      .title {
        font-size: 12px;
        color: #999999;
      }
    }
    .btn_box {
      margin-top: 24px;
    }
  }
}
</style>
