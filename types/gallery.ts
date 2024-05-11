export type GalleryImage = {
  description: string;
  imageUrl: string;
  title: string;
  id: string;
};

export type Gallery = {
  username: string;
  profileImageUrl: string;
};

export type GalleryData = {
  images: GalleryImage[];
};
