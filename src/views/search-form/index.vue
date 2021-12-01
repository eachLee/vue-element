<template>
  <div class="search-box">

    <div
      v-for="item in formData"
      :key="item.id"
      class="search-item"
    >
      <template v-if="item.type==='input'">
        <span class="search-label">{{item.name}}</span>
        <el-input
          :label="item.name"
          v-model="item.value"
          :disabled="item.disabled"
          placeholder="请输入内容"
        ></el-input>
      </template>
      <template v-if="item.type==='select'">
        <span class="search-label">{{item.name}}</span>
        <el-select
          :label="item.name"
          v-model="item.value"
          :disabled="item.disabled"
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
      </template>
      <template v-if="item.type==='checkbox'">
        <span class="search-label">{{item.name}}</span>
        <el-checkbox-group v-model="item.value">
          <el-checkbox
            v-for="option in item.options"
            :key="option.value"
            :disabled="item.disabled"
            :label="option.label"
            :value="option.value"
          >
          </el-checkbox>
        </el-checkbox-group>
      </template>
      <template v-if="item.type==='radio'">
        <span class="search-label">{{item.name}}</span>
        <el-radio-group v-model="item.value">
          <el-radio
            v-for="option in item.options"
            :key="option.value"
            :disabled="item.disabled"
            :label="option.value"
            :value="option.value"
          >{{option.label}}
          </el-radio>
        </el-radio-group>
      </template>
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
          //按此顺序排序
          let sortArr = ['input', 'select', 'checkbox', 'radio'];
          let sortLen = sortArr.length;
          this.formData = res.data.formData.sort((a, b) => {
            for (let i = 0; i < sortArr.length; i++) {
              const ele = sortArr[i];
              console.log(i + 1, sortLen);
              if (a.type === ele && sortArr.slice(i + 1, sortLen).includes(b.type)) {
                return -1;
              }
            }
            if (a.type === sortArr[sortLen - 1] && b.type === sortArr[sortLen - 1]) {
              return -1;
            } else {
              return 1;
            }

            // if (a.type === 'input' && sortArr.slice(1, 4).includes(b.type)) {
            //   return -1
            // }
            // if (a.type === 'select' && sortArr.slice(2, 4).includes(b.type)) {
            //   return -1;
            // }
            // if (a.type === 'checkbox' && sortArr.slice(3, 4).includes(b.type)) {
            //   return -1;
            // }
            // if (a.type === 'radio' && b.type === 'radio') {
            //   return -1;
            // } else {
            //   return 1;
            // }
          });
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .search-box {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 20px;
  }
  ::v-deep .search-item {
    margin-bottom: 14px;
    margin-right: 14px;
    display: flex;
    align-items: center;
    .search-label {
      display: inline-block;
      width: 64px;
      // padding-right: 6px;
    }
    .el-input,
    .el-checkbox-group,
    .el-radio-group {
      width: 160px;
    }
  }
</style>