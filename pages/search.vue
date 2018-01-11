<template>
  <div>
    <!-- <p>SearchPage</p>
    <input v-model="keyword" type="text" value="keyword" placeholder="Search...">
    <button @click="dispatchSearch">Go</button> -->
    <SeriesGrid type="search" />
  </div>
</template>

<script>
import SeriesGrid from '~/components/SeriesGrid';

export default {
  name: 'SearchPage',
  components: {
    SeriesGrid,
  },

  head() {
    return {
      title: this.hasKeyword ? `"${this.keyword}" | Search | Animeloop` : 'Search | Animeloop',
    };
  },

  // asyncData({ params }) {
  //   console.log(params);
  // },

  data() {
    return {
      hasKeyword: !!this.$route.query.keyword,
      // keyword: this.$route.query.keyword,
    };
  },

  computed: {
    keyword() {
      return this.$route.query.keyword || '';
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
