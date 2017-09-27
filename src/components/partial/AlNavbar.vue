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
    <ul class="al-menu" :class="{ 'is-active': burgerActive }">
      <li>
        <a class="al-navbar-link">
          <icon name="list-ul"></icon>
          <span>List</span>
        </a>
      </li>
      <li>
        <router-link active-class="is-active" :to="{ name: 'Random', params: {} }" class="al-navbar-item" href="#">
          <icon name="question-circle"></icon>
          <span>Random</span>
        </router-link>
      </li>
      <li>
        <a class="al-navbar-item " href="#">
          <icon name="bar-chart"></icon>
          <span>API & Status</span>
        </a>
      </li>
      <li>
        <a class="al-navbar-item " href="#">
          <icon name="info"></icon>
          <span>About</span>
        </a>
      </li>
      <li>
        <a class="al-navbar-item " href="#">
          <icon name="search"></icon>
          <span>Search</span>
        </a>
      </li>
    </ul>
    <li class="al-end">
      <a class="al-navbar-item " href="#">
        <icon name="language"></icon>
        <span>EN</span>
      </a>
    </li>
    <!-- <div class="navbar-menu navbar-end">
    <div class="navbar-item">
    <div class="field">
    <div class="control">
    <input class="input" type="text" placeholder="Search">
  </div>
</div>
</div>
<div class="navbar-item has-dropdown is-hoverable">
<a class="navbar-link">
Language
</a>
<div class="navbar-dropdown">
<a class="navbar-item" href="#">English</a>
<a class="navbar-item" href="#">Français</a>
<a class="navbar-item" href="#">日本語</a>
<a class="navbar-item" href="#">中文</a>
</div>
</div>
</div> -->
</nav>
</template>

<script>
export default {
  name: 'al-navbar',
  data() {
    return {
      burgerActive: false,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="postcss">
.al-navbar {
  z-index: 15; /*hack for bulma*/

  padding: .5em 2em;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  width: 100%;
  min-height: 3em;

  box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.1);

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
  align-content: space-around;

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
    padding: .5em 1em;
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

.al-menu {
  display: flex;
  justify-content: space-around;

  order: 1;

  & li {

  }

  @media (width > 640px) and (width <= 800px) {
    margin-top: 1em;
    flex: 0 1 100%;
    justify-content: space-between;
  }

  @media (width <= 640px) {
    display: none;
  }

  &.is-active {
    display: block;
    margin-top: 1em;
    flex: 0 1 100%;

    & li {
      padding: .5em 0em;

      &> a {
        width: 100%;
      }
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

a.navbar-item, .navbar-link {
  &.is-active {
    /*box-shadow: inset 0 -2px 0 0 rgba(0, 0, 0, .8);*/
  }

}

.fa-icon {
  /*max-width: 1em;*/
  min-width: 1.5em;
  width: auto;
  /*height: 1em;*/
  vertical-align: middle;
  /*text-align: center;*/

  padding-right: 0.5rem;

  /* You would have to include the following two lines to make this work in Safari */
  /*max-width: 100%;
  max-height: 100%;*/
}


</style>
