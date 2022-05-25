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
              <span>{{ props.row.modifiedTime }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="患者诊次" prop="consultNum"> </el-table-column>
      <el-table-column label="就诊地点" prop="medicalLocId"> </el-table-column>
      <el-table-column label="患者就诊时间" prop="consultTime">
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
            ref="upload"
            action="http://47.104.97.211:8080/ZUNren/consultation/fileUpload?picType=1"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="files"
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
              @click="submitUpload3"
              >上传</el-button
            >
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="其他资料" :label-width="formLabelWidth">
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
            :on-preview="handlePreview1"
            :on-remove="handleRemove1"
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
          <el-input
            type="date"
            placeholder="选择就诊日期"
            v-model="addconsultform.consultTime"
            autocomplete="off"
          ></el-input>
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
          <el-select v-model="addconsultform.medicalLocId" placeholder="请选择">
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
            v-model="addconsultform.otherFeature"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="其他治疗" :label-width="formLabelWidth">
          <el-input
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
        <el-form-item label="患者ID" :label-width="formLabelWidth">
          <el-input
            v-model="addconsultform.patientId"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="处方" :label-width="formLabelWidth">
          <el-input
            v-model="addconsultform.prescription"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="脉象" :label-width="formLabelWidth">
          <el-input
            v-model="addconsultform.pulsePattern"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="治法" :label-width="formLabelWidth">
          <el-input
            v-model="addconsultform.treatment"
            autocomplete="off"
          ></el-input>
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
import {
  getPatientList,
  getpationconsult,
  addconsult,
  getAllSameData0,
  getAllSameData1,
  getAllSameData2,
} from "@/api/patient";
export default {
  name: "patientmation",
  data() {
    return {
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
        abdominalExamination: "",
        additionalInfo: "",
        auxiliaryExamination: "",
        bodyCheck: "",
        caseFeature: "",
        consultTime: "",
        createTinme: "",
        mainComplaint: "",
        mainDiseaseDiagnosisId: "",
        medicalLocId: "",
        modifiedTime: "",
        otherDiagnosisId: "",
        otherFeature: "",
        otherTreatment: "",
        outpatNum: "",
        patientId: this.$route.params.index,
        prescription: "",
        pulsePattern: "",
        status: 1,
        symptomCategoriesId: "",
        tonguePattern: "",
        treatment: "",
      },
      files1: [],
      files2: [],
      files3: [],
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
    //拿到就诊地址
    this.getAllSameData0();
    //拿到主病诊断全部数据
    this.getAllSameData1();
    //拿到证候分类全部数据
    this.getAllSameData2();
  },
  methods: {
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
      this.$refs.upload.submit();
    },
    handlePreview1(file) {
      console.log("handlePreview", file);
    },
    handleRemove1(file, fileList) {
      console.log("file, fileList", file, fileList);
    },
    // 图片上传成功后，后台返回图片的路径3
    onSuccess3: function (res) {
      console.log("onSuccess3", res);
      this.picType3 = res.picUrls;
      console.log("picType3[0]", this.picType3[0]);
      this.addconsultform.auxiliaryExamination = this.picType3[0];
      // if(res.status==200){
      // 	this.imgUrl=res.data.imgUrl;
      // }
    },
    // 点击上传图片3
    submitUpload3() {
      this.$refs.upload.submit();
    },
    handlePreview3(file) {
      console.log("handlePreview", file);
    },
    handleRemove3(file, fileList) {
      console.log("file, fileList", file, fileList);
    },
    // 新增就诊信息
    async addconsult() {
      await addconsult(this.consultqueryInfo).then((res) => {
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
            res.data.consultationEntities;
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
      console.log(newPage);
      this.consultqueryInfo.currentPage = newPage;
      console.log(`当前页: ${newPage}`);
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