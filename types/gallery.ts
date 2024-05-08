export type GalleryImage = {
  description: string;
  imageUrl: string;
  title: string;
  id: string;
};

export type GalleryData = {
  user: {
    username: string;
    profileImageUrl: string;
  };
  images: GalleryImage[];
};
