export class UserWithoutTokenError extends Error {

  constructor() {
    super('Please, login. You don\'t have a token.');
  }
}