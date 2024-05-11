<template>
  <button v-bind="$attrs" class="rounded-md p-2 px-6 transition-colors cursor-pointer flex items-center justify-center gap-2"
    :class="[variantClasses]">
    <Loading :size="16" :class="[loadingVariantClasses]" v-if="isLoading"/>
    <slot />
  </button>
</template>

<script setup lang="ts">

type ButtonProps = {
  variant: 'outline' | 'primary' | 'secondary';
  isDark?: boolean;
  isLoading?: boolean;
}

const { variant, isDark } = withDefaults(defineProps<ButtonProps>(), {
  isDark: true,
  isLoading: false,
  variant: 'primary',
});

const variantClasses = computed(() => {
  return {
    [isDark ? 'text-black bg-white hover:bg-white/90' : 'text-white bg-black hover:bg-black/90 disabled:bg-black/80 disabled:cursor-not-allowed']: variant === 'primary',
    [isDark ? 'bg-transparent text-white hover:text-gray' : 'bg-transparent text-black hover:text-black/90']: variant === 'outline',
  }
});

const loadingVariantClasses = computed(() => {
  return {
    [isDark ? 'text-black' : 'text-white']: variant === 'primary',
    [isDark ? 'text-white' : 'text-black']: variant === 'outline',
  }
});
</script>