<template>
  <el-button @click="toHome">点击去HOME</el-button>
  <div>counter count 数值{{ counter.count }}</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useCounterStore } from '@/store/counter'

const router = useRouter()

const counter = useCounterStore()

const toHome = () => {
  router.push({
    path: '/home'
  })
}

console.log(import.meta.env.VITE_BASE_URL)

</script>

<style lang="less" scoped></style>
