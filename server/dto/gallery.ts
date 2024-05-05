import { ImageFile } from "../type";

export type UploadImageInputContext = {
  username: string;
  title: string;
  description: string;
  image: ImageFile;
};

export type SetImageGalleryInputContext = {
  imageUrl: string;
  title: string;
  description: string;
  key: string;
  imageId: string;
};

export type DeleteImageInputContext = {
  username: string;
  image: string;
};
