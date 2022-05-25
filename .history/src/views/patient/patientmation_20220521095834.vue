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
      // 该患者的数组
      patinentform: [],
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
    // console.log("结束getIDlist");
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
      console.log("进入getIDlist函数");
      console.log("this.queryInfo.pageSize", this.queryInfo.pageSize);
      for (var i = 0; i < this.queryInfo.pageSize; i++) {
        if (this.patientData.patientList[i].id == id) {
          this.patinentform = this.patientData.patientList[i];
          console.log("该id为", this.patinentform);
          return;
        }
      }
    },
  },
};
</script>
<style lang="">
</style>