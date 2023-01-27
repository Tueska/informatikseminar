<template>
  <nav>
    <router-link to="/" v-if="$store.state.auth">Home</router-link> |
    <router-link to="/settings" v-if="$store.state.auth">Settings</router-link> |
    <router-link to="/management" v-if="$store.state.isAdmin">Management</router-link><span v-if="$store.state.isAdmin">
      | </span>
    <a @click="logout" v-if="$store.state.auth">Logout</a>
  </nav>
  <router-view />
</template>

<script>
export default {
  name: 'App',
  methods: {
    async logout() {

      await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include'
      })

      // Clear local storage
      localStorage.clear();

      this.$store.state.auth = false;
      this.$store.state.isAdmin = false;
      this.$router.push('/login');
    }
  },
  beforeMount() {
    this.$store.state.auth = localStorage.getItem('auth') === 'true';
    this.$store.state.isAdmin = localStorage.getItem('is_admin') === 'true';
  }
}
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
  color: #e1e1e1;
}

nav a:hover {
  cursor: pointer;
  color: #f2f2f2;
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

