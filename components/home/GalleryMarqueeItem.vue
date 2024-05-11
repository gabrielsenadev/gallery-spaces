<template>
  <NuxtLink
    :href="url"
    class="py-2 px-4 pr-12 items-center bg-white rounded-md flex gap-4 justify-start hover:bg-white/90 transition-colors min-w-48"
  >
    <NuxtImg
      provider="netlify"
      :src="profileImageUrl"
      height="32"
      width="32"
      fit="cover"
      class="rounded-full"
      placeholder
    />
    {{ gallery }}
  </NuxtLink>
</template>

<script setup lang="ts">

type GalleryMarqueeCard = {
  gallery: string;
  url: string;
  profileImageUrl: string;
}

const { gallery, profileImageUrl, url } = defineProps<GalleryMarqueeCard>();

</script>