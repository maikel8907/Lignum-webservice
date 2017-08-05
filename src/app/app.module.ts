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

// Service
import { DeviceService } from './shared/service/device.service';

// Modules
const route = [
  {
    path: '',
    component: WalletComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    WalletComponent
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
