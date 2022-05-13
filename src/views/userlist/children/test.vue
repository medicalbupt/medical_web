<template>
  <div class="app-container">
    <div class="info-container">
        <span class="display_name">test</span>

    <el-select v-model="value" placeholder="请选择">
      <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>

  <el-select v-model="c" placeholder="请选择">
    <el-option
      v-for="item in tbs"
      :key="item.c"
      :label="item.label"
      :value="item.c">
    </el-option>
  </el-select>

    </div>
  </div>
</template>

<script>
export default {
    name: 'DashboardEditor',
  data() {
    return {
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',

        tbs:[{
          c: '选项1',
          label: '1'
        }, {
          c: '选项2',
          label: '2'
        }, {
          c: '选项3',
          label: '3'
        }, {
          c: '选项4',
          label: '4'
        }, {
          c: '选项5',
          label: '5'
        }],
        c: ''


    }
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