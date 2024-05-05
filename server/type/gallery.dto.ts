import { ImageFile } from ".";

export type UploadImageInputContext = {
  image: ImageFile;
  title: string;
  username: string;
  description?: string | null;
};

export type DeleteImageInputContext = {
  image: string;
  username: string;
};
