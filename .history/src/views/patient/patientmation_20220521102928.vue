<template>
  <div>
    <el-descriptions
      class="margin-top"
      title="该患者信息"
      direction="vertical"
      :column="3"
      border
    >
      <template slot="extra">
        <el-button type="text" size="small">添加复诊</el-button>
      </template>

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

    <el-collapse v-model="activeName" class="collapse" accordion>
      <el-collapse-item title="一致性 Consistency" name="1">
        <div>
          与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
        </div>
        <div>
          在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
        </div>
      </el-collapse-item>
      <el-collapse-item title="反馈 Feedback" name="2">
        <div>
          控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；
        </div>
        <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
      </el-collapse-item>
      <el-collapse-item title="效率 Efficiency" name="3">
        <div>简化流程：设计简洁直观的操作流程；</div>
        <div>
          清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；
        </div>
        <div>
          帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。
        </div>
      </el-collapse-item>
      <el-collapse-item title="可控 Controllability" name="4">
        <div>
          用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；
        </div>
        <div>
          结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import { getPatientList } from "@/api/patient";
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
    // console.log("进入patientmation");
    console.log("patienttotal", this.patienttotal);
    this.getPatientList();
    // console.log("结束getIDlist");
  },
  methods: {
    async getPatientList() {
      await getPatientList(this.queryInfo).then((res) => {
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
<style lang="">
.collapse {
  margin: 20px;
}
</style>