<template>
  <div
    :style="toggleSearchStyle"
    class="burger-menu-container"
  >
    <button
      class="menu-button menu-icon"
      aria-label="Menu Icon"
      @click="toggleBurger"
    >
      <FontAwesomeIcon :icon="burgerIcon" />
    </button>
    <button
      v-if="!navStates.searchOpen"
      class="menu-button"
      aria-label="Search Icon"
      @click="toggleSearch"
    >
      <FontAwesomeIcon icon="search" />
    </button>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';

/**
 * Burger Menu of the Navbar. Enabled in Mobile(phone) layout only.
 */
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
@import "~/assets/css/colors.css";
@import "~/assets/css/mediaqueries.css";

.burger-menu-container {
  display: none;

  @media (--phone-screen) {
    height: 3em;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-right: auto;
    flex: 0 1 10%;
  }

}

.menu-button {
  color: var(--black1);

  display: block;
  margin-right: .5rem;
  border: none;
  outline: none;
  padding: 0;
  background: transparent;
  font-size: 1.2em;
  width: 1.3rem;
}

/* fixed menu-icon width */
.menu-icon {
  width: 1.1rem;
}

/* .search-icon {
  max-width: 1.2em;
} */
</style>
