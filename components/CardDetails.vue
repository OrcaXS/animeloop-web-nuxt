<template>
  <div v-if="type === 'loop'" class="card-detail-grid-container">
    <div class="anime-title">{{ loop.series.title_japanese }}</div>
    <div class="episode-detail">
      <div class="episode-no">{{ loop.episode.no }}</div>
      <div class="anime-type">{{ loop.series.type }}</div>
    </div>
    <div class="time-stamp">{{ formattedTimeStamps.begin }} - {{ formattedTimeStamps.end }}</div>
  </div>
  <div v-else class="episode-card-detail-container">
    <div class="episode-time-stamp">{{ formattedTimeStamps.begin }} - {{ formattedTimeStamps.end }}</div>
  </div>
</template>

<script>
export default {
  name: 'CardDetails',
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
  padding: .25em .5em .25em;
  background-color: rgba(255, 255, 255, .95);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);

  font-size: 1rem;

  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 2fr 1fr;
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

}

.episode-detail {
  grid-area: card-episode-detail;
  justify-self: end;

  display: flex;
  flex-flow: column nowrap;
}

.episode-no {
  text-align: center;
  font-weight: 400;
  font-size: 1.3rem;
  justify-self: center;
}

.anime-type {
  max-width: 8em;
  max-height: 1.5em;
  justify-self: center;
  text-align: center;
}

.time-stamp {
  grid-area: card-timestamps;

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
