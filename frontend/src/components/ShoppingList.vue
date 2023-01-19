<template>
    <div class="todo">
        <h3>Shopping</h3>
        <div class="error" v-if="error">{{ error }}</div>
        <ol class="todo-list" v-for="todo in todos" :key="todo._id">
            <li>
                <input type="checkbox" v-model="todo.completed" @change="updateTodo(todo._id, todo.completed)">
                <span class="todo-text" :class="{ 'checked': todo['completed'] }">
                    {{ todo.task }}
                    <button class="delete" @click="deleteTodo(todo._id)">&ensp;X&ensp;</button>
                </span>
            </li>
        </ol>
        <div class="add-todo">
            <input type="text" v-model="newTodo" placeholder="New Todo">
            <button class="btn btn-primary" @click="addTodo">Add</button>
            <button class="btn btn-primary" @click="deleteAllDone">Delete all done</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "ShoppingList",
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
            axios.get('/api/shopping', { withCredentials: true })
                .then(response => {
                    this.todos = response.data;
                })
                .catch(error => {
                    console.error(error);
                    this.error = "Error while fetching shopping list";
                });
        },
        addTodo() {
            if (this.newTodo === "") {
                this.error = "Please enter a task";
                return;
            }
            axios.post('/api/shopping', {
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
                    this.error = "Error while adding shopping item";
                });
        },
        deleteTodo(deleteID) {
            axios.delete('/api/shopping/' + deleteID, { withCredentials: true })
                .then(() => {
                    this.todos = this.todos.filter(t => t._id !== deleteID);
                })
                .catch(error => {
                    console.error(error);
                    this.error = "Error while deleting shopping item";
                });
        },
        updateTodo(updateID, state) {
            axios.put('/api/shopping/' + updateID, {
                task: this.todos.task,
                completed: state
            }, { withCredentials: true })
                .catch(error => {
                    console.error(error);
                    this.error = "Error while updating shopping item";
                });
        },
        deleteAllDone() {
            // Loop through all todos
            for (var i = 0; i < this.todos.length; i++) {
                // If todo is completed
                if (this.todos[i].completed) {
                    // Delete todo
                    this.deleteTodo(this.todos[i]._id);
                }
            }
        }
    }
}
</script>

<style scoped>
.todo {
    width: 100%;
    padding: 1.5em;
    box-sizing: border-box;
}

.todo-list {
    text-align: left;
}

.delete {
    /* Button with red background, white font */
    background-color: #f44336;
    /* round */
    color: white;
    /* Float the button to the right */
    float: right;
    margin-right: 3em;
    /* Remove the padding */
    padding: 0.2em;
    /* Remove the border */
    border: none;

}

.checked {
    text-decoration: line-through;
}

ol {
    list-style-type: none;
    /* margin-left: 20px; */
}

ol li span {
    display: block;
    /* padding-left: 30px; */
}

/* Make input checkbox round */
input[type=checkbox] {
    float: left;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: 1px solid #ccc;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    outline: none;
    transition: all .2s;
}

/* When checkbox is checked */
input[type=checkbox]:checked {
    background: #24b73a;
    border: 1px solid #24b73a;
}

input[type=text] {
    /* width: 100%; */
    padding: 0.5em;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 1em;
}

button {
    padding: 0.5em;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 1em;
}
</style>