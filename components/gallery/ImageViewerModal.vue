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
        <section class="overflow-none sm:overflow-auto w-full sm:w-[70%]">
          <NuxtImg provider="netlify" :src="image.imageUrl" @load="onLoad" :width="transformsData.width"
            :height="transformsData.height" :fit="transformsData.fit" :format="transformsData.format"
            :quality="transformsData.quality" />
        </section>
        <section class="flex-1 flex flex-col gap-4 px-4">
          <div class="flex items-center gap-2">
            <h3 class="font-bold text-2xl">Customize image</h3>
            <Loading :size="16" v-if="isLoading"/>
          </div>
          <div class="flex flex-col gap-2 flex-1 pb-4">
            <InputNumber label="Width" :value="transformsData.width" @change="onChange('width', $event.target.value)" />
            <InputNumber label="Height" :value="transformsData.height"
              @change="onChange('height', $event.target.value)" />
            <InputSelect label="Fit" :options="['contain', 'cover', 'fill']" :value="transformsData.fit"
              @change="onChange('fit', $event.target.value)" />
            <InputSelect label="Format" :options="['avif', 'jpg', 'png', 'webp']" :value="transformsData.format"
              @change="onChange('format', $event.target.value)" />
            <InputNumber label="Quality" :value="transformsData.quality"
              @change="onChange('quality', $event.target.value)" :max="100" />
            <Button type="button" variant="secondary" text="Download" @click="onClickDownload" class="mt-auto" />
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

type ImageTransformsKey = 'width' | 'height' | 'quality' | 'fit' | 'format';

const { isOpen } = withDefaults(defineProps<{
  isOpen: boolean;
  image: GalleryImage;
}>(), {
  isOpen: true,
});

const isLoading = ref(true);

const transformsData = reactive<ImageTransforms>({
  width: '1000000',
  height: '1000000',
  quality: '75',
  fit: 'contain',
  format: 'jpg',
});

const downloadImageAnchorElement = ref<HTMLAnchorElement | null>(null);

const currentImageUrl = ref('');

const onLoad = (ev: any) => {
  currentImageUrl.value = ev.target.currentSrc;
  isLoading.value = false;
}

const onChange = (prop: ImageTransformsKey, value: string) => {
  if (transformsData[prop]) {
    transformsData[prop] = value;
  }
  isLoading.value = true;
}

const onClickDownload = () => {
  if (downloadImageAnchorElement.value) {
    downloadImageAnchorElement.value.click();
  }
}

</script>

<style></style>