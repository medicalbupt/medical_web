<template>
  <el-descriptions
    class="margin-top"
    title="个人信息"
    direction="vertical"
    :column="3"
    border
  >
    <template slot="extra">
      <el-button type="text" @click="dialogFormVisible = true" size="small"
        >修改密码</el-button
      >

      <!-- Form -->
      <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="填写新密码" :label-width="formLabelWidth">
            <el-input v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="modifypassword">提交</el-button>
        </div>
      </el-dialog>
    </template>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-user"></i>
        用户姓名
      </template>
      {{ reallyname }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-mobile-phone"></i>
        手机号
      </template>
      {{ telephone }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-star-on"></i>
        用户id
      </template>
      {{ userId }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-time"></i>
        创建时间
      </template>
      {{ userCreateTime | formatDate3 }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-time"></i>
        修改时间
      </template>
      {{ userModifyTime | formatDate3 }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-s-check"></i>
        角色
      </template>
      <el-tag size="small">{{ userRole }}</el-tag>
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-s-custom"></i>
        账号名
      </template>
      {{ username }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-s-flag"></i>
        状态
      </template>
      <el-tag size="small">{{ userstatus }}</el-tag>
    </el-descriptions-item>
  </el-descriptions>
</template>
<script>
import { formatDate } from "@/common/date.js";
import store from "@/store";
import { getInfo2, modifyPassword } from "@/api/user";

export default {
  data() {
    return {
      dialogFormVisible: false,
      id: sessionStorage.getItem("userid"),
      dialogFormVisible: false,
      reallyname: "",
      userId: "",
      userCreateTime: "",
      userModifyTime: "",
      userRole: "",
      userstatus: "",
      username: "",
      telephone: "",

      form: {
        id: "",
        password: "",
      },
      formLabelWidth: "120px",
    };
  },
  filters: {
    formatDate3(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
  },
  created() {
    this.getUserinfo();
  },
  methods: {
    getUserinfo() {
      console.log("mylist的store的id", this.id);
      getInfo2(this.id).then((response) => {
        // console.log("getInfo2的response", response);
        const data = response.data;
        console.log("data", data);
        this.reallyname = data.reallyname;
        this.telephone = data.telephone;
        this.userId = data.id;
        this.userCreateTime = data.createTinme;
        this.userModifyTime = data.modifiedTime;
        this.userRole = data.roleName;
        this.username = data.username;
        this.userstatus = data.status;
        this.form.id = data.id;
      });
    },
    modifypassword() {
      // console.log("this.form", this.form);
      modifyPassword(this.form).then((response) => {
        console.log("modifypassword的response", response);
        // resolve();
        // console.log("response.data.respCode", response.data.respCode);
        if (response.data.respCode == "0000") {
          this.$message({
            message: "修改密码成功",
            type: "success",
          });
        }
        form.password = "";
      });
    },
  },
};
</script>
<style scss="">
.margin-top {
  margin: 35px;
}
</style>