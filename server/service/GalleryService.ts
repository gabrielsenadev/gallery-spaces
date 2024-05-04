import { DeleteImageInputContext, EventExecutorData, UploadImageInputContext } from '../type';
import { uploadImageInputSchema } from '../schema';
import { GalleryRepository } from '../repository/GalleryRepository';

export class GalleryService {

  private static _instance: GalleryService;
  private galleryRepository: GalleryRepository;

  private constructor() {
    GalleryService._instance = this;
    this.galleryRepository = GalleryRepository.getInstance();
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

  async getGalleryImages(username: string) {
    return this.galleryRepository.getUserGalleryImages(username);
  }

  async getGalleryImage(username: string, imageId: string) {
    return this.galleryRepository.getUserGalleryImage(username, imageId);
  }

}
