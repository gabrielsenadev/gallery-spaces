import { ImageFile } from "../type";

export type AddJWTTokenInputContext = {
  username: string;
  token: string;
};

export type GetDataInputContext = {
  username: string;
};

export type CreateUserInputRepositoryContext = {
  username: string;
  hash: string;
  imageUrl: string;
};

export type CheckInputContext = {
  username: string;
};

export type CreateJWTTokenInputContext = {
  username: string;
};

export type GenerateJWTTokenInputContext = {
  username: string;
};

export type CheckPasswordInputContext = {
  username: string;
  password: string;
};

export type CreateUserInputContext = {
  username: string;
  password: string;
  image: Blob | null;
};
