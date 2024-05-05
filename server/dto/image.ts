import { ImageFile } from "~/server/type";

export type UploadImageInputContext = {
  image: ImageFile;
  key: string;
  title?: string;
  description?: string | null;
  overwrite: boolean;
};

export type DeleteImageInputContext = {
  key: string;
};
