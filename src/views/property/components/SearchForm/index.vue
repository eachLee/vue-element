<template>
  <div class="search-form">
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
</template>

<script>
import InputItem from '../InputItem'
import SelectItem from '../SelectItem'
import CheckboxItem from '../CheckboxItem'
import RadioItem from '../RedioItem'
import TextareaItem from '../TextareaItem'
export default {
  components: {
    InputItem,
    SelectItem,
    CheckboxItem,
    RadioItem,
    TextareaItem,
  },
  props: {
    formData: {
      type: Array,
      require: true,
      default() {
        return [];
      }
    }
  }
}
</script>


<style lang="scss" scoped>
  .search-form {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    width: 90%;
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