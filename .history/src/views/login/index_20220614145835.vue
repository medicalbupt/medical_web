<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">XXX医疗管理系统</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>

      <el-form-item prop="strCode">
        <el-row :gutter="20">
          <el-col :span="16" :offset="0">
            <el-input
              v-model="loginForm.strCode"
              placeholder="请输入验证码"
            ></el-input>
          </el-col>
          <el-col :span="8" :offset="0">
            <img :src="imgUrl" class="imgse" />
          </el-col>
        </el-row>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
        >登录</el-button
      >
    </el-form>
    <!-- <video
      :style="fixStyle"
      autoplay
      loop
      muted
      class="fillWidth"
      v-on:canplay="canplay"
    >
      <source src="@/assets/sea.mp4" type="video/mp4" />
   </video>  -->
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";
import axios from "axios";

export default {
  name: "Login",
  data() {
    const validatePhone = (rule, value, cb) => {
      let regphone =
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (regphone.test(value)) {
        return cb();
      }
      cb(new Error("请输入合法的用户名（手机号）"));
    };
    return {
      // vedioCanPlay: false,
      // fixStyle: "",
      imgUrl: "",
      loginForm: {
        username: "18501300373",
        password: "123456",
        strCode: "",
        sessionId: "",
      },
      loginRules: {
        username: [
          { required: true, message: "请输入登录用户名", trigger: "blur" },
          {
            validator: validatePhone,
            message: "请输入正确的用户名（手机号）",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "长度在 3 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  created() {
    axios
      .get("user/getSessionId")
      .then((res) => res.data)
      .then((data) => {
        console.log("sessionIddata", data);
        this.loginForm.sessionId = data.sessionId;
        this.imgUrl = "user/getAuthCode?sessionId=" + this.loginForm.sessionId;
        console.log("session", this.loginForm.sessionId);
      });
  },
  // mounted() {
  //   window.onresize = () => {
  //     const windowWidth = document.body.clientWidth;
  //     const windowHeight = document.body.clientHeight;
  //     const windowAspectRatio = windowHeight / windowWidth;
  //     let videoWidth;
  //     let videoHeight;
  //     if (windowAspectRatio < 0.5625) {
  //       videoWidth = windowWidth;
  //       videoHeight = videoWidth * 0.5625;
  //       this.fixStyle = {
  //         height: windowWidth * 0.5625 + "px",
  //         width: windowWidth + "px",
  //         "margin-bottom": (windowHeight - videoHeight) / 2 + "px",
  //         "margin-left": "initial",
  //       };
  //     } else {
  //       videoHeight = windowHeight;
  //       videoWidth = videoHeight / 0.5625;
  //       this.fixStyle = {
  //         height: windowHeight + "px",
  //         width: windowHeight / 0.5625 + "px",
  //         "margin-left": (windowWidth - videoWidth) / 2 + "px",
  //         "margin-bottom": "initial",
  //       };
  //     }
  //   };
  //   window.onresize();
  // },
  methods: {
    // canplay() {
    //   this.vedioCanPlay = true;
    // },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              // .push({ path: "/" });
              this.$router.push({
                path: "/",
              });
              console.log("this.$router");

              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  background-image: url("./os.jpg");

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
.imgse {
  width: 110px;
  height: 40px;
  margin-right: 0px;
}
// .fillWidth {
//   width: 100%;
//   height: 100%;
// }

// .video-container {
//   position: relative;
//   height: 100vh;
//   overflow: hidden;
// }

// .video-container .poster img {
//   z-index: 0;
//   position: absolute;
// }

// .video-container .filter {
//   z-index: 1;
//   position: absolute;
//   /*background: rgba(0, 0, 0, 0.4);*/
//   width: 100%;
// }
</style>
