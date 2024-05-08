<template>
  <div v-show="isOpen" :class="{ 'w-[80%] h-[80%]': size === 'lg', 'w-[50%] h-[50%]': size === 'sm' }"
    class="text-black mt-10 sm:mt-auto overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 bg-white md:inset-0 rounded-3xl max-h-full mx-auto my-auto flex flex-col">
    <div class="modal-header flex items-start p-2">
      <slot name="header" />
      <button class="ml-auto cursor-pointer text-slate-600 hover:text-black transition-colors" type="button"
        @click="$emit('close')">
        <PhX size="32" />
      </button>
    </div>
    <div class="modal-body flex-1 overflow-scroll">
      <slot name="body" />
    </div>
    <div class="modal-footer" v-if="$slots['footer']">
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PhX } from '@phosphor-icons/vue';

type ModalSize = 'sm' | 'lg';

const { size, isOpen } = withDefaults(defineProps<{
  size: ModalSize;
  isOpen: boolean;
}>(), {
  size: 'sm',
  isOpen: false,
});

</script>

<style></style>