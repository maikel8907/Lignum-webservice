import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Store } from '@ngrx/store';

// User defined module
import { phoneEndpoint } from '../global';

// action
import * as deviceAction from '../../core/store/device/actions'

@Injectable()
export class DeviceService {
  private deviceData: any = {};
  constructor(
    private http: Http,
    private store: Store<any>
  ) {
    this.store.subscribe(({ device }) => this.deviceData = device);
  }

  callToDevice(payload: object) {
    const jsonRequest = JSON.stringify(payload);
    const headers = new Headers();
    headers.append('content-custom', jsonRequest);
    return this.http
          .get(phoneEndpoint, { headers })
          .toPromise()
          .then(response => response.json())
          .catch(() => ({ error: 'can not connected' }));
  }

  async callToDeviceSync(payload: object) {
    const jsonRequest = JSON.stringify(payload);
    const headers = new Headers();
    headers.append('content-custom', jsonRequest);
    let res = {};
    try {
      res = await this.http
            .get(phoneEndpoint, { headers })
            .toPromise();
    } catch (error) {
      res = { error: 'can not connected' };
    }

    return res;
  }

  checkDeviceConnection() {
    setInterval(() => {
      this.callToDevice({ command: 'get-device-status' }).then((res) => {
        if ((res && !res.error)) {
          if (!this.deviceData.isConnect) {
            this.store.dispatch(deviceAction.setConnectStatus(true));
            this.callToDevice({ command: 'check-is-setup' });
          }
        } else {
          this.store.dispatch(deviceAction.setConnectStatus(false));
        }
      });

      this.callToDevice({ command: 'get-device-data' }).then((res) => {
        if ((res && !res.error) && (!this.deviceData.isConnect)) {
          this.store.dispatch(deviceAction.setDeviceData(res));
        }
      });
    }, 500);
  }
}
