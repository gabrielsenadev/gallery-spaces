<template>
  <div class="flex items-center flex-col gap-2">
    <slot :previewURL="imageURL"></slot>
    <div>
      <label class="flex items-center justify-center bg-black text-white p-2 px-4 rounded-lg cursor-pointer">
        Upload image
        <input type="file" accept="image/*" class="hidden" @change="selectImage" v-bind="$attrs" />
      </label>
    </div>
  </div>
</template>

<script lang="ts" setup>

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