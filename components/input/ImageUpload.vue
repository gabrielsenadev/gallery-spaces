<template>
  <InputImage v-bind="$attrs">
    <template #default="{ previewURL }">
      <div class="flex items-center justify-center w-[256px] h-[256px] bg-cover overflow-hidden">
        <img alt="user profile image" :src="previewURL" v-if="previewURL" />
        <PhImage v-else size="256" class="text-black" />
      </div>
    </template>
  </InputImage>
</template>

<script lang="ts" setup>
import { PhImage } from '@phosphor-icons/vue';

</script>

<style></style>