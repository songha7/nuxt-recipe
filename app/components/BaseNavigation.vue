<script setup lang="ts">
const a = {
  a: 1,
  b: 2
}
</script>
<template>
  <header class="fixed top-4 inset-x-4 md:inset-x-8 z-50 py-3 rounded-2xl border bg-white/80 backdrop-blur-md shadow-lg">
    <nav class="flex w-full px-6 md:px-12 items-center">
      <NuxtLink to="/" class="flex gap-1 items-center">
        <NuxtImg width="48" class="w-6 md:w-12" src="/icon-green.png" alt="" />
        <span class=" text-xl  md:text-3xl font-bold">Nuxtcipes</span>
      </NuxtLink>
      <ul class="flex gap-6 ml-auto text-xl font-bold capitalize">
        <li>
            <NuxtLink to="/">Home</NuxtLink>
        </li>
            <NuxtLink to="/about">About</NuxtLink>
        <li class="hidden md:block">
            <NuxtLink to="/login-page/login">Login</NuxtLink>
        </li>
        <li class="hidden md:block">
          <NuxtLink to="/login-page/login-shadcn">Login by Shadcn</NuxtLink>
        </li>
        <li class="hidden md:block">
          <NuxtLink to="/formattodo/todo-list">to do lists</NuxtLink>
        </li>
        <li class="hidden md:block">
          <NuxtLink to="/counter">Counter State</NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>



<style scoped>

</style>