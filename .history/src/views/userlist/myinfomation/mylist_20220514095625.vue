<template>
  <el-descriptions
    class="margin-top"
    title="个人信息"
    direction="vertical"
    :column="3"
    border
  >
    <template slot="extra">
      <el-button type="primary" size="small">操作</el-button>
    </template>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-user"></i>
        用户姓名
      </template>
      san
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
        2022-04-19 17:38:32
      </template>
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-time"></i>
        修改时间
      </template>
      修改时间
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
        <i class="el-icon-office-building"></i>
        联系地址
      </template>
      江苏省苏州市吴中区吴中大道 1188 号
    </el-descriptions-item>
  </el-descriptions>
</template>
<script>
import store from "@/store/index";
export default {
  data() {
    return {
      myinfomationForm: {
        name: "",
        password: "123456",
        strCode: "",
        sessionId: "",
      },
    };
  },
};
</script>
<style scss="">
.margin-top {
  margin: 35px;
}
</style>