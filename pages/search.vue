<template>
  <div>
    <div v-if="!!errMsg">
      <h2 class="SearchPage-heading">
        {{ errMsg }}
      </h2>
    </div>
    <div v-else-if="isSearching">
      <h2 class="SearchPage-heading">
        Loading search result for "{{ this.$route.query.keyword }}"
      </h2>
    </div>
    <div v-else-if="isEmptyResult">
      <h2 class="SearchPage-heading">
        No Results for "{{ this.$route.query.keyword }}"
      </h2>
    </div>
    <div v-else>
      <h2 class="SearchPage-heading">
        Displaying search result for "{{ this.$route.query.keyword }}"
      </h2>
      <SeriesGrid type="search" />
    </div>
  </div>
</template>

<script>
import SeriesGrid from '~/components/Series/Grid';

export default {
  name: 'PageSearch',
  components: {
    SeriesGrid,
  },

  head() {
    return {
      title: this.hasKeyword ? `"${this.keyword}" | ${this.$t('search')} | Animeloop` : `${this.$t('search')} | Animeloop`,
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

  asyncData({ query }) {
    return {
      hasKeyword: !!query.keyword,
      // keyword: this.$route.query.keyword,
    };
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

<style scoped lang="postcss">
/** @define SearchPage */
@import "~/assets/css/mediaqueries.css";

.SearchPage-heading {
  /* font-size: 4vw; */
  @media (--phone-screen) {
    margin-left: .5em;
  }
}
</style>
