<template>
  <nav class="al-navbar">
    <div class="al-burger-icon">
      <a><icon name="navicon"></icon></a>
    </div>
    <li class="al-title">
      <a class="al-navbar-item" href="/">
        AnimeLoop
      </a>
    </li>
    <ul class="al-menu">
      <li>
        <a class="al-navbar-link">
          <icon name="list-ul"></icon> List
        </a>
      </li>
      <li>
        <router-link active-class="is-active" :to="{ name: 'Random', params: {} }" class="al-navbar-item" href="#">
          <icon name="question-circle"></icon> Random
        </router-link>
      </li>
      <li>
        <a class="al-navbar-item " href="#">
          <icon name="magic"></icon> API
        </a>
      </li>
      <li>
        <a class="al-navbar-item " href="#">
          <icon name="bar-chart"></icon> Status
        </a>
      </li>
      <li>
        <a class="al-navbar-item " href="#">
          <icon name="info"></icon> About
        </a>
      </li>
      <li>
        <a class="al-navbar-item " href="#">
          <icon name="search"></icon> Search
        </a>
      </li>
    </ul>
    <li class="al-end">
      <a class="al-navbar-item " href="#">
        <icon name="language"></icon> Language
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

  display: flex;
  flex-flow: row wrap;
  align-items: center;
  align-content: space-around;

  @media (width <= 1008px) {
    padding: .5em;
  }

  @media (width > 640px) and (width <= 800px)  {
    height: 6em;
    justify-content: space-around;
  }

  @media (width <= 640px) {

  }

  & li {
    list-style-type: none;
    order: 2;
  }

  & a {
    padding: .5em 1em;
    color: #000000;

    &:hover {
      background: #EEEEEE;
    }
  }
}

.al-burger-icon {
  order: -1;

  @media (width > 800px) {
    display: none;
  }
}

.al-menu {
  display: flex;
  justify-content: space-around;

  order: 1;

  & li {

  }

  @media (width > 640px) and (width <= 800px) {
    flex: 0 1 100%;
  }

  @media (width <= 640px) {
    display: none;
  }

  & .active {

  }
}

li.al-title {
  /*color: #000000;*/
  order: -1;
  text-align: center;

  @media (width <= 800px) {
    flex: 0 1 50%;
  }
}

li.al-end {
  order: 2;
  margin-left: auto;

  @media (width <= 800px) {
    order: 0;
    flex: 0 1 25%;
  }
}

a.navbar-item, .navbar-link {
  &.is-active {
    box-shadow: inset 0 -2px 0 0 rgba(0, 0, 0, .8);
  }

  .fa-icon {
    width: auto;
    height: 1em; /* or any other relative font sizes */

    /* You would have to include the following two lines to make this work in Safari */
    max-width: 100%;
    max-height: 100%;
  }


}

</style>
