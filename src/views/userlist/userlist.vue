<template>
  <div id="user-manager">
    <!-- <el-button  @click="goAddpage">test页面</el-button> -->

    <!-- 卡片视图区域 -->
    <el-card>
      <el-row class="user-list-row" :gutter="20">
        <el-col :span="7">
          <!-- 搜索与添加区域 -->
          <!-- <el-input placeholder="请输入内容" clearable>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input> -->
        </el-col>
        <el-col :span="4">
          <!-- 添加用户区域 -->
          <el-button type="primary" @click="adduserdialogFormVisible = true"
            >用户添加</el-button
          >
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
        <!-- <el-table-column fixed prop="modifiedTime" label="修改时间" width="150">
        </el-table-column> -->
        <el-table-column
          fixed
          prop="reallyname"
          label="用户真实姓名"
        >
        </el-table-column>
        <el-table-column prop="telephone" label="电话">
        </el-table-column>
        <el-table-column prop="username" label="账户名">
        </el-table-column>
        <el-table-column prop="roleName" label="角色名">
        </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{
              scope.row.createTinme | formatDate3
            }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="status" label="状态" width="60">
        </el-table-column> -->
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="small"
              @click="showEditDialog(scope.row.id)"
              >编辑</el-button
            >

            <el-button
              type="warning"
              icon="el-icon-delete"
              size="small"
              @click="removeUserById(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        class="pag"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="userpageform.currentPage"
        :page-sizes="[10, 20, 50]"
        :page-size="userpageform.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      >
      </el-pagination>
    </el-card>

    <!--修改用户的对话框  -->
    <!-- :visible.sync表示属性绑定，表示对话框的显示与隐藏 -->
    <el-dialog
      top="6vh"
      title="修改用户信息"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <el-form :model="editForm" ref="editFormRef" label-width="100px" size="medium">
        <!-- <el-form-item label="创建用户时间">
          <el-input v-model="editForm.createTinme" disabled></el-input>
        </el-form-item>
        <el-form-item label="修改用户时间">
          <el-input v-model="editForm.modifiedTime"></el-input>
        </el-form-item> -->
        <el-form-item label="用户密码">
          <el-input v-model="editForm.password" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户真实姓名">
          <el-input v-model="editForm.reallyname" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户角色名称">
          <el-input v-model="editForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="用户角色代号">
          <el-input v-model="editForm.rolePriority"></el-input>
        </el-form-item>
        <!-- <el-form-item label="用户状态">
          <el-input v-model="editForm.status"></el-input>
        </el-form-item> -->
        <el-form-item label="用户电话号码">
          <el-input v-model="editForm.telephone" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户账号名">
          <el-input v-model="editForm.username"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加用户对话框 -->
    <el-dialog
      top="6vh"
      title="添加用户信息"
      :visible.sync="adduserdialogFormVisible"
    >
      <el-form :model="userinsertform" size="medium" :rules="addRules">
        <!-- <el-form-item label="创建用户时间" :label-width="formLabelWidth">
          <el-input
            v-model="userinsertform.createTinme"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="修改用户时间" :label-width="formLabelWidth">
          <el-input
            v-model="userinsertform.modifiedTime"
            autocomplete="off"
          ></el-input>
        </el-form-item> -->
        <el-form-item label="用户账号名" :label-width="formLabelWidth">
          <el-input
            v-model="userinsertform.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户密码" :label-width="formLabelWidth">
          <el-input
            v-model="userinsertform.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户真实姓名" :label-width="formLabelWidth">
          <el-input
            v-model="userinsertform.reallyname"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户电话号码" :label-width="formLabelWidth" prop="telephone">
          <el-input
            v-model="userinsertform.telephone"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户角色名称" :label-width="formLabelWidth">
          <el-input
            v-model="userinsertform.roleName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户角色代号" :label-width="formLabelWidth">
          <el-input
            v-model="userinsertform.rolePriority"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="用户状态" :label-width="formLabelWidth">
          <el-input
            v-model="userinsertform.status"
            autocomplete="off"
          ></el-input>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="adduserdialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="useradd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { formatDate } from "@/common/date.js";
