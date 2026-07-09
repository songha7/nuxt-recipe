<script setup lang="ts">
import { DateFormatter, getLocalTimeZone, parseDate, today, type DateValue } from '@internationalized/date'
import { CalendarIcon } from '@lucide/vue'
import { ref, computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { parseStringToDateValue } from 'reka-ui/date'
import { toast } from 'vue-sonner'
import { Checkbox } from '@/components/ui/checkbox'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { id } from 'zod/v4/locales'
import type Id from '~/pages/recipes/[id].vue'
/*
// import { watch } from 'vue'
// const saved = localStorage.getItem('todoTasks')
// const tasks = ref<TodoItem[]>(saved ? JSON.parse(saved) : [])
// watch(tasks, (newTasks) => {
//   localStorage.setItem('todoTasks', JSON.stringify(newTasks))
// }, { deep: true })

// ! this making change between two table of (todoTasks and doneTasks)

import { computed } from 'vue'

const todoTasks = computed(() => tasks.value.filter(t => !t.done))
const doneTasks = computed(() => tasks.value.filter(t => t.done))

// * todoTasks = "give me every task where done is false"
//  ? doneTasks = "give me every task where done is true". 

// ~ ---- form fields ----
const date = ref<DateValue>()
const defaultPlaceholder = today(getLocalTimeZone())
const taskName = ref('') // * what the user types in the "Task" input
const editingId = ref<number | null>(null)
const tasks = ref<TodoItem[]>([])


// ~ ---- the list of tasks that will show in the table ----
interface TodoItem {
  id: number
  task: string
  deadline: string
  done: boolean
}


// & runs when the button is clicked / form is submitted
// function addTask() {
//   // don't add empty tasks
//   if (!taskName.value.trim()) return

//   tasks.value.push({
//     id: tasks.value.length + 1,
//     task: taskName.value,
//     deadline: date.value ? date.value.toString() : 'No deadline',
//   })

//   // reset the form
//   taskName.value = ''
//   date.value = undefined
// }


// & function addTask on the submit form 🐛 

function addTask() {
  if (!taskName.value.trim()) return

  if (editingId.value !== null) {
    // ^ we are editing -> find that task and update it
    const target = tasks.value.find(t => t.id === editingId.value)
    if (target) {
      target.task = taskName.value
      target.deadline = date.value ? date.value.toString() : 'No deadline'
    }
    editingId.value = null // ~ done editing
  }
  else {
    // ^ normal add
    tasks.value.push({
      id: tasks.value.length + 1,
      task: taskName.value,
      deadline: date.value ? date.value.toString() : 'No deadline',
      done: false,
    })
  }
  // ^ reset the form either way
  taskName.value = ''
  date.value = undefined
}

// & function for editing the form

function editTask(item: TodoItem) {
  taskName.value = item.task
  editingId.value = item.id
  toast('editing task', {
    position: 'top-center'
  })

  if (item.deadline !== 'No deadline') {
    date.value = parseDate(item.deadline)
  }
  else {
    date.value = undefined
  }
  // ^ note: date doesn't auto-fill here because your deadline is stored as text
  // ^ that's okay for now — user can just re-pick the date if they want to change it
}

// & function cancel the editing that swap the button

function cancelEdit() {
  editingId.value = (null)
  taskName.value = ''
  date.value = undefined
}

// & function deleteTask on Table-todo

function deleteTask(id: number) {
  tasks.value = tasks.value.filter(t => t.id !== id)
  toast('The tasks is eliminated from the world', {
    position: 'top-center',
    // class: 'text-center bg-gray-200 text-lg text-blue-500 p-4 rounded-md' //  * it not working i'm waiting for my senoir
  })
}


// ! this script where i can save data in nuxt server and browser sevrer

import { onMounted } from 'vue'
import { AlignCenter } from 'lucide-vue-next'

onMounted(() => {
  const saved = localStorage.getItem('todoTasks')
  if (saved) {
    tasks.value = JSON.parse(saved)
  }
})

watch(tasks, (newTasks) => {
  if (import.meta.client) {
    localStorage.setItem('todoTasks', JSON.stringify(newTasks))
  }
}, { deep: true })
*/







// ~ ---- types ----
interface TodoItem {
  id: number
  task: string
  deadline: string
  done: boolean
}

// ~ ---- fetch tasks from the server (source of truth is now the DB, not localStorage) ----
const { data: rawTasks, refresh } = await useFetch<TodoItem[]>('/api/todos')

const tasks = computed(() =>
  (rawTasks.value ?? []).map(t => ({ ...t, done: !!t.done }))
)
// ~ ---- split into two views ----
const todoTasks = computed(() => (tasks.value ?? []).filter(t => !t.done))
const doneTasks = computed(() => (tasks.value ?? []).filter(t => t.done))

// ~ ---- form fields ----
const date = ref<DateValue>()
const defaultPlaceholder = today(getLocalTimeZone())
const taskName = ref('')
const editingId = ref<number | null>(null)

// & add a new task OR update the one being edited
async function addTask() {
  if (!taskName.value.trim()) return

  const payload = {
    task: taskName.value,
    deadline: date.value ? date.value.toString() : 'No deadline',
    done: false,
  }

  if (editingId.value !== null) {
    await $fetch(`/api/todos/${editingId.value}`, { method: 'PATCH', body: payload })
    toast('The task is Updated. ✏️', { position: 'top-center' })
    editingId.value = null
  }
  else {
    await $fetch('/api/todos', { method: 'POST', body: payload })
    toast('The task is created.', { position: 'top-center' })
  }

  await refresh()
  taskName.value = ''
  date.value = undefined
}

// & fill the form with an existing task so the user can edit it
function editTask(item: TodoItem) {
  taskName.value = item.task
  editingId.value = item.id
  toast('editing task', { position: 'top-center' })

  date.value = item.deadline !== 'No deadline' ? parseDate(item.deadline) : undefined
}

// & cancel editing, reset the form
function cancelEdit() {
  editingId.value = null
  taskName.value = ''
  date.value = undefined
}

// & delete a task from the database
async function deleteTask(id: number) {
  await $fetch(`/api/todos/${id}`, { method: 'DELETE' })
  await refresh()
  toast('The tasks is eliminated from the world', { position: 'top-center' })
}

// & flip a task's done state and save it
async function toggleDone(item: TodoItem) {
  await $fetch(`/api/todos/${item.id}`, { method: 'PATCH', body: { done: !item.done } })
  await refresh()
  toast(item.done ? 'task unchecked!!' : 'The task is finished', { position: 'top-center' })
}



</script>

<template>
  <div class="m-10">
    <!-- <Button @click="() => toast('My first toast', {
      position: 'top-center'
    })">
    Give me a toast
  </Button> -->

    <Card class="shadow-md">
      <CardHeader>
        <CardTitle>TO DO LIST</CardTitle>
        <CardDescription>please fill the task and deadline</CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="addTask">
          <div class="">
            <Label for="todo" class="mb-3">to do</Label>
            <Input id="todo" placeholder="Task" v-model="taskName" />
          </div>
          <div class="mt-5">
            <Label for="date" class="my-3">DeadLine</Label>
            <Popover>
              <PopoverTrigger as-child>
                <Button
                  type="button"
                  variant="outline"
                  :class="cn(
                    'w-full justify-start text-left font-normal',
                    !date && 'text-muted-foreground',
                  )"
                >
                  <CalendarIcon class="mr-2 h-4 w-4" />
                  {{ date ? date.toString() : 'Pick a date' }}
                </Button>
              </PopoverTrigger>
              <PopoverContent class="w-auto p-0">
                <Calendar
                  v-model="date"
                  :initial-focus="true"
                  :default-placeholder="defaultPlaceholder"
                  layout="month-and-year"
                />
              </PopoverContent>
            </Popover>
          </div>

          <CardFooter class="flex flex-col gap-2 px-0 mt-5">
            <Button type="submit" class="w-full">
              {{ editingId !== null ? 'Update the task ✏️' : 'Submit the task 👾' }}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>

    <div class="mt-20 flex gap-10 flex-row">
      <div class=" border rounded-md">
        <div class="text-center font-semibold py-2 border-b bg-muted">to-do Table</div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead class="w-fit">No.</TableHead>
              <TableHead>Task</TableHead>
              <TableHead>DeadLine</TableHead>
              <TableHead class="text-center">Edit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="item in todoTasks" :key="item.id">
              <TableCell class="font-medium">
                TASK{{ item.id }}
              </TableCell>
              <TableCell>{{ item.task }}</TableCell>
              <TableCell>{{ item.deadline }}</TableCell>
              <TableCell>
                <div class="flex gap-2 p-2">
                  <Button v-if="editingId !== item.id"  class="bg-white border" variant="outline" @click="editTask(item)">✏️</Button>
                  <Button v-else class="bg-white border" variant="outline" @click="cancelEdit">✖️</Button>
                  <Button class="bg-white border" variant="outline" @click="deleteTask(item.id)">🗑️</Button>
                  <Checkbox
                    :model-value="item.done"
                    @update:model-value="toggleDone(item)"
                    :id="'done-' + item.id"
                    class="p-4 h-4"
                  />
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div class=" border rounded-md">
        <div class="text-center font-semibold py-2 border-b bg-muted">DONE to-do Table</div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead class="w-fit">No.</TableHead>
              <TableHead>Task</TableHead>
              <TableHead>DeadLine</TableHead>
              <TableHead>Done</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="item in doneTasks" :key="item.id">
              <TableCell class="font-medium">
                TASK{{ item.id }}
              </TableCell>
              <TableCell>{{ item.task }}</TableCell>
              <TableCell>{{ item.deadline }}</TableCell>
              <TableCell>
                <div class="flex p-2">
                  <Checkbox
                    :model-value="item.done"
                    @update:model-value="toggleDone(item)"
                    :id="'done-' + item.id"
                    class="p-4 h-4"
                  />
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  </div>
  

</template>

