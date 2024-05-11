<template>
  <div v-show="isOpen"
    class="fixed  top-0 left-0 w-full h-full z-40 text-black rounded-2xl flex items-center justify-center">
    <div class="modal-overlay bg-black/80 fixed w-full h-full"></div>
    <div :class="{
      'w-[80%] h-[80%]': size === 'lg',
      'min-w-[400px] min-h-[50px] max-w-[400px]': size === 'sm',
      'min-w-[300px] min-h-[50px] max-w-[300px]': size === 'xs',
    }" class="modal-content bg-white text-black rounded-2xl flex flex-col z-50">
      <div class="modal-header flex items-start p-2">
        <slot name="header" />
        <button class="ml-auto cursor-pointer text-slate-600 hover:text-black transition-colors" type="button"
          @click="emit('close')">
          <IconX size="32" />
        </button>
      </div>
      <div class="modal-body flex-1 overflow-auto">
        <slot name="body" />
      </div>
      <div class="modal-footer" v-if="$slots['footer']">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IconX } from '@tabler/icons-vue';

type ModalSize = 'sm' | 'lg' | 'xs';

const emit = defineEmits(['close']);

const { size, isOpen } = defineProps<{
  size: ModalSize;
  isOpen: boolean;
}>();

</script>

<style></style>
