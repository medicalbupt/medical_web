<template lang="123">
    <div>
        <el-tabs v-model="activeName" type="border-card" >
      <el-tab-pane label="基本信息" name="1">
        <el-form
          :model="addconsultform"
          class="medical-form"
          label-position="top"
          size="medium"
        >
        <el-form-item label="就诊地点" :label-width="formLabelWidth">
                <el-select
                  v-model="addconsultform.medicalLocId"
                  style="width: 240px"
                  filterable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in locallist"
                    :key="item.dataCode"
                    :label="item.dataName"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="就诊时间" :label-width="formLabelWidth">
                <el-date-picker
                  v-model="addconsultform.consultTime"
                  style="width: 240px"
                  type="date"
                  placeholder="选择就诊日期"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="门诊号" :label-width="formLabelWidth">
                <el-input
                  v-model="addconsultform.outpatNum"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="疾病资料" name="2">
        <el-form
          :model="addconsultform"
          class="medical-form"
          label-position="top"
          size="medium"
        >
        <el-form-item label="医嘱" :label-width="formLabelWidth">
            <el-checkbox-group v-model="addconsultform.doctorOrder">
              <el-checkbox
                v-for="symtom in doctorcommonDataEntityList"
                :key="symtom.dataName"
                :label="symtom.dataName"
              >
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="合并用药" :label-width="formLabelWidth">
            <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入合并用药（格式为：化学名—剂量mg—频次）"
              v-model="addconsultform.combinationTherapy"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="辅助检查" name="3">
        <el-form
          :model="addconsultform"
          class="medical-form"
          label-position="top"
          size="medium"
        >
         <el-form-item label="辅助检查" :label-width="formLabelWidth">
          <TinymceEditor style="width: 70vw" />
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="中医四诊" name="4">中医四诊</el-tab-pane>
      <el-tab-pane label="量表评分" name="5">
        <el-form
          :model="addconsultform"
          class="medical-form"
          label-position="top"
          size="medium"
        >
        <el-form-item label="DM/CKD VAS评分" :label-width="formLabelWidth">
            <el-card class="box-card" shadow="never">
              <el-row :gutter="20">
                <el-col :span="10">
                  <div class="grid-content">
                    <div class="grid1">
                      <span class="block-title">最不适症状:</span>
                      <el-input
                        type="textarea"
                        :rows="1"
                        placeholder="请输入最不适症状"
                        v-model="addconsultform.vasScore.worstSymptom"
                        autocomplete="off"
                      ></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :span="10" :offset="3">
                  <div class="grid-content">
                    <span class="block-title">最不适症状程度:</span>
                    <el-slider
                      v-model="addconsultform.vasScore.degree"
                       show-input
                    ></el-slider>
                  </div>
                </el-col>
              </el-row>
              <span class="block-title">DM:</span>
              <el-row :gutter="20">
                <div v-for="item in newDMlist" :key="item.id">
                  <el-col :span="8">
                    <div class="grid-content">
                      <span>{{ item.dataName }}程度:</span>
                      <el-slider
                        class="slider1"
                        v-model="item.score"
                         show-input
                      ></el-slider>
                    </div>
                  </el-col>
                </div>
              </el-row>
              <span class="block-title">CDK:</span>
              <el-row :gutter="20">
                <div v-for="item in newCKDlist" :key="item.id">
                  <el-col :span="8">
                    <span>{{ item.dataName }}程度:</span>
                    <el-slider class="slider1" v-model="item.score"  show-input></el-slider>
                  </el-col>
                </div>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8">
                  <span class="block-title">生活质量:</span>
                  <el-slider
                    v-model="addconsultform.vasScore.lifeQuality"
                     show-input
                    class="slider1"
                  ></el-slider>
                </el-col>
                <el-col :span="8">
                  <span class="block-title">健康状况:</span>
                  <el-slider
                    v-model="addconsultform.vasScore.healthyStatus"
                    class="slider1"
                     show-input
                  ></el-slider>
                </el-col>
              </el-row>
            </el-card>
          </el-form-item>
          <el-form-item label="风邪" :label-width="formLabelWidth">
            <el-card class="box-card" shadow="never">
              <div class="symtom-type">
                <div class="symtom-type-block">
                  <el-divider content-position="left"
                    >风邪（肾病填写）:</el-divider
                  >
                  <div
                    v-for="(item, index) in newfengxielist"
                    :key="item.id"
                    class="symtom-type-block-item"
                  >
                    <div class="symtom-type-block-item-title">
                      {{ item.dataName }}
                    </div>
                    <el-select
                      v-model="newfengxielist[index].value"
                      class="symtom-type-block-item-select"
                    >
                      <el-option :value="0" label="无"></el-option>
                      <el-option :value="1" label="偶尔"></el-option>
                      <el-option :value="2" label="总是"></el-option>
                    </el-select>
                  </div>
                  <el-divider content-position="left"
                    >是否诊断为风邪证</el-divider
                  >
                  <el-radio
                    v-model="addconsultform.windEvil.diagnosticResult"
                    label="1"
                    >是</el-radio
                  >
                  <el-radio
                    v-model="addconsultform.windEvil.diagnosticResult"
                    label="0"
                    >否</el-radio
                  >
                </div>
              </div>
            </el-card>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="诊断记录" name="6">
        <el-form
          :model="addconsultform"
          class="medical-form"
          label-position="top"
          size="medium"
        >
         <el-form-item label="症状诊断" :label-width="formLabelWidth">
            <el-switch
              v-model="simpleSymtomHideStatus"
              style="margin-bottom: 8px"
              active-text="复杂模式"
              inactive-text="简单模式"
            >
            </el-switch>
            <div v-if="!simpleSymtomHideStatus" class="simple-symtom-type">
              <el-card shadow="never">
                <el-select v-model="simpleSymtomValue" filterable clearable>
                  <el-option-group
                    v-for="(symtom, index) in addconsultform.symptom.symtomList"
                    :key="symtom.typeId"
                    :label="typeNameList[symtom.typeId]"
                  >
                    <el-option
                      v-for="(subSymtom, subIndex) in symtom.children"
                      :key="symtom.typeId + '-' + subSymtom.id"
                      :label="subSymtom.dataName"
                      :disabled="subSymtom.score"
                      :value="
                        index +
                        '-' +
                        subIndex +
                        '-' +
                        symtom.typeId +
                        '-' +
                        subSymtom.id
                      "
                    >
                    </el-option>
                  </el-option-group>
                </el-select>
                <el-divider content-position="left">已选择症状</el-divider>
                <div class="symtom-type">
                  <div class="symtom-type-block">
                    <template
                      v-for="(symtom, index) in addconsultform.symptom
                        .symtomList"
                    >
                      <template
                        v-for="(subSymtom, subIndex) in symtom.children"
                      >
                        <div
                          v-if="subSymtom.score"
                          :key="symtom.typeId + '-' + subSymtom.id"
                          class="symtom-type-block-item"
                        >
                          <div class="symtom-type-block-item-title">
                            {{ subSymtom.dataName }}
                          </div>
                          <el-select
                            v-model="
                              addconsultform.symptom.symtomList[index].children[
                                subIndex
                              ].score
                            "
                            class="symtom-type-block-item-select"
                            @change="symtomSelectChange(index, subIndex)"
                          >
                            <el-option :value="0" label="无"></el-option>
                            <el-option :value="1" label="轻"></el-option>
                            <el-option :value="2" label="中"></el-option>
                            <el-option :value="3" label="重"></el-option>
                          </el-select>
                          <i
                            class="
                              icon
                              el-icon-error
                              symtom-type-block-item-delete
                            "
                            @click="symtomSelectChange(index, subIndex, 0)"
                          ></i>
                        </div>
                      </template>
                    </template>
                  </div>
                </div>
              </el-card>
            </div>
            <div v-else class="symtom-type">
              <el-collapse v-model="symtomActiveNames">
                <el-collapse-item
                  v-for="(symtom, index) in addconsultform.symptom.symtomList"
                  :key="symtom.typeId"
                  :name="symtom.typeId"
                >
                  <template #title>
                    <span style="padding-left: 12px">{{
                      typeNameList[symtom.typeId]
                    }}</span>
                  </template>
                  <div class="symtom-type-block">
                    <div
                      v-for="(subSymtom, subIndex) in symtom.children"
                      :key="symtom.typeId + '-' + subSymtom.id"
                      class="symtom-type-block-item"
                    >
                      <div class="symtom-type-block-item-title">
                        {{ subSymtom.dataName }}
                      </div>
                      <el-select
                        v-model="
                          addconsultform.symptom.symtomList[index].children[
                            subIndex
                          ].score
                        "
                        class="symtom-type-block-item-select"
                        @change="symtomSelectChange(index, subIndex)"
                      >
                        <el-option :value="0" label="无"></el-option>
                        <el-option :value="1" label="轻"></el-option>
                        <el-option :value="2" label="中"></el-option>
                        <el-option :value="3" label="重"></el-option>
                      </el-select>
                    </div>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>
          </el-form-item>
          <el-form-item label="辩证" :label-width="formLabelWidth">
            <span class="block-title">虚：</span>
            <el-checkbox-group v-model="addconsultform.symptomCategories.empty">
              <el-checkbox
                v-for="symtom in xulist"
                :key="symtom.dataName"
                :label="symtom.dataName"
              >
              </el-checkbox>
            </el-checkbox-group>
            <span class="block-title">实：</span>
            <el-checkbox-group v-model="addconsultform.symptomCategories.real">
              <el-checkbox
                v-for="symtom in shilist"
                :key="symtom.dataName"
                :label="symtom.dataName"
              >
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="病位诊断" :label-width="formLabelWidth">
            <span class="block-title">脏腑：</span>
            <el-checkbox-group v-model="addconsultform.diseaseLocation.viscera">
              <el-checkbox
                v-for="symtom in zangfulist"
                :key="symtom.dataName"
                :label="symtom.dataName"
              >
              </el-checkbox>
            </el-checkbox-group>
            <span class="block-title">经脉：</span>
            <el-checkbox-group
              v-model="addconsultform.diseaseLocation.meridian"
            >
              <el-checkbox
                v-for="symtom in jingmailist"
                :key="symtom.dataName"
                :label="symtom.dataName"
              >
              </el-checkbox>
            </el-checkbox-group>
            <span class="block-title">卫分：</span>
            <el-checkbox-group
              v-model="addconsultform.diseaseLocation.defender"
            >
              <el-checkbox
                v-for="symtom in weifenlist"
                :key="symtom.dataName"
                :label="symtom.dataName"
              >
              </el-checkbox>
            </el-checkbox-group>
            <span class="block-title">三焦：</span>
            <el-checkbox-group
              v-model="addconsultform.diseaseLocation.tripleFocus"
            >
              <el-checkbox
                v-for="symtom in sanjiaolist"
                :key="symtom.dataName"
                :label="symtom.dataName"
              >
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="治疗信息" name="7">治疗信息</el-tab-pane>
      <el-tab-pane label="复诊信息" name="8">
         <el-divider></el-divider>
      <el-button type="primary">提交复诊</el-button>
      </el-tab-pane>
    </el-tabs>



