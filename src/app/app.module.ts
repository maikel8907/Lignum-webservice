import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { NavbarComponent } from './share/navbar/navbar.component';
import { HeaderComponent } from './share/header/header.component';
import { WalletComponent } from './component/wallet/wallet.component';
import { PopupComponent } from './share/popup/popup.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WalletComponent,
    NavbarComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: 'wallet',
        component: WalletComponent
      },
      {
        path: '',
        redirectTo: '/wallet',
        pathMatch: 'full'
      }
    ]),
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
