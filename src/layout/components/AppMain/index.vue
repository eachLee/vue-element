<!-- 主页面 -->
<template>
  <div class='app-main'>
    <div class="main">
      <transition name="fade-transform">
        <keep-alive :include="cachedViews">
          <router-view :key="key"></router-view>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppMain",
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    },
    key() {
      return this.$route.path;
    }
  }
};
</script>

<style lang='scss' scoped>
  .app-main {
    width: 100%;
    height: 87%;
    min-height: 87%;
    padding: 10px 10px 100px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    overflow-y: scroll;
    background-color: #ffffff;
    .main {
      // padding-bottom: 100px;
      // background: #fff;
      background: transparent;
      min-height: 100%;
      height: auto;
      overflow: hidden;
      box-sizing: border-box;
      position: relative;
      width: auto;
    }
  }
</style>