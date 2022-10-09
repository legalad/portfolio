export class ConfigService {
  private _api!: string;
  static set(property: string, value: string) {
    // @ts-ignore
    this['_' + property] = value;
  }
  static get(property: string) {
    // @ts-ignore
    return this['_' + property];
  }
}
