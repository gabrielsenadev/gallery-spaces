<template>
  <main
    class="text-white flex flex-col h-full overflow-auto bg-black bg-blend-darken bg-cover p-4"
    :class="[isLoading ? 'items-center justify-center flex' : `bg-[url('${galleryWallpaperUrl}')]`]" :key="renderKey">
    <ActionHeader />
    <Loading v-if="isLoading" />
    <Transition mode="out-in" v-else>
      <GalleryNotFound v-if="!galleryData" />
      <GalleryViewer v-else :gallery="galleryData" />
    </Transition>
  </main>
</template>

<script setup lang="ts">
import type { GalleryData } from '~/types/gallery';

const route = useRoute();

const gallery = route.params.gallery;

const { data, pending } = useFetch<{
  data: GalleryData
}>(`/api/gallery/view/${gallery}`);

const renderKey = ref(0);

const galleryData = computed(() => data.value?.data);

const isLoading = computed(() => pending.value);

const galleryWallpaperUrl = computed(() => {
  const images = galleryData.value?.images;
  if (!images?.length) {
    return '/home-background.jpg';
  }

  const randomIndex = Math.min(Math.round(Math.random() * 10), images.length - 1);
  return images[randomIndex].imageUrl;
});

watch(galleryData, () => {
  renderKey.value++;
});

</script>