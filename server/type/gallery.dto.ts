export type UploadImageInputContext = {
  image: File;
  title: string;
  username: string;
  description?: string | null;
};

export type DeleteImageInputContext = {
  image: string;
  username: string;
};
