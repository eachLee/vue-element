<template>
  <div class="flex">
    <span class="search-label">{{textareaData.name}}</span>
    <el-input
      type="textarea"
      :rows="textareaData.rows||3"
      :label="textareaData.name"
      v-model="textareaData.value"
      :disabled="precondition"
      placeholder="请输入内容"
    ></el-input>
  </div>
</template>

<script>
export default {
  props: {
    textareaData: {
      type: Object,
      require: true,
    },
    precondition: {
      type: Boolean,
      require: false,
      default() {
        return false;
      }
    },
  },
  data() {
    return {

    };
  }
}
</script>
<style lang="scss" scoped>
  .flex {
    display: flex;
  }
</style>