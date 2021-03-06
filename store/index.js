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
      var removeIndex = state.todos.map(todo => todo.id).indexOf(todoId)
      state.todos.splice(removeIndex, 1)
    },
    clearCompletedMutation(state, unclearTodos) {
      // I should trash clear todos and keep unclears
      state.todos = unclearTodos
    },
    async fetchTodosMutation(state) {
      let res = await axios.get('https://api.jsonbin.io/b/5ab4a699989617146bd6f840/latest')
      state.todos = res.data
    },
    async saveTodosMutation(state) {
      await axios.put('https://api.jsonbin.io/b/5ab4a699989617146bd6f840', state.todos)
    }
  },
  actions: {
    createTodoAction ({ commit }, newTodo) {
      commit('createTodoMutation', newTodo)
    },
    destroyTodoAction({ commit }, todoId) {
      commit('destroyTodoMutation', todoId)
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
