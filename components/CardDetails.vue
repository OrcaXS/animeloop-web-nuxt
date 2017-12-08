<template>
  <div class="card-detail-content">
    <span class="anime_title">{{ title }}</span>
    <span class="period">{{ period.begin.slice(0, -3) }} - {{ period.end.slice(0, -3) }}</span>
    <span class="episode-no">{{ episode_no }}</span>
    <span class="anime-type tag is-info">{{ anime_type }}</span>
  </div>
</template>

<script>
export default {
  name: 'CardDetails',
  props: {
    period: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    episode_no: {
      type: String,
      required: true,
    },
    anime_type: {
      type: String,
      required: true,
    },
  },
  // computed: {
  //   cleanPeriod(time) {
  //     return time.slice(0, -3);
  //   },
  // },
};
</script>

<style scoped>
.card-detail-content {
  position: absolute;
  bottom: 0;
  /*right: 0;*/
  /*left: 0;*/
  z-index: 10;
  width: 100%;
  height: auto;
  max-height: 50px;
  padding: 0 5px;

  font-size: 1rem;
  line-height: 0;

  & span {
    /*vertical-align: middle;*/
  }

  display: grid;
  grid-template-columns: 6fr auto;
  grid-template-rows: 2fr 1fr;
  grid-template-areas:
    "title episode-no"
    "period anime-type";
  align-items: center;


  @supports (backdrop-filter: blur()) {
    background-color: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(20px);
  }

  @supports not (backdrop-filter: blur()) {
    background-color: rgba(255, 255, 255, .95);
  }

}

.anime_title {
  grid-area: title;
}

.episode-no {
  grid-area: episode-no;
  text-align: center;
  font-weight: 400;
  font-size: 1.3rem;
  justify-self: center;
}

.period {
  grid-area: period;
  font-size: .75em;
  font-style: italic;
  color: #95989A;
}

.anime-type {
  grid-area: anime-type;
  max-width: 8em;
  max-height: 1.5em;
  /*margin: 2px 0;*/
  margin-bottom: 4px;
  justify-self: center;
}

</style>
