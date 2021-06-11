<template>
  <div id="app">
    <SearchPage title="Search Page"/>
  </div>
</template>

<script>
import SearchPage from './components/SearchPage.vue';

export default {
  name: 'App',
  components: {
    SearchPage
  },
}
</script>

<style lang="scss">
  // Styles injection
  @import './styles/base.scss';
</style>
