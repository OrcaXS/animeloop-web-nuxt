<template>
  <section class="loop-card-wrapper">
    <div
      v-if="loopType === 'mp4'"
      class="video-container"
      @mouseover="onHovered()"
      @mouseout="onUnhovered()"
    >
      <p
        class="loading-spinner"
        v-if="!canplaythrough"
      >
        <FontAwesomeIcon
          class="fa-icon"
          icon="circle-notch"
          spin
        />
      </p>
      <video
        ref="video"
        loop
        muted
        autoplay
        playsInline
        @canplaythrough.once="canplay"
        vcloak
      >
        <source
          :src="files.mp4_720p"
          type="video/mp4"
          media="screen"
        >
        <source
          :src="files.mp4_1080p"
          type="video/mp4"
          media="(screen and (min-device-width: 1000px))"
        >
        <track
          label="English"
          kind="captions"
          srcLang="en"
        >
      </video>
    </div>
    <div
      v-else
      class="gif-container"
      :class="{ 'fixed-img-size' : pageType === 'random' }"
    >
      <GifPlayer
        :gifsrc="files.gif_360p"
        :jpgsrc="files.jpg_360p"
      />
    </div>
  </section>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import GifPlayer from './GifPlayer';

export default {
  name: 'LoopCard',
  components: {
    GifPlayer,
    FontAwesomeIcon,
  },
  props: {
    loopid: {
      type: String,
      required: true,
      validator(value) {
        return /^[a-z0-9]{24}$/.test(value);
      },
    },
    loopType: {
      type: String,
      required: true,
      default: 'mp4',
      validator(val) {
        return val === 'mp4' || val === 'gif';
      },
    },
    pageType: {
      type: String,
      required: true,
      default: 'loop',
      validator(val) {
        return ['random', 'episode', 'loop'].indexOf(val) > -1;
      },
    },
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
    onHovered() {
      if (!this.hovered) {
        this.hovered = true;
        this.$refs.video.play();
      }
    },
    onUnhovered() {
      this.hovered = false;
      this.$refs.video.pause();
    },
    canplay() {
      this.canplaythrough = true;
    },
  },
};
</script>

<style scoped lang="postcss">
@import "../../assets/css/mediaquery.css";

.loop-card-wrapper {
}


.video-container {
  position: relative;

  /* box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.1); */

  & > video {
    max-width: 100%;
    max-height: calc(100vh - 15rem);
    object-fit: contain;

    @media (--phone-screen) {
      width: 100%;
      /* height: 100%; */
      /* max-height: unset; */
    }

    @media (--tablet-screen) {
      width: 100%;
      max-height: calc(100vh - 5em);
    }

  }
}

.gif-container {
  display: flex;
  /* proportional hack */
  /* height: 0; */
  /* padding-bottom: 56.25%; */

  /* box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.1); */

  &.fixed-img-size {
    width: 360px;
    height: 203px;
  }
}

/* .fixed-image-size {
  width: 360px;
  height: 203px;
} */

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
