<template>
  <el-popover
    placement="bottom-start"
    trigger="manual"
    v-model="isShow"
  >
    <ul class="auto-seach">
      <li
        class="clearfix"
        v-for="item in departmentData"
        :key="item.orgId"
        @click="seleItem(item)"
      >
        <span class="l">{{item[keyName.orgName]}}</span>
        <span class="r color-999 ml20">{{item[keyName.parentOrgName]}}</span>
      </li>
    </ul>
    <el-input
      v-model="iptSearch"
      clearable
      @clear="clear"
      placeholder="请输入内容"
      :class="widthFlag"
      @input="querySearchAsync"
      slot="reference"
    />
  </el-popover>
</template>
<script>
export default {
  name: 'AUTO-SEARCH',  //智能搜索
  props: {
    departmentData: {
      type: Array,
      default() {
        return [];
      }
    },
    keyName: {
      type: Object,
      default() {
        return {
          orgName: 'orgName',
          parentOrgName: 'parentOrgName'
        }
      }
    },
    widthFlag: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      iptSearch: '',
      isShow: false,
    }
  },
  watch: {
    departmentData(newName) {
      if (newName.length > 0) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    }
  },
  methods: {
    querySearchAsync(val) {
      if (val == '') {
        this.isShow = false
      } else {
        this.$emit('listSearch', val)
      }
    },
    seleItem(item) {
      this.iptSearch = item[this.keyName.orgName];
      this.$emit("activeItem", item)
      this.isShow = false
    },
    clear() {
      this.$emit('clear')
    }
  },
}
</script>
<style lang="scss" scoped>
  .auto-seach {
    max-height: 500px;
    min-width: 268px;
    overflow: auto;
    margin-right: -12px;
    padding-right: 12px;
    li {
      line-height: 32px;
      cursor: pointer;
      &:hover {
        background-color: #e2ecff;
      }
    }
  }
</style>