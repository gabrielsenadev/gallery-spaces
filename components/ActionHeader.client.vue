<template>
  <header class="flex gap-3 justify-end p-8">
    <Button variant="outline" v-if="isOnGalleryRoute" @click="goToHome">Home</Button>
    <Button variant="outline" v-if="showSignUpAndLoginButton"
      @click="updateModalVisibility('login', true)">Login</Button>
    <Button variant="outline" v-if="showLogoutButton" @click="onLogout">Logout</Button>
    <Button variant="outline" v-if="showGoToGalleryButton" @click="goToUserGallery">My gallery</Button>
    <Button variant="primary" v-if="showSignUpAndLoginButton" @click="updateModalVisibility('signup', true)">Sign
      Up</Button>
    <Button variant="primary" v-if="showUploadButton" @click="updateModalVisibility('upload', true)">Upload</Button>
    <HeaderLoginModal @close="updateModalVisibility('login', false)" :is-open="modalVisibility.login" />
    <HeaderSignUpModal @close="updateModalVisibility('signup', false)" :is-open="modalVisibility.signup" />
    <HeaderUploadImageModal @close="updateModalVisibility('upload', false)" :is-open="modalVisibility.upload" />
  </header>
</template>

<script lang="ts" setup>

const { isAuthenticated, logout } = useAuth();
const { goToHome, goToUserGallery } = useRoutes();
const { isOnGalleryRoute, isOnOwnGallery } = useGallery();

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

const onLogout = () => {
  logout().then(() => {
    goToHome();
  });
};

</script>

<style></style>