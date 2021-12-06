<template>
  <div>
    <span class="search-label">{{radioData.name}}</span>
    <el-radio-group v-model="radioData.value">
      <el-radio
        v-for="option in radioData.options"
        :key="option.value"
        :disabled="precondition"
        :label="option.value"
        :value="option.value"
      >{{option.label}}
      </el-radio>
    </el-radio-group>
  </div>
</template>

<script>
export default {
  props: {
    radioData: {
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
</style>