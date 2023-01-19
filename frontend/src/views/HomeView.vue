<template>
  <div class="home">
    <div class="grid-container">
      <CalenderSchedule class="grid-item-top"></CalenderSchedule>
      <ShoppingList class="grid-item-left"></ShoppingList>
      <TodoListVue class="grid-item-right"></TodoListVue>
    </div>
  </div>
</template>

<script>
import CalenderSchedule from '@/components/CalenderSchedule.vue';
import TodoListVue from '@/components/TodoList.vue';
import ShoppingList from '@/components/ShoppingList.vue';

// @ is an alias to /src
export default {
  name: 'HomeView',
  components: {
    CalenderSchedule,
    TodoListVue,
    ShoppingList
  },
  data: function () {
    return {

    }
  }
}
</script>

<style>
.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto 1fr;
  grid-template-areas: "top top" "left right";
}

.grid-item-top {
  grid-area: top;
}

.grid-item-left {
  grid-area: left;
}

.grid-item-right {
  grid-area: right;
}

@media screen and (max-width: 800px) {
  .grid-container {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, auto);
    grid-template-areas: "top" "left" "right";
  }
}
</style>
