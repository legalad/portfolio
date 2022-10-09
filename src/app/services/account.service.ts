import { Injectable } from '@angular/core';
import { Stock} from "./stock";

const defaultBalance: number = 10000;

@Injectable({
  providedIn: 'root'
})
export class AccountService {

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
    }
  }

  sell(index: number): void{

  }

  calculateValue(){
    this._value = this._stocks.map(stock => stock.price).reduce((a,b) => {return a + b}, 0);
  }

  private debit (amount: number, balance: number): number {
    return (balance * 100 - amount * 100) / 100;
  }
  private credit (amount: number, balance: number): number {
    return (balance * 100 + amount * 100) / 100;
  }

  constructor() { }
}
