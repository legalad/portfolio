 export class ConfigService {
   private _api!: string ;

   public get api(): string {
     return this._api;
   }

   public set api(value: string) {
     this._api = value;
   }

}
