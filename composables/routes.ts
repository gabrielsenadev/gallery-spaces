export const useRoutes = () => {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();

  const goToHome = () => router.push('/');

  function goToUserGallery() {
    if (!isAuthenticated) {
      return;
    }

    router.push(`/gallery/view/${user.value!.username}`);
  }

  return {
    goToHome,
    goToUserGallery,
  }
}
