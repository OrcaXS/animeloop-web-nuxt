<template>
<aside class="menu">
  <ul class="menu-list">
    <li><router-link :to="{ name: 'Home', params: {} }">Home<icon name="beer"></icon></router-link></li>
  </ul>
  <ul class="menu-list">
    <li>
      <a class="is-active">List</a>
      <ul>
        <li><a>Series</a></li>
        <li><a>Episodes</a></li>
        <li><a>Tags</a></li>
      </ul>
    </li>
    <li><router-link :to="{ name: 'Random', params: {} }">Random</router-link></li>
    <li><a>Search</a></li>
    <li><a>API</a></li>
    <li><a>About</a></li>
  </ul>
</aside>
</template>

<script>
export default {
  name: 'side-menu',
  data() {
    return {
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.menu {
  max-width: 10em;
  /*padding-top: 3.25em;*/
}
</style>
