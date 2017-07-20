import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// User defined component
import { PopupComponent } from './components/popup/popup.component';

@NgModule({
  declarations: [
    PopupComponent
  ],
  imports: [
    BrowserModule,
  ],
  exports: [
    PopupComponent
  ],
  providers: []
})
export class WalletModule { }
