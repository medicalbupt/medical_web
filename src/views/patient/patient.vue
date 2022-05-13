<template>
  <div id="patient-manager">
    <el-card>
      <el-row class="patient-list-row" :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <!-- <el-button type="primary" @click="Addpatient">患者录入</el-button> -->
          <el-button type="primary" @click="addDialogVisible = true"
            >患者录入</el-button
          >
        </el-col>
        <el-col :span="6">
          <el-select v-model="value" placeholder="排序方式">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-table :data="patientList" style="width: 100%">
        <el-table-column prop="id" label="ID" width="180"> </el-table-column>
        <el-table-column
          prop="patient_name"
          label="患者姓名"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="gender"
          label="性别"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="disease"
          label="病种分类"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="first_visit_time"
          label="初次就诊时间"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="last_visit_time"
          label="末次就诊时间"
          width="180"
        ></el-table-column>
        <el-table-column label="编辑" width="100">
          <template>
            <el-button type="text" size="small" @click="showInfo"
              >详细信息</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 显示弹框组件 -->
    <patient-info :dialogVisible="dialogVisible" @changeDialog="changeDialog" />
    <!-- 添加患者对话框 -->
    <el-dialog title="添加患者" :visible.sync="addDialogVisible" width="50%">
      <!-- 内容主题区域 -->
      <el-button></el-button>
      <!-- 底部按钮区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addPatient">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import patientInfo from "./patientInfo.vue";
export default {
  components: {
    patientInfo,
  },
  name: "patient",
  data() {
    return {
      dialogVisible: false,
      addDialogVisible: false,
      patientList: [
        {
          id: 1,
          patient_name: "测试1",
          gender: "男",
          disease: "糖尿病",
          first_visit_time: "2016-05-02",
          last_visit_time: "2022-01-02",
        },
      ],

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
    };
  },
  methods: {
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
    // 点击按钮,添加新用户
    addPatient() {
      this.$refs.addFormRef.validate(async (valid) => {
        console.log(valid);
        if (!valid) return;
        // 可以发起添加用户请求
        const { data: res } = await this.$http.post("users", this.addForm);
        if (res.meta.status !== 201) {
          return this.$message.error("用户添加失败了~");
        }
        // 隐藏添加用户的对话框
        this.addDialogVisible = false;
        // 添加成后重新获取用户数据,不需要用户手动刷新
        this.getUserList();
        return this.$message.success("用户添加成功了~");
      });
    },
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
  margin-bottom: 15px;
}
</style>
