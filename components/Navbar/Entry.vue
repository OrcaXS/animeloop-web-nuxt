<template>
  <div class="entry-container" :style="toggledStyle">
    <template v-for="entry in entries">
      <nuxt-link :to="{ name: entry.route }" class="entry">
        <font-awesome-icon class="fa-icon" :icon="entry.icon"></font-awesome-icon>
        <span v-t="entry.name"></span>
      </nuxt-link>
    </template>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';

export default {
  name: 'NavbarEntry',
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      entries: [
        { name: 'navbar.list', icon: 'th-list' },
        // { name: 'navbar.tags', icon: 'tags' },
        { name: 'navbar.random', icon: 'question-circle', route: 'random' },
        { name: 'navbar.about', icon: 'info', route: 'about' },
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
    // centries() {
    //   return [
    //     { name: 'navbar.episode', icon: 'th-list' },
    //     { name: 'navbar.tags', icon: 'tags' },
    //     { name: 'navbar.random', icon: 'question-circle' },
    //     { name: 'navbar.about', icon: 'info' },
    //   ];
    // },
  },

};
</script>

<style scoped lang="postcss">
@import "../../assets/css/mediaquery.css";

.entry-container {
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
    margin: 0 -0.5em;

    display: none;
    background: white;
    height: auto;
    flex-wrap: wrap;

  }

}

.entry {
  margin: 0 .5em;
  padding: .4em 0;

  &:hover {
    border-bottom: .2rem solid #1e50a2;
    padding-bottom: .2rem;
  }

  cursor: pointer;

  display: flex;
  /* flex-wrap: nowrap; */
  align-items: center;

  @media (--phone-screen) {
    width: 100%;
    height: 3em;
    :hover {
      border-bottom: none;
      padding: .4em 0;
    }
  }

}

.fa-icon {
  margin-right: .5em;
  @media (--phone-screen) {
    /* Vertical alignment */
    width: 1em;
  }

  /* display: block; */

}

</style>
