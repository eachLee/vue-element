<template>
  <div>
    <div class="search-box">

      <div
        v-for="item in formData"
        :key="item.id"
        class="search-item"
      >
        <InputItem
          v-if="item.type==='input'"
          :inputData="item"
        ></InputItem>
        <SelectItem
          :selectData="item"
          v-if="item.type==='select'"
        >
        </SelectItem>
        <CheckboxItem
          :checkboxData="item"
          v-if="item.type==='checkbox'"
        >
        </CheckboxItem>
        <RadioItem
          :radioData="item"
          v-if="item.type==='radio'"
        >
        </RadioItem>
        <TextareaItem
          :textareaData="item"
          v-if="item.type==='textarea'"
        ></TextareaItem>
      </div>
    </div>
    <div v-if="tableList.length">
      <TabelList
        :tableData="tableList"
        :theadData="theadList"
      ></TabelList>
    </div>
  </div>
</template>

<script>
import InputItem from './components/InputItem'
import SelectItem from './components/SelectItem'
import CheckboxItem from './components/CheckboxItem'
import RadioItem from './components/RedioItem'
import TextareaItem from './components/TextareaItem'
import TabelList from './components/TableList'
export default {
  components: {
    InputItem,
    SelectItem,
    CheckboxItem,
    RadioItem,
    TextareaItem,
    TabelList,
  },
  data() {
    return {
      formData: [],
      tableList: [],
      theadList: [],
    };
  },
  created() {
    this.getMockData()
    // console.log(JSON.stringify(mockData, null, 2));
  },
  methods: {
    getMockData() {
      this.$axios.get('/mock/form-data').then(res => {
        console.log(res.data);
        if (res.status === 200) {
          let { formData, tableData } = res.data;
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
          this.tableList = tableData.tableList;
          this.theadList = tableData.theadList
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