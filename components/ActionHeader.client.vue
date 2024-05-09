<template>
  <header class="flex gap-3 justify-end p-8">
    <Button variant="outline" text="Login" v-if="showSignUpAndLoginButton"/>
    <Button variant="outline" text="Go to gallery" v-if="showGoToGalleryButton"/>
    <Button variant="primary" text="Sign Up" v-if="showSignUpAndLoginButton" />
    <Button variant="primary" text="Upload" v-if="showUploadButton"/>
    <HeaderLoginModal />
  </header>
</template>

<script lang="ts" setup>

const { isAuthenticated } = useAuth();
const { isOnGalleryRoute, isOnOwnGallery } = useGallery();

const showUploadButton = computed(() => {
  return isOnGalleryRoute.value && isOnOwnGallery.value;
});

const showGoToGalleryButton = computed(() => {
  return isAuthenticated.value && !isOnGalleryRoute.value;
});

const showSignUpAndLoginButton = computed(() => {
  return !isAuthenticated.value;
});

</script>

<style></style>