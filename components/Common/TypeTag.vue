<template>
  <div class="font-opensans">
    <div
      v-if="type === 'withSeason'"
      class="TypeTag-container"
    >
      <span
        :class="typeClassObj({ type: animeType })"
        class="TypeTag TypeTag-large TypeTag-leftHalf"
      >
        {{ animeType }}
      </span>
      <span
        :class="typeClassObj({ type: animeType })"
        class="TypeTag TypeTag-large TypeTag-rightHalf light"
      >
        {{ season }}
      </span>
    </div>
    <template v-else>
      <span
        :class="typeClassObj({ type: animeType })"
        class="TypeTag TypeTag-small"
      >
        {{ animeType }}
      </span>
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
@import "~/assets/css/colors.css";

.TypeTag {
  max-width: 8em;
  max-height: 1.5em;
  text-align: center;
  color: white;
  padding: .0em .5em;
  border-radius: 5px;
  letter-spacing: .25px;
  font-size: .9em;
}

.TypeTag-container {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}

.TypeTag-leftHalf {
  border-radius: 5px 0 0 5px;
}

.TypeTag-rightHalf {
  border-radius: 0 5px 5px 0;
}

.TypeTag-large {
  padding: .1em .5em;
  font-size: 1.125rem;
}

.TypeTag-small {
  font-size: .875rem;
}

.Series--tv {
  background-color: var(--tag-blue);
  &.light {
    background-color: var(--tag-blue-light);
  }
}

.Series--ova {
  background-color: var(--tag-purple);
  &.light {
    background-color: var(--tag-purple-light);
  }
}

.Series--ona {
  background-color: var(--tag-orange);
  &.light {
    background-color: var(--tag-orange-light);
  }
}

.Series--movie {
  background-color: var(--tag-green);
  &.light {
    background-color: var(--tag-green-light);
  }
}

.Series--tvShort {
  background-color: var(--tag-cyan);
  &.light {
    background-color: var(--tag-cyan-light);
  }
}

.Series--special {
  background-color: var(--tag-red);
  &.light {
    background-color: var(--tag-red-light);
  }
}

.Series--other {
  background-color: var(--black1);
  &.light {
    background-color: var(--grey6);
  }
}

</style>
