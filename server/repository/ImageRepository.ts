import { Store, getStore } from '@netlify/blobs';
import { DeleteImageInputContext, UploadImageInputContext } from '~/server/dto/image';
import { Repository } from './Repository';
import { ImageAlreadyExists } from '../error/ImageAlreadyExists';
import { ImageNotFound } from '../error/ImageNotFound';

export class ImageRepository extends Repository {

  private static _instance: ImageRepository;
  private store: Store;

  private constructor() {
    super();
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

  getImage(key: string) {
    return this.store.getWithMetadata(key, { type: 'blob' });
  }

  async uploadImage({
    description,
    image,
    title,
    key,
    overwrite
  }: UploadImageInputContext) {
    const storeImage = await this.getImage(key);

    if (!overwrite && storeImage) {
      throw new ImageAlreadyExists();
    }

    const buffer = await image.arrayBuffer();
    return this.store.set(key, buffer, {
      metadata: {
        title,
        description,
        type: image.type,
      },
    });
  }

  async deleteImage({
    key
  }: DeleteImageInputContext) {
    const storeImage = await this.getImage(key);

    if (!storeImage) {
      throw new ImageNotFound();
    }

    return this.store.delete(key);
  }
}
