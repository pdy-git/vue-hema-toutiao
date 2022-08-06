<template>
  <div>
    <!-- 头部导航栏 -->
    <van-nav-bar
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
      class="navbar"
    />
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image
        round
        width="0.8rem"
        height="0.8rem"
        :src="userInfo.photo"
        fit="cover"
      />
      <!-- 文件 -->
      <input
        type="file"
        hidden
        accept=".png,.jfif"
        ref="file"
        @change="selectPhoto"
      />
    </van-cell>
    <!-- 头像弹出层 -->
    <van-popup
      v-model="isShow"
      closeable
      :style="{ height: '100%', width: '100%' }"
      class="avator-popup"
    >
      <update-avator
        :photo="photo"
        v-if="isShow"
        @update-avator="userInfo.photo = $event"
      ></update-avator>
    </van-popup>
    <van-cell title="昵称" value="内容" is-link />
    <van-cell title="性别" value="内容" is-link />
    <van-cell title="生日" value="内容" is-link />
  </div>
  <!-- 脱离标准流 -->
</template>

<script>
import { getUserInfo } from '@/api/user'
import UpdateAvator from './components/update.vue'
import { resolveToBase64 } from './components/index'
export default {
  name: 'my-user',
  components: {
    UpdateAvator
  },
  data() {
    return {
      userInfo: [],
      isShow: false,
      photo: ''
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
        console.log(data)
      } catch (error) {
        this.$toast.fail('获取信息失败 , 请刷新')
      }
    },
    async selectPhoto(e) {
      // console.log(e)
      const file = e.target.files[0]

      // const url = window.URL.createObjectURL(file)
      // this.photo = url
      // // console.dir(url)
      // this.isShow = true

      // e.target.value = ''

      const url = await resolveToBase64(file)
      this.photo = url
      e.target.value = ''
      this.isShow = true
    }
  }
}
</script>

<style scoped lang="less">
:deep(.navbar) {
  background-color: #3296fa;
  .van-nav-bar__title {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
.avator-popup {
  background-color: #000;
}
</style>
