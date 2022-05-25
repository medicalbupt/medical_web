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
    };
  },
};
</script>
<style lang="">
</style>