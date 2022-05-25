<template>
  <div class="app-container">
    <el-button  @click="goAddpage">test页面</el-button>

 <!-- 卡片视图区域 -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="7">
          <!-- 搜索与添加区域 -->
          <el-input placeholder="请输入内容" clearable >
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <!-- 添加用户区域 -->
          <el-button type="primary" >用户添加</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表 -->
      <el-table class="table_sty" stripe style="width: 100%" border>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="性别"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column label="状态">
          <template >
            <el-switch  active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template >
            <!-- 修改按钮 -->
            <el-button type="primary" icon="el-icon-edit" size="mini" ></el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            <!-- 分配角色按钮 -->
            <el-tooltip effect="dark" content="分配角色" placement="top" >
              <el-button type="warning" icon="el-icon-setting" size="mini" ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        @size-change="handleSizeChange"
        :page-size="queryInfo.pagesize"
        :page-sizes="[5, 9, 13, 15]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="userData.total"
      >
      </el-pagination> -->
    </el-card>

  </div>
</template>

<script>
export default {
    name: 'userlist',
  data() {
    return {
    };
  },
  methods: {
    goAddpage() {
      console.log("进入函数")
      this.$router.push('/patient/testview')
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-container{
    height: 100%;
    width: 100%;
    background-color: #FFF;
    // 让div充满整个屏幕
    position: fixed;
  }

  .table_sty{
    margin-top: 40px;
  }

</style>
