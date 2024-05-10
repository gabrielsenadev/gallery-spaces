<template>
  <button v-bind="$attrs" class="rounded-md p-2 px-6 transition-colors cursor-pointer" :class="[variantClasses]">
    <slot />
  </button>
</template>

<script setup lang="ts">

type ButtonProps = {
  variant: 'outline' | 'primary' | 'secondary';
  isDark?: boolean;
}

const { variant, isDark } = withDefaults(defineProps<ButtonProps>(), {
  isDark: true,
  variant: 'primary',
});

const variantClasses = computed(() => {
  return {
    [isDark ? 'text-black bg-white hover:bg-white/90' : 'text-white bg-black hover:bg-black/90']: variant === 'primary',
    [isDark ? 'bg-transparent text-white hover:text-gray' : 'bg-transparent text-black hover:text-black/90']: variant === 'outline',
  }
});
</script>