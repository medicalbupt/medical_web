<template>
  <div class="app-container">
    <!-- <el-button  @click="goAddpage">test页面</el-button> -->

    <!-- 卡片视图区域 -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="7">
          <!-- 搜索与添加区域 -->
          <el-input placeholder="请输入内容" clearable>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <!-- 添加用户区域 -->
          <el-button type="primary">用户添加</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表 -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="date" label="日期" width="150">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="province" label="省份" width="120">
        </el-table-column>
        <el-table-column prop="city" label="市区" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址" width="300">
        </el-table-column>
        <el-table-column prop="zip" label="邮编" width="120"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >查看</el-button
            >
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "userlist",
  data() {
    return {};
  },
  methods: {
    goAddpage() {
      console.log("进入函数");
      this.$router.push("/patient/testview");
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  height: 100%;
  width: 100%;
  background-color: #fff;
  // 让div充满整个屏幕
  position: fixed;
}

.table_sty {
  margin-top: 40px;
}
</style>
