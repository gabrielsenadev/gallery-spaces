<template>
  <section class="flex gap-8 mx-10">
    <div v-for="image in images" :key="image.imageUrl" class="relative cursor-pointer group" @click.stop="$emit('open', image.id)">
      <NuxtImg provider="netlify" :src="image.imageUrl" height="300" width="300" fit="cover"
        class="rounded-2xl hover:bg-black hover:bg-blend-darken" />
      <div
        class="invisible absolute inset-0 bg-black/25 items-end rounded-2xl group-hover:visible flex justify-end p-4">
        <PhTrash class="text-white hover:text-red-400" :size="32" @click.prevent.stop="$emit('delete', image.id)"/>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { GalleryImage } from '~/types/gallery';
import { PhTrash } from '@phosphor-icons/vue';

type ImagesProps = {
  images: GalleryImage[];
};

const { images } = defineProps<ImagesProps>();

</script>

<style></style>