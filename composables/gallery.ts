import type { Gallery, GalleryData } from "~/types/gallery";


async function deleteImage(imageId: string) {
  const header = await getUserTokenAuthorizationHeader();
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

const data = ref<Gallery| null>(null);
const isLoading = ref(false);
const errorMessage = ref('');

export const useGallery = () => {
  const { user, isAuthenticated } = useAuth();
  const { name: routeName, params: { username } } = useRoute();
  const router = useRouter();

  async function fetchData() {
    if (!username) {
      return;
    }

    try {
      const response = await $fetch<{
        data: {
          username: string;
          profileImageUrl: string;
        };
        success: boolean;
      }>(`/api/user/view/${username}`);

      data.value = response.data;
    } catch (error) {
      if (error instanceof Error) {
        errorMessage.value = error.message;
      }
    } finally {
      isLoading.value = false;
    }
  };

  const isOnGalleryRoute = computed(() => {
    return routeName === "gallery-view-username";
  });

  const isOnOwnGallery = computed(() => {
    if (!isAuthenticated.value || !isOnGalleryRoute.value) {
      return false;
    }
    
    if (!username || user.value?.username !== username) {
      return false;
    }

    return true;
  });

  return {
    data,
    isLoading,
    fetchData,
    deleteImage,
    uploadImage,
    isOnOwnGallery,
    isOnGalleryRoute,
  };
};
