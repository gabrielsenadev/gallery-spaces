import { ImageFile } from "~/server/type";

export type UploadImageInputContext = {
  image: Blob;
  key: string;
  overwrite: boolean;
};

export type DeleteImageInputContext = {
  key: string;
};
