<template>
  <div>
    <h1 class="list-page-heading">List Anime by Filter</h1>
    <div class="list-page-filter">
      <div class="list-page-select year-selector">
        <select
          v-model="selectedYear"
        >
          <option
            v-for="(mon, year) in seasons"
            :key="year"
            :value="year"
          >
            {{ year }}
          </option>
        </select>
      </div>
      <div class="list-page-select month-selector">
        <select
          v-model="selectedMonth"
        >
          <option
            v-for="mon in seasons[selectedYear].map(Number).sort((prev, next) => prev - next)"
            :key="mon.toString()"
            :value="mon.toString()"
          >
            {{ mon }}
          </option>
        </select>
      </div>
      <div class="list-page-select type-selector">
        <select
          v-model="selectedType"
        >
          <option
            selected
            value=""
          >(All)</option>
          <option
            v-for="type in seriesTypes"
            :key="type"
            :value="type"
          >
            {{ type }}
          </option>
        </select>
      </div>
      <button
        class="filter-button"
        @click="applyFilter"
      >
        <FontAwesomeIcon
          icon="filter"
        />
      </button>
    </div>
    <SeriesGrid
      type="listPage"
    />
    <!-- <div class="pagination">
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
    </div> -->
  </div>
</template>

<script>
import SeriesGrid from '~/components/Series/Grid';
import PageIcon from '~/components/Common/PageIcon';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';

export default {
  name: 'ListPage',
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

  data() {
    const latestYear = Object.keys(this.$store.state.series.seasons)[Object.keys(this.$store.state.series.seasons).length - 1];
    const latestMonth = Math.max(this.$store.state.series.seasons[latestYear].map(Number));
    const { type = '', season = `${latestYear}-${latestMonth}`, page = '1' } = this.$route.query;
    return {
      selectedType: type,
      selectedYear: season.split('-')[0],
      selectedMonth: season.split('-')[1],
      seriesTypes: ['TV', 'Movie', 'TV Short', 'OVA', 'ONA', 'Special'],
    };
  },

  async fetch({ store, query, redirect }) {
    if (Object.keys(store.state.series.seasons).length === 0) {
      await store.dispatch('fetchAllSeasons');
    }

    const latestYear = Object.keys(store.state.series.seasons)[Object.keys(store.state.series.seasons).length - 1];
    const latestMonth = Math.max(store.state.series.seasons[latestYear].map(Number));
    // await store.dispatch('fetchAllSeasons');
    const { type, season = `${latestYear}-${latestMonth}`, page = '1' } = query;
    // await store.dispatch('fetchSeriesPageCount');
    await store.dispatch('fetchSeriesGroup', ({
      type,
      season,
      // page,
      // limit: 30,
    }));


  // await store.dispatch('fetchSeriesByPageNum', { pageNum: params.page || '1' });
    // if (params.page === '1') {
    //   redirect(301, '/list');
    // }
  },

  computed: {
    // pageCount() {
    //   return this.$store.state.series.seriesPageCount;
    // },
    // disablePrevPage() {
    //   return this.currentPageNumInt === 1;
    // },
    // disableNextPage() {
    //   return this.currentPageNumInt === this.pageCount;
    // },
    seasons() {
      return this.$store.state.series.seasons;
    },

    selectedSeason() {
      return `${this.selectedYear}-${this.selectedMonth}`;
    },

    latestSeason() {
      const latestYear = Object.keys(this.$store.state.series.seasons)[Object.keys(this.$store.state.series.seasons).length - 1];
      const latestMonth = Math.max(this.$store.state.series.seasons[latestYear].map(Number));
      return `${latestYear}-${latestMonth}`;
      // return Object.keys(state.seasons).length;
    },
    // getSeasonYears: (state) => {
    //   // const fieldIndex = (field === 'year') ? 0 : 1;
    //   const arr = state.seasons.map(val => val.split('-')[0]);
    //   return [...new Set(arr)].sort();
    // },
    // getSeasonYears: state => state.seasons.map((val) => val.split('-')[0]),
  },

  watch: {
    $route: 'fetchNewGroup',
  },

  methods: {
    // selectChanged() {
    //   if (this.selectedPageNum === 1) {
    //     this.$router.push({ name: 'list-page' });
    //   } else {
    //     this.$router.push({ name: 'list-page', params: { page: this.selectedPageNum } });
    //   }
    // },
    async fetchNewGroup() {
      await this.$store.dispatch('fetchSeriesGroup', ({
        type: this.selectedType,
        season: this.selectedSeason,
        // this.page
        // limit: 30,
      }));
    },
    applyFilter() {
      const queryObj = { season: this.selectedSeason };
      Object.assign(queryObj, this.selectedType && { type: this.selectedType });
      this.$router.push({
        name: 'list',
        query: queryObj,
      });
    },
  },


};
</script>

<style scoped lang="postcss">
@import '~/assets/css/colors.css';
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

.list-page-filter {
  display: flex;
  justify-content: flex-start;
  align-items: center;

  margin-top: 1em;
  margin-left: auto;
  margin-right: auto;

  /* width: 90%; */
  /* min-width: 320px; */

  @media (--phone-screen) {
    width: 100%;
    justify-content: center;
  }

}

.list-page-select {
  /* display: inline-block; */
  /* width: 100%; */
  position: relative;
  margin: 0 .5em;
  flex: 0 0 4em;

  &:nth-child(1) {
    margin-left: 0;
  }

  &.year-selector {
    & > select {
      padding-left: 1em;
      padding-right: 2em;
    }
  }

  & > select {
    display: block;
    position: relative;
    appearance: none;

    /* border: 1px solid rgba(224, 224, 224, 0.5); */
    border: none;
    border-radius: 5px;
    box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.2);

    /* padding: .2em 1.25em .2em .5em; */
    padding-right: .5em;
    min-width: 4em;
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

.filter-button {
  border: 1px solid var(--key-color-light);
  border-radius: 5px;
  outline: none;
  padding: 0 1rem;
  height: 2.25rem;

  font-size: 1.1em;

  color: white;
  background-color: var(--key-color);
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
