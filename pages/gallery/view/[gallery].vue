<template>
  <main class="text-white">
    <div v-if="!isLoading && !!galleryData" class="flex flex-col gap-10">
      <header class="flex flex-col justify-center items-center">
        <NuxtImg
          provider="netlify"
          :src="galleryData.galleryImage"
          height="256"
          width="256"
          fit="cover"
          class="rounded-full"
        />
        <h2 class="font-bold text-2xl font-sans text-black dark:text-white">@{{ galleryData.gallery }}</h2>
      </header>
      <section class="flex gap-8 mx-10">
        <div
          v-for="image in galleryData.images"
          :key="image.imageUrl"
          class="relative cursor-pointer group"
          >
          <NuxtImg
          provider="netlify"
          :src="image.imageUrl"
          height="300"
          width="300"
          fit="cover"
          class="rounded-2xl hover:bg-black hover:bg-blend-darken"
        />
        <div class="invisible absolute inset-0 bg-black/25 items-end rounded-2xl group-hover:visible flex justify-end p-4">
          <PhTrash class="text-white hover:text-red-400" :size="32"/>
        </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { PhTrash } from '@phosphor-icons/vue';

type GalleryImage = {
  description: string;
  imageUrl: string;
  title: string;
};

type GalleryData = {
  gallery: string;
  galleryImage: string;
  images: GalleryImage[];
};

const route = useRoute();

const gallery = route.params.gallery;

const { data, pending: isLoading } = useFetch<{
  data: GalleryData
}>(`/api/gallery/view/${gallery}`);

const galleryData = data.value?.data;

console.log('data', data.value?.data, 'pendin', isLoading);

</script>