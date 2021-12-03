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
        <template slot-scope="scope">
          <a
            v-if="item.isLink&&scope.row.url"
            :href="scope.row.url"
            target="_blank"
          >{{scope.row.label}}</a>
          <template v-else-if="item.isAction&&scope.row.operation">
            <el-button
              class="action-button"
              type="text"
              v-for="actionItem in scope.row.operation"
              :key="actionItem.value"
              @click="actionCallBack(actionItem)"
            >{{actionItem.label}}</el-button>
          </template>
          <template v-else>{{scope.row[item.props]}}</template>
        </template>
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
  created() { },
  methods: {
    actionCallBack(item) {
      this.$emit('actionFunc', item)
    }
  }
}
</script>
<style lang="scss" scoped>
  .flex {
    display: flex;
  }
  ::v-deep .action-button.el-button {
    padding: 0;
  }
</style>