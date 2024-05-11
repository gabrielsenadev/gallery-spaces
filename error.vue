<template>
  <main class="flex flex-col justify-center items-center gap-4">
    <h2 class="text-3xl">Sorry, something is wrong...</h2>
    <p> {{ error?.message }}</p>
    <Button :is-dark="false" variant="primary" @click="goToHome">Go to Home</Button>
  </main>
</template>

<script setup lang="ts">

const error = useError();
const { goToHome } = useRoutes();

</script>