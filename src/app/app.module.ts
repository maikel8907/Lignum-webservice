import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

// Redux store
import { store } from './core/store';

// Component
import { AppComponent } from './app.component';
import { SidebarComponent } from './shared/component/sidebar/sidebar.component';
import { WalletComponent } from './core/component/wallet/wallet.component';
import { PortfolioComponent } from './core/component/portfolio/portfolio.component';
import { ExchangeComponent } from './core/component/exchange/exchange.component';

// Service
import { DeviceService } from './shared/service/device.service';

// Modules
const route = [
  {
    path: 'wallet',
    component: WalletComponent
  },
  {
    path: 'portfolio',
    component: PortfolioComponent
  },
  {
    path: 'exchange',
    component: ExchangeComponent
  },
  {
    path: '',
    redirectTo: 'wallet',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    WalletComponent,
    PortfolioComponent,
    ExchangeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(route),
    StoreModule.forRoot(store)
  ],
  providers: [DeviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
