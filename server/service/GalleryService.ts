import { UploadImageInputContext, DeleteImageInputContext } from '~/server/dto/gallery'
import { uploadImageInputSchema } from '~/server/schema';
import { AuthRepository, ImageRepository, GalleryRepository } from '~/server/repository';
import { getSeparator } from '~/server/utils/environment';
import { v4 } from 'uuid';
import { EventExecutorData } from '~/server/type';

export class GalleryService {

  private static _instance: GalleryService;
  private galleryRepository: GalleryRepository;
  private authRepository: AuthRepository;
  private imageRepository: ImageRepository;

  private constructor() {
    GalleryService._instance = this;
    this.galleryRepository = GalleryRepository.getInstance();
    this.authRepository = AuthRepository.getInstance();
    this.imageRepository = ImageRepository.getInstance();
  }

  public static getInstance() {
    if (!GalleryService._instance) {
      new GalleryService();
    }

    return GalleryService._instance;
  }

  private createGalleryImageKey(username: string, key: string) {
    return `${username}${getSeparator()}${key}`;
  }

  async getUploadRequestInput(event: EventExecutorData) {
    const formData = await readFormData(event);

    const dirtyInput = {
      image: formData.get('image'),
      title: formData.get('title'),
      description: formData.get('description'),
    };

    return uploadImageInputSchema.safeParse(dirtyInput);
  }

  async uploadImage({ username, description, image, title }: UploadImageInputContext) {
    try {
      const imageKey = v4().substring(0, 12);
      const key = this.createGalleryImageKey(username, imageKey);

      await this.imageRepository.upload({
        image,
        key,
        overwrite: false,
      });

      const imageUrl = `/api/image/view?key=${key}`;

      await this.galleryRepository.setImageGallery({
        description,
        imageUrl,
        key,
        title,
      });

      return true;
    } catch (error) {
      console.error('Unhandled error ', error);
      return false;
    }
  }

  async deleteImage(context: DeleteImageInputContext) {
    const key = this.createGalleryImageKey(context.username, context.image);
    return this.imageRepository.delete({ key });
  }

  async getImages(username: string) {
    try {
      const user = await this.authRepository.getUser(username);

      if (!user) {
        return null;
      }

      return this.galleryRepository.getImages(username);
    } catch (error) {
      console.log('Unhandled error', error);
      return null;
    }
  }

  async getGalleries() {
    try {
      return this.galleryRepository.getGalleries();
    } catch (error) {
      console.log('Unhandled error', error);
      return null;
    }
  }

}
