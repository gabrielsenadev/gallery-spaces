export class InvalidUserToken extends Error {
  constructor() {
    super('Invalid User Token');
  }
}
