let _storage: any = {};
const limit = 100;
export class CacheHelper {
  static get(key: string) {
    return _storage[key];
  }
  static set(key: string, value: any) {
    const keys = Object.keys(_storage);
    if (keys.length == limit) {
      this.remove(keys[0]);
    }
    return (_storage[key] = value);
  }
  static remove(key: string) {
    delete _storage[key];
  }
  static clear() {
    _storage = {};
  }
}
