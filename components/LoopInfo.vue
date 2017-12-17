<template>
  <div class="loop-info-grid-container">
    <div class="info-type">TimeStamps</div>
    <div class="info-detail">{{ formattedTimeStamps.begin }} - {{ formattedTimeStamps.end }}</div>
    <div class="info-type">Length</div>
    <div class="info-detail">{{ formattedTimeStamps.duration }}s</div>
    <div class="info-type">Downloads</div>
    <div class="info-detail">
      <Downloads :loopid="this.loopid" />
    </div>
  </div>
</template>

<script>
import Downloads from './Downloads';

export default {
  name: 'LoopInfo',
  props: ['loopid'],
  components: {
    Downloads,
  },

  computed: {
    loop() {
      return this.$store.state.loop.loops[this.loopid];
    },

    formattedTimeStamps() {
      return this.$store.getters.formatTimeStamps(this.loopid);
    },
    // tidyDuration() {
    //   return this.loop.duration.toFixed(3);
    // },
    // tidyTimestamps() {
    //   function tidyTimestamp(time) {
    //     const arr = time.split(':');
    //     if (arr[0] !== '00') {
    //       arr[1] = (parseInt(arr[0], 10) * 60) + parseInt(arr[1], 10);
    //       arr[1] = arr[1].toString();
    //     }
    //     arr[2] = arr[2].includes('.') ? arr[2].slice(0, -3) : `${arr[2]}.000`;
    //     return `${arr[1]}:${arr[2]}`;
    //   }
    //   return `${tidyTimestamp(this.loop.period.begin)} - ${tidyTimestamp(this.loop.period.end)}`;
    // },
  },

};
</script>

<style>
.loop-info-grid-container {
  grid-area: loop-info;

  display: grid;
  /*justify-content: space-around;*/
  align-items: start;

  /*alignment hack*/
  grid-template-columns: minmax(1fr, max-content) auto auto;
  grid-template-rows: auto auto;
  grid-auto-flow: column;
  grid-gap: 1em;
  justify-content: stretch;
}

.info-type {
  font-weight: 500;
}

.info-detail {
  font-weight: 400;
}

</style>
