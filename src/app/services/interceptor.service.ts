import { Injectable } from '@angular/core';
import { Observable} from "rxjs";
import { HttpEvent, HttpInterceptor, HttpResponse, HttpHandler, HttpRequest }
  from '@angular/common/http';
import { AccountService } from './account.service';
import { Stock } from "./stock";
import { ConfigService } from './config.service';
import {tap} from "rxjs";
@Injectable()
export class StocksInterceptor implements HttpInterceptor {
  constructor(private accountService: AccountService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    const request = req.clone();
    request.headers.append('Accept', 'application/json');
    return next.handle(request).pipe(tap(event => {
      if (event instanceof HttpResponse) console.error("event to jest");
      if (event instanceof HttpResponse && event.url == "https://angular-in-action-portfolio.firebaseio.com/stocks.json") {
        const stocks = event.body as Array<Stock>;
        let  symbols = this.accountService.stocks.map(stock => stock.symbol);
        stocks.forEach(stock => {
          this.accountService.stocks.map(item => {
            if (stock.symbol === item.symbol) {
              item.price = stock.price;
              item.change = ((stock.price * 100) - (item.cost * 100)) / 100;
            }
          });
        });
        this.accountService.calculateValue();
        return stocks;
      }
      else { throw new Error('Data update error');}
    }));
  }
}
