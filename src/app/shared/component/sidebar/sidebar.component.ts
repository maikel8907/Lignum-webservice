import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as stateAction from '../../../core/store/state/actions';

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
      link: '/portfolio'
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

  private subNavbarItems = [
    {
      content: 'graphics'
    },
    {
      content: 'chart'
    }
  ];

  private ballance = {
    btc: 0,
    usd: 0
  };

  private sidebarActiveItem = 'wallet';
  private subSidebarActiveItem = 'graphics';

  constructor(
    private store: Store<any>,
    private router: Router
  ) {
    router.events.subscribe((currentRoute: any) => {
      this.store.dispatch(stateAction.setSubSidebarActiveItem(currentRoute.url.substr(1)));
      console.log(currentRoute.url.substr(1));
    });

    store.subscribe(({ device, state }) => {
      this.loadDeviceData(device);
      this.loadStateData(state);
      console.log(this.sidebarActiveItem);
    });
  }

  loadDeviceData(payload) {
    const {
      btc,
      usd
    } = payload.ballance;

    this.ballance.btc = btc;
    this.ballance.usd = usd;
  }

  loadStateData(payload) {
    const {
      sidebarActiveItem,
      subSidebarActiveItem
    } = payload;

    this.sidebarActiveItem = sidebarActiveItem;
    this.subSidebarActiveItem = subSidebarActiveItem;
  }

  setSidebarActiveItem(item: string) {
    const _item = item.toLowerCase();
    this.store.dispatch(stateAction.setSidebarActiveItem(_item));
  }
}
