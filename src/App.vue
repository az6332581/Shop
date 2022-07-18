<template>
  <div id="app">
    <HeaderPage/>
    <router-view></router-view>
    <FooterPage v-show="$route.meta.showpage"/>
  </div>
</template>

<script>
import HeaderPage from './components/Header/HeaderPage.vue'
import FooterPage from './components/Footer/FooterPage.vue'

export default {
  name: 'App',
  components: {
    HeaderPage,FooterPage
  },
  mounted() {
    this.$store.dispatch("homeInfo/getNavData");
  },
}
</script>

<style>

</style>
