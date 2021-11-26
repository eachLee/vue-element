<!-- 登录 -->
<template>
  <div class="login-content">
    <div class="login-header">
      <svg-icon
        class-name="login-logo"
        icon-class="login-red"
      />
    </div>
    <div class="login">
      <div class="login-body">
        <el-form
          ref="loginForm"
          :rules="loginRules"
          :model="loginForm"
          label-width="25px"
          class="login-box"
        >
          <div class="overflow-title">
            <div class="overflow-black"></div>
          </div>
          <!-- <svg-icon
            class-name="apartment"
            icon-class="apartment"
          /> -->
          <div class="login-title">欢迎登录</div>
          <h4 class="login-edition">深圳A+MAX</h4>
          <el-form-item
            label="账号"
            prop="username"
            class="mb30"
          >
            <label slot="label">
              <svg-icon
                icon-class="user"
                class-name="svg-lable"
              />
            </label>
            <el-input
              type="text"
              placeholder="请输入账号"
              v-model="loginForm.username"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item
            label="密码"
            prop="password"
            class="mb30"
          >
            <label slot="label">
              <svg-icon
                icon-class="password"
                class-name="svg-lable"
              />
            </label>
            <el-input
              type="password"
              placeholder="请输入密码"
              v-model="loginForm.password"
            />
          </el-form-item>
          <!-- <div class="tips">{{loginError}}</div> -->
          <el-button
            class="h50"
            :loading="loading"
            type="primary"
            @click="login()"
          >{{loginInfo}}</el-button>
          <div class="edition-num">版本号 V2.0</div>
        </el-form>
      </div>
    </div>
    <div class="footer">Copyright © {{footerDate}} 中原集团 版权所有</div>
  </div>
</template>

<script>
export default {
  name: "LOGIN",
  data() {
    let validateusername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    let validatepassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: "123456"
      },
      loginRules: {
        username: [
          { required: false, trigger: "blur", validator: validateusername }
        ],
        password: [
          { required: false, trigger: "blur", validator: validatepassword }
        ]
      },
      loading: false,
      loginInfo: "登录",
      loginError: "",
      redirect: undefined,
      otherQuery: {},
      footerDate: new Date().getFullYear()
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true //其值是true或false；确认是否以当前的初始值执行handler的函数。
    }
  },
  methods: {
    login() {
      //点击登录方法
      this.$refs.loginForm.validate(value => {
        if (value) {
          this.loading = true;
          this.loginInfo = "登录中";
          this.$store
            .dispatch("Login", this.loginForm)
            .then(response => {
              if (response.token) {
                this.$router.push({
                  path: this.redirect || "/",
                  query: this.otherQuery
                });
                this.loading = false;
              } else {
                this.loading = false;
                this.loginInfo = "登录";
                this.loginError = "密码错误";
              }
            })
            .catch(() => {
              this.loading = false;
              this.loginInfo = "登录";
            });
        } else {
          return false;
        }
      });
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    }
  }
};
</script>

<style lang='scss' scoped>
  .svg-lable {
    font-size: 18px;
  }
  .login-header {
    width: 1000px;
    padding: 7px 0;
    margin: 0 auto;
    height: 60px;
    position: relative;
    overflow: hidden;
    .login-logo {
      width: 275px;
      height: 46px;
    }
  }
  .overflow-title {
    width: 110px;
    height: 44px;
    border-radius: 22px;
    background-color: #fff;
    position: absolute;
    top: -22px;
    left: 50%;
    transform: translateX(-50%);
    .overflow-black {
      width: 40px;
      height: 10px;
      background: #000;
      margin: 0 auto;
      border-radius: 20px;
      margin-top: 17px;
    }
  }
  ::v-deep .login {
    background: url("../../assets/images/loginBanner.png") no-repeat center 100%;
    background-color: #7a7e81;
    overflow: hidden;
    height: 89%;
    width: 100%;
    .login-body {
      height: 100%;
      position: relative;
      .el-form-item__label {
        text-align: left;
        padding: 0 7px 0 0;
      }
      .login-box {
        border-radius: 10px;
        position: absolute;
        right: 20%;
        top: 50%;
        transform: translateY(-50%);
        width: 360px;
        height: 420px;
        padding: 20px 30px;
        text-align: center;
        background-color: #ffffff;
        .el-input__inner {
          border: none;
        }
        .el-form-item {
          color: #acb0b9;
          border-bottom: 1px solid #f2f2f2;
        }
        .el-form-item__error {
          padding: 10px 0;
        }
        .edition-num {
          position: absolute;
          color: #c3c5ca;
          font-size: 14px;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }
  }

  .login-title {
    text-align: center;
    color: #333;
    font-size: 20px;
    line-height: 40px;
    font-weight: bold;
    margin: 18px 0 4px 0;
  }
  .login-edition {
    font-size: 16px;
    color: #acb0b9;
    margin: 0 auto 22px auto;
    font-weight: 400;
    line-height: 40px;
  }
  .tips {
    height: 20px;
    font-size: 12px;
    color: #e52020;
    text-align: left;
    padding-left: 50px;
  }
  .login .el-button {
    width: 100%;
  }
  .login-content {
    position: relative;
    height: 100%;
  }
  .footer {
    margin: 0 auto;
    width: 100%;
    background: #fff;
    height: 46px;
    text-align: center;
    line-height: 46px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    color: #999;
  }
  .mb30 {
    margin-bottom: 30px;
  }
  .h50 {
    height: 50px;
  }
</style>