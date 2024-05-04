import { Store } from '@netlify/blobs';
import jwt from 'jsonwebtoken';
import { AuthRepository } from '../repository/';
import bcrypt from 'bcrypt';

export type CheckInputContext = {
  gallery: string;
};

export type CreateJWTTokenInputContext = {
  gallery: string;
};

export type GenerateJWTTokenInputContext = {
  gallery: string;
};

export type CheckPasswordInputContext = {
  gallery: string;
  pincode: string;
}

export type CreateGalleryInputContext = {
  gallery: string;
  pincode: string;
}

export class AuthService {

  private static _instance: AuthService;
  private authRepository: AuthRepository;

  private constructor() {
    AuthService._instance = this;
    this.authRepository = AuthRepository.getInstance();
  }

  public static getInstance() {
    if (!AuthService._instance) {
      new AuthService();
    }

    return AuthService._instance;
  }

  createJWTToken({
    gallery,
  }: CreateJWTTokenInputContext) {
    const { authTokenSecret } = useRuntimeConfig();

    const token = jwt.sign({
      gallery,
    }, authTokenSecret, {
      expiresIn: 60 * 60 * 24,
    });

    return token;
  }

  async generateJWTToken({
    gallery
  }: GenerateJWTTokenInputContext) {
    const token = this.createJWTToken({ gallery });

    await this.authRepository.addJWTToken({
      gallery, token
    });

    return token;
  }

  async checkPassword({
    gallery,
    pincode
  }: CheckPasswordInputContext) {
    const hash = await this.authRepository.getPincodeHash({ gallery });

    if (!hash) {
      return false;
    }

    return bcrypt.compareSync(pincode, hash);
  }

  createGallery({
    gallery,
    pincode
  }: CreateGalleryInputContext) {
    const { pincodeSalt } = useRuntimeConfig();
    const pincodeHash = bcrypt.hashSync(pincode, pincodeSalt);
    return this.authRepository.createGallery({
      gallery,
      pincodeHash,
    });
  }

  async checkGallery({ gallery }: CheckInputContext) {
    const galleryData = await this.authRepository.getGallery(gallery);
    return !!galleryData;
  }
}
