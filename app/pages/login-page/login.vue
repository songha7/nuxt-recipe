<template>
    <div class="flex min-h-hscreen item-center justify-center bg-green-500 text-blue-500">
        <h2 class="bg-red-600">this is my login page as my preview</h2>
    </div>
  <div class="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
    <div class="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
      
      <div class="text-left">
        <h2 class="text-xl font-bold tracking-tight text-gray-950">
          Login to your account
        </h2>
        <p class="mt-1 text-l text-gray-700">
          Enter your email below to login to your account
        </p>
      </div>

      <form @submit.prevent="handleLogin" class="mt-10 space-y-4">
        
        <div>
          <label for="email" class="block text-l font-semibold text-gray-950">
            Email
          </label>
          <div class="mt-4">
            <input
              id="email"
              v-model="form.email"
              type="email"
              autocomplete="email"
              required
              placeholder="m@example.com"
              class="block w-full rounded-lg border border-gray-200 px-5 py-2.5 text-gray-900 placeholder-gray-400 shadow-sm outline-none transition focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between mt-10">
            <label for="password" class="block text-l font-semibold text-gray-950">
              Password
            </label>
            <div class="text-sm">
              <NuxtLink to="/login-page/forget-password" 
              class="text-sm
              text-gray-950
              hover:underline-offset-4
              hover:text-green-500">
                Forgot your password?
              </NuxtLink>
            </div>
          </div>
          <div class="mt-4">
            <input
              id="password"
              v-model="form.password"
              type="password"
              autocomplete="current-password"
              placeholder=""
              required
              class="block w-full
              rounded-lg border
              border-gray-200
              px-3 py-2.5
              text-gray-900
              shadow-sm
              outline-none
              transition
              focus:border-emerald-600
              focus:ring-1
              focus:ring-emerald-600
              sm:text-sm"
            />
          </div>
        </div>

        <div class="space-y-3 pt-2">
          <button
            type="submit"
            class="flex w-full
            justify-center
            rounded-lg
            bg-[#009663]
            px-3 py-2.5
            text-sm
            font-semibold
            text-white
            shadow-sm
            hover:bg-[#007d52]
            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-offset-2
            focus-visible:outline-emerald-600
            transition-colors"
          >
            Login
          </button>

          <button
            type="button"
            @click="handleGoogleLogin"
            class="flex w-full
            justify-center
            rounded-lg border
            border-gray-200
            bg-white
            px-3
            py-2.5
            text-sm
            font-semibold
            text-gray-950
            shadow-sm
            hover:bg-gray-50
            transition-colors"
          >
            Login with Google
          </button>
        </div>
      </form>

      <p class="mt-6 text-center text-sm text-gray-500">
        Don't have an account?
        {{ ' ' }}
        <NuxtLink to="/login-page/signup" class="text-gray-950 underline underline-offset-4 hover:text-gray-700">
          Sign up
        </NuxtLink>
      </p>

    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  email: '',
  password: ''
})

const handleLogin = () => {
  console.log('Logging in with:', form.email, form.password)
  // Your authentication logic here
}

const handleGoogleLogin = () => {
  console.log('Initiating Google OAuth')
  // Your Google OAuth logic here
}
</script>