<template>
  <section id="test">
    <section v-if="!isImgLoaded">
      <icon name="circle-o-notch" spin></icon>
      <span>Loading cover...</span>
    </section>
    <span v-if="!canPressure">
      Pressure.js unsupported. Using Polyfill instead.
    </span>
    <span>Pressure level: {{ pressureLevel }}</span>
    <img
      class="video-cover"
      width="100%"
      :src="imgUri['360p']"
      :srcset="imgSrcSet"
      @load="imgLoaded()"
    >
    <section class="pressure-modal" id="pressure-modal" v-if="showModal">
      <div class="pressure-modal-overlay"></div>
      <div class="pressure-modal-content">
        <section v-if="!showVid">
          <icon name="circle-o-notch" spin></icon>
          <span>Loading video...</span>
        </section>
        <section
          v-cloak
          class="video-container"
        >
          <video loop muted autoplay playsinline
            width="100%"
            :src="videoUri['360p']"
            @canplaythrough.once="canplay()"
          ></video>
        </section>
      </div>
    </section>
  </section>
</template>
<script>
import Pressure from 'pressure';

export default {
  name: 'LoopCardP',
  props: {
    imgUri: {
      type: Object,
      required: true,
    },
    videoUri: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      hovered: false,
      canplaythrough: false,
      showVid: false,
      isImgLoaded: false,
      showModal: false,
      canPressure: true,
      pressureLevel: 0,
    };
  },
  computed: {
    imgSrcSet() {
      return `"${this.imgUri['360p']},
      ${this.imgUri['720p']} 2x, ${this.imgUri['1080p']} 3x`;
    },
  },
  methods: {
    imgLoaded() {
      console.log('imgLoaded');
      this.isImgLoaded = true;
    },
    canplay() {
      // console.log('canplaythrough');
      this.canplaythrough = true;
      this.showVid = true;
    },
    vidLoaded() {
      if (this.showVid) {
        this.showVid = false;
        setTimeout(() => {
          console.log('setting timeout');
          this.showVid = true;
        }, 0);
      }
      // return this.vidLoaded;
    },
    setPressure() {
      const comp = this;
      Pressure.set('#test', {
        change(force, event) {
          comp.pressureLevel = force;
          // console.log(event);
          if (force > 0.5) {
            comp.showModal = true;
          } else {
            comp.showModal = false;
          }
        },
        unsupported() {
          console.log('Oh no, this device does not support pressure.');
          comp.canPressure = false;
        },
      }, { polyfill: true });
    },
    // test() {
    //   console.log(this.$el);
    // },
  },
  mounted() {
    this.setPressure();
  },
};
</script>

<style scoped>
[v-cloak] {
  display: none;
}

.video-container {
  /*width: 50vw;*/
  object-fit: cover;
  width: 100%;
}

.video-cover {
  /*display: inline-block;*/
  /*background-size: cover;*/
  width: 100%;
  transition: all 0.5s;
}

/*.blur {
  filter: blur(10px);
}*/

.pressure-modal-content {
  z-index: 25;

  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  /*height: 720px;*/
  width: 1280px;
  max-width: 100%;
  max-height: 100%;
}

.pressure-modal-overlay {
  z-index: 20;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  /*background: rgba(0, 0, 0, 0.2);*/
  /*filter: blur(10px);*/
  backdrop-filter: blur(10px);
}
</style>
