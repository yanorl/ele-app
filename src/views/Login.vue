<template>
  <div class="login-box">
  	<div class="logo-box">
  	<img src="../assets/logo.jpg" alt="logo">
  	</div>
  	<input-group type="number" v-model="phone" placeholder="请输入手机号码" :btnTitle="btnTitle" :disabled="disabled" :error="errors.phone" @btnClick="getVerifyCode"/>
  	<input-group type="number" v-model="verifyCode" placeholder="验证码" :error="errors.code" />
  	<!-- 用户服务协议 -->
    <div class="login-des">
      <p>
        新用户登录即自动注册，表示已同意
        <span>《用户服务协议》</span>
      </p>
    </div>
    <!-- 登录按钮 -->
    <div class="login-btn">
      <button :disabled="isClick" @click="handleLogin">登录</button>
    </div>
  </div>
</template>

<script>
import InputGroup from '../components/InputGroup/InputGroup'
import { PostSms, GetSms } from '../api/login'

const BTNTITLE = '获取验证码'

export default {
    name: "login",
    data() {
        return {
            phone: "",
            verifyCode: "",
            errors: {},
            btnTitle: BTNTITLE,
            disabled: false
        }
    },
    components: {
      InputGroup
    },
    computed: {
      isClick() {
        if (!this.phone || !this.verifyCode) {
          return true
        } else {
          return false
        }
      }
    },
    methods: {
      getVerifyCode() {
        if (this.validatePhone()) {
          this.validateBtn()
          this._PostSms()
        }
      },
      validatePhone() {
        if (!this.phone) {
          this.errors= {
            phone: "手机号码不能为空"
          }
          return false
        } else if (!/^[1]([3-9])[0-9]{9}$/.test(this.phone)) {
          this.errors = {
            phone: "请填写正确的手机号码"
          }
          return false
        } else{
          this.errors = {}
          return true
        }
      },
      validateBtn() {
        let time = 60
        let timer = setInterval(() => {
          if (time === 0) {
            clearInterval(timer)
            this.btnTitle = BTNTITLE
            this.disabled = false
          } else {
            this.btnTitle = `${time} 秒后重试`
            this.disabled = true
            time--
          }
        }, 1000)
      },
      handleLogin() {
        this.errors = {}
        this._GetSms()

      },
      _PostSms() {
        PostSms({phone: this.phone}).then((res) => {
          console.log(res)
        })
      },
      _GetSms() {
        GetSms({
          phone: this.phone,
          code: this.verifyCode
        })
        .then(res => {
          console.log(res)
          localStorage.setItem('ele_login', true)
          this.$router.push("/")
        })
        .catch(err => {
          this.errors = {
            code:err.response.data.msg
          }
        })
      }
    }
}
</script>

<style>
.login-box{
	width: 100%;
	height: 100%;
	padding: 30px;
	box-sizing: border-box;
	background: #fff;
}
.logo-box{
	text-align: center;
}
.logo-box img{
	width: 150px;
}
.input-box,
.login-des,
.login-btn {
  margin-top: 20px;
}
.login-des {
  color: #aaa;
  line-height: 22px;
}
.login-des span {
  color: #4d90fe;
}
.login-btn button {
  width: 100%;
  height: 40px;
  background-color: #48ca38;
  border-radius: 4px;
  color: white;
  font-size: 14px;
  border: none;
  outline: none;
}
.login-btn button[disabled] {
  background-color: #8bda81;
}
</style>