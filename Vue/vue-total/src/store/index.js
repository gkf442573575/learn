import Vue from 'vue'
import Vuex from 'vuex'
import cart from './cart';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    todos: [
      { id: 1, text: '做的1', done: true },
      { id: 2, text: '做的2', done: false }
    ]
  },
  mutations: {
    increment(state, n = 1) {
      state.count += n
    },
    reduce(state, preload) {
      let count = state.count;
      count -= preload.n;
      state.count = count > 0 ? count : 0;
    }
  },
  actions: {
    asyncAdd({ commit, state, dispatch }, n) {
      setTimeout(() => {
        commit('increment', n);
      }, 3000)
    }
  },
  getters: {
    doneTodos: ({ todos }) => {
      return todos.filter(todo => todo.done);
    },
    getTodoById: ({ todos }) => id => {
      return todos.find(todo => todo.id === id);
    }
  },
  modules: {
    cart: cart
  }
});

export default store;
