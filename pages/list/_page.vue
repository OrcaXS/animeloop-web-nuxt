<template>
  <div>
    <h1 class="list-page-heading">List ordered by season</h1>
    <SeriesGrid
      type="listPage"
      :page-num="selectedPageNum"
    />
    <div class="pagination">
      <nuxt-link
        v-if="!disablePrevPage"
        class="page-icon"
        :to="{
          name: 'list-page',
          params: { page: (currentPageNumInt === 2) ? null : currentPageNumInt - 1 }
        }"
      >
        <PageIcon
          :is-enabled="true"
          direction="left"
        />
      </nuxt-link>
      <PageIcon
        v-else
        :is-enabled="false"
        direction="left"
      />
      <div class="list-page-select">
        <select
          v-model="selectedPageNum"
          @change="selectChanged"
        >
          <option
            v-for="num in pageCount"
            :key="num.toString()"
            :value="num.toString()"
          >
            {{ num.toString() }}
          </option>
        </select>
      </div>
      <nuxt-link
        v-if="!disableNextPage"
        class="page-icon"
        :to="{ name: 'list-page', params: { page: currentPageNumInt + 1 }}"
      >
        <PageIcon
          :is-enabled="true"
          direction="right"
        />
      </nuxt-link>
      <PageIcon
        v-else
        :is-enabled="false"
        direction="right"
      />
    </div>
  </div>
</template>

<script>
import SeriesGrid from '~/components/Series/Grid';
import PageIcon from '~/components/Common/PageIcon';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';

export default {
  name: 'PageList',
  components: {
    SeriesGrid,
    FontAwesomeIcon,
    PageIcon,
  },

  head() {
    return {
      title: `${this.$t('list')} | Animeloop`,
    };
  },

  async fetch({ store, params, redirect }) {
    // const pageNum: route.params.page || '1',
    await store.dispatch('fetchSeriesPageCount');
    await store.dispatch('fetchSeriesByPageNum', { pageNum: params.page || '1' });
    if (params.page === '1') {
      redirect(301, '/list');
    }
  },

  asyncData({ params }) {
    return {
      selectedPageNum: params.page ? params.page.toString() : '1',
      currentPageNumInt: parseInt(params.page, 10) || 1,
    };
  },

  computed: {
    pageCount() {
      return this.$store.state.series.seriesPageCount;
    },
    disablePrevPage() {
      return this.currentPageNumInt === 1;
    },
    disableNextPage() {
      return this.currentPageNumInt === this.pageCount;
    },
  },

  methods: {
    selectChanged() {
      if (this.selectedPageNum === 1) {
        this.$router.push({ name: 'list-page' });
      } else {
        this.$router.push({ name: 'list-page', params: { page: this.selectedPageNum } });
      }
    },
  },

};
</script>

<style scoped lang="postcss">
@import "~/assets/css/mediaqueries.css";

.list-page-heading {
  @media (--phone-screen) {
    text-align: center;
  }
}

.list-page-grid {
  /* margin: 1em; */
  display: grid;
  grid-template-columns: auto;
}

.list-page-select {
  /* display: inline-block; */
  /* width: 100%; */
  position: relative;
  margin: 0 1em;
  flex: 0 0 4em;

  & > select {
    display: block;
    position: relative;
    appearance: none;

    /* border: 1px solid rgba(224, 224, 224, 0.5); */
    border: none;
    border-radius: 5px;
    box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.2);

    padding: .2em 1.25em .2em .5em;
    width: 4em;
    max-width: 100%;
    height: 2.25em;

    background-color: rgba(255, 255, 255, 0.6);
    color: #444444;

    font-size: 1em;
    text-align-last: center;

    cursor: pointer;
  }

  /* the angle-down arrow */
  &:after {
    border: 2px solid #888888;
    border-right: 0;
    border-top: 0;
    content: " ";
    display: block;
    height: .5em;
    pointer-events: none;
    position: absolute;
    transform: rotate(-45deg);
    transform-origin: center;
    width: .5em;
    margin-top: -.375em;
    right: .625em;
    top: 50%;
    z-index: 1;
  }
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;

  width: 90%;
  min-width: 320px;

  @media (--phone-screen) {
    width: 100%;
  }
}

.page-icon {
  background-color: #f0f0f0;
  padding: .5em 2em;
  border-radius: 5px;
  text-align: center;
  color: #888888;

  flex: 2 2 auto;
}

.page-icon-disabled {
  color: #dddddd;
}

/* .page-fa-icon {
color: #888888;
} */
</style>
