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
<style lang="scss">
// Import Bulma's core
@import "~bulma/sass/utilities/_all";

// Set your colors
$primary: #8c67ef;
$primary-invert: findColorInvert($primary);
$twitter: #4099FF;
$twitter-invert: findColorInvert($twitter);

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
    "white": ($white, $black),
    "black": ($black, $white),
    "light": ($light, $light-invert),
    "dark": ($dark, $dark-invert),
    "primary": ($primary, $primary-invert),
    "info": ($info, $info-invert),
    "success": ($success, $success-invert),
    "warning": ($warning, $warning-invert),
    "danger": ($danger, $danger-invert),
    "twitter": ($twitter, $twitter-invert)
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

// Import Bulma and Buefy styles
@import "~bulma";
</style>
<!-- <style src="./assets/bulma.css"></style> -->
