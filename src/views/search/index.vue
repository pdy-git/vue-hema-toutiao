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
    <component :is="componentName" :keywords="keyWords"></component>
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
      isShowSearchResult: false
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
      this.isShowSearchResult = true
      console.log('正在搜索')
    },
    onSearchFocus() {
      this.isShowSearchResult = false
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
