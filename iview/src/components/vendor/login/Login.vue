<template>
  <div id="Login"
       class="login-container"
       v-cloak>
    <div class="logo">
      <img class="l_product_logo"
           src="@/assets/images/login/logo01.png"
           alt="logo" />
    </div>
    <p class="login-copyright">
      ©2020虎特信息科技（上海）有限公司 版权所有
    </p>
    <div class="login-box">
      <div class="border-line"></div>
      <div class="login-main">
        <div class="l-container">
          <img class="l-container_img"
               src="static/image/logo.png"
               alt="logo" />
        </div>
        <!-- src="@/assets/images/login/logo.png" -->

        <h2 class="l-title">{{name}}</h2>
        <User v-if="stu"></User>
        <Register v-if="!stu"></Register>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import User from './User'
import Register from './Register'
export default {
  name: 'Login',
  data () {
    return {
      name: 'iView 安全感知系统',
      activeName: 'user',
      stu: true
    }
  },
  components: { User, Register },
  created () {
    this.register();
  },
  methods: {
    register () {
      this.$axios.post('/yiiapi/site/login')
        .then(resp => {

          console.log(resp)

          let { status, msg } = resp;

          if (status == 203) {
            this.stu = false;
          } else {
            this.stu = true;
          }
        }).catch(error => {
          console.log(error);
        })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
#Login {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background: rgba(0, 0, 0, 0.2);
  position: fixed;
  height: 100%;
  width: 100%;
  padding: 0 240px;
  &:before {
    z-index: -999;
    content: '';
    position: absolute;
    display: block;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: url('../../../assets/images/login/login1.png');
    background-repeat: no-repeat;
    background-size: cover;
  }
  .logo {
    position: absolute;
    top: 50px;
    left: 50px;
    .l_product_logo {
      vertical-align: middle;
      width: 108px;
      height: 80px;
    }
  }
  .login-copyright {
    text-align: center;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 50px;
    line-height: 30px;
    font-size: 16px;
    color: #ffffff;
    font-weight: normal;
    width: 100%;
    font-family: PingFangSC-Regular;
  }
  .login-box {
    display: flex;
    flex-direction: column;
    text-align: center;
    .border-line {
      height: 6px;
      width: 100%;
      background-color: #0070ff;
    }
    .login-main {
      justify-content: center;
      padding: 25px 60px 18px;
      background-color: rgba(79, 135, 255, 0.48);
      .l-container {
        width: 100%;
        height: auto;
        margin: auto;
        .l-container_img {
          width: 108px;
          height: 108px;
          vertical-align: middle;
        }
      }
      .l-title {
        margin: 20px 0 40px;
        text-align: center;
        font-family: PingFangSC-Semibold;
        font-size: 28px;
        color: #ffffff;
      }
    }
  }
}

.login-code {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 0 0 10px;
}
.login-code-img {
  margin-top: 2px;
  width: 100px;
  height: 32px;
  background-color: #fdfdfd;
  border: 1px solid #f0f0f0;
  color: #333;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 5px;
  line-height: 32px;
  text-indent: 5px;
  text-align: center;
}
</style>
