<template>
  <main class="text-white flex flex-col h-full overflow-auto bg-black bg-blend-darken bg-cover p-4"
    :class="{ 'items-center justify-center flex': isLoading }">
    <ActionHeader />
    <Loading :size="128" v-if="isLoading" />
    <template v-if="gallery">
      <GalleryUserProfile :name="gallery.username" :image-url="gallery.profileImageUrl" tag="header" />
      <Loading :size="128" v-if="isLoadingImages" />
      <GalleryImages />
    </template>
    <GalleryNotFound v-else />
  </main>
</template>

<script setup lang="ts">

const { isLoading, data: gallery, fetchData: fetchGallery } = useGallery();
const { isLoading: isLoadingImages, fetchData } = await useGalleryImages();

fetchGallery();
fetchData();

</script>