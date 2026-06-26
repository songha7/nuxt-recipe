<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { toTypedSchema } from "@vee-validate/zod"
import { useForm } from "vee-validate"
import z from "zod"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
const formSchema = toTypedSchema(z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
}))

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((values) => {
  console.log('Form submitted!', values)
})
</script>

<template>
  <div :class="cn('flex flex-col gap-6', props.class)">
    <Card>
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit="onSubmit">
          <FieldGroup>
            <Field>
              <FieldLabel for="email">
                Email
              </FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </Field>
            <Field>
              <div class="flex items-center">
                <FieldLabel for="password">
                  Password
                </FieldLabel>
                <NuxtLink to="/login-page/forget-password"
                  class="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </NuxtLink>
              </div>
              <Input id="password" type="password" required />
            </Field>
            <Field>
              <Button type="submit" form="qwe" for="qwe">
                Login
              </Button>
              <Button variant="outline" type="button">
                Login with Google
              </Button>
              <FieldDescription class="text-center">
                Don't have an account?
                <NuxtLink to="/login-page/signup">SignUp</NuxtLink>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
