<template>
  <header class="flex gap-3 justify-end p-8">
    <Button variant="outline" text="Login" v-if="showSignUpAndLoginButton" @click="updateModalVisibility('login', true)"/>
    <Button variant="outline" text="Logout" v-if="showLogoutButton" />
    <Button variant="outline" text="My gallery" v-if="showGoToGalleryButton" @click="goToUserGallery"/>
    <Button variant="primary" text="Sign Up" v-if="showSignUpAndLoginButton" />
    <Button variant="primary" text="Upload" v-if="showUploadButton"/>
    <HeaderLoginModal @close="updateModalVisibility('login', false)" :is-open="modalVisibility.login" prop2="23"/>
  </header>
</template>

<script lang="ts" setup>

const { isAuthenticated } = useAuth();
const { isOnGalleryRoute, isOnOwnGallery, goToUserGallery } = useGallery();

type ModalType = 'login' | 'signup' | 'upload';

const modalVisibility = reactive<Record<ModalType, boolean>>({
  login: false,
  signup: false,
  upload: false,
});

function updateModalVisibility(modal: ModalType, value: boolean) {
  modalVisibility[modal] = value;
}

const showUploadButton = computed(() => {
  return isOnGalleryRoute.value && isOnOwnGallery.value;
});

const showGoToGalleryButton = computed(() => {
  return isAuthenticated.value && !isOnOwnGallery.value;
});

const showSignUpAndLoginButton = computed(() => {
  return !isAuthenticated.value;
});

const showLogoutButton = computed(() => {
  return isAuthenticated.value;
});

</script>

<style></style>