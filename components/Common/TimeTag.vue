<template>
  <div class="font-opensans">
    <div
      v-if="type === 'length'"
      class="TimeTag-container"
    >
      <span class="TimeTag-info TimeTag-leftHalf">
        <FontAwesomeIcon
          icon="stopwatch"
        />
      </span>
      <span class="TimeTag-info TimeTag-rightHalf">
        {{ duration }}s
      </span>
    </div>
    <div
      v-if="type === 'timestamp'"
      class="TimeTag-container TimeTag-fullLength"
    >
      <span class="TimeTag-info TimeTag-leftArrow">
        <FontAwesomeIcon
          icon="long-arrow-alt-left"
        />
      </span>
      <span class="TimeTag-info start-time">
        {{ start }}
      </span>
      <span class="TimeTag-info end-time">
        {{ end }}
      </span>
      <span class="TimeTag-info TimeTag-rightArrow">
        <FontAwesomeIcon
          icon="long-arrow-alt-right"
        />
      </span>
    </div>
  </div>
</template>

<script>
/**
 * Time Tag Component for Loop Pages.
 */
export default {
  name: 'TimeTag',
  props: {
    /**
     * Type of the Time Tag
     *
     * `length, timestamp`
     */
    type: {
      type: String,
      required: true,
      default: 'length',
      validator(val) {
        return val === 'length' || val === 'timestamp';
      },
    },
    /**
     * The starting time, when `type` is `timestamp`
     */
    start: {
      type: String,
      required: false,
      default: '0',
    },
    /**
     * The ending time, when `type` is `timestamp`
     */
    end: {
      type: String,
      required: false,
      default: '0',
    },
    /**
     * The duration, when `type` is `length`
     */
    duration: {
      type: String,
      required: false,
      default: '0',
    },
  },
};
</script>

<style scoped lang="postcss">
/** @define TimeTag */
.TimeTag-container {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}

.TimeTag-container {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}

.TimeTag-info {
  max-width: 8em;
  max-height: 1.5em;
  text-align: center;
  padding: .1em .75em;
  font-size: 1.1em;
}

.TimeTag-leftHalf {
  border-radius: 5px 0 0 5px;
  color: var(--grey5);
  background-color: var(--grey2);
}

.TimeTag-rightHalf {
  border-radius: 0 5px 5px 0;
  color: var(--grey6);
  background-color: var(--grey2);
}

.TimeTag-fullLength {
  border-radius: 5px;
  color: var(--grey5);
  background-color: var(--grey1);
}

.TimeTag-leftArrow {
  border-radius: 5px 0 0 5px;
  padding-right: 0em;
}

.TimeTag-rightArrow {
  border-radius: 0 5px 5px 0;
  padding-left: 0em;
}

</style>
