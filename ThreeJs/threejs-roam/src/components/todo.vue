<style lang="less" scoped>
.todo {
  border-bottom: 1px solid #ececec;
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #f4f4f4;
  padding: 15px;
  cursor: pointer;
  &:hover {
    background-color: #f7f7f7;
  }
  &:last-child {
    border-bottom: none;
  }
  .desc {
    flex: 1;
    font-weight: bold;
    font-size: 18px;
  }
  .todo-icon {
    margin-left: 10px;
    font-size: 16px;
  }
}
.status{
  font-size: 12px;
  font-weight: bold;
}
</style>
<template>
  <li class="todo">
    <div class="desc">{{ todo.desc }}</div>
    <div class="status" :style="statusStyle">{{ status }}</div>
    <el-icon
      v-if="!todo.isBegin"
      class="todo-icon"
      color="#409EFF"
      @click="emits('beginToDo', index)"
    >
      <Aim />
    </el-icon>
    <el-icon  v-if="todo.isBegin && !todo.isFinish" class="todo-icon" color="#67C23A" @click="emits('finishToDo', index)">
      <Finished />
    </el-icon>
    <el-icon class="todo-icon" color="#F56C6C" @click="emits('removeToDo', index)">
      <Delete />
    </el-icon>
  </li>
</template>

<script setup lang="ts">
import { Aim, Finished, Delete } from '@element-plus/icons-vue'
import { ToDo } from '@/store/todos'
import { computed } from 'vue'

const props = defineProps<{ todo: ToDo; index: number }>()

const emits = defineEmits(['beginToDo', 'finishToDo', 'removeToDo'])

const status = computed(() => {
  return props.todo.isBegin ? props.todo.isFinish ? '已完成' : '进行中' : '未开始'
})

const statusStyle = computed(() => {
  const color = props.todo.isBegin ? props.todo.isFinish ? '#67C23A' : '#409EFF' : '#E6A23C'
  return {
    color
  }
})

</script>
