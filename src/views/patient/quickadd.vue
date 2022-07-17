<template lang="">
    <div>
    <el-tabs v-model="activeName" type="border-card" >
        <el-tab-pane label="基本信息" name="1">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>基本信息</span>  
                </div>
                <div class="dialog-content">
                    <el-form
                      class="medical-form"
                      label-width="80px"
                      label-position="top"
                      size="medium"
                      ref="addFormRef"
                      :model="addForm"
                      :rules="addRules"
                    >
                    <el-row>
                      
                        <el-col :span="18">
                          <div class="grid-content">
                            <el-form-item label="患者姓名" prop="patientName">
                              <el-input
                                class="input-style"
                                v-model="addForm.patientName"
                              ></el-input>
                            </el-form-item>
                          </div>
                        </el-col>
                        <el-col :span="18">
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
                        <el-col :span="18">
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
            <!-- <el-col :span="18">
              <div class="grid-content">
                <el-form-item label="ID号">
                  <el-input
                    class="input-style"
                    v-model="addForm.outpatientId"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col> -->
            <el-col :span="18">
                          <div class="grid-content">
                            <el-form-item label="门诊id" prop="outpatientId">
                              <el-input
                                class="input-style"
                                v-model="addForm.outpatientId"
                              ></el-input>
                            </el-form-item>
                          </div>
                        </el-col>
            <el-col :span="18">
              <div class="grid-content">
                <el-form-item label="身份证号">
                  <el-input
                    class="input-style"
                    v-model="addForm.idCard"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="18">
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
            <el-col :span="18">
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
            <el-col :span="18">
              <el-form-item label="就诊地点" :label-width="formLabelWidth">
                <el-select
                  v-model="addForm.medicalLocId"
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
                  v-model="addForm.consultTime"
                  style="width: 240px"
                  type="date"
                  placeholder="选择就诊日期"
                >
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
                <div slot="header" class="clearfix">
                  <span>疾病资料</span>  
                </div>
                <div class="dialog-content">
                    <el-form
                      class="medical-form"
                      label-width="80px"
                      label-position="top"
                      size="medium"
                      ref="addFormRef"
                      :model="addForm"
                    >
                   <el-form-item label="主述">
            <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入内容"
              v-model="addForm.mainComplaint"
            ></el-input>
          </el-form-item>
          
          <el-form-item label="现病史">
            <el-card shadow="never">
              
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
                    </el-form>
                </div>
            </el-card>
    </el-tab-pane>
    <el-tab-pane label="辅助检查" name="3">
        <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>辅助检查</span>  
                </div>
                <TinymceEditor style="width: 70vw" />
            </el-card>
    </el-tab-pane>
    <el-tab-pane label="中医四诊" name="4">
         <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>中医四诊</span>  
                </div>
                <div class="dialog-content">
                    <el-form
                      class="medical-form"
                      label-width="80px"
                      label-position="top"
                      size="medium"
                      ref="addFormRef"
                      :model="addForm"
                    >
                <el-form-item label="舌象" :label-width="formLabelWidth">
          <!-- <el-switch
              v-model="simpleSymtomHideStatus2"
              style="margin-bottom: 8px"
              active-text="复杂模式"
              inactive-text="简单模式"
            >
            </el-switch> -->
            <div v-if="!simpleSymtomHideStatus2" class="simple-symtom-type">
              <el-card shadow="never">
                <el-select v-model="simpleSymtomValue2" filterable clearable>
                  <el-option-group
                    v-for="(symtom, index) in addForm.symptom.symtomList2"
                    :key="symtom.typeId"
                    :label="typeNameList[symtom.typeId]"
                  >
                    <el-option
                      v-for="(subSymtom, subIndex) in symtom.children"
                      :key="symtom.typeId + '-' + subSymtom.id"
                      :label="subSymtom.dataName"
                      :disabled="subSymtom.score === 0 ? false : true"
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
                      v-for="(symtom, index) in addForm.symptom.symtomList2"
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
                              addForm.symptom.symtomList2[index].children[
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
                            @click="symtomSelectChange2(index, subIndex, 0)"
                          ></i>
                        </div>
                      </template>
                    </template>
                  </div>
                </div>
              </el-card>
            </div>
          
          </el-form-item>
          <el-form-item label="脉象" :label-width="formLabelWidth">
          <div v-if="!simpleSymtomHideStatus3" class="simple-symtom-type">
              <el-card shadow="never">
                <el-select v-model="simpleSymtomValue3" filterable clearable>
                  <el-option-group
                    v-for="(symtom, index) in addForm.symptom.symtomList3"
                    :key="symtom.typeId"
                    :label="typeNameList[symtom.typeId]"
                  >
                    <el-option
                      v-for="(subSymtom, subIndex) in symtom.children"
                      :key="symtom.typeId + '-' + subSymtom.id"
                      :label="subSymtom.dataName"
                      :disabled="subSymtom.score === 0 ? false : true"
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
                      v-for="(symtom, index) in addForm.symptom.symtomList3"
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
      v-model="addForm.symptom.symtomList3[index].children[subIndex].score"
      class="symtom-type-block-item-select"
      @change="symtomSelectChange3(index, subIndex)"
    >
      <el-option :value="0" label="无"></el-option>
      <el-option :value="1" label="轻"></el-option>
      <el-option :value="2" label="中"></el-option>
      <el-option :value="3" label="重"></el-option>
    </el-select>
    <i
      class="icon el-icon-error symtom-type-block-item-delete"
      @click="symtomSelectChange3(index, subIndex, 0)"
    ></i>
  </div>
</template>
                    </template>
                  </div>
                </div>
              </el-card>
            </div>
          </el-form-item>
          <el-form-item label="基本查体" :label-width="formLabelWidth">
            <el-input type="textarea" :rows="5" placeholder="请输入基本查体" v-model="addForm.bodyCheck"
              autocomplete="off"></el-input>
          </el-form-item>
        <el-form-item label="腹诊" :label-width="formLabelWidth">
            <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="addForm.abdominalExamination"
              autocomplete="off"></el-input>
          </el-form-item>
                    </el-form>
                </div>
                
            </el-card>
    </el-tab-pane>
    <el-tab-pane label="量表评分" name="5">
        <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>量表评分</span>  
                </div>
                <div class="dialog-content">
                    <el-form
                      class="medical-form"
                      label-width="80px"
                      label-position="top"
                      size="medium"
                      ref="addFormRef"
                      :model="addForm"
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
                        v-model="addForm.vasScore.worstSymptom"
                        autocomplete="off"
                      ></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :span="10" :offset="3">
                  <div class="grid-content">
                    <span class="block-title">最不适症状程度:</span>
                    <el-slider
                      v-model="addForm.vasScore.degree"
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
                    v-model="addForm.vasScore.lifeQuality"
                    class="slider1"
                     show-input
                  ></el-slider>
                </el-col>
                <el-col :span="8">
                  <span class="block-title">健康状况:</span>
                  <el-slider
                    v-model="addForm.vasScore.healthyStatus"
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
                    v-model="addForm.windEvil.diagnosticResult"
                    label="1"
                    >是</el-radio
                  >
                  <el-radio
                    v-model="addForm.windEvil.diagnosticResult"
                    label="0"
                    >否</el-radio
                  >
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
                <div slot="header" class="clearfix">
                  <span>诊断记录</span>  
                </div>
                <div class="dialog-content">
                    <el-form
                      class="medical-form"
                      label-width="80px"
                      label-position="top"
                      size="medium"
                      ref="addFormRef"
                      :model="addForm"
                    >
                     <el-card shadow="never">
           <span class="block-title">西医诊断及病程诊断</span>
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
              </el-card>

              

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
                    v-for="(symtom, index) in addForm.symptom.symtomList"
                    :key="symtom.typeId"
                    :label="typeNameList[symtom.typeId]"
                  >
                    <el-option
                      v-for="(subSymtom, subIndex) in symtom.children"
                      :key="symtom.typeId + '-' + subSymtom.id"
                      :label="subSymtom.dataName"
                      :disabled="subSymtom.score === 0 ? false : true"
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
                      v-for="(symtom, index) in addForm.symptom.symtomList"
                    >
                    <div>
                      
                    </div>
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
      v-model="addForm.symptom.symtomList[index].children[subIndex].score"
      class="symtom-type-block-item-select"
      @change="symtomSelectChange(index, subIndex)"
    >
      <el-option :value="0" label="无"></el-option>
      <el-option :value="1" label="轻"></el-option>
      <el-option :value="2" label="中"></el-option>
      <el-option :value="3" label="重"></el-option>
    </el-select>
    <i
      class="icon el-icon-error symtom-type-block-item-delete"
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
                  v-for="(symtom, index) in addForm.symptom.symtomList"
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
                          addForm.symptom.symtomList[index].children[
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

           <el-form-item label="体质诊断">
                  <el-input
                    class="input-style"
                    type="number"
                    v-model="addForm.physiqueId"
                  ></el-input>
                </el-form-item>


                
                 <el-form-item label="辩证诊断" :label-width="formLabelWidth">
            <span class="block-title">虚：</span>
            <el-checkbox-group v-model="addForm.symptomCategories.empty">
              <el-checkbox
                v-for="symtom in xulist"
                :key="symtom.dataName"
                :label="symtom.dataName"
              >
              </el-checkbox>
            </el-checkbox-group>
            <span class="block-title">实：</span>
            <el-checkbox-group v-model="addForm.symptomCategories.real">
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
            <el-checkbox-group v-model="addForm.diseaseLocation.viscera">
              <el-checkbox
                v-for="symtom in zangfulist"
                :key="symtom.dataName"
                :label="symtom.dataName"
              >
              </el-checkbox>
            </el-checkbox-group>
            <span class="block-title">经脉：</span>
            <el-checkbox-group
              v-model="addForm.diseaseLocation.meridian"
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
              v-model="addForm.diseaseLocation.defender"
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
              v-model="addForm.diseaseLocation.tripleFocus"
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
                </div>
                
            </el-card>
    </el-tab-pane>
    <el-tab-pane label="治疗信息" name="7">
        <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>治疗信息</span>  
                </div>
                <div class="dialog-content">
                    <el-form
                      class="medical-form"
                      label-width="80px"
                      label-position="top"
                      size="medium"
                      ref="addFormRef"
                      :model="addForm"
                    >
            <el-form-item label="处方" :label-width="formLabelWidth">
            <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="addForm.prescription"
              autocomplete="off"></el-input>
          </el-form-item>
            <el-form-item label="其他治疗" :label-width="formLabelWidth">
            <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="addForm.otherTreatment"
              autocomplete="off"></el-input>
          </el-form-item>
                    </el-form>
                </div>
                
            </el-card>
 <el-divider></el-divider>
             <el-button type="primary" @click="addquick">提交录入</el-button>
    </el-tab-pane>
  </el-tabs>
    </div>
</template>
<script>
import {
  getPatientList,
  addPatient,
  getpationconsult,
  addconsult,
  patientDelete,
  getAllSameData0,
  getAllSameData1,
  getAllSameData2,
  getcommonlist,
  patientUpdate,
  deleteconsult,
  addquick,
} from "@/api/patient";
import TinymceEditor from "@/components/Tinymce";
export default {
  components: {
    TinymceEditor,
  },
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
      symtomActiveNames: "1",
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
      formLabelWidth: "120px",
      activeName: "1",
      //现病史选择的数据
      //curMedicalRecordListOptions: [],
      WesternmedicineOptions: [],
      DMcomplicationsOptions: [],
      CKDreasonOptions: [],
      //   快速增加患者表单
      addForm: {
        // 腹诊
        abdominalExamination: "",
        // 其他资料
        additionalInfo: "",
        // 过敏史
        allergyHistory: "",
        // 辅助检查
        auxiliaryExamination: "",
        // 出生日期
        birthday: "",
        // 基本查体
        bodyCheck: "",
        // 病例特点
        caseFeature: "",
        // 合并用药
        combinationTherapy: "",
        // 就诊时间
        consultTime: "",
        // 创建时间
        createTinme: "",
        // 现病史
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
        gender: "",
        height: "",
        idCard: "",
        mainComplaint: "",
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
            amount: 0,
          },
          whiteWine: {
            amount: 0,
          },
          beer: {
            amount: 0,
          },
        },
        physiqueId: "",
        prescription: "",
        pulsePattern: "",
        status: 1,
        symptom: {
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
    };
  },
  created() {
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
    addquick() {
      this.addForm.vasScore.DM = this.newDMlist;
      this.addForm.vasScore.CKD = this.newCKDlist;
      addquick(this.addForm).then((res) => {
        console.log("新增快速录入", res.data);
        this.$router.push("/patient");
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
    async addconsult() {
      //   this.nowTime = new Date().valueOf();
      this.addForm.vasScore.DM = this.newDMlist;
      this.addForm.vasScore.CKD = this.newCKDlist;
      this.addForm.windEvil.fengxie = this.newfengxielist;
      //   this.addconsultform.createTinme = this.nowTime;
      //   await addconsult(this.addconsultform).then((res) => {
      //     console.log("this.consultqueryInfo", this.consultqueryInfo);
      //     console.log("新增患者就诊信息", res.data);
      //     if (res.data.respCode == "0000") {
      //       // this.$message({
      //       //   message: "该患者就诊信息添加成功",
      //       //   type: "success",
      //       // });
      //       this.dialogFormVisible = false;
      //       this.getpationconsult();
      //     }
      //   });
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
  },
};
</script>
<style lang="scss" scoped>
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
      }
    }
  }
}
</style>