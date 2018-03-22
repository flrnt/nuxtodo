import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    todos: []
  },
  getters: {
    allTodos (state) {
      return state.todos
    },
    activeTodos (state) {
      return state.todos.filter(todo => !todo.completed)
    },
    completedTodos (state) {
      return state.todos.filter(todo => todo.completed)
    }
  },
  mutations: {
    createTodoMutation(state, newTodo) {
      state.todos.push(newTodo)
    },
    destroyTodoMutation(state, todoId) {
      state.todos.splice(todoId, 1)
    },
    clearCompletedMutation(state, unclearTodos) {
      // I should trash clear todos and keep unclears
      state.todos = unclearTodos
    },
    fetchTodosMutation(state) {
      axios({
        url: 'https://api.jsonbin.io/b/5ab3dfa0daaaea147dca64ab',
        headers: {'secret-key': '$2a$10$OJrMGS6MOBsMO8vcNp1gMeyN0u9yxCa6bIh6buoFXp/B9kT9EJpgG'}
      })
      .then(response => {
        state.todos = [{title: "to do", completed: false}]
      })
      .catch(error => { console.log(error) })
    },
    saveTodosMutation(state) {
      axios({
        url: 'https://api.jsonbin.io/b/5ab3dfa0daaaea147dca64ab',
        method: 'put',
        headers: {'secret-key': '$2a$10$OJrMGS6MOBsMO8vcNp1gMeyN0u9yxCa6bIh6buoFXp/B9kT9EJpgG'},
        data: state.todos
      })
      .then(response => { console.log(response) })
      .catch(error => { console.log(error) })
    }
  },
  actions: {
    createTodoAction ({ commit }, newTodo) {
      commit('createTodoMutation', newTodo)
    },
    destroyTodoAction({ commit }, todo) {
      commit('destroyTodoMutation', todo)
    },
    clearCompletedAction({commit}, unclearTodos) {
      commit('clearCompletedMutation', unclearTodos)
    },
    fetchTodosAction({commit}) {
      commit('fetchTodosMutation')
    },
    saveTodosAction({commit}) {
      commit('saveTodosMutation')
    }
  }
})

export default store
