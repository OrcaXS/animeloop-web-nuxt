<template>
  <SeriesPage :seriesid="episodes.series.id" :episodeid="episodeID"/>
</template>

<script>
import SeriesPage from '~/components/Series/';

export default {
  name: 'EpisodeIDRoute',
  components: {
    SeriesPage,
  },

  data() {
    return {
      // seriesID: this.episode.series.id,
      episodeID: this.$route.params.id,
    };
  },

  async fetch({ store, route: { params: { id } } }) {
    await store.dispatch('fetchEpisodeByID', { episodeid: id });
  },

  computed: {
    episodes() {
      return this.$store.state.episode.episodes[this.$route.params.id];
    },
  },

};
</script>

<style scoped>

</style>
