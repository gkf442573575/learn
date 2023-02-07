import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'

export interface ToDo {
  desc: string
  isBegin: boolean
  isFinish: boolean
}

export const useToDosStore = defineStore('todos', () => {
  const list = reactive<ToDo[]>([])

  const addTodo = (desc: string) => {
    list.push({
      desc,
      isBegin: false,
      isFinish: false
    })
  }

  const beginToDo = (index: number) => {
    if (list[index].isBegin || list[index].isFinish) {
      const msg = list[index].isBegin ? '任务进行中' : '任务已完成'
      return ElMessage.warning(msg)
    }
    list[index].isBegin = true
  }

  const finishToDo = (index: number) => {
    if (list[index].isFinish) {
      return ElMessage.warning('任务已完成')
    }
    if (!list[index].isBegin) {
      return ElMessage.warning('任务未开始')
    }
    list[index].isFinish = true
  }

  const removeToDo = (index: number) => {
    list.splice(index, 1)
  }

  const clearToDos = () => {
    list.splice(0, list.length)
  }

  return { list, addTodo, removeToDo, clearToDos, beginToDo, finishToDo }
})
