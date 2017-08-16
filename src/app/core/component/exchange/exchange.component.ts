import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

// Actions
import * as stateAction from '../../store/state/actions';

// Service
import { DeviceService } from '../../../shared/service/device.service';

@Component({
  moduleId: module.id,
  selector: 'app-exchange',
  templateUrl: 'exchange.component.html',
  styleUrls: ['exchange.component.css']
})
export class ExchangeComponent implements OnInit {
  private deviceData: any = {};
  private subSidebarActiveItem: String = '';
  private selectedCoin = {};

  constructor(
    private store: Store<any>,
    private deviceService: DeviceService,
  ) {
    store.subscribe(({ device, state }) => {
      this.loadDeviceData(device);
      this.loadStateData(state);

      if (this.deviceData.wallet.length > 0) {
        this.selectedCoin = this.deviceData.wallet.filter(element => element.name === this.subSidebarActiveItem)[0];
      }
    });
  }

  ngOnInit() {
    const { wallet } = this.deviceData;
    const subSidebarItems = wallet.map(element => ({
      'content': element.name
    }));

    if (subSidebarItems.length > 0) {
      this.store.dispatch(stateAction.setSubSidebarItems(subSidebarItems));
      console.log(subSidebarItems[0].content)
      this.store.dispatch(stateAction.setSubSidebarActiveItem(subSidebarItems[0].content));
    }
  }

  loadDeviceData(payload) {
    this.deviceData = payload;
  }

  loadStateData(payload) {
    const {
      sidebarActiveItem,
      subSidebarActiveItem
    } = payload;

    this.subSidebarActiveItem = subSidebarActiveItem;
  }
}
