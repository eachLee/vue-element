<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%"
  >
    <div
      v-for="(item,i) in theadData"
      :key="item.id"
    >
      <el-table-column
        v-if="item.props==='checkbox'"
        type="selection"
        :fixed="!item.fixed"
        :width="item.width"
      >
      </el-table-column>
      <el-table-column
        v-else
        :fixed="item.fixed"
        :sortable="item.sortable"
        :prop="theadData[i].props"
        :label="item.label"
        :width="item.width"
      >
      </el-table-column>
    </div>
  </el-table>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      require: true,
    },
    theadData: {
      type: Array,
      require: true,
    }
  },
  data() {
    return {
    };
  },
  created() {
    console.log(this.theadData);
  }
}
</script>
<style lang="scss" scoped>
  .flex {
    display: flex;
  }
</style>