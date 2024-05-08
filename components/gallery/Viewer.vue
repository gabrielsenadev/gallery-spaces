<template>
  <section class="flex flex-col gap-10 z-10 h-full">
    <GalleryUserProfile :name="gallery.user.username" :image-url="gallery.user.profileImageUrl" tag="header" />
    <GalleryImages
      v-if="gallery.images.length"
      :images="gallery.images"
      @delete="onDelete"
      @open="onOpen"
    />
    <GalleryNotFoundImages v-else />
    <GalleryImageViewerModal />
  </section>
</template>

<script lang="ts" setup>
import type { GalleryData } from '~/types/gallery';

const { gallery } = defineProps<{
  gallery: GalleryData;
}>();

const onDelete = (id: string) => {
  console.log('del', id);
};

const onOpen = (id: string) => {
  console.log('open', id);
};
</script>

<style></style>
