<template>
  <div>
    <el-descriptions
      class="margin-top"
      title="该患者信息"
      direction="vertical"
      :column="3"
      border
    >
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
        <!-- <template slot-scope="scope">
            <span v-if="scope.row.gender == 0">男</span>
            <span v-if="scope.row.gender == 1">女</span>
          </template> -->
        <span v-if="this.patinentform.gender == 0">男</span>
        <span v-if="this.patinentform.gender == 1">女</span>
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
          <i class="el-icon-wallet"></i>
          患者身高(cm)
        </template>
        {{ patinentform.height }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-wallet"></i>
          患者体重(kg)
        </template>
        {{ patinentform.weight }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-wallet"></i>
          患者体质
        </template>
        {{ patinentform.physiqueId }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-wallet"></i>
          患者bmi指数
        </template>
        {{ patinentform.bmiIndex }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-ship"></i>
          患者出生日期
        </template>
        {{ patinentform.birthday | formatDate }}
      </el-descriptions-item>
      <!-- <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-pie-chart"></i>
          患者创建时间
        </template>
        {{ patinentform.createTinme | formatDate3 }}
      </el-descriptions-item> -->
      <!-- <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-pie-chart"></i>
          患者修改时间
        </template>
        {{ patinentform.modifiedTime | formatDate3 }}
      </el-descriptions-item> -->
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-notebook-1"></i>
          患者主诉
        </template>
        {{ patinentform.mainComplaint }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-notebook-1"></i>
          患者现病史
        </template>
        <!-- <p v-if="patinentform.curMedicalRecordList.includes(1)">糖尿病</p>
        <p v-if="patinentform.curMedicalRecordList.includes(2)">慢性肾脏病</p>
        <p v-if="patinentform.curMedicalRecordList.includes(3)">甲状腺疾病</p> -->
        <!-- {{ patinentform.curMedicalRecordList }} -->
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-notebook-1"></i>
          刻下症
        </template>
        {{ patinentform.engravedDisease }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-notebook-2"></i>
          患者既往史
        </template>
        <!-- <p v-if="patinentform.pastHistoryList.includes(1)">冠心病</p>
        <p v-if="patinentform.pastHistoryList.includes(2)">脑血管病</p>
        <p v-if="patinentform.pastHistoryList.includes(3)">高血压</p>
        <p v-if="patinentform.pastHistoryList.includes(3)">慢性肾脏病</p> -->
        <!-- {{ patinentform.pastHistoryList }} -->
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-notebook-2"></i>
          患者个人史
        </template>
        {{ personalHistorytext + patinentform.personalHistory.amount }}
        <!-- <> -->
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-notebook-2"></i>
          患者家族史
        </template>
        {{ familyHistoryListtext }}
      </el-descriptions-item>
      <!-- <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-s-flag"></i>
          患者状态
        </template>
        {{ patinentform.status }}
      </el-descriptions-item> -->
    </el-descriptions>

    <el-divider></el-divider>
    <h4 class="h3">该患者诊断信息:</h4>
    <el-button
      class="but1"
      round
      type="primary"
      size="small"
      @click="dialogFormVisible = true"
      >添加复诊</el-button
    >

    <!-- 展示患者诊断信息 -->
    <el-table :data="patientconsultData.patientconsultList" class="table1">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="主病诊断">
              <span>{{ props.row.mainDiseaseDiagnosisId }}</span>
            </el-form-item>
            <el-form-item label="证候分类">
              <span>{{ props.row.symptomCategoriesId }}</span>
            </el-form-item>
            <el-form-item label="其他诊断">
              <span>{{ props.row.otherDiagnosisId }}</span>
            </el-form-item>
            <el-form-item label="门诊号">
              <span>{{ props.row.outpatNum }}</span>
            </el-form-item>
            <el-form-item label="主述">
              <span>{{ props.row.mainComplaint }}</span>
            </el-form-item>
            <el-form-item label="病例特点">
              <span>{{ props.row.caseFeature }}</span>
            </el-form-item>
            <el-form-item label="其他">
              <span>{{ props.row.otherFeature }}</span>
            </el-form-item>
            <el-form-item label="辅助检查">
              <div>
                <el-image
                  class="block"
                  :src="props.row.auxiliaryExamination"
                ></el-image>
              </div>
              <!-- <span>
                <img :src="props.row.auxiliaryExamination" class="img"
              /></span> -->
            </el-form-item>
            <el-form-item label="其他资料">
              <div>
                <el-image
                  class="block"
                  :src="props.row.additionalInfo"
                ></el-image>
              </div>
            </el-form-item>
            <el-form-item label="舌象">
              <div>
                <el-image
                  class="block"
                  :src="props.row.tonguePattern"
                ></el-image>
              </div>
            </el-form-item>
            <el-form-item label="脉象">
              <span>{{ props.row.pulsePattern }}</span>
            </el-form-item>
            <el-form-item label="基本查体">
              <span>{{ props.row.bodyCheck }}</span>
            </el-form-item>
            <el-form-item label="腹诊">
              <span>{{ props.row.abdominalExamination }}</span>
            </el-form-item>
            <el-form-item label="治法">
              <span>{{ props.row.treatment }}</span>
            </el-form-item>
            <el-form-item label="处方">
              <span>{{ props.row.prescription }}</span>
            </el-form-item>
            <el-form-item label="其他治疗">
              <span>{{ props.row.otherTreatment }}</span>
            </el-form-item>
            <el-form-item label="修改时间">
              <span>{{ props.row.modifiedTime | formatDate3 }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="患者诊次" prop="consultNum"> </el-table-column>
      <el-table-column label="就诊地点" prop="medicalLocId"> </el-table-column>
      <el-table-column label="患者就诊时间" prop="consultTime">
        <template slot-scope="scope">
          <span>{{ scope.row.consultTime | formatDate3 }}</span>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->

    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="consultqueryInfo.currentPage"
      @size-change="handleSizeChange"
      :page-size="consultqueryInfo.pageSize"
      :page-sizes="[10, 20, 50]"
      layout="total,sizes, prev, pager, next, jumper"
      :total="patientconsultData.total"
      class="pagination"
    >
    </el-pagination>

    <!-- 新增患者就诊的弹窗 -->

    <el-dialog
      title="添加患者就诊信息"
      top="6vh"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="addconsultform">
        <el-form-item label="腹诊" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="addconsultform.abdominalExamination"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="舌象" :label-width="formLabelWidth">
          <!-- <el-input
            v-model="addconsultform.tonguePattern"
            autocomplete="off"
          ></el-input> -->
          <el-upload
            class="upload-demo"
            ref="upload3"
            action="http://47.104.97.211:8080/ZUNren/consultation/fileUpload?picType=3"
            :file-list="files3"
            :on-success="onSuccess3"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="small" type="primary"
              >选择文件</el-button
            >
            <el-button
              style="margin-left: 10px"
              size="small"
              type="success"
              @click="submitUpload3"
              >上传</el-button
            >
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="其他资料" :label-width="formLabelWidth">
          <el-upload
            class="upload-demo"
            ref="upload2"
            action="http://47.104.97.211:8080/ZUNren/consultation/fileUpload?picType=2"
            :file-list="files2"
            :on-success="onSuccess2"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="small" type="primary"
              >选择文件</el-button
            >
            <el-button
              style="margin-left: 10px"
              size="small"
              type="success"
              @click="submitUpload2"
              >上传</el-button
            >
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
          <!-- <el-input
            v-model="addconsultform.additionalInfo"
            autocomplete="off"
          ></el-input> -->
        </el-form-item>
        <el-form-item label="辅助检查" :label-width="formLabelWidth">
          <el-upload
            class="upload-demo"
            ref="upload1"
            action="http://47.104.97.211:8080/ZUNren/consultation/fileUpload?picType=1"
            :file-list="files1"
            :on-success="onSuccess1"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="small" type="primary"
              >选择文件</el-button
            >
            <el-button
              style="margin-left: 10px"
              size="small"
              type="success"
              @click="submitUpload1"
              >上传</el-button
            >
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
          <!-- <el-input
            v-model="addconsultform.auxiliaryExamination"
            autocomplete="off"
          ></el-input> -->
        </el-form-item>
        <el-form-item label="症状" :label-width="formLabelWidth">
          <!-- <el-table :data="tableData" style="width: 100%"> -->
          <el-table
            :data="symptomform"
            style="width: 100%; margin-bottom: 20px"
            row-key="id"
            border
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          >
            <el-table-column prop="id" label="id" sortable width="180">
            </el-table-column>
            <el-table-column prop="dataName" label="名称" sortable width="180">
            </el-table-column>
            <el-table-column prop="typeId" label="类型"> </el-table-column>
          </el-table>
          <!-- <el-collapse v-model="activeName" accordion>
            <el-collapse-item title="全身" name="1"> </el-collapse-item>
            <el-collapse-item title="头面" name="2"> </el-collapse-item>
            <el-collapse-item title="四肢" name="3"> </el-collapse-item>
            <el-collapse-item title="心胸" name="4"> </el-collapse-item>
            <el-collapse-item title="脘腹" name="5"> </el-collapse-item>
            <el-collapse-item title="饮食" name="6"> </el-collapse-item>
            <el-collapse-item title="睡眠" name="7"> </el-collapse-item>
            <el-collapse-item title="二便" name="8"> </el-collapse-item>
            <el-collapse-item title="生殖" name="9"> </el-collapse-item>
            <el-collapse-item title="舌" name="10"> </el-collapse-item>
            <el-collapse-item title="脉" name="11"> </el-collapse-item>
          </el-collapse> -->
        </el-form-item>
        <el-form-item label="基本查体" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="addconsultform.bodyCheck"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="病例特点" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="addconsultform.caseFeature"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="就诊时间" :label-width="formLabelWidth">
          <!-- <el-input
            type="date"
            placeholder="选择就诊日期"
            v-model="addconsultform.consultTime"
            autocomplete="off"
          ></el-input> -->
          <el-date-picker
            v-model="addconsultform.consultTime"
            type="date"
            placeholder="选择就诊日期"
          >
          </el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="创建时间" :label-width="formLabelWidth">
          <el-input
            v-model="addconsultform.createTinme"
            autocomplete="off"
          ></el-input>
        </el-form-item> -->
        <el-form-item label="主述" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="addconsultform.mainComplaint"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="主病诊断" :label-width="formLabelWidth">
          <el-select
            v-model="addconsultform.mainDiseaseDiagnosisId"
            filterable
            placeholder="请选择"
          >
            <el-option
              v-for="item in impotantlist"
              :key="item.dataCode"
              :label="item.dataName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="就诊地点" :label-width="formLabelWidth">
          <el-select
            v-model="addconsultform.medicalLocId"
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
        <el-form-item label="证候分类" :label-width="formLabelWidth">
          <el-select
            v-model="addconsultform.symptomCategoriesId"
            filterable
            placeholder="请选择"
          >
            <el-option
              v-for="item in coultlist"
              :key="item.dataCode"
              :label="item.dataName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="修改时间" :label-width="formLabelWidth">
          <el-input
            v-model="addconsultform.modifiedTime"
            autocomplete="off"
          ></el-input>
        </el-form-item> -->
        <el-form-item label="其他诊断" :label-width="formLabelWidth">
          <el-select
            v-model="addconsultform.otherDiagnosisId"
            filterable
            placeholder="请选择"
          >
            <el-option
              v-for="item in impotantlist"
              :key="item.dataCode"
              :label="item.dataName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="其他" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="addconsultform.otherFeature"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="其他治疗" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="addconsultform.otherTreatment"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="门诊号" :label-width="formLabelWidth">
          <el-input
            v-model="addconsultform.outpatNum"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="患者ID" :label-width="formLabelWidth">
          <el-input
            v-model="addconsultform.patientId"
            autocomplete="off"
          ></el-input>
        </el-form-item> -->
        <el-form-item label="处方" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="addconsultform.prescription"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="脉象" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="addconsultform.pulsePattern"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="治法" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="addconsultform.treatment"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="病位" :label-width="formLabelWidth">
          <el-cascader
            :options="options"
            :props="props"
            clearable
          ></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addconsult">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { formatDate } from "@/common/date.js";
import {
  getPatientList,
  getpationconsult,
  addconsult,
  getAllSameData0,
  getAllSameData1,
  getAllSameData2,
  getcommonlist,
} from "@/api/patient";
export default {
  name: "patientmation",
  data() {
    return {
      // 折叠框的选择
      // activeName: "1",
      //症状相应的数据
      commonDataEntityList: [],
      form3: [],
      form4: [],
      form5: [],
      form6: [],
      form7: [],
      form8: [],
      form9: [],
      form10: [],
      form11: [],
      form12: [],
      form13: [],
      // 病位4种数组表
      // 级联器多选开启
      props: { multiple: true },
      // 病位级联器选项
      options: [
        {
          value: 1,
          label: "脏腑",
          children: [
            {
              value: 2,
              label: "肝",
            },
          ],
        },
      ],
      dialogFormVisible: false,
      //新增患者就诊的弹窗表单宽度
      formLabelWidth: "120px",
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
        patientId: this.$route.params.index,
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
        symptomCategories: {},
        tonguePattern: "",
        pulsePattern: "",
        bodyCheck: "",
        abdominalExamination: "",
        mainDiseaseDiagnosisId: "",
        otherDiagnosisId: 1,
        diseaseLocation: {},
        treatment: "",
        prescription: "",
        doctorOrder: [],
        combinationTherapy: "",
        vasScore: {},
        windEvil: {},
        otherTreatment: "",
        status: 1,
        createTinme: "",
        modifiedTime: "",
      },
      files1: [],
      files2: [],
      files3: [],
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
    this.patienttotal = this.$route.params.total;
    this.queryInfo.pageSize = this.patienttotal;
    // console.log("进入patientmation");
    console.log("patienttotal", this.patienttotal);
    this.getPatientList();
    // console.log("结束getIDlist");
    this.consultqueryInfo.patientId = this.$route.params.index;
    // 患者就诊信息函数
    this.getpationconsult();
    //拿到就诊地址
    this.getAllSameData0();
    //拿到主病诊断全部数据
    this.getAllSameData1();
    //拿到证候分类全部数据
    this.getAllSameData2();
    // 拿到所有的症状
    this.getsymtomlist();
  },
  methods: {
    // 拿到所有的症状
    getsymtomlist() {
      var typeList = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] + "";
      console.log("this.typeList", this.typeList);
      getcommonlist(typeList).then((res) => {
        console.log("获取类型数据的基本数据", res.data);
        if ((res.data.respCode == "0000") | (res.data.respCode == "0001")) {
          this.$message({
            message: "获取类型数据的基本数据成功",
            type: "success",
          });
        }
        this.commonDataEntityList = res.data.commonDataEntityList;
        for (var i = 0; i < res.data.commonDataEntityList.length; i++) {
          if (res.data.commonDataEntityList[i].typeId == 3) {
            this.form3.push(res.data.commonDataEntityList[i]);
          } else if (res.data.commonDataEntityList[i].typeId == 4) {
            this.form4.push(res.data.commonDataEntityList[i]);
          } else if (res.data.commonDataEntityList[i].typeId == 5) {
            this.form5.push(res.data.commonDataEntityList[i]);
          } else if (res.data.commonDataEntityList[i].typeId == 6) {
            this.form6.push(res.data.commonDataEntityList[i]);
          } else if (res.data.commonDataEntityList[i].typeId == 7) {
            this.form7.push(res.data.commonDataEntityList[i]);
          } else if (res.data.commonDataEntityList[i].typeId == 8) {
            this.form8.push(res.data.commonDataEntityList[i]);
          } else if (res.data.commonDataEntityList[i].typeId == 9) {
            this.form9.push(res.data.commonDataEntityList[i]);
          } else if (res.data.commonDataEntityList[i].typeId == 10) {
            this.form10.push(res.data.commonDataEntityList[i]);
          } else if (res.data.commonDataEntityList[i].typeId == 11) {
            this.form11.push(res.data.commonDataEntityList[i]);
          } else if (res.data.commonDataEntityList[i].typeId == 12) {
            this.form12.push(res.data.commonDataEntityList[i]);
          } else if (res.data.commonDataEntityList[i].typeId == 13) {
            this.form13.push(res.data.commonDataEntityList[i]);
          }
        }
        console.log("form3", this.form3);
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
      await addconsult(this.addconsultform).then((res) => {
        console.log("this.consultqueryInfo", this.consultqueryInfo);
        console.log("新增患者就诊信息", res.data);
        if (res.data.respCode == "0000") {
          this.$message({
            message: "该患者就诊信息添加成功",
            type: "success",
          });
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
          this.$message({
            message: "该患者就诊信息查询成功",
            type: "success",
          });
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
          this.$message({
            message: "该患者列表查询成功",
            type: "success",
          });
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
        if (this.patientData.patientList[i].id == this.$route.params.index) {
          this.patinentform = this.patientData.patientList[i];
          console.log("该id为", this.patinentform);
        }
      }
    },
  },
  computed: {
    // 个人史信息展示
    personalHistorytext: function () {
      var xiyan = "吸烟(单位：支/每天)  :  ";
      var pijiu = "啤酒(单位：瓶/天)  :  ";
      var baijiu = "白酒(单位：两/天)  :  ";
      if (this.patinentform.personalHistory.personalType == 1) {
        return xiyan;
      } else if (this.patinentform.personalHistory.personalType == 2) {
        return baijiu;
      } else if (this.patinentform.personalHistory.personalType == 3) {
        return pijiu;
      }
    },
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
</style>