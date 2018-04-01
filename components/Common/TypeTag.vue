<template>
  <div class="tag">
    <div
      v-if="type === 'withSeason'"
      class="tag-container"
    >
      <span
        :class="typeClassObj({ type: animeType })"
        class="anime-series-tag large left-half"
      >{{ animeType }}</span>
      <span
        :class="typeClassObj({ type: animeType })"
        class="anime-series-tag large right-half light"
      >{{ season }}</span>
    </div>
    <template v-else>
      <span
        :class="typeClassObj({ type: animeType })"
        class="anime-series-tag"
      >{{ animeType }}</span>
    </template>
  </div>
</template>

<script>
/**
 * Series Type Component for Loop/Series/Episode Pages.
 */
export default {
  name: 'TypeTag',
  props: {
    /**
     * Type of the Anime Type Tag
     *
     * `simple, withSeason`
     */
    type: {
      type: String,
      required: true,
      default: 'simple',
      validator(value) {
        return value === 'simple' || value === 'withSeason';
      },
    },
    /**
     * Type of the Series
     */
    animeType: {
      type: String,
      required: true,
      default: 'Unknown',
    },
    /**
     * Season of the Series
     */
    season: {
      type: String,
      required: false,
      default: '2046-01',
    },
  },
  data() {
    return {
      typeClasses: {
        OVA: 'tag-ova',
        ONA: 'tag-ona',
        Movie: 'tag-movie',
        Special: 'tag-special',
        'TV Short': 'tag-tv-short',
        TV: 'tag-tv',
        Other: 'tag-other',
      },
    };
  },
  methods: {
    /**
     * Returns CSS class object used by Vue.
     *
     * @public
     * @param {Object} obj - Object for destruction.
     * @param {string} obj.type - Type of the Series.
     * @returns {Object} The object containing CSS class to be applied, differentiated by colors.
     */
    typeClassObj({ type }) {
      const typeClass = this.typeClasses[type] || 'Other';
      return {
        [typeClass]: true,
      };
    },
  },
};
</script>

<style scoped lang="postcss">
@import "~/assets/css/colors.css";

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
  letter-spacing: .25px;
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

.tag-tv {
  background-color: var(--tag-blue);
  &.light {
    background-color: var(--tag-blue-light);
  }
}

.tag-ova {
  background-color: var(--tag-purple);
  &.light {
    background-color: var(--tag-purple-light);
  }
}

.tag-ona {
  background-color: var(--tag-orange);
  &.light {
    background-color: var(--tag-orange-light);
  }
}

.tag-movie {
  background-color: var(--tag-green);
  &.light {
    background-color: var(--tag-green-light);
  }
}

.tag-tv-short {
  background-color: var(--tag-cyan);
  &.light {
    background-color: var(--tag-cyan-light);
  }
}

.tag-special {
  background-color: var(--tag-red);
  &.light {
    background-color: var(--tag-red-light);
  }
}

.tag-other {
  background-color: var(--black1);
  &.light {
    background-color: var(--grey6);
  }
}


</style>
