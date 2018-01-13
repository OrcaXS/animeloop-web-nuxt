<template>
  <div class="series-page-info-container">
    <div class="series-page-title">
      <span class="series-page-main-title">{{ i18nTitle }}</span>
      <span class="series-page-alt-title">{{ series.title_japanese }}</span>
    </div>
    <Genres class="series-page-genres" :genres="series.genres"/>
    <TypeTag class="series-page-type-season" :type="series.type" :season="series.season" />
    <p class="series-page-description">{{ series.description }}</p>
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
    seriesID: {
      type: String,
      required: true,
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
      return this.$store.state.episode.episodeList[this.seriesID];
    },

    series() {
      return this.$store.state.series.series[this.seriesID];
    },
  },

};
</script>

<style scoped lang="postcss">
.series-page-info-container {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: minmax(2em, auto) 1em 1.5em auto;
  grid-gap: .5em;
  grid-template-areas:
  "series-title"
  "series-genres"
  "series-type-season"
  "series-description";
  align-content: start;
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

</style>
