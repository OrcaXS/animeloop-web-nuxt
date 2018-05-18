<template>
  <div
    :style="toggledStyle"
    class="NavbarEntry"
  >
    <nuxt-link
      v-for="entry in entries"
      :key="entry.route"
      :to="{ name: entry.routeName }"
      class="NavbarEntry-link"
      @click.native="toggleBurger"
    >
      <FontAwesomeIcon
        :icon="entry.icon"
        class="NavbarEntry-faIcon"
      />
      <span>{{ $t(entry.name) }}</span>
    </nuxt-link>
    <a
      href="https://animeloop.org/api/docs/"
      class="NavbarEntry-link"
      @click.native="toggleBurger"
    >
      <FontAwesomeIcon
        icon="terminal"
        class="NavbarEntry-faIcon"
      />
      <span>{{ $t('navbar.api') }}</span>
    </a>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';

/**
 * Entries of the Navbar.
 */
export default {
  name: 'NavbarEntry',
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      entries: [
        { name: 'navbar.list', icon: 'th-list', routeName: 'list' },
        // { name: 'navbar.tags', icon: 'tags' },
        { name: 'navbar.random', icon: 'question-circle', routeName: 'random' },
        { name: 'navbar.about', icon: 'info', routeName: 'about' },
      ],

    };
  },
  computed: {
    navStates() {
      return this.$store.state.navbar;
    },
    toggledStyle() {
      if (this.navStates.burgerOpen) return { display: 'flex' };
      return {};
    },
  },
  methods: {
    // toggle burger menu after navigation
    toggleBurger() {
      if (this.navStates.burgerOpen) this.$store.dispatch('toggleNavbarState', { type: 'burger' });
    },
  },

};
</script>

<style scoped lang="postcss">
/** @define NavbarEntry */
@import "~/assets/css/mediaqueries.css";

.NavbarEntry {
  display: flex;
  align-items: center;
  padding: 0 1em;
  height: 3em;
  flex-shrink: 0;

  @media (--tablet-screen) {
    order: 4;
    flex-grow: 1;
    justify-content: space-between;
    padding: 0;
    margin: 0 -0.5em;
  }

  @media (--phone-screen) {
    order: 4;
    flex-grow: 1;
    justify-content: space-between;
    padding: 0;
    margin: 0 -.5em .5em -.5em;

    display: none;
    height: auto;
    flex-wrap: wrap;

  }

}

.NavbarEntry-link {
  margin: 0 .5em;
  padding: .4em 0;

  color: var(--black1);

  &:hover {
    border-bottom: .15rem solid var(--accent-color-light);
    padding-bottom: .2rem;
  }

  cursor: pointer;

  display: flex;
  /* flex-wrap: nowrap; */
  align-items: center;

  @media (--phone-screen) {
    width: 100%;
    height: 3em;
    &:hover {
      border-bottom: none;
      padding: .4em 0;
    }
  }

}

.NavbarEntry-faIcon {
  margin-right: .5em;
  @media (--phone-screen) {
    /* Vertical alignment */
    width: 1em;
  }

  /* display: block; */

}

</style>
