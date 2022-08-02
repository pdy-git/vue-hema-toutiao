<template>
  <div>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="loadNextPageArticle"
      success-text="刷新成功"
    >
      <van-list
        v-model="loading"
        @load="loadNextPageArticle"
        offset="0"
        :immediate-check="false"
        :error.sync="error"
        error-text="加载文章失败，重新加载"
        :finished="isfinished"
        finished-text="没有更多文章"
      >
        <ArticleItem
          v-for="item in articles"
          :key="item.art_id"
          :articleInfo="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleAPI } from '@/api/news'
import ArticleItem from '@/components/ArticleItem.vue'
export default {
  data() {
    return {
      articles: [],
      pre_timestamp: '',
      loading: false,
      isfinished: false,
      error: false,
      refreshing: false
    }
  },
  components: {
    ArticleItem
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  created() {
    this.getRirstPageArticle()
  },
  methods: {
    async getRirstPageArticle() {
      try {
        const { data } = await getArticleAPI(this.id, +new Date())
        this.articles = data.data.results
        this.pre_timestamp = data.data.pre_timestamp
      } catch (error) {
        this.$toast.fail('重新刷新')
      }
    },

    // 加载下一页文章
    async loadNextPageArticle() {
      try {
        // console.log('下一页')
        // 1.发送请求
        const { data } = await getArticleAPI(this.id, this.pre_timestamp)
        // if (Math.random() < 0.5) {
        //   console.log(a)
        // }

        const timestamp = data.data.pre_timestamp

        // 判断是否加载完成
        if (timestamp === null) {
          this.isfinished = true
        }
        // 2.存储数据
        this.articles.push(...data.data.results)
        if (this.refreshing) {
          this.articles.unshift(...data.data.results)
        } else {
          this.articles.push(...data.data.results)
        }

        // 3.更新时间戳
        // this.pre_timestamp = data.data.pre_timestamp
        this.pre_timestamp = timestamp
      } catch (error) {
        this.error = true
      } finally {
        // 4.更新loading
        this.loading = false
        this.refreshing = false
      }
    }
  }
}
</script>

<style></style>
