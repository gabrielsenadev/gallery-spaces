import { Store, getStore } from '@netlify/blobs';
import { SetImageGalleryInputContext, DeleteImageInputContext } from '~/server/dto/gallery';
import { ImageGallery } from '../type';
import { getSeparator } from '../utils';

export class GalleryRepository {

  private static _instance: GalleryRepository;
  private store: Store;

  private constructor() {
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
    return `${username}${getSeparator()}${imageId}`;
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
