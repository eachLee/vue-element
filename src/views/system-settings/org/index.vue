<template>
  <div class="main">
    <div class="title clearfix">
      <div class="title-str l">组织架构</div>
      <div class="r">
        <el-button
          type="primary"
          icon="el-icon-plus"
        >新增部门</el-button>
        <el-button
          type="primary"
          icon="el-icon-share"
        >楼盘数据反查</el-button>
        <el-button
          type="primary"
          icon="el-icon-refresh"
        >刷新部门权限设置</el-button>
        <el-button
          type="primary"
          icon="el-icon-search"
        >整组异动</el-button>
        <el-button type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>
      </div>
    </div>
    <div class="content clearfix">
      <div class="tree-list">
        <div @click="setAllExpand">{{isExpand ? '折叠全部' : '展开全部'}}</div>
        <el-input
          placeholder="输入关键字进行过滤"
          v-model="filterText"
        >
        </el-input>
        <el-tree
          default-expand-all
          :data="data"
          :props="defaultProps"
          @node-click="handleNodeClick"
          :filter-node-method="filterNode"
          ref="tree"
        ></el-tree>
      </div>
      <div class="role-content">
        内容
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SYSTEM_SETTINGS_ORG',
  props: {
    sidebar: Boolean,
    user: {
      type: Object,
      default() {
        return {};
      }
    },
    navBar: {
      type: Number,
      default() {
        return 0;
      }
    }
  },
  data() {
    return {
      isExpand: true,
      filterText: '',
      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },

  created() {
    console.log(this.$props);
    console.log(this.$route);
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    //设置全部展开和折叠。state参数为bool值
    setAllExpand() {
      var nodes = this.$refs.tree.$children;
      console.log(this.$refs.tree);
      for (var i in nodes) {
        nodes[i].expanded = !this.isExpand;
      }
      this.isExpand = !this.isExpand;
    },
  }

}
</script>
<style lang="scss" scoped>
  ::v-deep .el-tree-node:focus > .el-tree-node__content {
    background-color: #db5055;
    color: #ffffff;
  }
  .main {
    padding: 20px;
    .title {
      padding: 10px 0;
      .title-str {
        font-size: 16px;
        font-weight: bold;
      }
    }
    ::v-deep .el-tree {
      background-color: #f7f7f7;
      .el-tree-node__content:hover {
        background-color: #db5055;
        color: #fff;
      }
    }
    .content {
      .tree-list {
        float: left;
        width: 300px;
        margin-right: 10px;
      }
      .role-content {
        float: left;
      }
    }
  }
</style>