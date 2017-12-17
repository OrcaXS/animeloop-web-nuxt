<template>
  <section>
    <div class="upper-half-cover" :style="upperHalfBackgroundImage"></div>
    <div class="series-page-grid-container">
      <div class="series-page-cover">
        <img :src="series.image_url_large" alt="Cover Art"/>
      </div>
      <div class="series-page-title">
        <h1>{{ series.title_japanese }}</h1>
      </div>
      <div class="series-page-info">
        <span>{{ series.type }}</span>
        <span>{{ series.season }}</span>
        <span v-for="genre in series.genres">{{ genre }}</span>
        <p>{{ series.description }}</p>
        <div v-if="!episodes">
          <p>Loading Episodes...</p>
        </div>
        <div v-else>
          <select v-model="selectedEpisodeID" @change="selectChanged">
            <option disabled value="">Select Episode...</option>
            <option v-for="episode in episodes" v-bind:value="episode.id">
              {{ episode.no }}
            </option>
          </select>
        </div>
      </div>
      <div v-if="$route.name === 'episode-id'" class="episode-grid">
        <div v-if="!loops">
          <p>Loading Loops...</p>
        </div>
        <div v-else>
          <LoopGrid type="episode" :episodeid="selectedEpisodeID" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import EpisodeGrid from './EpisodeGrid';
import LoopGrid from './LoopGrid';

export default {
  name: 'SeriesPage',
  props: {
    seriesid: {
      type: String,
      required: true,
    },
    episodeid: {
      type: String,
      required: false,
    },
  },
  components: {
    EpisodeGrid,
    LoopGrid,
  },

  data() {
    return {
      currentSeriesID: '' || this.seriesid,
      selectedEpisodeID: this.episodeid ? this.episodeid : '',
    };
  },

  computed: {
    loops() {
      return this.$store.state.loop.loopList[this.selectedEpisodeID];
    },

    episodes() {
      return this.$store.state.episode.episodeList[this.currentSeriesID];
    },

    series() {
      return this.$store.state.series.series[this.currentSeriesID];
    },

    upperHalfBackgroundImage() {
      return {
        'background-image': `url(${this.series.image_url_large})`,
      };
    },
  },

  methods: {
    selectChanged() {
      this.$router.push({ path: `/episode/${this.selectedEpisodeID}` });
      this.fetchLoops();
    },

    fetchEpisodes() {
      try {
        this.$store.dispatch('fetchEpisodesBySeriesID', { seriesid: this.currentSeriesID });
      } catch (e) {
        console.log(e);
      }
    },

    fetchLoops() {
      console.log('fetching Loops');
      try {
        this.$store.dispatch('fetchLoopsByEpisodeID', { episodeid: this.selectedEpisodeID });
      } catch (e) {
        console.log(e);
      }
    },
  },

  // watch: {
  //   $route(to, from) {
  //     this.fetchLoops();
  //   },
  // },

  created() {
    if (!this.episodeSelectorLoaded) this.fetchEpisodes();
    if (!this.loopGridLoaded && this.$route.name === 'episode-id') this.fetchLoops();
  },

  // beforeRouteUpdate(to, from, next) {
  //   console.log('beforeRouteUpdate');
  //   this.loopgridLoaded = true;
  //   next();
  //   // react to route changes...
  //   // don't forget to call next()
  // },

};
</script>

<style scoped>
.series-wrapper {
  min-height: 100vh;
}

.series-page-grid-container {
  z-index: 1;
  position: relative;

  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto;
  grid-gap: 1em 2em;
  grid-template-areas:
  "series-cover series-title"
  "series-cover series-info"
  "series-cover series-info"
  "series-episode series-episode";

  padding: 1em 1em 0em;

  background-color: linear-gradient(0deg, rgba(255, 255, 255, 0) rgba(255, 255, 255, 0.4));
}

.upper-half-cover {
  position: absolute;
  top: 3em;
  z-index: 0;
  background-size: cover;
  background-position: top;
  filter: blur(50px);
  width: 100%;
  height: 40vh;
}

.series-page-cover {
  grid-area: series-cover;
  justify-self: center;
}

.series-page-title {
  grid-area: series-title;
}

.series-page-info {
  grid-area: series-info;
}

.episode-grid {
  grid-area: series-episode;
}
</style>
