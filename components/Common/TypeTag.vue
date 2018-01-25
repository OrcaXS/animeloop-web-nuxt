<template>
  <div class="tag">
    <div
      v-if="type === 'withSeason'"
      class="tag-container"
    >
      <span
        class="anime-series-tag large left-half"
        :style="typeStyleObj(animeType)"
      >{{ animeType }}</span>
      <span
        class="anime-series-tag large right-half"
        :style="typeStyleObj(animeType, 'season')"
      >{{ season }}</span>
    </div>
    <template v-else>
      <span
        class="anime-series-tag"
        :style="typeStyleObj(animeType)"
      >{{ animeType }}</span>
    </template>
  </div>
</template>

<script>
export default {
  name: 'TypeTag',
  props: {
    type: {
      type: String,
      required: true,
      default: 'simple',
      validator(value) {
        return value === 'simple' || value === 'withSeason';
      },
    },
    animeType: {
      type: String,
      required: true,
      default: 'Unknown',
    },
    season: {
      type: String,
      required: false,
      default: '2046-01',
    },
  },
  data() {
    return {
      colors: {
        'TV Short': '#2a83a2',
        OVA: '#745399',
        ONA: '#47885e',
        Movie: '#ee7800',
        Special: '#b7282e',
        TV: '#1E50A2',
        Unknown: '#525252',
        default: '#525252',
      },

    };
  },
  methods: {
    hex2Rgba(hex, alpha) {
      const r = parseInt(hex.substring(1, 3), 16);
      const g = parseInt(hex.substring(3, 5), 16);
      const b = parseInt(hex.substring(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    },
    typeStyleObj(type, season = false) {
      if (season === 'season') {
        return {
          backgroundColor: this.hex2Rgba(this.colors[type], 0.8),
        };
      }
      return {
        backgroundColor: this.colors[type],
      };
    },
  },
};
</script>

<style scoped lang="postcss">
.tag-container {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}

.anime-series-tag {
  max-width: 8em;
  max-height: 1.5em;
  text-align: center;
  color: white;
  padding: .0em .5em;
  border-radius: 5px;
  /* font-family: 'Roboto', sans-serif; */
  font-size: .9em;
}

.left-half {
  border-radius: 5px 0 0 5px;
}

.right-half {
  border-radius: 0 5px 5px 0;
}

.large {
  font-size: 1.1em;
  padding: .1em .5em;
}


</style>
