<script setup lang="ts">
import type { RecipeResponse } from '../../types/types'
import { type Recipe } from '~~/types/types';
const { data, error } = await useFetch<RecipeResponse>(
  "https://dummyjson.com/recipes?limit=12"
);
</script>
<template>
    <main>
        <section class="bg-[#f1f1f1] -mt-24 min-h-screen md:min-h-0">
            <div class=" flex flex-col lg:flex-row justify-center items-center py-20 md:p-20 gap-10">
                <div class="flex-1 order-2 lg:order-1 text-center lg:text-left">
                <h1 class="text-4xl lg:text-6xl font-extrabold mb-6 text-balance">
                    Master the Kitchen with Ease: Unleash Your Inner Chef Today!
                </h1>
                <p class="text-xl lg:text-2xl mb-8 text-balance">
                    Discover recipes helping you to find the easiest way to cook.
                </p>
                <button
                    class="px-4 py-2 text-white self-start bg-yellow-500 rounded-md text-lg cursor-pointer"
                >
                    Browse Recipes
                </button>
                </div>
                <div class="flex-1 order-1 lg:order-2">
                <NuxtImg src="/nuxt-course-hero.png" densities="x1" alt="" />
                </div>
            </div>
    </section>
    <section class="py-20 md:p-20">
      <h2 class="text-3xl lg:text-5xl mb-2">Discover, Create, Share</h2>
      <p class="text-lg lg:text-xl mb-8">Check out our most popular recipes!</p>
      <div v-if="!error" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
        <div v-for="recipe in data?.recipes" class="flex flex-col shadow rounded-md">
          <NuxtImg :src="recipe.image" alt="" class="rounded-t-md" />
          <div class="flex flex-col py-6 px-4 flex-1">
            <p class="text-xl lg:text-2xl font-semibold mb-2">{{ recipe.name }}</p>
            <div class="font-normal w-full bg-white/80 flex gap-8 text-lg lg:text-xl mb-4 mt-auto">
              <div class="flex items-center gap-1">
                <Icon name="mdi:clock-time-eight-outline" style="color: #f79f1a" />
                <span>{{ recipe.cookTimeMinutes }}</span>
              </div>
              <div class="flex items-center gap-1">
                <Icon name="mdi:fire" style="color: #f79f1a" />
                <span>{{ recipe.caloriesPerServing }}</span>
              </div>
              <div class="flex items-center gap-1">
                <Icon name="mdi:star" style="color: #f79f1a" />
                <span>{{ recipe.rating }} ({{ recipe.reviewCount }})</span>
              </div>
            </div>
            <NuxtLink
            :to="`/recipes/${recipe.id}`"
              class="px-4 py-2 text-white self-start bg-yellow-600 rounded-md text-base lg:text-lg cursor-pointer"
            >
              View
            </NuxtLink>
          </div>
        </div>
      </div>
      <p v-else class="tect-xl">Opps Somethings went wrong!!</p>
    </section>
    </main>
</template>