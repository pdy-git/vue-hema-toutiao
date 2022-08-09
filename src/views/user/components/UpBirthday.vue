<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { UpDataAvator } from '@/api/user'
import dayjs from 'dayjs'
export default {
  props: {
    value: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  methods: {
    async onConfirm() {
      const currentDate = dayjs(this.currentDate).format('YYYY-MM-DD')
      try {
        await UpDataAvator({
          birthday: currentDate
        })
        // 更新视图
        this.$emit('input', currentDate)
        // 关闭弹窗
        this.$emit('close')
      } catch (error) {}
    }
  }
}
</script>

<style></style>
