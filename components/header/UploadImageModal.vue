<template>
  <Modal size="sm" :is-open="isOpen" @close="emit('close')">
    <template #header>
      <h2 class="font-bold text-2xl">Upload Image</h2>
    </template>
    <template #body>
      <section class="flex justify-center flex-col p-4">
        <form class="flex flex-col flex-1 gap-4" @submit.prevent="onSubmit" ref="formElement">
          <InputImageUpload name="image" :key="currentKey"/>
          <InputText label="Title" placeholder="My image title" name="title" v-model="form.title" />
          <InputText label="Description" placeholder="My image description" name="description" v-model="form.description" />
          <Button type="submit" variant="primary" :is-dark="false" class="w-full" :isLoading="isLoading"
            :disabled="!isValid || isLoading">Upload</Button>
          <p class="text-red-500">{{ errorMessage }}</p>
        </form>
      </section>
    </template>
  </Modal>
</template>

<script lang="ts" setup>

const { uploadImage } = useGallery();
const { fetchData } = useGalleryImages();

const emit = defineEmits(['close']);

const { isOpen } = defineProps<{
  isOpen: boolean;
}>();

const isLoading = ref(false);
const formElement = ref<HTMLFormElement | null>(null);
const errorMessage = ref('');
const currentKey = ref(0);

const form = reactive({
  title: '',
  description: '',
});

const isValid = computed(() => !!form.title);

const resetFormElement = () => {
  if (formElement.value) {
    formElement.value.reset();
  }
  currentKey.value++;
}

const onSubmit = (event: Event) => {
  if (!(event.target instanceof HTMLFormElement) || !event.target) {
    return;
  }
  isLoading.value = true;

  const formData = new FormData(event.target);

  uploadImage(formData)
    .then((success) => {
      if (success) {
        emit('close');
        resetFormElement();
        fetchData();
      }
    })
    .catch((error) => errorMessage.value = error.data?.message ?? error.message)
    .finally(() => {
      isLoading.value = false;
    });;
};

</script>

<style></style>