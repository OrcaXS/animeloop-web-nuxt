<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link active-class="is-active" :to="{ name: 'Home', params: {} }" class="navbar-item" href="#">
        <p>AnimeLoop</p>
      </router-link>
      <div class="navbar-burger">
        <span>1</span>
        <span>2</span>
        <span>3</span>
      </div>
    </div>
    <div class="navbar-start">
      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">
          List
        </a>
        <div class="navbar-dropdown">
          <a class="navbar-item " href="#">
            Series
          </a>
          <a class="navbar-item " href="#">
            Episodes
          </a>
          <a class="navbar-item " href="#">
            Tags
          </a>
        </div>
      </div>
    </div>
    <router-link active-class="is-active" :to="{ name: 'Random', params: {} }" class="navbar-item" href="#">
      Random
    </router-link>
    <a class="navbar-item " href="#">
      API
    </a>
    <a class="navbar-item " href="#">
      Status
    </a>
    <a class="navbar-item " href="#">
      About
    </a>
    <div class="navbar-menu navbar-end">
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
    </div>
  </nav>
</template>

<script>
export default {
  name: 'OldNavbar',
  data() {
    return {
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar {
  z-index: 15; /*hack for bulma*/

  padding-left: 2em;
  padding-right: 2em;
  /*height: 3.25em;*/
  /*width: 100%;*/
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}

@media (width <= 1000px) {
  .navbar {
    padding: 0em;
  }
}

/*a.navbar-item:hover, a.navbar-item.is-active, .navbar-link:hover, .navbar-link.is-active {
  box-shadow: inset 0 -2px 0 0 rgba(0, 0, 0, .8);
}
*/
a.navbar-item, .navbar-link {
  &.is-active {
    box-shadow: inset 0 -2px 0 0 rgba(0, 0, 0, .8);
  }

}

</style>
