<template>
  <div>
    <div v-if="isSearching">
      <p>Loading search result for {{ this.$route.query.keyword }}</p>
    </div>
    <div v-else-if="isEmptyResult">
      <p>No Results for {{ this.$route.query.keyword }}</p>
    </div>
    <div v-else>
      <h2>Displaying search result for "{{ this.$route.query.keyword }}"</h2>
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


  methods: {
    dispatchSearch() {
      console.log(this.keyword);
      this.$router.push({ path: '/search', query: { keyword: this.keyword } });
      this.$store.dispatch('fetchSeriesByString', { searchString: this.keyword });
    },
  },

  created() {
    if (this.hasKeyword) this.dispatchSearch();
  },

  // fetch({ store, route: { params: { keyword } } }) {
  //   return store.dispatch('fetchSeriesByString', { searchString: keyword });
  // },

};
</script>

<style>

</style>
