<template>
  <div>
    <!-- 头部区域 -->
    <header>
      <div class="login" v-if="isLogin">登录后的盒子</div>
      <div class="ligout" v-else>未登录的盒子</div>
    </header>

    <!-- 中间 -->
    <main>.......</main>

    <!-- 底部 -->
    <footer>
      <button v-if="isLogin" @click="logout">退出</button>
    </footer>
  </div>
</template>

<script>
export default {
  computed: {
    isLogin() {
      return !!this.$store.state.tokenObj.token
    }
  },
  methods: {
    logout() {
      this.$store.commit('SET_TOKEN', {})
    }
  }
}
</script>

<style></style>
