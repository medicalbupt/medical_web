<template lang="">
    <div>
        {{this.$route.params.index
}}
    </div>
</template>
<script>
import { getPatientList } from "@/api/patient";
export default {
  data() {
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        //排序依据字段
        orderColumns: "id",
        orderType: "DESC",
        // 当前的页数
        currentPage: 1,
        // 当前每次显示多少条数据
        pageSize: 5,
      },
      // 存放用户的数据和数量
      patientData: {
        patientList: [],
        total: 0,
      },
      created() {
        this.getPatientList();
      },
      methods: {
        getPatientList() {
          // const { data: res } = await this.$http.get('users', {
          //   params: this.queryInfo
          // })
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
      },
    };
  },
};
</script>
<style lang="">
</style>