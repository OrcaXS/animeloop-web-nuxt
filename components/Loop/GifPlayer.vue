<template>
  <div class="GifPlayer">
    <img
      v-cloak
      v-if="playState"
      v-show="gifLoaded"
      :src="gifsrc"
      class="GifPlayer-gif"
      alt="Static Loop Image"
      @load="imageOnload"
    >
    <img
      v-if="!gifLoaded || !playState"
      :src="jpgsrc"
      :class="{ 'GifPlayer-blur': playState }"
      class="GifPlayer-img"
      alt="Animated Loop Image"
    >
  </div>
</template>

<script>
/**
 * Wrapper for `.gif` files.
 */
export default {
  name: 'GifPlayer',
  props: {

    /**
     * Src path for `.jpg` file.
     */
    jpgsrc: {
      type: String,
      required: true,
    },

    /**
     * Src path for `.gif` file.
     */
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
  computed: {
    playState() {
      return this.$store.state.loop.play;
    },
  },
  methods: {
    /**
     * Show the `gif` once it completes loading.
     *
     * @event imageOnload
     * @type {Function}
     */
    imageOnload() {
      this.gifLoaded = true;
    },
  },

};
</script>

<style scoped lang="postcss">
/** @define GifPlayer */

.GifPlayer {
  display: flex;
  position: relative;
  overflow: hidden;
  max-height: 100%;
  max-width: 100%;
  border-radius: 3px 3px 0 0;
  /* object-fit: contain; */
}

.GifPlayer-img {
  transition: all 0.5s;
  object-fit: contain;
  margin-left: auto;
  margin-right: auto;
}

.GifPlayer-gif {
  /* gif size hack */
  width: 360px;
  height: 100%;
}

.GifPlayer-blur {
  filter: blur(20px);
}

[v-cloak] {
  display: none;
}

</style>
