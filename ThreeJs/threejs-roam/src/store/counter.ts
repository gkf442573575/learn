import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => {
    return {
      count : 0 as number
    }
  },
  getters: {
    double: state => state.count * 2
  },
  actions: {
    increment() {
      this.count++
    },
    minus() {
      this.count--
    }
  }
})
