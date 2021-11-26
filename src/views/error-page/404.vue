<template>
  <div class="not-find-container">
    <div class="not-find-pic">
      <el-image :src="image404"></el-image>
      <div class="xl-err-text">没有找到相应页面</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      image404: require('@/assets/images/404.png'),
    }
  }
}
</script>
<style lang="scss" scoped>
.not-find-container {
  width: 100%;
  height: 100%;
  padding: 15px 5%;
  box-sizing: border-box;
  position: relative;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  .xl-err-text {
    width: 100%;
    font-size: 24px;
    color: #333333;
    font-weight: bold;
    display: block;
    text-align: center;
  }
}
</style>
