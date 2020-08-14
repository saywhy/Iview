<template>
    <div class="view-upload" v-cloak>
      <uploader class="uploader-example"
                :options="options"
                :autoStart='false'
                :fileStatusText='fileStatusText'
                @file-added="onFileAdded"
                @file-success="onFileSuccess"
                @file-progress="onFileProgress"
                @file-error="onFileError">
        <uploader-unsupport></uploader-unsupport>
        <div class="upload_cont">
          <uploader-btn class="select_btn"></uploader-btn>
        </div>
        <uploader-drop>
          <span class="tips">请点击选择要导入的文件</span><br/>
          <span class="tips">PDF、DOCX、XLS、XLSX、TXT</span>
        </uploader-drop>
        <uploader-list></uploader-list>
      </uploader>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      name: "view-upload",
      data(){
          return{
            options: {
              target: '/yiiapi/sandbox/upload',
              chunkSize: '10048000',   //分块大小
              testChunks: false,     //是否开启服务器分片校验
              parseTimeRemaining: function (timeRemaining, parsedTimeRemaining) {
                return parsedTimeRemaining
                  .replace(/\syears?/, '年')
                  .replace(/\days?/, '天')
                  .replace(/\shours?/, '小时')
                  .replace(/\sminutes?/, '分钟')
                  .replace(/\sseconds?/, '秒')
              }
            },
            fileStatusText: {
              success: '成功',
              error: '错误',
              uploading: '上传中',
              paused: '暂停',
              waiting: '等待'
            },
          }
      },
      methods:{
        // 上传
        onFileAdded (file) {
          console.log(file);
          file.pause()
          if (file.size > 100 * 1024 * 1024) {
            this.$message({
              message: '上传文件大小不能超过 100MB!',
              type: 'warning'
            });
            setTimeout(() => {
              file.cancel()
            }, 100)
          } else {
            setTimeout(() => {
              file.resume();
            }, 100)
          }
        },
        onFileSuccess (rootFile, file, response, chunk) {
          this.$axios.get('/yiiapi/site/check-auth-exist', {
            params: {
              pathInfo: 'yararule/download',
            }
          })
            .then(response => {

            })
            .catch(error => {
              console.log(error);
            })
          if (JSON.parse(response).status == 0) {
            console.log(file);
            this.$axios.get('/yiiapi/sandbox/move-file', {
              params: {
                upload_name: file.name,
              }
            })
              .then(response => {
                let { status, data } = response.data;
                if (status == 0) {
                  file.cancel()
                  this.get_data();
                  this.$message(
                    {
                      message: '上传成功!',
                      type: 'success',
                    }
                  );
                } else {
                  this.$message(
                    {
                      message: response.data.msg,
                      type: 'error',
                    }
                  );
                }
              })
              .catch(error => {
                console.log(error);
              })

          } else {
            this.$message(
              {
                message: JSON.parse(response).msg,
                type: 'error',
              }
            );
          }
          console.log(chunk);
        },
        onFileProgress (file) {
          this.$axios.get('/yiiapi/site/check-auth-exist', {
            params: {
              pathInfo: 'yararule/download',
            }
          })
            .then(response => {

            })
            .catch(error => {
              console.log(error);
            })
        },
        onFileError () {
          this.$axios.get('/yiiapi/site/check-auth-exist', {
            params: {
              pathInfo: 'yararule/download',
            }
          })
            .then(response => {

            })
            .catch(error => {
              console.log(error);
            })
        },
      }
    }
</script>

<style scoped lang="less">
  .view-upload {
    background: #f8f8f8;
    width: 792px;
    /deep/
    .uploader-example {
      width: 100%;
      margin: 0;
      padding: 0;
      border: 0;
      .upload_img {
        width: 124px;
        height: 124px;
        margin: 10px auto;
        display: block;
      }
      .upload_cont{
        text-align: center;
        margin: 5px 0;
        .select_btn{
          border: 0;
          width: 124px;
          height: 124px;
          background-image: url("../../../../../assets/images/system/sys4.png");
          background-repeat: no-repeat;
          background-size: 124px 124px;
        }
      }
      .uploader-drop {
        border: 0;
        background: none;
        text-align: center;
        .tips{
          line-height: 32px;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #BBBBBB;
        }
      }
      .uploader-list {
        overflow: auto;
        .uploader-file {
          height: 30px;
          line-height: 30px;
          border: 0;
          .uploader-file-icon {
            display: none;
          }
          .uploader-file-actions {
            display: none;
          }
        }
      }
    }
    .uploader-btn {
      border: 0;
      background: none;
      cursor: pointer;
      &:hover{
        background: none;
        cursor: pointer;
      }
    }
  }
</style>
