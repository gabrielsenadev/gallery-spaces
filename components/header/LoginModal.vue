<template>
  <Modal size="sm" :is-open="isOpen" @close="emit('close')">
    <template #header>
      <h2 class="font-bold text-2xl">Login</h2>
    </template>
    <template #body>

      <section class="flex justify-center flex-col p-4">
        <NuxtImg src="/logo.png" width="128" class="mx-auto" alt="gallery spaces logo" />
        <section class="flex flex-col flex-1 gap-4">
          <InputText label="Username" v-model="form.username" placeholder="gabriel" />
          <InputPassword label="Password" placeholder="123456" v-model="form.password" />
          <Button variant="primary" :is-dark="false" class="w-full" @click="onClickLogin" :disabled="!isValid || isLoading" >Login</Button>
          <p class="text-red-500">{{ errorMessage }}</p>
        </section>
      </section>
    </template>
  </Modal>
</template>

<script lang="ts" setup>

const { goToUserGallery } = useGallery();
const { login } = useAuth();

const emit = defineEmits(['close']);

const { isOpen } = defineProps<{
  isOpen: boolean;
}>();

const form = reactive({
  username: '',
  password: '',
});

const isLoading = ref(false);

const errorMessage = ref('');

const isValid = computed(() => !!form.password && !!form.username);

const onClickLogin = async () => {
  if (isLoading.value) {
    return;
  }

  errorMessage.value = '';
  isLoading.value = true;

  login(form)
  .then(({ success }) => {
    if (success) {
      emit('close');
      goToUserGallery();
    }
  })
  .catch((error) => errorMessage.value = error.data?.message ?? error.message)
  .finally(() => {
    isLoading.value = false;
  });
};

</script>

<style></style>