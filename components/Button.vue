<template>
  <button
    v-bind="props"
    class="rounded-md p-2 px-6 transition-colors"
    :class="variantClasses"
    @click="$emit('click', $event)"
  >
    {{ text }}
  </button>
</template>

<script setup lang="ts">
import type { ButtonHTMLAttributes } from 'vue';

type ButtonProps = {
  variant: 'outline' | 'primary' | 'secondary';
  text: string;
  type?: ButtonHTMLAttributes['type'];
}

const { text, variant, ...props } = withDefaults(defineProps<ButtonProps>(), {
  type: 'button',
});

const variantClasses = computed(() => {
  return {
      'bg-white text-black hover:bg-white/90': variant === 'primary',
      'bg-black text-white hover:bg-black/90': variant === 'secondary',
      'bg-transparent text-white hover:text-white/80': variant === 'outline',
    };
});

</script>