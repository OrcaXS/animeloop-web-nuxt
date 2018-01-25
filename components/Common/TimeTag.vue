<template>
  <div class="tag">
    <div
      v-if="type === 'length'"
      class="tag-container"
    >
      <span class="time-info-tag left-half">
        <FontAwesomeIcon
          class="time-fa-icon"
          icon="stopwatch"
        />
      </span>
      <span class="time-info-tag right-half">{{ duration }}s</span>
    </div>
    <div
      v-if="type === 'timestamp'"
      class="tag-container full-length">
      <span class="time-info-tag left-arrow">
        <FontAwesomeIcon
          class="time-fa-icon"
          icon="long-arrow-alt-left"
        />
      </span>
      <span class="time-info-tag start-time">{{ start }}</span>
      <span class="time-info-tag end-time">{{ end }}</span>
      <span class="time-info-tag right-arrow">
        <FontAwesomeIcon
          class="time-fa-icon"
          icon="long-arrow-alt-right"
        />
      </span>
    </div>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';

export default {
  name: 'TypeTag',
  components: {
    FontAwesomeIcon,
  },
  props: {
    type: {
      type: String,
      required: true,
    },
    start: {
      type: String,
      required: false,
      default: '0',
    },
    end: {
      type: String,
      required: false,
      default: '0',
    },
    duration: {
      type: String,
      required: false,
      default: '0',
    },
  },
  data() {
    return {
      colors: {
        lightGrey: '#969696',
        darkGrey: '#6A6A6A',
        lightBlack: '#333',
        ONA: '#47885e',
        Movie: '#ee7800',
        Special: '#b7282e',
        TV: '#1E50A2',
        default: '#1E50A2',
      },

    };
  },
};
</script>

<style scoped lang="postcss">
:root {
  --grey1: #E6E6E6;
  --grey2: #D6D6D6;
  --grey3: #969798;
  --grey4: #818181;
  --grey5: #6A6A6A;
  --grey6: #525252;
  --black1: #333;
}

.tag-container {
  display: flex;
  flex-flow: row nowrap;
}

.time-info-tag {
  /* width: 100%; */
  max-width: 8em;
  max-height: 1.5em;
  text-align: center;
  padding: .1em .75em;
  /* border-radius: 5px; */
  font-size: 1.1em;
}

.left-half {
  border-radius: 5px 0 0 5px;
  color: var(--grey5);
  background-color: var(--grey2);
}

.right-half {
  border-radius: 0 5px 5px 0;
  color: var(--grey6);
  background-color: var(--grey2);
}

.full-length {

  /* border-radius: 5px; */
  color: var(--grey5);
  /* background-color: var(--grey1); */

  & > span {
    background-color: var(--grey1);
  }
}

.left-arrow {
  border-radius: 5px 0 0 5px;
  padding-right: 0em;
}

.right-arrow {
  border-radius: 0 5px 5px 0;
  padding-left: 0em;
}

.time-fa-icon {
  align-self: center;
}

</style>
