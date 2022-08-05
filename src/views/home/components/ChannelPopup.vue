<template>
  <div class="channel">
    <!-- 我的频道 -->
    <van-cell title="我的频道">
      <van-button
        round
        size="small"
        class="edit-btn"
        @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <van-grid gutter="0.2rem">
      <van-grid-item
        v-for="(item, index) in myChannels"
        :key="item.id"
        :text="item.name"
        :class="['mychannel-item', { active: item.name === '推荐' }]"
        @click="changeActive(index, item)"
      >
        <template #icon>
          <van-icon name="cross" v-show="isEdit && item.name !== '推荐'" />
        </template>
      </van-grid-item>
    </van-grid>

    <!-- 推荐频道 -->
    <van-cell title="推荐频道" />
    <van-grid gutter="0.2rem">
      <van-grid-item
        v-for="item in recommendChannels"
        :key="item.id"
        :text="item.name"
        icon="plus"
        class="remmend-item"
        @click="$emit('add-channel', item)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels as getAllChannelsAPI } from '@/api/channel'
export default {
  name: 'my-Chaa',
  data() {
    return {
      isEdit: false,
      allChannels: []
    }
  },
  props: {
    myChannels: {
      type: Array,
      required: true
    }
  },
  created() {
    this.getAllChannels()
  },
  methods: {
    async getAllChannels() {
      const { data } = await getAllChannelsAPI()
      this.allChannels = data.data.channels
    },
    changeActive(index, item) {
      if (this.isEdit) {
        // 删除我的频道
        if (item.name === '推荐') return
        this.$emit('del-channel', item.id)
        console.log(item.id)
      } else {
        // 关闭弹窗
        this.$emit('close')
        // console.log(this.$parent.$parent);
        // this.$parent.$parent.show = false

        // 切换tab
        this.$emit('change-active', index)
      }
    }
  },
  computed: {
    recommendChannels() {
      return this.allChannels.filter(
        (aItem) => !this.myChannels.find((mItem) => aItem.id === mItem.id)
      )
    }
  }
}
</script>

<style scoped lang="less">
.active {
  :deep(.van-grid-item__text) {
    color: red;
  }
}
.channel {
  padding-top: 1.3333rem;

  //  title编辑按钮
  .edit-btn {
    width: 104px;
    height: 48px;
    color: red;
    &.van-button--default {
      border-color: red;
    }
  }

  :deep(.van-grid-item__content) {
    background: #eee;
  }
  .remmend-item {
    :deep(.van-grid-item__content) {
      flex-direction: row;
      :deep(.van-grid-item_icon) {
        font-size: 40px;
      }
    }
  }
  :deep(.mychannel-item) {
    .van-grid-item__content {
      position: relative;
    }
    .van-grid-item__icon-wrapper {
      position: unset;
    }
    .van-icon-cross {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 30px;
      transform: translate(45%, -50%);
      border: 2px solid #000;
      border-radius: 50%;
      z-index: 300;
    }
  }
}
</style>
