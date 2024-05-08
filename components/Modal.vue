<template>
  <div
    :class="{'w-[80%] h-[80%]': size === 'lg', 'min-w-[30%] min-h-[50%] max-w-[300px] max-h-[100px]': size === 'sm' }"
    class="text-black overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 bg-white md:inset-0 rounded-3xl max-h-full mx-auto my-auto p-4 flex flex-col"
  >
    <div class="flex">
      <slot name="header" class="flex-1" >
        <div>aaa</div>
      </slot>

      <button class="ml-auto cursor-pointer text-slate-600 hover:text-black transition-colors" type="button" @click="$emit('close')">
        <PhX size="32" />
      </button>
    </div>
    <div class="flex-1 ">
      <slot name="body" />
    </div>
    <div v-if="$slots['footer']">
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PhX } from '@phosphor-icons/vue';


const { size } = withDefaults(defineProps<{
  size: 'sm' | 'lg';
}>(), {
  size: 'sm',
});

</script>

<style></style>