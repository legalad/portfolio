import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ClarityModule } from "@clr/angular";
import { AppComponent } from './app.component';
import { InvestmentsComponent } from './investments/investments.component';
import { StocksComponent } from './stocks/stocks.component';
import { AlertComponent } from './alert/alert.component';
import { TickerComponent } from './ticker/ticker.component';
import {LocalStorageService} from "./services/local-storage.service";
import {CurrencyPipe} from "@angular/common";
import {AccountService} from "./services/account.service";

@NgModule({
  declarations: [
    AppComponent,
    InvestmentsComponent,
    StocksComponent,
    AlertComponent,
    TickerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule
  ],
  providers: [ LocalStorageService,
                CurrencyPipe,
                AccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }
