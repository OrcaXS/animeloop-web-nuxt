<template>
  <div class="wrapper" id="app">
    <div id="nav">
      <navbar></navbar>
    </div>
    <div id="side-menu">
      <side-menu id="side-menu"></side-menu>
    </div>
    <div id="main">
      <router-view id="main"></router-view>
    </div>
  </div>
</template>

<script>
import SideMenu from './components/SideMenu';
import Navbar from './components/Navbar';

export default {
  name: 'app',
  components: {
    SideMenu,
    Navbar,
  },
  data() {
    return {
    };
  },
};
</script>

<style src="./assets/bulma.css"></style>
<style>
body {
  margin: 0;
}

.wrapper {
  display: grid;
  grid-column-gap: 1em;
  grid-template-rows: 3.25em 1fr;
  grid-template-columns: 10em 1fr;
  padding-left: 2em;
  padding-right: 2em;
  /*justify-content: center;*/
}

@media (width <= 1000px) {
  .wrapper {
    padding: 0em;
  }
}

#nav {
  /*grid-column: 1 / 3;*/
}

#app {
  /*display: grid;*/
}

#side-menu {
  grid-row: 2 / 3;
  grid-column: 1 / 2;
}

#main {
  margin-top: 10px;
  grid-row: 2 / 3;
  grid-column: 2 / 3;
}
</style>
