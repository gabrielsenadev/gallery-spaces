<template>
  <header class="flex gap-3 justify-end p-8">
    <Button variant="outline" v-if="showSignUpAndLoginButton" @click="updateModalVisibility('login', true)">Login</Button>
    <Button variant="outline" v-if="showLogoutButton">Logout</Button>
    <Button variant="outline" v-if="showGoToGalleryButton" @click="goToUserGallery">My gallery</Button>
    <Button variant="primary" v-if="showSignUpAndLoginButton">Sign Up</Button>
    <Button variant="primary" v-if="showUploadButton">Upload</Button>
    <HeaderLoginModal @close="updateModalVisibility('login', false)" :is-open="modalVisibility.login"/>
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