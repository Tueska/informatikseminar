<template>
  <!-- <nav>
    <router-link to="/">Home</router-link>
  </nav> -->
  <router-view />
</template>

<script>
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}

body {
  background-color: rgb(42, 42, 42);
  margin: 0;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.background-image {
  position: fixed;
  left: 0;
  right: 0;
  z-index: 1;
  display: block;
  /* background-image: url('./assets/kaggeholms.jpg'); */
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  height: 100%;
  -webkit-filter: brightness(50%) blur(7px);
  -moz-filter: brightness(50%) blur(7px);
  -o-filter: brightness(50%) blur(7px);
  -ms-filter: brightness(50%) blur(7px);
  filter: brightness(50%) blur(7px);
}

.content {
  position: absolute;
  left: 0;
  right: 0;
  z-index: 9999;
  margin-left: 20px;
  margin-right: 20px;
}
</style>

