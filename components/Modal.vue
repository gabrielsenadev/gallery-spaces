<template>
  <div
    :class="{'w-[80%] h-[80%]': size === 'lg', 'min-w-[30%] min-h-[50%] max-w-[300px] max-h-[100px]': size === 'sm' }"
    class="text-black overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 bg-white md:inset-0 rounded-3xl max-h-full mx-auto my-auto p-4"
  >
  
  </div>
</template>

<script lang="ts" setup>
const { size } = withDefaults(defineProps<{
  size: 'sm' | 'lg';
}>(), {
  size: 'sm',
});

</script>

<style></style>