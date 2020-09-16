<template>
  <div class="view-upload"
       v-cloak>
   <!-- <uploader class="uploader-example"
              ref="upload"
              :options="options"
              :autoStart='false'
              :auto-upload="true"
              :fileStatusText='fileStatusText'
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              >
      <uploader-unsupport></uploader-unsupport>
      <div class="upload_cont">
        <uploader-btn class="select_btn"></uploader-btn>
      </div>
      <uploader-drop>
        <span class="tips">请点击选择要导入的文件</span><br/>
        <span class="tips">PDF、DOCX、XLS、XLSX、TXT</span>
      </uploader-drop>
      <uploader-list></uploader-list>
    </uploader>-->
   <!-- action="https://jsonplaceholder.typicode.com/posts/"-->
    <el-upload
      class="uploader-example"
      drag
      ref="upload"
      :autoStart='false'
      :auto-upload="false"
      :before-upload="beforeUpload"
      :on-success="onFileSuccess"
      :on-remove="handleRemove"
      :on-error="onFileError"
      :file-list="fileList"
      accept=".xls,.xlsx文件格式"
      action="/yiiapi/intelligence/Upload"
      multiple>

      <i class="el-icon-upload"></i>
      <div class="el-upload__text">导入支持的文件格式<em>&nbsp;&nbsp;点击此处</em></div>
      <div class="el-upload__tip" slot="tip">支持xls，xlsx文件格式</div>
    </el-upload>
    <div class="btn_box_group">
      <el-button @click="closed_exp_box"
                 class="cancel_btn">取消</el-button>
      <el-button class="ok_btn"
                 @click="submit_exp_box">确定</el-button>
    </div>
   <!-- <el-upload
      class="uploader-example"
      ref="upload"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="onFileSuccess"
      :auto-upload="false">
      <div class="upload_cont">
        <uploader-btn class="select_btn"></uploader-btn>
      </div>
&lt;!&ndash;<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>&ndash;&gt;
      <div slot="tip" class="el-upload__tip">PDF、DOCX、XLS、XLSX、TXTb</div>
    </el-upload>
    -->
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "view-upload",
  data () {
    return {
      options: {
        target: '/yiiapi/intelligence/Upload',
        chunkSize: '10048000',   //分块大小
        testChunks: false     //是否开启服务器分片校验
      },
      fileList:[],
      fileStatusText: {
        success: '成功',
        error: '错误',
        uploading: '上传中',
        paused: '暂停',
        waiting: '等待'
      },
    }
  },
  methods: {
    uploadUrl(){
      return "/yiiapi/intelligence/Upload";
    },
    beforeUpload(file) {
      console.log(file)
      var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
      const extension = testmsg === 'xls'
      const extension2 = testmsg === 'xlsx'
      const isLt2M = file.size / 1024 / 1024 < 100;
      if(!extension && !extension2) {
        this.$message({
          message: '上传文件只能是 xls、xlsx格式!',
          type: 'warning'
        });
      }
       if(!isLt2M) {
           this.$message({
               message: '上传文件大小不能超过 100MB!',
               type: 'warning'
           });
       }
      return (extension || extension2) && isLt2M
    },
    // 上传
    /*onFileAdded (file) {
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
    },*/
    onFileSuccess (rootFile, file, response, chunk) {
      console.log('成功');

      console.log(response)
      this.$emit('titleChanged',false);
      this.$message({
        message: '导入成功！',
        type: 'success'
      });
    },
    onFileProgress (file) {
      console.log('333')
    },
    onFileError () {
      console.log('失败')
      //this.$emit('titleChanged',false);
      this.$message({
        message: '导入失败！',
        type: 'error'
      });
    },
    //
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },


    //确定
    submit_exp_box() {
      this.$refs.upload.submit();
      this.$refs.upload.clearFiles();
    },
    //取消
    closed_exp_box(){
      this.$emit('titleChanged',false);
    }
  }
}
</script>

<style scoped lang="less">
.view-upload {
  background: #f8f8f8;
  width: 792px;
  height: 440px;
  /deep/
  .uploader-example {
    width: 100%;
    margin: 0;
    padding: 0;
    border: 0;
    height: 440px;
    /deep/
    .el-upload{
      width: 100%;
      .el-upload-dragger{
        width: 100%;
        height: 140px;
        .el-icon-upload{
          margin: 16px 0 16px;
        }
      }
    }
    /deep/
    .el-upload__tip{
      text-align: center;
    }
    /deep/
    .el-upload-list{
      margin: 10px 0;
      height: 256px;
      overflow-y: auto;
      &::-webkit-scrollbar {
        width: 6px;
        border-radius: 6px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 6px;
        background: #a8a8a8;
      }
      &::-webkit-scrollbar-track {
        border-radius: 6px;
        background: #f4f4f4;
      }
    }

    /*.upload_cont {
      text-align: center;
      margin: 1px 0;
      width: 100%;
      height: 84px;
      .select_btn {
        border: 0;
        width: 84px;
        height: 84px;
        background-image: url('../../../../../assets/images/system/sys4.png');
        background-repeat: no-repeat;
        background-size: 84px 84px;
      }
    }
    /deep/
    .el-upload__tip{
      text-align: center;
      width: 100%;
    }
    .uploader-drop {
      border: 0;
      background: none;
      text-align: center;
      .tips {
        line-height: 32px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #bbbbbb;
      }
    }
    .uploader-list {
      height: 188px;
      overflow-y: auto;
      &::-webkit-scrollbar {
        !*滚动条整体样式*!
        width: 6px; !*高宽分别对应横竖滚动条的尺寸*!
        border-radius: 6px;
      }
      &::-webkit-scrollbar-thumb {
        !*滚动条里面小方块*!
        border-radius: 6px;
        background: #a8a8a8;
      }
      &::-webkit-scrollbar-track {
        !*滚动条里面轨道*!
        border-radius: 6px;
        background: #f4f4f4;
      }
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
    }*/
  }
  .uploader-btn {
    border: 0;
    background: none;
    cursor: pointer;
    &:hover {
      background: none;
      cursor: pointer;
    }
  }
  .btn_box_group{
    text-align: center;
    margin: 30px 0 0;
    /deep/
    .cancel_btn{
      border: 1px solid #0070ff;
      color: #0070ff;
      border-radius: 4px;
      width: 124px;
      height: 40px;
      margin-left: 16px;
    }
    /deep/
    .ok_btn{
      width: 124px;
      height: 40px;
      background: #0070ff;
      border-radius: 4px;
      color: #fff;
      border: 1px solid #0070ff;
    }
  }
}
</style>
