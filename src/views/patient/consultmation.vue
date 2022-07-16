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
      
      <el-table-column label="患者诊次" prop="consultNum"> </el-table-column>
      <el-table-column label="门诊号" prop="outpatNum"> </el-table-column>
      <el-table-column label="患者就诊时间" prop="consultTime">
        <template slot-scope="scope">
  <span>{{ scope.row.consultTime | formatDate }}</span>
</template>
      </el-table-column>
    </el-table>
<h4 style="margin-left:40px">该诊次详细信息：</h4>
    <el-tabs v-model="activeName2" type="border-card" style="margin-left:40px;margin-right:40px">
      <el-tab-pane label="该患者基本信息"  name="1">
        <el-descriptions title="基本信息" :column="2">
          <el-descriptions-item label="姓名">{{
            thispatientDto.patientName
          }}</el-descriptions-item>
          <el-descriptions-item label="性别">
            <span v-if="thispatientDto.gender == 0">男</span>
            <span v-if="thispatientDto.gender == 1">女</span>
          </el-descriptions-item>
          <el-descriptions-item label="出生日期">
            {{ thispatientDto.birthday | formatDate }}
          </el-descriptions-item>
          <el-descriptions-item label="身份证号">
            {{ thispatientDto.idCard }}
          </el-descriptions-item>
          <el-descriptions-item label="身高(cm)">
            {{ thispatientDto.height }}
          </el-descriptions-item>
          <el-descriptions-item label="体重(kg)">
            {{ thispatientDto.weight }}
          </el-descriptions-item>
          <el-descriptions-item label="BMI指数">
            {{ thispatientDto.bmiIndex }}
          </el-descriptions-item>
          <el-descriptions-item label="门诊ID">
            {{ thispatientDto.outpatientId }}
          </el-descriptions-item>
          <el-descriptions-item label="就诊地点">
            {{ thisconsultationDto.medicalLoc }}</el-descriptions-item
          >
          <el-descriptions-item label="初诊时间">
            {{ thisconsultationDto.consultTime | formatDate }}
          </el-descriptions-item>
        </el-descriptions>
      </el-tab-pane>
      <el-tab-pane label="该患者疾病资料" name="2">
        <el-descriptions title="疾病资料" :column="2">
          <el-descriptions-item label="主述">
            {{ thisconsultationDto.mainComplaint }}
          </el-descriptions-item>
          <el-descriptions-item label="现病史">
            <el-descriptions :column="1">
              <el-descriptions-item label=" 西医诊断及病程">{{
                manshenlist[
                  thispatientDto.curMedicalRecord.Westernmedicine.list
                ]
              }}</el-descriptions-item>
              <el-descriptions-item label=" 确诊时间">
                {{
                  thispatientDto.curMedicalRecord.confirmTime.time | formatDate
                }}</el-descriptions-item
              >
              <el-descriptions-item label="  糖尿病并发症">{{
                manshenlist[
                  thispatientDto.curMedicalRecord.DMcomplications.list[0]
                ]
              }}</el-descriptions-item>
              <el-descriptions-item label="慢性肾脏病病因">
                {{
                  manshenlist[thispatientDto.curMedicalRecord.CKDreason.list[0]]
                }}
              </el-descriptions-item>
            </el-descriptions>
          </el-descriptions-item>
          <el-descriptions-item label="既往史">
            <!-- {{ thispatientDto.pastHistoryList }} -->
            高血压
          </el-descriptions-item>
          <el-descriptions-item label="个人史">
            <el-descriptions :column="1">
              <el-descriptions-item label=" 吸烟数量（支/天）">
                {{
                  thispatientDto.personalHistory.smoke.amount
                }}</el-descriptions-item
              >
              <el-descriptions-item label="啤酒数量（瓶/天）">
                {{
                  thispatientDto.personalHistory.beer.amount
                }}</el-descriptions-item
              >
              <el-descriptions-item label="白酒数量（两/天）">
                {{ thispatientDto.personalHistory.whiteWine.amount }}
              </el-descriptions-item>
            </el-descriptions>
          </el-descriptions-item>
          <el-descriptions-item label="家族史">
            <!-- {{ thispatientDto.familyHistoryList }} -->
            脑血管病
          </el-descriptions-item>
          <el-descriptions-item label="过敏史">
            {{ thispatientDto.allergyHistory }}
          </el-descriptions-item>
        </el-descriptions>
      </el-tab-pane>
      <el-tab-pane label="该患者辅助检查" name="3">
        <el-descriptions title="辅助检查"> </el-descriptions>
      </el-tab-pane>
      <el-tab-pane label="该患者中医四诊" name="4">
        <el-descriptions title="中医四诊" :column="2">
          <el-descriptions-item label=" 舌象"></el-descriptions-item>
          <el-descriptions-item label=" 脉象">
            {{ thisconsultationDto.pulsePattern }}</el-descriptions-item
          >
          <el-descriptions-item label=" 基本查体">{{
            thisconsultationDto.bodyCheck
          }}</el-descriptions-item>
          <el-descriptions-item label="腹证">
            {{ thisconsultationDto.abdominalExamination }}
          </el-descriptions-item>
        </el-descriptions>
      </el-tab-pane>
      <el-tab-pane label="该患者量表评分" name="5">
        <el-descriptions title="量表评分" :column="1">
          <el-descriptions-item label="DM/CKD VAS评分">
            <el-descriptions :column="1">
              <el-descriptions-item label="最不适症状">{{
                thisconsultationDto.vasScore.worstSymptom
              }}</el-descriptions-item>
              <el-descriptions-item label="程度">{{
                thisconsultationDto.vasScore.degree
              }}</el-descriptions-item>
              <el-descriptions-item label="DM">
                <span
                  v-for="(item, index) in thisconsultationDto.vasScore.DM"
                  :key="index"
                >
                  {{ " " + item.dataName + "-----" + "程度" + item.score + "" }}
                </span>
              </el-descriptions-item>
              <el-descriptions-item label="CDK">
                <span
                  v-for="(item, index) in thisconsultationDto.vasScore.CKD"
                  :key="index"
                >
                  {{ " " + item.dataName + "-----" + "程度" + item.score + "" }}
                </span>
              </el-descriptions-item>
              <el-descriptions-item label="生活质量评分">{{
                thisconsultationDto.vasScore.healthyStatus
              }}</el-descriptions-item>
              <el-descriptions-item label="健康状况评分">{{
                thisconsultationDto.vasScore.lifeQuality
              }}</el-descriptions-item>
            </el-descriptions>
          </el-descriptions-item>
          <el-descriptions-item label="风邪">
            <el-descriptions :column="1">
              <el-descriptions-item label="是否诊断为风邪证">
                <span v-if="thisconsultationDto.windEvil.diagnosticResult == 1"
                  >是</span
                >
                <span v-if="thisconsultationDto.windEvil.diagnosticResult == 0"
                  >否</span
                ></el-descriptions-item
              >
              <el-descriptions-item label="风邪">
                <span
                  v-for="(item, index) in thisconsultationDto.windEvil.fengxie"
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
            </el-descriptions>
          </el-descriptions-item>
        </el-descriptions>
      </el-tab-pane>
      <el-tab-pane label="该患者诊断记录" name="6">
        <el-descriptions title="诊断记录" :column="2">
          <el-descriptions-item label="西医诊断">
            {{
            manshenlist[thispatientDto.curMedicalRecord.Westernmedicine.list]
          }}</el-descriptions-item>
          <el-descriptions-item label="辩证">
            <el-descriptions :column="1">
              <el-descriptions-item label="实">{{
                thisconsultationDto.symptomCategories.real
              }}</el-descriptions-item>
              <el-descriptions-item label="虚">{{
                thisconsultationDto.symptomCategories.empty
              }}</el-descriptions-item>
            </el-descriptions>
          </el-descriptions-item>
          <el-descriptions-item label="体质诊断">{{
            thispatientDto.physiqueId
          }}</el-descriptions-item>
          <el-descriptions-item label="症状">
            <el-collapse v-model="activeNames">
              <el-collapse-item title="展开折叠" name="0">
                <h4
                  v-for="(item, index) in thisconsultationDto.symptom
                    .symtomList"
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
          <el-descriptions-item label="病位诊断">
            <el-descriptions :column="1">
              <el-descriptions-item label="脏腑">{{
                thisconsultationDto.diseaseLocation.viscera
              }}</el-descriptions-item>
              <el-descriptions-item label="经脉">{{
                thisconsultationDto.diseaseLocation.meridian
              }}</el-descriptions-item>
              <el-descriptions-item label="卫分">{{
                thisconsultationDto.diseaseLocation.defender
              }}</el-descriptions-item>
              <el-descriptions-item label="三焦">{{
                thisconsultationDto.diseaseLocation.tripleFocus
              }}</el-descriptions-item>
            </el-descriptions>
          </el-descriptions-item>
        </el-descriptions>
      </el-tab-pane>
      <el-tab-pane label="该患者治疗信息" name="7">
        <el-descriptions title="治疗信息" :column="2">
          <el-descriptions-item label="处方">
            {{ thisconsultationDto.prescription }}
          </el-descriptions-item>
          <el-descriptions-item label="调护"></el-descriptions-item>
          <el-descriptions-item label="其他治疗"></el-descriptions-item>
        </el-descriptions>
      </el-tab-pane>
      <el-tab-pane label="该患者复诊信息" name="8">
        <el-descriptions title="复诊信息" :column="2">
          <el-descriptions-item label="其他资料">
            {{ thisconsultationDto.additionalInfo }}
          </el-descriptions-item>
          <el-descriptions-item label="病例特点">
            {{ thisconsultationDto.caseFeature }}
          </el-descriptions-item>
          <el-descriptions-item label="合并用药">
            {{ thisconsultationDto.combinationTherapy }}
          </el-descriptions-item>
          <el-descriptions-item label="医嘱">
            {{ thisconsultationDto.doctorOrder }}
          </el-descriptions-item>
          <el-descriptions-item label="其他诊断">
            {{ thisconsultationDto.otherDiagnosisId }}
          </el-descriptions-item>
          <el-descriptions-item label="主病诊断">
            {{ thisconsultationDto.mainDiseaseDiagnosisId }}
          </el-descriptions-item>
          <el-descriptions-item label="门诊号">
            {{ thisconsultationDto.outpatNum }}
          </el-descriptions-item>
          <el-descriptions-item label="其他">
            {{ thisconsultationDto.otherFeature }}
          </el-descriptions-item>
          <el-descriptions-item label="治法">
            {{ thisconsultationDto.treatment }}
          </el-descriptions-item>
        </el-descriptions>
      </el-tab-pane>
    </el-tabs>
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
      // 慢性肾脏病病因列表
      manshenlist: [
        "",
        "慢性肾小球肾炎",
        "膜性肾病",
        "IgA肾病",
        "高血压肾损害",
        "过敏性紫癜性肾损害",
        "系统性红斑狼疮肾损害",
        "梗阻性肾病",
        "药物性肾损伤",
        "肿瘤相关性肾损伤",
      ],
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
      activeName2: "8",
      // 主病诊断全部数据
      impotantlist: [],
      //  <!-- 就诊id -->
      consultationId: this.$route.query.consultationId,
      // <!-- 患者id -->
      patientId: this.$route.query.patientId,
      //   该患者复诊详情数据
      consultationDto: [],
      // 查询该患者复诊信息列表
      thisconsultationDto: [],
      // 查询该患者的基本信息列表
      thispatientDto: [],
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
        this.thisconsultationDto = res.data.consultationDto;
        this.thispatientDto = res.data.patientDto;
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