<!-- 顶导导航栏 -->
<template>
  <div class='navbar'>
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <svg-icon
      class-name="header-title"
      icon-class="logo-white"
    />
    <breadcrumb
      id="breadcrumb-container"
      class="breadcrumb-container"
    />
    <div class="right-menu">
      <img
        class="user-avatar"
        src="@/assets/images/avatar.svg"
      >
      <div class="user-dialog">
        <div class="user-info">
          <img
            class="user-avatar"
            src="@/assets/images/avatar.svg"
          />
          <div class="name">admin</div>
          <div class="post">集团-高级区域经理</div>
        </div>
        <ul class="list">
          <li>
            <svg-icon
              icon-class="help"
              class-name="icon"
            />
            <span>帮助中心</span>
          </li>
          <li>
            <svg-icon
              icon-class="switch-user"
              class-name="icon"
            />
            <span>切换用户</span>
          </li>
          <li @click="logout">
            <svg-icon
              icon-class="log-out"
              class-name="icon"
            />
            <span>退出用户</span>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from './Hamburger'

export default {
  components: {
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'userInfo',
      'avatar',
    ])
  },
  data() {
    return {
      cityName: "东莞",
    };
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('LoginOut')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  },
}
</script>


<style lang="scss" scoped>
  .navbar {
    height: 50px;
    position: relative;
    background: #db5055;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    .hamburger-container {
      padding: 0 13px;
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background 0.3s;
      -webkit-tap-highlight-color: transparent;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }
    .header-title {
      width: 70px;
      height: 20px;
      margin-top: 15px;
    }
    .city-menu {
      width: 70px;
      height: 26px;
      border-radius: 13px;
      background: #689aff;
      display: inline-block;
      line-height: 26px;
      text-align: center;
      color: #fff;
      font-size: 12px;
      margin-left: 28px;
      vertical-align: 3px;
      cursor: pointer;
    }
    .city-menu span {
      margin-left: 5px;
    }
    .right-menu {
      float: right;
      height: 100%;
      padding: 7px 62px 7px 22px;
      cursor: pointer;
      &:hover {
        .user-dialog {
          display: block;
        }
      }
      &:focus {
        outline: none;
      }
      img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
      }
      .user-dialog {
        display: none;
        position: absolute;
        top: 50px;
        right: 0;
        background-color: #fff;
        box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
        z-index: 10;
        .user-info {
          color: #fff;
          padding: 14px;
          width: 170px;
          height: 110px;
          text-align: center;
          background: url("../../../assets/images/user-info.svg") no-repeat center;
          img {
            width: 36px;
            height: 36px;
          }
          .name {
            font-size: 14px;
            font-weight: bold;
            line-height: 24px;
          }
          .post {
            font-size: 12px;
            text-align: center;
            line-height: 22px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .list {
          line-height: 44px;
          li {
            padding-left: 16px;
            padding-left: 16px;
            color: #666;
            cursor: pointer;
            &:hover {
              background-color: #e2ecff;
              color: #db5055;
            }
            &:last-child {
              border-top: 1px solid #f1f1f1;
            }
            .icon {
              margin-right: 8px;
            }
          }
        }
      }

      // .right-menu-item {
      //   display: inline-block;
      //   padding: 0 8px;
      //   height: 100%;
      //   font-size: 18px;
      //   color: #5a5e66;
      //   vertical-align: text-bottom;

      //   &.hover-effect {
      //     cursor: pointer;
      //     transition: background 0.3s;

      //     &:hover {
      //       background: rgba(0, 0, 0, 0.025);
      //     }
      //   }
      // }

      // .avatar-container {
      //   .avatar-wrapper {
      //     padding-top: 7px;
      //     position: relative;
      //     height: 50px;

      //     .user-avatar {
      //       cursor: pointer;
      //       width: 36px;
      //       height: 36px;
      //       border-radius: 100%;
      //     }
      //   }
      // }
    }
  }
  // .el-dropdown-menu {
  //   margin-top: 5px !important;
  // }
</style>