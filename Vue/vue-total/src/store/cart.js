export default {
  namespaced: true,
  state: {
    count: 0
  },
  mutations: {
    increment(state, n) {
      state.count += n;
    }
  },
  actions: {
    add({ state, commit, rootState }, n) {
      commit('increment', rootState.count + n);
    }
  },
  getters: {

  }
};
