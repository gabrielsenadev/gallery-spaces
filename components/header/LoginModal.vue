<template>
  <Modal size="sm" is-open>
    <template #header>
      <h2 class="font-bold text-2xl">Login</h2>
    </template>
    <template #body>
      <section class="flex justify-center flex-col p-4">
        <NuxtImg src="/logo.png" width="128" class="mx-auto" alt="gallery spaces logo"/>
        <section class="flex flex-col flex-1 gap-4">
          <InputText label="Username" v-model="form.username" placeholder="gabriel"/>
          <InputPassword label="Password" placeholder="123456" v-model="form.password" />
          <p v-show="errorMessage" class="text-red-600">{{ errorMessage }}</p>
          <Button text="Login" variant="secondary" class="w-full" @click="onClickLogin" :disabled="!isValid"/>
        </section>
      </section>
    </template>
  </Modal>
</template>

<script lang="ts" setup>

const { login, fetchUser } = useAuth();

const form = reactive({
  username: '',
  password: '',
});

const errorMessage = ref('');

const isValid = computed(() => form.password && form.username);

const onClickLogin = async () => {
  if (!form.password || !form.username) {
    errorMessage.value = 'Please, fill all fields.';
    return;
  }

  await login(form);
  // TODO
};

</script>

<style></style>