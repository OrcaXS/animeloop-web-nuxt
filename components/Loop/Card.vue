<template>
  <section>
    <div
      v-if="loopType === 'mp4'"
      @mouseover="onHovered()"
      @mouseout="onUnhovered()"
    >
      <div
        v-if="!canplaythrough"
        class="LoopCard-spinner"
      >
        <FontAwesomeIcon
          class="LoopCard-faIcon"
          icon="circle-notch"
          spin
        />
      </div>
      <video
        ref="video"
        loop
        muted
        autoplay
        playsInline
        vcloak
        class="LoopCard-video"
        @canplaythrough.once="canplay"
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
      :class="{ 'LoopCard-fixedImageSize' : pageType === 'home' }"
      class="flex"
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

/**
 * Loop Card components for Loop/Series/Episode pages.
 * Basically a Wrapper for video/GIF player.
 */
export default {
  name: 'LoopCard',
  components: {
    GifPlayer,
    FontAwesomeIcon,
  },
  props: {
    /**
    * `loopid` of the LoopCard.
    */
    loopid: {
      type: String,
      required: true,
      validator(val) {
        return /^[a-z0-9]{24}$/.test(val);
      },
    },
    /**
    * Video Format of the LoopCard.
    *
    * `mp4, gif`
    */
    loopType: {
      type: String,
      required: true,
      default: 'mp4',
      validator(val) {
        return val === 'mp4' || val === 'gif';
      },
    },
    /**
    * The type of page using this component.
    *
    * `home, episode, loop`
    */
    pageType: {
      type: String,
      required: true,
      default: 'loop',
      validator(val) {
        return ['home', 'episode', 'loop'].indexOf(val) > -1;
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
    /**
     * When LoopCard is hovered, play the video.
     *
     * @event onHovered
     * @type {Function}
     */
    onHovered() {
      if (!this.hovered) {
        this.hovered = true;
        this.$refs.video.play();
      }
    },
    /**
     * When LoopCard is not hovered, pause the video.
     *
     * @event onUnhovered
     * @type {Function}
     */
    onUnhovered() {
      this.hovered = false;
      this.$refs.video.pause();
    },
    /**
     * When video.canplaythrough is fired, show the video.
     *
     * @event canplay
     * @type {Function}
     */
    canplay() {
      this.canplaythrough = true;
    },
  },
};
</script>

<style scoped lang="postcss">
/** @define LoopCard */

.LoopCard-video {
  max-width: 100%;
  max-height: calc(100vh - 15rem);
  object-fit: contain;

  @screen phone {
    width: 100%;
    /* height: 100%; */
    /* max-height: unset; */
  }

  @screen tablet {
    width: 100%;
    max-height: calc(100vh - 5em);
  }
}

.LoopCard-fixedImageSize {
  width: 360px;
  height: 203px;
}

.LoopCard-videoCover {
  width: 100%;
  transition: all 0.5s;
}

.LoopCard--blur {
  filter: blur(10px);
}

.LoopCard-faIcon {
  margin: 0em .5em;
}

.LoopCard-spinner {
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
