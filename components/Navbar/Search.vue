<template>
  <div class="search-container" :style="toggleContainerStyle">
    <input
      class="search-input"
      ref="search"
      @keyup.enter="dispatchSearch"
      :placeholder="$t('navbar.search')"
      v-model="keyword"
      value=""
      type="text"
    />
    <button class="search-button" :style="toggleArrowButtonStyle"><font-awesome-icon class="fa-icon" icon="arrow-right"></font-awesome-icon></button>
  </div>
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
    };
  },
  methods: {
    dispatchSearch() {
      console.log(this.keyword);
      this.$store.dispatch('fetchSeriesByString', { searchString: this.keyword });
      this.$router.push({ path: '/search', query: { keyword: this.keyword } });
      this.keyword = '';
      this.$refs.search.blur();
    },
  },
  computed: {
    navStates() {
      return this.$store.state.navbar;
    },
    toggleContainerStyle() {
      if (this.navStates.searchOpen) return { display: 'flex', 'max-width': 'calc(100% - 2.4rem)' };
      return {};
    },
    toggleArrowButtonStyle() {
      if (this.navStates.searchOpen) return { display: 'flex' };
      return {};
    },
  },
};
</script>

<style scoped lang="postcss">
@import "../../assets/css/mediaquery.css";

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
  border-radius: 2px;
  border: 1px solid #999999;
  background-color: #F2F2F2;
  height: 2em;
  padding: 0 .5em;

  appearance: none;

  &::placeholder::before {
    content: "test";
  }
}

.search-button {
  margin-left: 1rem;
  display: none;
  border: none;
  outline: none;
  padding: 0;
  background: transparent;
  font-size: 1.4em;

}

</style>
