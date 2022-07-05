<template>
  <div>
    <el-card>
      <el-form label-position="top" label-width="100px" size="medium">
        <el-tabs :tab-position="'left'">
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="姓名" prop="patient_name">
              <el-input type="text"></el-input>
            </el-form-item>

            <el-form-item label="门诊号" prop="">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="出生日期" prop="">
              <el-input type="date"></el-input>
            </el-form-item>
            <el-form-item label="就诊时间" prop="">
              <el-input type="date"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="就诊地点" prop="">
              <el-radio v-model="radio" label="1">东直门医院本部</el-radio>
              <el-radio v-model="radio" label="2">东直门医院国际部</el-radio>
              <el-radio v-model="radio" label="3">鼓楼中医院</el-radio>
            </el-form-item>
            <!-- 级联选择器 -->
          </el-tab-pane>
          <el-tab-pane label="病史采集" name="1">
            <el-form-item label="主诉" prop="">
              <el-input type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="现病史" prop="">
              <el-input
                type="textarea"
                placeholder="输入确诊时间、病例特点等"
              ></el-input>
            </el-form-item>
            <el-form-item label="既往史" prop="">
              <el-input type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="个人史" prop="">
              <el-input
                type="textarea"
                placeholder="输入患者饮食爱好、情志特点、特殊嗜好、吸烟史、饮酒史等"
              ></el-input>
            </el-form-item>
            <el-form-item label="家族史" prop="">
              <el-input type="textarea"></el-input>
            </el-form-item>
          </el-tab-pane>

          <el-tab-pane label="其他疾病资料" name="2">
            <el-form-item label="辅助检查" prop="">
              <tinymce></tinymce>
            </el-form-item>
            <el-form-item label="其他资料" prop="">
              <tinymce></tinymce>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="中医四诊" name="3">
            <!-- action 表示图片要上传到的后台API地址
             handlePreview 点击预览触发
             handleRemove 删除图片触发
             fileList 指定文件列表
             list-type 指定预览组件的呈现方式 -->
            <el-form-item label="舌象" prop="">
              <tinymce :height="200"></tinymce>
            </el-form-item>
            <el-form-item label="脉象" prop="">
              <tinymce :height="200"></tinymce>
            </el-form-item>
            <el-form-item label="基本查体" prop="">
              <tinymce :height="200"></tinymce>
            </el-form-item>
            <el-form-item label="腹诊" prop="">
              <tinymce :height="200"></tinymce>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="诊断" name="4">
            <el-form-item label="主病诊断" prop="">
              <el-select v-model="disease" placeholder="请选择">
                <el-option
                  v-for="item in diseaseList"
                  :key="item.disease"
                  :label="item.label"
                  :value="item.disease"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="证候分类" prop="">
              <el-checkbox-group v-model="checkList">
                <el-checkbox label="结热症"></el-checkbox>
                <el-checkbox label="湿热证"></el-checkbox>
                <el-checkbox label="郁热症"></el-checkbox>
                <el-checkbox label="热度症"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="其他诊断" prop="">
              <el-select v-model="elsedisease" placeholder="请选择">
                <el-option
                  v-for="item in elsediseaseList"
                  :key="item.elsedisease"
                  :label="item.label"
                  :value="item.elsedisease"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="治疗" name="5">
            <el-form-item label="治法" prop="">
              <el-input type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="处方" prop="">
              <el-input type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="其他治疗" prop="">
              <el-input type="textarea"></el-input>
            </el-form-item>

            <!--            添加按钮-->
            <el-button type="primary">录入</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// import tinymce from "tinymce/tinymce";
// import Editor from "@tinymce/tinymce-vue";
// import "tinymce/themes/silver/theme";
//import tinymce from "../src/components/Tinymce";
import tinymce from "../../components/Tinymce/index.vue";

export default {
  components: {
    tinymce,
  },
  data() {
    return {
      radio: "1",

      checkList: [],
      options: [
        {
          value: "选项1",
          label: "男",
        },
        {
          value: "选项2",
          label: "女",
        },
      ],
      value: "",
      diseaseList: [
        {
          disease: "选项1",
          label: "糖尿病",
        },
        {
          disease: "选项2",
          label: "糖尿病肾病",
        },
        {
          disease: "选项3",
          label: "糖尿病视网膜病变",
        },
        {
          disease: "选项4",
          label: "糖尿病周围神经病变",
        },
        {
          disease: "选项5",
          label: "糖尿病胃轻瘫",
        },
      ],
      disease: "",
      elsediseaseList: [
        {
          elsedisease: "选项1",
          label: "糖尿病",
        },
        {
          elsedisease: "选项2",
          label: "糖尿病肾病",
        },
        {
          elsedisease: "选项3",
          label: "糖尿病视网膜病变",
        },
        {
          elsedisease: "选项4",
          label: "糖尿病周围神经病变",
        },
        {
          elsedisease: "选项5",
          label: "糖尿病胃轻瘫",
        },
      ],
      elsedisease: "",
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>

<style lang="scss" scoped>
.el-steps {
  margin: 15px 0;
}
.el-step__title {
  font-size: 13px;
}
.el-checkbox {
  margin: 0 5px 0 0 !important;
}
.perviewImg {
  width: 100%;
}
.AddBtn {
  margin-top: 15px;
}
</style>
