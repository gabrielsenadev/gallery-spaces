export const useGallery = () => {
  const { user, isAuthenticated } = useAuth();
  const { name: routeName, params } = useRoute();

  const isOnGalleryRoute = computed(() => {
    return routeName === "gallery-view-gallery";
  });

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
    isOnGalleryRoute,
    isOnOwnGallery,
  };
};
