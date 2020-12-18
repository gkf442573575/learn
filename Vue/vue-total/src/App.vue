<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <input v-model="value" placeholder="输入内容" />
    <button @click="testVal">测试</button>
    <div>{{ value }}</div>
    <div>{{ isEmoji ? '有表情' : '没有表情' }}</div>
    <router-view />
  </div>
</template>

<script>
const emojiRegex = require('emoji-regex');
const regex = emojiRegex();
export default {
  data() {
    return {
      value: '',
      isEmoji: false,
      string: ''
    };
  },
  methods: {
    testVal() {
      this.isEmoji = regex.exec(this.value);
    }
  }
};
</script>
