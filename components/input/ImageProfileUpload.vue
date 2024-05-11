<template>
  <InputImage v-bind="$attrs">
    <template #default="{ previewURL }">
      <div class="flex items-center justify-center rounded-full w-[128px] h-[128px] bg-cover overflow-hidden">
        <img alt="user profile image" :src="previewURL" v-if="previewURL" />
        <IconUserCircle v-else size="128" class="text-black" />
      </div>
    </template>
  </InputImage>
</template>

<script lang="ts" setup>
import { IconUserCircle } from '@tabler/icons-vue';

</script>

<style></style>