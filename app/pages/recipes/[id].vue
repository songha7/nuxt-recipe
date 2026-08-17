<script setup lang="ts">
const params = useRoute().params;
import { type Recipe } from '~~/types/types';

const { id } = params

const { data, error } = await useFetch<Recipe>(`https://dummyjson.com/recipes/${id}`)
if (error.value) {
  throw createError({
    statusCode: error.value?.statusCode,
  });
}

useSeoMeta({
  title: data.value?.name,
  description: 'Recipe for you to COOK!',
  ogTitle: data.value?.name,
  ogDescription: 'Recipe for you to COOK!',
  ogImage: data.value?.image,
  ogUrl: `https://localhost:3000/recipes/${data.value?.id}`,
  twitterTitle: data.value?.name,
  twitterDescription: 'Recipe for you to COOK!',
  twitterImage: data.value?.image,
  twitterCard: 'summary'
})
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 md:px-8 pb-24">
    <!-- Breadcrumb -->
    <NuxtLink
      to="/"
      class="inline-flex items-center gap-1 text-sm font-medium text-dire-worf/60 hover:text-dodgeroll-gold transition-colors mb-6"
    >
      <Icon name="mdi:arrow-left" />
      Back to recipes
    </NuxtLink>

    <!-- Hero -->
    <div class="relative rounded-3xl overflow-hidden shadow-lg mb-8">
      <NuxtImg
        :src="data?.image"
        densities="x1"
        sizes="xs:100vw sm:100vw md:100vw lg:100vw"
        class="w-full h-72 md:h-104 object-cover"
        alt=""
      />
      <div class="absolute inset-0 bg-linear-to-t from-dire-worf/90 via-dire-worf/20 to-transparent" />
      <div class="absolute inset-x-0 bottom-0 p-6 md:p-10">
        <div class="flex flex-wrap gap-2 mb-3">
          <span
            v-if="data?.cuisine"
            class="px-3 py-1 rounded-full bg-white/90 text-dire-worf text-xs font-semibold uppercase tracking-wide"
          >
            {{ data.cuisine }}
          </span>
          <span
            v-if="data?.difficulty"
            class="px-3 py-1 rounded-full bg-dodgeroll-gold text-white text-xs font-semibold uppercase tracking-wide"
          >
            {{ data.difficulty }}
          </span>
        </div>
        <h1 class="text-3xl md:text-5xl font-bold text-white text-balance">{{ data?.name }}</h1>
      </div>
    </div>

    <!-- Tags -->
    <div v-if="data?.tags?.length" class="flex flex-wrap gap-2 mb-8">
      <span
        v-for="tag in data.tags"
        :key="tag"
        class="px-3 py-1 rounded-full border border-apple-green/30 text-apple-green text-xs font-medium capitalize"
      >
        {{ tag }}
      </span>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 md:grid-cols-5 gap-3 mb-12">
      <div class="flex flex-col items-center justify-center gap-1 rounded-xl border border-dire-worf/10 bg-white shadow-sm py-4">
        <Icon name="mdi:timer-outline" class="text-2xl" style="color: #F79F1A" />
        <span class="text-lg font-semibold">{{ data?.prepTimeMinutes }}m</span>
        <span class="text-xs text-dire-worf/50 uppercase tracking-wide">Prep</span>
      </div>
      <div class="flex flex-col items-center justify-center gap-1 rounded-xl border border-dire-worf/10 bg-white shadow-sm py-4">
        <Icon name="mdi:pot-steam-outline" class="text-2xl" style="color: #F79F1A" />
        <span class="text-lg font-semibold">{{ data?.cookTimeMinutes }}m</span>
        <span class="text-xs text-dire-worf/50 uppercase tracking-wide">Cook</span>
      </div>
      <div class="flex flex-col items-center justify-center gap-1 rounded-xl border border-dire-worf/10 bg-white shadow-sm py-4">
        <Icon name="mdi:account-group-outline" class="text-2xl" style="color: #046E18" />
        <span class="text-lg font-semibold">{{ data?.servings }}</span>
        <span class="text-xs text-dire-worf/50 uppercase tracking-wide">Servings</span>
      </div>
      <div class="flex flex-col items-center justify-center gap-1 rounded-xl border border-dire-worf/10 bg-white shadow-sm py-4">
        <Icon name="mdi:fire" class="text-2xl" style="color: #F79F1A" />
        <span class="text-lg font-semibold">{{ data?.caloriesPerServing }}</span>
        <span class="text-xs text-dire-worf/50 uppercase tracking-wide">Calories</span>
      </div>
      <div class="col-span-2 md:col-span-1 flex flex-col items-center justify-center gap-1 rounded-xl border border-dire-worf/10 bg-white shadow-sm py-4">
        <Icon name="mdi:star" class="text-2xl" style="color: #F79F1A" />
        <span class="text-lg font-semibold">{{ data?.rating }}</span>
        <span class="text-xs text-dire-worf/50 uppercase tracking-wide">{{ data?.reviewCount }} reviews</span>
      </div>
    </div>

    <!-- Content -->
    <div class="grid grid-cols-1 lg:grid-cols-[minmax(0,320px)_1fr] gap-10">
      <!-- Ingredients -->
      <aside class="lg:sticky lg:top-28 self-start rounded-2xl border border-dire-worf/10 bg-white shadow-sm p-6">
        <h2 class="text-xl font-semibold mb-4">Ingredients</h2>
        <ul class="flex flex-col gap-3">
          <li v-for="(ingredient, index) in data?.ingredients" :key="index">
            <label class="flex gap-3 items-center cursor-pointer">
              <input class="hidden peer" type="checkbox" />
              <div
                class="shrink-0 relative w-5 h-5 rounded-full border-2 border-dodgeroll-gold flex items-center justify-center peer-checked:after:absolute peer-checked:after:inset-[0.05rem] peer-checked:after:bg-dodgeroll-gold peer-checked:after:rounded-full transition-colors"
              ></div>
              <span class="text-base text-dire-worf/80 peer-checked:text-dire-worf/40 peer-checked:line-through transition-colors">
                {{ ingredient }}
              </span>
            </label>
          </li>
        </ul>
      </aside>

      <!-- Instructions -->
      <div>
        <h2 class="text-xl font-semibold mb-4">Instructions</h2>
        <ol class="flex flex-col gap-5">
          <li v-for="(instruction, index) in data?.instructions" :key="index" class="flex gap-4">
            <span class="shrink-0 flex items-center justify-center bg-dodgeroll-gold w-8 h-8 rounded-full text-white text-sm font-semibold">
              {{ index + 1 }}
            </span>
            <p class="flex-1 text-base leading-relaxed text-dire-worf/80 pt-0.5">{{ instruction }}</p>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>
