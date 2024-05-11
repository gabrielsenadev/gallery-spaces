
async function deleteImage(imageId: string) {
  const header = await getUserTokenAuthorizationHeader();
  console.log('img', imageId);
  await $fetch(`/api/gallery/delete/${imageId}`, {
    method: "DELETE",
    headers: header,
  });

  return true;
}

async function uploadImage(form: FormData) {
  const header = await getUserTokenAuthorizationHeader();
  await $fetch("/api/gallery/upload", {
    body: form,
    method: "POST",
    headers: header,
  });
  return true;
}

export const useGallery = () => {
  const { user, isAuthenticated } = useAuth();
  const { name: routeName, params } = useRoute();
  const router = useRouter();

  const isOnGalleryRoute = computed(() => {
    return routeName === "gallery-view-gallery";
  });

  function goToUserGallery() {
    if (!isAuthenticated) {
      return;
    }
    router.push(`/gallery/view/${user.value!.username}`);
  }

  const isOnOwnGallery = computed(() => {
    if (!isAuthenticated.value || !isOnGalleryRoute.value) {
      return false;
    }

    const gallery = params["gallery"];
    if (!gallery || user.value?.username !== gallery) {
      return false;
    }

    return true;
  });

  return {
    deleteImage,
    uploadImage,
    isOnOwnGallery,
    goToUserGallery,
    isOnGalleryRoute,
  };
};
