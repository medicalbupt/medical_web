<template>
  <div id="patient-manager">
    <el-card>
      <el-row class="patient-list-row" :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容">
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getPatientList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true"
            >患者录入</el-button
          >
        </el-col>
        <!-- <el-col :span="6">
          <el-select v-model="value" placeholder="排序方式">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col> -->
      </el-row>
      <!-- 展示患者信息 -->

      <el-table :data="patientData.patientList" border stripe>
        <el-table-column label="ID" width="60" prop="id"></el-table-column>
        <el-table-column
          prop="patientName"
          label="患者姓名"
          width="120"
        ></el-table-column>
        <el-table-column prop="gender" label="性别" width="60">
          <template slot-scope="scope">
            <span v-if="scope.row.gender == 0">男</span>
            <span v-if="scope.row.gender == 1">女</span>
          </template>
        </el-table-column>
        <el-table-column prop="birthday" label="出生日期" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.birthday | formatDate }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="telephone"
          label="手机号"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="curMedicalRecord"
          label="现病史"
          width="120"
        ></el-table-column>
        <!-- <el-table-column
          prop="createTinme"
          label="创建时间"
          width="150"
        ></el-table-column> -->
        <el-table-column prop="modifiedTime" label="修改时间" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.modifiedTime | formatDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="查看诊断信息" width="120">
          <template slot-scope="scope">
            <router-link
              :to="{
                name: 'patientmation',
                params: { index: scope.row.id, total: patientData.total },
              }"
            >
              <el-button type="text" size="small">详细信息</el-button>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="190">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="showpatientEditDialog(scope.row.id)"
              >编辑</el-button
            >

            <el-button
              type="warning"
              size="small"
              @click="removePatientById(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->

      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="queryInfo.currentPage"
        @size-change="handleSizeChange"
        :page-size="queryInfo.pageSize"
        :page-sizes="[5, 8, 10, 15]"
        layout="total,sizes, prev, pager, next, jumper"
        :total="this.patientData.total"
      >
      </el-pagination>
    </el-card>

    <!-- 显示弹框组件 -->
    <!-- <patient-info
      :dialogVisible="dialogVisible"
      :datalist="this.patientData.patientList"
      @changeDialog="changeDialog"
    /> -->
    <!-- <patient-info ref="dialog" /> -->
    <!-- 添加患者对话框 -->
    <el-dialog title="添加患者" :visible.sync="addDialogVisible" width="50%">
      <!-- @close="addDislogClosed" -->
      <!-- 内容主题区域 -->

      <el-form label-width="100px" ref="addFormRef" :model="addForm">
        <el-form-item label="患者姓名">
          <el-input v-model="addForm.patientName"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="addForm.gender" placeholder="请选择性别">
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker
            v-model="addForm.birthday"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="addForm.telephone"></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="addForm.idCard"></el-input>
        </el-form-item>
        <el-form-item label="现病史">
          <el-input
            v-model="addForm.curMedicalRecord"
            type="textarea"
          ></el-input>
        </el-form-item>
        <el-form-item label="既往史">
          <el-input v-model="addForm.pastHistory" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="个人史">
          <el-input
            v-model="addForm.personalHistory"
            type="textarea"
          ></el-input>
        </el-form-item>
        <el-form-item label="家族史">
          <el-input v-model="addForm.familyHistory" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="患者创建时间">
          <el-input v-model="addForm.createTinme"></el-input>
        </el-form-item>
        <el-form-item label="患者修改时间">
          <el-input v-model="addForm.modifiedTime"></el-input>
        </el-form-item>
        <el-form-item label="患者状态">
          <el-input v-model="addForm.status"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部按钮区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addPatient">确 定</el-button>
      </span>
    </el-dialog>

    <!-- <el-dialog
      title="详细信息"
      :visible.sync="editdialogVisible"
      width="70%" -->
    <!-- > -->
    <!-- 内容区域 -->
    <!-- <span>展示历次患者诊断信息</span> -->

    <!-- 弹框底部区域 -->
    <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="editdialogVisible = false">退出</el-button>
        <el-button type="primary" @click="addrepatient">添加复诊信息</el-button>
      </span>
    </el-dialog> -->

    <!--修改患者的对话框  -->
    <!-- :visible.sync表示属性绑定，表示对话框的显示与隐藏 -->
    <el-dialog
      top="6vh"
      title="修改患者信息"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <el-form :model="patinenteditform" ref="editFormRef" label-width="100px">
        <el-form-item label="患者ID">
          <el-input v-model="patinenteditform.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="patinenteditform.patientName" disabled></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="patinenteditform.gender" disabled></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="patinenteditform.idCard" disabled></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="patinenteditform.telephone"></el-input>
        </el-form-item>
        <el-form-item label="现病史">
          <el-input v-model="patinenteditform.curMedicalRecord"></el-input>
        </el-form-item>
        <el-form-item label="家族史">
          <el-input v-model="patinenteditform.familyHistory"></el-input>
        </el-form-item>
        <el-form-item label="既往史">
          <el-input v-model="patinenteditform.pastHistory"></el-input>
        </el-form-item>
        <el-form-item label="个人史">
          <el-input v-model="patinenteditform.personalHistory"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editPatientSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { formatDate } from "@/common/date.js";
