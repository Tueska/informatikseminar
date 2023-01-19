<template>
  <div class="login">
    <!-- <h1>LOGIN</h1> -->
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" class="form-control" id="username" v-model="username" placeholder="Enter username">
      </div><br /><br /><br />
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password" v-model="password" placeholder="Password">
      </div><br /><br />
      <p>{{ error }}</p>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { Buffer } from 'buffer';

export default {
  data: () => {
    return {
      username: "",
      password: "",
      error: ""
    };
  },
  methods: {
    login() {
      var config = {
        method: 'post',
        url: 'http://localhost:3000/api/login',
        headers: {
          'Authorization': 'Basic ' + Buffer.from(this.username + ':' + this.password).toString('base64'),
          'Content-Type': 'application/json'

        },
        withCredentials: true
      };
      axios(config)
        .then(response => {
          localStorage.setItem('is_admin', response.data.is_admin);
          localStorage.setItem('auth', true);
          localStorage.setItem('timestamp', new Date());

          this.$store.state.auth = true;
          this.$store.state.isAdmin = response.data.is_admin;

          this.$router.push('/');
        })
        .catch(error => {
          console.error(error);
          this.error = "Invalid login";
        });
    }
  }
}
</script>

<style scoped>
.login {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.541);
  height: 320px;
  width: 300px;
  border-radius: 1em;
  padding-top: 1em;
  padding-bottom: 1em;
}

input {
  background-color: transparent;
  color: white;
  border: none;
  user-select: none;
}

input:focus {
  border-bottom: 1px solid white;
  outline: none;
}

form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

label {
  position: absolute;
  text-align: left;
  margin-top: -1.5em;
}

button {
  width: 100%;
  background-color: green;
  color: white;
  border-color: transparent;
  height: 2em;
  border-radius: 1em;
}
</style>
