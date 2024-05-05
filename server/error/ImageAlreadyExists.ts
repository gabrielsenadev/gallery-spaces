export class ImageAlreadyExists extends Error {
  constructor() {
    super('Image already exists.');
  }
}
