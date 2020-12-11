<template>
  <banner-nav/>

  <router-view/>
</template>

<script>

import BannerNav from './components/BannerNav.vue';

export default {
  name: "App",
  components: {
    BannerNav
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


</style>
