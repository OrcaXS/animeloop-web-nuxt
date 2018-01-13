<template>
  <section class="loop-page-grid-container">
    <BreadCrumb class="breadcrumb">
      <nuxt-link :to="{ name: 'series-id', params: { id: loop.series.id }}" type="title" slot="title">{{ i18nTitle }}</nuxt-link>
      <nuxt-link type="no" slot="no" :to="{ name: 'episode-id', params: { id: loop.episode.id }}">{{loop.episode.no}}</nuxt-link>
    </BreadCrumb>
    <div class="loop-card">
      <LoopCard :loopid="loop.id" loopType="mp4" />
    </div>
    <div class="loop-info">
      <LoopInfo :loopid="loop.id" />
    </div>
    <div class="vertical-title">
      <p>{{ loop.series.title_japanese }}</p>
    </div>
  </section>
</template>

<script>
import LoopInfo from '~/components/Loop/LoopInfo';
import LoopCard from '~/components/Loop/LoopCard';
import BreadCrumb from '~/components/BreadCrumb';

export default {
  name: 'loop-page-view',
  components: {
    BreadCrumb,
    LoopInfo,
    LoopCard,
  },

  props: {
    pageType: {
      type: String,
      required: true,
      default: 'loop',
      validator(value) {
        return value === 'loop' || value === 'random';
      },
    },
  },

  // head() {
  //   return {
  //     title: `${this.loop.episode.no} | ${this.i18nTitle} | Animeloop`,
  //   };
  // },

  computed: {
    i18nTitle() {
      switch (this.currentLocale) {
        case 'ja':
          return this.loop.series.title_japanese;
        case 'zh':
          return this.loop.series.title;
        case 'en':
          return this.loop.series.title_english;
        default:
          return this.loop.series.title_english;
      }
    },

    currentLocale() {
      return this.$store.state.i18n.locale;
    },

    loop() {
      if (this.pageType === 'loop') return this.$store.state.loop.loops[this.$route.params.id];
      return this.$store.state.loop.loops[this.$store.state.loop.randomPageLoopID];
    },
  },
};
</script>

<style scoped lang="postcss">
@import "../../assets/css/mediaquery.css";

.loop-page-grid-container {
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: auto;
  grid-gap: 1em 2em;
  grid-template-areas:
  "breadcrumb vertical-title"
  "loop-card vertical-title"
  "loop-info vertical-title"
  "loop-info vertical-title";

  margin: 0 1em;

  @media (--tablet-screen) {
    grid-template-columns: auto;
    grid-template-rows: auto;
    grid-template-areas:
    "breadcrumb"
    "loop-card"
    "loop-info";
  }

  @media (--phone-screen) {
    grid-template-columns: auto;
    grid-template-rows: auto;
    grid-template-areas:
    "breadcrumb"
    "loop-card"
    "loop-info";

    margin: 0;
  }
}

.vertical-title {
  grid-area: vertical-title;
  writing-mode: vertical-rl;
  color: #BBBBBB;
  font-size: 3em;
  max-height: calc(100vw - 8em);

  white-space: normal;
  word-break: normal;

  @media (--tablet-screen) {
    display: none;
  }

  @media (--phone-screen) {
    display: none;
  }
}

.loop-card {
  grid-area: loop-card;
  width: 100%;
}

.loop-info {

};

.breadcrumb {
  grid-area: breadcrumb;
}

</style>
