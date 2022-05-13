<template>
  <div class="app-container">
    <div class="info-container">
        <span class="display_name">欢迎您！</span>
    </div>
  </div>
</template>

<script>
export default {
    name: 'DashboardEditor',
  data() {
    return {
    };
  },
};
</script>

<style lang="scss" scoped>
  .app-container{
    height: 100%;
    width: 100%;
    background-color: #474A9E;
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
        color: #FFFFFF;
        position: absolute;
        top: 25px;
      }
    }

</style>
