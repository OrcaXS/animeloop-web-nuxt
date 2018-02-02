<template>
  <div class="series-grid-container">
    <SeriesCover
      v-for="id in series"
      :seriesid="id"
      :key="id"
    />
  </div>
</template>

<script>
import SeriesCover from './Cover';

export default {
  name: 'SeriesGrid',
  components: {
    SeriesCover,
  },
  props: {
    type: {
      type: String,
      required: true,
      default: 'list',
      validator(val) {
        return ['listPage', 'search'].indexOf(val) > -1;
      },
    },
    pageNum: {
      type: String,
      required: false,
      default: '1',
    },
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

<style scoped lang="postcss">
@import "~/assets/css/mediaqueries.css";

.series-grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, calc(225px * 0.8));
  /* grid-template-columns: repeat(auto-fill, minmax(calc(225px * 0.8), 1fr)); */
  grid-gap: 1em;
  justify-content: center;

  margin: 1em 0em;

  @media (--phone-screen) {
    grid-gap: .75em;
    margin: 1em auto;
  }

}

</style>
