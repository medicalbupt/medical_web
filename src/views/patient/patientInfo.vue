<template>
  <div>
    <el-dialog title="详细信息" :visible.sync="dialogVisible" width="70%">
      <span>患者诊断信息</span>

      <!-- 弹框底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">退出</el-button>
        <el-button type="primary" @click="close">添加复诊信息</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["dialogVisible"],
  data() {
    return {};
  },
  methods: {
    //   自定义事件-通知父亲修改dialogVisible
    close() {
      this.$emit("changeDialog");
    },
  },
};
</script>

<style >
</style>
