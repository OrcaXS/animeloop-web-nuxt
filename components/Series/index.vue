<template>
  <section class="series-page-combined-grid">
    <div class="upper-half-cover" :style="upperHalfBackgroundImage"></div>
    <div class="series-page-upper-grid-container">
      <div class="series-page-cover">
        <img :src="series.image_url_large" alt="Cover Art"/>
      </div>
      <Info :seriesID="currentSeriesID" class="series-page-info"/>
      <div v-if="!episodes">
        <p>Loading Episodes...</p>
      </div>
      <div v-else class="series-page-episode-selector">
        <select v-model="selectedEpisodeID" @change="selectChanged">
          <option disabled value="">Select Episode...</option>
          <option v-for="episode in episodes" v-bind:value="episode.id">
            {{ episode.no }}
          </option>
        </select>
      </div>
    </div>
    <div v-if="$route.name === 'episode-id'" class="series-page-lower-grid-container">
      <div v-if="!loops">
        <p>Loading Loops...</p>
      </div>
      <div v-else>
        <LoopGrid type="episode" :episodeid="selectedEpisodeID" />
      </div>
    </div>
  </section>
</template>

<script>
// import BreadCrumb from '../BreadCrumb';
import EpisodeGrid from '../EpisodeGrid';
import LoopGrid from '../Loop/LoopGrid';
import Genres from './Genres';
import Info from './Info';

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
    Genres,
    Info,
  },

  data() {
    return {
      currentSeriesID: '' || this.seriesid,
      selectedEpisodeID: this.episodeid ? this.episodeid : '',
    };
  },

  computed: {
    i18nTitle() {
      switch (this.currentLocale) {
        case 'ja':
          return this.series.title_japanese;
        case 'zh':
          return this.series.title;
        case 'en':
          return this.series.title_english;
        default:
          return this.series.title_english;
      }
    },

    currentLocale() {
      return this.$store.state.i18n.locale;
    },

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
        background: `linear-gradient(0deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), url(${this.series.image_url_large})`,
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


  created() {
    if (!this.episodeSelectorLoaded) this.fetchEpisodes();
    if (!this.loopGridLoaded && this.$route.name === 'episode-id') this.fetchLoops();
  },

};
</script>

<style scoped>
@import "../../assets/css/mediaquery.css";

.series-page-upper-grid-container {
  z-index: 1;
  margin-top: -1em;
  position: relative;

  display: grid;
  grid-template-columns: 230px auto;
  /* grid-template-rows: minmax(1em, auto) minmax(1em, auto) 1.5em auto auto auto; */
  /* grid-template-rows: repeat(auto-fill, minmax(1em, auto)); */
  grid-template-rows: auto;
  grid-gap: .5em 2em;
  grid-template-areas:
  "series-cover series-page-info"
  "series-cover episode-selector";

  padding: 1em 1em 0em;

  background-image: linear-gradient(0deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0.8));

  @media (--phone-screen) {
    grid-template-columns: auto;
    grid-template-rows: auto;
    grid-template-areas:
    "series-cover"
    "series-page-info"
    "episode-selector";
  }

}

.upper-half-cover {
  position: absolute;
  top: 4em;
  z-index: -1;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top;
  filter: blur(60px);
  width: 100%;
  height: 40vh;
}

.series-page-cover {
  grid-area: series-cover;
  justify-self: center;
}

.series-page-info {
  grid-area: series-page-info;
}

.series-page-episode-selector {
  grid-area: episode-selector;

  & select {
    appearance: none;
    background: transparent;
    border: 1px solid rgba(128, 128, 128, 0.5);
    padding: .2em .5em;
    width: 10em;
    font-size: 1em;
    background-color: rgba(255, 255, 255, 0.6);
    color: black;
  }

  &:after {
    border: 1px solid #444444;
    border-right: 0;
    border-top: 0;
    content: " ";
    display: inline-block;
    height: 0.5em;
    position: relative;
    transform: rotate(-45deg);
    transform-origin: center;
    width: 0.5em;
    right: 1.125em;
    bottom: .2em;
  }
}

.series-page-lower-grid-container {
  /* grid-area: series-episode-grid; */
  z-index: 2;
  margin-top: 1em;
}

.series-page-category-divider {
  display: inline-block;
  padding: 0em .5rem;
}

</style>
