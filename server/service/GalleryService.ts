import { DeleteImageInputContext, EventExecutorData, UploadImageInputContext } from '../type';
import { uploadImageInputSchema } from '../schema';
import { GalleryRepository } from '../repository/GalleryRepository';
import { AuthRepository } from '../repository';

export class GalleryService {

  private static _instance: GalleryService;
  private galleryRepository: GalleryRepository;
  private authRepository: AuthRepository;

  private constructor() {
    GalleryService._instance = this;
    this.galleryRepository = GalleryRepository.getInstance();
    this.authRepository = AuthRepository.getInstance();
  }

  public static getInstance() {
    if (!GalleryService._instance) {
      new GalleryService();
    }

    return GalleryService._instance;
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

  async uploadImage(context: UploadImageInputContext) {
    return this.galleryRepository.uploadImage(context);
  }

  async deleteImage(context: DeleteImageInputContext) {
    return this.galleryRepository.deleteImage(context);
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

  async getImage(username: string, imageId: string) {
    return this.galleryRepository.getImage(username, imageId);
  }

}
