<template>
  <Modal size="sm" :is-open="isOpen" @close="emit('close')">
    <template #header>
      <h2 class="font-bold text-2xl">Sign Up</h2>
    </template>
    <template #body>
      <section class="flex justify-center flex-col p-4">
        <form class="flex flex-col flex-1 gap-4" @submit.prevent="onSubmit" ref="formElement">
          <InputImage name="image" />
          <InputText label="Username" placeholder="gabriel" required name="username" v-model="form.username" />
          <InputPassword label="Password" placeholder="123456" required name="password" v-model="form.password" />
          <Button type="submit" variant="primary" :is-dark="false" class="w-full" :isLoading="isLoading"
            :disabled="!isValid || isLoading">Sign Up</Button>
          <p class="text-red-500">{{ errorMessage }}</p>
        </form>
      </section>
    </template>
  </Modal>
</template>

<script lang="ts" setup>

const { goToUserGallery } = useGallery();
const { signUp } = useAuth();

const emit = defineEmits(['close']);

const { isOpen } = defineProps<{
  isOpen: boolean;
}>();

const isLoading = ref(false);
const formElement = ref<HTMLFormElement | null>(null);
const errorMessage = ref('');

const form = reactive({
  username: '',
  password: '',
});

const isValid = computed(() => !!form.password && !!form.username);

const onSubmit = (event: Event) => {
  if (!(event.target instanceof HTMLFormElement) || !event.target) {
    return;
  }
  isLoading.value = true;

  const formData = new FormData(event.target);
  const image = formData.get('image') as File;

  if (!image || image.size === 0) {
    formData.delete('image');
  }

  signUp(formData)
    .then((success) => {
      if (success) {
        emit('close');
        goToUserGallery();
      }
    })
    .catch((error) => errorMessage.value = error.data?.message ?? error.message)
    .finally(() => {
      isLoading.value = false;
    });;
};

</script>

<style></style>