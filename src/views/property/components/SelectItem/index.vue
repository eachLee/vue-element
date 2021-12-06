<template>
  <div>
    <span class="search-label">{{selectData.name}}</span>
    <el-select
      :label="selectData.name"
      v-model="selectData.value"
      :disabled="precondition"
      placeholder="请选择"
    >
      <el-option
        v-for="option in selectData.options"
        :key="option.value"
        :label="option.label"
        :value="option.value"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  props: {
    selectData: {
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

<style>
</style>