<template>
  <div id="UserLogin">
    <el-form class="login-form"
             status-icon
             :rules="loginRules"
             ref="loginForm"
             :model="loginForm"
             label-width="0">
      <!--用户名-->
      <el-form-item prop="username">
        <el-input class="view-input"
                  @keyup.enter.native="handleLogin"
                  v-model="loginForm.username"
                  auto-complete="off"
                  placeholder="请输入用户名">
          <i slot="prefix"
             class="icon-yonghu"></i>
          <div slot="prefix"
               class="d-split"></div>
        </el-input>
      </el-form-item>
      <!--密码-->
      <el-form-item prop="password">
        <el-input class="view-input"
                  @keyup.enter.native="handleLogin"
                  :type="passwordType"
                  v-model="loginForm.password"
                  auto-complete="off"
                  placeholder="请输入密码">
          <i class="el-icon-view el-input__icon"
             slot="suffix"
             @click="showPassword"></i>
          <i slot="prefix"
             class="icon-mima"></i>
          <div slot="prefix"
               class="d-split"></div>
        </el-input>
      </el-form-item>

      <!--验证码模块-->
      <div class="code_info"
           v-show="count >= 3">
        <el-form-item prop="code">
          <div class="code-list">
            <el-input class="view-input view-code"
                      maxlength="8"
                      @keyup.enter.native="handleLogin"
                      v-model="loginForm.code"
                      auto-complete="off"
                      placeholder="请输入图形验证码">
              <!-- <i slot="prefix"
                 class="icon-yanzhengma"></i>
              <div slot="prefix"
                   class="d-split"></div>-->
            </el-input>
            <!--验证码组件-->
            <div class="code"
                 @click="refreshCode">
              <s-identify :identifyCode="identifyCode"
                          :contentHeight="contentHeight">
              </s-identify>
            </div>
          </div>
        </el-form-item>

        <div class="code_p3_error">
          <span class="p3_error">
            <i class="el-icon-warning"></i>
            <span class="p3_error_title">用户名密码输入错误超过三次。</span>
          </span>
        </div>
      </div>

      <!--登录按钮-->
      <el-form-item>
        <el-button type="primary"
                   @click.native.prevent="handleLogin"
                   class="login-submit">登录</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script type="text/ecmascript-6">
import SIdentify from './Identify';
import { isvalidUsername, isvalidPassword } from '@/assets/js/validate'
export default {
  name: 'UserLogin',
  data () {
    return {
      count: 0,
      contentHeight: 54,
      loginForm: {
        username: '',  //admin
        password: '' //Hoohoolab*123
        //password: '!@#QWEasd123'
      },
      code: '',
      identifyCodes: '1234567890',
      identifyCode: '',
      loginRules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { required: true, message: ' ', trigger: 'change' },
          /*{ min: 2, max: 16, message: '用户名长度为2~16个字符', trigger: 'blur' },*/
          /*{ required: true, trigger: 'blur', validator: validateUsername }*/
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { required: true, message: ' ', trigger: 'change' },
          /*{ min: 6, message: '密码长度最少为6位', trigger: 'blur' },*/
          /*{ required: true, trigger: 'blur', validator: validatePassword }*/
        ]
      },
      passwordType: 'password'
    }
  },
  created () {
    this.setHeight();
    // if (window.sessionStorage.getItem('overtime')) {
    //   this.$message.warning('连接超时，请重新登录');
    //   // Connection timed out,Please login again.
    //   window.sessionStorage.removeItem('overtime');
    // }
  },
  mounted () {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
    //console.log('111111');

  },
  methods: {
    setHeight () {
      let width = document.body.clientWidth;
      let height = (54 * width / 1920).toFixed(0);
      this.contentHeight = height;
    },
    randomNum (min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode () {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode (o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
    },
    showPassword () {
      this.passwordType === '' ?
        (this.passwordType = 'password') :
        (this.passwordType = '');
    },
    handleLogin () {
      if (this.count > 2) {
        const validateCode = (rule, value, callback) => {
          if (this.identifyCode !== value) {
            this.code = '';
            this.identifyCode = '';
            this.makeCode(this.identifyCodes, 4);
            callback(new Error('验证码不正确，请重新输入。'))
          } else {
            callback()
          }
        }
        let codeValidate = [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '验证码长度为4位', trigger: 'blur' },
          { required: true, validator: validateCode, trigger: 'blur' }
        ]
        this.$set(this.loginRules, 'code', codeValidate);
      }

      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$store.dispatch('LoginByUsername', this.loginForm)
            .then((resp) => {
              //返回成功跳转
              console.log(resp);

              if (resp[0]) {
                this.$message.success('登录成功');
                this.$router.push('/', () => { });//登录成功之后重定向到首页
                setTimeout(() => {
                  this.count = 0;
                }, 1000)
                //失败
              } else {
                // resp.data.msg[Object.keys(response.data.msg)[0]][0],
                this.$message.error(resp[1]);
                this.count++;
                //this.loginForm = {username: '', password: ''};
              }
            }).catch(err => {
              this.$message.error(err); //登录失败提示错误
            });
        }
      })
    }
  },
  components: {
    SIdentify
  }
}
</script>
<style scoped lang="less">
#UserLogin {
  /deep/ .el-form {
    .el-form-item {
      margin-bottom: 30px;
      .el-form-item__content {
        line-height: 1;
        .view-input {
          position: relative;
          .el-input__inner {
            border: 2px solid rgba(255, 255, 255, 0.48);
            background-color: transparent;
            color: #bbbbbb;
            height: 54px;
            width: 360px;
            padding-left: 45px;
          }
          .d-split {
            position: absolute;
            top: 17px;
            left: 30px;
            height: 20px;
            width: 2px;
            background: #bbb;
          }
          .el-input__prefix {
            i {
              display: block;
              height: 54px;
              width: 25px;
              text-align: center;
              -webkit-transition: all 0.3s;
              transition: all 0.3s;
              background-position: 4px 18px;
              background-repeat: no-repeat;
              background-size: 16px;
            }
            i.icon-yonghu {
              background-image: url('../../../assets/images/login/username.png');
            }
            i.icon-mima {
              background-image: url('../../../assets/images/login/password.png');
            }
            i.icon-yanzhengma {
              background-image: url('../../../assets/images/login/password.png');
            }
          }
        }
        .code-list {
          display: flex;
          height: 54px;
          width: 360px;
          /deep/ .view-code {
            flex: 1;
            text-align: left;
            .el-input__inner {
              width: 210px;
              padding-left: 15px;
            }
          }
          .s-canvas {
            padding-left: 20px;
            height: 54px !important;
          }
        }
        .login-submit {
          background: #0070ff;
          width: 100%;
          border-color: #0070ff;
          margin: 20px 0 0;
          height: 54px;
        }
      }
    }
    .code_info {
      height: 120px;
    }
    .code_p3_error {
      text-align: right;
      margin-top: 18px;
      .p3_error {
        text-align: right;
        font-family: PingFang;
        font-size: 14px;
        /deep/ .el-icon-warning {
          color: #ff3a36;
        }
        .p3_error_title {
          text-align: right;
          color: #fff;
        }
        .p3_tips {
          text-align: right;
          color: #ff3a36;
          cursor: pointer;
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
