<template>
  <form
    class="search-container"
    :style="toggleContainerStyle"
    action=""
    @submit.prevent
  >
    <input
      class="search-input"
      ref="search"
      @keyup.enter="dispatchSearch"
      @focus="searchFocused = true"
      @blur="searchFocused = false"
      :placeholder="searchbarPlaceholder"
      v-model="keyword"
      value=""
      name="search"
      type="search"
      required
    >
    <button
      class="search-button"
      :style="toggleArrowButtonStyle"
      @click="dispatchSearch"
    >
      <FontAwesomeIcon
        class="arrow-right-fa-icon"
        icon="arrow-right"
      />
    </button>
  </form>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';

export default {
  name: 'NavbarSearch',
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      keyword: '',
      searchFocused: false,
    };
  },
  computed: {
    navStates() {
      return this.$store.state.navbar;
    },
    toggleContainerStyle() {
      if (this.navStates.searchOpen) return { display: 'flex', 'max-width': 'calc(100% - 2.1rem)' };
      return {};
    },
    toggleArrowButtonStyle() {
      if (this.navStates.searchOpen) return { display: 'flex' };
      return {};
    },
    searchbarPlaceholder() {
      if (this.keyword) return this.keyword;
      else if (this.searchFocused) return '';
      return this.$t('navbar.search');
    },
  },
  methods: {
    dispatchSearch() {
      if (this.keyword) {
        this.$store.dispatch('fetchSeriesByString', { searchString: this.keyword });
        this.$router.push({ path: '/search', query: { keyword: this.keyword } });
        this.$refs.search.blur();
      }
      // this.keyword = '';
    },
  },

};
</script>

<style scoped lang="postcss">
@import "~/assets/css/mediaqueries.css";

.search-container {
  height: 3em;
  display: flex;
  align-items: center;
  flex: 0 1 20em;
  margin: 0 0 0 auto;
  max-width: 30em;

  @media (--phone-screen) {
    display: none;
    margin: 0 0 0 .5rem;
    flex: 0 1 95%;
  }
}

.search-input {
  width: 100%;
  display: block;

  font-size: 1em;
  text-align: center;

  border-radius: 5px;
  color: #999999;
  /* border: 0px solid #999999; */
  border: none;
  background-color: #f0f0f0;
  height: 2em;
  padding: 0 .5em;

  appearance: none;

  &:focus {
    text-align: start;
    color: black;
  }
}

.search-button {
  margin-left: 1rem;
  display: none;
  border: none;
  outline: none;
  padding: 0;
  background: transparent;
  font-size: 1.2em;

}

</style>
