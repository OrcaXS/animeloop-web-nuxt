<template>
  <div class="font-opensans">
    <div
      v-if="type === 'withSeason'"
      class="tag-container"
    >
      <span
        :class="typeClassObj({ type: animeType })"
        class="TypeTag TypeTag-large TypeTag-leftHalf text-lg "
      >{{ animeType }}</span>
      <span
        :class="typeClassObj({ type: animeType })"
        class="TypeTag TypeTag-large TypeTag-rightHalf text-lg light"
      >{{ season }}</span>
    </div>
    <template v-else>
      <span
        :class="typeClassObj({ type: animeType })"
        class="TypeTag text-sm"
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
        OVA: 'Series--ova',
        ONA: 'Series--ona',
        Movie: 'Series--movie',
        Special: 'Series--special',
        'TV Short': 'Series--tvShort',
        TV: 'Series--tv',
        Other: 'Series--other',
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
/** @define TypeTag */

.TypeTag {
  max-width: 8em;
  max-height: 1.5em;
  text-align: center;
  color: white;
  padding: .0em .5em;
  border-radius: 5px;
  /* font-family: 'Roboto', sans-serif; */
  letter-spacing: .25px;
}

.TypeTag-leftHalf {
  border-radius: 5px 0 0 5px;
}

.TypeTag-rightHalf {
  border-radius: 0 5px 5px 0;
}

.TypeTag-large {
  padding: .1em .5em;
}

</style>
