import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

// User defined module
import { phoneEndpoint } from '../global';



@Injectable()
export class DeviceService {
  constructor(private http: Http) {

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
}
