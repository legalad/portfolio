import { Component, OnInit, OnDestroy } from '@angular/core';
import {AccountService} from "./services/account.service";
import { StocksService } from './services/stocks.service';
import { Stock } from "./services/stock";
import { AlertService } from "./services/alert.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [StocksService]
})
export class AppComponent implements OnInit, OnDestroy{

  refresh: boolean = true;
  stocks: Stock[] = [];
  interval: any;

  constructor(public accountService: AccountService, private stocksService: StocksService, private alertService: AlertService) {}
  title = 'portfolio';

  ngOnInit() {
    this.accountService.init();
    this.load();
    this.interval = setInterval(() => {
      if (this.refresh) {
        this.load();
      }
    }, 15000);
  }
  toggleRefresh(): void {
    this.refresh = !this.refresh;
    let onOff = (this.refresh) ? 'on' : 'off';
    this.alertService.alert(`You toggle auto-refresh ${onOff}`, 'info', 0);
  }
  ngOnDestroy() {
    clearInterval(this.interval);
  }
  reset(): void {
    this.accountService.reset();
    this.alertService.alert(`Your wallet have been reset!`);
  }
  private load() {
    this.stocksService.getStocks().subscribe(stocks => {
      this.stocks = stocks;
    }, error => {
      console.error(`There was an error loading stocks: ${error}`);
    });
  }
}
