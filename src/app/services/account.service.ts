import { Injectable } from '@angular/core';
import { Stock} from "./stock";
import { LocalStorageService } from "./local-storage.service";
import { AlertService } from "./alert.service";
import { CurrencyPipe } from "@angular/common";

const defaultBalance: number = 10000;

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private localStorageService: LocalStorageService, private alertService: AlertService, private currencyPipe: CurrencyPipe) {}

  private _balance: number = defaultBalance;
  private _value: number = 0;
  private _cost: number = 0;
  private _stocks: Stock[] = [];

  get stocks(): Stock[] {
    return this._stocks;
  }
  get cost(): number {
    return this._cost;
  }
  get value(): number {
    return this._value;
  }
  get balance(): number {
    return this._balance;
  }

  reset() {
    this._stocks = [];
    this._balance = defaultBalance;
    this._value = this._cost = 0;
    this.cacheValues();
  }

  purchase(stock: Stock): void{
    stock = Object.assign({}, stock);
    if (stock.price < this.balance){
      this._balance = this.debit(stock.price, this.balance);
      stock.cost = stock.price;
      this._cost = this.credit(stock.price, this.cost);
      stock.change = 0;
      this._stocks.push(stock);
      this.calculateValue();
      this.cacheValues();
      this.alertService.alert(`You bought ${stock.symbol} for` + this.currencyPipe.transform(stock.price, 'USD', true, '2'), 'success');
    }
    else {
      this.alertService.alert(`You have insufficient funds to buy ${stock.symbol}`, 'danger');
    }
  }

  sell(index: number): void {
    let stock = this.stocks[index];
    if (stock) {
      this._balance = this.credit(stock.price, this.balance);
      this._stocks.splice(index, 1);
      this._cost = this.debit(stock.cost, this.cost);
      this.calculateValue();
      this.cacheValues();
      this.alertService.alert(`You sold ${stock.symbol} for ` + this.currencyPipe.
      transform(stock.price, 'USD', true, '.2'), 'success');
    }
    else {
      this.alertService.alert(`You do not own the ${stock} stock.`, 'danger'); //zle dodac symbol
    }
  }

  calculateValue(){
    this._value = this._stocks.map(stock => stock.price).reduce((a,b) => {return a + b}, 0);
  }

  init (){
    this._stocks = this.localStorageService.get('stocks', []);
    this._balance = this.localStorageService.get('balance', defaultBalance);
    this._cost = this.localStorageService.get('cost', this.cost);
  }

  private cacheValues() {
    this.localStorageService.set('stocks', this.stocks);
    this.localStorageService.set('balance', this.balance);
    this.localStorageService.set('cost', this.cost);
  }

  private debit (amount: number, balance: number): number {
    return (balance * 100 - amount * 100) / 100;
  }
  private credit (amount: number, balance: number): number {
    return (balance * 100 + amount * 100) / 100;
  }
}
