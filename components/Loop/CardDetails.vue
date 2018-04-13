<template>
  <div
    v-if="type === 'loop'"
    class="CardDetails-gridContainer"
  >
    <div class="CardDetails-title">{{ i18nTitle }}</div>
    <div class="CardDetails-rightHalf">
      <div class="CardDetails-episodeNo">{{ loop.episode.no }}</div>
      <TypeTag
        :anime-type="loop.series.type"
        class="CardDetails-type"
        type="simple"
      />
    </div>
    <div class="CardDetails-timestamp">
      {{ formattedTimeStamps.begin }} - {{ formattedTimeStamps.end }}
    </div>
  </div>
  <div
    v-else
    class="CardDetails--episode"
  >
    <div class="CardDetails-timestamp--episode">
      {{ formattedTimeStamps.begin }} - {{ formattedTimeStamps.end }}
    </div>
  </div>
</template>

<script>
import TypeTag from '../Common/TypeTag';

/**
 * Details of Loop, shown below LoopCard in Series/Episode/Home Pages.
 */
export default {
  name: 'CardDetails',
  components: {
    TypeTag,
  },
  props: {
    /**
    * The type of the `LoopCard` details.
    *
    * `loops` shows full detail while `episode` shows timestamps only.
    *
    * `episode, loop`
    */
    type: {
      type: String,
      required: true,
      validator(val) {
        return val === 'episode' || val === 'loop';
      },
    },
    /**
    * `loopid` of the `LoopCard`.
    */
    loopid: {
      type: String,
      required: true,
      validator(val) {
        return /^[a-z0-9]{24}$/.test(val);
      },
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
/** @define CardDetails */
.CardDetails-gridContainer {
  height: 3em;
  padding: .1em .5em .1em;
  background-color: rgba(255, 255, 255, .95);
  /* box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1); */
  border-radius: 0 0 3px 3px;


  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto auto;
  grid-template-areas:
  "card-title card-right-half"
  "card-timestamp card-right-half";
  grid-column-gap: .25em;
  align-items: center;
}

.CardDetails--episode {
  display: block;
  padding: .25em .5em;
  background-color: rgba(255, 255, 255, .95);
  border-radius: 0 0 3px 3px;
  /* box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1); */
}

.CardDetails-title {
  grid-area: card-title;

  display: inline;

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 1em;
}

.CardDetails-rightHalf {
  grid-area: card-right-half;
  justify-self: end;
  align-self: stretch;

  display: flex;
  flex-flow: column nowrap;
  justify-content: space-evenly;
}

.CardDetails-episodeNo {
  text-align: center;
  font-weight: 400;
  font-size: 1.2rem;
  justify-self: center;
  line-height: 0.9;
}

.CardDetails-type {
  max-width: 8em;
  max-height: 1.5em;
  align-self: flex-end;
  text-align: center;
  /* transform: translateY(1px); */
  line-height: 1.3;
}

.CardDetails-timestamp {
  grid-area: card-timestamp;
  /* align-self: start; */
  font-size: .75em;
  font-style: italic;
  color: #95989A;
}

.CardDetails-timestamp--episode {
  font-size: 1.2em;
  /* font-style: italic; */
  text-align: center;
  color: #95989A;
}

</style>
