<template>
  <section class="flex items-center justify-center">
    <p class="text-white" v-if="isOnOwnGallery">Start uploading your first image!</p>
    <p class="text-white" v-else>Sorry, there are no images here.</p>
  </section>
</template>

<script lang="ts" setup>

const { isOnOwnGallery } = useGallery();

</script>

<style>

</style>