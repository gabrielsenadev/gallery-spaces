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
    isOnGalleryRoute,
    isOnOwnGallery,
    goToUserGallery,
  };
};
