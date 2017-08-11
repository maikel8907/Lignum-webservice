import { Component, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

// Action to dispatch
import * as deviceAction from './core/store/device/actions';

// Service
import { DeviceService } from './shared/service/device.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  private isConnect;

  constructor(
    private store: Store<any>,
    private deviceService: DeviceService,
    private router: Router
  ) {
    store.subscribe(({ device }) => {
      this.isConnect = device.isConnect;
    });
  }

  ngAfterViewInit() {
    this.deviceService.checkDeviceConnection();
  }
}
