<template>
  <div class="flex items-center flex-col gap-2">
    <div class="flex items-center justify-center rounded-full w-[128px] h-[128px] bg-cover overflow-hidden">
      <img alt="user profile image" :src="imageURL" v-if="imageURL"/>
      <PhUserCircle v-else size="128" class="text-black"/>
    </div>
    <div>
      <label for="image-uploader" name="image" class="flex items-center justify-center bg-black text-white p-2 px-4 rounded-lg cursor-pointer">
        Upload image
      </label>
      <input type="file" accept="image/*" id="image-uploader" class="hidden" @change="selectImage" v-bind="$attrs" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PhUserCircle } from '@phosphor-icons/vue';


const image = ref<File | null>(null);
const imageURL = ref<string | null>(null);

const selectImage = ({ target }: Event) => {
  if (!(target instanceof HTMLInputElement) || !target?.files?.length) {
    return;
  }

  image.value = target.files[0];
  imageURL.value = URL.createObjectURL(image.value);
}
</script>

<style></style>