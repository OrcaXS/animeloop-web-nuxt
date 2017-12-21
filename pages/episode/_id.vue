<template>
  <SeriesPage :seriesid="episodes.series.id" :episodeid="episodeID"/>
</template>

<script>
import SeriesPage from '~/components/SeriesPage';

export default {
  name: 'EpisodeIDRoute',
  components: {
    SeriesPage,
  },

  head() {
    return {
      title: `${this.episodes.no} | ${this.episodes.series.title_japanese} | Animeloop`,
    };
  },

  data() {
    return {
      // seriesID: this.episode.series.id,
      episodeID: this.$route.params.id,
    };
  },

  asyncData({ store, route: { params: { id } } }) {
    return store.dispatch('fetchEpisodeByID', { episodeid: id });
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
