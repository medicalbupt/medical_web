<template>
  <div class="app-container">
    <!-- <el-button  @click="goAddpage">test页面</el-button> -->

    <!-- 卡片视图区域 -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="7">
          <!-- 搜索与添加区域 -->
          <!-- <el-input placeholder="请输入内容" clearable>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input> -->
        </el-col>
        <el-col :span="4">
          <!-- 添加用户区域 -->
          <el-button type="primary" @click="dialogFormVisible = true"
            >用户添加</el-button
          >

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
        </el-col>
      </el-row>
      <!-- 用户列表 -->
      <el-table
        class="table_sty"
        :data="userlist"
        border
        stripe
        style="width: 100%"
      >
        <el-table-column fixed prop="id" label="ID" width="90">
        </el-table-column>
        <el-table-column fixed prop="createTinme" label="创建时间" width="150">
        </el-table-column>
        <el-table-column fixed prop="modifiedTime" label="修改时间" width="150">
        </el-table-column>
        <el-table-column prop="reallyname" label="用户姓名" width="150">
        </el-table-column>
        <el-table-column prop="telephone" label="电话" width="150">
        </el-table-column>
        <el-table-column prop="username" label="账户名" width="150">
        </el-table-column>
        <el-table-column prop="roleName" label="角色名" width="150">
        </el-table-column>
        <el-table-column prop="status" label="状态" width="120">
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template>
            <el-button
              type="text"
              size="small"
              @click="dialogFormVisible = true"
              >编辑</el-button
            >
            <!-- 编辑Form -->
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { pageBatchQuery } from "@/api/user";
export default {
  name: "userlist",
  data() {
    return {
      // 用户新增的form
      userinsertform: {
        createTinme: "2022-05-20T09:12:12.438Z",
        modifiedTime: "2022-05-20T09:12:12.438Z",
        password: "string",
        reallyname: "string",
        roleName: "string",
        rolePriority: 1,
        status: 1,
        telephone: "string",
        username: "string",
      },
      dialogFormVisible: false,
      userlist: [],
      // 数据总数
      totalCount: 0,
      // 总页数
      totalPage: 0,
      userpageform: {
        currentPage: 1,
        orderColumns: "id",
        orderType: "ASC",
        pageSize: 8,
      },
      // 用户新增对话框中宽度
      formLabelWidth: '120px'
    };
  },
  methods: {
    goAddpage() {
      console.log("进入函数");
      this.$router.push("/patient/testview");
    },
    handleClick(row) {
      console.log(row);
    },
    useradd() {},
    getUserList() {
      pageBatchQuery(this.userpageform).then((response) => {
        console.log("userpageform的response", response);
        // resolve();
        // console.log("response.data.respCode", response.data.respCode);
        if (response.data.respCode == "0000") {
          this.$message({
            message: "用户列表查询成功",
            type: "success",
          });
          this.userlist = response.data.userEntities;
          console.log("userlist", this.userlist);
          this.totalCount = response.data.totalCount;
          this.totalPage = response.data.totalPage;
        }
      });
    },
  },
  created() {
    this.getUserList();
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
