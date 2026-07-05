<script setup lang="ts">
import { DateFormatter, getLocalTimeZone, parseDate, today, type DateValue } from '@internationalized/date'
import { CalendarIcon } from '@lucide/vue'
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { parseStringToDateValue } from 'reka-ui/date'


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


// ---- form fields ----
const date = ref<DateValue>()
const defaultPlaceholder = today(getLocalTimeZone())
const taskName = ref('') // what the user types in the "Task" input
const editingId = ref<number | null>(null)


// ---- the list of tasks that will show in the table ----
interface TodoItem {
  id: number
  task: string
  deadline: string
}
const tasks = ref<TodoItem[]>([])

// runs when the button is clicked / form is submitted
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

function addTask() {
  if (!taskName.value.trim()) return

  if (editingId.value !== null) {
    // we are editing -> find that task and update it
    const target = tasks.value.find(t => t.id === editingId.value)
    if (target) {
      target.task = taskName.value
      target.deadline = date.value ? date.value.toString() : 'No deadline'
    }
    editingId.value = null // done editing
  }
  else {
    // normal add
    tasks.value.push({
      id: tasks.value.length + 1,
      task: taskName.value,
      deadline: date.value ? date.value.toString() : 'No deadline',
    })
  }

  // reset the form either way
  taskName.value = ''
  date.value = undefined
}

function editTask(item: TodoItem) {
  taskName.value = item.task
  editingId.value = item.id

  if (item.deadline !== 'No deadline') {
    date.value = parseDate(item.deadline)
  }
  else {
    date.value = undefined
  }
  // note: date doesn't auto-fill here because your deadline is stored as text
  // that's okay for now — user can just re-pick the date if they want to change it
}

function deleteTask(id: number) {
  tasks.value = tasks.value.filter(t => t.id !== id)
}


</script>

<template>
  <div class="m-10">
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

    <div class="mt-20">
      <Table>
        <TableCaption>A list of your recent to-do-task</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead class="w-25">
              Task Num
            </TableHead>
            <TableHead>Task</TableHead>
            <TableHead>DeadLine</TableHead>
            <TableHead class="text-center">Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="item in tasks" :key="item.id">
            <TableCell class="font-medium">
              TASK{{ item.id }}
            </TableCell>
            <TableCell>{{ item.task }}</TableCell>
            <TableCell>{{ item.deadline }}</TableCell>
            <TableCell class="flex gap-2">
              <Button class="bg-white border" variant="outline" @click="editTask(item)">✏️</Button>
              <Button class="bg-white border" variant="outline" @click="deleteTask(item.id)">🗑️</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>

