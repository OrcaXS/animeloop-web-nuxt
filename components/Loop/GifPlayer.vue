<template>
  <div class="gif-player-container">
    <img v-if="playState" class="gif" :src="gifsrc">
    <img v-else :src="jpgsrc">
  </div>
</template>

<script>
// import { GifReader } from 'omggif';

export default {
  name: 'gif-player',
  props: {
    jpgsrc: {
      type: String,
      required: true,
    },
    gifsrc: {
      type: String,
      required: true,
    },
  },

  data() {
    return {

    };
  },

  methods: {
    // toggleVisibility() {
    //
    // },
  },

  computed: {
    playState() {
      return this.$store.state.loop.play;
    },
    toggleGIFStyle() {
      if (!this.playState) {
        return {
          visibility: 'hidden',
        };
      }
      return {};
    },
  },

};
</script>

<style scoped lang="postcss">
.gif-player-container {
  display: flex;
  position: relative;
  overflow: hidden;

  & img {
    width: 100%;
    height: 100%;
  }
}
</style>
