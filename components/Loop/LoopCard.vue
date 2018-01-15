<template>
  <section class="loop-card-wrapper">
    <div
      v-if="loopType === 'mp4'"
      class="video-container"
      @mouseover="onHovered()"
      @mouseout="onUnhovered()"
    >
      <p class="loading-spinner" v-if="!canplaythrough"><font-awesome-icon class="fa-icon" icon="spinner" spin></font-awesome-icon></p>
      <video
      ref="video"
      loop
      muted
      autoplay
      playsInline
      @canplaythrough.once="canplay"
      vcloak
      >
        <source :src="files.mp4_720p" type="video/mp4" media="screen">
        <source :src="files.mp4_1080p" type="video/mp4" media="(screen and (min-device-width: 1000px))">
        <track label="English" kind="captions" srcLang="en" />
      </video>
    </div>
    <div v-else class="gif-container">
      <gif-player :gifsrc="files.gif_360p" :jpgsrc="files.jpg_360p"></gif-player>
    </div>
  </section>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
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
    FontAwesomeIcon,
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
.loop-card-wrapper {
}


.video-container {
  position: relative;

  /* box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.1); */

  & > video {
    max-width: 100%;
    max-height: calc(100vh - 13rem);
    object-fit: contain;
  }
}

.gif-container {
  object-fit: cover;


  /* proportional hack */
  height: 0;
  padding-bottom: 56.25%;

  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.1);
}

.video-cover {
  width: 100%;
  transition: all 0.5s;
}

.blur {
  filter: blur(10px);
}

.fa-icon {
  margin: 0em .5em;
}

.loading-spinner {
  background-color: rgba(255, 255, 255, 0.5);

  top: 50%;
  left: 50%;

  padding: .5em;
  border-radius: 5px;
  position: absolute;
  margin: auto;
  transform: translate(-50%,-50%);

  font-size: 1.5em;
}

[v-cloak] {
  display: none;
}

</style>
