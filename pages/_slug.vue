<template>
  <section class="todoapp">
    <header class="header">
      <h1>Todos</h1>
      <input class="new-todo" placeholder="What needs to be done?" v-model="newTodo" @keyup.enter="createTodo" autofocus>
    </header>
		<section class="main">
			<input class="toggle-all" type="checkbox">
			<label for="toggle-all">Mark all as complete</label>
			<ul class="todo-list">
        <li v-for="(todo, index) in todos" :key="index" :class="{completed: todo.completed}">
          <div class="view">
            <input class="toggle" type="checkbox" :checked="todo.completed" v-model="todo.completed">
            <label>{{todo.title}}</label>
            <button class="destroy" @click="destroyTodo(index)"></button>
          </div>
          <input class="edit" type="text">
        </li>
			</ul>
		</section>
    <footer class="footer">
      <span class="todo-count"><strong>0</strong> item<span>s</span> left</span>
      <ul class="filters">
        <li>
          <nuxt-link to="/" exact>All</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/active">Active</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/completed">Completed</nuxt-link>
        </li>
      </ul>
      <button class="clear-completed">
        Clear completed
      </button>
    </footer>
  </section>
</template>

<script>
export default {
  data() {
    return {
      newTodo: '',
      todos: []
    }
  },
  methods: {
    createTodo() {
      var newTodo = this.newTodo
      if(newTodo) {
        this.todos.push({
          title: newTodo,
          completed: false
        })
        this.newTodo = ''
      }
    },
    destroyTodo(id) {
      this.$delete(this.todos, id)
    }
  }
}
</script>

<style>
</style>
