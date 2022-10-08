import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'portfolio';

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }

  toggleRefresh(): void {

  }

  reset(): void {

  }

  private load(): void {

  }
}
