import { Store } from '@netlify/blobs';
import jwt from 'jsonwebtoken';
import { AuthRepository } from '../repository/';
import bcrypt from 'bcrypt';

export type CheckInputContext = {
  username: string;
};

export type CreateJWTTokenInputContext = {
  username: string;
};

export type GenerateJWTTokenInputContext = {
  username: string;
};

export type CheckPasswordInputContext = {
  username: string;
  pincode: string;
}

export type CreateUserInputContext = {
  username: string;
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
    username
  }: GenerateJWTTokenInputContext) {
    const token = this.createJWTToken({ username });

    await this.authRepository.addJWTToken({
      username, token
    });

    return token;
  }

  async checkPassword({
    username,
    pincode
  }: CheckPasswordInputContext) {
    const hash = await this.authRepository.getPincodeHash({ username });

    if (!hash) {
      return false;
    }

    return bcrypt.compareSync(pincode, hash);
  }

  createUser({
    username,
    pincode
  }: CreateUserInputContext) {
    const { pincodeSalt } = useRuntimeConfig();
    const pincodeHash = bcrypt.hashSync(pincode, pincodeSalt);
    return this.authRepository.createUser({
      username,
      pincodeHash,
    });
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
        throw Error('Invalid User Token.');
      }

      const userData = await this.authRepository.getUserToken(user.username);

      if (!userData) {
        throw Error('User not found.');
      }
      return user;
    } catch (error) {
      console.error('Login verification failed', error);
      return false;
    }
  }
}
