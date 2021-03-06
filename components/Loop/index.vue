<template>
  <section class="LoopPage">
    <Breadcrumb class="LoopPage-breadcrumb">
      <nuxt-link
        slot="title"
        :to="{ name: 'series-id', params: { id: loop.series.id }}"
        type="title"
      >
        {{ i18nTitle }}
      </nuxt-link>
      <nuxt-link
        slot="no"
        :to="{ name: 'episode-id', params: { id: loop.episode.id }}"
        type="no"
      >
        {{ loop.episode.no }}
      </nuxt-link>
    </BreadCrumb>
    <div class="LoopPage-loopCard">
      <LoopCard
        :loopid="loop.id"
        loop-type="mp4"
        page-type="loop"
      />
    </div>
    <div class="LoopPage-info">
      <LoopInfo :loopid="loop.id" />
    </div>
    <div
      class="LoopPage-verticalTitle"
      lang="ja"
    >
      <p>{{ loop.series.title_japanese }}</p>
    </div>
  </section>
</template>

<script>
import LoopInfo from './Info';
import LoopCard from './Card';
import Breadcrumb from './Breadcrumb';

/**
 * View component of `LoopPage`.
 */
export default {
  name: 'LoopPageView',
  components: {
    Breadcrumb,
    LoopInfo,
    LoopCard,
  },

  props: {
    /**
     * Type of current `LoopPage`.
     *
     * `loop, random`
     */
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
      return this.$store.state.loop.loops[this.$store.state.loop.randomPageLoopid];
    },
  },
};
</script>

<style scoped lang="postcss">
/** @define LoopPage */
@import "~/assets/css/mediaqueries.css";

.LoopPage {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto;
  grid-gap: 1em 2em;
  grid-template-areas:
  "breadcrumb vertical-title"
  "loop-card vertical-title"
  "loop-info vertical-title"
  "loop-info vertical-title";

  align-content: start;

  /* max-height: calc(100vh - 3rem); */
  /* margin: 0 1em; */

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

.LoopPage-verticalTitle {
  grid-area: vertical-title;
  writing-mode: vertical-rl;
  color: var(--grey3);
  font-size: 3em;
  font-family: serif;
  max-height: calc(100vh - 5rem);

  white-space: normal;
  word-break: normal;

  @media (--tablet-screen) {
    display: none;
  }

  @media (--phone-screen) {
    display: none;
  }
}

.LoopPage-loopCard {
  grid-area: loop-card;
  /* max-height: 75vh; */
  /* width: 100%; */
}

.LoopPage-info {
  @media (--phone-screen) {
    margin: 0 .5em;
  }
}

.LoopPage-breadcrumb {
  grid-area: breadcrumb;
  @media (--phone-screen) {
    margin: 0 .5em;
  }
}

</style>
