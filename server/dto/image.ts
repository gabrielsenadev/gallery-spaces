import { ImageFile } from "~/server/type";

export type UploadImageInputContext = {
  image: ImageFile;
  key: string;
  overwrite: boolean;
};

export type DeleteImageInputContext = {
  key: string;
};
