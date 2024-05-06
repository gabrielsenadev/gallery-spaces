<template>
  <button
    v-bind="props"
    class="rounded-md p-1 px-6 transition-colors"
    :class="variantClasses"
    @click="$emit('click', $event)"
  >
    {{ text }}
  </button>
</template>

<script setup lang="ts">
import type { ButtonHTMLAttributes, PropType } from 'vue';

type ButtonProps = {
  variant: 'outline' | 'primary';
  text: string;
  type?: ButtonHTMLAttributes['type'];
}

const { text, variant, ...props } = withDefaults(defineProps<ButtonProps>(), {
  type: 'button',
});

const variantClasses = computed(() => {
  return {
      'bg-white text-black hover:bg-white/90': variant === 'primary',
      'bg-transparent text-white hover:text-white/80': variant === 'outline',
    };
});

</script>