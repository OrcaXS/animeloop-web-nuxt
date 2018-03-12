<template>
  <section class="cover-wrapper">
    <nuxt-link
      :to="{ name: 'series-id', params: { id: seriesid }}"
      :style="coverBackgroundImageStyle"
      class="cover"
    >
      <div class="cover-text">
        <div class="cover-title">{{ i18nTitle }}</div>
        <div class="cover-detail">
          <span class="cover-type">{{ series.type }}</span>
          <span class="cover-type">{{ series.season }}</span>
        </div>
      </div>
    </nuxt-link>
  </section>
</template>

<script>
export default {
  name: 'SeriesCover',
  props: {
    seriesid: {
      type: String,
      required: true,
      validator(value) {
        return /^[a-z0-9]{24}$/.test(value);
      },
    },
  },


  computed: {
    i18nTitle() {
      switch (this.currentLocale) {
        case 'ja':
          return this.series.title_japanese;
        case 'zh':
          return this.series.title;
        case 'en':
          return this.series.title_english;
        default:
          return this.series.title_english;
      }
    },

    currentLocale() {
      return this.$store.state.i18n.locale;
    },

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
  width: calc(225px * 0.8);
  height: calc(350px * 0.8);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.15);
  border-radius: 3px;
  margin: auto;
}

.cover {
  display: flex;
  align-items: flex-end;
  justify-content: center;

  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: 50% 50%;
  border-radius: 3px;
}

.cover-title {
  font-size: 1em;
  font-weight: 500;
  color: white;
  padding: 1em 0;
  text-align: center;
}

.cover-text {
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6) 40%, rgba(0, 0, 0, 0));
  border-radius: 0 0 3px 3px;
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
  font-weight: 500;
  color: lightblue;
}

.cover-type {
  width: 50%;
}

</style>
