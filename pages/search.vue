<template>
  <div>
    <div v-if="!!errMsg">
      <h2 class="search-heading-text">{{ errMsg }}</h2>
    </div>
    <div v-else-if="isSearching">
      <h2 class="search-heading-text">
        Loading search result for "{{ this.$route.query.keyword }}"
      </h2>
    </div>
    <div v-else-if="isEmptyResult">
      <h2 class="search-heading-text">No Results for "{{ this.$route.query.keyword }}"</h2>
    </div>
    <div v-else>
      <h2 class="search-heading-text">
        Displaying search result for "{{ this.$route.query.keyword }}"
      </h2>
      <SeriesGrid type="search" />
    </div>
  </div>
</template>

<script>
import SeriesGrid from '~/components/Series/Grid';

export default {
  name: 'SearchPage',
  components: {
    SeriesGrid,
  },

  head() {
    return {
      title: this.hasKeyword ? `"${this.keyword}" | ${this.$t('search')} | Animeloop` : `${this.$t('search')} | Animeloop`,
    };
  },

  asyncData({ query }) {
    return {
      hasKeyword: !!query.keyword,
      // keyword: this.$route.query.keyword,
    };
  },

  data() {
    return {
      errMsg: '',
    };
  },

  computed: {
    keyword() {
      return this.$route.query.keyword || '';
    },
    isSearching() {
      return this.$store.state.search.isSearching;
    },
    isEmptyResult() {
      return !(Array.isArray(this.searchResult) && this.searchResult.length !== 0);
    },
    searchResult() {
      return this.$store.state.search.searchResult;
    },
  },

  created() {
    if (this.hasKeyword) this.dispatchSearch();
  },

  methods: {
    async dispatchSearch() {
      this.$router.push({ path: '/search', query: { keyword: this.keyword } });
      try {
        await this.$store.dispatch('fetchSeriesByString', { searchString: this.keyword });
      } catch (err) {
        this.errMsg = err.message;
      }
    },
  },


  // fetch({ store, route: { params: { keyword } } }) {
  //   return store.dispatch('fetchSeriesByString', { searchString: keyword });
  // },

};
</script>

<style scoped>
@import "~/assets/css/mediaqueries.css";

.search-heading-text {
  /* font-size: 4vw; */
  @media (--phone-screen) {
    margin-left: .5em;
  }
}
</style>
