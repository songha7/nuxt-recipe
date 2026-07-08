<script setup>
import { Button } from '@/components/ui/button'
import { ref } from 'vue';

const រាប់ = ref(0)

function ដំឡើង() {
  រាប់.value++
}

function ទំលាក់() {
  រាប់.value--
}

function លុប() {
  រាប់.value = 0
}

</script>
<template>
  <div class="flex flex-col items-center justify-center m-10">
    <div class="pb-5">Count:{{ រាប់ }}</div>
    <div class="flex flex-row gap-5">
      <Button @click="ទំលាក់">ថយ</Button>
      <Button @click="លុប">លុប</Button>
      <Button @click="ដំឡើង">ឡើង</Button>
    </div>
  </div>
</template>
