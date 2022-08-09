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
    <!-- 昵称 -->
    <van-cell
      title="昵称"
      :value="userInfo.name"
      is-link
      @click="isUpdateNameShow = true"
    />
    <!-- 性别 -->
    <van-cell
      title="性别"
      :value="userInfo.gender === 0 ? '男' : '女'"
      is-link
      @click="isUpdateGenderShow = true"
    />
    <!-- 生日 -->
    <van-cell
      title="生日"
      @click="isUpdateBirthdayShow = true"
      :value="userInfo.birthday"
      is-link
    />

    <!-- 头像弹出层 -->
    <van-popup
      v-model="isShow"
      closeable
      :style="{ height: '100%', width: '100%' }"
      class="avator-popup"
    >
      <UpdateAvator
        :photo="photo"
        v-if="isShow"
        @update-avator="userInfo.photo = $event"
      ></UpdateAvator>
    </van-popup>

    <!-- 昵称弹出层 -->
    <van-popup
      v-model="isUpdateNameShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <Nickname v-model="userInfo.name" v-if="isUpdateNameShow"></Nickname>
    </van-popup>
    <!-- 性别弹出层 -->
    <van-popup v-model="isUpdateGenderShow" position="bottom">
      <UpGender
        v-model="userInfo.gender"
        @close="isUpdateGenderShow = false"
        v-if="isUpdateGenderShow"
      ></UpGender>
    </van-popup>
    <!-- 生日弹出层 -->
    <van-popup v-model="isUpdateBirthdayShow" position="bottom">
      <UpBirthday
        @close="isUpdateBirthdayShow = false"
        v-model="userInfo.birthday"
        v-if="isUpdateBirthdayShow"
      ></UpBirthday>
    </van-popup>
  </div>

  <!-- 脱离标准流 -->
</template>

<script>
import { getUserInfo } from '@/api/user'
import { resolveToBase64 } from './components/index'

import UpdateAvator from './components/update.vue'
import Nickname from './components/nickname.vue'
import UpGender from './components/UpGender.vue'
import UpBirthday from './components/UpBirthday.vue'
export default {
  name: 'my-user',
  components: {
    UpdateAvator,
    Nickname,
    UpGender,
    UpBirthday
  },
  data() {
    return {
      userInfo: [],
      isShow: false,
      isUpdateNameShow: false,
      isUpdateGenderShow: false,
      isUpdateBirthdayShow: false,
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
