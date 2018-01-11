<template>
  <nav :style="toggleContainerStyle">
    <NavbarBurgerMenu />
    <NavbarTitle v-if="!navStates.searchOpen"/>
    <NavbarEntry />
    <NavbarSearch />
    <NavbarLangMenu v-if="!navStates.searchOpen"/>
    <div v-show="navStates.burgerOpen" class="line-break" />
  </nav>
</template>

<script>
import NavbarEntry from './Entry';
import NavbarLangMenu from './LangMenu';
import NavbarBurgerMenu from './Menu';
import NavbarSearch from './Search';
import NavbarTitle from './Title';

export default {
  name: 'NavbarContainer',
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
    // toggleWrapHackStyle() {
    //   if (this.navStates.burgerOpen)
    // },

  },
};
</script>

<style scoped lang="postcss">
@import "../../assets/css/mediaquery.css";

nav {
  grid-area: nav;
  z-index: 10;
  position: fixed;
  top: 0;
  width: 100%;

  background-color: rgba(255, 255, 255, 1.0);

  @supports (backdrop-filter: none) {
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(10px);
  }

  box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.1);

  padding: 0 1em;
  display: flex;
  align-items: center;

  @media (--tablet-screen) {
    /* margin: 2em 2em; */
    padding: 0 2em;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  @media(--phone-screen) {
    flex-wrap: nowrap;

    /* &::after {
      content: "";
      order: 3;
      width: 100%;
    } */
  }

}

.line-break {
  content: "";
  order: 3;
  width: 100%;
}
</style>
