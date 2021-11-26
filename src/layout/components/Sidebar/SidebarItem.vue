<!-- 侧导航栏递增 -->
<template>
  <div
    v-if="!item.hidden"
    class='menu-wrapper'
  >
    <template v-if="hasOneShowingChild(item.children,item)&&(!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <Navlink
        v-if="onlyOneChild.meta"
        :to="resolvePath(onlyOneChild.path)"
      >
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{'submenu-title-noDropdown':!isNest}"
        >
          <Item
            :icon="onlyOneChild.meta.icon || (item.meta&&item.meta.icon)"
            :title="onlyOneChild.meta.title"
          />
        </el-menu-item>
      </Navlink>
    </template>

    <el-submenu
      v-else
      ref="subMenu"
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <template slot="title">
        <item
          v-if="item.meta"
          :icon="item.meta && item.meta.icon"
          :title="item.meta.title"
        />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import Navlink from './Link'
import Item from './Item'
export default {
  name: 'SidebarItem',
  components: {
    Navlink,
    Item
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      onlyOneChild: null
    };
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          //二级路由
          this.onlyOneChild = item
          return true
        }
      })

      // 一个子路由 默认子路由 
      if (showingChildren.length === 1) {
        return true
      }

      // 没有子路由 主路由赋给子路由
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    //解耦路由
    resolvePath(ChildPath) {
      if (isExternal(ChildPath)) {
        return ChildPath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      console.log(path.resolve(this.basePath, ChildPath));
      return path.resolve(this.basePath, ChildPath)
    }
  },
}
</script>
<style lang="scss">
  .el-tooltip__popper.is-dark {
    color: #333 !important;
    background-color: #fff !important;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1) !important;
  }
  .el-tooltip__popper .popper__arrow,
  .el-tooltip__popper .popper__arrow::after {
    border-right-color: #fff !important;
  }
  .menu-wrapper .el-submenu .el-menu-item {
    height: 38px;
    line-height: 38px;
  }
  #app .sidebar-container .nest-menu .el-menu-item .svg-icon {
    margin-right: 5px;
    font-size: 6px;
    width: 6px;
    height: 6px;
    vertical-align: 1px;
  }
  .menu-wrapper .el-menu-item * {
    vertical-align: 0;
  }
</style>