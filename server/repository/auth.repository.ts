import { Store, getStore } from '@netlify/blobs';
import jwt from 'jsonwebtoken';

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
    this.store = getStore('auth');
  }

  public static getInstance() {
    if (!AuthRepository._instance) {
      new AuthRepository();
    }

    return AuthRepository._instance;
  }

  private createJWTTokenKey(username: string) {
    return `${username}:token`;
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
      throw new Error('User pincode not found.');
    }

    return data;
  }

  createUser({
    username,
    pincodeHash
  }: CreateUserInputContext) {
    const key = this.createUserKey(username);
    return this.store.setJSON(key, {
      name: key,
      imageKey: `${key}:image`,
      pincode: pincodeHash,
    });
  }

  getUser(username: string) {
    return this.store.get(this.createUserKey(username));
  }
}
