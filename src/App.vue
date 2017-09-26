<template>
  <div class="wrapper" id="app">
    <div id="nav">
      <al-navbar></al-navbar>
    </div>
    <!-- <div id="side-menu">
      <side-menu id="side-menu"></side-menu>
    </div> -->
    <div id="main">
      <router-view id="main"></router-view>
    </div>
  </div>
</template>

<script>
// import SideMenu from './components/partial/SideMenu';
import Navbar from './components/partial/Navbar';
import AlNavbar from './components/partial/AlNavbar';
// import NavbarTest from './components/NavbarTest';


export default {
  name: 'app',
  components: {
    // SideMenu,
    Navbar,
    AlNavbar,
    // NavbarTest,
  },
  data() {
    return {
    };
  },
};
</script>


<style scoped>
body {
  margin: 0;
}

.wrapper {
  display: grid;
  grid-column-gap: 1em;
  grid-template-rows: 6em 1fr;
  grid-template-columns: 10em 1fr;
  grid-template-areas:
    "nav nav"
    "sidebar main";
  padding-left: 2em;
  padding-right: 2em;
  /*justify-content: center;*/
}

@media (width <= 1000px) {
  .wrapper {
    padding: 0em;
    grid-template-columns: 1fr;
    grid-template-areas:
    "nav"
    "main";
  }
  #side-menu {
    display: none;
  }
  #main {
    padding-left: .5em;
    padding-right: .5em;
  }
}

#nav {
  /*grid-column: 1 / 3;*/
}

#app {
  /*display: grid;*/
}

#side-menu {
  grid-area: sidebar;
}

#main {
  margin-top: 10px;
  grid-area: main;
}

</style>
<style src="./assets/bulma.css"></style>
