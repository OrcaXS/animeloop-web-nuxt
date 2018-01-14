<template>
  <div class="gif-player-container">
    <img v-cloak v-if="playState" v-show="gifLoaded" class="gif" :src="gifsrc" @load="imageOnload">
    <img v-if="!gifLoaded || !playState" :src="jpgsrc" :class="{ blur: playState }">
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
      gifLoaded: false,
    };
  },

  methods: {
    imageOnload() {
      this.gifLoaded = true;
    },
  },

  computed: {
    playState() {
      return this.$store.state.loop.play;
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
    transition: all 0.5s;
  }
}

.blur {
  filter: blur(20px);
}

[v-cloak] {
  display: none;
}

</style>
