<template>
  <section class="series-grid-container">
    <SeriesCover v-for="id in series" :seriesid="id" :key="id"/>
  </section>
</template>

<script>
import SeriesCover from './SeriesCover';
import LoopGrid from './Loop/LoopGrid';

export default {
  name: 'EpisodeGrid',
  props: ['episodeid'],
  components: {
    LoopGrid,
  },
  computed: {
    series() {
      if (this.type === 'search') return this.$store.state.search.searchResult;
      return this.$store.state.series.seriesList;
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
