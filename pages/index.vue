<template>
  <main class="bg-mainBg bg-cover h-full bg-center bg-black/40 bg-blend-darken flex flex-col overflow-auto">
    <ActionHeader />
    <main class="flex justify-center text-center flex-1 items-center flex-col gap-2 w-full">
      <h1 class="font-sans font-bold text-5xl text-white">
        Welcome to Gallery Spaces!
      </h1>
      <p class="font-sans font-normal text-gray text-xl">Create your own gallery and share to everyone. Join us and see
        your gallery below.</p>
      <HomeGalleryMarquee />
    </main>
    <NuxtLink href="https://unsplash.com/@heytowner" target="_blank" class="text-white/80">
      Wallpaper by John Towner on Unsplash
    </NuxtLink>
  </main>
</template>
