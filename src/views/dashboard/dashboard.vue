<template>
  <div class="app-container">
    <div class="info-container">
      <span class="display_name">内分泌代谢病医案系统欢迎您！</span>
    </div>
  </div>
</template>

<script>
import TinymceEditor from "@/components/Tinymce";
export default {
  name: "DashboardEditor",
  components: {
    // TinymceEditor,
  },
  data() {
    return {
      
    };
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  height: 100%;
  width: 100%;
  background-color: #474a9e;
  // 让div充满整个屏幕
  position: fixed;
}

.info-container {
  position: relative;
  margin-left: 20px;
  height: 150px;
  line-height: 200px;
  .display_name {
    font-size: 48px;
    line-height: 48px;
    color: #ffffff;
    position: absolute;
    top: 25px;
  }
}
</style>
