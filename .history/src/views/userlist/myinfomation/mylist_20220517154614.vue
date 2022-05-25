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
        >修改</el-button
      >

      <!-- Form -->
      <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="活动名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="活动区域" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
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
      reallyname
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-mobile-phone"></i>
        手机号
      </template>
      18501300373
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-star-on"></i>
        用户id
      </template>
      0
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-time"></i>
        创建时间
      </template>
      2022-04-19 17:38:32
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-time"></i>
        修改时间
      </template>
      2022-04-19 17:38:32
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-s-check"></i>
        角色
      </template>
      <el-tag size="small">管理员</el-tag>
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-s-custom"></i>
        账号名
      </template>
      18501300373
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-s-flag"></i>
        状态
      </template>
      <el-tag size="small">1</el-tag>
    </el-descriptions-item>
  </el-descriptions>
</template>
<script>
import store from "@/store";
import { getInfo2 } from "@/api/user";

export default {
  data() {
    return {
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
  beforeMount() {
    const id = 1;
    console.log("mylist的store的id", id);
    getInfo2(id).then((response) => {
      // console.log("getInfo2的response", response);
      const data = response.data;
      console.log("data", data);
      reallyname = data.reallyname;
      telephone = data.telephone;
      userId = data.id;
      userCreateTime = data.createTinme;
      userModifyTime = data.modifiedTime;
      userRole = data.roleName;
      username = data.username;
      userstatus = data.status;
    });
  },
};
</script>
<style scss="">
.margin-top {
  margin: 35px;
}
</style>