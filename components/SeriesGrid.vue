<template>
  <div>
    <div v-if="isSearching">
      <p>Searching for {{ this.$route.query.keyword }}</p>
    </div>
    <div v-else-if="isEmptyResult">
      <p>No Results for {{ this.$route.query.keyword }}</p>
    </div>
    <div v-else class="series-grid-container">
      <SeriesCover v-for="id in series" :seriesid="id" :key="id"/>
    </div>
  </div>
</template>

<script>
import SeriesCover from './SeriesCover';

export default {
  name: 'SeriesGrid',
  props: ['type'],
  components: {
    SeriesCover,
  },
  data() {
    return {
    };
  },
  computed: {
    series() {
      if (this.type === 'search') return this.$store.state.search.searchResult;
      return this.$store.state.series.seriesList;
    },
    isSearching() {
      return this.$store.state.search.isSearching;
    },
    isEmptyResult() {
      return !(Array.isArray(this.series) && this.series.length);
    },
  },
};
</script>

<style scoped>
.series-grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 225px));
  grid-gap: 1em;
  justify-content: center;
}

</style>
