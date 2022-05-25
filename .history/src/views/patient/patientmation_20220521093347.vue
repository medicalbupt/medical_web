<template>
  <div>
    {{ this.$route.params.index }}
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
          <el-form :model="patientData.patientList">
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
  </div>
</template>
<script>
import { getPatientList } from "@/api/patient";
export default {
  name: "patientmation",
  data() {
    return {
      // 该患者的表单
      patinentform: {
        id: "",
        patientName: "",
        gender: "",
        idCard: "",
        telephone: "",
        birthday: "",
        curMedicalRecord: "",
        pastHistory: "",
        personalHistory: "",
        familyHistory: "",
        status: 1,
        createTinme: "",
        modifiedTime: "",
      },
      dialogFormVisible: false,
      // 患者总数
      patienttotal: "",
      // 获取患者列表的参数对象
      queryInfo: {
        //排序依据字段
        orderColumns: "id",
        orderType: "DESC",
        // 当前的页数
        currentPage: 1,
        // 当前每次显示多少条数据
        pageSize: "",
      },
      // 存放患者的数据和数量
      patientData: {
        patientList: [],
        total: 0,
      },
    };
  },
  created() {
    this.patienttotal = this.$route.params.total;
    this.queryInfo.pageSize = this.patienttotal;
    console.log("进入patientmation");
    console.log("patienttotal", this.patienttotal);
    this.getPatientList();
  },
  methods: {
    getPatientList() {
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
      });
    },
  },
};
</script>
<style lang="">
</style>