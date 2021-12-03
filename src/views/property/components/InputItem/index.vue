<template>
  <div>
    <span class="search-label">{{inputData.name}}</span>
    <el-input
      :label="inputData.name"
      v-model="inputData.value"
      :disabled="inputData.disabled"
      placeholder="请输入内容"
    ></el-input>
  </div>
</template>

<script>
export default {
  props: {
    inputData: {
      type: Object,
      require: true,
    }
  },
  data() {
    return {

    };
  }
}
</script>

<style>
</style>