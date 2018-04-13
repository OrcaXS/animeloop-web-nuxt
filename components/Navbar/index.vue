<template>
  <nav
    :style="toggleContainerStyle"
    class="Navbar z-10"
  >
    <NavbarBurgerMenu />
    <NavbarTitle v-if="!navStates.searchOpen"/>
    <NavbarEntry />
    <NavbarSearch />
    <NavbarLangMenu v-if="!navStates.searchOpen"/>
    <div class="Navbar-lineBreak" />
  </nav>
</template>

<script>
import NavbarEntry from './Entry';
import NavbarLangMenu from './LangMenu';
import NavbarBurgerMenu from './Menu';
import NavbarSearch from './Search';
import NavbarTitle from './Title';

/**
 * The Navbar component.
 */
export default {
  name: 'Navbar',
  components: {
    NavbarEntry,
    NavbarLangMenu,
    NavbarBurgerMenu,
    NavbarSearch,
    NavbarTitle,
  },
  data() {
    return {
    };
  },
  computed: {
    navStates() {
      return this.$store.state.navbar;
    },
    toggleContainerStyle() {
      if (this.navStates.burgerOpen) return { 'flex-wrap': 'wrap' };
      return {};
    },

  },
};
</script>

<style scoped lang="postcss">
/** @define Navbar */

.Navbar {
  grid-area: nav;
  position: fixed;
  top: 0;
  width: 100%;

  background-color: rgba(255, 255, 255, 1.0);

  @supports (backdrop-filter: none) {
    background-color: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(20px);
  }

  box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.15);

  padding: 0 1em;
  display: flex;
  align-items: center;

  @screen tablet {
    /* margin: 2em 2em; */
    padding: 0 2em;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  @screen phone {
    flex-wrap: nowrap;

    /* &::after {
      content: "";
      order: 3;
      width: 100%;
    } */
  }

}

/* Tablet Hack */
/* Cause amoutn of Entries currently less than 4 */

.Navbar-lineBreak {
  display: none;
  @screen tablet {
    display: block;
  }
  content: "";
  order: 3;
  width: 100%;
}
</style>
