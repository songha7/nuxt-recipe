<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import Button from '~/components/ui/button/Button.vue'

// const formSchema = toTypedSchema(z.object({
//   username: z.string().min(2,  {message: 'Username must be at least 2 characters.'
//   }).max(50, {message: 'Username not more than 50 characters.'} ),
// }))

const formSchema = toTypedSchema(z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
}))
const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((values) => {
  console.log('Email:', values.email)
  console.log('Password:', values.password)
  // call your API here
})
// const onSubmit = form.handleSubmit((values) => {
//   console.log('Form submitted!', values)
// })
</script>

<template>
  <div class="flex items-center justify-center pt-5">
    
    <Card class="w-full max-w-sm">
      <form @submit="onSubmit">
      <CardHeader class="relative">
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <div class="absolute right-0 top-2">
          <Button variant="link">
            Sign Up
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        
          <div class="grid w-full items-center gap-4">
            <div class="flex flex-col space-y-1.5">
              <FormField v-slot="{ componentField }" name="email">
                <FormItem>
                  <FormLabel for="email">Email</FormLabel>
                  <FormControl>
                    <Input id="email" type="email" placeholder="m@example.com" v-bind="componentField"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>
            <div class="flex flex-col space-y-1.5">
              <div class="flex items-center justify-between">
                <Label for="password">Password</Label>
                <NuxtLink to="/login-page/forget-password">
                  Forgot your password?
                </NuxtLink>
              </div>
                <FormField v-slot="{ componentField }" name="password">
                  <FormItem>
                    <FormControl>
                      <Input id="password" type="password" v-bind="componentField" />
                    </FormControl>
                  <FormMessage />

                  </FormItem>
                </FormField>
              </div>
            </div>
      </CardContent>
      <CardFooter  class="flex flex-col gap-2">
        <Button type="button" class="w-full" @click="onSubmit">
          Login
        </Button>
        <!-- looking forword to type submit -->
        <Button type="button" variant="outline" class="w-full">
          Login with Google
        </Button>
      </CardFooter>
      </form>
    </Card>


  </div>
</template>
