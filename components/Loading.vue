<template>
  <IconLoader2 class="animate-spin text-black" :size="size" v-bind="$attrs"/>
</template>

<script lang="ts" setup>
import { IconLoader2 } from '@tabler/icons-vue';

const { size = 128 } = defineProps<{
  size: number;
}>();

</script>

<style>

</style>