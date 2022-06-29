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
          <span>:</span>
          <div
            v-for="symtom in addconsultform.symptom.symtomList"
            :key="symtom.typeId"
          >
            <!-- <span v-if="symtom.typeName == 3">全身: </span> -->
            <el-collapse v-model="activeNames" accordion>
              <el-collapse-item
                v-if="symtom.typeName == 3"
                title="全身"
                name="1"
              >
                <div>
                  <div
                    v-for="subSymtom in symtom.children"
                    :key="symtom.typeId + '-' + subSymtom.id"
                  >
                    <span>{{ subSymtom.dataName }}</span>
                    <select class="select1" v-model="subSymtom.score">
                      <option :value="0">无</option>
                      <option :value="1">轻症</option>
                      <option :value="2">重症</option>
                    </select>
                  </div>
                </div>
              </el-collapse-item>
              <el-collapse-item
                v-if="symtom.typeName == 4"
                title="头面"
                name="2"
              >
                <div>
                  <div
                    v-for="subSymtom in symtom.children"
                    :key="symtom.typeId + '-' + subSymtom.id"
                  >
                    <span>{{ subSymtom.dataName }}</span>
                    <select class="select1" v-model="subSymtom.score">
                      <option :value="0">无</option>
                      <option :value="1">轻症</option>
                      <option :value="2">重症</option>
                    </select>
                  </div>
                </div>
              </el-collapse-item>
              <el-collapse-item
                v-if="symtom.typeName == 5"
                title="四肢"
                name="3"
              >
                <div>
                  <div
                    v-for="subSymtom in symtom.children"
                    :key="symtom.typeId + '-' + subSymtom.id"
                  >
                    <span>{{ subSymtom.dataName }}</span>
                    <select class="select1" v-model="subSymtom.score">
                      <option :value="0">无</option>
                      <option :value="1">轻症</option>
                      <option :value="2">重症</option>
                    </select>
                  </div>
                </div>
              </el-collapse-item>
              <el-collapse-item
                v-if="symtom.typeName == 6"
                title="心胸"
                name="4"
              >
                <div>
                  <div
                    v-for="subSymtom in symtom.children"
                    :key="symtom.typeId + '-' + subSymtom.id"
                  >
                    <span>{{ subSymtom.dataName }}</span>
                    <select class="select1" v-model="subSymtom.score">
                      <option :value="0">无</option>
                      <option :value="1">轻症</option>
                      <option :value="2">重症</option>
                    </select>
                  </div>
                </div>
              </el-collapse-item>
              <el-collapse-item
                v-if="symtom.typeName == 7"
                title="脘腹"
                name="5"
              >
                <div>
                  <div
                    v-for="subSymtom in symtom.children"
                    :key="symtom.typeId + '-' + subSymtom.id"
                  >
                    <span>{{ subSymtom.dataName }}</span>
                    <select class="select1" v-model="subSymtom.score">
                      <option :value="0">无</option>
                      <option :value="1">轻症</option>
                      <option :value="2">重症</option>
                    </select>
                  </div>
                </div>
              </el-collapse-item>
              <el-collapse-item
                v-if="symtom.typeName == 8"
                title="饮食"
                name="6"
              >
                <div>
                  <div
                    v-for="subSymtom in symtom.children"
                    :key="symtom.typeId + '-' + subSymtom.id"
                  >
                    <span>{{ subSymtom.dataName }}</span>
                    <select class="select1" v-model="subSymtom.score">
                      <option :value="0">无</option>
                      <option :value="1">轻症</option>
                      <option :value="2">重症</option>
                    </select>
                  </div>
                </div>
              </el-collapse-item>
              <el-collapse-item
                v-if="symtom.typeName == 9"
                title="睡眠"
                name="7"
              >
                <div>
                  <div
                    v-for="subSymtom in symtom.children"
                    :key="symtom.typeId + '-' + subSymtom.id"
                  >
                    <span>{{ subSymtom.dataName }}</span>
                    <select class="select1" v-model="subSymtom.score">
                      <option :value="0">无</option>
                      <option :value="1">轻症</option>
                      <option :value="2">重症</option>
                    </select>
                  </div>
                </div>
              </el-collapse-item>
              <el-collapse-item
                v-if="symtom.typeName == 10"
                title="二便"
                name="8"
              >
                <div>
                  <div
                    v-for="subSymtom in symtom.children"
                    :key="symtom.typeId + '-' + subSymtom.id"
                  >
                    <span>{{ subSymtom.dataName }}</span>
                    <select class="select1" v-model="subSymtom.score">
                      <option :value="0">无</option>
                      <option :value="1">轻症</option>
                      <option :value="2">重症</option>
                    </select>
                  </div>
                </div>
              </el-collapse-item>
              <el-collapse-item
                v-if="symtom.typeName == 11"
                title="生殖"
                name="9"
              >
                <div>
                  <div
                    v-for="subSymtom in symtom.children"
                    :key="symtom.typeId + '-' + subSymtom.id"
                  >
                    <span>{{ subSymtom.dataName }}</span>
                    <select class="select1" v-model="subSymtom.score">
                      <option :value="0">无</option>
                      <option :value="1">轻症</option>
                      <option :value="2">重症</option>
                    </select>
                  </div>
                </div>
              </el-collapse-item>
              <el-collapse-item
                v-if="symtom.typeName == 12"
                title="舌"
                name="10"
              >
                <div>
                  <div
                    v-for="subSymtom in symtom.children"
                    :key="symtom.typeId + '-' + subSymtom.id"
                  >
                    <span>{{ subSymtom.dataName }}</span>
                    <select class="select1" v-model="subSymtom.score">
                      <option :value="0">无</option>
                      <option :value="1">轻症</option>
                      <option :value="2">重症</option>
                    </select>
                  </div>
                </div>
              </el-collapse-item>
              <el-collapse-item
                v-if="symtom.typeName == 13"
                title="脉"
                name="11"
              >
                <div>
                  <div
                    v-for="subSymtom in symtom.children"
                    :key="symtom.typeId + '-' + subSymtom.id"
                  >
                    <span>{{ subSymtom.dataName }}</span>
                    <select class="select1" v-model="subSymtom.score">
                      <option :value="0">无</option>
                      <option :value="1">轻症</option>
                      <option :value="2">重症</option>
                    </select>
                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-form-item>
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
        <el-form-item label="DM/CKD VAS评分" :label-width="formLabelWidth">
          <el-card class="box-card" shadow="never">
            <span>最不适症状:</span>
            <el-input
              type="textarea"
              :rows="1"
              placeholder="请输入最不适症状"
              v-model="addconsultform.vasScore.worstSymptom"
              autocomplete="off"
            ></el-input>
            <span class="demonstration">最不适症状程度:</span>
            <el-slider v-model="addconsultform.vasScore.degree"></el-slider>
          </el-card>
          <el-card class="box-card" shadow="never">
            <el-collapse v-model="activeNames">
              <el-collapse-item title="DM:">
                <div v-for="item in newDMlist" :key="item.id">
                  <span class="demonstration">{{ item.dataName }}程度:</span>
                  <el-slider class="slider1" v-model="item.score"></el-slider>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-card>
          <el-card class="box-card" shadow="never">
            <el-collapse v-model="activeNames">
              <el-collapse-item title="CDK:">
                <div v-for="item in newCKDlist" :key="item.id">
                  <span class="demonstration">{{ item.dataName }}程度:</span>
                  <el-slider class="slider1" v-model="item.score"></el-slider>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-card>
          <el-card class="box-card" shadow="never">
            <span class="demonstration">生活质量:</span>
            <el-slider
              v-model="addconsultform.vasScore.lifeQuality"
            ></el-slider>
            <span class="demonstration">健康状况:</span>
            <el-slider
              v-model="addconsultform.vasScore.healthyStatus"
            ></el-slider>
          </el-card>
        </el-form-item>
        <el-form-item label="风邪" :label-width="formLabelWidth">
          <el-card class="box-card" shadow="never">
            <el-collapse v-model="activeNames">
              <el-collapse-item title="风邪（肾病填写）:">
                <div v-for="item in newfengxielist" :key="item.id">
                  <span class="demonstration">{{ item.dataName }}</span>
                  <select class="select1" v-model="item.value">
                    <option :value="0">无</option>
                    <option :value="1">轻</option>
                    <option :value="2">重</option>
                  </select>
                </div>
              </el-collapse-item>
              <el-collapse-item title="是否诊断为风邪证">
                <el-radio v-model="radio" label="1">是</el-radio>
                <el-radio v-model="radio" label="0">否</el-radio>
              </el-collapse-item>
            </el-collapse>
          </el-card>
        </el-form-item>
        <el-form-item label="辩证" :label-width="formLabelWidth">
          <span>虚：</span>
          <el-checkbox-group v-model="addconsultform.symptomCategories.empty">
            <el-checkbox
              v-for="symtom in xulist"
              :key="symtom.dataName"
              :label="symtom.dataName"
            >
            </el-checkbox>
          </el-checkbox-group>
          <span>实：</span>
          <el-checkbox-group v-model="addconsultform.symptomCategories.real">
            <el-checkbox
              v-for="symtom in shilist"
              :key="symtom.dataName"
              :label="symtom.dataName"
            >
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="基本查体" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入基本查体"
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
      //风邪证单选框
      radio: "0",
      // 折叠框的选择
      activeNames: "1",
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
      jingmai:[],

      // CKD相应数据
      fengxielist: [],
      newfengxielist: [],

      // 风邪相应数据
      CKDlist: [],
      newCKDlist: [],

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
        diseaseLocation: {},
        treatment: "",
        prescription: "",
        doctorOrder: [],
        combinationTherapy: "",
        vasScore: {
          worstSymptom: "",
          degree: 0,
          DM: [],
          CKD: [],
          lifeQuality: "",
          healthyStatus: "",
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
    this.getweifen()
    // 拿到所有的三焦
    this.getsanjiao()
  },
  methods: {
    // 拿到所有的卫分
    getweifen() {
      var typeList = [22];
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
    // 拿到所有的三焦
    getsanjiao() {
      var typeList = [23];
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
        console.log("获取脏腑基本数据", res.data);
        // if ((res.data.respCode == "0000") | (res.data.respCode == "0001")) {
        //   this.$message({
        //     message: "获取虚基本数据成功",
        //     type: "success",
        //   });
        // }
        this.jingmai = res.data.commonDataEntityList;
        console.log("this.jingmai", this.jingmai);
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
    // 拿到所有的风邪
    getfengxie() {
      var typeList = [17];
      var committypeList = typeList + "";
      getcommonlist(committypeList).then((res) => {
        console.log("获取风邪基本数据", res.data);
        // if ((res.data.respCode == "0000") | (res.data.respCode == "0001")) {
        //   this.$message({
        //     message: "获取风邪基本数据成功",
        //     type: "success",
        //   });
        // }
        this.CKDlist = res.data.commonDataEntityList;
        var obj = { score: 0 };
        this.newCKDlist = this.CKDlist.map((item) => {
          return { ...item, ...obj };
        });
        console.log("newCKDlist", this.newCKDlist);
      });
    },
    // 拿到所有的CKD
    getCKD() {
      var typeList = [16];
      var committypeList = typeList + "";
      getcommonlist(committypeList).then((res) => {
        console.log("获取CKD的基本数据", res.data);
        // if ((res.data.respCode == "0000") | (res.data.respCode == "0001")) {
        //   this.$message({
        //     message: "获取CKD的基本数据成功",
        //     type: "success",
        //   });
        // }
        this.fengxielist = res.data.commonDataEntityList;
        var obj = { value: 0 };
        this.newfengxielist = this.fengxielist.map((item) => {
          return { ...item, ...obj };
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

        var obj = { score: 0 };
        this.newDMlist = this.DMlist.map((item) => {
          return { ...item, ...obj };
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
      this.addconsultform.vasScore.DM = this.newDMlist;
      this.addconsultform.vasScore.CKD = this.newCKDlist;
      this.addconsultform.windEvil.fengxie = this.newfengxielist;
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
    // 展示typename名字
    // typeNametext: function () {
    //   var value3 = "全身";
    //   var value4 = "头面";
    //   var value5 = "四肢";
    //   var value6 = "心胸";
    //   var value7 = "脘腹";
    //   var value8 = "饮食";
    //   var value9 = "睡眠";
    //   var value10 = "二便";
    //   var value11 = "生殖";
    //   var value12 = "舌";
    //   var value13 = "脉";
    //   if (symtom.typeName == 3) {
    //     return value3;
    //   } else if (symtom.typeName == 4) {
    //     return value4;
    //   } else if (symtom.typeName == 5) {
    //     return value5;
    //   } else if (symtom.typeName == 6) {
    //     return value6;
    //   } else if (symtom.typeName == 7) {
    //     return value7;
    //   } else if (symtom.typeName == 8) {
    //     return value8;
    //   } else if (symtom.typeName == 9) {
    //     return value9;
    //   } else if (symtom.typeName == 10) {
    //     return value10;
    //   } else if (symtom.typeName == 11) {
    //     return value11;
    //   } else if (symtom.typeName == 12) {
    //     return value12;
    //   } else if (symtom.typeName == 13) {
    //     return value13;
    //   }
    // },
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
.slider1 {
  display: flex;
  margin-left: 10px;
}
.select1 {
  margin-left: 40px;
}
</style>

