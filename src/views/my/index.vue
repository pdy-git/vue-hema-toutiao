<template>
  <div class="myLogin">
    <!-- 头部区域 -->
    <header>
      <div class="login banner" v-if="isLogin">
        <van-row class="loginRow"></van-row>

        <van-row class="loginRow">
          <div class="loginColInfo">
            <van-col span="12" class="left">
              <div class="left-img">
                <van-image
                  round
                  width="100%"
                  height="100%"
                  :src="userInfo.photo"
                  fit="conver"
                />
              </div>
              <span>{{ userInfo.name }}</span>
            </van-col>
            <van-col span="12" class="right">
              <button @click="$router.push('/user')" class="btn">
                编辑按钮
              </button>
            </van-col>
          </div>
        </van-row>
        <van-row class="loginRow">
          <van-col span="6" class="loginColContent">
            <div class="num">{{ userInfo.art_count }}</div>
            <span class="text">头条</span>
          </van-col>
          <van-col span="6" class="loginColContent">
            <div class="num">{{ userInfo.fans_count }}</div>
            <span class="text">粉丝</span>
          </van-col>
          <van-col span="6" class="loginColContent">
            <div class="num">{{ userInfo.follow_count }}</div>
            <span class="text">关注</span>
          </van-col>
          <van-col span="6" class="loginColContent">
            <div class="num">{{ userInfo.like_count }}</div>
            <span class="text">获赞</span>
          </van-col>
        </van-row>
      </div>
      <!-- 登录的盒子 -->
      <div class="ligout banner" v-else>
        <img src="../../assets/images/mobile.png" alt="" />
        <span class="ligout-text" @click="$router.push('/login')"
          >登录 / 注册</span
        >
      </div>
    </header>

    <!-- 中间 -->
    <main>
      <van-grid :column-num="2">
        <van-grid-item class="myLoginMain">
          <i slot="icon" class="toutiao toutiao-shoucang"></i>
          <span slot="text">收藏</span>
        </van-grid-item>
        <van-grid-item class="myLoginMain">
          <i slot="icon" class="toutiao toutiao-lishi"></i>
          <span slot="text">历史</span>
        </van-grid-item>
      </van-grid>
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
    </main>
    <!-- 底部 -->
    <footer>
      <van-button v-if="isLogin" @click="logout" block>退出</van-button>
    </footer>
  </div>
</template>

<script>
import { getUserInfoResult } from '@/api/user'
export default {
  data() {
    return {
      userInfo: {}
    }
  },
  computed: {
    isLogin() {
      return !!this.$store.state.tokenObj.token
    }
  },
  created() {
    this.loadUserInfo()
  },
  methods: {
    logout() {
      this.$store.commit('SET_TOKEN', {})
    },
    async loadUserInfo() {
      const { data } = await getUserInfoResult()
      this.userInfo = data.data
    }
  }
}
</script>

<style scoped lang="less">
.myLogin {
  background-color: #f5f7f9;
  height: calc(100vh - 1.33333rem);

  .banner {
    width: 100%;
    height: 5.33333rem;
    background: url(../../assets/images/banner.png) no-repeat 50% / cover;
  }
  .ligout {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      width: 1.76rem;
      height: 1.76rem;
    }
    .ligout-text {
      color: #fff;
      font-size: 0.4rem;
      margin-top: 0.26667rem;
    }
  }
  .login {
    .loginRow {
      height: 33.33%;
      .loginColInfo {
        height: 100%;
        position: relative;
        .left {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          .left-img {
            width: 1.5rem;
            height: 1.5rem;
          }
          span {
            margin-left: 20px;
            font-size: 0.4rem;
            color: #fff;
          }
        }
        .right {
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
          .btn {
            font-size: 24px;
            border-radius: 24px;
            margin-right: 20px;
            border: none;
            float: right;
          }
        }
      }
      .loginColContent {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 22px;
        box-sizing: border-box;
        .num {
          font-size: 0.4rem;
          color: #fff;
        }
        .text {
          font-size: 0.32rem;
          margin-top: 8px;
          color: #fff;
        }
      }
    }
  }
  // main
  .myLoginMain {
    margin-bottom: 10px;
    i {
      font-size: 0.6rem;
      color: #ed5253;
    }
    span {
      color: #646566;
      font-size: 0.32rem;
      line-height: 1.5;
    }
  }
}
</style>
