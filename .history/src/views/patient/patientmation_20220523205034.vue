<template>
  <div>
    <el-descriptions
      class="margin-top"
      title="该患者信息"
      direction="vertical"
      :column="3"
      border
    >
      <!-- 文字展示的地方要换形式 -->

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-s-check"></i>
          患者ID
        </template>
        {{ patinentform.id }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-s-check"></i>
          患者姓名
        </template>
        {{ patinentform.patientName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-coordinate"></i>
          患者性别
        </template>
        {{ patinentform.gender }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-wallet"></i>
          患者身份证号
        </template>
        {{ patinentform.idCard }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-phone"></i>
          患者手机号
        </template>
        {{ patinentform.telephone }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-ship"></i>
          患者出生日期
        </template>
        {{ patinentform.birthday }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-pie-chart"></i>
          患者创建时间
        </template>
        {{ patinentform.createTinme }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-pie-chart"></i>
          患者修改时间
        </template>
        {{ patinentform.modifiedTime }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-notebook-1"></i>
          患者现病史
        </template>
        {{ patinentform.curMedicalRecord }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-notebook-2"></i>
          患者既往史
        </template>
        {{ patinentform.pastHistory }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-notebook-2"></i>
          患者个人史
        </template>
        {{ patinentform.personalHistory }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-notebook-2"></i>
          患者家族史
        </template>
        {{ patinentform.familyHistory }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-s-flag"></i>
          患者状态
        </template>
        {{ patinentform.status }}
      </el-descriptions-item>
    </el-descriptions>

    <el-divider></el-divider>
    <h4 class="h3">该患者诊断信息:</h4>
    <el-button class="but1" type="primary">添加复诊</el-button>

    <!-- 展示患者诊断信息 -->
    <el-table :data="patientconsultData.patientconsultList" class="table1">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="患者主病诊断">
              <span>{{ props.row.mainComplaint }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="患者诊次" prop="id"> </el-table-column>
      <el-table-column label="就诊地点" prop="medicalLocId"> </el-table-column>
      <el-table-column label="患者就诊时间" prop="consultNum">
      </el-table-column>
    </el-table>

    <!-- 分页 -->

    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="consultqueryInfo.currentPage"
      @size-change="handleSizeChange"
      :page-size="consultqueryInfo.pageSize"
      :page-sizes="[2, 4, 5, 10]"
      layout="total,sizes, prev, pager, next, jumper"
      :total="this.patientconsultData.total"
      class="pagination"
    >
    </el-pagination>
  </div>
</template>
<script>
import { getPatientList, getpationconsult } from "@/api/patient";
export default {
  name: "patientmation",
  data() {
    return {
      // 折叠面板的activeName
      activeName: "1",
      // 该患者的数组
      patinentform: [],
      dialogFormVisible: false,
      // 患者总数
      patienttotal: "",
      // 患者就诊信息总数
      patientconsulttotal: "",
      // 获取患者就诊的参数对象
      consultqueryInfo: {
        //排序依据字段
        orderColumns: "id",
        orderType: "DESC",
        // 当前的页数
        currentPage: 1,
        // 当前每次显示多少条数据
        pageSize: 5,
        // patientId
        patientId: "",
      },
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
      // 存放患者就诊信息的数据和数量
      patientconsultData: {
        patientconsultList: [],
        total: 0,
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
    // console.log("进入patientmation");
    console.log("patienttotal", this.patienttotal);
    this.getPatientList();
    // console.log("结束getIDlist");
    this.consultqueryInfo.patientId = this.$route.params.index;
    // 患者就诊信息函数
    this.getpationconsult();
  },
  methods: {
    // 患者就诊信息
    async getpationconsult() {
      await getpationconsult(this.consultqueryInfo).then((res) => {
        console.log("获取患者就诊列表", res.data);
        if ((res.data.respCode == "0000") | (res.data.respCode == "0001")) {
          this.$message({
            message: "该患者就诊信息查询成功",
            type: "success",
          });
        }
        if (res.data.respCode == "0001") {
          // 诊断条数设置为0
          this.patientData.total = 0;
          this.patientconsultData.patientconsultList = [];
          console.log(
            "this.patientconsultData.patientconsultList",
            this.patientconsultData.patientconsultList
          );
        }
        if (res.data.respCode == "0000") {
          // 诊断条数设置
          this.patientData.total = res.data.totalCount;
          this.patientconsultData.patientconsultList =
            res.data.consultationEntities;
          console.log(
            "this.patientconsultData.patientconsultList",
            this.patientconsultData.patientconsultList
          );
        }
      });
    },
    handleCurrentChange() {},
    handleSizeChange() {},
    // 患者列表
    async getPatientList() {
      await getPatientList(this.queryInfo).then((res) => {
        console.log("获取患者列表", res.data);
        if (res.data.respCode == "0000") {
          this.$message({
            message: "该患者列表查询成功",
            type: "success",
          });
        }
        this.patientData.patientList = res.data.patientPoolEntities;
        this.patientData.total = res.data.totalCount;
        console.log("总数", this.patientData.total);
      });
      // 获取该id患者
      console.log("进入getID");
      console.log("this.patientData.total", this.patientData.total);
      for (var i = 0; i < this.patientData.total; i++) {
        if (this.patientData.patientList[i].id == this.$route.params.index) {
          this.patinentform = this.patientData.patientList[i];
          console.log("该id为", this.patinentform);
        }
      }
    },
  },
};
</script>
<style lang="scss">
/* .collapse {
  margin: 20px;
} */
.margin-top {
  margin: 20px 30px 40px 50px;
}
.collapse {
  margin: 20px 30px 40px 50px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.table1 {
  margin: 20px 30px 40px 50px;
}
.h3 {
  margin-left: 50px;
}
.pagination {
  margin: 0 30px 40px 50px;
}
.but1 {
  margin-right: 30px;
  position: relative;
  float: left;
}
</style>