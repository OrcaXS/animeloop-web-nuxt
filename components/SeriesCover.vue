<template>
  <section class="cover-wrapper">
    <nuxt-link :to="{ name: 'series-id', params: { id: seriesid }}" class="cover" :style="coverBackgroundImageStyle">
      <div class="cover-text">
        <div class="cover-title">{{series.title_japanese}}</div>
        <div class="cover-detail">
          <span class="cover-type">{{series.type}}</span>
          <span class="cover-type">{{series.season}}</span>
        </div>
      </div>
    </nuxt-link>
  </section>
</template>

<script>
export default {
  name: 'SeriesCover',
  props: ['seriesid'],

  computed: {
    series() {
      return this.$store.state.series.series[this.seriesid];
    },
    coverBackgroundImageStyle() {
      return {
        'background-image': `url(${this.series.image_url_large})`,
      };
    },
  },
};
</script>

<style scoped>
.cover-wrapper {
  width: 225px;
  height: 350px;
}

.cover {
  display: flex;
  align-items: flex-end;
  justify-content: center;

  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: 50% 50%;
  border-radius: 2px;
}

.cover-title {
  font-size: 1em;
  color: white;
  padding: 1em 0;
}

.cover-text {
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6) 40%, rgba(0, 0, 0, 0));
  z-index: 2;
  height: auto;
  width: 100%;
  padding: 4em 1em 1em;
  text-align: left;
}

.cover-detail {
  display: flex;
  text-align: center;
  font-size: 1em;
  color: lightblue;
}

.cover-type {
  width: 50%;
}

</style>
