<template>
  <div>
    <div v-if="season">
      <span class="anime-series-tag left-half" :style="typeStyleObj(type)">{{ type }}</span>
      <span class="anime-series-tag right-half" :style="typeStyleObj(type, 'season')">{{ season }}</span>
    </div>
    <template v-else>
      <span class="anime-series-tag" :style="typeStyleObj(type)">{{ type }}</span>
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
    },
    season: {
      type: String,
      required: false,
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
        default: '#1E50A2',
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
  computed: {

  },
};
</script>

<style scoped lang="postcss">
.anime-series-tag {
  max-width: 8em;
  max-height: 1.5em;
  text-align: center;
  /* line-height: 1.5em; */
  color: white;
  padding: .0em .5em;
  border-radius: 5px;
  font-size: .9em;
}

.left-half {
  border-radius: 5px 0 0 5px;
}

.right-half {
  border-radius: 0 5px 5px 0;
}

.large {
  font-size: 1em;
}


</style>
