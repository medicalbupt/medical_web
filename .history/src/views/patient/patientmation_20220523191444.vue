<template>
  <div>
    <el-descriptions
      class="margin-top"
      title="该患者信息"
      direction="vertical"
      :column="3"
      border
    >
      <template slot="extra">
        <el-button type="text" size="small">添加复诊</el-button>
      </template>
      <!-- 文字展示的地方要换形式 -->

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
        {{ patinentform.gender }}
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
          <i class="el-icon-ship"></i>
          患者出生日期
        </template>
        {{ patinentform.birthday }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-pie-chart"></i>
          患者创建时间
        </template>
        {{ patinentform.createTinme }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-pie-chart"></i>
          患者修改时间
        </template>
        {{ patinentform.modifiedTime }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-notebook-1"></i>
          患者现病史
        </template>
        {{ patinentform.curMedicalRecord }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-notebook-2"></i>
          患者既往史
        </template>
        {{ patinentform.pastHistory }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-notebook-2"></i>
          患者个人史
        </template>
        {{ patinentform.personalHistory }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-notebook-2"></i>
          患者家族史
        </template>
        {{ patinentform.familyHistory }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-s-flag"></i>
          患者状态
        </template>
        {{ patinentform.status }}
      </el-descriptions-item>
    </el-descriptions>

    <el-divider></el-divider>
    <h3 class="h3">该患者诊断信息:</h3>

    <!-- 展示患者诊断信息 -->
    <el-table :data="tableData" class="table1">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="所属店铺">
              <span>{{ props.row.shop }}</span>
            </el-form-item>
            <el-form-item label="商品 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="店铺 ID">
              <span>{{ props.row.shopId }}</span>
            </el-form-item>
            <el-form-item label="商品分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.desc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商品 ID" prop="id"> </el-table-column>
      <el-table-column label="商品名称" prop="name"> </el-table-column>
      <el-table-column label="描述" prop="desc"> </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getPatientList, getpationconsult } from "@/api/patient";
export default {
  name: "patientmation",
  data() {
    return {
      // 测试用的table数据
      tableData: [
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
        },
        {
          id: "12987123",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
        },
        {
          id: "12987125",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
        },
        {
          id: "12987126",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
        },
      ],
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
        pageSize: "5",
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
    };
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
  },
  methods: {
    // 患者就诊信息
    async getpationconsult() {
      await getpationconsult(this.consultqueryInfo).then((res) => {
        console.log("获取患者就诊列表", res.data);
        if (res.data.respCode == "0001") {
        }
      });
    },
    // 患者列表
    async getPatientList() {
      await getPatientList(this.queryInfo).then((res) => {
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
      // 获取该id患者
      console.log("进入getID");
      console.log("this.patientData.total", this.patientData.total);
      for (var i = 0; i < this.patientData.total; i++) {
        if (this.patientData.patientList[i].id == this.$route.params.index) {
          this.patinentform = this.patientData.patientList[i];
          console.log("该id为", this.patinentform);
        }
      }
    },
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
  width: 50%;
}
.table1 {
  margin: 20px 30px 40px 50px;
}
.h3 {
  margin-left: 50px;
}
</style>