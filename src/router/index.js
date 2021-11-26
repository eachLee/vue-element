import Vue from "vue";
import Router from "vue-router";
import Layout from "@/layout";

//  hidden：如果设置为true，则项目不会显示在边栏中（默认为false）
//  alwaysShow：如果设置为true，则将始终显示根菜单,如果未设置alwaysShow，则当项有多个子路线时，它将变为嵌套模式，否则不显示根菜单
//  redirect：noRedirect如果设置了noRedirect将不会在面包屑中重定向
//  name：“路由器名称”，该名称由<keep-alive>使用（必须设置！！！必须和页面name相对应）缓存使用
//  meta：{
//    ruoes: ['admin'，'editor']控制页面角色（您可以设置多个角色）
//    title: 名称显示在侧边栏和面包屑中（推荐设置）
//    icon:'svg-name' 图标显示在侧栏中
//    noCache: 如果设置为true，则不缓存当前页面（默认为false）
//    affix: true如果设置为true，标签将粘贴在tags-view中
//    breadcrumb: false 如果设置为false，则该项将隐藏在面包屑中（默认值为true）
//    activeMenu: '/example/list' 如果设置了路径，则边栏将突出显示您设置的路径
// }
//  path: '/property'  一级path: '/property' 需要加'/'    path: '/property' 二级不需要加'/'
// import(/* webpackChunkName: "home-group" */ '@/views/login/index') webpackChunkName 合并到一个js中
Vue.use(Router);

export const constantRoutes = [
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path*",
        component: () => import("@/views/redirect/index")
      }
    ]
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404"),
    hidden: true
  },
  {
    path: "/login",
    meta: { title: "登录" },
    name: "LOGIN",
    hidden: true,
    component: () =>
      import(/* webpackChunkName: "home-group" */ "@/views/login/index")
  },
  //以上为基础模板不能删除
  {
    path: "/",
    component: Layout,
    redirect: "/max-home",
    children: [
      {
        path: "home/",
        name: "HOME",
        meta: { icon: "allPersonnel", breadcrumb: false, title: "首页", affix: true },
        component: () => import("@/views/home")
      },
    ]
  },
  {
    path: "/max-home/",
    name: "MAXHOME",
    hidden: true,
    meta: { icon: "home", title: "房源管理", },
    component: () => import("@/views/max-home")
  },
  {
    path: "/system-settings/",
    name: "SYSTEM_SETTINGS",
    hidden: true,
    meta: { icon: "home", title: "业务设置", },
    component: () => import("@/views/system-settings"),
    redirect: 'org',
    children: [
      {
        path: "org/",
        name: "SYSTEM_SETTINGS_ORG",
        meta: { icon: "home", title: "组织架构", },

        // props: { default: true, sidebar: true, navBar: 24, isWhihteBg: true },
        params: {
          user: {
            age: 12,
            name: 'Xiao Ming',
            sex: 'Men'
          }
        },
        props: true,
        component: () => import("@/views/system-settings/org")
      }
    ]
  },
  {
    path: "/search-form/",
    name: "SEARCH_FORM",
    hidden: true,
    meta: { icon: "home", title: "查询区域", },
    component: () => import("@/views/search-form")
  },
];
export const asyncRoutes = [
  // {
  //   path: '/customer',
  //   meta: { icon: 'edit', title: '客源管理' },
  //   redirect: '/customer/add',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'add',
  //       name: 'CUSTOMER_ADD',
  //       meta: {
  //         icon: 'point',
  //         title: '客源新增',
  //         roles: 'admin'
  //       },
  //       component: () => import('@/views/customer/add')
  //     },
  //     {
  //       path: 'edit',
  //       name: 'CUSTOMER_EDIT',
  //       meta: {
  //         icon: 'point',
  //         title: '客源编辑',
  //         roles: 'admin'
  //       },
  //       component: () => import('@/views/customer/edit')
  //     }
  //   ]
  // },

  // {
  //   path: "/max-home2",
  //   component: Layout,
  //   redirect: '/max-home2/list',
  //   meta: { icon: "list-active", title: "房源管理", },
  //   children: [{
  //     path: "list",
  //     meta: { icon: "list-active", title: "通盘房源", },
  //     component: () => import("@/views/max-home2"),
  //   }, {
  //     path: "list2",
  //     meta: { icon: "list-active", title: "推荐房源", },
  //     component: () => import("@/views/max-home2"),
  //   }, {
  //     path: "list3",
  //     meta: { icon: "list-active", title: "公盘池", },
  //     component: () => import("@/views/max-home2"),
  //   }, {
  //     path: "list4",
  //     meta: { icon: "list-active", title: "房源贡献", },
  //     component: () => import("@/views/max-home2"),
  //   }, {
  //     path: "list5",
  //     meta: { icon: "list-active", title: "我的收藏", },
  //     component: () => import("@/views/max-home2"),
  //   },]
  // },
  // {
  //   path: "/customer",
  //   component: Layout,
  //   redirect: '/max-home/list',
  //   meta: { icon: "timeJobEnd", title: "客源管理", },
  //   children: [{
  //     path: "list",
  //     meta: { icon: "home", title: "通盘房源", },
  //     component: () => import("@/views/max-home"),
  //   }, {
  //     path: "list2",
  //     meta: { icon: "home", title: "推荐房源", },
  //     component: () => import("@/views/max-home"),
  //   }, {
  //     path: "list3",
  //     meta: { icon: "home", title: "公盘池", },
  //     component: () => import("@/views/max-home"),
  //   }, {
  //     path: "list4",
  //     meta: { icon: "home", title: "房源贡献", },
  //     component: () => import("@/views/max-home"),
  //   }, {
  //     path: "list5",
  //     meta: { icon: "home", title: "我的收藏", },
  //     component: () => import("@/views/max-home"),
  //   },]
  // },
  // {
  //   path: "/personals",
  //   component: Layout,
  //   redirect: '/list',
  //   children: [{
  //     path: "list",
  //     name: "MAXHOME",
  //     meta: { icon: "timeJobEnd", title: "个人中心", affix: true },
  //     component: () => import("@/views/error-page/404")
  //   },]
  // },
  { path: "*", redirect: "/404", hidden: true }
];

const createRouter = () =>
  new Router({
    mode: "history",
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // 从新实例化路由
}

export default router;
