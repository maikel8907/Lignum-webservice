import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// User defined component
import { LoadingComponent } from './loading.component';

@NgModule({
  declarations: [
    LoadingComponent
  ],
  imports: [
  ],
  exports: [
    LoadingComponent
  ],
  providers: []
})
export class LoadingModule { }
