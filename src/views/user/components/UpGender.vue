<template>
  <div>
    <van-picker
      title="更新性别"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      @change="onChange"
      :default-index="value"
    />
  </div>
</template>

<script>
import { UpDataAvator } from '@/api/user'

export default {
  props: {
    value: {
      type: Number,
      require: true
    }
  },
  data() {
    return {
      columns: ['男', '女'],
      logcalGender: this.value
    }
  },
  methods: {
    async onConfirm() {
      try {
        await UpDataAvator({
          gender: this.logcalGender
        })
        // 更新视图
        this.$emit('input', this.logcalGender)
        // 关闭弹窗
        this.$emit('close')
      } catch (error) {}
    },
    onChange(picker, value, index) {
      this.logcalGender = index
    }
  }
}
</script>

<style></style>
