export class Repository {
  protected separator: string = ':';

  constructor() {
    const { storeKeySeparator } = useRuntimeConfig();
    this.separator = storeKeySeparator;
  }
}