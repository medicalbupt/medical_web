<template>
  <div>
    <span>症状</span>
    <div v-for="symtom in symtomList" :key="symtom.typeId">
      <span>{{ symtom.typeName }}: </span>
      <div>
        <div
          v-for="subSymtom in symtom.children"
          :key="symtom.typeId + '-' + subSymtom.id"
        >
          <span>{{ subSymtom.name }}</span>
          <select v-model="subSymtom.score">
            <option :value="0">无</option>
            <option :value="1">轻症</option>
            <option :value="2">重症</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      symtomList: [], // 二维数组
    };
  },
  mounted() {
    this.getSymtomList();
  },
  methods: {
    getSymtomList() {
      const typeList = [3, 4, 5]; // 简写了，以这几个为例子
      const commonDataEntityList = [
        {
          // 这里我就忽略请求了，就是拿到那个接口的返回值
          typeId: 3,
          typeName: "全身",
          name: "畏寒1",
          id: 10,
        },
        {
          typeId: 4,
          typeName: "头面",
          name: "畏寒2",
          id: 11,
        },
        {
          typeId: 5,
          typeName: "四肢",
          name: "畏寒3",
          id: 12,
        },
      ];

      const symtomMap = {};

      typeList.forEach((type) => {
        const sameTypeList =
          commonDataEntityList.filter((dataEntity) => {
            if (dataEntity.typeId.toString() === type.toString()) {
              return true;
            }
            return false;
          }) || [];

        // 设置默认分数为0
        sameTypeList.forEach((item) => {
          item.score = 0;
        });

        symtomMap[type] = sameTypeList;
      });

      typeList.forEach((type) => {
        if (symtomMap[type] && symtomMap[type].length !== 0) {
          // 给症状赋值
          this.symtomList.push({
            typeId: type,
            typeName: symtomMap[type][0]["typeId"],
            children: symtomMap[type], // 父子结构
          });
        }
      });

      console.log(this.symtomList);
    },
  },
};
</script>
