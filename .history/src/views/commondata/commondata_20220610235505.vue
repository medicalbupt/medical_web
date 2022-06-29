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
          @click.native="selectProductType(item.value)"
          :value="item.value"
        >
        </el-option>
      </el-select>

      <el-card>
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
                @click="showEditDialog(scope.row.id)"
                >编辑</el-button
              >

              <el-button
                type="warning"
                icon="el-icon-delete"
                size="small"
                @click="removeUserById(scope.row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <!-- 分页 -->
      <el-pagination
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
  </div>
</template>

<script>
// import {
//   getAllSameData1,
//   getAllSameData2,
// } from "@/api/patient";
import { getDataList } from "@/api/conmondata";
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
      ],
      value: "",
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

    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      // console.log(newPage)
      // 当用户选择当前页面，重新将当前页面返回给data,并重新从服务器渲染列表
      this.datapageform.currentPage = newPage;
      this.getdataList();
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

    selectProductType(value) {
      // 将data对象解构
      // console.log(value);
      // this.vvalue = value;
      // console.log("执行");
      // // const  value = data;
      // // this.label = label;
      // // this.value = value;
      // console.log(this.vvalue);
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
</style>