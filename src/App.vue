<template>
  <div class="wrapper" id="app">
    <nav id="nav">
      <TheNavbar/>
    </nav>
    <div id="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import TheNavbar from './components/partial/TheNavbar';

export default {
  name: 'App',
  components: {
    TheNavbar,
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

// Import Bulma styles
@import "~bulma/sass/base/generic";
@import "~bulma/sass/base/minireset";
@import "~bulma/sass/components/breadcrumb";
@import "~bulma/sass/components/message";
@import "~bulma/sass/elements/_all";
</style>
<!-- <style src="./assets/bulma.css"></style> -->
