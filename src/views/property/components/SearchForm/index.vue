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
        :precondition="checkPrecondition(item)"
      ></InputItem>
      <SelectItem
        :selectData="item"
        v-if="item.type==='select'"
        :precondition="checkPrecondition(item)"
      >
      </SelectItem>
      <CheckboxItem
        :checkboxData="item"
        v-if="item.type==='checkbox'"
        :precondition="checkPrecondition(item)"
      >
      </CheckboxItem>
      <RadioItem
        :radioData="item"
        v-if="item.type==='radio'"
        :precondition="checkPrecondition(item)"
      >
      </RadioItem>
      <TextareaItem
        :textareaData="item"
        v-if="item.type==='textarea'"
        :precondition="checkPrecondition(item)"
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
  },
  computed: {
    // checkPrecondition() {
    //   return function (currentItem) {
    //     if (currentItem.precondition) {
    //       let obj = this.formData.find(item => {
    //         if (item.name === currentItem.precondition) {
    //           return true;
    //         }
    //       });
    //       console.log(obj);
    //       if (obj) {
    //         if (Array.isArray(obj.value)) {
    //           return !obj.value.length;
    //         } else {
    //           return obj.value === '';
    //         }
    //       }
    //     } else {
    //       return false;
    //     }
    //   }
    // }
  },
  methods: {
    checkPrecondition(currentItem) {
      if (currentItem.precondition) {
        let obj = this.formData.find(item => {
          if (item.name === currentItem.precondition) {
            return true;
          }
        });
        console.log(currentItem.precondition);
        if (obj) {
          if (Array.isArray(obj.value)) {
            return !obj.value.length;
          } else {
            return obj.value === '';
          }
        }
      } else {
        return false;
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