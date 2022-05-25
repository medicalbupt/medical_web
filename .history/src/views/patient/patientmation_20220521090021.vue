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
      },
    };
  },
};
</script>
<style lang="">
</style>