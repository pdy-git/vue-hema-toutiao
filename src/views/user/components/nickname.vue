<template>
  <div>
    <van-nav-bar
      title="更新昵称"
      left-text="取消"
      right-text="保存"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />

    <van-field
      v-model="message"
      placeholder.trim="请输入新的昵称"
      maxlength="11"
      show-word-limit
    />
  </div>
</template>

<script>
import { UpDataAvator } from '@/api/user'
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      message: this.value,
      messageWatch: ''
    }
  },
  methods: {
    onClickLeft() {
      this.$parent.$parent.isUpdateNameShow = false
    },
    async onClickRight() {
      try {
        await UpDataAvator({
          name: this.message
        })
        // 更新视图
        this.$emit('input', this.message)
        // 关闭弹窗
        this.$parent.$parent.isUpdateNameShow = false
      } catch (error) {}
    }
  }
}
</script>

<style></style>
