import { Store, getStore } from '@netlify/blobs';
import { SetImageGalleryInputContext, DeleteImageInputContext, UploadImageInputContext } from '~/server/dto/gallery';
import { Repository } from './Repository';
import { v4 as uuidv4 } from 'uuid';

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

  async uploadImage({
    description,
    title,
    username
  }: UploadImageInputContext) {
    this.store.setJSON();
    const imageId = uuidv4().substring(0, 12);
    const key = this.createImageKey(username, imageId);
    const buffer = await image.arrayBuffer();
    return this.store.set(key, buffer, {
      metadata: {
        title,
        description,
        type: image.type,
      },
    });
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
    const imagesIds = await this.store.list({
      prefix: username,
    });

    const result = await Promise.all(imagesIds.blobs.map(async ({ key }) => {
      const metadata = await this.store.getMetadata(key);
      const [, imageKey] = key.split(this.separator);
      return {
        imageUrl: `/api/gallery/view/${username}/${imageKey}`,
        title: metadata?.metadata.title,
        description: metadata?.metadata.description,
      };
    }));

    return result;
  }

  async getImage(username: string, imageId: string) {
    const key = this.createImageKey(username, imageId);
    return this.store.getWithMetadata(key, {
      type: 'blob',
    });
  }
}
