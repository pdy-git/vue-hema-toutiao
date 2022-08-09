<template>
  <div class="resultsList">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResultsAPI } from '@/api/search'
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20
    }
  },
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  methods: {
    async onLoad() {
      try {
        // 1.请求获取数据
        const { data } = await getSearchResultsAPI({
          page: this.page,
          per_page: this.perPage,
          q: this.keywords
        })
        // console.log(data)
        // 2.将数据添加到数组列表中
        const { results } = data.data
        this.list.push(...results)
        // 3. 将本次加载中的 loading 关闭
        this.loading = false
        //  4. 判定是否有数据
        if (results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (error) {
        this.$toast('数据获取失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.resultsList {
  height: 1226px;
  overflow: auto;
}
</style>
