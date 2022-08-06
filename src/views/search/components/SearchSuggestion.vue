<template>
  <div>
    <van-cell
      v-for="(item, index) in highlightSuggestions"
      :key="index"
      icon="search"
    >
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggetionsAPI } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'suggestions',
  data() {
    return {
      suggestions: []
    }
  },
  props: {
    keywords: {
      type: String,
      require: true
    }
  },
  methods: {
    //   getSearchSuggetion() {
    //     clearTimeout(this.id)
    //     this.id = setTimeout(async () => {
    //       try {
    //         const { data } = await getSearchSuggetionsAPI(this.keywords)
    //         this.suggestions = data.data.options
    //         console.log(data)
    //       } catch (error) {
    //         this.$toast.fail('获取建议失败')
    //       }
    //     }, 1000)
    //   }
    // },
    getSearchSuggetion: debounce(async function () {
      try {
        const { data } = await getSearchSuggetionsAPI(this.keywords)
        this.suggestions = data.data.options.filter(Boolean)
        console.log(data)
      } catch (error) {
        this.$toast.fail('获取建议失败')
      }
    }, 1000)
  },
  watch: {
    keywords: {
      immediate: true,
      handler() {
        this.getSearchSuggetion()
      }
    }
  },
  computed: {
    highlightSuggestions() {
      const reg = new RegExp(this.keywords, 'ig')

      return this.suggestions.map((item) =>
        item.replace(reg, (match) => `<span style="color:red">${match}</span>`)
      )
    }
  }
}
</script>

<style></style>
