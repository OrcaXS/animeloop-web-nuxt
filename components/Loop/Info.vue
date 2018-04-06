<template>
  <div class="loop-info-grid-container">
    <div class="loop-info-tags-container">
      <TypeTag
        :anime-type="loop.series.type"
        :season="loop.series.season"
        class="loop-info-season-type"
        type="withSeason"
      />
      <TimeTag
        :duration="formattedTimeStamps.duration"
        class="loop-info-duration"
        type="length"
      />
      <TimeTag
        :start="formattedTimeStamps.begin"
        :end="formattedTimeStamps.end"
        class="loop-info-timestamp"
        type="timestamp"
      />
    </div>
    <div class="info-detail">
      <p class="info-type">Downloads</p>
      <Downloads :loopid="loopid" />
    </div>
  </div>
</template>

<script>
import TimeTag from '~/components/Common/TimeTag';
import TypeTag from '~/components/Common/TypeTag';
import Downloads from './Downloads';

/**
 * Info of current Loop, used in the `LoopPage`.
 */
export default {
  name: 'LoopInfo',
  components: {
    Downloads,
    TimeTag,
    TypeTag,
  },
  props: {
    /**
     * `loopid` of current loop.
     */
    loopid: {
      type: String,
      required: true,
      validator(value) {
        return /^[a-z0-9]{24}$/.test(value);
      },
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

<style>
.loop-info-grid-container {
  grid-area: loop-info;

  display: grid;
  /*justify-content: space-around;*/
  align-items: start;

  /*alignment hack*/
  /* grid-template-columns: minmax(1fr, max-content) auto auto; */
  grid-template-columns: auto;
  grid-template-rows: auto;
  /* grid-auto-flow: column; */
  grid-gap: 1em;
  justify-content: stretch;
}

.loop-info-tags-container {
  display: flex;
  flex-flow: row wrap;
  /* font-family: 'Lato', sans-serif; */
  /* justify-content: space-between; */
  /* width: max-content; */
  /* display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, max-content)); */
  /* grid-template-rows: 300px; */
  /* grid-template-columns: auto auto auto; */
  /* grid-row-gap: .5em; */
  /* grid-template-areas:
    "loop-season-type loop-duration"
    "loop-timestamp loop-timestamp"; */
  /* grid-template-areas:
    "loop-season-type loop-duration loop-timestamp"; */
}

.loop-info-season-type {
  margin: .25em .25em .25em 0;
  /* flex: 1 1 20%; */
  /* grid-area: loop-season-type; */
}

.loop-info-duration {
  margin: .25em .5em .25em .25em;
  /* flex: 1 1 20%; */
  /* grid-area: loop-duration; */
}

.loop-info-timestamp {
  margin: .25em .25em .25em 0;
  /* flex: 0 0 100%; */
  /* grid-area: loop-timestamp; */
}

.info-type {
  font-weight: 500;
  padding-bottom: 1em;
  /* color: #333; */
}

.info-detail {
  font-weight: 400;
  color: #333;
}

</style>
