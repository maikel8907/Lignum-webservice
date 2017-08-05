import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  moduleId: module.id,
  selector: 'app-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.css']
})
export class SidebarComponent {
  private navbarItems = [
    {
      content: 'Portfolio',
      link: '/porfolio'
    },
    {
      content: 'Wallet',
      link: '/wallet'
    },
    {
      content: 'Exchange',
      link: '/exchange'
    },
    {
      content: 'Settings',
      link: '/settings'
    },
    {
      content: 'Helps',
      link: '/helps'
    }
  ];

  private ballance = {
    btc: 0,
    usd: 0
  };

  constructor(private store: Store<any>) {
    store.subscribe(({ device }) => {
      this.loadData(device);
    });
  }

  loadData(payload) {
    const {
      btc,
      usd
    } = payload.ballance;

    this.ballance.btc = btc;
    this.ballance.usd = usd;
  }
}
