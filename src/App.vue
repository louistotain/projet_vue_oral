<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/authors" class="ms-2">Authors</router-link>
    <router-view/>
  </div>
</template>

<style lang="scss">

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.btn-sort{
  background-color: antiquewhite;
  height: 75px;
  width: 100px;
  outline: none !important;
  box-shadow: none !important;
}

.btn-sort.active{
  background-color: #ffcf8f;
}

html {
  scroll-behavior: auto !important;
}

</style>

<style scoped>

#nav {
  padding: 30px;
  max-height: 100vh;
  height: 100vh;
}

</style>
