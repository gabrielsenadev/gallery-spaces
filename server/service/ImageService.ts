import { DeleteImageInputContext, UploadImageInputContext } from '~/server/dto/image';
import { ImageRepository } from '../repository/ImageRepository';

export class ImageService {

  private static _instance: ImageService;
  private imageRepository: ImageRepository;

  private constructor() {
    ImageService._instance = this;
    this.imageRepository = ImageRepository.getInstance();
  }

  public static getInstance() {
    if (!ImageService._instance) {
      new ImageService();
    }

    return ImageService._instance;
  }

  async uploadImage(context: UploadImageInputContext) {
    return this.imageRepository.uploadImage(context);
  }

  async deleteImage(context: DeleteImageInputContext) {
    return this.imageRepository.deleteImage(context);
  }

  async getImage(key: string) {
    return this.imageRepository.getImage(key);
  }

}
