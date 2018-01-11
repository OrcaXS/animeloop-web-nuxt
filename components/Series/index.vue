<template>
  <section>
    <div class="upper-half-cover" :style="upperHalfBackgroundImage"></div>
    <div class="series-page-grid-container">
      <div class="series-page-cover">
        <img :src="series.image_url_large" alt="Cover Art"/>
      </div>
      <div class="series-page-title">
        <span class="series-page-main-title">{{ i18nTitle }}</span>
        <span class="series-page-alt-title">{{ series.title_japanese }}</span>
      </div>
      <Genres class="series-page-genres" :genres="series.genres"/>
      <TypeTag class="series-page-type-season" :type="series.type" :season="series.season" />
      <p class="series-page-description">{{ series.description }}</p>
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
      <div v-if="$route.name === 'episode-id'" class="series-page-episode-grid">
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
// import BreadCrumb from '../BreadCrumb';
import EpisodeGrid from '../EpisodeGrid';
import LoopGrid from '../Loop/LoopGrid';
import TypeTag from '../Common/TypeTag';
import Genres from './Genres';

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
    TypeTag,
    Genres,
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
  margin-top: -1em;
  position: relative;

  display: grid;
  grid-template-columns: 230px auto;
  grid-template-rows: minmax(1em, auto) minmax(1em, auto) 1.5em auto auto auto;
  /* grid-template-rows: repeat(auto-fill, minmax(1em, auto)); */
  grid-gap: .5em 2em;
  grid-template-areas:
  "series-cover series-title"
  "series-cover series-genres"
  "series-cover series-type-season"
  "series-cover series-description"
  "series-cover episode-selector"
  "series-episode-grid series-episode-grid";

  padding: 1em 1em 0em;

  background-image: linear-gradient(0deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0.8));
}

.upper-half-cover {
  position: absolute;
  top: 3em;
  z-index: 0;
  background-size: cover;
  background-position: top;
  filter: blur(60px);
  width: 100%;
  height: 500px;
}

.series-page-cover {
  grid-area: series-cover;
  justify-self: center;
}

.series-page-genres {
  grid-area: series-genres;
}

.series-page-type-season {
  grid-area: series-type-season;
}

.series-page-title {
  grid-area: series-title;

  display: flex;
  flex-flow: row wrap;
  align-items: baseline;
}

.series-page-main-title {
  font-size: 2em;
  font-weight: 600;
  margin-right: .5em;
}

.series-page-alt-title {
  font-size: 1em;
  font-weight: normal;
  color: #666666;
  /* margin-left: .5em; */
}

.series-page-description {
  grid-area: series-description;
  align-self: center;
  font-size: .9em;
  /* line-height: normal; */
  align-self: start;
}

.series-page-episode-selector {
  grid-area: episode-selector;

  & select {
    appearance: none;
    background: transparent;
    border: none;
    padding: .8em .5em;
    width: 10em;
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

.series-page-episode-grid {
  grid-area: series-episode-grid;
}

.series-page-category-divider {
  display: inline-block;
  padding: 0em .5rem;
}

</style>
