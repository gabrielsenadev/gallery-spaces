<template>
  <section class="flex gap-8 mx-10 flex-wrap py-8 justify-center">
    <template v-if="data?.images?.length">
        <div v-for="image in data.images" :key="image.imageUrl" class="relative cursor-pointer group" @click.stop="onOpen(image)">
          <NuxtImg provider="netlify" :src="image.imageUrl" height="300" width="300" fit="cover"
            class="rounded-2xl hover:bg-black hover:bg-blend-darken" placeholder placeholder-class="bg-gray w-[300px] h-[300px]" loading="lazy" />
          <div
            class="invisible absolute inset-0 bg-black/25 items-end rounded-2xl group-hover:visible flex justify-end p-4">
            <IconTrash class="text-white hover:text-red-400" :size="32" @click.prevent.stop="onDelete(image)" v-if="isOnOwnGallery"/>
          </div>
        </div>
    </template>
    <GalleryNotFoundImages v-else class="mx-auto"/>
    <GalleryImageViewerModal v-if="currentImage" :image="currentImage" @close="onClose" />
  </section>
</template>

<script lang="ts" setup>
import type { GalleryImage } from '~/types/gallery';
import { IconTrash } from '@tabler/icons-vue';

const { deleteImage, isOnOwnGallery } = useGallery();
const { data, fetchData } = useGalleryImages();
const currentImage = ref<GalleryImage | null>(null);


const onDelete = (image: GalleryImage) => {
  deleteImage(image.id).then(() => {
    fetchData();
  });
};

const onOpen = (image: GalleryImage) => {
  currentImage.value = image;
};

const onClose = () => {
  currentImage.value = null;
};

</script>

<style></style>