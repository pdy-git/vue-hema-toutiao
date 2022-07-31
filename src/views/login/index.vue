<template>
  <div>
    <van-nav-bar title="登录" />
    <!-- 登录表单 -->
    <van-form @submit="onSubmit" class="form" ref="loginForm">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji1"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <!-- 验证码btn按钮 -->
        <template #button>
          <van-button
            v-if="isShowCode"
            @click="sendCode"
            round
            size="mini"
            class="code-btn"
            native-type="button"
            >获取验证码</van-button
          >
          <!-- 倒计时 -->
          <van-count-down
            @finish="isShowCode = true"
            v-else
            :time="60 * 1000"
            format="ss 秒"
          />
        </template>
      </van-field>
      <div style="margin: 0.42rem">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { mobileRules, codeRules } from './rules'
import { login, getCodeAPI } from '@/api/user'
export default {
  data() {
    return {
      mobile: '',
      code: '',
      codeRules,
      mobileRules,
      isShowCode: true
    }
  },
  methods: {
    loading() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
    },
    async onSubmit() {
      this.loading()
      try {
        const {
          data: { data: token }
        } = await login(this.mobile, this.code)

        // 跳转到profile
        this.$router.push('/profile')

        this.$toast.success('登录成功')

        this.$store.commit('SET_TOKEN', token)
        // console.log(res)
      } catch (error) {
        // 细分失败
        this.$toast.fail('登录失败')
        const status = error.response.status
        let message = '请重新登录'
        if (status === 400) {
          message = error.response.data.message
        }
        this.$toast.fail(message)
      }
    },
    async sendCode() {
      // 点击验证码，验证手机号
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (error) {
        return console.log('验证失败', error)
      }
      this.isShowCode = false

      // 请求发送验证码
      try {
        await getCodeAPI(this.mobile)
        this.$toast('发生成功')
      } catch (err) {
        if (err.response.status === 429) {
          this.$toast('发送频繁')
        }
        this.$toast('发送失败')
      }
    }

    // sendCode() {
    //   try {
    //     this.$refs.loginForm.validate('mobile')
    //   } catch (error) {
    //     return console.log('验证失败', error)
    //   }

    //   this.isShowCode = true
    //   this.$refs.form.validate('mobile').then(async () => {
    //     this.loading()

    //     try {
    //       await getCodeAPI(this.mobile)
    //       this.$toast.success('获取验证码成功')
    //       this.isShowCode = false
    //     } catch (error) {
    //       const status = error.response.status
    //       let message = '手机号不正确'
    //       if (status === 429) {
    //         message = error.response.data.message
    //       }
    //       this.$toast.fail(message)
    //     }
    //   })
    // }
  }
}
</script>

<style scoped lang="less">
.van-nav-bar {
  background-color: #3296fa;
}

:deep(.van-nav-bar__title) {
  color: #fff;
}
.toutiao {
  font-size: 40px;
}

:deep(.form) {
  .van-field__label {
    flex: 1;
  }
  .van-cell__value {
    flex: 20;
  }
}

:deep(.code-btn) {
  &.van-button--mini {
    padding: 0 0.2rem;
  }
  &.van-button--default {
    background: #eeeeee;
    color: #a9929b;
  }
}
</style>
