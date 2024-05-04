import { Store, getStore } from '@netlify/blobs';
import jwt from 'jsonwebtoken';

export type AddJWTTokenInputContext = {
  gallery: string;
  token: string;
};

export type GetPincodeHashInputContext = {
  gallery: string;
};

export type CreateGalleryInputContext = {
  gallery: string;
  pincodeHash: string;
};

export class AuthRepository {

  private static _instance: AuthRepository;
  private store: Store;

  private constructor() {
    AuthRepository._instance = this;
    this.store = getStore('auth');
  }

  public static getInstance() {
    if (!AuthRepository._instance) {
      new AuthRepository();
    }

    return AuthRepository._instance;
  }

  private createJWTTokenKey(gallery: string) {
    return `${gallery}:token`;
  }

  private createGalleryKey(gallery: string) {
    return gallery;
  }

  addJWTToken({
    gallery,
    token
  }: AddJWTTokenInputContext) {
    return this.store.set(this.createJWTTokenKey(gallery), token);
  }

  async getPincodeHash({
    gallery
  }: GetPincodeHashInputContext) {
    const data = await this.store.getMetadata(gallery);
    if (!data) {
      throw new Error('Gallery metadata not found.');
    }
    return data.metadata.pincode as string;
  }

  createGallery({
    gallery,
    pincodeHash
  }: CreateGalleryInputContext) {
    const key = this.createGalleryKey(gallery);
    return this.store.set(key, key, {
      metadata: {
        pincode: pincodeHash, 
      },
    });
  }

  getGallery(gallery: string) {
    return this.store.get(this.createGalleryKey(gallery));
  }
}
