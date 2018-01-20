<template>
  <div
    class="nuxt-progress"
    :style="{
      'width': percent+'%',
      'height': height,
      'background-color': canSuccess? color : failedColor,
      'opacity': show ? 1 : 0
  }" />
</template>

<script>
/* eslint-disable no-underscore-dangle */
import Vue from 'vue';

export default {
  name: 'NuxtLoading',
  data() {
    return {
      percent: 0,
      show: false,
      canSuccess: true,
      duration: 5000,
      height: '2px',
      color: '#1E50A2',
      failedColor: '#C9171E',
    };
  },
  methods: {
    start() {
      this.show = true;
      this.canSuccess = true;
      if (this._timer) {
        clearInterval(this._timer);
        this.percent = 0;
      }
      this._cut = 10000 / Math.floor(this.duration);
      this._timer = setInterval(() => {
        this.increase(this._cut * Math.random());
        if (this.percent > 95) {
          this.finish();
        }
      }, 100);
      return this;
    },
    set(num) {
      this.show = true;
      this.canSuccess = true;
      this.percent = Math.floor(num);
      return this;
    },
    get() {
      return Math.floor(this.percent);
    },
    increase(num) {
      this.percent = this.percent + Math.floor(num);
      return this;
    },
    decrease(num) {
      this.percent = this.percent - Math.floor(num);
      return this;
    },
    finish() {
      this.percent = 100;
      this.hide();
      return this;
    },
    pause() {
      clearInterval(this._timer);
      return this;
    },
    hide() {
      clearInterval(this._timer);
      this._timer = null;
      setTimeout(() => {
        this.show = false;
        Vue.nextTick(() => {
          setTimeout(() => {
            this.percent = 0;
          }, 200);
        });
      }, 500);
      return this;
    },
    fail() {
      this.canSuccess = false;
      return this;
    },
  },
};
</script>

<style lang="postcss">
@import "../assets/css/mediaquery.css";

.nuxt-progress {
  position: fixed;
  top: 3em;
  left: 0px;
  right: 0px;
  height: 2px;
  width: 0%;
  transition: width 0.2s, opacity 0.4s;
  opacity: 1;
  background-color: #efc14e;
  z-index: 999999;

  @media (--tablet-screen) {
    top: 6em;
  }

}
</style>
