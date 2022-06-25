<template>
  <div class="app-container">
    <div class="info-container">
      <el-select
        v-model="value"
        filterable
        class="select"
        placeholder="请选择相应分类"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          @click.native="selectProductType(item.value, item.label)"
          :value="item.value"
        >
        </el-option>
      </el-select>

      <el-button type="primary" class="bt1">新增分类</el-button>

      <el-card v-if="label">
        <div class="p4">
          {{ label }}
          <el-button type="primary" class="bt2" @click="adddialogVisible = true"
            >新增基础信息</el-button
          >
        </div>

        <!-- 数据列表 -->
        <el-table :data="commondatalist" border stripe style="width: 100%">
          <el-table-column fixed prop="id" label="ID" width="90">
          </el-table-column>
          <el-table-column prop="dataCode" label="数据编号" width="150">
          </el-table-column>
          <el-table-column prop="dataName" label="数据名称" width="150">
          </el-table-column>

          <el-table-column label="操作" width="190">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="small"
                @click="showEditDialog(scope.row)"
                >编辑</el-button
              >

              <el-button
                type="warning"
                icon="el-icon-delete"
                size="small"
                @click="removeUserById(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <!-- 分页 -->
      <el-pagination
        v-if="label"
        class="pag"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="datapageform.currentPage"
        :page-sizes="[10, 20, 50]"
        :page-size="datapageform.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      >
      </el-pagination>
    </div>

    <!-- Form -->
    <el-dialog title="收货地址" :visible.sync="adddialogVisible">
      <el-form :model="adddialogForm">
        <el-form-item label="数据类型" :label-width="formLabelWidth">
          <el-select v-model="this.value" disabled>
            <el-option label="就诊地址" value="0"></el-option>
            <el-option label="主病诊断" value="1"></el-option>
            <el-option label="证候分类" value="2"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="数据编号" :label-width="formLabelWidth">
          <el-input
            v-model="adddialogForm.dataCode"
            placeholder="请输入"
            autocomplete="off"
          ></el-input>
        </el-form-item> -->
        <el-form-item label="数据名称" :label-width="formLabelWidth">
          <el-input
            v-model="adddialogForm.dataName"
            placeholder="请输入"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="noadddinfomation">取 消</el-button>
        <el-button type="primary" @click="adddinfomation">确 定</el-button>
      </div>
    </el-dialog>

    <!--修改的对话框  -->
    <!-- :visible.sync表示属性绑定，表示对话框的显示与隐藏 -->
    <el-dialog
      top="6vh"
      title="修改信息"
      :visible.sync="editDialogVisible"
      width="50%"
    >
      <el-form
        :model="editmationform"
        ref="editmationformRef"
        label-width="100px"
      >
        <el-form-item label="ID">
          <el-input v-model="editmationform.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="数据类型">
          <el-select v-model="editmationform.dataType">
            <el-option label="就诊地址" value="0"></el-option>
            <el-option label="主病诊断" value="1"></el-option>
            <el-option label="证候分类" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数据编号">
          <el-input v-model="editmationform.dataCode"></el-input>
        </el-form-item>
        <el-form-item label="数据名称">
          <el-input v-model="editmationform.dataName"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editmationSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import {
//   getAllSameData1,
//   getAllSameData2,
// } from "@/api/patient";
import {
  getDataList,
  infomationDelete,
  adddinfomation,
  editmationSubmit,
} from "@/api/conmondata";
export default {
  name: "commondatalist",
  data() {
    return {
      commondatalist: [],
      // 数据总数
      totalCount: 0,
      // 总页数
      totalPage: 0,
      datapageform: {
        currentPage: 1,
        orderColumns: "id",
        orderType: "DESC",
        pageSize: 10,
        dataType: 1,
      },
      adddialogVisible: false,
      editDialogVisible: false,
      formLabelWidth: "120px",
      // 新增信息
      adddialogForm: {
        dataCode: "",
        dataName: "",
        dataType: "",
        status: 1,
      },
      // 删除基本信息表单
      infomationDeleteform: {
        dataCode: "",
        dataName: "",
        dataType: "",
        id: "",
        status: 1,
      },
      // 编辑信息
      editmationform: {
        dataCode: "",
        dataName: "",
        dataType: "",
        id: "",
        status: 1,
      },
      options: [
        {
          value: "0",
          label: "就诊地址",
        },
        {
          value: "1",
          label: "主病诊断",
        },
        {
          value: "2",
          label: "证候分类",
        },
        {
          value: "3",
          label: "全身",
        },
        {
          value: "4",
          label: "头面",
        },
        {
          value: "5",
          label: "四肢",
        },
        {
          value: "6",
          label: "心胸",
        },
        {
          value: "7",
          label: "脘腹",
        },
        {
          value: "8",
          label: "饮食",
        },
        {
          value: "9",
          label: "睡眠",
        },
        {
          value: "10",
          label: "二便",
        },
        {
          value: "11",
          label: "生殖",
        },
        {
          value: "12",
          label: "舌",
        },
        {
          value: "13",
          label: "脉",
        },
        {
          value: "14",
          label: "医嘱",
        },
        {
          value: "14",
          label: "医嘱",
        },
        {
          value: "14",
          label: "医嘱",
        },
        {
          value: "14",
          label: "医嘱",
        },
        {
          value: "14",
          label: "医嘱",
        },

        {
          value: "14",
          label: "医嘱",
        },
      ],
      value: "",
      label: "",
    };
  },
  created() {
    this.getdataList();
  },

  methods: {
    // 监听pagesize改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      // 当用户选择当前页面显示几条，重新将条数返回给data,并重新从服务器渲染列表
      this.datapageform.pageSize = newSize;
      this.getdataList();
    },

    // 根据id删除对应的患者信息
    async removeUserById(mation) {
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        "此操作将永久删除该数据, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => {
        return err;
      });
      // 如果用户确认删除，则返回值为字符串confirm
      // 如果用户取消删除，则返回值为字符串cancel
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除");
      }
      // console.log(mation);
      this.infomationDeleteform.id = mation.id;
      this.infomationDeleteform.dataType = mation.dataType;
      this.infomationDeleteform.dataName = mation.dataName;
      this.infomationDeleteform.dataCode = mation.dataCode;
      this.infomationDeleteform.status = mation.status;
      console.log("infomationDeleteform的id", this.infomationDeleteform.id);
      infomationDelete(this.infomationDeleteform).then((response) => {
        console.log("infomationDeleteform的response", response);
        if (response.data.respCode == "0000") {
          return this.$message.success("删除信息成功！");
        } else {
          this.$message.error("删除信息失败！");
        }
      });

      // 删除后更新列表
      this.getdataList();
      this.infomationDeleteform = {
        dataCode: "",
        dataName: "",
        dataType: "",
        id: "",
        status: 1,
      };
    },

    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      // console.log(newPage)
      // 当用户选择当前页面，重新将当前页面返回给data,并重新从服务器渲染列表
      this.datapageform.currentPage = newPage;
      this.getdataList();
    },

    noadddinfomation() {
      this.adddialogForm = {
        dataCode: "",
        dataName: "",
        dataType: "",
        status: 1,
      };
      this.adddialogVisible = false;
    },

    showEditDialog(mation) {
      this.editDialogVisible = "true";
      this.editmationform.id = mation.id;
      this.editmationform.dataType = mation.dataType;
      this.editmationform.dataName = mation.dataName;
      this.editmationform.dataCode = mation.dataCode;
      this.editmationform.status = mation.status;
    },

    editmationSubmit() {
      editmationSubmit(this.editmationform).then((response) => {
        console.log("editmationSubmit的response", response);
        if (response.data.respCode == "0000") {
          return this.$message.success("更新信息成功！");
        } else {
          this.$message.error("更新信息失败！");
        }
      });
      // 更新后更新列表
      this.getdataList();
      this.editmationSubmit = {
        dataCode: "",
        dataName: "",
        dataType: "",
        id: "",
        status: 1,
      };
      this.editDialogVisible = false;
    },

    async adddinfomation() {
      this.adddialogForm.dataType = this.value;
      await adddinfomation(this.adddialogForm).then((response) => {
        console.log("新增信息", response);
        if (response.data.respCode == "0000") {
          this.$message({
            message: "新增成功",
            type: "success",
          });
        }
        this.getdataList();
        this.adddialogForm = {
          dataCode: "",
          dataName: "",
          dataType: "",
          status: 1,
        };
        this.adddialogVisible = false;
      });
    },

    getdataList() {
      //   console.log("value的值",this.value);
      // this.datapageform.dataType = this.value;
      getDataList(this.datapageform).then((response) => {
        console.log("获取主病诊断", response);
        // resolve();
        // console.log("response.data.respCode", response.data.respCode);
        if (response.data.respCode == "0000") {
          this.$message({
            message: "主病诊断数据库查询成功",
            type: "success",
          });
          this.commondatalist = response.data.commonDataEntities;
          console.log("commondatalist", this.commondatalist);
          this.totalCount = response.data.totalCount;
          this.totalPage = response.data.totalPage;
        }
      });
    },

    selectProductType(value, label) {
      // 将data对象解构
      this.label = label;
      this.value = value;
      console.log("label", label);
      console.log("value", value);

      this.datapageform.dataType = this.value;
      getDataList(this.datapageform).then((response) => {
        console.log("获取" + this.label, response);
        // resolve();
        // console.log("response.data.respCode", response.data.respCode);
        if (response.data.respCode == "0000") {
          this.$message({
            message: this.label + "数据库查询成功",
            type: "success",
          });
          this.commondatalist = response.data.commonDataEntities;
          console.log("commondatalist", this.commondatalist);
          this.totalCount = response.data.totalCount;
          this.totalPage = response.data.totalPage;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
//   .app-container{
//     height: 100%;
//     width: 100%;
//     // 让div充满整个屏幕
//     position: fixed;
//   }
.select {
  margin-bottom: 12px;
}
.pag {
  margin-top: 20px;
}
.p4 {
  margin-bottom: 12px;
}
.bt1 {
  margin-left: 150px;
}
.bt2 {
  margin-left: 100px;
}
</style>