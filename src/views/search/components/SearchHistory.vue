<template>
  <div>
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="$emit('del', [])">全部删除</span>
        &nbsp; &nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon name="delete-o" v-else @click="isDeleteShow = true" />
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in searchHistories"
      :key="index"
      @click="onSearchItemClick(item, index)"
    >
      <van-icon name="close" v-if="isDeleteShow" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'my-history',
  data() {
    return {
      isDeleteShow: false
    }
  },

  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  methods: {
    onSearchItemClick(item, index) {
      // const del = this.searchHistories
      if (this.isDeleteShow) {
        this.search.splice(index, 1)
        // del.splice(index, 1)
      } else {
        this.$emit('search', item)
      }
    }
  }
}
</script>

<style></style>
