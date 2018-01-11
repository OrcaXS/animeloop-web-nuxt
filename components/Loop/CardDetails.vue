<template>
  <div v-if="type === 'loop'" class="card-detail-grid-container">
    <div class="anime-title">{{ i18nTitle }}</div>
    <div class="episode-detail">
      <div class="episode-no">{{ loop.episode.no }}</div>
      <TypeTag class="anime-type" :type="loop.series.type" />
    </div>
    <div class="time-stamp">{{ formattedTimeStamps.begin }} - {{ formattedTimeStamps.end }}</div>
  </div>
  <div v-else class="episode-card-detail-container">
    <div class="episode-time-stamp">{{ formattedTimeStamps.begin }} - {{ formattedTimeStamps.end }}</div>
  </div>
</template>

<script>
import TypeTag from '../Common/TypeTag';

export default {
  name: 'CardDetails',
  components: {
    TypeTag,
  },
  props: {
    type: {
      type: String,
      required: true,
      validator(value) {
        return value === 'episode' || 'loop';
      },
    },
    loopid: {
      type: String,
      required: true,
    },
  },
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
      return this.$store.state.loop.loops[this.loopid];
    },

    formattedTimeStamps() {
      return this.$store.getters.formatTimeStamps(this.loopid);
    },
  },
};
</script>

<style scoped>
.card-detail-grid-container {
  height: 3em;
  padding: .1em .5em .1em;
  background-color: rgba(255, 255, 255, .95);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);

  font-size: 1rem;

  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto auto;
  grid-template-areas:
  "card-title card-episode-detail"
  "card-timestamps card-episode-detail";
  grid-column-gap: .25em;
  align-items: center;
}

.episode-card-detail-container {
  display: block;
  padding: .25em .5em;
  background-color: rgba(255, 255, 255, .95);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);
}

.anime-title {
  grid-area: card-title;

  display: inline;

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 1em;
  /* line-height: 1.15; */
}

.episode-detail {
  grid-area: card-episode-detail;
  justify-self: end;

  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
}

.episode-no {
  text-align: center;
  font-weight: 400;
  font-size: 1.2rem;
  justify-self: center;
  line-height: 0.9;
}

.anime-type {
  max-width: 8em;
  max-height: 1.5em;
  align-self: flex-end;
  text-align: center;
  /* transform: translateY(1px); */
  line-height: 1.3;
}

.time-stamp {
  grid-area: card-timestamps;
  align-self: start;
  font-size: .75em;
  font-style: italic;
  color: #95989A;
}

.episode-time-stamp {
  font-size: 1.5em;
  font-style: italic;
  text-align: center;
  color: #95989A;
}

</style>
