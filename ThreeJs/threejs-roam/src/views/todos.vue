<style lang="less" scoped>
.todo-list{
  width: 400px;
  height: 600px;
  border: 1px solid #ececec;
  border-radius: 5px;
  margin: 0 auto;
}
</style>
<template>
  <div>
    <el-button type="primary" @click="toAddToDos">添加</el-button>
    <el-button type="danger" @click="todos.clearToDos">清空</el-button>
  </div>
  <ul class="todo-list">
    <ToDoItem
      v-for="(item, index) in todos.list"
      :key="`todo_${index}`"
      :todo="item"
      :index="index"
      @begin-to-do="todos.beginToDo"
      @finish-to-do="todos.finishToDo"
      @remove-to-do="todos.removeToDo"
    />
  </ul>
  <el-dialog v-model="dialogVisible" title="添加任务" width="400px">
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="100px">
      <el-form-item label="Todo Desc" prop="desc">
        <el-input v-model="ruleForm.desc" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addTodo">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInstance, FormRules} from 'element-plus'
import { ElMessage } from 'element-plus'

import ToDoItem from '@/components/todo.vue'
import { useToDosStore } from '@/store/todos'

const todos = useToDosStore()

const dialogVisible = ref<boolean>(false)

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  desc: ''
})
const rules = reactive<FormRules>({
  desc: [{ required: true, message: 'Please input ToDo Desc', trigger: 'blur' }]
})

const toAddToDos = () => {
  ruleForm.desc = ''
  if (ruleFormRef.value) {
    ruleFormRef.value.resetFields()
  }
  dialogVisible.value = true
}

const addTodo = async () => {
  if (!ruleFormRef.value) {
    return
  }

  await ruleFormRef.value.validate((valid, fields) => {
    if (valid) {
      todos.addTodo(ruleForm.desc)
      ruleForm.desc = ''
      dialogVisible.value = false
      ElMessage.success('添加成功')
    } else {
      console.log('error commit', fields)
    }
  })
}

// const
</script>
