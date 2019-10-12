
<style lang="scss">
.btn {
  margin: 0 20px;
}
.count {
  font-size: 20px;
  font-weight: bold;
}
</style>
<template>
  <div class="home">
    <div style="margin-top:20px;">
      <button class="btn" @click="increment">+</button>
      <span class="count">{{count}}</span>
      <button class="btn" @click="reduce">-</button>
    </div>
    <div>
      <span>{{cartCount}}</span>
      <button class="btn" @click="moduleAdd">+</button>
    </div>
    <div style="margin-top:20px;">
      <button class="btn" @click="asyncAdd">等待3秒增加</button>
    </div>
    <ul>
      <li v-for="done in doneTodo" :key="done.id">{{done.text}}</li>
    </ul>
    <div>{{todoIds.text}}</div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {};
  },
  computed: {
    count() {
      return this.$store.state.count;
    },
    doneTodo() {
      return this.$store.getters.doneTodos;
    },
    todoIds() {
      return this.$store.getters.getTodoById(2);
    },
    cartCount(){
      return this.$store.state.cart.count;
    }
  },
  methods: {
    
    increment() {
      this.$store.commit("increment", 2);
    },
    reduce() {
      this.$store.commit("reduce", {
        n: 2
      });
    },
    asyncAdd(){
      this.$store.dispatch('asyncAdd',3);
    },
    moduleAdd(){
      this.$store.dispatch('cart/add',3);
    }
  },
  components: {},
  created() {}
};
</script>
