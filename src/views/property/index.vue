<template>
  <div class="container">
    <div v-show="formData.length">
      <div class="search-box">
        <SearchForm :formData="formData"></SearchForm>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="searchData"
        >搜索</el-button>
        <el-button icon="el-icon-circle-close">重置</el-button>
      </div>
      <div v-if="tableList.length">
        <TabelList
          :tableData="tableList"
          :theadData="theadList"
          @actionFunc="actionFunc"
        ></TabelList>
      </div>
    </div>
  </div>
</template>

<script>
import { Loading } from 'element-ui'
import SearchForm from './components/SearchForm'
import TabelList from './components/TableList'
export default {
  name: 'PROPERTY',
  components: {
    SearchForm,
    TabelList,
  },
  data() {
    return {
      formData: [],
      tableList: [],
      theadList: [],
      fullLoading: null,
    };
  },
  created() {
    this.fullLoading = Loading.service({
      fullscreen: true,
      lock: true,
    })
    this.getFormData()
    this.getTableData()
  },
  methods: {
    getFormData() {
      this.$axios.get('/mock/form-data').then(res => {
        console.log(res.data);
        if (res.status === 200) {
          let { formData } = res.data;
          //按此顺序排序
          let sortArr = ['input', 'select', 'checkbox', 'radio', 'textarea'];
          let sortLen = sortArr.length;
          this.formData = formData.sort((a, b) => {
            for (let i = 0; i < sortArr.length; i++) {
              const ele = sortArr[i];
              if (a.type === ele && sortArr.slice(i + 1, sortLen).includes(b.type)) {
                return -1;
              }
            }
            if (a.type === sortArr[sortLen - 1] && b.type === sortArr[sortLen - 1]) {
              return -1;
            } else {
              return 1;
            }
          });
          this.fullLoading.close()
        }
      })
    },
    getTableData() {
      this.$axios.get('/mock/table-data').then(res => {
        console.log(res.data);
        if (res.status === 200) {
          let { theadList, tableList } = res.data;
          this.tableList = tableList;
          this.theadList = theadList;
          this.fullLoading.close()
        }
      })
    },
    searchData() {
      this.getTableData()
    },
    actionFunc(item) {
      console.log(item);
      let { label, value } = item;
      this.$message(`点击了${label}按钮 标识是${value}`);
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    padding: 20px;
  }
  .search-box {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding-bottom: 20px;
  }
</style>