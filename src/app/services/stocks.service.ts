import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Stock } from "./stock";

@Injectable({
  providedIn: 'root'})
export class StocksService {
  constructor(private http: HttpClient) { }
  getStocks() {
    return this.http.get<Array<Stock>>("https://angular-in-action-portfolio.firebaseio.com/stocks.json");
  }
}
