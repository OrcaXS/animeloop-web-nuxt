<template>
  <div class="burger-menu-container" :style="toggleSearchStyle">
    <button
    class="menu-button"
    @click="toggleBurger"
    >
    <font-awesome-icon class="fa-icon" :icon="burgerIcon"></font-awesome-icon>
  </button>
  <button class="menu-button" v-if="!navStates.searchOpen" @click="toggleSearch">
    <font-awesome-icon class="fa-icon" icon="search"></font-awesome-icon>
  </button>
</div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';

export default {
  name: 'BurgerMenu',
  components: {
    FontAwesomeIcon,
  },
  computed: {
    navStates() {
      return this.$store.state.navbar;
    },
    burgerIcon() {
      return (this.navStates.burgerOpen || this.navStates.searchOpen) ? 'times' : 'bars';
    },
    toggleSearchStyle() {
      if (this.navStates.searchOpen) {
        return { flex: '0 1 1em' };
      }
      return {};
    },

  },
  methods: {
    toggleBurger() {
      if (this.navStates.searchOpen) {
        this.$store.dispatch('toggleNavbarState', { type: 'search' });
      } else {
        this.$store.dispatch('toggleNavbarState', { type: 'burger' });
      }
    },
    toggleSearch() {
      this.$store.dispatch('toggleNavbarState', { type: 'search' });
    },
  },
  // props: {
  //   burgerOpen: {
  //     type: Boolean,
  //     required: true,
  //   },
  //   searchOpen: {
  //     type: Boolean,
  //     required: true,
  //   },
  // },
};
</script>

<style scoped lang="postcss">
@import "../../assets/css/mediaquery.css";

.burger-menu-container {
  display: none;

  @media (--phone-screen) {
    height: 3em;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-right: auto;
    flex: 0 1 30%;
  }

}

.menu-button {
  display: block;
  margin-right: .5rem;
  border: none;
  outline: none;
  padding: 0;
  background: transparent;
  font-size: 1.4em;
  /* width: 1.4rem; */
}
</style>
