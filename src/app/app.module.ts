import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Component
import { AppComponent } from './app.component';
import { SidebarComponent } from './share/sidebar/sidebar.component';
import { HeaderComponent } from './share/header/header.component';
import { PopupComponent } from './wallet/components/popup/popup.component';

// Module
import { LoadingModule } from './loading/index';

const route = [
  {
    path: '',
    component: PopupComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule,
    LoadingModule,
    RouterModule.forRoot(route)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
