<template>
  <PhCircleNotch class="animate-spin text-black" :size="size" />
</template>

<script lang="ts" setup>
import { PhCircleNotch } from '@phosphor-icons/vue';

const { size } = withDefaults(defineProps<{
  size: number;
}>(), {
  size: 128,
});

</script>

<style>

</style>