<template>
  <section class="SeriesPage">
    <div
      :style="upperHalfBackgroundImage"
      class="SeriesPage-upperHalfCover"
    />
    <div class="SeriesPage-upperGrid">
      <div class="SeriesPage-cover">
        <nuxt-link :to="{ name: 'series-id', params: { id: seriesid }}">
          <img
            :src="series.image_url_large"
            alt="Cover Art"
          >
        </nuxt-link>
      </div>
      <Info
        :seriesid="currentSeriesID"
        class="SeriesPage-info"
      />
      <div v-if="!episodeList">
        <p>
          <FontAwesomeIcon
            class="SeriesPage-faIcon"
            icon="circle-notch"
            spin
          />
        </p>
      </div>
      <div
        v-else
        class="SeriesPage-episodeSelector"
      >
        <div class="SeriesPage-episodeSelect">
          <select
            v-model="selectedEpisodeID"
            required
            @change="selectChanged"
          >
            <option
              disabled
              selected
              value=""
            >Select Episode...</option>
            <option
              v-for="episode in episodeList"
              :key="episode.no"
              :value="episode.id"
            >
              {{ episode.no }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div
      v-if="$route.name === 'episode-id'"
      class="SeriesPage-lowerGrid"
    >
      <p v-if="!loops">
        <FontAwesomeIcon
          class="SeriesPage-faIcon"
          icon="circle-notch"
          spin
        />
      </p>
      <div v-else>
        <LoopGrid
          :episodeid="selectedEpisodeID"
          page-type="episode"
        />
      </div>
    </div>
  </section>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';

import LoopGrid from '../Loop/Grid';
import Genres from './Genres';
import Info from './Info';

/**
 * View component of `SeriesPage`.
 */
export default {
  name: 'SeriesPageView',
  components: {
    FontAwesomeIcon,
    LoopGrid,
    Genres,
    Info,
  },
  props: {
    /**
     * `seriesid` of current Series.
     */
    seriesid: {
      type: String,
      required: true,
      validator(value) {
        return /^[a-z0-9]{24}$/.test(value);
      },
    },
    /**
     * `episodeid` of current Episode.
     */
    episodeid: {
      type: String,
      required: false,
      default: '',
      validator(value) {
        return /^[a-z0-9]{24}$/.test(value) || value === '';
      },
    },
    /**
     * The number of episode in current Series.
     */
    episodeno: {
      type: String,
      required: false,
      default: '',
      validator(value) {
        return /^[\w]{0,10}$/.test(value) || value === '';
      },
    },
  },


  head() {
    return {
      title: this.metaTitle,
      meta: [
        { hid: 'og:title', name: 'og:title', content: this.episodeid ? `${this.series.title_japanese} ${this.episodeno}` : this.series.title_japanese },
        { hid: 'og:description', property: 'og:description', content: this.series.description },
        { hid: 'og:site_name', name: 'og:site_name', content: 'Animeloop Beta' },
        { hid: 'og:image', property: 'og:image', content: this.series.image_url_large },
      ],
    };
  },

  data() {
    return {
      currentSeriesID: '' || this.seriesid,
      selectedEpisodeID: this.episodeid ? this.episodeid : '',
    };
  },

  computed: {
    metaTitle() {
      if (this.episodeid) {
        return `${this.episodeno} | ${this.i18nTitle} | Animeloop`;
      }
      return `${this.i18nTitle} | Animeloop`;
    },

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

    episodeList() {
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

  created() {
    if (!this.episodeList) this.fetchEpisodes();
    if (this.$route.name === 'episode-id') this.fetchLoops();
  },


  methods: {
  /**
   * When episode selection menu changed, navigate to selected `EpisodePage`.
   *
   * @event selectChanged
   * @type {Function}
   */
    selectChanged() {
      this.$router.push({ path: `/episode/${this.selectedEpisodeID}` });
      this.fetchLoops();
    },
    /**
     * Fetch Episodes.
     *
     * @function fetchLoops
     */
    fetchEpisodes() {
      try {
        this.$store.dispatch('fetchEpisodesBySeriesID', { seriesid: this.currentSeriesID });
      } catch (e) {
        throw new Error(e);
      }
    },
    /**
     * Fetch Loops.
     *
     * @function fetchLoops
     */
    fetchLoops() {
      try {
        this.$store.dispatch('fetchLoopsByEpisodeID', { episodeid: this.selectedEpisodeID });
      } catch (e) {
        throw new Error(e);
      }
    },
  },

};
</script>

<style scoped>
/** @define SeriesPage */

.SeriesPage {
  /* layout hack specifically for seriespage */
  /* padding: 0 -1em; */
  margin: 0 -1em;
  @screen tablet {
    /* Dirty hack for iPhoneX, with iOS 11.1 fallback */
    @supports(padding: min(0px)) {
      /* margin: 0 -16px; */
      margin-left: -3em;
      margin-right: -3em;
      /* padding: 1em 3em 0; */
    }
  }


  @screen phone {
    margin: 0;
  }
}

.SeriesPage-upperGrid {
  z-index: 1;
  margin-top: -1em;
  /* position: relative; */

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

  background-image: linear-gradient(
    0deg,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.4) 50%,
    rgba(255, 255, 255, 0.8)
  );

  @screen tablet {
    /* Dirty hack for iPhoneX, with iOS 11.1 fallback */
    @supports(padding: min(0px)) {
      /* padding: 1em 1em 0em; */
      /* margin-left: -3em;
      margin-right: -3em; */
      padding: 1em 3em 0;
      /* margin: 0 -16px; */
    }
  }

  @screen phone {
    grid-template-columns: auto;
    grid-template-rows: auto;
    grid-template-areas:
    "series-cover"
    "series-page-info"
    "episode-selector";
  }

}

.SeriesPage-upperHalfCover {
  position: absolute;
  top: 4em;
  z-index: -1;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top;
  filter: blur(60px);
  width: calc(100vw - 1em);
  height: 40vh;
}

.SeriesPage-cover {
  grid-area: series-cover;
  justify-self: center;
  & > a > img {
    border-radius: 3px;
  }
}

.SeriesPage-info {
  grid-area: series-page-info;
}

.SeriesPage-episodeSelector {
  grid-area: episode-selector;
}

.SeriesPage-episodeSelect {
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

.SeriesPage-lowerGrid {
  z-index: 2;
  margin-top: 1em;

  & > p {
    text-align: center;
    font-size: 2em;
  }
}

.SeriesPage-faIcon {
  color: #333;
}

</style>
