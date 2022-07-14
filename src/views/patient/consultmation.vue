<template lang="">
    <div>
    <!-- <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="1">基本信息</el-tab-pane>
      <el-tab-pane label="疾病资料" name="2">疾病资料</el-tab-pane>
      <el-tab-pane label="辅助检查" name="3">辅助检查</el-tab-pane>
      <el-tab-pane label="中医四诊" name="4">中医四诊</el-tab-pane>
      <el-tab-pane label="量表评分" name="5">量表评分</el-tab-pane>
      <el-tab-pane label="诊断记录" name="6">诊断记录</el-tab-pane>
      <el-tab-pane label="治疗信息" name="7">治疗信息</el-tab-pane>
      <el-tab-pane label="复诊信息" name="8">复诊信息</el-tab-pane>
    </el-tabs> -->


    <el-table
      :data="consultationDto"
      class="table1"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-descriptions
            title="诊断信息"
            direction="vertical"
            class="margin-top2"
            border
            :column="4"
            style="width: 90%"
          >
            <el-descriptions-item label="主病诊断">
              <span>{{
                impotantlisttext(props.row.mainDiseaseDiagnosisId)
              }}</span></el-descriptions-item
            >
            <el-descriptions-item label="证候分类">
              <h4>实：</h4>
              <span>{{ props.row.symptomCategories.real }}</span>
              <h4>虚：</h4>
              <span>{{ props.row.symptomCategories.empty }}</span>
            </el-descriptions-item>
            <el-descriptions-item label="其他诊断">
              <span>{{
                otherdiotext(props.row.otherDiagnosisId)
              }}</span></el-descriptions-item
            >
            <el-descriptions-item label="病位">
              <h4>脏腑：</h4>
              <span>{{ props.row.diseaseLocation.viscera }}</span>
              <h4>经脉：</h4>
              <span>{{ props.row.diseaseLocation.meridian }}</span>
              <h4>卫分：</h4>
              <span>{{ props.row.diseaseLocation.defender }}</span>
              <h4>三焦：</h4>
              <span>{{ props.row.diseaseLocation.tripleFocus }}</span>
            </el-descriptions-item>
            <el-descriptions-item label="医嘱">
              <span>{{ props.row.doctorOrder }}</span></el-descriptions-item
            >
            <el-descriptions-item label="合并用药">
              <span>{{
                props.row.combinationTherapy
              }}</span></el-descriptions-item
            >
            <el-descriptions-item label="DM/CKD VAS评分">
              <h4>最不适症状：</h4>
              <span>{{ props.row.vasScore.worstSymptom }}</span>
              <h5>程度:</h5>
              <span>{{ props.row.vasScore.degree }}</span>
              <h4>DM:</h4>
              <span v-for="(item, index) in props.row.vasScore.DM" :key="index">
                {{ " " + item.dataName + "-----" + "程度" + item.score + "" }}
              </span>
              <h4>CDK:</h4>
              <span
                v-for="(item, index) in props.row.vasScore.CKD"
                :key="index"
              >
                {{ " " + item.dataName + "-----" + "程度" + item.score + "" }}
              </span>
              <h4>生活质量评分：</h4>
              <span>{{ props.row.vasScore.healthyStatus }}</span>
              <h4>健康状况评分：</h4>
              <span>{{ props.row.vasScore.lifeQuality }}</span>
            </el-descriptions-item>
            <el-descriptions-item label="风邪">
              <h4>是否诊断为风邪证：</h4>
              <span v-if="props.row.windEvil.diagnosticResult == 1">是</span>
              <span v-if="props.row.windEvil.diagnosticResult == 0">否</span>
              <h4>风邪:</h4>
              <span
                v-for="(item, index) in props.row.windEvil.fengxie"
                :key="index"
              >
                <span v-if="item.value == 0">
                  {{ " " + item.dataName + "-----" + "程度:" + "无" }}</span
                >
                <span v-if="item.value == 1">
                  {{ " " + item.dataName + "-----" + "程度:" + "轻" }}</span
                >
                <span v-if="item.value == 2">
                  {{ " " + item.dataName + "-----" + "程度:" + "重" }}</span
                >
              </span>
            </el-descriptions-item>
            <el-descriptions-item label="症状">
              <el-collapse v-model="activeNames">
                <el-collapse-item title="展开折叠" name="0">
                  <h4
                    v-for="(item, index) in props.row.symptom.symtomList"
                    :key="index"
                  >
                    {{ typeNameList[item.typeName] }}
                    <h5 v-for="item1 in item.children" :key="item1.id + '1231'">
                      <span v-if="item1.score == 0">
                        {{
                          " " + item1.dataName + "-----" + "程度:" + "无"
                        }}</span
                      >
                      <span v-if="item.score == 1">
                        {{
                          " " + item1.dataName + "-----" + "程度:" + "轻"
                        }}</span
                      >
                      <span v-if="item1.score == 2">
                        {{
                          " " + item1.dataName + "-----" + "程度:" + "重"
                        }}</span
                      >
                    </h5>
                  </h4>
                  <!-- <span>{{ props.row.symptom }}</span> -->
                </el-collapse-item>
              </el-collapse>
            </el-descriptions-item>
            <el-descriptions-item label="门诊号">
              <span>{{ props.row.outpatNum }}</span></el-descriptions-item
            >
            <el-descriptions-item label="主述">
              <span>{{ props.row.mainComplaint }}</span></el-descriptions-item
            >
            <el-descriptions-item label="病例特点">
              <span>{{ props.row.caseFeature }}</span></el-descriptions-item
            >
            <el-descriptions-item label="其他">
              <span>{{ props.row.otherFeature }}</span></el-descriptions-item
            >
            <el-descriptions-item label="辅助检查">
              <div>
                <el-image
                  class="block"
                  :src="props.row.auxiliaryExamination"
                ></el-image>
              </div>
              <!-- <span>
                <img :src="props.row.auxiliaryExamination" class="img"
              /></span> -->
            </el-descriptions-item>
            <el-descriptions-item label="其他资料">
              <div>
                <el-image
                  class="block"
                  :src="props.row.additionalInfo"
                ></el-image>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="舌象">
              <div>
                <el-image
                  class="block"
                  :src="props.row.tonguePattern"
                ></el-image>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="脉象">
              <span>{{ props.row.pulsePattern }}</span></el-descriptions-item
            >
            <el-descriptions-item label="基本查体">
              <span>{{ props.row.bodyCheck }}</span></el-descriptions-item
            >
            <el-descriptions-item label="腹诊">
              <span>{{
                props.row.abdominalExamination
              }}</span></el-descriptions-item
            >
            <el-descriptions-item label="治法">
              <span>{{ props.row.treatment }}</span></el-descriptions-item
            >
            <el-descriptions-item label="处方">
              <span>{{ props.row.prescription }}</span></el-descriptions-item
            >
            <el-descriptions-item label="其他治疗">
              <span>{{ props.row.otherTreatment }}</span></el-descriptions-item
            >
          </el-descriptions>
          <!-- <el-form
            label-position="left"
            inline
            class="demo-table-expand"
            size="medium"
          >
          </el-form> -->
        </template>
      </el-table-column>
      <el-table-column label="患者诊次" prop="consultNum"> </el-table-column>
      <el-table-column label="门诊号" prop="outpatNum"> </el-table-column>
      <el-table-column label="患者就诊时间" prop="consultTime">
        <template slot-scope="scope">
  <span>{{ scope.row.consultTime | formatDate }}</span>
