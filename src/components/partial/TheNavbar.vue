<template>
  <nav class="al-navbar">
    <li class="al-burger-icon" @click="burgerActive = !burgerActive">
      <a v-if="!burgerActive"><icon name="navicon"></icon></a>
      <a v-if="burgerActive"><icon name="close"></icon></a>
    </li>
    <li class="al-title">
      <a class="al-navbar-item" href="/">
        <!-- <icon name="navicon"></icon> -->
        <span>AnimeLoop</span>
      </a>
    </li>
    <ul class="al-burger-menu" :class="{ 'is-active': burgerActive }">
      <section class="al-navbar-has-dropdown" @click="dropdownActive = !dropdownActive" v-click-outside="onClickOutsideDropdown">
        <a class="al-navbar-list">
          <icon name="list-ul"></icon>
          <span>List</span>
          <icon class="al-list-arrow" name="angle-down"></icon>
          <span>&nbsp;</span>
          <!-- alignment hack -->
        </a>
        <section class="al-navbar-dropdown" :class="{ 'is-active': dropdownActive}">
          <li>
            <a class="al-navbar-item" href="#">
              <icon name="table"></icon>
              <span>Episode</span>
            </a>
          </li>
          <li>
            <a class="al-navbar-item" href="#">
              <icon name="th-large"></icon>
              <span>Series</span>
            </a>
          </li>
          <li>
            <a class="al-navbar-item" href="#">
              <icon name="tags"></icon>
              Tags
            </a>
          </li>
        </section>
      </section>
      <li>
        <router-link :to="{ name: 'Random', params: {} }" class="al-navbar-item" href="#">
          <icon name="question-circle"></icon>
          <span>Random</span>
        </router-link>
      </li>
      <li>
        <router-link class="al-navbar-item " :to="{ name: 'API_Status', params: {} }">
          <icon name="bar-chart"></icon>
          <span>API &amp; Status</span>
        </router-link>
      </li>
      <li>
        <router-link class="al-navbar-item " :to="{ name: 'About', params: {} }">
          <icon name="info"></icon>
          <span>About</span>
        </router-link>
      </li>
      <li>
        <router-link class="al-navbar-item " :to="{ name: 'Search', params: {} }">
          <icon name="search"></icon>
          <span>Search</span>
        </router-link>
      </li>
    </ul>
    <li class="al-end al-navbar-has-dropdown" @click="langActive = !langActive" v-click-outside="onClickOutsideLang">
      <a class="al-navbar-item">
        <icon name="language"></icon>
        <span>EN</span>
      </a>
      <section class="al-navbar-dropdown al-lang-menu" :class="{ 'is-active': langActive }">
        <li>
          <a class="al-navbar-item" href="#">
            <span>CN</span>
          </a>
        </li>
        <li>
          <a class="al-navbar-item" href="#">
            <span>JP</span>
          </a>
        </li>
        <li>
          <a class="al-navbar-item" href="#">
            <span>Others</span>
          </a>
        </li>
      </section>
    </li>
  </nav>
</template>

<script>
import vClickOutside from 'v-click-outside';

export default {
  name: 'TheNavbar',
  directives: {
    clickOutside: vClickOutside.directive,
  },
  data() {
    return {
      burgerActive: false,
      dropdownActive: false,
      langActive: false,
    };
  },
  methods: {
    onClickOutsideDropdown(event) {
      this.dropdownActive = false;
      // console.log(event);
    },
    onClickOutsideLang(event) {
      this.langActive = false;
      // console.log(event);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="postcss">
.al-navbar {
  z-index: 15; /*hack for bulma*/

  /*fixed navbar*/
  padding: .5em 2em;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  width: 100%;
  min-height: 3em;

  box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.1);

  /*background blur*/
  @supports (backdrop-filter: blur()) {
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(10px);
  }

  @supports not (backdrop-filter: blur()) {
    background-color: rgba(255, 255, 255, 1.0);
  }

  display: flex;
  flex-flow: row wrap;
  align-items: center;
  align-content: flex-start;
  justify-content: space-around;

  @media (width <= 1008px) {
    padding: .75em 0em;
  }

  @media (width > 640px) and (width <= 800px)  {
    height: 6em;
    /*hack*/
    align-items: stretch;
    justify-content: space-around;
  }

  @media (width <= 640px) {
    /*hack*/
    align-items: stretch;
    /*justify-content: center;*/
  }

  & li {
    list-style-type: none;
    /*padding-top: .5em;
    padding-bottom: .5em;*/
  }

  & a {
    padding: .5em .9em;
    color: #000000;
    vertical-align: middle;
    /*background: #EEEEEE;*/

    & span {
      vertical-align: middle;
    }

    &:hover {
      @media (hover:hover) {
        background: #EEEEEE;
      }
    }
  }
}

.al-navbar-dropdown {
  display: none;
  flex-direction: column;

  position: absolute;
  z-index: 20;
  transform: translateY(.5em);

  /*min-width: 8em;*/
  padding: .25em 0em;

  border: none;
  box-shadow: 0 6px 6px 0px rgba(0, 0, 0, 0.1);

  background-color: rgba(255, 255, 255, 1);

  &.is-active {
    display: inline-flex;

    & a {
      width: 100%;
    }
  }

  & a {
    display: inline-block;
    padding: .25em .5em;
    /*margin: 0em;*/
  }

  & li {
    padding: .5em 0em;
    flex: 0 0 auto;
  }

  &.al-lang-menu li {
    margin: 0em;
    text-align: center;
    min-width: 5em;
  }

  @media (width <= 640px) {
    display: inline;
    position: inherit;

     & li {
       margin-left: 2em;
     }

     &.is-active {
       display: inline;
     }

     &.al-lang-menu {
       display: none;

       &.is-active {
        display: flex;
        position: absolute;
       }
     }
  }

}

.al-burger-menu {
  display: flex;
  /*justify-content: space-around;*/
  /*align-items: flex-end;*/

  order: 1;

  & li {

    & > a {
      /*width: 100%;*/
    }

  }

  @media (width > 640px) and (width <= 800px) {
    /*flex-direction: column;*/
    margin-top: 1em;
    flex: 0 1 100%;
    justify-content: space-between;
  }

  @media (width <= 640px) {
    display: none;
  }

  &.is-active {
    display: flex;
    flex-direction: column;
    margin-top: 1em;
    flex: 0 1 100%;

    & li {
      padding: .5em 0em;
    }
  }
}

.al-burger-icon {
  height: 100%;
  order: -1;
  /*flex: 0 1 auto;*/
  /*align-self: center;*/
  /*margin-right: auto;*/

  @media (width > 640px) {
    display: none;
  }
}

li.al-title {
  /*color: #000000;*/
  order: -1;
  text-align: center;
  /*vertical-align: center;*/

  @media (width <= 800px) {
    /*flex: 0 1 auto;*/
    /*margin: auto;*/

    /*absolute position hack*/
    vertical-align: center;
    position: absolute;
    left: 50%;
    top: .75em;
    transform: translate(-50%, 0);
  }
}

li.al-end {
  order: 2;
  margin-left: auto;
  /*align-self: center;*/

  @media (width <= 800px) {
    order: 0;
    /*flex: 0 1 auto;*/
  }
}


.fa-icon {

  min-width: 1.5em;
  width: auto;

  vertical-align: middle;


  /* You would have to include the following two lines to make this work in Safari */
  max-width: 100%;
  max-height: 100%;
}

.al-list-arrow {
  display: inline;
  color: rgba(160, 160, 160, 1);
  padding: 0;
  /*margin-left: .5em;*/
}

</style>
