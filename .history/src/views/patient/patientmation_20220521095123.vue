<template>
  <div>
    {{ this.$route.params.index }}
  </div>
</template>
<script>
import { getPatientList } from "@/api/patient";
export default {
  name: "patientmation",
  data() {
    return {
      // 该患者的表单
      patinentform: {
        id: "",
        patientName: "",
        gender: "",
        idCard: "",
        telephone: "",
        birthday: "",
        curMedicalRecord: "",
        pastHistory: "",
        personalHistory: "",
        familyHistory: "",
        status: 1,
        createTinme: "",
        modifiedTime: "",
      },
      dialogFormVisible: false,
      // 患者总数
      patienttotal: "",
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
      // 存放患者的数据和数量
      patientData: {
        patientList: [],
        total: 0,
      },
    };
  },
  created() {
    this.patienttotal = this.$route.params.total;
    this.queryInfo.pageSize = this.patienttotal;
    // console.log("进入patientmation");
    console.log("patienttotal", this.patienttotal);
    this.getPatientList();
    this.getIDlist(this.$route.params.index);
  },
  methods: {
    getPatientList() {
      getPatientList(this.queryInfo).then((res) => {
        console.log("获取患者列表", res.data);
        if (res.data.respCode == "0000") {
          this.$message({
            message: "患者列表查询成功",
            type: "success",
          });
        }
        this.patientData.patientList = res.data.patientPoolEntities;
        this.patientData.total = res.data.totalCount;
        console.log("总数", this.patientData.total);
      });
    },
    getIDlist(id) {
        for (const i=0 ; i <this.patientData.total; i++) {
            if(patientData.patientList)
        }
        
    },
  },
};
</script>
<style lang="">
</style>