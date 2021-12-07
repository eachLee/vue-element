<template>
  <div class="flex">
    <span class="search-label">{{checkboxData.name}}</span>
    <el-checkbox-group v-model="checkboxData.value">
      <el-checkbox
        v-for="option in checkboxData.options"
        :key="option.value"
        :disabled="precondition"
        :label="option.label"
        :value="option.value"
      >
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
export default {
  props: {
    checkboxData: {
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

<style scoped lang="scss">
  .flex {
    display: flex;
  }
</style>