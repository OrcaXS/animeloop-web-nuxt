<template>
  <div class="SeriesGrid">
    <template v-if="type === 'listPage'">
      <SeriesCover
        v-for="series in seriesList"
        :key="series.id"
        :seriesid="series.id"
      />
    </template>
    <template v-if="type === 'search'">
      <SeriesCover
        v-for="id in seriesList"
        :key="id"
        :seriesid="id"
      />
    </template>
  </div>
</template>

<script>
import SeriesCover from './Cover';

/**
 * Grid containing `SeriesCover`. Used by `SeriesPage` and `SearchPage`.
 */
export default {
  name: 'SeriesGrid',
  components: {
    SeriesCover,
  },
  props: {
    /**
     * Type of page that this component is used in.
     *
     * `listPage, search`
     */
    type: {
      type: String,
      required: true,
      default: 'list',
      validator(val) {
        return ['listPage', 'search'].indexOf(val) > -1;
      },
    },
  },

  data() {
    return {
    };
  },
  computed: {
    seriesList() {
      if (this.type === 'search') return this.$store.state.search.searchResult;
      if (this.type === 'listPage') return this.$store.state.series.seriesListByGroupFilter;
      return {};
    },
    // seriesGroup() {
    //   return this.$store.state.series.seriesListByGroupFilter;
    // },

  },
};
</script>

<style scoped lang="postcss">
/** @define SereisGrid */
@import "~/assets/css/mediaqueries.css";

.SeriesGrid {
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
