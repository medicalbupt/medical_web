<template>
  <div>
    <div class="submit-footer">
      <el-button v-if="isEdit === 0" type="primary" :loading="loading || submiting" @click="save">提交录入</el-button>
      <el-button v-if="isEdit === 1" type="primary" :loading="loading || submiting" @click="submitEdit()">保存</el-button>
      <el-button v-if="isEdit === 2" type="primary" :loading="loading || submiting" @click="submitEdit()">保存复诊</el-button>
    </div>
    <el-tabs v-model="activeName" v-loading="loading" class="border-card" type="border-card">
      <el-tab-pane label="基本信息" name="1">
        <el-card class="box-card">
          <div class="dialog-content">
            <el-form class="medical-form" label-width="80px" label-position="top" size="medium" ref="addFormRef"
              :model="addForm" :rules="addRules">
              <el-row :gutter="20">
                <el-col :span="7">
                  <div class="grid-content">
                    <el-form-item label="患者姓名" prop="patientName">
                      <el-input class="input-style readonly" :disabled="isAddComsultation" v-model="addForm.patientName"></el-input>
                    </el-form-item>
                  </div>
                </el-col>

                <el-col :span="7">
                  <div class="grid-content">
                    <el-form-item label="患者手机号" prop="telephone">
                      <el-input class="input-style readonly" :disabled="isAddComsultation" v-model="addForm.telephone"></el-input>
                    </el-form-item>
                  </div>
                </el-col>

                <el-col :span="7">
                  <div class="grid-content">
                    <el-form-item label="性别">
                      <el-select class="input-style readonly" :disabled="isAddComsultation" v-model="addForm.gender" placeholder="请选择性别">
                        <el-option label="男" :value="0"></el-option>
                        <el-option label="女" :value="1"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="7">
                  <div class="grid-content">
                    <el-form-item label="出生日期">
                      <el-date-picker class="input-style readonly" :disabled="isAddComsultation" v-model="addForm.birthday" type="date" placeholder="选择日期">
                      </el-date-picker>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="7">
                  <div class="grid-content">
                    <el-form-item label="年龄">
                      <el-input class="input-style readonly" :disabled="isAddComsultation" v-model="addForm.age"></el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <!-- <el-col :span="18">
              <div class="grid-content">
                <el-form-item label="ID号">
                  <el-input
                    class="input-style readonly" :disabled="isAddComsultation"
                    v-model="addForm.outpatientId"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col> -->
                <el-col :span="7">
                  <div class="grid-content">
                    <el-form-item label="门诊id" prop="outpatientId">
                      <el-input class="input-style readonly" :disabled="isAddComsultation" v-model="addForm.outpatientId"></el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="7">
                  <div class="grid-content">
                    <el-form-item label="身份证号">
                      <el-input class="input-style readonly" :disabled="isAddComsultation" v-model="addForm.idCard"></el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="7">
                  <div class="grid-content">
                    <el-form-item label="身高">
                      <el-input class="input-style readonly" :disabled="isAddComsultation" type="number" v-model="addForm.height" placeholder="单位：cm">
                      </el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="7">
                  <div class="grid-content">
                    <el-form-item label="体重">
                      <el-input class="input-style readonly" :disabled="isAddComsultation" type="number" v-model="addForm.weight" placeholder="单位：kg"
                        @change="bmishow">
                      </el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="7">
                  <div class="grid-content">
                    <el-form-item label="患者bmi指数">
                      <el-input class="input-style readonly" :disabled="true" v-model="bmidata">
                      </el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="就诊地点" :label-width="formLabelWidth">
                    <el-select v-model="addForm.medicalLocId" class="input-style" filterable placeholder="请选择">
                      <el-option v-for="item in locallist" :key="item.dataCode" :label="item.dataName" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="就诊时间" :label-width="formLabelWidth">
                    <el-date-picker v-model="addForm.consultTime" class="input-style" type="date" placeholder="选择就诊日期">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="疾病资料" name="2">
        <el-card class="box-card">
          <div class="dialog-content">
            <el-form class="medical-form" label-width="80px" label-position="top" size="medium" ref="addFormRef"
              :model="addForm">
              <el-form-item label="主述">
                <el-input type="textarea" :rows="1" placeholder="请输入内容" v-model="addForm.mainlyComplaint"></el-input>
              </el-form-item>
              <el-form-item label="现病史">
                <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="addForm.curMedicalRecord.currentText">
                </el-input>
              </el-form-item>
              <el-form-item label="刻下症" :label-width="formLabelWidth">
                <el-switch v-model="simpleSymtomHideStatus" style="margin-bottom: 8px" active-text="复杂模式"
                  inactive-text="简单模式">
                </el-switch>
                <div v-if="!simpleSymtomHideStatus" class="simple-symtom-type">
                  <el-card shadow="never">
                    <el-select v-model="simpleSymtomValue" filterable clearable>
                      <el-option-group v-for="(symtom, index) in addForm.symptom.symtomList" :key="symtom.typeId"
                        :label="typeNameList[symtom.typeId]">
                        <el-option v-for="(subSymtom, subIndex) in symtom.children"
                          :key="symtom.typeId + '-' + subSymtom.id" :label="subSymtom.dataName"
                          :disabled="subSymtom.score === 0 ? false : true" :value="
                            index +
                            '-' +
                            subIndex +
                            '-' +
                            symtom.typeId +
                            '-' +
                            subSymtom.id
                          ">
                        </el-option>
                      </el-option-group>
                    </el-select>
                    <el-divider content-position="left">已选择症状</el-divider>
                    <div class="symtom-type">
                      <div class="symtom-type-block">
                        <template v-for="(symtom, index) in addForm.symptom.symtomList">
                          <template v-for="(subSymtom, subIndex) in symtom.children">
                            <div v-if="subSymtom.score" :key="symtom.typeId + '-' + subSymtom.id"
                              class="symtom-type-block-item">
                              <div class="symtom-type-block-item-title">
                                {{ subSymtom.dataName }}
                              </div>
                              <el-select v-model="
                                  addForm.symptom.symtomList[index].children[
                                    subIndex
                                  ].score
                                " class="symtom-type-block-item-select" @change="symtomSelectChange(index, subIndex)">
                                <el-option :value="0" label="无"></el-option>
                                <el-option :value="1" label="轻"></el-option>
                                <el-option :value="2" label="中"></el-option>
                                <el-option :value="3" label="重"></el-option>
                              </el-select>
                              <i class="
                                  icon
                                  el-icon-error
                                  symtom-type-block-item-delete
                                " @click="symtomSelectChange(index, subIndex, 0)"></i>
                            </div>
                          </template>
                        </template>
                      </div>
                    </div>
                    <el-divider content-position="left">其他症状</el-divider>
                    <el-input type="textarea" placeholder="请输入其他症状" v-model="addForm.symptom.symtomOther" autosize>
                    </el-input>
                  </el-card>
                </div>
                <div v-else class="symtom-type">
                  <el-collapse v-model="symtomActiveNames">
                    <el-collapse-item v-for="(symtom, index) in addForm.symptom.symtomList" :key="symtom.typeId"
                      :name="symtom.typeId">
                      <template #title>
                        <span style="padding-left: 12px">{{
                          typeNameList[symtom.typeId]
                        }}</span>
                      </template>
                      <div class="symtom-type-block">
                        <div v-for="(subSymtom, subIndex) in symtom.children" :key="symtom.typeId + '-' + subSymtom.id"
                          class="symtom-type-block-item">
                          <div class="symtom-type-block-item-title">
                            {{ subSymtom.dataName }}
                          </div>
                          <el-select v-model="
                              addForm.symptom.symtomList[index].children[
                                subIndex
                              ].score
                            " class="symtom-type-block-item-select" @change="symtomSelectChange(index, subIndex)">
                            <el-option :value="0" label="无"></el-option>
                            <el-option :value="1" label="轻"></el-option>
                            <el-option :value="2" label="中"></el-option>
                            <el-option :value="3" label="重"></el-option>
                          </el-select>
                        </div>
                      </div>
                    </el-collapse-item>
                  </el-collapse>
                  <el-divider content-position="left">其他症状</el-divider>
                  <el-input type="textarea" placeholder="请输入其他症状" v-model="addForm.symptom.symtomOther" autosize>
                  </el-input>
                </div>
              </el-form-item>
              <el-form-item label="既往史">
                <el-checkbox-group v-model="addForm.pastHistoryList" :disabled="isAddComsultation">
                  <!-- code:year/msg -->
                  <el-checkbox v-for="(item, index) in pastHistoryListOptions" :label="item.dataCode" :key="item.dataCode">
                    {{ item.dataName }}
                    <el-input v-if="addForm.pastHistoryList.indexOf(item.dataCode) !== -1" v-model="pastHistoryListYearList[index]" :key="item.dataCode" style="width: 70px;" size="mini" placeholder="年份"  :disabled="isAddComsultation"></el-input>
                  </el-checkbox>
                  <el-checkbox label="99999">
                    其他
                    <el-input v-if="addForm.pastHistoryList.indexOf('99999') !== -1" v-model="addForm.pastHistoryList99999" :disabled="isAddComsultation" autosize type="textarea" resize="none" style="vertical-align: middle;"></el-input>
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="个人史">
                <el-row>
                  <el-col :span="6">
                    <div class="block-title">吸烟史（年）</div>
                    <div>
                      <el-input-number v-model="addForm.personalHistory.smoke.smokeYear" :max="50" :min="0"
                      controls-position="right" class="readonly" :disabled="isAddComsultation"></el-input-number>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="block-title">吸烟数量（支/天）</div>
                    <div>
                      <el-input-number v-model="addForm.personalHistory.smoke.amount" :max="50" :min="0"
                      controls-position="right" class="readonly" :disabled="isAddComsultation"></el-input-number>
                      <el-checkbox v-model="addForm.personalHistory.smoke.dropSmoke" style="margin-left: 12px">已戒烟</el-checkbox>
                    </div>
                  </el-col>
                  <el-col v-if="addForm.personalHistory.smoke.dropSmoke" :span="8">
                    <div class="block-title">已戒烟（年）</div>
                    <el-input-number v-model="addForm.personalHistory.smoke.dropYear" :max="50" :min="0"
                      controls-position="right" class="readonly" :disabled="isAddComsultation"></el-input-number>
                  </el-col>
                </el-row>
                <br />
                <el-row>
                  <el-col :span="6">
                    <div class="block-title">饮酒史（年）</div>
                    <div>
                      <el-input-number v-model="addForm.personalHistory.whiteWine.drinkYear" :max="50" :min="0"
                      controls-position="right" class="readonly" :disabled="isAddComsultation"></el-input-number>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="block-title">啤酒数量（瓶/天）</div>
                    <div>
                      <el-input-number v-model="addForm.personalHistory.beer.amount" :max="50" :min="0"
                      controls-position="right" class="readonly" :disabled="isAddComsultation"></el-input-number>
                      <el-checkbox v-model="addForm.personalHistory.whiteWine.dropDrink" style="margin-left: 12px">已戒酒</el-checkbox>
                    </div>
                    <div class="block-title">白酒数量（两/天）</div>
                    <el-input-number v-model="addForm.personalHistory.whiteWine.amount" :max="50" :min="0"
                      controls-position="right" class="readonly" :disabled="isAddComsultation"></el-input-number>
                  </el-col>
                  <el-col v-if="addForm.personalHistory.whiteWine.dropDrink" :span="8">
                    <div class="block-title">已戒酒（年）</div>
                    <el-input-number v-model="addForm.personalHistory.whiteWine.dropYear" :max="50" :min="0"
                      controls-position="right" class="readonly" :disabled="isAddComsultation"></el-input-number>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="家族史">
                <el-checkbox-group v-model="addForm.familyHistoryList" :disabled="isAddComsultation">
                  <el-checkbox v-for="item in familyHistoryListOptions" :label="item.dataCode" :key="item.dataCode">
                    {{ item.dataName }}
                  </el-checkbox>
                  <el-checkbox label="99999">
                    其他
                    <el-input v-if="addForm.familyHistoryList.indexOf('99999') !== -1" v-model="addForm.familyHistoryList99999" autosize type="textarea" resize="none" style="vertical-align: middle;"></el-input>
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="过敏史">
                <div>
                  <el-radio v-model="addForm.allergyHistory.has" :label="false" :disabled="isAddComsultation">无</el-radio>
                  <el-radio v-model="addForm.allergyHistory.has" :label="true" :disabled="isAddComsultation">有</el-radio>
                </div>
                <div v-if="addForm.allergyHistory.has">
                  <el-input :rows="3" placeholder="请输入内容" v-model="addForm.allergyHistory.desc" type="textarea" class="readonly" :disabled="isAddComsultation">
                  </el-input>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="辅助检查" name="3">
        <el-card class="box-card">
          <el-form class="medical-form" label-width="80px" label-position="top" size="medium">
            <el-form-item label="检查日期">
              <el-date-picker
                v-model="addForm.auxiliaryExamination.time"
                type="date"
                style="width: 240px;"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="辅助检查">
              <TinymceEditor v-model="addForm.auxiliaryExamination.content" style="width: 800px" />
            </el-form-item>
          </el-form>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="中医四诊" name="4">
        <el-card class="box-card">
          <div class="dialog-content">
            <el-form class="medical-form" label-width="80px" label-position="top" size="medium" ref="addFormRef"
              :model="addForm">
              <el-form-item label="舌象" :label-width="formLabelWidth">
                <div v-if="!simpleSymtomHideStatus2" class="simple-symtom-type">
                  <el-card shadow="never">
                    <el-select v-model="simpleSymtomValue2" filterable clearable>
                      <el-option-group v-for="(symtom, index) in addForm.symptom.symtomList2" :key="symtom.typeId"
                        :label="typeNameList[symtom.typeId]">
                        <el-option v-for="(subSymtom, subIndex) in symtom.children"
                          :key="symtom.typeId + '-' + subSymtom.id" :label="subSymtom.dataName"
                          :disabled="subSymtom.score === 0 ? false : true" :value="
                            index +
                            '-' +
                            subIndex +
                            '-' +
                            symtom.typeId +
                            '-' +
                            subSymtom.id
                          ">
                        </el-option>
                      </el-option-group>
                    </el-select>
                    <el-divider content-position="left">已选择症状</el-divider>
                    <div class="symtom-type">
                      <div class="symtom-type-block">
                        <template v-for="(symtom, index) in addForm.symptom.symtomList2">
                          <template v-for="(subSymtom, subIndex) in symtom.children">
                            <div v-if="subSymtom.score" :key="symtom.typeId + '-' + subSymtom.id"
                              class="symtom-type-block-item">
                              <div class="symtom-type-block-item-title">
                                {{ subSymtom.dataName }}
                              </div>
                              <el-select v-model="
                                  addForm.symptom.symtomList2[index].children[
                                    subIndex
                                  ].score
                                " class="symtom-type-block-item-select" @change="symtomSelectChange(index, subIndex)">
                                <el-option :value="0" label="无"></el-option>
                                <el-option :value="1" label="轻"></el-option>
                                <el-option :value="2" label="中"></el-option>
                                <el-option :value="3" label="重"></el-option>
                              </el-select>
                              <i class="
                                  icon
                                  el-icon-error
                                  symtom-type-block-item-delete
                                " @click="symtomSelectChange2(index, subIndex, 0)"></i>
                            </div>
                          </template>
                        </template>
                      </div>
                    </div>
                    <el-divider content-position="left">其他症状</el-divider>
                    <el-input type="textarea" placeholder="请输入其他症状" v-model="addForm.symptom.symtomOther2" autosize>
                    </el-input>
                  </el-card>
                </div>
                <div style="margin-top: 15px;"></div>
                <el-upload 
                  class="upload-demo"
                  action="/ZUNren/consultation/fileUpload?picType=2"
                  :file-list="fileList1"
                  :on-success="onSuccess1"
                  :on-remove="onRemove1"
                  list-type="picture"
                  multiple
                  :limit="10"
                  :auto-upload="true">
                  <el-button size="mini" type="primary">选择舌象图片</el-button>
                  <div slot="tip" class="el-upload__tip">
                    只能上传jpg/png文件，且不超过10张
                  </div>
                </el-upload>
              </el-form-item>
              <el-form-item label="脉象" :label-width="formLabelWidth">
                <div v-if="!simpleSymtomHideStatus3" class="simple-symtom-type">
                  <el-card shadow="never">
                    <el-select v-model="simpleSymtomValue3" filterable clearable>
                      <el-option-group v-for="(symtom, index) in addForm.symptom.symtomList3" :key="symtom.typeId"
                        :label="typeNameList[symtom.typeId]">
                        <el-option v-for="(subSymtom, subIndex) in symtom.children"
                          :key="symtom.typeId + '-' + subSymtom.id" :label="subSymtom.dataName"
                          :disabled="subSymtom.score === 0 ? false : true" :value="
                            index +
                            '-' +
                            subIndex +
                            '-' +
                            symtom.typeId +
                            '-' +
                            subSymtom.id
                          ">
                        </el-option>
                      </el-option-group>
                    </el-select>
                    <el-divider content-position="left">已选择症状</el-divider>
                    <div class="symtom-type">
                      <div class="symtom-type-block">
                        <template v-for="(symtom, index) in addForm.symptom.symtomList3">
                          <template v-for="(subSymtom, subIndex) in symtom.children">
                            <div v-if="subSymtom.score" :key="symtom.typeId + '-' + subSymtom.id"
                              class="symtom-type-block-item">
                              <div class="symtom-type-block-item-title">
                                {{ subSymtom.dataName }}
                              </div>
                              <el-select v-model="
                                  addForm.symptom.symtomList3[index].children[
                                    subIndex
                                  ].score
                                " class="symtom-type-block-item-select" @change="symtomSelectChange3(index, subIndex)">
                                <el-option :value="0" label="无"></el-option>
                                <el-option :value="1" label="轻"></el-option>
                                <el-option :value="2" label="中"></el-option>
                                <el-option :value="3" label="重"></el-option>
                              </el-select>
                              <i class="
                                  icon
                                  el-icon-error
                                  symtom-type-block-item-delete
                                " @click="symtomSelectChange3(index, subIndex, 0)"></i>
                            </div>
                          </template>
                        </template>
                      </div>
                    </div>
                    <el-divider content-position="left">其他症状</el-divider>
                    <el-input type="textarea" placeholder="请输入其他症状" v-model="addForm.symptom.symtomOther3" autosize>
                    </el-input>
                  </el-card>
                </div>
              </el-form-item>
              <el-form-item label="基本查体" :label-width="formLabelWidth">
                <el-input type="textarea" :rows="5" placeholder="请输入基本查体" v-model="addForm.bodyCheck"
                  autocomplete="off"></el-input>
                <div style="margin-top: 15px;"></div>
                <el-upload 
                  class="upload-demo"
                  action="/ZUNren/consultation/fileUpload?picType=2"
                  :file-list="fileList2"
                  :on-success="onSuccess2"
                  :on-remove="onRemove2"
                  list-type="picture"
                  multiple
                  :limit="10"
                  :auto-upload="true">
                  <el-button size="mini" type="primary">选择基本查体图片</el-button>
                  <div slot="tip" class="el-upload__tip">
                    只能上传jpg/png文件，且不超过10张
                  </div>
                </el-upload>
              </el-form-item>
              <el-form-item label="腹诊" :label-width="formLabelWidth">
                <div v-for="abdominalExaminationItem in abdominalExaminationList" :key="abdominalExaminationItem.key">
                  <span class="block-title">{{abdominalExaminationItem.label}}：</span>
                  <el-checkbox-group v-model="addForm.abdominalExamination[abdominalExaminationItem.key]">
                    <el-checkbox v-for="symtom in abdominalExaminationItem.children" :key="symtom.dataCode"
                      :label="symtom.dataCode">
                      {{symtom.dataName}}
                    </el-checkbox>
                  </el-checkbox-group>
                </div>
                <div style="margin-top: 15px;"></div>
                <el-upload 
                  class="upload-demo"
                  action="/ZUNren/consultation/fileUpload?picType=2"
                  :file-list="fileList3"
                  :on-success="onSuccess3"
                  :on-remove="onRemove3"
                  list-type="picture"
                  multiple
                  :limit="10"
                  :auto-upload="true">
                  <el-button size="mini" type="primary">选择基本腹诊图片</el-button>
                  <div slot="tip" class="el-upload__tip">
                    只能上传jpg/png文件，且不超过10张
                  </div>
                </el-upload>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="量表评分" name="5">
        <el-card class="box-card">
          <div class="dialog-content">
            <el-form class="medical-form" label-width="80px" label-position="top" size="medium" ref="addFormRef"
              :model="addForm">
              <el-form-item label="DM/CKD VAS评分" :label-width="formLabelWidth">
                <el-card class="box-card" shadow="never">
                  <el-row :gutter="20">
                    <el-col :span="10">
                      <div class="grid-content">
                        <div class="grid1">
                          <span class="block-title">最不适症状:</span>
                          <el-input type="textarea" :rows="1" placeholder="请输入最不适症状"
                            v-model="addForm.vasScore.worstSymptom" autocomplete="off"></el-input>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="10" :offset="3">
                      <div class="grid-content">
                        <span class="block-title">最不适症状程度:</span>
                        <el-slider v-model="addForm.vasScore.degree" show-input></el-slider>
                      </div>
                    </el-col>
                  </el-row>
                  <el-divider content-position="left">DM:</el-divider>
                  <el-row :gutter="20">
                    <div v-for="item in newDMlist" :key="item.id">
                      <el-col :span="8">
                        <div class="grid-content">
                          <span>{{ item.dataName }}程度:</span>
                          <el-slider class="slider1" v-model="item.score" show-input></el-slider>
                        </div>
                      </el-col>
                    </div>
                  </el-row>
                  <el-divider content-position="left">CDK:</el-divider>
                  <el-row :gutter="20">
                    <div v-for="item in newCKDlist" :key="item.id">
                      <el-col :span="8">
                        <span>{{ item.dataName }}程度:</span>
                        <el-slider class="slider1" v-model="item.score" show-input></el-slider>
                      </el-col>
                    </div>
                  </el-row>
                  <el-divider content-position="left">其他:</el-divider>
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <span>生活质量:</span>
                      <el-slider v-model="addForm.vasScore.lifeQuality" class="slider1" show-input></el-slider>
                    </el-col>
                    <el-col :span="8">
                      <span>健康状况:</span>
                      <el-slider v-model="addForm.vasScore.healthyStatus" class="slider1" show-input></el-slider>
                    </el-col>
                  </el-row>
                </el-card>
              </el-form-item>
              <el-form-item label="风邪" :label-width="formLabelWidth">
                <el-card class="box-card" shadow="never">
                  <div class="symtom-type">
                    <div class="symtom-type-block">
                      <el-divider content-position="left">风邪（肾病填写）:</el-divider>
                      <div v-for="(item, index) in newfengxielist" :key="item.id" class="symtom-type-block-item">
                        <div class="symtom-type-block-item-title big">
                          {{ item.dataName }}
                        </div>
                        <el-select v-model="newfengxielist[index].value" class="symtom-type-block-item-select">
                          <el-option :value="0" label="无"></el-option>
                          <el-option :value="1" label="偶尔"></el-option>
                          <el-option :value="2" label="总是"></el-option>
                        </el-select>
                      </div>
                      <el-divider content-position="left">是否诊断为风邪证</el-divider>
                      <el-radio v-model="addForm.windEvil.diagnosticResult" label="1">是</el-radio>
                      <el-radio v-model="addForm.windEvil.diagnosticResult" label="0">否</el-radio>
                    </div>
                  </div>
                </el-card>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="诊断记录" name="6">
        <el-card class="box-card">
          <div class="dialog-content">
            <el-form class="medical-form" label-width="80px" label-position="top" size="medium" ref="addFormRef"
              :model="addForm">
              <el-form-item label="西医诊断及病程诊断">
                <el-checkbox-group v-model="addForm.curMedicalRecord.Westernmedicine.list">
                  <el-checkbox v-for="(item, index) in WesternmedicineOptions" :label="item.dataCode" :key="item.dataCode">
                    {{ item.dataName }}
                    <el-input v-if="addForm.curMedicalRecord.Westernmedicine.list.indexOf(item.dataCode) !== -1" v-model="westernmedicineOptionsYearList[index]" :key="item.dataCode" style="width: 70px;" size="mini" placeholder="年份"></el-input>
                  </el-checkbox>
                  <el-checkbox label="99999">
                    其他
                    <el-input v-if="addForm.curMedicalRecord.Westernmedicine.list.indexOf('99999') !== -1" v-model="addForm.westernmedicineList99999" autosize type="textarea" resize="none" style="vertical-align: middle;"></el-input>
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="确诊时间">
                <el-date-picker class="input-style" v-model="addForm.curMedicalRecord.confirmTime.time" type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>

              <el-form-item label="体质诊断" :label-width="formLabelWidth">
                <div v-for="physiqueItem in physiqueList" :key="physiqueItem.key">
                  <span class="block-title">{{physiqueItem.label}}：</span>
                  <el-checkbox-group v-model="addForm.physique[physiqueItem.key]">
                    <el-checkbox v-for="symtom in physiqueItem.children" :key="symtom.dataCode"
                      :label="symtom.dataCode">
                      {{ symtom.dataName }}
                    </el-checkbox>
                  </el-checkbox-group>
                </div>
              </el-form-item>

              <el-form-item label="辨证诊断" :label-width="formLabelWidth">
                <span class="block-title">虚：</span>
                <el-checkbox-group v-model="addForm.symptomCategories.empty">
                  <el-checkbox v-for="symtom in xulist" :key="symtom.dataCode" :label="symtom.dataCode">
                    {{ symtom.dataName }}
                  </el-checkbox>
                </el-checkbox-group>
                <span class="block-title">实：</span>
                <el-checkbox-group v-model="addForm.symptomCategories.real">
                  <el-checkbox v-for="symtom in shilist" :key="symtom.dataCode" :label="symtom.dataCode">
                    {{ symtom.dataName }}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="病位诊断" :label-width="formLabelWidth">
                <span class="block-title">脏腑：</span>
                <el-checkbox-group v-model="addForm.diseaseLocation.viscera">
                  <el-checkbox v-for="symtom in zangfulist" :key="symtom.dataCode" :label="symtom.dataCode">
                    {{ symtom.dataName }}
                  </el-checkbox>
                </el-checkbox-group>
                <span class="block-title">经脉：</span>
                <el-checkbox-group v-model="addForm.diseaseLocation.meridian">
                  <el-checkbox v-for="symtom in jingmailist" :key="symtom.dataCode" :label="symtom.dataCode">
                    {{ symtom.dataName }}
                  </el-checkbox>
                </el-checkbox-group>
                <span class="block-title">卫分：</span>
                <el-checkbox-group v-model="addForm.diseaseLocation.defender">
                  <el-checkbox v-for="symtom in weifenlist" :key="symtom.dataCode" :label="symtom.dataCode">
                    {{ symtom.dataName }}
                  </el-checkbox>
                </el-checkbox-group>
                <span class="block-title">三焦：</span>
                <el-checkbox-group v-model="addForm.diseaseLocation.tripleFocus">
                  <el-checkbox v-for="symtom in sanjiaolist" :key="symtom.dataCode" :label="symtom.dataCode">
                    {{ symtom.dataName }}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="治疗信息" name="7">
        <el-card class="box-card">
          <div class="dialog-content">
            <el-form class="medical-form" label-width="80px" label-position="top" size="medium" ref="addFormRef"
              :model="addForm">
              <el-form-item label="医嘱" :label-width="formLabelWidth">
                <el-checkbox-group v-model="addForm.doctorOrder">
                  <el-checkbox v-for="symtom in doctorcommonDataEntityList" :key="symtom.dataCode"
                    :label="symtom.dataCode">
                    {{ symtom.dataName }}
                  </el-checkbox>
                  <el-checkbox label="99999">
                    其他
                    <el-input v-if="addForm.doctorOrder.indexOf('99999') !== -1" v-model="addForm.doctorOrder99999" autosize type="textarea" resize="none" style="vertical-align: middle;"></el-input>
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="处方" :label-width="formLabelWidth">
                <prescription v-model="addForm.prescription.prescriptions"></prescription>
                <div style="margin-top: 2px;">
                  <el-input v-model="addForm.prescription.mark.value" style="width: 80px;">
                    <span class="el-input__icon" slot="suffix">剂</span>
                  </el-input>
                  <el-select v-model="addForm.prescription.mark.type" placeholder="方式" style="width: 80px; margin-left: 4px;">
                    <el-option value="颗粒" label="颗粒"></el-option>
                    <el-option value="代煎" label="代煎"></el-option>
                    <el-option value="自煎" label="自煎"></el-option>
                  </el-select>
                </div>
              </el-form-item>
              <el-form-item label="调护" :label-width="formLabelWidth">
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入调护内容"
                  v-model="addForm.prescription.tiaohu"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="合并用药">
                <TinymceEditor v-model="addForm.combinationTherapy" style="width: 800px" />
              </el-form-item>
              <!-- <el-form-item label="其他治疗" :label-width="formLabelWidth">
                <el-input
                  type="textarea"
                  :rows="5"
                  placeholder="请输入内容"
                  v-model="addForm.otherTreatment"
                  autocomplete="off"
                ></el-input>
              </el-form-item> -->
            </el-form>
          </div>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import {
    getAllSameData0,
    getcommonlist,
    addquick,
    getPatientInfo,
    getConsultationInfo,
    addconsult,
    editPatientInfo,
    editConsultationInfo,
  } from "@/api/patient";
  import TinymceEditor from "@/components/Tinymce";
  import Prescription from "@/components/Prescription/index.vue";

  export default {
    components: {
      TinymceEditor,
      Prescription
  },
    data() {
      const validatePhone = (rule, value, cb) => {
        if (!value) {
          return cb();
        }
        
        let regphone =
          /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
        if (regphone.test(value)) {
          return cb();
        }
        cb(new Error("请输入合法的手机号"));
      };
      return {
        // bmi
        bmidata: 0,
        symtomActiveNames: "1",
        addRules: {
          patientName: [{
            required: true,
            message: "请输入患者姓名",
            trigger: "blur"
          }, ],
          telephone: [{
            validator: validatePhone,
            message: "请输入正确的手机号",
            trigger: "blur",
          }, ],
          outpatientId: [{
            required: true,
            message: "请输入患者门诊号",
            trigger: "blur"
          }, ],
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
        // 虚相应数据
        xulist: [],
        // 实相应数据
        shilist: [],
        // 脏腑相应数据
        zangfulist: [],

        // 经脉相应数据
        jingmailist: [],
        // 卫分相应数据
        weifenlist: [],

        // 三焦相应数据
        sanjiaolist: [],

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
        //症状相应的数据
        commonDataEntityList: [],
        commonDataEntityList2: [],
        simpleSymtomValue: "",
        simpleSymtomValue2: "",
        simpleSymtomValue3: "",
        // 医嘱相应的数据
        doctorcommonDataEntityList: [],
        simpleSymtomHideStatus: false,
        // 舌象
        simpleSymtomHideStatus2: false,
        // 脉象
        simpleSymtomHideStatus3: false,
        //风邪证单选框
        radio: "0",
        // 风邪相应数据
        fengxielist: [],
        newfengxielist: [],
        // DM相应数据
        DMlist: [],
        newDMlist: [],
        // 家族史多选
        familyHistoryListOptions: [],
        //既往史选择的数据
        pastHistoryListOptions: [],
        pastHistoryListYearList: [],
        formLabelWidth: "120px",
        activeName: "1",
        //现病史选择的数据
        //curMedicalRecordListOptions: [],
        WesternmedicineOptions: [],
        westernmedicineOptionsYearList: [],
        DMcomplicationsOptions: [],
        CKDreasonOptions: [],
        //   快速增加患者表单
        addForm: {
          // 腹诊
          abdominalExamination: { // todo 需要改成json解析（前端）
            abdominal_37: [],
            abdominal_31: [],
            abdominal_32: [],
            abdominal_33: [],
            abdominal_34: [],
            abdominal_35: [],
            abdominal_36: []
          },
          // 其他资料
          additionalInfo: "",
          // 过敏史
          allergyHistory: { // todo 需要改成json解析（前端）
            has: false,
            desc: '',
          },
          // 辅助检查
          auxiliaryExamination: {
            time: '',
            content: "<p><strong>血常规</strong></p>\n<table style=\"border-collapse: collapse; width: 100%;\" border=\"1\">\n<tbody>\n<tr>\n<td style=\"width: 25%;\" width=\"148\">\n<p>白细胞</p>\n</td>\n<td style=\"width: 25%;\">WBC</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\">&times;10^9/L</td>\n</tr>\n<tr>\n<td style=\"width: 25%;\" width=\"148\">\n<p>淋巴细胞百分比</p>\n</td>\n<td style=\"width: 25%;\">LYMPH%</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\">%</td>\n</tr>\n<tr>\n<td style=\"width: 25%;\" width=\"148\">\n<p>中性粒细胞</p>\n</td>\n<td style=\"width: 25%;\">NEUT%</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\">%</td>\n</tr>\n<tr>\n<td style=\"width: 25%;\" width=\"148\">\n<p>红细胞</p>\n</td>\n<td style=\"width: 25%;\">RBC</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\">&times;10^12/L</td>\n</tr>\n<tr>\n<td style=\"width: 25%;\" width=\"148\">\n<p>血小板</p>\n</td>\n<td style=\"width: 25%;\">PLT</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\">&times;10^9/L</td>\n</tr>\n<tr>\n<td style=\"width: 25%;\" width=\"148\">\n<p>血红蛋白</p>\n</td>\n<td style=\"width: 25%;\">HGB</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\">g/L</td>\n</tr>\n<tr>\n<td style=\"width: 25%;\" width=\"148\">\n<p>C-反应蛋白</p>\n</td>\n<td style=\"width: 25%;\">CRP</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\">mg/L</td>\n</tr>\n</tbody>\n</table>\n<p><strong>生化</strong></p>\n<table style=\"border-collapse: collapse; width: 100%;\" border=\"1\">\n<tbody>\n<tr>\n<td style=\"width: 25%;\">糖化血红蛋白</td>\n<td style=\"width: 25%;\" width=\"99\">\n<p>HBAC</p>\n</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\" width=\"114\">\n<p>%</p>\n</td>\n</tr>\n<tr>\n<td style=\"width: 25%;\" width=\"148\">\n<p>尿素</p>\n</td>\n<td style=\"width: 25%;\" width=\"99\">\n<p>UREA</p>\n</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\" width=\"114\">\n<p>mol/L</p>\n</td>\n</tr>\n<tr>\n<td style=\"width: 25%;\" width=\"148\">\n<p>肌酐</p>\n</td>\n<td style=\"width: 25%;\" width=\"99\">\n<p>CREA</p>\n</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\" width=\"114\">\n<p>&mu;mol/L</p>\n</td>\n</tr>\n<tr>\n<td style=\"width: 25%;\" width=\"148\">\n<p>尿酸</p>\n</td>\n<td style=\"width: 25%;\" width=\"99\">\n<p>UA</p>\n</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\" width=\"114\">\n<p>&mu;mol/L</p>\n</td>\n</tr>\n<tr>\n<td style=\"width: 25%;\" width=\"148\">\n<p>血糖</p>\n</td>\n<td style=\"width: 25%;\" width=\"99\">\n<p>GLU</p>\n</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\" width=\"114\">\n<p>mmol/L</p>\n</td>\n</tr>\n<tr>\n<td style=\"width: 25%;\" width=\"148\">\n<p>胆固醇</p>\n</td>\n<td style=\"width: 25%;\" width=\"99\">\n<p>CHOL</p>\n</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\" width=\"114\">\n<p>mmol/L</p>\n</td>\n</tr>\n<tr>\n<td style=\"width: 25%;\" width=\"148\">\n<p>甘油三酯</p>\n</td>\n<td style=\"width: 25%;\" width=\"99\">\n<p>TRIG</p>\n</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\" width=\"114\">\n<p>mmol/L</p>\n</td>\n</tr>\n<tr>\n<td style=\"width: 25%;\" width=\"148\">\n<p>高密度脂蛋白胆固醇</p>\n</td>\n<td style=\"width: 25%;\" width=\"99\">\n<p>HDL-C</p>\n</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\" width=\"114\">\n<p>mmol/L</p>\n</td>\n</tr>\n<tr>\n<td style=\"width: 25%;\" width=\"148\">\n<p>低密度脂蛋白胆固醇</p>\n</td>\n<td style=\"width: 25%;\" width=\"99\">\n<p>LDL-C</p>\n</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\" width=\"114\">\n<p>mmol/L</p>\n</td>\n</tr>\n<tr>\n<td style=\"width: 25%;\" width=\"148\">\n<p>谷丙转氨酶</p>\n</td>\n<td style=\"width: 25%;\" width=\"99\">\n<p>ALT</p>\n</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\" width=\"114\">\n<p>U/L</p>\n</td>\n</tr>\n<tr>\n<td style=\"width: 25%;\" width=\"148\">\n<p>谷草转氨酶</p>\n</td>\n<td style=\"width: 25%;\" width=\"99\">\n<p>AST</p>\n</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\" width=\"114\">\n<p>U/L</p>\n</td>\n</tr>\n<tr>\n<td style=\"width: 25%;\" width=\"148\">\n<p>总蛋白</p>\n</td>\n<td style=\"width: 25%;\" width=\"99\">\n<p>TP</p>\n</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\" width=\"114\">\n<p>g/L</p>\n</td>\n</tr>\n<tr>\n<td style=\"width: 25%;\" width=\"148\">\n<p>白蛋白</p>\n</td>\n<td style=\"width: 25%;\" width=\"99\">\n<p>ALB</p>\n</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\" width=\"114\">\n<p>g/L</p>\n</td>\n</tr>\n<tr>\n<td style=\"width: 25%;\" width=\"148\">\n<p>球蛋白</p>\n</td>\n<td style=\"width: 25%;\" width=\"99\">\n<p>G</p>\n</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\" width=\"114\">\n<p>g/L</p>\n</td>\n</tr>\n<tr>\n<td style=\"width: 25%;\" width=\"148\">\n<p>钾</p>\n</td>\n<td style=\"width: 25%;\" width=\"99\">\n<p>K+</p>\n</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\" width=\"114\">\n<p>mmol/L</p>\n</td>\n</tr>\n<tr>\n<td style=\"width: 25%;\" width=\"148\">\n<p>钠</p>\n</td>\n<td style=\"width: 25%;\" width=\"99\">\n<p>Na+</p>\n</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\" width=\"114\">\n<p>mmol/L</p>\n</td>\n</tr>\n<tr>\n<td style=\"width: 25%;\" width=\"148\">\n<p>氯</p>\n</td>\n<td style=\"width: 25%;\" width=\"99\">\n<p>CL-</p>\n</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\" width=\"114\">\n<p>mmol/L</p>\n</td>\n</tr>\n</tbody>\n</table>\n<p><strong>尿液分析</strong></p>\n<table style=\"border-collapse: collapse; width: 100%;\" border=\"1\">\n<tbody>\n<tr>\n<td style=\"width: 25%;\" width=\"148\">\n<p>尿蛋白定性</p>\n</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n</tr>\n<tr>\n<td style=\"width: 25%;\" width=\"148\">\n<p>尿红细胞定性</p>\n</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n</tr>\n<tr>\n<td style=\"width: 25%;\" width=\"148\">\n<p>尿白细胞定性</p>\n</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n</tr>\n<tr>\n<td style=\"width: 25%;\" width=\"148\">\n<p>24h尿蛋白</p>\n</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\" width=\"114\">\n<p>mg/24h</p>\n</td>\n</tr>\n<tr>\n<td style=\"width: 25%;\" width=\"148\">\n<p>尿微量白蛋白</p>\n</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\" width=\"114\">\n<p>mg/24h</p>\n</td>\n</tr>\n<tr>\n<td style=\"width: 25%;\" width=\"148\">\n<p>尿肌酐</p>\n</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\" width=\"114\">\n<p>mmol/L</p>\n</td>\n</tr>\n<tr>\n<td style=\"width: 25%;\" width=\"148\">\n<p>尿蛋白/尿肌酐</p>\n</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\" width=\"114\">\n<p>&nbsp;</p>\n</td>\n</tr>\n<tr>\n<td style=\"width: 25%;\" width=\"148\">\n<p>尿红细胞（HPF）</p>\n</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\" width=\"114\">\n<p>&nbsp;</p>\n</td>\n</tr>\n<tr>\n<td style=\"width: 25%;\" width=\"148\">\n<p>尿红细胞计数</p>\n</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\" width=\"114\">\n<p>&nbsp;</p>\n</td>\n</tr>\n<tr>\n<td style=\"width: 25%;\" width=\"148\">\n<p>白细胞（HPF）</p>\n</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\" width=\"114\">\n<p>&nbsp;</p>\n</td>\n</tr>\n<tr>\n<td style=\"width: 25%;\" width=\"148\">\n<p>尿白细胞计数</p>\n</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\" width=\"114\">\n<p>&nbsp;</p>\n</td>\n</tr>\n<tr>\n<td style=\"width: 25%;\" width=\"148\">\n<p>尿酮体</p>\n</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\" width=\"114\">\n<p>mmol/L</p>\n</td>\n</tr>\n<tr>\n<td style=\"width: 25%;\" width=\"148\">\n<p>细菌</p>\n</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\" width=\"114\">\n<p>&nbsp;</p>\n</td>\n</tr>\n<tr>\n<td style=\"width: 25%;\" width=\"148\">\n<p>管型</p>\n</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\" width=\"114\">\n<p>&nbsp;</p>\n</td>\n</tr>\n<tr>\n<td style=\"width: 25%;\" width=\"148\">\n<p>正常红细胞</p>\n</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\" width=\"114\">\n<p>%</p>\n</td>\n</tr>\n</tbody>\n</table>\n<p><strong>甲状腺功能</strong></p>\n<table style=\"border-collapse: collapse; width: 100%;\" border=\"1\">\n<tbody>\n<tr>\n<td style=\"width: 25%;\" width=\"148\">\n<p>三碘甲腺原氨酸</p>\n</td>\n<td style=\"width: 25%;\" width=\"99\">\n<p>T3</p>\n</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\" width=\"114\">\n<p>nmol/L</p>\n</td>\n</tr>\n<tr>\n<td style=\"width: 25%;\" width=\"148\">\n<p>甲状腺素</p>\n</td>\n<td style=\"width: 25%;\" width=\"99\">\n<p>T4</p>\n</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\" width=\"114\">\n<p>nmol/L</p>\n</td>\n</tr>\n<tr>\n<td style=\"width: 25%;\" width=\"148\">\n<p>游离三碘甲腺原氨酸</p>\n</td>\n<td style=\"width: 25%;\" width=\"99\">\n<p>FT3</p>\n</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\" width=\"114\">\n<p>pmol/L</p>\n</td>\n</tr>\n<tr>\n<td style=\"width: 25%;\" width=\"148\">\n<p>游离甲状腺素</p>\n</td>\n<td style=\"width: 25%;\" width=\"99\">\n<p>FT4</p>\n</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\" width=\"114\">\n<p>pmol/L</p>\n</td>\n</tr>\n<tr>\n<td style=\"width: 25%;\" width=\"148\">\n<p>促甲状腺素</p>\n</td>\n<td style=\"width: 25%;\" width=\"99\">\n<p>TSH</p>\n</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\" width=\"114\">\n<p>IU/L</p>\n</td>\n</tr>\n<tr>\n<td style=\"width: 25%;\" width=\"148\">\n<p>甲状腺球蛋白抗体</p>\n</td>\n<td style=\"width: 25%;\" width=\"99\">\n<p>TGAb</p>\n</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\" width=\"114\">\n<p>IU/ml</p>\n</td>\n</tr>\n<tr>\n<td style=\"width: 25%;\" width=\"148\">\n<p>甲状腺过氧化物酶抗体</p>\n</td>\n<td style=\"width: 25%;\" width=\"99\">\n<p>TPOAb</p>\n</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\" width=\"114\">\n<p>IU/ml</p>\n</td>\n</tr>\n</tbody>\n</table>"
          },
          // 出生日期
          birthday: '',
          age: '',
          // 基本查体
          bodyCheck: "",
          bodyCheckInfo: "", // 基本查体图片
          // 病例特点
          caseFeature: "",
          // 合并用药
          combinationTherapy: "<table style=\"height: 30px; width: 100%; border-collapse: collapse; margin-left: auto; margin-right: auto;\" border=\"1\">\n<tbody>\n<tr>\n<td style=\"width: 25%; text-align: center;\">药物</td>\n<td style=\"width: 25%; text-align: center;\">剂量</td>\n<td style=\"width: 25%; text-align: center;\">用量</td>\n<td style=\"width: 25%; text-align: center;\">频次</td>\n</tr>\n<tr>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n</tr>\n<tr>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n</tr>\n<tr>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n</tr>\n<tr>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n<td style=\"width: 25%;\">&nbsp;</td>\n</tr>\n</tbody>\n</table>",
          // 就诊时间
          consultTime: new Date(),
          // 创建时间
          createTinme: "",
          // 现病史
          curMedicalRecord: {
            currentText: '',
            Westernmedicine: {
              list: [],
            },
            confirmTime: {
              time: '',
            },
            DMcomplications: {
              list: [],
            },
            CKDreason: {
              list: [],
            },
          },
          // 病位
          diseaseLocation: {
            viscera: [],
            meridian: [],
            defender: [],
            tripleFocus: [],
          },
          // 医嘱
          doctorOrder: [],
          engravedDisease: "",
          familyHistoryList: [],
          gender: 0,
          height: "",
          idCard: "",
          mainlyComplaint: "",
          mainDiseaseDiagnosisId: "",
          medicalLocId: "",
          modifiedTime: "",
          otherDiagnosisId: "",
          otherFeature: "",
          otherTreatment: "",
          outpatNum: "",
          outpatientId: "",
          pastHistoryList: [],
          patientId: "1",
          patientName: "",
          personalHistory: {
            smoke: {
              smokeYear: 0,
              dropSmoke: false,
              dropYear: 0,
              amount: 0,
            },
            whiteWine: {
              drinkYear: 0,
              dropDrink: false,
              dropYear: 0,
              amount: 0,
            },
            beer: {
              amount: 0,
            },
          },
          physique: { // todo 需要改成json解析（前端）
            physique_25: [],
            physique_26: [],
            physique_27: [],
            physique_28: [],
            physique_29: [],
            physique_30: [],
          },
          prescription: {
            tiaohu: '',
            prescriptions: [],
            mark: {
              value: '',
              type: '', // 颗粒、代煎、自煎
            }
          },
          pulsePattern: "",
          status: 1,
          symptom: {
            symtomOther: '',
            symtomOther2: '',
            symtomOther2: '',
            symtomList: [],
            symtomList2: [],
            symtomList3: [],
          },
          symptomCategories: {
            empty: [],
            real: [],
          },
          telephone: "",
          tonguePattern: "",
          treatment: "",
          vasScore: {
            worstSymptom: "",
            degree: 0,
            DM: [],
            CKD: [],
            lifeQuality: 0,
            healthyStatus: 0,
          },
          weight: "",
          windEvil: {
            fengxie: [],
            diagnosticResult: "",
          },
        },
        // 就诊地址全部数据
        locallist: [],
        // CKD相应数据
        CKDlist: [],
        newCKDlist: [],
        abdominalExaminationList: [],
        abdominalExaminationTypeList: {
          abdominal_37: '全腹概况',
          abdominal_31: '腹皮',
          abdominal_32: '皮温',
          abdominal_33: '腹力',
          abdominal_34: '胸、心区腹证',
          abdominal_35: '心下腹证',
          abdominal_36: '腹部腹证'
        },
        physiqueList: [],
        physiqueTypeList: {
          physique_25: '太阳体质',
          physique_26: '阳明体质',
          physique_27: '少阳体质',
          physique_28: '太阴体质',
          physique_29: '少阴体质',
          physique_30: '厥阴体质',
        },
        // 是否是添加复诊
        isAddComsultation: false,
        patientId: '',
        loading: false,
        submiting: false,

        fileList1: [],
        fileList2: [],
        fileList3: [],

        isEdit: 0, // 0 - 非edit 1 - 编辑基础 2 - 编辑复诊
        consultationId: '',

        // 基本信息的key
        basicInfoKeys: [],
        // 复诊信息key
        consultationKeys: [], 
      };
    },
    created() {
      this.isAddComsultation = Boolean(this.$route.query.isAddComsultation);
      this.isEdit = Number(this.$route.query.isEdit || 0);
      this.patientId = this.$route.query.patientId;
      this.consultationId = this.$route.query.consultationId;
      if(this.patientId && !this.consultationId) {
        this.loading = true;
        //获取患者个人信息和就诊信息
        setTimeout(() => {
          const isFirst = Boolean(this.isEdit && this.patientId)
          this.getPatientInfo(isFirst);
        }, 1000);
      } else if (this.patientId && this.consultationId) {
        setTimeout(() => {
          this.getConsultationInfo();
        }, 1000);
      }
      
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
      // 拿到所有的症状3-11
      this.getsymtomlist();
      // 拿到所有的症状12
      this.getsymtomlist2();
      // 拿到所有的症状13
      this.getsymtomlist3();
      // 拿到所有的医嘱
      this.getdoctororder();
      // 拿到所有的风邪
      this.getfengxie();
      // 拿到所有的CKD
      this.getCKD();
      // 拿到所有的DM
      this.getDM();
      // 拿到所有的家族史选项
      this.getFamilyhistoryList();
      // 拿到所有的既往史选项
      this.getPasthistoryList();
      //拿到就诊地址
      this.getAllSameData0();
      // 拿到所有的现病史西医诊断选项
      this.getWesternmedicineList();
      // 拿到所有的现病史糖尿病并发症选项
      this.getDMcomplicationsList();
      // 拿到所有的现病史慢性肾脏病病因选项
      this.getCKDreasonList();
      // 拿到所有腹诊
      this.getAbdominalExaminationList();
      // 拿到所有体质
      this.getPhysiqueList();
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
              this.addForm.symptom.symtomList[index].children[subIndex]
            )
          );
          subItemList.score = 1; // 默认选中为轻症
          // 用vue的splice方法触发更新
          this.addForm.symptom.symtomList[index].children.splice(
            subIndex,
            1,
            subItemList
          );

          this.simpleSymtomValue = "";
        }
      },

      // 12
      simpleSymtomValue2(newVal, oldVal) {
        if (newVal) {
          const valueArr = newVal.split("-");
          const index = valueArr[0];
          const subIndex = valueArr[1];
          // 深拷贝一份数据
          const subItemList = JSON.parse(
            JSON.stringify(
              this.addForm.symptom.symtomList2[index].children[subIndex]
            )
          );
          subItemList.score = 1; // 默认选中为轻症
          // 用vue的splice方法触发更新
          this.addForm.symptom.symtomList2[index].children.splice(
            subIndex,
            1,
            subItemList
          );

          this.simpleSymtomValue2 = "";
        }
      },

      // 13
      simpleSymtomValue3(newVal, oldVal) {
        if (newVal) {
          const valueArr = newVal.split("-");
          const index = valueArr[0];
          const subIndex = valueArr[1];
          // 深拷贝一份数据
          const subItemList = JSON.parse(
            JSON.stringify(
              this.addForm.symptom.symtomList3[index].children[subIndex]
            )
          );
          subItemList.score = 1; // 默认选中为轻症
          // 用vue的splice方法触发更新
          this.addForm.symptom.symtomList3[index].children.splice(
            subIndex,
            1,
            subItemList
          );

          this.simpleSymtomValue3 = "";
        }
      },
    },
    methods: {
      async save() {
        this.submiting = true;

        if(this.isAddComsultation) {
          await this.addconsult();
        } else {
          await this.addquick();
        }

        this.submiting = false;
      },
      // 发布前处理
      dealCheckListBeforeSubmit() {
        // 对既往史发布前处理
        let pastHistoryList = [];
        if (this.addForm.pastHistoryList.length !== 0) {
          this.addForm.pastHistoryList.forEach((item) => {
            if (item === '99999') {
              pastHistoryList.push(`${item}:${this.addForm.pastHistoryList99999 || ''}`)
            } else {
              const index = this.pastHistoryListOptions.findIndex((option) => option.dataCode === item);
              if(index !== -1) {
                pastHistoryList.push(`${item}:${this.pastHistoryListYearList[index] || ''}`);
              }
            }
          });
        }

        // 对家族史发布前处理
        let familyHistoryList = [];
        if (this.addForm.familyHistoryList.length !== 0) {
          this.addForm.familyHistoryList.forEach((item) => {
            if (item === '99999') {
              familyHistoryList.push(`${item}:${this.addForm.familyHistoryList99999 || ''}`)
            } else {
              familyHistoryList.push(`${item}`);
            }
          });
        }

        // 对西医诊断发布前处理
        let westernmedicineList = [];
        if (this.addForm.curMedicalRecord.Westernmedicine.list !== 0) {
          this.addForm.curMedicalRecord.Westernmedicine.list.forEach((item) => {
            if (item === '99999') {
              westernmedicineList.push(`${item}:${this.addForm.westernmedicineList99999 || ''}`)
            } else {
              const index = this.WesternmedicineOptions.findIndex((option) => option.dataCode === item);
              if(index !== -1) {
                pastHistoryList.push(`${item}:${this.westernmedicineOptionsYearList[index] || ''}`);
              }
            }
          });
        }

        // 对医嘱的发布前处理
        let doctorOrder = [];
        if (this.addForm.doctorOrder.length !== 0) {
          this.addForm.doctorOrder.forEach((item) => {
            if (item === '99999') {
              doctorOrder.push(`${item}:${this.addForm.doctorOrder99999 || ''}`)
            } else {
              doctorOrder.push(`${item}`);
            }
          });
        }

        // 处方处理
        let prescription = '';
        prescription = JSON.stringify(this.addForm.prescription);

        // 辅助检查处理
        let auxiliaryExamination = '';
        auxiliaryExamination = JSON.stringify(this.addForm.auxiliaryExamination);

        return {
          pastHistoryList: pastHistoryList,
          familyHistoryList: familyHistoryList,
          westernmedicineList: westernmedicineList,
          doctorOrder: doctorOrder,
          prescription,
          auxiliaryExamination,
        };
      },
      // 获取信息后处理
      dealCheckListBeforeDetail(patientInfo, consulationInfo) {
        // 获取既往史处理
        let pastHistoryList = patientInfo.pastHistoryList || [];
        const pastHistoryListCode = [];
        pastHistoryList.forEach((item) => {
          const itemArray = item.split(':') || [];
          const code = itemArray[0];
          const desc = itemArray[1];

          pastHistoryListCode.push(code);
          if(code === '99999') {
            this.addForm.pastHistoryList99999 = desc;
          } else {
            const index = this.pastHistoryListOptions.findIndex((option) => option.dataCode === code);
            if(index !== -1) {
              this.pastHistoryListYearList[index] = desc;
            }
          }
        });
        patientInfo.pastHistoryList = pastHistoryListCode;
        

        // 获取家族史处理
        let familyHistoryList = patientInfo.familyHistoryList || [];
        const familyHistoryListCode = [];
        familyHistoryList.forEach((item) => {
          const itemArray = item.split(':') || [];
          const code = itemArray[0];
          const desc = itemArray[1];

          familyHistoryListCode.push(code);

          if(code === '99999') {
            this.addForm.familyHistoryList99999 = desc;
          }
        });
        patientInfo.familyHistoryList = familyHistoryListCode;

        // 获取西医诊断处理
        let westernmedicineList = patientInfo.curMedicalRecord.Westernmedicine.list || [];
        const westernmedicineListCode = [];
        westernmedicineList.forEach((item) => {
          const itemArray = item.split(':') || [];
          const code = itemArray[0];
          const desc = itemArray[1];

          westernmedicineListCode.push(code);
          if(code === '99999') {
            this.addForm.westernmedicineList99999 = desc;
          } else {
            const index = this.WesternmedicineOptions.findIndex((option) => option.dataCode === code);
            if(index !== -1) {
              this.westernmedicineOptionsYearList[index] = desc;
            }
          }
        });
        patientInfo.curMedicalRecord.Westernmedicine.list = westernmedicineListCode;

        // 获取医嘱处理
        let doctorOrder = consulationInfo.doctorOrder || [];
        const doctorOrderCode = [];
        doctorOrder.forEach((item) => {
          const itemArray = item.split(':') || [];
          const code = itemArray[0];
          const desc = itemArray[1];

          doctorOrderCode.push(code);

          if(code === '99999') {
            this.addForm.doctorOrder99999 = desc;
          }
        });
        consulationInfo.doctorOrder = doctorOrderCode;

        // 处方处理
        consulationInfo.prescription = consulationInfo.prescription ? JSON.parse(consulationInfo.prescription) : {
          tiaohu: '',
          prescriptions: [],
          mark: {
            value: '',
            type: '', // 颗粒、代煎、自煎
          }
        };

        // 辅助检查处理
        consulationInfo.auxiliaryExamination = consulationInfo.auxiliaryExamination ? JSON.parse(consulationInfo.auxiliaryExamination) : {
          content: '',
          time: '',
        };
        
        // 舌象、查体、腹诊图片处理
        if(consulationInfo.tonguePatternInfo) {
          this.fileList1 = consulationInfo.tonguePatternInfo.split(';').map((url, index) => {
            return {
              name: index,
              url
            }
          })
        }

        if(consulationInfo.bodyCheckInfo) {
          this.fileList2 = consulationInfo.bodyCheckInfo.split(';').map((url, index) => {
            return {
              name: index,
              url
            }
          })
        }

        if(consulationInfo.abdominalExaminationInfo) {
          this.fileList3 = consulationInfo.abdominalExaminationInfo.split(';').map((url, index) => {
            return {
              name: index,
              url
            }
          })
        }
      },
      async addquick() {
        try {
          this.addForm.vasScore.DM = this.newDMlist;
          this.addForm.vasScore.CKD = this.newCKDlist;
          this.addForm.windEvil.fengxie = this.newfengxielist;
          
          const {pastHistoryList, familyHistoryList, westernmedicineList, doctorOrder, prescription, auxiliaryExamination} = this.dealCheckListBeforeSubmit();
          const curMedicalRecord = JSON.parse(JSON.stringify(this.addForm.curMedicalRecord));
          curMedicalRecord.Westernmedicine.list = westernmedicineList;

          const params = {
            ...this.addForm,
            abdominalExamination: JSON.stringify(this.addForm.abdominalExamination),
            allergyHistory: JSON.stringify(this.addForm.allergyHistory),
            physique: JSON.stringify(this.addForm.physique),
            curMedicalRecord,
            pastHistoryList,
            familyHistoryList,
            doctorOrder,
            prescription,
            auxiliaryExamination
          };

          const res = await addquick(params);

          if(res.data.respCode === '0000') {
            this.$router.push("/patient");
          } else {
            this.$message.error(res.data.respMsg)
          }
        } catch (error) {
          
        }
      },
      // 提交复诊
      async addconsult() {
        try {
          this.addForm.vasScore.DM = this.newDMlist;
          this.addForm.vasScore.CKD = this.newCKDlist;
          this.addForm.windEvil.fengxie = this.newfengxielist;

          const {pastHistoryList, familyHistoryList, westernmedicineList, doctorOrder, prescription, auxiliaryExamination} = this.dealCheckListBeforeSubmit();
          const curMedicalRecord = JSON.parse(JSON.stringify(this.addForm.curMedicalRecord));
          curMedicalRecord.Westernmedicine.list = westernmedicineList;

          const params = {
            ...this.addForm,
            abdominalExamination: JSON.stringify(this.addForm.abdominalExamination),
            allergyHistory: JSON.stringify(this.addForm.allergyHistory),
            physique: JSON.stringify(this.addForm.physique),
            curMedicalRecord,
            pastHistoryList,
            familyHistoryList,
            doctorOrder,
            prescription,
            patientId: this.patientId,
            auxiliaryExamination,
          };

          const res = await addconsult(params);

          if ((res.data.respCode == "0000")) {
            this.$message({
              message: "提交复诊成功",
              type: "success",
            });

            this.$router.push({
              name: "patientmation",
              query: { index: this.patientId, tab: 8 },
            });
          } else {
            this.$message({
              message: res.data.respMsg,
              type: "error",
            });
          }
        } catch (error) {
          console.log(error);
        }
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
      // 症状的select的change事件监听，解决for循环赋值不生效问题
      symtomSelectChange(index, subIndex, value = -1) {
        // 深拷贝一份数据
        const subItemList = JSON.parse(
          JSON.stringify(
            this.addForm.symptom.symtomList[index].children[subIndex]
          )
        );

        if (value !== -1) {
          subItemList.score = value;
        }

        // 用vue的splice方法触发更新
        this.addForm.symptom.symtomList[index].children.splice(
          subIndex,
          1,
          subItemList
        );
      },
      // 症状的select的change事件监听，解决for循环赋值不生效问题12
      symtomSelectChange2(index, subIndex, value = -1) {
        // 深拷贝一份数据
        const subItemList = JSON.parse(
          JSON.stringify(
            this.addForm.symptom.symtomList2[index].children[subIndex]
          )
        );

        if (value !== -1) {
          subItemList.score = value;
        }

        // 用vue的splice方法触发更新
        this.addForm.symptom.symtomList2[index].children.splice(
          subIndex,
          1,
          subItemList
        );
      },
      // 症状的select的change事件监听，解决for循环赋值不生效问题12
      symtomSelectChange3(index, subIndex, value = -1) {
        // 深拷贝一份数据
        const subItemList = JSON.parse(
          JSON.stringify(
            this.addForm.symptom.symtomList3[index].children[subIndex]
          )
        );

        if (value !== -1) {
          subItemList.score = value;
        }

        // 用vue的splice方法触发更新
        this.addForm.symptom.symtomList3[index].children.splice(
          subIndex,
          1,
          subItemList
        );
      },
      // 拿到所有的症状3-11
      getsymtomlist() {
        const symtomMap = {};
        var typeList = [3, 4, 5, 6, 7, 8, 9, 10, 11];
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
              this.addForm.symptom.symtomList.push({
                typeId: type,
                typeName: symtomMap[type][0]["typeId"],
                children: symtomMap[type], // 父子结构
              });
            }
          });

          console.log(
            "this.addForm.symptom.symtomList",
            this.addForm.symptom.symtomList
          );
        });
      },
      // 拿到所有的症状12
      getsymtomlist2() {
        const symtomMap = {};
        var typeList2 = [12];
        var committypeList2 = typeList2 + "";
        getcommonlist(committypeList2).then((res) => {
          console.log("获取12类型数据的基本数据", res.data);
          // if ((res.data.respCode == "0000") | (res.data.respCode == "0001")) {
          //   this.$message({
          //     message: "获取类型数据的基本数据成功",
          //     type: "success",
          //   });
          // }
          this.commonDataEntityList2 = res.data.commonDataEntityList;
          typeList2.forEach((type) => {
            const sameTypeList =
              this.commonDataEntityList2.filter((dataEntity) => {
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

          typeList2.forEach((type) => {
            if (symtomMap[type] && symtomMap[type].length !== 0) {
              // 给症状赋值
              this.addForm.symptom.symtomList2.push({
                typeId: type,
                typeName: symtomMap[type][0]["typeId"],
                children: symtomMap[type], // 父子结构
              });
            }
          });

          console.log(
            "this.addForm.symptom.symtomList2",
            this.addForm.symptom.symtomList2
          );
        });
      },
      // 拿到所有的症状13
      getsymtomlist3() {
        const symtomMap = {};
        var typeList3 = [13];
        var committypeList3 = typeList3 + "";
        getcommonlist(committypeList3).then((res) => {
          console.log("获取12类型数据的基本数据", res.data);
          // if ((res.data.respCode == "0000") | (res.data.respCode == "0001")) {
          //   this.$message({
          //     message: "获取类型数据的基本数据成功",
          //     type: "success",
          //   });
          // }
          this.commonDataEntityList3 = res.data.commonDataEntityList;
          typeList3.forEach((type) => {
            const sameTypeList =
              this.commonDataEntityList3.filter((dataEntity) => {
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

          typeList3.forEach((type) => {
            if (symtomMap[type] && symtomMap[type].length !== 0) {
              // 给症状赋值
              this.addForm.symptom.symtomList3.push({
                typeId: type,
                typeName: symtomMap[type][0]["typeId"],
                children: symtomMap[type], // 父子结构
              });
            }
          });

          console.log(
            "this.addForm.symptom.symtomList3",
            this.addForm.symptom.symtomList3
          );
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
      // 拿到所有的CKD
      getCKD() {
        var typeList = [17];
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
      // 快速新增患者信息
      // async addconsult() {
      //   //   this.nowTime = new Date().valueOf();
      //   this.addForm.vasScore.DM = this.newDMlist;
      //   this.addForm.vasScore.CKD = this.newCKDlist;
      //   this.addForm.windEvil.fengxie = this.newfengxielist;
      //   //   this.addconsultform.createTinme = this.nowTime;
      //   //   await addconsult(this.addconsultform).then((res) => {
      //   //     console.log("this.consultqueryInfo", this.consultqueryInfo);
      //   //     console.log("新增患者就诊信息", res.data);
      //   //     if (res.data.respCode == "0000") {
      //   //       // this.$message({
      //   //       //   message: "该患者就诊信息添加成功",
      //   //       //   type: "success",
      //   //       // });
      //   //       this.dialogFormVisible = false;
      //   //       this.getpationconsult();
      //   //     }
      //   //   });
      // },
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
          this.pastHistoryListYearList = new Array(res.data.commonDataEntityList.length).fill('');
        });
      },
      // 拿到就诊基本数据表数据(就诊地址)
      async getAllSameData0() {
        await getAllSameData0().then((res) => {
          console.log("获取就诊地址单一类型的全部数据", res.data);
          // 放入list
          this.locallist = res.data.commonDataEntities;
          console.log("获取就诊地址locallist", this.locallist);
        });
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
          this.westernmedicineOptionsYearList = new Array(res.data.commonDataEntityList.length).fill('');
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
      getAbdominalExaminationList() {
        var typeList = [31, 32, 33, 34, 35, 36, 37];
        var committypeList = typeList + "";
        getcommonlist(committypeList).then((res) => {
          const abdominalExaminationList_ = res.data.commonDataEntityList;
          const abdominalExaminationList = [];
          for (let key in this.abdominalExaminationTypeList) {
            const typeId_ = key.split('_')[1];
            const index_ = abdominalExaminationList.findIndex((item) => item.key == typeId_);
            if (index_ === -1) {
              abdominalExaminationList.push({
                key: key,
                label: this.abdominalExaminationTypeList[key],
                children: abdominalExaminationList_.filter((item) => item.typeId == typeId_),
              });
            }
          }

          this.abdominalExaminationList = abdominalExaminationList;
        });
      },
      getPhysiqueList() {
        var typeList = [25, 26, 27, 28, 29, 30];
        var committypeList = typeList + "";
        getcommonlist(committypeList).then((res) => {
          const tempList_ = res.data.commonDataEntityList;
          const physiqueList = [];
          for (let key in this.physiqueTypeList) {
            const typeId_ = key.split('_')[1];
            const index_ = physiqueList.findIndex((item) => item.key == typeId_);
            if (index_ === -1) {
              physiqueList.push({
                key: key,
                label: this.physiqueTypeList[key],
                children: tempList_.filter((item) => item.typeId == typeId_),
              });
            }
          }

          this.physiqueList = physiqueList;
        });
      },
      // bmi
      bmishow() {
        if (this.addForm.weight && this.addForm.height) {
          this.bmidata =
            Number((this.addForm.weight /
            ((this.addForm.height / 100) * (this.addForm.height / 100))).toFixed(4));
        } else {
          this.bmidata = 0;
        }
      },
      // 拿到该患者第一次就诊信息和他的基本信息
      getPatientInfo(isFirst = false) {
        this.loading = true;
        getPatientInfo(this.patientId, isFirst).then((res) => {
          const consulationInfo = res.data.consultationDto;
          const patientInfo = res.data.patientDto;

          this.basicInfoKeys = Object.keys(patientInfo);
          this.consultationKeys = Object.keys(consulationInfo);
          this.consultationId = consulationInfo.id;
          try {
            patientInfo.allergyHistory = patientInfo.allergyHistory ? JSON.parse(patientInfo.allergyHistory) : '-';
            patientInfo.physique = patientInfo.physique ? JSON.parse(patientInfo.physique) : '-';
            consulationInfo.abdominalExamination = consulationInfo.abdominalExamination ? JSON.parse(consulationInfo.abdominalExamination) : '-';
            patientInfo.curMedicalRecord = patientInfo.curMedicalRecord || {
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

            this.dealCheckListBeforeDetail(patientInfo, consulationInfo);

            consulationInfo.medicalLocId = consulationInfo.medicalLoc?.id;
            consulationInfo.consultTime = new Date();

            if (patientInfo.pastHistoryList && patientInfo.pastHistoryList.length !== 0) {
              patientInfo.pastHistoryList = patientInfo.pastHistoryList.map((item) => String(item));
            }

            if (patientInfo.familyHistoryList && patientInfo.familyHistoryList.length !== 0) {
              patientInfo.familyHistoryList = patientInfo.familyHistoryList.map((item) => String(item));
            }

            this.bmidata = patientInfo.bmiIndex;

            this.addForm = {
              ...this.addForm,
              ...patientInfo,
              ...consulationInfo,
            }

            this.newDMlist = this.addForm.vasScore.DM;
            this.newCKDlist = this.addForm.vasScore.CKD;
            this.newfengxielist = this.addForm.windEvil.fengxie;
          } catch (error) {
            console.log('error', error);
          }

          this.loading = false;
        });
      },
      // 获取患者复诊信息
      getConsultationInfo() {
        this.loading = true;
        getConsultationInfo(this.consultationId, this.patientId).then((res) => {
          const consulationInfo = res.data.consultationDto;
          const patientInfo = res.data.patientDto;

          this.basicInfoKeys = Object.keys(patientInfo);
          this.consultationKeys = Object.keys(consulationInfo);
          this.consultationId = consulationInfo.id;
          try {
            patientInfo.allergyHistory = patientInfo.allergyHistory ? JSON.parse(patientInfo.allergyHistory) : '-';
            patientInfo.physique = patientInfo.physique ? JSON.parse(patientInfo.physique) : '-';
            consulationInfo.abdominalExamination = consulationInfo.abdominalExamination ? JSON.parse(consulationInfo.abdominalExamination) : '-';
            patientInfo.curMedicalRecord = patientInfo.curMedicalRecord || {
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

            this.dealCheckListBeforeDetail(patientInfo, consulationInfo);

            consulationInfo.medicalLocId = consulationInfo.medicalLoc?.id;
            consulationInfo.consultTime = new Date();

            if (patientInfo.pastHistoryList && patientInfo.pastHistoryList.length !== 0) {
              patientInfo.pastHistoryList = patientInfo.pastHistoryList.map((item) => String(item));
            }

            if (patientInfo.familyHistoryList && patientInfo.familyHistoryList.length !== 0) {
              patientInfo.familyHistoryList = patientInfo.familyHistoryList.map((item) => String(item));
            }

            this.bmidata = patientInfo.bmiIndex;

            this.addForm = {
              ...this.addForm,
              ...patientInfo,
              ...consulationInfo,
            }

            this.newDMlist = this.addForm.vasScore.DM;
            this.newCKDlist = this.addForm.vasScore.CKD;
            this.newfengxielist = this.addForm.windEvil.fengxie;
          } catch (error) {
            console.log('error', error);
          }

          this.loading = false;
        });
      },
      onSuccess2(response, file, fileList) {
        this.addForm.bodyCheckInfo = fileList.map((item) => {
          if (item.response && item.response.picUrls && item.response.picUrls[0]) {
            return item.response.picUrls[0];
          } else if (item.url) {
            return item.url;
          } else {
            return '';
          }
        }).join(';');
      },
      onRemove2(file, fileList) {
        this.addForm.bodyCheckInfo = fileList.map((item) => {
          if (item.response && item.response.picUrls && item.response.picUrls[0]) {
            return item.response.picUrls[0];
          } else if (item.url) {
            return item.url;
          } else {
            return '';
          }
        }).join(';');
      },
      onSuccess1(response, file, fileList) {
        this.addForm.tonguePatternInfo = fileList.map((item) => {
          if (item.response && item.response.picUrls && item.response.picUrls[0]) {
            return item.response.picUrls[0];
          } else if (item.url) {
            return item.url;
          } else {
            return '';
          }
        }).join(';');
      },
      onRemove1(file, fileList) {
        this.addForm.tonguePatternInfo = fileList.map((item) => {
          if (item.response && item.response.picUrls && item.response.picUrls[0]) {
            return item.response.picUrls[0];
          } else if (item.url) {
            return item.url;
          } else {
            return '';
          }
        }).join(';');
      },
      onSuccess3(response, file, fileList) {
        this.addForm.abdominalExaminationInfo = fileList.map((item) => {
          if (item.response && item.response.picUrls && item.response.picUrls[0]) {
            return item.response.picUrls[0];
          } else if (item.url) {
            return item.url;
          } else {
            return '';
          }
        }).join(';');
      },
      onRemove3(file, fileList) {
        this.addForm.abdominalExaminationInfo = fileList.map((item) => {
          if (item.response && item.response.picUrls && item.response.picUrls[0]) {
            return item.response.picUrls[0];
          } else if (item.url) {
            return item.url;
          } else {
            return '';
          }
        }).join(';');
      },
      // 提交编辑
      submitEdit() {
        Promise.all([this.updatePatient(), this.updateConsult()]);
      },
      async updatePatient() {
        try {
          this.addForm.vasScore.DM = this.newDMlist;
          this.addForm.vasScore.CKD = this.newCKDlist;
          this.addForm.windEvil.fengxie = this.newfengxielist;
          
          const {pastHistoryList, familyHistoryList, westernmedicineList, doctorOrder, prescription, auxiliaryExamination} = this.dealCheckListBeforeSubmit();
          const curMedicalRecord = JSON.parse(JSON.stringify(this.addForm.curMedicalRecord));
          curMedicalRecord.Westernmedicine.list = westernmedicineList;

          const params = {
            ...this.addForm,
            abdominalExamination: JSON.stringify(this.addForm.abdominalExamination),
            allergyHistory: JSON.stringify(this.addForm.allergyHistory),
            physique: JSON.stringify(this.addForm.physique),
            curMedicalRecord,
            pastHistoryList,
            familyHistoryList,
            doctorOrder,
            prescription,
            auxiliaryExamination,
            id: this.patientId
          };

          const params_ = {};

          this.basicInfoKeys.forEach((key) => {
            params_[key] = params[key];
          })

          const res = await editPatientInfo(params_);

          if(res.data.respCode === '0000') {
            this.$message.success('保存患者基础信息成功')
          } else {
            this.$message.error(res.data.respMsg)
          }

        } catch (error) {
          
        }
      },
      // 提交复诊
      async updateConsult() {
        try {
          this.addForm.vasScore.DM = this.newDMlist;
          this.addForm.vasScore.CKD = this.newCKDlist;
          this.addForm.windEvil.fengxie = this.newfengxielist;

          const {pastHistoryList, familyHistoryList, westernmedicineList, doctorOrder, prescription, auxiliaryExamination} = this.dealCheckListBeforeSubmit();
          const curMedicalRecord = JSON.parse(JSON.stringify(this.addForm.curMedicalRecord));
          curMedicalRecord.Westernmedicine.list = westernmedicineList;

          const params = {
            ...this.addForm,
            abdominalExamination: JSON.stringify(this.addForm.abdominalExamination),
            allergyHistory: JSON.stringify(this.addForm.allergyHistory),
            physique: JSON.stringify(this.addForm.physique),
            curMedicalRecord,
            pastHistoryList,
            familyHistoryList,
            doctorOrder,
            prescription,
            patientId: this.patientId,
            auxiliaryExamination,
          };

          const res = await editConsultationInfo(params);

          if ((res.data.respCode == "0000")) {
            this.$message({
              message: "保存就诊信息成功",
              type: "success",
            });
          } else {
            this.$message({
              message: res.data.respMsg,
              type: "error",
            });
          }
        } catch (error) {
          console.log(error);
        }
      },
    },
  };

</script>
<style lang="scss" scoped>
  .input-style {
    width: 260px;
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

          &.big {
            width: 180px;
          }
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
        }
      }
    }
  }

  .border-card {
    ::v-deep {
      .el-tabs__content {
        height: calc(100vh - 92px);
        overflow-y: auto;
      }
    }
  }

  .submit-footer {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: end;
    padding: 0 20px;
    position: absolute;
    z-index: 3;
    right: 8px;
  }

  .slider1 {
    margin: 0 8px;
  }

</style>
