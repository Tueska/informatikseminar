<template>
  <div class="profile">
    <h3>Change Password</h3>
    <div>
      <form @submit.prevent="changePassword">
        <div class="form-group">
          <label for="username">Password</label>
          <input type="password" class="form-control" id="username" v-model="password" placeholder="Enter password">
        </div><br /><br />
        <div class="form-group">
          <label for="password">Confirm</label>
          <input type="password" class="form-control" id="password" v-model="password2" placeholder="Confirm password">
        </div><br />
        <p>{{ error }}</p>
        <button type="submit" class="btn btn-primary">Submit</button> <br /><br />
        <a @click="getLogs">Logs</a>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data: () => {
    return {
      password: "",
      password2: "",
      error: ""
    };
  },
  methods: {
    changePassword() {
      if (this.password !== this.password2) {
        this.error = "Passwords do not match";
        return;
      }

      var config = {
        method: 'post',
        url: 'http://localhost:3000/api/changePassword',
        data: {
          password: this.password
        },
        withCredentials: true
      };
      axios(config)
        .then(() => {
          this.error = "Password changed";
        })
        .catch(error => {
          console.error(error);
          this.error = "Invalid login";
        });
    },
    getLogs() {
      axios.get('http://localhost:3000/api/logs', { withCredentials: true })
        .then(response => {
          let logs = response.data;
          // download to file
          var element = document.createElement('a');
          element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(logs));
          element.setAttribute('download', 'logs.txt');
          element.style.display = 'none';
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
}
</script>

<style scoped>
.profile {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.541);
  height: 400px;
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
