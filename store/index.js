import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    todos: [{title: "first task to do", completed: false}, {title: "second task done!", completed: true}]
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
    }
  }
})

export default store
