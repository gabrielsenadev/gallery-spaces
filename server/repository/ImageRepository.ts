import { Store, getStore } from '@netlify/blobs';
import { DeleteImageInputContext, UploadImageInputContext } from '~/server/dto/image';
import { ImageAlreadyExists } from '../error/ImageAlreadyExists';
import { ImageNotFound } from '../error/ImageNotFound';

export class ImageRepository {

  private static _instance: ImageRepository;
  private store: Store;

  private constructor() {
    ImageRepository._instance = this;

    const { netlifySiteId, netlifyToken } = useRuntimeConfig();

    this.store = getStore({
      name: 'image',
      siteID: netlifySiteId,
      token: netlifyToken,
    });
  }

  public static getInstance() {
    if (!ImageRepository._instance) {
      new ImageRepository();
    }

    return ImageRepository._instance;
  }

  get(key: string) {
    return this.store.getWithMetadata(key, { type: 'blob' });
  }

  async upload({
    image,
    key,
    overwrite
  }: UploadImageInputContext) {
    const storeImage = await this.get(key);

    if (!overwrite && storeImage) {
      throw new ImageAlreadyExists();
    }

    const buffer = await image.arrayBuffer();
    return this.store.set(key, buffer, {
      metadata: {
        type: image.type,
      },
    });
  }

  async delete({
    key
  }: DeleteImageInputContext) {
    const storeImage = await this.get(key);

    if (!storeImage) {
      throw new ImageNotFound();
    }

    return this.store.delete(key);
  }
}
