<template>
  <div class="SeriesInfo">
    <div class="SeriesInfo-title">
      <span class="SeriesInfo-title--main">
        {{ i18nTitle }}&nbsp;
      </span>
      <span
        v-if="currentLocale !== 'ja'"
        class="SeriesInfo-title--alt"
      >
        {{ series.title_japanese }}
      </span>
    </div>
    <div class="SeriesInfo-seasonWithGenres">
      <Genres
        :genres="series.genres"
        class="SeriesInfo-genres"
      />
      <TypeTag
        :anime-type="series.type"
        :season="series.season"
        class="SeriesInfo-season"
        type="withSeason"
      />
    </div>
    <p
      class="SeriesInfo-description"
      v-html="series.description"
    />
  </div>
</template>

<script>
import Genres from './Genres';
import TypeTag from '../Common/TypeTag';

/**
 * Anime Series Info for current Series, part of `SeriesPage`.
 */
export default {
  name: 'SeriesInfo',
  components: {
    Genres,
    TypeTag,
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

    // loops() {
    //   return this.$store.state.loop.loopList[this.selectedEpisodeID];
    // },

    episodes() {
      return this.$store.state.episode.episodeList[this.seriesid];
    },

    series() {
      return this.$store.state.series.series[this.seriesid];
    },
  },

};
</script>

<style scoped lang="postcss">
/** @define SeriesInfo */
@import "~/assets/css/mediaqueries.css";

.SeriesInfo {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: minmax(2em, auto) minmax(1em, auto) auto;
  grid-gap: 0em;
  grid-template-areas:
  "series-title"
  "series-genres-season"
  "series-description";
  align-content: start;
}

.SeriesInfo-seasonWithGenres {
  display: flex;
  flex-flow: row wrap;
  align-items: center;

  @media (--phone-screen) {
    margin: .4em 0;
  }
}

.SeriesInfo-genres {
  flex: 0 1 100%;
  margin: .25em 0 0;

  @media (--phone-screen) {
    flex: 0 1 auto;
    margin: .25em 0 .25em .25em;
    order: 1;
  }
}

.SeriesInfo-season {
  margin: .4em 0 .4em;

  @media (--phone-screen) {
    flex: 0 1 auto;
    margin: 0 .25em 0 0;
  }
}

.SeriesInfo-title {
  grid-area: series-title;

  display: flex;
  flex-flow: row wrap;
  align-items: baseline;
}

.SeriesInfo-title--main {
  font-size: 2em;
  font-weight: 600;
}

.SeriesInfo-title--alt {
  /* width: 100%; */
  font-size: 1em;
  font-weight: normal;
  color: #666666;
  /* margin-left: .5em; */
}

.SeriesInfo-description {
  grid-area: series-description;
  align-self: start;

  color: #333;

  font-size: .9em;
  hyphens: auto;
}

</style>
