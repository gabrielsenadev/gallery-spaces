<template>
  <component :is="tag" class="flex flex-col justify-center items-center">
    <NuxtImg provider="netlify" :src="imageUrl" height="256" width="256" fit="cover" class="rounded-full" />
    <h2 class="font-bold text-2xl font-sans text-white">
      @{{ name }}
    </h2>
  </component>
</template>

<script lang="ts" setup>

type UserProfileProps = {
  imageUrl: string;
  name: string;
  tag: keyof HTMLElementTagNameMap;
};

const  { imageUrl, name, tag } = defineProps<UserProfileProps>();

</script>

<style></style>