<el-card v-if="0" class="box-card">
      <el-form
          :model="addconsultform"
          class="medical-form"
          label-position="top"
          size="medium"
        >
          <!-- <el-form-item label="腹诊" :label-width="formLabelWidth">
            <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="addconsultform.abdominalExamination"
              autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="舌象" :label-width="formLabelWidth">
            <el-upload class="upload-demo" ref="upload3"
              action="/consultation/fileUpload?picType=3" :file-list="files3"
              :on-success="onSuccess3" :auto-upload="false">
              <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
              <el-button style="margin-left: 10px" size="small" type="success" @click="submitUpload3">上传</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="其他资料" :label-width="formLabelWidth">
            <el-upload class="upload-demo" ref="upload2"
              action="/consultation/fileUpload?picType=2" :file-list="files2"
              :on-success="onSuccess2" :auto-upload="false">
              <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
              <el-button style="margin-left: 10px" size="small" type="success" @click="submitUpload2">上传</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </el-form-item> -->
  
          <!-- <el-form-item label="基本查体" :label-width="formLabelWidth">
            <el-input type="textarea" :rows="5" placeholder="请输入基本查体" v-model="addconsultform.bodyCheck"
              autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="病例特点" :label-width="formLabelWidth">
            <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="addconsultform.caseFeature"
              autocomplete="off"></el-input>
          </el-form-item> -->

          <!-- <el-form-item label="主述" :label-width="formLabelWidth">
            <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="addconsultform.mainComplaint"
              autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="主病诊断" :label-width="formLabelWidth">
            <el-select v-model="addconsultform.mainDiseaseDiagnosisId" filterable placeholder="请选择">
              <el-option v-for="item in impotantlist" :key="item.dataCode" :label="item.dataName" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item> -->

          <!-- <el-form-item label="其他诊断" :label-width="formLabelWidth">
            <el-select v-model="addconsultform.otherDiagnosisId" filterable placeholder="请选择">
              <el-option v-for="item in impotantlist" :key="item.dataCode" :label="item.dataName" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="其他" :label-width="formLabelWidth">
            <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="addconsultform.otherFeature"
              autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="其他治疗" :label-width="formLabelWidth">
            <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="addconsultform.otherTreatment"
              autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="门诊号" :label-width="formLabelWidth">
            <el-input v-model="addconsultform.outpatNum" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="处方" :label-width="formLabelWidth">
            <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="addconsultform.prescription"
              autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="脉象" :label-width="formLabelWidth">
            <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="addconsultform.pulsePattern"
              autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="治法" :label-width="formLabelWidth">
            <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="addconsultform.treatment"
              autocomplete="off"></el-input>
          </el-form-item> -->
        </el-form>
        </el-card>
  
    </div>
