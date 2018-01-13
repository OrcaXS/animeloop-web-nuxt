<template>
  <section>
    <!-- <div v-if="!this.canplaythrough">
      <span>Loading video...</span>
    </div> -->
    <div
      v-if="loopType === 'mp4'"
      class="video-container"
      @mouseover="onHovered()"
      @mouseout="onUnhovered()"
    >
      <video
      ref="video"
      loop
      muted
      playsInline
      width="100%"
      @canplaythrough.once="canplay"
      >
        <source :src="files.mp4_720p" type="video/mp4" media="screen">
        <!-- <source :src="files.mp4_720p" type="video/mp4" media="(screen and (min-device-width: 801px))"> -->
        <source :src="files.mp4_1080p" type="video/mp4" media="(screen and (min-device-width: 1000px))">
        <track label="English" kind="captions" srcLang="en" />
      </video>
    </div>
    <div v-else class="video-container">
      <gif-player :gifsrc="files.gif_360p" :jpgsrc="files.jpg_360p"></gif-player>
    </div>
  </section>
</template>

<script>
import GifPlayer from './GifPlayer';

export default {
  name: 'LoopCard',
  props: {
    loopid: {
      type: String,
      required: true,
    },
    loopType: {
      type: String,
      required: true,
      default: 'mp4',
      validator(val) {
        return val === 'mp4' || val === 'gif';
      },
    },
  },
  components: {
    GifPlayer,
  },
  data() {
    return {
      hovered: false,
      canplaythrough: false,
      isVideoLoaded: false,
    };
  },
  computed: {
    files() {
      return this.$store.state.loop.loops[this.loopid].files;
    },
  },
  methods: {
    // videoLoaded() {
    //   console.log('imgLoaded');
    //   this.isVideoLoaded = true;
    // },
    onHovered() {
      // console.log('hovered');
      if (!this.hovered) {
        this.hovered = true;
        this.$refs.video.play();
      }
    },
    onUnhovered() {
      // console.log('unhovered');
      this.hovered = false;
      this.$refs.video.pause();
    },
    canplay() {
      console.log('canplaythrough');
      this.canplaythrough = true;
      // this.showVid = true;
    },
  },
};
</script>

<style scoped>
section {
  line-height: 0;
}

[v-cloak] {
  display: none;
}

.video-container {
  /*width: 50vw;*/
  /*display: flex;*/
  object-fit: cover;
  /* width: 100%; */

  /* proportional hack */
  height: 0;
  padding-bottom: 56.25%;

  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.1);
}

.video-cover {
  /*display: inline-block;*/
  /*background-size: cover;*/
  width: 100%;
  transition: all 0.5s;
}

.blur {
  filter: blur(10px);
}
</style>
