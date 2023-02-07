<template>
  <div>Home</div>
  <div>
    <el-button :icon="Minus" @click="changeCounter(false)" />
    {{ counter.count }}
    <el-button :icon="Plus" @click="changeCounter(true)" />
  </div>
  <el-button type="primary" @click="goToDos">TODO LIST</el-button>
</template>

<script lang="ts" setup>
import { Plus, Minus } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

import { useCounterStore } from '@/store/counter'

const router = useRouter()
const counter = useCounterStore()

const changeCounter = (isAdd: boolean) => {
  if (isAdd) {
    counter.increment()
  } else {
    counter.minus()
  }
}

const goToDos = () => {
  router.push({
    path: '/todo'
  })
}

</script>

<style></style>
