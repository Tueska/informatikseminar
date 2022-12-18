<template>
  <div class="home">
    <CalenderSchedule></CalenderSchedule>
    <TodoListVue></TodoListVue>
    <button class="btn btn-primary" @click="logout">Logout</button>
  </div>
</template>

<script>
import CalenderSchedule from '@/components/CalenderSchedule.vue';
import TodoListVue from '@/components/TodoList.vue';

// @ is an alias to /src
export default {
  name: 'HomeView',
  components: {
    CalenderSchedule,
    TodoListVue
  },
  data: function () {
    return {

    }
  },
  methods: {
    logout() {
      localStorage.clear();
      document.cookie.split(";").forEach(function (c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
      this.$router.push('/login');
    }
  }
}
</script>
