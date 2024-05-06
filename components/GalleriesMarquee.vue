<template>
    <Vue3Marquee v-for="(galleryGroup, groupIndex) in galleriesGroups" :key="groupIndex" pauseOnHover
      clone :delay="getGroupDelay(groupIndex)" :duration="getGroupDuration(groupIndex)">
      <GalleryMarqueeCard v-for="(gallery, index) in galleryGroup" :gallery="gallery.gallery"
        :profile-image-url="gallery.profileImageUrl" :url="gallery.url" :key="index" class="mx-4" />
    </Vue3Marquee>
</template>

<script setup lang="ts">
import { Vue3Marquee } from 'vue3-marquee';

type GalleryListItem = {
  gallery: string;
  url: string;
  profileImageUrl: string;
};

const { data } = await useFetch<{
  data: GalleryListItem[],
}>('/api/gallery/list');

const getGroupDelay = (index: number) => Math.max(0.5 + (index / 100) + Math.random(), 0.5);

const getGroupDuration = (index: number) => Math.min(20 + index + Math.random() * 1, 40);

const galleriesGroups = computed(() => {
  const values = data.value?.data;

  if (!values || !Array.isArray(values)) {
    return [];
  }

  let lastArray = 0;

  return values.reduce((total, now) => {
    let item = {
      ...now,
      url: `/gallery/view/${now.gallery}`,
    }

    if (!total[lastArray]) {
      total[lastArray] = [item];
      return total;
    }
    
    if (total[lastArray]?.length < 10) {
      total[lastArray].push(item);
    }
    
    lastArray = total[lastArray].length >= 10 ? ++lastArray : lastArray;
    return total;
  }, [] as GalleryListItem[][]);
});

</script>