</template>
      </el-table-column>
    </el-table>
    </div>
</template>
<script>
import { getConsultationInfo, getAllSameData1 } from "@/api/patient";
import { formatDate } from "@/common/date.js";
export default {
  data() {
    return {
      // 折叠面板的activeName
      activeName: "1",
      // 主病诊断列表
      typeNameList: [
        "",
        "",
        "",
        "全身",
        "头面",
        "四肢",
        "心胸",
        "脘腹",
        "饮食",
        "睡眠",
        "二便",
        "生殖",
        "舌",
        "脉",
      ],
      // 折叠框的选择
      activeNames: "1",
      // 主病诊断全部数据
      impotantlist: [],
      //  <!-- 就诊id -->
      consultationId: this.$route.query.consultationId,
      // <!-- 患者id -->
      patientId: this.$route.query.patientId,
      //   该患者复诊详情数据
      consultationDto: [],
    };
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    },
    formatDate3(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
  },
  created() {
    this.getConsultationInfo();
  },
  methods: {
    //其他诊断展示
    otherdiotext(id) {
      for (var i = 0; i < this.impotantlist.length; i++) {
        if (this.impotantlist[i].id == id) {
          return this.impotantlist[i].dataName;
        }
      }
    },
    // 拿到就诊基本数据表数据(主病诊断全部数据)
    async getAllSameData1() {
      await getAllSameData1().then((res) => {
        console.log("获取主病诊断全部数据", res.data);
        // 放入list
        this.impotantlist = res.data.commonDataEntities;
      });
    },
    //主病诊断展示
    impotantlisttext(id) {
      for (var i = 0; i < this.impotantlist.length; i++) {
        if (this.impotantlist[i].id == id) {
          return this.impotantlist[i].dataName;
        }
      }
    },
    getConsultationInfo() {
      getConsultationInfo(this.consultationId, this.patientId).then((res) => {
        this.consultationDto.push(res.data.consultationDto);
        console.log("获取患者复诊信息", this.consultationDto);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.table1 {
  margin: 20px 30px 40px 50px;
}
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
  width: 100%;
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
  margin-left: 50px;
}

.block {
  display: flex;
  margin: 20px 50px 20px 10px;
}

.slider1 {
  display: flex;
  margin-left: 10px;
  margin-right: 35px;
}

.select1 {
  margin-left: 40px;
}

.symtom-type {
  .symtom-type-block {
    margin-bottom: 12px;

    .symtom-type-block-item {
      display: inline-block;
      margin-right: 8px;
      margin-bottom: 12px;

      & > * {
        vertical-align: middle;
      }

      .symtom-type-block-item-title {
        width: 150px;
        display: inline-block;
        text-align: right;
        padding-right: 8px;
      }

      .symtom-type-block-item-select {
        width: 80px;
      }

      .symtom-type-block-item-delete {
        display: inline-block;
        margin-left: 8px;
        cursor: pointer;
        color: #bbb;
        font-size: 18px;

        &:hover {
          color: $dangerColor;
        }
      }
    }
  }
}

.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.box-card {
  width: 100%;
}

.el-descriptions {
  ::v-deep {
    .el-descriptions-item__cell {
      width: 33%;
    }
  }
}
</style>