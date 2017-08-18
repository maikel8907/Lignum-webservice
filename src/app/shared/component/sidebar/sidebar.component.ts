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
  private sidebarItems = [
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

  private subSidebarItems = [
    {
      content: 'graphics'
    },
    {
      content: 'chart'
    }
  ];

  private isConnect = false;

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
      const _currentRoute = currentRoute;

      if (_currentRoute.url === '/') {
        _currentRoute.url = '/wallet';
      }

      this.store.dispatch(stateAction.setSidebarActiveItem(currentRoute.url.substr(1)));
    });

    store.subscribe(({ device, state }) => {
      this.loadDeviceData(device);
      this.loadStateData(state);
    });
  }

  loadDeviceData(payload) {
    const {
      btc,
      usd
    } = payload.ballance;

    const {
      isConnect
    } = payload;

    this.ballance.btc = btc;
    this.ballance.usd = usd;
    this.isConnect = isConnect;
  }

  loadStateData(payload) {
    const {
      sidebarActiveItem,
      subSidebarActiveItem,
      subSidebarItems
    } = payload;

    this.sidebarActiveItem = sidebarActiveItem;
    this.subSidebarActiveItem = subSidebarActiveItem;
    this.subSidebarItems = subSidebarItems;
  }

  setSidebarActiveItem(item: string) {
    const _item = item.toLowerCase();

    this.store.dispatch(stateAction.setSidebarActiveItem(_item));
  }

  setSubSidebarActiveItem(item: string) {
    this.store.dispatch(stateAction.setSubSidebarActiveItem(item));
  }
}