</template>
<script>
import TinymceEditor from "@/components/Tinymce";
import { formatDate } from "@/common/date.js";
import {
  getPatientList,
  getpationconsult,
  addconsult,
  getAllSameData0,
  getAllSameData1,
  getAllSameData2,
  getcommonlist,
  deleteconsult,
} from "@/api/patient";
export default {
  components: {
    TinymceEditor,
  },
  data() {
    return {
      simpleSymtomValue: "",
      simpleSymtomHideStatus: false,
      // 选项卡列表
      activeName: "1",
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
      // 就诊地址全部数据
      locallist: [],
      // 主病诊断全部数据
      impotantlist: [],
      // 证候分类全部数据
      coultlist: [],
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
    //拿到就诊地址
    this.getAllSameData0();
    //拿到主病诊断全部数据
    this.getAllSameData1();
    //拿到证候分类全部数据
    this.getAllSameData2();
    // 拿到所有的症状
    this.getsymtomlist();
    // 拿到所有的医嘱
    this.getdoctororder();
    // 拿到所有的DM
    this.getDM();
    // 拿到所有的CKD
    this.getCKD();
    // 拿到所有的风邪
    this.getfengxie();
    // 拿到所有的虚
    this.getxu();
    // 拿到所有的实
    this.getshi();
    // 拿到所有的脏腑
    this.getzangfu();
    // 拿到所有的经脉
    this.getjingmai();
    // 拿到所有的卫分
    this.getweifen();
    // 拿到所有的三焦
    this.getsanjiao();
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
    // 拿到所有的卫分
    getweifen() {
      var typeList = [22];
      var committypeList = typeList + "";
      getcommonlist(committypeList).then((res) => {
        console.log("获取卫分基本数据", res.data);
        // if ((res.data.respCode == "0000") | (res.data.respCode == "0001")) {
        //   this.$message({
        //     message: "获取虚基本数据成功",
        //     type: "success",
        //   });
        // }
        this.weifenlist = res.data.commonDataEntityList;
        console.log("this.weifenlist", this.weifenlist);
      });
    },
    // 拿到所有的三焦
    getsanjiao() {
      var typeList = [23];
      var committypeList = typeList + "";
      getcommonlist(committypeList).then((res) => {
        console.log("获取三焦基本数据", res.data);
        // if ((res.data.respCode == "0000") | (res.data.respCode == "0001")) {
        //   this.$message({
        //     message: "获取虚基本数据成功",
        //     type: "success",
        //   });
        // }
        this.sanjiaolist = res.data.commonDataEntityList;
        console.log("this.sanjiaolist", this.sanjiaolist);
      });
    },
    // 拿到所有的脏腑
    getzangfu() {
      var typeList = [20];
      var committypeList = typeList + "";
      getcommonlist(committypeList).then((res) => {
        console.log("获取脏腑基本数据", res.data);
        // if ((res.data.respCode == "0000") | (res.data.respCode == "0001")) {
        //   this.$message({
        //     message: "获取虚基本数据成功",
        //     type: "success",
        //   });
        // }
        this.zangfulist = res.data.commonDataEntityList;
        console.log("this.zangfulist", this.zangfulist);
      });
    },
    // 拿到所有的经脉
    getjingmai() {
      var typeList = [21];
      var committypeList = typeList + "";
      getcommonlist(committypeList).then((res) => {
        console.log("获取经脉基本数据", res.data);
        // if ((res.data.respCode == "0000") | (res.data.respCode == "0001")) {
        //   this.$message({
        //     message: "获取虚基本数据成功",
        //     type: "success",
        //   });
        // }
        this.jingmailist = res.data.commonDataEntityList;
        console.log("this.jingmailist", this.jingmailist);
      });
    },
    // 拿到所有的虚
    getxu() {
      var typeList = [18];
      var committypeList = typeList + "";
      getcommonlist(committypeList).then((res) => {
        console.log("获取虚基本数据", res.data);
        // if ((res.data.respCode == "0000") | (res.data.respCode == "0001")) {
        //   this.$message({
        //     message: "获取虚基本数据成功",
        //     type: "success",
        //   });
        // }
        this.xulist = res.data.commonDataEntityList;
        console.log("this.xulist", this.xulist);
      });
    },
    // 拿到所有的实
    getshi() {
      var typeList = [19];
      var committypeList = typeList + "";
      getcommonlist(committypeList).then((res) => {
        console.log("获取实基本数据", res.data);
        // if ((res.data.respCode == "0000") | (res.data.respCode == "0001")) {
        //   this.$message({
        //     message: "获取实基本数据成功",
        //     type: "success",
        //   });
        // }
        this.shilist = res.data.commonDataEntityList;
        console.log("this.shilist", this.shilist);
      });
    },
    // 拿到所有的CKD
    getCKD() {
      var typeList = [16];
      var committypeList = typeList + "";
      getcommonlist(committypeList).then((res) => {
        console.log("获取CKD基本数据", res.data);
        // if ((res.data.respCode == "0000") | (res.data.respCode == "0001")) {
        //   this.$message({
        //     message: "获取风邪基本数据成功",
        //     type: "success",
        //   });
        // }
        this.CKDlist = res.data.commonDataEntityList;
        var obj = {
          score: 0,
        };
        this.newCKDlist = this.CKDlist.map((item) => {
          return {
            ...item,
            ...obj,
          };
        });
        console.log("newCKDlist", this.newCKDlist);
      });
    },
    // 拿到所有的风邪
    getfengxie() {
      var typeList = [17];
      var committypeList = typeList + "";
      getcommonlist(committypeList).then((res) => {
        console.log("获取风邪的基本数据", res.data);
        // if ((res.data.respCode == "0000") | (res.data.respCode == "0001")) {
        //   this.$message({
        //     message: "获取CKD的基本数据成功",
        //     type: "success",
        //   });
        // }
        this.fengxielist = res.data.commonDataEntityList;
        var obj = {
          value: 0,
        };
        this.newfengxielist = this.fengxielist.map((item) => {
          return {
            ...item,
            ...obj,
          };
        });
        console.log("newfengxielist", this.newfengxielist);
      });
    },
    // 拿到所有的DM症状
    getDM() {
      var typeList = [15];
      var committypeList = typeList + "";
      getcommonlist(committypeList).then((res) => {
        console.log("获取DM的基本数据", res.data);
        // if ((res.data.respCode == "0000") | (res.data.respCode == "0001")) {
        //   this.$message({
        //     message: "获取DM的基本数据成功",
        //     type: "success",
        //   });
        // }
        this.DMlist = res.data.commonDataEntityList;

        var obj = {
          score: 0,
        };
        this.newDMlist = this.DMlist.map((item) => {
          return {
            ...item,
            ...obj,
          };
        });
        console.log("newDMlist", this.newDMlist);
      });
    },
    // 拿到所有的医嘱
    getdoctororder() {
      var typeList = [14];
      var committypeList = typeList + "";
      getcommonlist(committypeList).then((res) => {
        console.log("获取医嘱的基本数据", res.data);
        // if ((res.data.respCode == "0000") | (res.data.respCode == "0001")) {
        //   this.$message({
        //     message: "获取医嘱的基本数据成功",
        //     type: "success",
        //   });
        // }
        this.doctorcommonDataEntityList = res.data.commonDataEntityList;
      });
    },
    // 拿到所有的症状
    getsymtomlist() {
      const symtomMap = {};
      var typeList = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
      var committypeList = typeList + "";
      console.log("this.typeList", typeList);
      getcommonlist(committypeList).then((res) => {
        console.log("获取类型数据的基本数据", res.data);
        // if ((res.data.respCode == "0000") | (res.data.respCode == "0001")) {
        //   this.$message({
        //     message: "获取类型数据的基本数据成功",
        //     type: "success",
        //   });
        // }
        this.commonDataEntityList = res.data.commonDataEntityList;
        typeList.forEach((type) => {
          const sameTypeList =
            this.commonDataEntityList.filter((dataEntity) => {
              if (dataEntity.typeId.toString() === type.toString()) {
                return true;
              }
              return false;
            }) || [];

          // 设置默认分数为0
          sameTypeList.forEach((item) => {
            item.score = 0;
          });

          symtomMap[type] = sameTypeList;
        });

        typeList.forEach((type) => {
          if (symtomMap[type] && symtomMap[type].length !== 0) {
            // 给症状赋值
            this.addconsultform.symptom.symtomList.push({
              typeId: type,
              typeName: symtomMap[type][0]["typeId"],
              children: symtomMap[type], // 父子结构
            });
          }
        });

        console.log(this.addconsultform.symptom.symtomList);
      });
    },
    // 拿到就诊基本数据表数据(就诊地址)
    async getAllSameData0() {
      await getAllSameData0().then((res) => {
        console.log("获取就诊地址单一类型的全部数据", res.data);
        // 放入list
        this.locallist = res.data.commonDataEntities;
        // console.log("获取就诊地址locallist", this.locallist);
      });
    },
    // 拿到就诊基本数据表数据(主病诊断全部数据)
    async getAllSameData1() {
      await getAllSameData1().then((res) => {
        console.log("获取主病诊断全部数据", res.data);
        // 放入list
        this.impotantlist = res.data.commonDataEntities;
      });
    },
    // 拿到就诊基本数据表数据(证候分类全部数据)
    async getAllSameData2() {
      await getAllSameData2().then((res) => {
        console.log("获取证候分类全部数据", res.data);
        // 放入list
        this.coultlist = res.data.commonDataEntities;
      });
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
  },
  computed: {
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
  // display: flex;
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