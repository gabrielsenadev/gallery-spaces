<template>
<div class="bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-50 max-h-full md:inset-0 h-full w-full flex items-center justify-center">
  <div
    class="w-[80%] h-[70%] text-black bg-white rounded-3xl flex p-4">
    <div class="w-[70%] overflow-auto">
      <NuxtImg
        provider="netlify"
        :src="image.imageUrl"
        @load="onLoad"
        :width="transformsData.width"
        :height="transformsData.height"
        :fit="transformsData.fit"
        :format="transformsData.format"
        :quality="transformsData.quality"
      />
    </div>
    <div class="flex flex-col flex-1 px-4">
      <div class="flex">
        <button class="ml-auto cursor-pointer text-slate-600 hover:text-black transition-colors" type="button"
        @click="$emit('close')">
        <PhX size="32" />
      </button>
      </div>
      <div class="flex flex-col gap-1">
        <h2 class="text-center text-xl font-bold">{{ image.title }}</h2>
        <p> {{ image.description }}</p>
      </div>
      <div class="flex flex-col gap-2">
        <InputNumber label="Width" :value="transformsData.width" @change="onChange('width', $event.target.value)" />
        <InputNumber label="Height" :value="transformsData.height" @change="onChange('height', $event.target.value)"/>
        <InputSelect label="Fit" :options="['contain', 'cover', 'fill']" :value="transformsData.fit"  @change="onChange('fit', $event.target.value)"/>
        <InputSelect label="Format" :options="['avif', 'jpg', 'png', 'webp']" :value="transformsData.format"  @change="onChange('format', $event.target.value)"/>
        <InputNumber label="Quality" :value="transformsData.quality"  @change="onChange('quality', $event.target.value)" :max="100"/>
        <Button type="button" variant="secondary" text="Download" @click="onClickDownload" />
        <a :href="currentImageUrl" target="_blank" class="hidden" ref="downloadImageAnchor" download="image"></a>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts" setup>
import { PhX } from '@phosphor-icons/vue';
import type { GalleryImage } from '~/types/gallery';

type ImageTransforms = {
  width: string;
  height: string;
  quality: string;
  fit: string;
  format: string;
}

type ImageTransformsKey = 'width' | 'height' | 'quality' | 'fit' | 'format';

const transformsData = reactive<ImageTransforms>({
  width: '1000',
  height: '1000',
  quality: '75',
  fit: 'contain',
  format: 'jpg',
});

const { image } = defineProps<{
  image: GalleryImage;
}>();

const downloadImageAnchor = ref<HTMLAnchorElement | null>(null);

const currentImageUrl = ref('');

const onLoad = (ev: any) => {
  currentImageUrl.value = ev.target.currentSrc;
}

const onChange = (prop: ImageTransformsKey, value: string) => {
  if (transformsData[prop]) {
    transformsData[prop] = value;
  }
}

const onClickDownload = () => {
  if (downloadImageAnchor.value) {
    downloadImageAnchor.value.click();
  }
}

</script>

<style></style>