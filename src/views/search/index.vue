<template>
  <div>
    <!-- 搜索框 -->
    <form action="/">
      <van-search
        v-model.trim="keyWords"
        background="#3296fa"
        placeholder="请输入搜索关键词"
        show-action
        class="search"
        @search="onSearch"
        @focus="onSearchFocus"
        @cancel="$router.back()"
      />
    </form>
    <!-- 搜索历史 -->
    <component
      :is="componentName"
      :keywords="keyWords"
      @searchSuggestions="searchSuggestions"
      :searchHistories="searchHistories"
      @del="searchHistories = []"
      @search="searchSuggestions"
    ></component>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchResul from './components/SearchResult.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
export default {
  name: 'my-search',
  data() {
    return {
      keyWords: '',
      isShowSearchResult: false,
      searchHistories: JSON.parse(localStorage.getItem('HISTORY'))
    }
  },
  components: {
    SearchHistory,
    SearchResul,
    SearchSuggestion
  },
  computed: {
    componentName() {
      if (this.keyWords === '') {
        return SearchHistory
      }

      if (this.isShowSearchResult) {
        return SearchResul
      }

      return SearchSuggestion
    }
  },

  methods: {
    onSearch() {
      // 渲染搜索结果
      this.isShowSearchResult = true
      // 去重 ， 最新的放在最前面
      const index = this.searchHistories.indexOf(this.keyWords)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(this.keyWords)
      // 历史存储
      const value = JSON.stringify(this.searchHistories)
      console.log(value)
      localStorage.setItem('HISTORY', value)
    },
    onSearchFocus() {
      this.isShowSearchResult = false
    },
    searchSuggestions(val) {
      // 更新文本框内容
      this.keyWords = val
      this.onSearch()
    }
  }
}
</script>

<style scoped lang="less">
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