// import patientInfo from "./patientInfo.vue";
import {
  addPatient,
  getPatientList,
  patientDelete,
  patientUpdate,
} from "@/api/patient";

export default {
  // components: {
  //   patientInfo,
  // },
  name: "patient",
  data() {
    return {
      // editdialogVisible: false,
      dialogVisible: false,
      addDialogVisible: false,
      // 获取用户列表的参数对象
      queryInfo: {
        // 搜索值
        searchParm: "",
        //排序依据字段
        orderColumns: "id",
        orderType: "DESC",
        // 当前的页数
        currentPage: 1,
        // 当前每次显示多少条数据
        pageSize: 5,
      },
      // 存放用户的数据和数量
      patientData: {
        patientList: [],
        total: 0,
      },

      options: [
        {
          value: "选项1",
          label: "初次就诊时间",
        },
        {
          value: "选项2",
          label: "末次就诊时间",
        },
        {
          value: "选项3",
          label: "病种分类",
        },
      ],
      value: "",
      // 添加用户数据的对象
      addForm: {
        birthday: "",
        createTinme: "",
        curMedicalRecord: "",
        familyHistory: "",
        gender: "",
        idCard: "",
        modifiedTime: "",
        pastHistory: "",
        patientName: "",
        personalHistory: "",
        status: "",
        telephone: "",
      },
    };
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy年MM月dd日");
    },
  },
  created() {
    this.getPatientList();
  },
  methods: {
    // 添加复诊信息事件
    addrepatient() {},
    getPatientList() {
      // const { data: res } = await this.$http.get('users', {
      //   params: this.queryInfo
      // })
      getPatientList(this.queryInfo).then((res) => {
        console.log("获取患者列表", res.data);
        if (res.data.respCode == "0000") {
          this.$message({
            message: "患者列表查询成功",
            type: "success",
          });
        }
        this.patientData.patientList = res.data.patientPoolEntities;
        this.patientData.total = res.data.totalCount;
        console.log("总数", this.patientData.total);
        // this.patientData.totalPage = res.data.totalPage;
        // console.log("总页数", this.patientData.totalPage);
      });

      // if (res.meta.status !== 200) {
      //   this.$message.error('获取用户列表失败!')
      // }
      // this.$message.success('获取用户列表成功!')
      // this.userData.userList = res.data.users
      // this.userData.total = res.data.total
      // console.log(res)
    },
    // 监听 pagesize 改变事件 每页显示的个数
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.pageSize = newSize;
      this.getPatientList();
    },
    // 监听 页码值 改变的事件 当前页面值
    handleCurrentChange(newPage) {
      console.log(newPage);
      this.queryInfo.currentPage = newPage;
      console.log(`当前页: ${newPage}`);
      this.getPatientList();
    },
    /**
     * 显示患者详细信息
     */
    showInfo() {
      this.dialogVisible = true;
    },
    changeDialog() {
      this.dialogVisible = false;
    },
    // Addpatient() {
    //   this.$router.push("patient/add");
    // },
    // 点击按钮,添加新患者
    addPatient() {
      // this.$refs.addFormRef.validate(async (valid) => {
      // console.log(valid);
      // if (!valid) return;
      // 可以发起添加用户请求
      // this.$store.dispatch("user/login", this.loginForm)
      console.log("获取输入的信息", this.addForm);
      addPatient(this.addForm).then((res) => {
        console.log("添加实现", res);
      });
      // login({ username: username.trim(), password: password ,strCode:strCode,
      //   sessionId:sessionId}).then(response => {
      // const { data: res } = await this.$request.post(
      //   "/patient/insert",
      //   this.addForm
      // );
      // if (res.meta.status !== 201) {
      //   return this.$message.error("用户添加失败了~");
      // }
      // 隐藏添加用户的对话框
      this.addDialogVisible = false;
      // 添加成后重新获取用户数据,不需要用户手动刷新
      this.getPatientList();
      //清空表单数据
      this.addForm = "";
      return this.$message.success("用户添加成功了~");
      // }
    },
    // addDislogClosed() {
    //   this.$refs.addFormRef.resetFields();
    // },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  height: 100%;
  width: 100%;
  background-color: #142442;
  // 让div充满整个屏幕
  position: fixed;
}

.info-container {
  position: relative;
  margin-left: 20px;
  height: 150px;
  line-height: 200px;
  .display_name {
    font-size: 48px;
    line-height: 48px;
    color: #ffffff;
    position: absolute;
    top: 25px;
  }
}
.patient-list-row {
  margin-bottom: 30px;
}
</style>
