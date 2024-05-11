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
    <GalleryImageViewerModal
      v-if="currentImage"
      :image="currentImage"
      @close="onClose"
    />
  </section>
</template>

<script lang="ts" setup>
import type { GalleryData, GalleryImage } from '~/types/gallery';

const currentImage = ref<GalleryImage | null>(null);
const { deleteImage } = useGallery();

const { gallery } = defineProps<{
  gallery: GalleryData;
}>();

const onDelete = (image: GalleryImage) => {
  deleteImage(image.id);
};

const onOpen = (image: GalleryImage) => {
  currentImage.value = image;
};

const onClose = () => {
  currentImage.value = null;
};

</script>

<style></style>
