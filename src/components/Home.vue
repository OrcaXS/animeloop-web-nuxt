<template>
  <div class="grid-container">
    <template v-for="(item, index) in loops">
      <loop-card>
        <a class="grid-item loop-card" :key="item.key" @mouseover="item.hovered = true" @mouseout="item.hovered = false" :loop-id="item.key">
          <img class="inline-img" v-if="!item.hovered" :src="item.img" key="img">
          <div v-if="item.hovered" key="vid">
            <video loop muted autoplay width="100%" :src="item.video"></video>
          </div>
        </a>
      </loop-card>
    </template>
  </div>
</template>

<script>
import LoopCard from './partial/LoopCard';

export default {
  name: 'home',
  components: {
    LoopCard,
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js PWA',
      loops: [
        { key: '1', img: '../static/jpg_360p/1.jpg', video: '../static/mp4_360p/1.mp4', hovered: false },
        { key: '2', img: '../static/jpg_360p/2.jpg', video: '../static/mp4_360p/2.mp4', hovered: false },
        { key: '3', img: '../static/jpg_360p/3.jpg', video: '../static/mp4_360p/3.mp4', hovered: false },
        { key: '4', img: '../static/jpg_360p/4.jpg', video: '../static/mp4_360p/4.mp4', hovered: false },
        { key: '5', img: '../static/jpg_360p/5.jpg', video: '../static/mp4_360p/5.mp4', hovered: false },
        { key: '6', img: '../static/jpg_360p/6.jpg', video: '../static/mp4_360p/6.mp4', hovered: false },
        { key: '7', img: '../static/jpg_360p/7.jpg', video: '../static/mp4_360p/7.mp4', hovered: false },
        { key: '8', img: '../static/jpg_360p/8.jpg', video: '../static/mp4_360p/8.mp4', hovered: false },
        { key: '9', img: '../static/jpg_360p/9.jpg', video: '../static/mp4_360p/9.mp4', hovered: false },
        { key: '10', img: '../static/jpg_360p/10.jpg', video: '../static/mp4_360p/10.mp4', hovered: false },
        { key: '11', img: '../static/jpg_360p/11.jpg', video: '../static/mp4_360p/11.mp4', hovered: false },
        { key: '12', img: '../static/jpg_360p/12.jpg', video: '../static/mp4_360p/12.mp4', hovered: false },
      ],
    };
  },
  methods: {
  },
  mounted() {
    console.log('mounted');
    const el = document.querySelectorAll('.loop-card');
    el.forEach(e => e.addEventListener('click', this.hideVideo, false));
  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.fade-enter-active, .fade-leave-active {
  transition: opacity .1s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0.5
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(4, minmax(120px, 360px));
  grid-gap: 1em;
}

.box {
  padding: 5px;
}

.grid-item {
  background-size: cover;
  /*max-height: 203px;*/
  height: auto;
}

.inline-img {
  display: inherit;
}
/*.flex-item {
margin: 2px;
height: 203px;
width: 360px;
}*/


</style>
