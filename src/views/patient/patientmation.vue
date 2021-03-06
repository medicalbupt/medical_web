<template>
  <div>
    <el-tabs v-if="thispatientDto.patientName" v-model="activeName" type="border-card">
      <el-tab-pane label="基本信息" name="1">
        <el-descriptions title="基本信息" :size="size" :column="3" border direction="vertical">
          <el-descriptions-item>
            <template slot="label">
              姓名
            </template>
            {{ thispatientDto.patientName }}</el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              性别
            </template>
            <span v-if="thispatientDto.gender == 0">男</span>
            <span v-if="thispatientDto.gender == 1">女</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              出生日期
            </template>
            {{ thispatientDto.birthday | formatDate }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              身份证号
            </template>
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
            {{ thisconsultationDto.medicalLoc ? thisconsultationDto.medicalLoc.dataName : '-' }}</el-descriptions-item>
          <el-descriptions-item label="初诊时间">
            {{ thisconsultationDto.consultTime | formatDate }}
          </el-descriptions-item>
        </el-descriptions>
      </el-tab-pane>
      <el-tab-pane label="疾病资料" name="2">
        <el-descriptions title="疾病资料" :column="2" :size="size" border direction="vertical">
          <el-descriptions-item label="主述">
            {{ thisconsultationDto.mainComplaint }}
          </el-descriptions-item>
          <el-descriptions-item label="现病史">
            {{ thispatientDto.curMedicalRecord.currentText || '-' }}
          </el-descriptions-item>
          <el-descriptions-item label="既往史">
            <el-tag v-for="item in changeListToName(thispatientDto.pastHistoryList)" :key="item" type="info" class="medical-tag">{{item}}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="个人史">
            <el-descriptions :column="2">
              <el-descriptions-item label=" 吸烟数量（支/天）">
                {{
                  thispatientDto.personalHistory.smoke.amount
                }}</el-descriptions-item>
              <el-descriptions-item label="啤酒数量（瓶/天）">
                {{
                  thispatientDto.personalHistory.beer.amount
                }}</el-descriptions-item>
              <el-descriptions-item label="白酒数量（两/天）">
                {{ thispatientDto.personalHistory.whiteWine.amount }}
              </el-descriptions-item>
            </el-descriptions>
          </el-descriptions-item>
          <el-descriptions-item label="家族史">
            <el-tag v-for="item in changeListToName(thispatientDto.pastHistoryList)" :key="item" type="info" class="medical-tag">{{item}}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="过敏史">
            {{ thispatientDto.allergyHistory.has ? thispatientDto.allergyHistory.desc : '无' }}
          </el-descriptions-item>
        </el-descriptions>
      </el-tab-pane>
      <el-tab-pane label="辅助检查" name="3">
        <el-descriptions title="辅助检查" v-html="thisconsultationDto.auxiliaryExamination" :column="2" :size="size" border
          direction="vertical"></el-descriptions>
      </el-tab-pane>
      <el-tab-pane label="中医四诊" name="4">
        <el-descriptions title="中医四诊" :column="2" :size="size" border direction="vertical">
          <el-descriptions-item label="舌象">
            <div v-for="(item) in thisconsultationDto.symptom.symtomList2" :key="item.typeId">
              <template v-for="item1 in item.children">
                <el-tag v-if="item1.score !== 0" :key="item1.id" :type="symptomScoreList[Number(item1.score)].type" class="medical-tag">{{item1.dataName}}: {{symptomScoreList[Number(item1.score)].label}}</el-tag>
              </template>
            </div>
          </el-descriptions-item>
          <el-descriptions-item label="脉象">
            <div v-for="(item) in thisconsultationDto.symptom.symtomList3" :key="item.typeId">
              <template v-for="item1 in item.children">
                <el-tag v-if="item1.score !== 0" :key="item1.id" :type="symptomScoreList[Number(item1.score)].type" class="medical-tag">{{item1.dataName}}: {{symptomScoreList[Number(item1.score)].label}}</el-tag>
              </template>
            </div>
          </el-descriptions-item>
          <el-descriptions-item label="基本查体" :span="2">{{
            thisconsultationDto.bodyCheck
          }}</el-descriptions-item>
          <el-descriptions-item label="腹证">
            <el-descriptions :column="1">
              <el-descriptions-item v-for="(item, index) in changeObjectToName(thisconsultationDto.abdominalExamination, abdominalExaminationTypeList)" :key="index" :label="item.title">
                <el-tag v-for="name in item.children" :key="name" type="info" class="medical-tag">{{name}}</el-tag>
              </el-descriptions-item>
            </el-descriptions>
          </el-descriptions-item>
        </el-descriptions>
      </el-tab-pane>
      <el-tab-pane label="量表评分" name="5">
        <el-descriptions title="量表评分" :column="1" :size="size" border direction="vertical">
          <el-descriptions-item label="DM/CKD VAS评分">
            <el-descriptions :column="1">
              <el-descriptions-item label="最不适症状">{{
                thisconsultationDto.vasScore.worstSymptom
              }}</el-descriptions-item>
              <el-descriptions-item label="程度">{{
                thisconsultationDto.vasScore.degree
              }}</el-descriptions-item>
              <el-descriptions-item label="DM">
                <span v-for="(item, index) in thisconsultationDto.vasScore.DM" :key="index">
                  {{ " " + item.dataName + "-----" + "程度" + item.score + "" }}
                </span>
              </el-descriptions-item>
              <el-descriptions-item label="CDK">
                <span v-for="(item, index) in thisconsultationDto.vasScore.CKD" :key="index">
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
                <span v-if="thisconsultationDto.windEvil.diagnosticResult == 1">是</span>
                <span v-if="thisconsultationDto.windEvil.diagnosticResult == 0">否</span></el-descriptions-item>
              <el-descriptions-item label="风邪">
                <span v-for="(item, index) in thisconsultationDto.windEvil.fengxie" :key="index">
                  <span v-if="item.value == 0">
                    {{ " " + item.dataName + "-----" + "程度:" + "无" }}</span>
                  <span v-if="item.value == 1">
                    {{ " " + item.dataName + "-----" + "程度:" + "轻" }}</span>
                  <span v-if="item.value == 2">
                    {{ " " + item.dataName + "-----" + "程度:" + "重" }}</span>
                </span>
              </el-descriptions-item>
            </el-descriptions>
          </el-descriptions-item>
        </el-descriptions>
      </el-tab-pane>
      <el-tab-pane label="诊断记录" name="6">
        <el-descriptions title="诊断记录" :column="2" :size="size" border direction="vertical">
          <el-descriptions-item label="西医诊断及病程">
            <el-tag v-for="item in changeListToName(thispatientDto.pastHistoryList)" :key="item" type="info" class="medical-tag">{{item}}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="确诊时间">{{thispatientDto.curMedicalRecord.confirmTime.time | formatDate}}</el-descriptions-item>
          <el-descriptions-item label="症状">
            <el-descriptions :column="1">
              <template v-for="item in thisconsultationDto.symptom.symtomList">
                <el-descriptions-item v-if="item.children" :key="item.typeId" :label="typeNameList[item.typeName]">
                  <template v-for="item1 in item.children">
                    <el-tag v-if="item1.score !== 0" :key="item1.id" :type="symptomScoreList[Number(item1.score)].type" class="medical-tag">{{item1.dataName}}: {{symptomScoreList[Number(item1.score)].label}}</el-tag>
                  </template>
                </el-descriptions-item>
              </template>
            </el-descriptions>
          </el-descriptions-item>
          <el-descriptions-item label="体质诊断">
            <el-descriptions :column="1">
              <el-descriptions-item v-for="(item, index) in changeObjectToName(thispatientDto.physique, physiqueTypeList)" :key="index" :label="item.title">
                <el-tag v-for="name in item.children" :key="name" type="info" class="medical-tag">{{name}}</el-tag>
              </el-descriptions-item>
            </el-descriptions>
          </el-descriptions-item>
          <el-descriptions-item label="辩证">
            <el-descriptions :column="1">
              <el-descriptions-item label="实">
                <el-tag v-for="item in changeListToName(thisconsultationDto.symptomCategories.real)" :key="item" type="info" class="medical-tag">{{item}}</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="虚">
                <el-tag v-for="item in changeListToName(thisconsultationDto.symptomCategories.empty)" :key="item" type="info" class="medical-tag">{{item}}</el-tag></el-descriptions-item>
            </el-descriptions>
          </el-descriptions-item>
          <el-descriptions-item label="病位诊断">
            <el-descriptions :column="1">
              <el-descriptions-item label="脏腑">
                <el-tag v-for="item in changeListToName(thisconsultationDto.diseaseLocation.viscera)" :key="item" type="info" class="medical-tag">{{item}}</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="经脉">
                <el-tag v-for="item in changeListToName(thisconsultationDto.diseaseLocation.meridian)" :key="item" type="info" class="medical-tag">{{item}}</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="卫分">
                <el-tag v-for="item in changeListToName(thisconsultationDto.diseaseLocation.defender)" :key="item" type="info" class="medical-tag">{{item}}</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="三焦">
                <el-tag v-for="item in changeListToName(thisconsultationDto.diseaseLocation.tripleFocus)" :key="item" type="info" class="medical-tag">{{item}}</el-tag>
              </el-descriptions-item>
            </el-descriptions>
          </el-descriptions-item>
        </el-descriptions>
      </el-tab-pane>
      <el-tab-pane label="治疗信息" name="7">
        <el-descriptions title="治疗信息" :column="2" :size="size" border direction="vertical">
          <el-descriptions-item label="医嘱">
            <el-tag v-for="item in changeListToName(thisconsultationDto.diseaseLocation.tripleFocus)" :key="item" type="info" class="medical-tag">{{item}}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="处方">
            {{ thisconsultationDto.prescription }}
          </el-descriptions-item>
          <el-descriptions-item label="合并用药">
            <div v-html="thisconsultationDto.combinationTherapy"></div>
          </el-descriptions-item>
        </el-descriptions>
      </el-tab-pane>
      <el-tab-pane label="复诊信息" name="8">
        <!-- <el-descriptions title="复诊信息" :column="2" :size="size" border direction="vertical">
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
        <el-divider></el-divider> -->
        <el-button class="but1" round type="primary" size="small" @click="gopage">添加复诊</el-button>

        <!-- 展示患者诊断信息 -->
        <!-- <el-descriptions
      class="margin-top"
      title="无边框列表"
      :column=3"
      :size="size"
    >
      <template slot="extra">
        <el-button type="primary" size="small">操作</el-button>
      </template>
      <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
      <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
      <el-descriptions-item label="居住地">苏州市</el-descriptions-item>
      <el-descriptions-item label="备注">
        <el-tag size="small">学校</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="联系地址"
        >江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item
      >
    </el-descriptions> -->
        <el-table :data="patientconsultData.patientconsultList" class="table1" stripe style="width: 90%">
          <el-table-column prop="consultNum" label="患者诊次" width="180">
          </el-table-column>
          <el-table-column prop="outpatNum" label="门诊号" width="180">
          </el-table-column>
          <el-table-column prop="consultTime" label="患者就诊时间">
            <template slot-scope="scope">
              <span>{{ scope.row.consultTime | formatDate3 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <div>
                <el-button type="primary" size="small" @click="gotoDetail(scope.row.id)">详情</el-button>
                <el-button type="danger" size="small" @click="deleteconsult(scope.row.id)">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->

        <el-pagination @current-change="handleCurrentChange" :current-page="consultqueryInfo.currentPage"
          @size-change="handleSizeChange" :page-size="consultqueryInfo.pageSize" :page-sizes="[10, 20, 50]"
          layout="total,sizes, prev, pager, next, jumper" :total="patientconsultData.total" class="pagination">
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import TinymceEditor from "@/components/Tinymce";
  import {
    formatDate
  } from "@/common/date.js";
  import {
    getPatientList,
    getpationconsult,
    addconsult,
    getAllSameData0,
    getAllSameData1,
    getAllSameData2,
    getcommonlist,
    deleteconsult,
    getPatientInfo,
  } from "@/api/patient";
  export default {
    name: "patientmation",
    components: {
      TinymceEditor,
    },
    data() {
      return {
        size: "",
        // 查询第一次就诊信息列表
        thisconsultationDto: {},
        // 查询该患者的基本信息列表
        thispatientDto: {},
        // 存储患者id参数
        refid: "",
        // 选项卡列表
        activeName: "1",
        // 描述列表
        size: "",
        score: 0,
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
        // 删除诊断信息的表
        deleteconsultform: {
          id: "",
        },
        // 现在时间
        nowTime: "",
        //风邪证单选框
        radio: "0",
        // 折叠框的选择
        activeNames: "1",
        activeNames3: "1",
        symtomActiveNames: 3,
        // 医嘱相应的数据
        doctorcommonDataEntityList: [],
        //症状相应的数据
        commonDataEntityList: [],
        // DM相应数据
        DMlist: [],
        newDMlist: [],

        // 虚相应数据
        xulist: [],
        // newxulist: [],

        // 实相应数据
        shilist: [],
        // newshilist: [],

        // 脏腑相应数据
        zangfulist: [],

        // 经脉相应数据
        jingmailist: [],

        // 卫分相应数据
        weifenlist: [],

        // 三焦相应数据
        sanjiaolist: [],

        // 风邪相应数据
        fengxielist: [],
        newfengxielist: [],

        // CKD相应数据
        CKDlist: [],
        newCKDlist: [],

        // 病位4种数组表
        // 级联器多选开启
        props: {
          multiple: true,
        },
        // 病位级联器选项
        // options: [
        //   {
        //     value: 1,
        //     label: "脏腑",
        //     children: [
        //       {
        //         value: 2,
        //         label: "肝",
        //       },
        //     ],
        //   },
        // ],
        dialogFormVisible: false,
        //新增患者就诊的弹窗表单宽度
        formLabelWidth: "120px",
        // 折叠面板的activeName
        activeName: "1",
        // 该患者的数组
        patinentform: {
          birthday: "",
          createTinme: "",
          curMedicalRecord: {
            currentText: '',
            Westernmedicine: {
              list: [],
            },
            confirmTime: {
              time: "",
            },
            DMcomplications: {
              list: [],
            },
            CKDreason: {
              list: [],
            },
          },
          engravedDisease: "",
          mainComplaint: "",
          familyHistoryList: [],
          gender: "",
          idCard: "",
          id: "",
          modifiedTime: "",
          pastHistoryList: [],
          patientName: "",
          personalHistory: {
            smoke: {
              amount: 0,
            },
            whiteWine: {
              amount: 0,
            },
            beer: {
              amount: 0,
            },
          },
          status: 1,
          telephone: "",
          allergyHistory: "",
          height: "",
          physique: '',
          weight: "",
        },
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
          pageSize: 10,
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
        // 辅助检查的图片链接
        picType1: [],
        // 其他资料图片的图片链接
        picType2: [],
        // 舌象的图片链接
        picType3: [],
        // 就诊地址全部数据
        locallist: [],
        // 主病诊断全部数据
        impotantlist: [],
        // 证候分类全部数据
        coultlist: [],
        // 添加就诊信息表单
        addconsultform: {
          patientId: "",
          outpatNum: "",
          consultTime: "",
          medicalLocId: "",
          mainComplaint: "",
          caseFeature: "",
          otherFeature: "",
          auxiliaryExamination: "",
          additionalInfo: "",
          symptom: {
            symtomList: [],
          },
          symptomCategories: {
            empty: [],
            real: [],
          },
          tonguePattern: "",
          pulsePattern: "",
          bodyCheck: "",
          abdominalExamination: "",
          mainDiseaseDiagnosisId: "",
          otherDiagnosisId: "",
          diseaseLocation: {
            viscera: [],
            meridian: [],
            defender: [],
            tripleFocus: [],
          },
          treatment: "",
          prescription: "",
          doctorOrder: [],
          combinationTherapy: "",
          vasScore: {
            worstSymptom: "",
            degree: 0,
            DM: [],
            CKD: [],
            lifeQuality: 0,
            healthyStatus: 0,
          },
          windEvil: {
            fengxie: [],
            diagnosticResult: "",
          },
          otherTreatment: "",
          status: 1,
          createTinme: "",
          modifiedTime: "",
        },
        files1: [],
        files2: [],
        files3: [],
        simpleSymtomValue: "",
        simpleSymtomHideStatus: false,
        allTypeList: [],
        symptomScoreList: [{
          label: '无',
          type: 'info',
        }, {
          label: '轻',
          type: '',
        }, {
          label: '中',
          type: 'warning',
        }, {
          label: '重',
          type: 'danger',
        }],
        abdominalExaminationTypeList: {
          abdominal_37: '全腹概况',
          abdominal_31: '腹皮',
          abdominal_32: '皮温',
          abdominal_33: '腹力',
          abdominal_34: '胸、心区腹证',
          abdominal_35: '心下腹证',
          abdominal_36: '腹部腹证'
        },
        physiqueTypeList: {
          physique_25: '太阳体质',
          physique_26: '阳明体质',
          physique_27: '少阳体质',
          physique_28: '太阴体质',
          physique_29: '少阴体质',
          physique_30: '厥阴体质',
        }
      };
    },
    filters: {
      formatDate(time) {
        if(!time) {
          return '-';
        }

        let date = new Date(time);
        return formatDate(date, "yyyy-MM-dd");
      },
      formatDate3(time) {
        if(!time) {
          return '-';
        }

        let date = new Date(time);
        return formatDate(date, "yyyy-MM-dd hh:mm:ss");
      },
    },
    async created() {
      await this.getAllTypeList();
      //获取患者个人信息和就诊信息
      this.getPatientInfo();
      // 存储患者id参数
      this.refid = this.$route.query.index;
      this.patienttotal = this.$route.query.total;
      this.queryInfo.pageSize = this.patienttotal;
      this.consultqueryInfo.patientId = this.$route.query.index;
      this.addconsultform.patientId = this.$route.query.index;
      // // 患者就诊信息函数
      this.getpationconsult();
    },
    watch: {
      simpleSymtomValue(newVal, oldVal) {
        if (newVal) {
          const valueArr = newVal.split("-");
          const index = valueArr[0];
          const subIndex = valueArr[1];
          // 深拷贝一份数据
          const subItemList = JSON.parse(
            JSON.stringify(
              this.addconsultform.symptom.symtomList[index].children[subIndex]
            )
          );
          subItemList.score = 1; // 默认选中为轻症
          // 用vue的splice方法触发更新
          this.addconsultform.symptom.symtomList[index].children.splice(
            subIndex,
            1,
            subItemList
          );

          this.simpleSymtomValue = "";
        }
      },
    },
    methods: {
      async getAllTypeList() {
        const typeList = [];
        for(let i = 0; i < 38; i ++) {
          typeList.push(i);
        }
        const res = await getcommonlist(typeList.join(','));
        this.allTypeList = res.data.commonDataEntityList;
      },
      changeListToName(list) {
        if(!list || list.length === 0) {
          return [];
        }

        const nameList = [];
        list.forEach((item) => {
          const nameItem = this.allTypeList.find((type) => type.dataCode === String(item));
          if (nameItem) {
            nameList.push(nameItem);
          }
        });

        return nameList.map((item) => item.dataName);
      },
      changeObjectToName(obj, typeList) {
        if(!obj || Object.keys(obj).length === 0) {
          return [];
        }

        const list = [];
        Object.keys(obj).forEach((key) => {
          if(obj[key].length !== 0) {
            list.push({
              title: typeList[key],
              children: this.changeListToName(obj[key]),
            });
          }
        });

        return list;
      },
      // 跳转详情页面
      gotoDetail(id) {
        this.$router.push({
          name: "consultmation",
          query: {
            consultationId: id,
            patientId: this.refid
          },
        });
      },
      // 跳转新增就诊页面
      gopage() {
        this.$router.push({
          name: "addconsultation",
          query: {
            patientId: this.refid
          },
        });
      },
      // 删除诊断信息
      deleteconsult(id) {
        this.$confirm("此操作将永久删除该就诊信息, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          this.deleteconsultform.id = id;
          deleteconsult(this.deleteconsultform).then((res) => {
            console.log("删除就诊信息", res.data);
            this.deleteconsultform = {
              id: "",
            };
            this.getpationconsult();
          });
        });
      },
      // 拿到该患者第一次就诊信息和他的基本信息
      getPatientInfo() {
        getPatientInfo(this.$route.query.index).then((res) => {
          this.thisconsultationDto = res.data.consultationDto;
          this.thispatientDto = res.data.patientDto;
          try {
            this.thispatientDto.allergyHistory = this.thispatientDto.allergyHistory ? JSON.parse(this.thispatientDto.allergyHistory) : '-';
            this.thispatientDto.physique = this.thispatientDto.physique ? JSON.parse(this.thispatientDto.physique) : '-';
            this.thisconsultationDto.abdominalExamination = this.thisconsultationDto.abdominalExamination ? JSON.parse(this.thisconsultationDto.abdominalExamination) : '-';
            this.thispatientDto.curMedicalRecord = this.thispatientDto.curMedicalRecord || {
              currentText: '',
              Westernmedicine: {
                list: [],
              },
              confirmTime: {
                time: "",
              },
              DMcomplications: {
                list: [],
              },
              CKDreason: {
                list: [],
              },
            };
          } catch (error) {
            console.log('error', error);
          }
        });
      },
      // 图片上传成功后，后台返回图片的路径1
      onSuccess1: function (res) {
        console.log("onSuccess1", res);
        this.picType1 = res.picUrls;
        console.log("picType1[0]", this.picType1[0]);
        this.addconsultform.auxiliaryExamination = this.picType1[0];
        // if(res.status==200){
        // 	this.imgUrl=res.data.imgUrl;
        // }
      },
      // 点击上传图片
      submitUpload1() {
        this.$refs.upload1.submit();
      },
      // 图片上传成功后，后台返回图片的路径2
      onSuccess2: function (res) {
        console.log("onSuccess2", res);
        this.picType2 = res.picUrls;
        console.log("picType3[0]", this.picType2[0]);
        this.addconsultform.additionalInfo = this.picType2[0];
        // if(res.status==200){
        // 	this.imgUrl=res.data.imgUrl;
        // }
      },
      // 点击上传图片
      submitUpload2() {
        this.$refs.upload2.submit();
      },
      // 图片上传成功后，后台返回图片的路径3
      onSuccess3: function (res) {
        console.log("onSuccess3", res);
        this.picType3 = res.picUrls;
        console.log("picType3[0]", this.picType3[0]);
        this.addconsultform.tonguePattern = this.picType3[0];
        // if(res.status==200){
        // 	this.imgUrl=res.data.imgUrl;
        // }
      },
      // 点击上传图片
      submitUpload3() {
        this.$refs.upload3.submit();
      },
      // 新增就诊信息
      async addconsult() {
        this.nowTime = new Date().valueOf();
        this.addconsultform.vasScore.DM = this.newDMlist;
        this.addconsultform.vasScore.CKD = this.newCKDlist;
        this.addconsultform.windEvil.fengxie = this.newfengxielist;
        this.addconsultform.createTinme = this.nowTime;
        await addconsult(this.addconsultform).then((res) => {
          console.log("this.consultqueryInfo", this.consultqueryInfo);
          console.log("新增患者就诊信息", res.data);
          if (res.data.respCode == "0000") {
            // this.$message({
            //   message: "该患者就诊信息添加成功",
            //   type: "success",
            // });
            this.dialogFormVisible = false;
            this.getpationconsult();
          }
        });
      },
      // 患者就诊信息
      async getpationconsult() {
        await getpationconsult(this.consultqueryInfo).then((res) => {
          console.log("获取患者就诊列表", res.data);
          if ((res.data.respCode == "0000") | (res.data.respCode == "0001")) {
            // this.$message({
            //   message: "该患者就诊信息查询成功",
            //   type: "success",
            // });
          }
          if (res.data.respCode == "0001") {
            // 诊断条数设置为0
            this.patientconsultData.total = 0;
            this.patientconsultData.patientconsultList = [];
            this.consultNum = 0;
            console.log(
              "this.patientconsultData.patientconsultList",
              this.patientconsultData.patientconsultList
            );
          }
          if (res.data.respCode == "0000") {
            // 诊断条数设置
            this.patientconsultData.total = res.data.totalCount;
            this.patientconsultData.patientconsultList =
              res.data.consultationDtos;
            console.log(
              "this.patientconsultData.patientconsultList",
              this.patientconsultData.patientconsultList
            );
          }
        });
      },
      handleCurrentChange(newSize) {
        this.consultqueryInfo.pageSize = newSize;
        this.getpationconsult();
      },
      handleSizeChange(newPage) {
        this.consultqueryInfo.currentPage = newPage;
        this.getpationconsult();
      },
      // 患者列表
      async getPatientList() {
        await getPatientList(this.queryInfo).then((res) => {
          console.log("获取患者列表", res.data);
          if (res.data.respCode == "0000") {
            // this.$message({
            //   message: "该患者列表查询成功",
            //   type: "success",
            // });
          }
          this.patientData.patientList = res.data.patientDtoList;
          this.patientData.total = res.data.totalCount;
          console.log("总数", this.patientData.total);
        });
        // 获取该id患者
        console.log("进入getID");
        console.log("this.patientData.total", this.patientData.total);
        // console.log("this.patientData.patientList",this.patientData.patientList);
        for (var i = 0; i < this.patientData.patientList.length; i++) {
          if (
            this.patientData.patientList[i].id == this.consultqueryInfo.patientId
          ) {
            this.patinentform = this.patientData.patientList[i];
            console.log("该id为", this.patinentform);
          }
        }
      },
      // 症状的select的change事件监听，解决for循环赋值不生效问题
      symtomSelectChange(index, subIndex, value = -1) {
        // 深拷贝一份数据
        const subItemList = JSON.parse(
          JSON.stringify(
            this.addconsultform.symptom.symtomList[index].children[subIndex]
          )
        );

        if (value !== -1) {
          subItemList.score = value;
        }

        // 用vue的splice方法触发更新
        this.addconsultform.symptom.symtomList[index].children.splice(
          subIndex,
          1,
          subItemList
        );
      },
      //主病诊断展示
      impotantlisttext(id) {
        for (var i = 0; i < this.impotantlist.length; i++) {
          if (this.impotantlist[i].id == id) {
            return this.impotantlist[i].dataName;
          }
        }
      },
      //其他诊断展示
      otherdiotext(id) {
        for (var i = 0; i < this.impotantlist.length; i++) {
          if (this.impotantlist[i].id == id) {
            return this.impotantlist[i].dataName;
          }
        }
      },

      // //DM展示
      // DMotext(list) {
      //   for (var i = 0; i < this.newDMlist.length; i++) {
      //     if (this.newDMlist[i].typeId == list) {
      //       return this.impotantlist[i].dataName;
      //     }
      //   }
      // },
    },
    computed: {
      // 个人史信息展示
      // personalHistorytext: function () {
      //   var xiyan = "吸烟(单位：支/每天)  :  ";
      //   var pijiu = "啤酒(单位：瓶/天)  :  ";
      //   var baijiu = "白酒(单位：两/天)  :  ";
      //   if (this.patinentform.personalHistory.personalType == 1) {
      //     return xiyan;
      //   } else if (this.patinentform.personalHistory.personalType == 2) {
      //     return baijiu;
      //   } else if (this.patinentform.personalHistory.personalType == 3) {
      //     return pijiu;
      //   }
      // },
      // 家族史展示

      familyHistoryListtext: function () {
        var vaiue1 = "糖尿病";
        var vaiue2 = "高血压";
        var vaiue3 = "冠心病";
        if (this.patinentform.familyHistoryList.includes(1)) {
          return vaiue1;
        } else if (this.patinentform.familyHistoryList.includes(2)) {
          return vaiue2;
        } else if (this.patinentform.familyHistoryList.includes(3)) {
          return vaiue3;
        }
      },
    },
  };

</script>
<style lang="scss" scoped>
  @import "~@/styles/variables.scss";

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

        &>* {
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
