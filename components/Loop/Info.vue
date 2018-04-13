<template>
  <div class="LoopInfo">
    <div class="LoopInfo-tags">
      <TypeTag
        :anime-type="loop.series.type"
        :season="loop.series.season"
        class="LoopInfo-season"
        type="withSeason"
      />
      <TimeTag
        :duration="formattedTimeStamps.duration"
        class="LoopInfo-duration"
        type="length"
      />
      <TimeTag
        :start="formattedTimeStamps.begin"
        :end="formattedTimeStamps.end"
        class="LoopInfo-timestamp"
        type="timestamp"
      />
    </div>
    <div class="LoopInfo-downloads">
      <p
        v-t="'loop.downloads'"
        class="LoopInfo-downloadsText"
      />
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

<style scoped lang="postcss">
/** @define LoopInfo */

.LoopInfo {
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

.LoopInfo-tags {
  display: flex;
  flex-flow: row wrap;
}

.LoopInfo-season {
  margin: .25em .25em .25em 0;
  /* flex: 1 1 20%; */
  /* grid-area: loop-season-type; */
}

.LoopInfo-duration {
  margin: .25em .5em .25em .25em;
  /* flex: 1 1 20%; */
  /* grid-area: loop-duration; */
}

.LoopInfo-timestamp {
  margin: .25em .25em .25em 0;
  /* flex: 0 0 100%; */
  /* grid-area: loop-timestamp; */
}

.LoopInfo-downloads {
  font-weight: 400;
  color: #333;
}

.LoopInfo-downloadsText {
  font-weight: 500;
  padding-bottom: 1em;
}


</style>
