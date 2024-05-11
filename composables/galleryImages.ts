import { type GalleryData } from "~/types/gallery";

const isLoading = ref(false);
const data = ref<GalleryData | null>(null);
const errorMessage = ref('');

export const useGalleryImages = () => {
  const route = useRoute();
  const { username } = route.params;

  async function fetchData() {
    try {
      if (!username) {
        errorMessage.value = 'Username is required';
        return;
      }
      errorMessage.value = '';
      isLoading.value = true;
      const response = await $fetch<{
        data: GalleryData
      }>(`/api/gallery/view/${username}`);
  
      data.value = response.data;
    } catch (error) {
      if (error instanceof Error) {
        errorMessage.value = error.message;
      }
    } finally {
      isLoading.value = false;
    }
  }

  return {
    data,
    fetchData,
    isLoading,
  };
}