import {
  pageBatchQuery,
  useradd,
  userdelete,
  getInfo2,
  update,
} from "@/api/user";
export default {
  name: "userlist",
  data() {
    const validatePhone = (rule, value, cb) => {
      let regphone =
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (regphone.test(value)) {
        return cb();
      }
      cb(new Error("请输入合法的手机号"));
    };
    return {
      addRules: {
        telephone: [
          {
            validator: validatePhone,
            message: "请输入正确的手机号",
            trigger: "blur",
          },
        ],
      },
      // 当前时间
      nowTime: "",
      // 用户删除的form
      userdeleteform: { id: "" },
      // 用户新增的form
      userinsertform: {
        createTinme: "",
        modifiedTime: "",
        password: "",
        reallyname: "",
        roleName: "operator",
        rolePriority: 1,
        status: 1,
        telephone: "",
        username: "",
      },
      // 查询到的用户信息对象
      editForm: {
        createTinme: "",
        modifiedTime: "",
        password: "",
        reallyname: "",
        roleName: "",
        rolePriority: "",
        status: 1,
        telephone: "",
        username: "",
      },
      // 增加用户的对话框
      adduserdialogFormVisible: false,
      // 修改用户的对话框
      editDialogVisible: false,

      userlist: [],
      // 数据总数
      totalCount: 0,
      // 总页数
      totalPage: 0,
      userpageform: {
        currentPage: 1,
        orderColumns: "id",
        orderType: "DESC",
        pageSize: 10,
      },
      // 用户新增对话框中宽度
      formLabelWidth: "120px",
    };
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy年MM月dd日");
    },
    formatDate3(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
  },
  methods: {
    goAddpage() {
      console.log("进入函数");
      this.$router.push("/patient/testview");
    },
    handleClick(row) {
      console.log(row);
    },
    useradd() {
      this.nowTime = new Date().valueOf();
      this.userinsertform.createTinme = this.nowTime;
      this.userinsertform.modifiedTime = this.nowTime;
      useradd(this.userinsertform).then((response) => {
        console.log("userinsertform的response", response);
        // resolve();
        // console.log("response.data.respCode", response.data.respCode);
        if (response.data.respCode == "0000") {
          this.$message({
            message: "用户添加成功",
            type: "success",
          });
          this.adduserdialogFormVisible = false;
          this.getUserList();
        }
        this.userinsertform = {
          createTinme: "",
          modifiedTime: "",
          password: "",
          reallyname: "",
          roleName: "operator",
          rolePriority: 1,
          status: 1,
          telephone: "",
          username: "",
        };
      });
    },
    // 提交修改用户
    editUserInfo() {
      update(this.editForm).then((response) => {
        console.log("editUserInfo的response", response);
        if (response.data.respCode == "0000") {
          this.$message({
            message: "用户更新成功",
            type: "success",
          });
          this.editDialogVisible = false;
          this.getUserList();
        }
      });
    },
    // 监听pagesize改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      // 当用户选择当前页面显示几条，重新将条数返回给data,并重新从服务器渲染列表
      this.userpageform.pageSize = newSize;
      this.getUserList();
    },

    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      // console.log(newPage)
      // 当用户选择当前页面，重新将当前页面返回给data,并重新从服务器渲染列表
      this.userpageform.currentPage = newPage;
      this.getUserList();
    },

    // 根据id删除对应的用户信息
    async removeUserById(id) {
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        "此操作将永久删除该用户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => {
        return err;
      });
      // 如果用户确认删除，则返回值为字符串confirm
      // 如果用户取消删除，则返回值为字符串cancel
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除");
      }
      this.userdeleteform.id = id;
      console.log("userdeleteform的id", this.userdeleteform.id);
      userdelete(this.userdeleteform).then((response) => {
        console.log("userdeleteform的response", response);
        if (response.data.respCode == "0000") {
          this.getUserList();
          return this.$message.success("删除用户成功！");
        } else {
          this.$message.error("删除用户失败！");
        }
      });

      // 删除后更新列表
      this.getUserList();
    },

    // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },

    // 展示编辑用户的对话框
    async showEditDialog(id) {
      getInfo2(id).then((response) => {
        console.log("showEditDialog的getInfo2的response", response);
        this.editForm = response.data;
        this.nowTime = new Date().valueOf();
        this.editForm.modifiedTime = this.nowTime;
        console.log("this.editForm", this.editForm);
        this.editDialogVisible = true;
      });
    },

    getUserList() {
      pageBatchQuery(this.userpageform).then((response) => {
        console.log("userpageform的response", response);
        // resolve();
        // console.log("response.data.respCode", response.data.respCode);
        if (response.data.respCode == "0000") {
          // this.$message({
          //   message: "用户列表查询成功",
          //   type: "success",
          // });
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
.table_sty {
  margin-top: 40px;
}
.pag {
  margin-top: 20px;
}
.patient-list-row {
  margin-bottom: 15px;
}
</style>
