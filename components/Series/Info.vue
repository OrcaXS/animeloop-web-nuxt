<template>
  <div class="series-page-info-container">
    <div class="series-page-title-flex">
      <span class="series-page-main-title">{{ i18nTitle }}&nbsp;</span>
      <span
        v-if="currentLocale !== 'ja'"
        class="series-page-alt-title"
      >{{ series.title_japanese }}</span>
    </div>
    <div class="series-page-genres-season-flex">
      <Genres
        :genres="series.genres"
        class="series-page-genres"
      />
      <TypeTag
        :anime-type="series.type"
        :season="series.season"
        class="series-page-season"
        type="withSeason"
      />
    </div>
    <p
      class="series-page-description"
      v-html="series.description"
    />
  </div>
</template>

<script>
import Genres from './Genres';
import TypeTag from '../Common/TypeTag';

export default {
  name: 'SeriesInfo',
  components: {
    Genres,
    TypeTag,
  },
  props: {
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
@import "~/assets/css/mediaqueries.css";

.series-page-info-container {
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

.series-page-genres-season-flex {
  display: flex;
  flex-flow: row wrap;
  align-items: center;

  @media (--phone-screen) {
    margin: .4em 0;
  }
}

.series-page-genres {
  flex: 0 1 100%;
  margin: .25em 0 0;

  @media (--phone-screen) {
    flex: 0 1 auto;
    margin: .25em 0 .25em .25em;
    order: 1;
  }
}

.series-page-season {
  margin: .4em 0 .4em;

  @media (--phone-screen) {
    flex: 0 1 auto;
    margin: 0 .25em 0 0;
  }
}

.series-page-title-flex {
  grid-area: series-title;

  display: flex;
  flex-flow: row wrap;
  align-items: baseline;
}

.series-page-main-title {
  font-size: 2em;
  font-weight: 600;
}

.series-page-alt-title {
  /* width: 100%; */
  font-size: 1em;
  font-weight: normal;
  color: #666666;
  /* margin-left: .5em; */
}

.series-page-description {
  grid-area: series-description;
  align-self: start;

  color: #333;

  font-size: .9em;
  hyphens: auto;
}

</style>
