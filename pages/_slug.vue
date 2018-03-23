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
        <li v-for="(todo, index) in todos" :key="index" :class="{completed: todo.completed, editing: todo === todoIsEditing}">
          <div class="view">
            <input class="toggle" type="checkbox" :checked="todo.completed" v-model="todo.completed">
            <label @dblclick="editTodo(todo)">{{todo.title}}</label>
            <button class="destroy" @click="destroyTodo(todo.id)"></button>
          </div>
          <input class="edit" type="text" v-model="todo.title" @keyup.enter="quitEditMode">
        </li>
			</ul>
		</section>
    <footer class="footer">
      <span class="todo-count"><strong>{{ leftTodos }}</strong> item<span>s</span> left</span>
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
      <button @click="clearCompleted" class="clear-completed">
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
      todoIsEditing: null
    }
  },
  methods: {
    createTodo() {
      var newTodo = this.newTodo
      if(newTodo) {
        this.$store.dispatch('createTodoAction', { id: Math.random().toString(36).substr(2, 9), title: newTodo, completed: false })
        this.newTodo = ''
      }
    },
    destroyTodo(todoId) {
      this.$store.dispatch('destroyTodoAction', todoId)
    },
    clearCompleted() {
      var unclearTodos = this.$store.getters.activeTodos
      this.$store.dispatch('clearCompletedAction', unclearTodos)
    },
    editTodo(todo) {
      this.todoIsEditing = todo
    },
    quitEditMode() {
      this.todoIsEditing = null
    },
    saveTodos() {
      this.$store.dispatch('saveTodosAction')
    }
  },
  computed: {
    todos () {
      if (this.$route.params.slug === 'active') {
        return this.$store.getters.activeTodos
      }
      if (this.$route.params.slug === 'completed') {
        return this.$store.getters.completedTodos
      }
      return this.$store.getters.allTodos
    },
    leftTodos() {
      return this.$store.getters.activeTodos.length
    }
  },
  mounted() {
    fetchTodos: {
      this.$store.dispatch('fetchTodosAction')
    }
  },
  watch: {
    todos: {
      deep: true,
      handler: 'saveTodos'
    }
  }
}
</script>

<style>
</style>
