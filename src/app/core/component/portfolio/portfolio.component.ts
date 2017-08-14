import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

// Service
import { DeviceService } from '../../../shared/service/device.service';

@Component({
  moduleId: module.id,
  selector: 'app-portfolio',
  templateUrl: 'portfolio.component.html',
  styleUrls: ['portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  private subSidebarActiveItem;

  constructor(
    private store: Store<any>,
    private deviceService: DeviceService
  ) {
    store.subscribe(({ device, state }) => {
      this.loadStateData(state);
    });
  }

  loadStateData(payload) {
    const {
      subSidebarActiveItem
    } = payload;

    this.subSidebarActiveItem = subSidebarActiveItem;
  }

  ngOnInit() {}
}
