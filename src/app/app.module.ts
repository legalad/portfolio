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
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {StocksInterceptor} from "./services/interceptor.service";
import { AlertService } from "./services/alert.service";
import {StocksService} from "./services/stocks.service";


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
    ClarityModule,
    HttpClientModule
  ],
  providers: [ LocalStorageService,
                CurrencyPipe,
                AccountService,
                AlertService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: StocksInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
