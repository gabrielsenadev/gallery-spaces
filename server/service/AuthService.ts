import jwt from 'jsonwebtoken';
import { AuthRepository, ImageRepository } from '../repository';
import bcrypt from 'bcryptjs';
import { InvalidUserToken } from '../error/InvalidUserToken';
import { UserNotFoundError } from '../error/UserNotFound';
import { getSeparator } from '../utils';
import { UserCreationFailed } from '../error/UserCreationFailed';
import { CheckInputContext, CheckPasswordInputContext, CreateJWTTokenInputContext, CreateUserInputContext, GenerateJWTTokenInputContext, GetDataInputContext } from '~/server/dto/auth';

export class AuthService {

  private static _instance: AuthService;
  private authRepository: AuthRepository;
  private imageRepository: ImageRepository;

  private constructor() {
    AuthService._instance = this;
    this.authRepository = AuthRepository.getInstance();
    this.imageRepository = ImageRepository.getInstance();
  }

  public static getInstance() {
    if (!AuthService._instance) {
      new AuthService();
    }

    return AuthService._instance;
  }

  createJWTToken({
    username,
  }: CreateJWTTokenInputContext) {
    const { authTokenSecret } = useRuntimeConfig();

    const token = jwt.sign({
      username,
    }, authTokenSecret, {
      expiresIn: 60 * 60 * 24,
    });

    return token;
  }

  async generateJWTToken({
    username,
  }: GenerateJWTTokenInputContext) {
    const token = this.createJWTToken({ username });

    await this.authRepository.addJWTToken({
      username,
      token
    });

    return token;
  }

  async checkPassword({
    username,
    password
  }: CheckPasswordInputContext) {
    const hash = await this.authRepository.getPassword({ username });

    if (!hash) {
      return false;
    }

    return bcrypt.compareSync(password, hash);
  }

  createUserImageKey(username: string) {
    return `${username}${getSeparator()}profileImage`;
  }

  async getProfileImage({
    username
  }: GetDataInputContext) {
    return this.authRepository.getProfileImage({ username });
  }

  async createUser({
    username,
    password,
    image
  }: CreateUserInputContext) {
    try {
      const { passwordSalt } = useRuntimeConfig();
      const passwordHash = bcrypt.hashSync(password, passwordSalt);
      let imageUrl = '/api/image/view/default';
      const imageKey = this.createUserImageKey(username);

      if (image) {
        await this.imageRepository.upload({
          image,
          key: imageKey,
          overwrite: true,
        });
        imageUrl = `/api/image/view/${imageKey}`;
      }

      await this.authRepository.createUser({
        username,
        hash: passwordHash,
        imageUrl,
      });
    } catch (error) {
      console.log('Unhandled error', error);
      throw new UserCreationFailed();
    }
  }

  async checkUser({ username }: CheckInputContext) {
    const usernameData = await this.authRepository.getUser(username);
    return !!usernameData;
  }

  async getUserByToken(token: string) {
    const { authTokenSecret } = useRuntimeConfig();
    try {
      const user = await jwt.verify(token, authTokenSecret);
      if (typeof user !== 'object' || !user?.username) {
        throw new InvalidUserToken();
      }

      const userDataToken = await this.authRepository.getUserToken(user.username);

      if (!userDataToken) {
        throw new UserNotFoundError();
      }

      if (userDataToken !== token) {
        throw new InvalidUserToken();
      }
      return user;
    } catch (error) {
      console.error('Login verification failed', error);
      return false;
    }
  }

  logoutUser(username: string) {
    return this.authRepository.deleteUserToken(username);
  }
}
