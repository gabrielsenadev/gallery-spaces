import { Store, getStore } from '@netlify/blobs';
import { UserNotFoundError } from '../error/UserNotFound';
import { User } from '../type';
import { getSeparator } from '../utils';

export type AddJWTTokenInputContext = {
  username: string;
  token: string;
};

export type GetPincodeHashInputContext = {
  username: string;
};

export type CreateUserInputContext = {
  username: string;
  pincodeHash: string;
};

export class AuthRepository {

  private static _instance: AuthRepository;
  private store: Store;

  private constructor() {
    AuthRepository._instance = this;

    const { netlifySiteId, netlifyToken } = useRuntimeConfig();
    
    this.store = getStore({
      name: 'auth',
      siteID: netlifySiteId,
      token: netlifyToken,
    });
  }

  public static getInstance() {
    if (!AuthRepository._instance) {
      new AuthRepository();
    }

    return AuthRepository._instance;
  }

  private createJWTTokenKey(username: string) {
    return `${username}${getSeparator()}token`;
  }

  private createUserKey(username: string) {
    return username;
  }

  addJWTToken({
    username,
    token
  }: AddJWTTokenInputContext) {
    return this.store.set(this.createJWTTokenKey(username), token);
  }

  async getPincodeHash({
    username
  }: GetPincodeHashInputContext) {
    const data = await this.getUser(username);
    if (!data) {
      throw new UserNotFoundError();
    }

    return data.pincode;
  }

  createUser({
    username,
    pincodeHash
  }: CreateUserInputContext) {
    const key = this.createUserKey(username);
    return this.store.setJSON(key, {
      name: key,
      pincode: pincodeHash,
    });
  }

  getUser(username: string) {
    return this.store.get(this.createUserKey(username), { type: 'json' }) as Promise<User>;
  }

  getUserToken(username: string) {
    return this.store.get(this.createJWTTokenKey(username));
  }

  deleteUserToken(username: string) {
    return this.store.delete(this.createJWTTokenKey(username));
  }
}
