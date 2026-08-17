<script setup lang="ts">
import BaseNavigation from '~/components/BaseNavigation.vue';
</script>
<template>
    <div>
        <BaseNavigation />
        <div class="pt-24">
            <slot />
        </div>
    </div>
</template>