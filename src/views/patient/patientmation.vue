<template>
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

    <el-descriptions
      class="margin-top"
      title="该患者信息"
      direction="vertical"
      :column="3"
      border
    >
      <!-- <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-s-check"></i>
          患者ID
        </template>
        {{ patinentform.id }}
      </el-descriptions-item> -->
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
        西医诊断及病程:
        {{ manshenlist[patinentform.curMedicalRecord.Westernmedicine.list] }}
        <h1></h1>
        确诊时间:
        {{ patinentform.curMedicalRecord.confirmTime.time | formatDate }}
        <h1></h1>
        糖尿病并发症:
        {{ manshenlist[patinentform.curMedicalRecord.DMcomplications.list[0]] }}
        <h1></h1>
        慢性肾脏病病因:
        {{ manshenlist[patinentform.curMedicalRecord.CKDreason.list[0]] }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-notebook-2"></i>
          患者既往史
        </template>
        <!-- {{ patinentform.pastHistoryList }} -->
        高血压

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
        吸烟数量（支/天）:
        {{ patinentform.personalHistory.smoke.amount }}
        啤酒数量（瓶/天）:
        {{ patinentform.personalHistory.beer.amount }}
        白酒数量（两/天）:
        {{ patinentform.personalHistory.whiteWine.amount }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-notebook-2"></i>
          患者家族史
        </template>
        <!-- {{ patinentform.familyHistoryList }} -->
        脑血管病
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-notebook-1"></i>
          过敏史
        </template>
        {{ patinentform.allergyHistory }}
      </el-descriptions-item>

      <!-- <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-notebook-1"></i>
          刻下症
        </template>
        {{ patinentform.engravedDisease }}
      </el-descriptions-item> -->
      <!-- <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-s-flag"></i>
          患者状态
        </template>
        {{ patinentform.status }}
      </el-descriptions-item> -->
    </el-descriptions>

    <h4 class="h3">该患者诊断信息:</h4>
    <el-button class="but1" round type="primary" size="small" @click="gopage"
      >添加复诊</el-button
    >

    <!-- 展示患者诊断信息 -->
    <!-- <el-descriptions
      class="margin-top"
      title="无边框列表"
      :column="3"
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
    <el-table
      :data="patientconsultData.patientconsultList"
      class="table1"
      stripe
      style="width: 90%"
    >
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
            <el-button
              type="primary"
              size="small"
              @click="gotoDetail(scope.row.id)"
              >详情</el-button
            >
            <el-button
              type="danger"
              size="small"
              @click="deleteconsult(scope.row.id)"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 注释掉了原来的复诊信息列表 -->
    <el-table
      v-if="0"
      :data="patientconsultData.patientconsultList"
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
          <span>{{ scope.row.consultTime | formatDate3 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div>
            <el-button type="danger" @click="deleteconsult(scope.row.id)"
              >删除</el-button
            >
          </div>
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
    <!-- 注释掉了原来的新增患者就诊的弹窗,换为新的添加复诊页面 -->
    <el-dialog
      v-if="0"
      title="添加患者就诊信息"
      top="5vh"
      :visible.sync="dialogFormVisible"
      width="1000px"
    >
      <!-- <TinymceEditor /> -->
      <div class="dialog-content">
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
          <el-row>
            <el-col :span="8">
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
            </el-col>
            <el-col :span="8">
              <el-form-item label="就诊时间" :label-width="formLabelWidth">
                <el-date-picker
                  v-model="addconsultform.consultTime"
                  style="width: 240px"
                  type="date"
                  placeholder="选择就诊日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="门诊号" :label-width="formLabelWidth">
                <el-input
                  v-model="addconsultform.outpatNum"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="辅助检查" :label-width="formLabelWidth">
            <el-upload
              class="upload-demo"
              ref="upload1"
              action="/consultation/fileUpload?picType=1"
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
                            <el-option :value="1" label="轻症"></el-option>
                            <el-option :value="2" label="重症"></el-option>
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
                        <el-option :value="1" label="轻症"></el-option>
                        <el-option :value="2" label="重症"></el-option>
                      </el-select>
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
                    <el-slider class="slider1" v-model="item.score"></el-slider>
                  </el-col>
                </div>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8">
                  <span class="block-title">生活质量:</span>
                  <el-slider
                    v-model="addconsultform.vasScore.lifeQuality"
                    class="slider1"
                  ></el-slider>
                </el-col>
                <el-col :span="8">
                  <span class="block-title">健康状况:</span>
                  <el-slider
                    v-model="addconsultform.vasScore.healthyStatus"
                    class="slider1"
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
                      <el-option :value="1" label="轻症"></el-option>
                      <el-option :value="2" label="重症"></el-option>
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
          <el-form-item label="病位" :label-width="formLabelWidth">
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
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addconsult">确 定</el-button>
      </div>
    </el-dialog>
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
  name: "patientmation",
  components: {
    TinymceEditor,
  },
  data() {
    return {
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
    // 存储患者id参数
    this.refid = this.$route.query.index;
    this.patienttotal = this.$route.query.total;
    this.queryInfo.pageSize = this.patienttotal;
    // console.log("进入patientmation");
    console.log("patienttotal", this.patienttotal);
    this.getPatientList();
    // console.log("结束getIDlist");
    this.consultqueryInfo.patientId = this.$route.query.index;
    this.addconsultform.patientId = this.$route.query.index;
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
    // 跳转详情页面
    gotoDetail(id) {
      this.$router.push({
        name: "consultmation",
        query: { consultationId: id, patientId: this.refid },
      });
    },
    // 跳转新增就诊页面
    gopage() {
      this.$router.push("/addconsultation");
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