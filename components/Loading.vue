<template>
  <IconLoader2 class="animate-spin text-black" :size="size" v-bind="$attrs"/>
</template>

<script lang="ts" setup>
import { IconLoader2 } from '@tabler/icons-vue';

const { size } = withDefaults(defineProps<{
  size: number;
}>(), {
  size: 128,
});

</script>

<style>

</style>