<script setup lang="ts">
const a = {
  a: 1,
  b: 2
}
</script>
<template>
  <header class="py-4 border-b">
    <nav class="flex container items-baseline">
      <NuxtLink to="/" class="flex gap-1 items-center">
        <NuxtImg width="56" src="/icon-green.png" alt="" />
        <span class="text-3xl font-bold">Nuxtcipes</span>
      </NuxtLink>
      <ul class="flex gap-6 ml-auto text-xl font-bold capitalize">
        <li>
            <NuxtLink to="/">Home</NuxtLink>
        </li>
            <NuxtLink to="/about">About</NuxtLink>
        <li>
            <NuxtLink to="/login-page/login">Login</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/login-page/login-shadcn">Login by Shadcn</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/formattodo/todo-list">to do lists</NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>



<style scoped>

</style>