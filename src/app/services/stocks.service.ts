import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Stock } from "./stock";

@Injectable()
export class StocksService {
  constructor(private http: HttpClient) { }
  getStocks() {
    return this.http.get<Array<Stock>>(ConfigService.prototype.api);
  }
}
