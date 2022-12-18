<template>
    <div class="todo-list">
        <h1>Todo List</h1>
        <div class="error" v-if="error">{{ error }}</div>
        <div class="todo" v-for="todo in todos" :key="todo._id">
            <div class="todo-text">
                {{ todo.task }}
                <input type="checkbox" v-model="todo.completed" @change="updateTodo(todo._id, todo.completed)">&emsp;
                <button class="btn btn-danger" @click="deleteTodo(todo._id)">Delete</button>
            </div>
        </div>
        <div class="add-todo">
            <input type="text" v-model="newTodo" placeholder="New Todo">
            <button class="btn btn-primary" @click="addTodo">Add</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "TodoList",
    data() {
        return {
            todos: [],
            newTodo: "",
            error: ""
        };
    },
    beforeMount() {
        this.getTodos();
    },
    methods: {
        getTodos() {
            axios.get('http://localhost:3000/api/todo', { withCredentials: true })
                .then(response => {
                    this.todos = response.data;
                })
                .catch(error => {
                    console.error(error);
                    this.error = "Error while fetching todos";
                });
        },
        addTodo() {
            axios.post('http://localhost:3000/api/todo', {
                task: this.newTodo,
                completed: false
            }, { withCredentials: true })
                .then(response => {
                    this.todos.push({
                        _id: response.data._id,
                        task: this.newTodo,
                        completed: false
                    });
                    this.newTodo = "";
                })
                .catch(error => {
                    console.error(error);
                    this.error = "Error while adding todo";
                });
        },
        deleteTodo(deleteID) {
            axios.delete('http://localhost:3000/api/todo/' + deleteID, { withCredentials: true })
                .then(response => {
                    this.todos = this.todos.filter(t => t._id !== deleteID);
                })
                .catch(error => {
                    console.error(error);
                    this.error = "Error while deleting todo";
                });
        },
        updateTodo(updateID, state) {
            axios.put('http://localhost:3000/api/todo/' + updateID, {
                task: this.todos.task,
                completed: state
            }, { withCredentials: true })
                .then(response => {
                    // this.todos = this.todos.filter(t => t._id !== this.todos._id);
                })
                .catch(error => {
                    console.error(error);
                    this.error = "Error while updating todo";
                });
        }
    }
}
</script>

<style scoped>

</style>