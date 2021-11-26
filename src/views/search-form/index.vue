<template>
  <div>

    <div
      v-for="item in formData"
      :key="item.id"
      class="search-item"
    >
      <div v-if="item.type==='input'">
        <span>{{item.name}}</span>
        <el-input
          :label="item.name"
          v-model="item.value"
          placeholder="请输入内容"
        ></el-input>
      </div>
      <div v-if="item.type==='select'">
        <span>{{item.name}}</span>
        <el-select
          :label="item.name"
          v-model="item.value"
          placeholder="请选择"
        >
          <el-option
            v-for="option in item.options"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: [],
    };
  },
  created() {
    this.getMockData()
    // console.log(JSON.stringify(mockData, null, 2));
  },
  methods: {
    getMockData() {
      this.$axios.get('/mock/form-data').then(res => {
        console.log(res);
        if (res.status === 200) {
          this.formData = res.data.formData;
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .search-item {
    float: left;
  }
</style>