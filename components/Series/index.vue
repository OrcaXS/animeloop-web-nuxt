<template>
  <section class="series-page-combined-grid">
    <div class="upper-half-cover" :style="upperHalfBackgroundImage"></div>
    <div class="series-page-upper-grid-container">
      <div class="series-page-cover">
        <img :src="series.image_url_large" alt="Cover Art"/>
      </div>
      <Info :seriesID="currentSeriesID" class="series-page-info"/>
      <div v-if="!episodes">
        <p><font-awesome-icon class="fa-icon" icon="circle-notch" spin /></p>
      </div>
      <div v-else class="series-page-episode-selector">
        <div class="episode-select">
          <select required v-model="selectedEpisodeID" @change="selectChanged">
            <option disabled selected value="">Select Episode...</option>
            <option v-for="episode in episodes" :value="episode.id">
              {{ episode.no }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div v-if="$route.name === 'episode-id'" class="series-page-lower-grid-container">
      <p v-if="!loops"><font-awesome-icon class="fa-icon" icon="circle-notch" spin /></p>
      <div v-else>
        <LoopGrid pageType="episode" :episodeid="selectedEpisodeID" />
      </div>
    </div>
  </section>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';

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
    FontAwesomeIcon,
    EpisodeGrid,
    LoopGrid,
    Genres,
    Info,
  },

  head() {
    if (this.episode) {
      return {
        title: `${this.episodes.no} | ${this.i18nTitle} | Animeloop`,
      };
    }
    return {
      title: `${this.i18nTitle} | Animeloop`,
    };
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

.series-page-combined-grid {
  /* layout hack specifically for seriespage */
  margin: 0 -1em;

  @media (--phone-screen) {
    margin: 0;
  }
}

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

  background-image: linear-gradient(0deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.4) 50%, rgba(224, 224, 224, 0.8));

  @media (--phone-screen) {
    grid-template-columns: auto;
    grid-template-rows: auto;
    grid-template-areas:
    "series-cover"
    "series-page-info"
    "episode-selector";
  }

}

.series-page-lower-grid-container {
  /* background-color: rgba(224, 224, 224, 0.8); */
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
}

.episode-select {
  display: inline-block;
  position: relative;

  & > select {
    display: block;
    position: relative;
    appearance: none;

    /* border: 1px solid rgba(128, 128, 128, 0.5); */
    border: none;
    border-radius: 5px;

    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.15);

    padding: .2em .5em;
    width: 10em;
    max-width: 100%;
    height: 2.25em;

    background-color: rgba(255, 255, 255, 0.6);
    color: black;

    font-size: 1em;

    cursor: pointer;

    &:invalid {
      color: #8E8E8E;
    }
  }

  /* the angle-down arrow */
  &:after {
    z-index: 1;
    display: block;
    content: " ";
    position: absolute;

    width: .5em;
    height: .5em;

    margin-top: -.375em;
    right: .625em;
    top: 50%;

    border: 1px solid #444444;
    border-right: 0;
    border-top: 0;

    pointer-events: none;

    transform: rotate(-45deg);
    transform-origin: center;

  }
}

.series-page-lower-grid-container {
  z-index: 2;
  margin-top: 1em;

  & > p {
    text-align: center;
    font-size: 2em;
  }
}

.series-page-category-divider {
  display: inline-block;
  padding: 0em .5rem;
}

.fa-icon {
  color: #333;
}

</style>
