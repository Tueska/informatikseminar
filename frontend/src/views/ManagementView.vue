<template>
  <div class="profile">
    <h3>MANAGEMENT</h3>
    <div class="grid-container">
      <div class="grid-item-left">
        <table>
          <tr>
            <th>Username</th>
            <th>Admin</th>
          </tr>
          <tr v-for="user in users" :key="user._id">
            <td>{{ user.user }}</td>
            <td><input type="checkbox" v-model="user.is_admin" @change="updateUser(user._id, user.is_admin)"> </td>
            <td><button class="delete" @click="deleteUser(user._id)">Delete</button></td>
          </tr>
        </table>
      </div>
      <div class="grid-item-right">
        <table>
          <tr>
            <th>
              <label for="username">Username</label>
            </th>
            <th>
              <input type="text" id="username" v-model="newUser"><br />
            </th>
          </tr>
          <tr>
            <th>
              <label for="password">Password</label>
            </th>
            <th>
              <input type="password" id="password" v-model="newPass"><br />
            </th>
          </tr>
          <!-- <tr>
            <th>
              <label for="admin">Admin</label>
            </th>
            <th>
              <input type="checkbox" id="admin" v-model="newAdmin"><br />
            </th>
          </tr> -->
          <tr>
            <td colspan="2">
              <button class="add" @click="addUser">Add User</button>
            </td>
          </tr>
        </table>
        <form @submit.prevent="addUser">
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data: () => {
    return {
      users: [],
      newUser: '',
      newPass: '',
      newAdmin: false
    };
  },
  methods: {
    deleteUser(userID) {
      axios.delete('/api/user/' + userID, { withCredentials: true })
        .then(() => {
          this.users = this.users.filter(user => user._id !== userID);
        })
        .catch(error => {
          console.error(error);
        });
    },
    addUser() {
      axios.post('/api/user', {
        user: this.newUser,
        password: this.newPass,
        is_admin: this.newAdmin
      }, { withCredentials: true })
        .then(() => {
          this.newUser = '';
          this.newPass = '';
          this.newAdmin = false;
          axios.get('/api/user', { withCredentials: true })
            .then(response => {
              this.users = response.data;
            })
            .catch(error => {
              console.error(error);
              this.error = "Error while fetching user";
            });
        })
        .catch(error => {
          console.error(error);
        });
    },
    updateUser(userID, isAdmin) {
      axios.post(`/api/setAdmin/${userID}/${isAdmin}`, {}, { withCredentials: true })
        .then(() => {

        })
        .catch(error => {
          console.error(error);
        });
    },
  },
  getUsers() {
    axios.get('/api/user', { withCredentials: true })
      .then(response => {
        this.users = response.data;
      })
      .catch(error => {
        console.error(error);
        this.error = "Error while fetching user";
      });
  },
  beforeMount() {
    if (!localStorage.getItem('auth')) {
      this.$router.push('/login');
      return;
    }
    axios.get('/api/user', { withCredentials: true })
      .then(response => {
        this.users = response.data;
      })
      .catch(error => {
        console.error(error);
        this.error = "Error while fetching user";
      });
  },

}
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas: "left right";
}

.grid-item-left {
  /* align center */
  display: flex;
  justify-content: center;
  align-items: center;
  grid-area: left;
}

.grid-item-right {
  /* align center */
  display: flex;
  justify-content: center;
  grid-area: right;
}


button {
  /* width: 100%; */
  color: white;
  border-color: transparent;
  height: 2em;
  border-radius: 1em;
}

.add {
  background-color: green;
}

.delete {
  background-color: red;
}

th,
tr {
  padding: 0.5em;
}
</style>
