<template>
  <Modal :is-open="isOpen" size="lg">
    <template #header>
      <section class="flex flex-col gap-2 max-h-[250px]">
        <h2 class="font-bold text-3xl">{{ image.title }}</h2>
        <p class="text-base">{{ image.description }}</p>
      </section>
    </template>
    <template #body>
      <main class="flex flex-col sm:flex-row flex-1 gap-2 h-full">
        <section class="overflow-none sm:overflow-auto w-full sm:w-[70%] flex items-center justify-center">
          <NuxtImg provider="netlify" :src="image.imageUrl" @load="onLoad" v-bind="transformsData" @on-error="disableLoading" />
        </section>
        <section class="flex-1 flex flex-col gap-4 px-4">
          <div class="flex items-center gap-2">
            <h3 class="font-bold text-2xl">Customize image</h3>
            <Loading :size="16" v-if="isLoading" />
          </div>
          <div class="flex flex-col gap-2 flex-1 pb-4">
            <InputNumber label="Width" @input="enableLoading" v-model="transformsData.width" />
            <InputNumber label="Height" @input="enableLoading" v-model="transformsData.height" />
            <InputSelect label="Fit" :options="['contain', 'cover', 'fill']" @input="enableLoading"
              v-model="transformsData.fit" />
            <InputSelect label="Format" :options="['avif', 'jpg', 'png', 'webp']" @input="enableLoading"
              v-model="transformsData.format" />
            <InputNumber label="Quality" @input="enableLoading" v-model="transformsData.quality" :max="100" />
            <Button type="button" variant="primary" :is-dark="false" @click="onClickDownload"
              class="mt-auto">Download</Button>
            <a :href="currentImageUrl" target="_blank" class="hidden" ref="downloadImageAnchorElement"
              download="image"></a>
          </div>
        </section>
      </main>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import type { GalleryImage } from '~/types/gallery';

type ImageTransforms = {
  width: string;
  height: string;
  quality: string;
  fit: string;
  format: string;
}

const { isOpen } = withDefaults(defineProps<{
  isOpen?: boolean;
  image: GalleryImage;
}>(), {
  isOpen: true,
});

const isLoading = ref(true);
const isFirstLoad = ref(true);

const transformsData = reactive<ImageTransforms>({
  width: '',
  height: '',
  quality: '80',
  fit: 'contain',
  format: 'jpg',
});

const downloadImageAnchorElement = ref<HTMLAnchorElement | null>(null);

const currentImageUrl = ref('');

const setupFirstLoad = (target: HTMLImageElement) => {
  if (isFirstLoad.value) {
    isFirstLoad.value = false;
    transformsData.width = target.width.toString();
    transformsData.height = target.height.toString();
  }
};

const onLoad = (ev: any) => {
  currentImageUrl.value = ev.target.currentSrc;
  disableLoading();
  setupFirstLoad(ev.target);
}

const enableLoading = () => {
  isLoading.value = true;
};

const disableLoading = () => {
  isLoading.value = false;
}

const onClickDownload = () => {
  if (downloadImageAnchorElement.value) {
    downloadImageAnchorElement.value.click();
  }
}

</script>

<style></style>