<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" />
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <!-- 因为router-link的作用是单纯的路由跳转，
          会阻止click事件，如果不加 .native, 事件是不会触发的，因此需要加上 .native 才会触发事件 -->
          <el-dropdown-item @click.native="gomyinmomation">
            个人信息
          </el-dropdown-item>

          <!-- test -->
          <!-- <el-dropdown-item>
            <el-button @click="test1"> test </el-button>
          </el-dropdown-item> -->

          <!-- <a
            target="_blank"
            href="https://github.com/PanJiaChen/vue-admin-template/"
          >
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <a
            target="_blank"
            href="https://panjiachen.github.io/vue-element-admin-site/#/"
          >
            <el-dropdown-item>Docs</el-dropdown-item> -->
          <!-- </a> -->

          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">登出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
// import { pationinset } from "@/api/user";

export default {
  data() {
    return {
      // // 模拟test
      // Form: {
      //   birthday: "2022-05-13T11:25:37.409Z",
      //   createTinme: "2022-05-13T11:25:37.409Z",
      //   curMedicalRecord: "221",
      //   familyHistory: "1221",
      //   gender: 0,
      //   idCard: "1221",
      //   modifiedTime: "2022-05-13T11:25:37.409Z",
      //   pastHistory: "1221",
      //   patientName: "1221",
      //   personalHistory: "1122",
      //   status: 0,
      //   telephone: "122",
      // },
    };
  },
  components: {
    Breadcrumb,
    Hamburger,
  },
  computed: {
    ...mapGetters(["sidebar", "avatar"]),
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    gomyinmomation() {
      this.$router.push("/myinfomation");
    },
    // test1() {
    //   console.log("test1");
    //   pationinset(this.Form).then((response) => {
    //     console.log("test1的response", response);
    //     // resolve();
    //   });
    // },

    // logout() {
    //   await this.$store.dispatch("user/logout");
    //   this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    // },
    logout() {
      // 清空token
      var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
      if (keys) {
        for (var i = keys.length; i--; )
          document.cookie = keys[i] + "=0;expires=" + new Date(0).toUTCString();
      }

      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
