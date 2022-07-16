<template>
  <div id="patient-manager">
    <el-card>
      <el-row class="patient-list-row" :gutter="20">
        <el-col :span="5">
          <el-input
            placeholder="门诊ID查询"
            size="medium"
            v-model="queryInfo.outpatientId"
            clearable
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getPatientList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="5">
          <el-input
            placeholder="患者姓名查询"
            size="medium"
            v-model="queryInfo.patientName"
            clearable
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getPatientList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="5">
          <el-input
            placeholder="手机号查询"
            size="medium"
            v-model="queryInfo.telephone"
            clearable
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getPatientList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-button v-if="0" type="primary" @click="addDialogVisible = true"
            >患者录入</el-button
          >
          <el-button type="danger" @click="Topage">快速录入</el-button>

          <!-- <el-button type="success" @click="Topage">快速录入</el-button> -->
        </el-col>
        <!-- <el-col :span="4">
          
        </el-col> -->
        <!-- <el-col :span="6">
          <el-select v-model="value" placeholder="排序方式">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col> -->
      </el-row>
      <!-- 展示患者信息 -->

      <el-table
        :data="patientData.patientList"
        border
        stripe
        style="width: 100%"
      >
        <!-- <el-table-column label="ID" width="60" prop="id"></el-table-column> -->
        <el-table-column prop="outpatientId" label="门诊号"></el-table-column>
        <el-table-column prop="patientName" label="患者姓名">
          <template slot-scope="scope">
            <router-link
              :to="{
                name: 'patientmation',
                query: { index: scope.row.id, total: patientData.total },
              }"
            >
              <el-button type="text" size="medium">{{
                scope.row.patientName
              }}</el-button>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column prop="gender" label="性别">
          <template slot-scope="scope">
            <span v-if="scope.row.gender == 0">男</span>
            <span v-if="scope.row.gender == 1">女</span>
          </template>
        </el-table-column>
        <el-table-column prop="birthday" label="出生日期">
          <template slot-scope="scope">
            <span>{{ scope.row.birthday | formatDate }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="telephone" label="手机号"></el-table-column>
        <el-table-column prop="height" label="身高"></el-table-column>
        <el-table-column prop="weight" label="体重"></el-table-column>
        <el-table-column prop="bmiIndex" label="bmi指数"></el-table-column>
        <el-table-column prop="modifiedTime" label="修改时间" width="200px">
          <template slot-scope="scope">
            <span>{{ scope.row.modifiedTime | formatDate3 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280">
          <template slot-scope="scope">
            <el-button
              type="warning"
              size="small"
              @click="gotoDetail(scope.row.id, patientData.total)"
              >详情</el-button
            >
            <el-button
              type="primary"
              size="small"
              @click="showpatientEditDialog(scope.row.id)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="small"
              @click="removePatientById(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->

      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="queryInfo.currentPage"
        @size-change="handleSizeChange"
        :page-size="queryInfo.pageSize"
        :page-sizes="[10, 20, 50]"
        layout="total,sizes, prev, pager, next, jumper"
        :total="this.patientData.total"
      >
      </el-pagination>
    </el-card>

    <!-- 显示弹框组件 -->
    <!-- <patient-info
      :dialogVisible="dialogVisible"
      :datalist="this.patientData.patientList"
      @changeDialog="changeDialog"
    /> -->
    <!-- <patient-info ref="dialog" /> -->
    <!-- 添加患者对话框 -->
    <el-dialog
      title="添加患者"
      :visible.sync="addDialogVisible"
      top="6vh"
      width="800px"
    >
      <!-- @close="addDislogClosed" -->
      <!-- 内容主题区域 -->
      <div class="dialog-content">
        <el-form
          class="medical-form"
          label-width="80px"
          label-position="top"
          size="medium"
          ref="addForm"
          :model="addForm"
          :rules="addRules"
        >
          <el-row>
            <el-col :span="12">
              <div class="grid-content">
                <el-form-item label="患者门诊ID" prop="outpatientId">
                  <el-input
                    class="input-style"
                    v-model="addForm.outpatientId"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content">
                <el-form-item label="患者姓名" prop="patientName">
                  <el-input
                    class="input-style"
                    v-model="addForm.patientName"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content">
                <el-form-item label="性别">
                  <el-select
                    class="input-style"
                    v-model="addForm.gender"
                    placeholder="请选择性别"
                  >
                    <el-option label="男" value="0"></el-option>
                    <el-option label="女" value="1"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content">
                <el-form-item label="出生日期">
                  <el-date-picker
                    class="input-style"
                    v-model="addForm.birthday"
                    type="date"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content">
                <el-form-item label="身高">
                  <el-input
                    class="input-style"
                    type="number"
                    v-model="addForm.height"
                    placeholder="单位：cm"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content">
                <el-form-item label="体重">
                  <el-input
                    class="input-style"
                    type="number"
                    v-model="addForm.weight"
                    placeholder="单位：kg"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content">
                <el-form-item label="体质">
                  <el-input
                    class="input-style"
                    type="number"
                    v-model="addForm.physiqueId"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content">
                <el-form-item label="联系方式" prop="telephone">
                  <el-input
                    class="input-style"
                    v-model="addForm.telephone"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content">
                <el-form-item label="身份证号">
                  <el-input
                    class="input-style"
                    v-model="addForm.idCard"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-form-item label="主述">
            <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入内容"
              v-model="addForm.mainComplaint"
            ></el-input>
          </el-form-item>
          <!-- <span class="block-title">现病史</span> -->
          <el-form-item label="现病史">
            <el-card shadow="never">
              <span class="block-title">西医诊断及病程</span>
              <el-radio-group
                v-model="addForm.curMedicalRecord.Westernmedicine.list"
              >
                <el-radio
                  v-for="item in WesternmedicineOptions"
                  :label="item.id"
                  :key="item.id"
                  >{{ item.dataName }}
                </el-radio>
              </el-radio-group>
              <span class="block-title">确诊时间</span>
              <div>
                <el-date-picker
                  class="input-style"
                  v-model="addForm.curMedicalRecord.confirmTime.time"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </div>
              <span class="block-title">糖尿病并发症</span>
              <el-checkbox-group
                v-model="addForm.curMedicalRecord.DMcomplications.list"
              >
                <el-checkbox
                  v-for="item in DMcomplicationsOptions"
                  :key="item.id"
                  :label="item.id"
                  >{{ item.dataName }}
                </el-checkbox>
              </el-checkbox-group>
              <span class="block-title">慢性肾脏病病因</span>
              <el-checkbox-group
                v-model="addForm.curMedicalRecord.CKDreason.list"
              >
                <el-checkbox
                  v-for="item in CKDreasonOptions"
                  :label="item.id"
                  :key="item.id"
                  >{{ item.dataName }}
                </el-checkbox>
              </el-checkbox-group>
            </el-card>
          </el-form-item>
          <el-form-item label="既往史">
            <el-checkbox-group v-model="addForm.pastHistoryList">
              <el-checkbox
                v-for="item in pastHistoryListOptions"
                :label="item.id"
                :key="item.id"
                >{{ item.dataName }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="个人史">
            <el-row>
              <el-col :span="8">
                <div class="block-title">吸烟数量（支/天）</div>
                <el-input-number
                  v-model="addForm.personalHistory.smoke.amount"
                  :max="50"
                  :min="0"
                  controls-position="right"
                ></el-input-number>
              </el-col>
              <el-col :span="8">
                <div class="block-title">啤酒数量（瓶/天）</div>
                <el-input-number
                  v-model="addForm.personalHistory.beer.amount"
                  :max="50"
                  :min="0"
                  controls-position="right"
                ></el-input-number>
              </el-col>
              <el-col :span="8">
                <div class="block-title">白酒数量（两/天）</div>
                <el-input-number
                  v-model="addForm.personalHistory.whiteWine.amount"
                  :max="50"
                  :min="0"
                  controls-position="right"
                ></el-input-number>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="家族史">
            <el-checkbox-group v-model="addForm.familyHistoryList">
              <el-checkbox
                v-for="item in familyHistoryListOptions"
                :label="item.id"
                :key="item.id"
                >{{ item.dataName }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="过敏史">
            <el-input
              :rows="5"
              placeholder="请输入内容"
              auto-complete=""
              v-model="addForm.allergyHistory"
              type="textarea"
            >
            </el-input>
          </el-form-item>
          <!-- <el-form-item label="刻下症">
            <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="addForm.engravedDisease"></el-input>
          </el-form-item> -->
        </el-form>
      </div>

      <!-- 底部按钮区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addPatient">确 定</el-button>
      </span>
    </el-dialog>

    <!-- <el-dialog
      title="详细信息"
      :visible.sync="editdialogVisible"
      width="70%" -->
    <!-- > -->
    <!-- 内容区域 -->
    <!-- <span>展示历次患者诊断信息</span> -->

    <!-- 弹框底部区域 -->
    <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="editdialogVisible = false">退出</el-button>
        <el-button type="primary" @click="addrepatient">添加复诊信息</el-button>
      </span>
    </el-dialog> -->

    <!--修改患者的对话框  -->
    <!-- :visible.sync表示属性绑定，表示对话框的显示与隐藏 -->
    <el-dialog
      top="6vh"
      title="修改患者信息"
      :visible.sync="editDialogVisible"
      width="800px"
      @close="editDialogClosed"
    >
      <div class="dialog-content">
        <el-form
          class="medical-form"
          label-width="80px"
          label-position="top"
          size="medium"
          :model="patinenteditform"
          ref="editFormRef"
        >
          <el-row>
            <el-col :span="12">
              <div class="grid-content">
                <el-form-item class="input-style" label="患者门诊ID">
                  <el-input
                    v-model="patinenteditform.outpatientId"
                    disabled
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content">
                <el-form-item class="input-style" label="姓名">
                  <el-input
                    v-model="patinenteditform.patientName"
                    disabled
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content">
                <el-form-item class="input-style" label="身份证号">
                  <el-input
                    v-model="patinenteditform.idCard"
                    disabled
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content">
                <el-form-item class="input-style" label="手机号">
                  <el-input v-model="patinenteditform.telephone"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content">
                <el-form-item class="input-style" label="身高">
                  <el-input
                    type="number"
                    v-model="patinenteditform.height"
                    placeholder="单位：cm"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content">
                <el-form-item class="input-style" label="体重">
                  <el-input
                    type="number"
                    v-model="patinenteditform.weight"
                    placeholder="单位：kg"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-form-item label="主述">
            <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入内容"
              v-model="patinenteditform.mainComplaint"
            ></el-input>
          </el-form-item>
          <!-- <span style="font-weight: bold">现病史</span> -->
          <el-form-item label="现病史">
            <el-card shadow="never">
              <span class="block-title">西医诊断及病程</span>
              <el-radio-group
                v-model="patinenteditform.curMedicalRecord.Westernmedicine.list"
              >
                <el-radio
                  v-for="item in WesternmedicineOptions"
                  :label="item.id"
                  :key="item.id"
                  >{{ item.dataName }}
                </el-radio>
              </el-radio-group>
              <span class="block-title">确诊时间</span>
              <div>
                <el-date-picker
                  class="input-style"
                  v-model="patinenteditform.curMedicalRecord.confirmTime.time"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </div>
              <span class="block-title">糖尿病并发症</span>
              <el-checkbox-group
                v-model="patinenteditform.curMedicalRecord.DMcomplications.list"
              >
                <el-checkbox
                  v-for="item in DMcomplicationsOptions"
                  :key="item.id"
                  :label="item.id"
                  >{{ item.dataName }}
                </el-checkbox>
              </el-checkbox-group>
              <span class="block-title">慢性肾脏病病因</span>
              <el-checkbox-group
                v-model="patinenteditform.curMedicalRecord.CKDreason.list"
              >
                <el-checkbox
                  v-for="item in CKDreasonOptions"
                  :label="item.id"
                  :key="item.id"
                  >{{ item.dataName }}
                </el-checkbox>
              </el-checkbox-group>
            </el-card>
          </el-form-item>
          <el-form-item label="既往史">
            <el-checkbox-group v-model="patinenteditform.pastHistoryList">
              <el-checkbox
                v-for="item in pastHistoryListOptions"
                :label="item.id"
                :key="item.id"
                >{{ item.dataName }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="个人史">
            <el-row>
              <el-col :span="8">
                <div class="block-title">吸烟数量（支/天）</div>
                <el-input-number
                  v-model="patinenteditform.personalHistory.smoke.amount"
                  :max="50"
                  :min="0"
                  controls-position="right"
                ></el-input-number>
              </el-col>
              <el-col :span="8">
                <div class="block-title">啤酒数量（瓶/天）</div>
                <el-input-number
                  v-model="patinenteditform.personalHistory.beer.amount"
                  :max="50"
                  :min="0"
                  controls-position="right"
                ></el-input-number>
              </el-col>
              <el-col :span="8">
                <div class="block-title">白酒数量（两/天）</div>
                <el-input-number
                  v-model="patinenteditform.personalHistory.whiteWine.amount"
                  :max="50"
                  :min="0"
                  controls-position="right"
                ></el-input-number>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="家族史">
            <el-checkbox-group v-model="patinenteditform.familyHistoryList">
              <el-checkbox
                v-for="item in familyHistoryListOptions"
                :label="item.id"
                :key="item.id"
                >{{ item.dataName }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="过敏史">
            <el-input
              :rows="5"
              placeholder="请输入内容"
              auto-complete=""
              v-model="patinenteditform.allergyHistory"
              type="textarea"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item label="刻下症">
          <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="patinenteditform.engravedDisease">
          </el-input>
        </el-form-item> -->
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editPatientSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { formatDate } from "@/common/date.js";
// import patientInfo from "./patientInfo.vue";

import {
  addPatient,
  getPatientList,
  patientDelete,
  patientUpdate,
  // getAllSameData,
  getcommonlist,
} from "@/api/patient";

export default {
  // components: {
  //   patientInfo,
  // },
  name: "patient",
  data() {
    const validatePhone = (rule, value, cb) => {
      let regphone =
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (regphone.test(value)) {
        return cb();
      }
      cb(new Error("请输入合法的手机号"));
    };
    return {
      addRules: {
        patientName: [
          { required: true, message: "请输入患者姓名", trigger: "blur" },
        ],
        telephone: [
          { required: true, message: "请输入患者手机号", trigger: "blur" },
          {
            validator: validatePhone,
            message: "请输入正确的手机号",
            trigger: "blur",
          },
        ],
        outpatientId: [
          { required: true, message: "请输入患者门诊号", trigger: "blur" },
        ],
        // password: [
        //   { required: true, message: "请输入密码", trigger: "blur" },
        //   {
        //     min: 3,
        //     max: 15,
        //     message: "长度在 3 到 15 个字符",
        //     trigger: "blur",
        //   },
        // ],
      },
      //新增患者的标签宽度
      formLabelWidth: "120px",
      // 当前时间
      nowTime: "",

      // 用于保存scope.row.id
      constid: "",
      //患者删除的form
      patientdeleteform: {
        id: "",
      },

      editDialogVisible: false,
      // editdialogVisible: false,
      dialogVisible: false,
      addDialogVisible: false,
      // 获取用户列表的参数对象
      queryInfo: {
        outpatientId: "",
        patientName: "",
        telephone: "",
        // 搜索值
        searchParm: "",
        //排序依据字段
        orderColumns: "id",
        orderType: "DESC",
        // 当前的页数
        currentPage: 1,
        // 当前每次显示多少条数据
        pageSize: 10,
      },
      // 存放用户的数据和数量
      patientData: {
        patientList: [],
        total: 0,
      },

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
      // 开启多选
      props: {
        multiple: true,
      },
      // 家族史多选
      // familyHistoryListOptions: [
      //   {
      //     key: "0",
      //     label:  "糖尿病",
      //    },
      //   {
      //     key: "1",
      //     label: "高血压",
      //   },
      //   {
      //     key: "2",
      //     label: "冠心病",
      //   },
      //   ],
      familyHistoryListOptions: [],
      // 既往史多选
      //     pastHistoryListOptions: [
      //       {
      //         key: "0",
      //         label:  "冠心病",
      //        },
      //       {
      //         key: "1",
      //         label:  "脑血管病",
      //       },
      //       {
      //         key: "2",
      //         label: "高血压",
      //       },
      //       {
      //         key: "3",
      //         label: "慢性肾脏病",
      //       },
      //  ],
      //既往史选择的数据
      pastHistoryListOptions: [],
      //现病史选择的数据
      //curMedicalRecordListOptions: [],
      WesternmedicineOptions: [],
      DMcomplicationsOptions: [],
      CKDreasonOptions: [],
      // 添加用户数据的对象
      addForm: {
        birthday: "",
        createTinme: "",
        curMedicalRecord: {
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
        // personalHistory:{

        //    personalType: "1",
        //    amount: 0,

        //    personalType: "3",
        //    amount: 0,

        //    personalType: "2",
        //    amount: 0,

        // },
        outpatientId: "",
        status: 1,
        telephone: "",
        allergyHistory: "",
        height: "",
        physiqueId: 1,
        weight: "",
      },
      // 查询到的用户信息对象
      // patinenteditform: {
      //   birthday: "",
      //   createTinme: "",
      //   engravedDisease: "",
      //   mainComplaint: "",
      //   modifiedTime: "",
      //   status: 1,
      //   id: "",
      //   patientName: "",
      //   gender: "",
      //   idCard: "",
      //   telephone: "",
      //   curMedicalRecord: "",
      //   familyHistory: "",
      //   pastHistory: "",
      //   personalHistory: "",
      // },
      patinenteditform: {
        birthday: "",
        createTinme: "",
        curMedicalRecord: {
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
        outpatientId: "",
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
        physiqueId: 1,
        weight: "",
      },
    };
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    },
    formatDate3(time) {
      let date = new Date(time);
      // return formatDate(date, "yyyy年MM月dd日 hh:mm:ss");
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
  },
  created() {
    this.getPatientList();
    //拿到主病诊断全部数据
    // this.getAllSameData();
    // 拿到所有的既往史选项
    this.getPasthistoryList();
    // 拿到所有的家族史选项
    this.getFamilyhistoryList();
    // 拿到所有的现病史西医诊断选项
    this.getWesternmedicineList();
    // 拿到所有的现病史糖尿病并发症选项
    this.getDMcomplicationsList();
    // 拿到所有的现病史慢性肾脏病病因选项
    this.getCKDreasonList();
  },
  methods: {
    // 快速增加跳转页面
    Topage() {
      this.$router.push("/quickadd");
    },
    // 拿到所有的现病史西医诊断选项
    getWesternmedicineList() {
      var typeList = [1];
      var committypeList = typeList + "";
      getcommonlist(committypeList).then((res) => {
        //console.log("获取病症的基本数据", res.data);
        // if ((res.data.respCode == "0000") | (res.data.respCode == "0001")) {
        //   this.$message({
        //     message: "获取医嘱的基本数据成功",
        //     type: "success",
        //   });
        // }
        // this.curMedicalRecordListOptions = res.data.commonDataEntityList;
        this.WesternmedicineOptions = res.data.commonDataEntityList;
      });
    },
    // 拿到所有的现病史糖尿病并发症选项
    getDMcomplicationsList() {
      var typeList = [1];
      var committypeList = typeList + "";
      getcommonlist(committypeList).then((res) => {
        //console.log("获取病症的基本数据", res.data);
        // if ((res.data.respCode == "0000") | (res.data.respCode == "0001")) {
        //   this.$message({
        //     message: "获取医嘱的基本数据成功",
        //     type: "success",
        //   });
        // }
        // this.curMedicalRecordListOptions = res.data.commonDataEntityList;
        this.DMcomplicationsOptions = res.data.commonDataEntityList;
        this.CKDreasonOptions = res.data.commonDataEntityList;
      });
    },
    // 拿到所有的现病史慢性肾脏病病因选项
    getCKDreasonList() {
      var typeList = [1];
      var committypeList = typeList + "";
      getcommonlist(committypeList).then((res) => {
        //console.log("获取病症的基本数据", res.data);
        // if ((res.data.respCode == "0000") | (res.data.respCode == "0001")) {
        //   this.$message({
        //     message: "获取医嘱的基本数据成功",
        //     type: "success",
        //   });
        // }
        // this.curMedicalRecordListOptions = res.data.commonDataEntityList;
        this.CKDreasonOptions = res.data.commonDataEntityList;
      });
    },
    // 拿到所有的既往史数据
    getPasthistoryList() {
      var typeList = [1];
      var committypeList = typeList + "";
      getcommonlist(committypeList).then((res) => {
        console.log("获取病症的基本数据", res.data);
        // if ((res.data.respCode == "0000") | (res.data.respCode == "0001")) {
        //   this.$message({
        //     message: "获取医嘱的基本数据成功",
        //     type: "success",
        //   });
        // }
        this.pastHistoryListOptions = res.data.commonDataEntityList;
      });
    },
    // 拿到所有的家族数据
    getFamilyhistoryList() {
      var typeList = [1];
      var committypeList = typeList + "";
      getcommonlist(committypeList).then((res) => {
        //console.log("获取病症的基本数据", res.data);
        // if ((res.data.respCode == "0000") | (res.data.respCode == "0001")) {
        //   this.$message({
        //     message: "获取医嘱的基本数据成功",
        //     type: "success",
        //   });
        // }
        this.familyHistoryListOptions = res.data.commonDataEntityList;
      });
    },
    //获取患者信息列表
    getPatientList() {
      // const { data: res } = await this.$http.get('users', {
      //   params: this.queryInfo
      // })
      getPatientList(this.queryInfo).then((res) => {
        console.log("获取患者列表", res.data);
        if (res.data.respCode == "0000") {
          // this.$message({
          //   message: "患者列表查询成功",
          //   type: "success",
          // });
        }
        this.patientData.patientList = res.data.patientDtoList;
        this.patientData.total = res.data.totalCount;
        console.log("总数", this.patientData.total);
        // this.patientData.totalPage = res.data.totalPage;
        // console.log("总页数", this.patientData.totalPage);
      });

      // if (res.meta.status !== 200) {
      //   this.$message.error('获取用户列表失败!')
      // }
      // this.$message.success('获取用户列表成功!')
      // this.userData.userList = res.data.users
      // this.userData.total = res.data.total
      // console.log(res)
    },
    // 监听 pagesize 改变事件 每页显示的个数
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.pageSize = newSize;
      this.getPatientList();
    },
    // 监听 页码值 改变的事件 当前页面值
    handleCurrentChange(newPage) {
      console.log(newPage);
      this.queryInfo.currentPage = newPage;
      console.log(`当前页: ${newPage}`);
      this.getPatientList();
    },
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
    // 点击按钮,添加新患者
    addPatient() {
      // console.log("获取输入的信息", this.addForm);
      // addPatient(this.addForm).then((res) => {
      //   console.log("添加实现", res);
      // });

      // 隐藏添加用户的对话框
      //   this.addDialogVisible = false;
      //   // 添加成后重新获取用户数据,不需要用户手动刷新
      //   this.getPatientList();
      //   //清空表单数据
      //   this.addForm = "";
      //   return this.$message.success("用户添加成功了~");
      //   // }
      // },
      // addDislogClosed() {
      //   this.$refs.addForm.resetFields();
      // },

      // 获取时间
      this.nowTime = new Date().valueOf();
      // console.log("nowTime", this.nowTime);
      this.addForm.createTinme = this.nowTime;
      this.addForm.modifiedTime = this.nowTime;
      console.log("打印this.addForm", this.addForm);
      addPatient(this.addForm).then((res) => {
        console.log("添加实现的res", res);

        if (res.data.respCode == "0000") {
          // this.$message({
          //   message: "用户添加成功",
          //   type: "success",
          // });
          this.addForm = {
            birthday: "",
            createTinme: "",
            curMedicalRecord: {
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
            physiqueId: 1,
            weight: "",
          };
          this.addDialogVisible = false;
          this.getPatientList();
        }
        // this.addForm = {
        //   birthday: "",
        //   createTinme: "",
        //   curMedicalRecord: "",
        //   engravedDisease: "",
        //   mainComplaint: "",
        //   familyHistory: "",
        //   gender: "",
        //   idCard: "",
        //   modifiedTime: "",
        //   pastHistory: "",
        //   patientName: "",
        //   personalHistory: "",
        //   status: 1,
        //   telephone: "",
        // };
        if (res.data.respCode == "0001") {
          this.$message({
            message: "患者已存在",
            type: "warning",
          });
          this.addDialogVisible = false;
          this.getPatientList();
        }
      });
    },

    // 提交修改患者
    editPatientSubmit() {
      this.nowTime = new Date().valueOf();
      this.patinenteditform.modifiedTime = this.nowTime;
      console.log("打印this.patinenteditform", this.patinenteditform);
      patientUpdate(this.patinenteditform).then((response) => {
        console.log("editUserInfo的response", response);
        if (response.data.respCode == "0000") {
          this.$message({
            message: "用户更新成功",
            type: "success",
          });
          this.patinenteditform = {
            birthday: "",
            createTinme: "",
            curMedicalRecord: {
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
            physiqueId: 1,
            weight: "",
          };
          this.editDialogVisible = false;
          this.getPatientList();
        }
      });
    },

    // 根据id删除对应的患者信息
    async removePatientById(id) {
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        "此操作将永久删除该患者, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => {
        return err;
      });
      // 如果用户确认删除，则返回值为字符串confirm
      // 如果用户取消删除，则返回值为字符串cancel
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除");
      }
      this.patientdeleteform.id = id;
      console.log("patientdeleteform的id", this.patientdeleteform.id);
      patientDelete(this.patientdeleteform).then((response) => {
        console.log("patientdeleteform的response", response);
        if (response.data.respCode == "0000") {
          return this.$message.success("删除患者成功！");
        } else {
          this.$message.error("删除患者失败！");
        }
      });
      // console.log("删除");
      // 删除后更新列表
      this.getPatientList();
    },
    // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
    // 展示编辑患者的对话框
    showpatientEditDialog(constid) {
      for (var i = 0; i < this.patientData.patientList.length; i++) {
        if (this.patientData.patientList[i].id == constid) {
          this.patinenteditform.id = this.patientData.patientList[i].id;
          this.patinenteditform = this.patientData.patientList[i];
          console.log("该id为", this.patinenteditform);
          this.editDialogVisible = true;
        }
      }
    },
    gotoDetail(id, total) {
      this.$router.push({
        name: "patientmation",
        query: { index: id, total: total },
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
  margin-bottom: 30px;
}

.tag1 {
  margin-right: 20px;
}

.div1 {
  margin-top: 10px;
  margin-bottom: 10px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.input-style {
  width: 300px;
}

.input-style-mainComplaint {
  width: 620px;
}

.font1 {
  font-weight: bold;
}
</style>
