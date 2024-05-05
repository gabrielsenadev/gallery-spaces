import { Store, getStore } from '@netlify/blobs';
import { SetImageGalleryInputContext, DeleteImageInputContext, UploadImageInputContext } from '~/server/dto/gallery';
import { Repository } from './Repository';
import { v4 as uuidv4 } from 'uuid';
import { ImageGallery } from '../type';

export type GetPincodeHashInputContext = {
  username: string;
};

export type CreateUserInputContext = {
  username: string;
  pincodeHash: string;
};

export class GalleryRepository extends Repository {

  private static _instance: GalleryRepository;
  private store: Store;

  private constructor() {
    super();
    GalleryRepository._instance = this;

    const { netlifySiteId, netlifyToken } = useRuntimeConfig();

    this.store = getStore({
      name: 'gallery',
      siteID: netlifySiteId,
      token: netlifyToken,
    });
  }

  public static getInstance() {
    if (!GalleryRepository._instance) {
      new GalleryRepository();
    }

    return GalleryRepository._instance;
  }

  private createImageKey(username: string, imageId: string) {
    return `${username}${this.separator}${imageId}`;
  }

  async setImageGallery({
    description,
    imageUrl,
    key,
    title
  }: SetImageGalleryInputContext) {
    return this.store.setJSON(key, {
      description,
      imageUrl,
      title,
    });
  }

  async deleteImage({
    image,
    username
  }: DeleteImageInputContext) {
    const key = this.createImageKey(username, image);
    return this.store.delete(key);
  }

  async getImages(username: string) {
    const images = await this.store.list({
      prefix: username,
    });

    return Promise.all(images.blobs.map(async ({ key }) => {
      return (await this.store.get(key)) as unknown as ImageGallery;
    }));
  }

  async getGalleries() {
    const galleries = await this.store.list({
      directories: true,
    });

    return galleries.directories.map(gallery => {
      return {
        gallery,
        url: `/api/gallery/view/${gallery}`,
      };
    });
  }
}
