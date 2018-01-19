<template>
  <div class="series-grid-container">
    <SeriesCover v-for="id in series" :seriesid="id" :key="id" />
  </div>
</template>

<script>
import SeriesCover from './Cover';

export default {
  name: 'SeriesGrid',
  props: {
    type: String,
    required: true,
    default: 'list',
    validator(val) {
      return ['listPage', 'search'].indexOf(val) > -1;
    },
    pageNum: {
      type: String,
      required: false,
      default: '1',
    },
  },
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
      if (this.type === 'listPage') return this.$store.state.series.seriesListByPage[this.pageNum];
      return {};
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

  margin: 1em 0em;
}

</style>
