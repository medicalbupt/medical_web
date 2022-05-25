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
      <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="活动名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false"
            >确 定</el-button
          >
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
      {{ userCreateTime }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-time"></i>
        修改时间
      </template>
      {{ userModifyTime }}
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
import store from "@/store";
import { getInfo2 } from "@/api/user";

export default {
  data() {
    return {
      id: store.getters.userId,
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
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "120px",
    };
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