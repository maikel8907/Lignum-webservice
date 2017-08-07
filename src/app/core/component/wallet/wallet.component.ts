import { Component, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';

// Action to dispatch
import * as deviceAction from '../../store/device/actions';

// Service
import { DeviceService } from '../../../shared/service/device.service'

@Component({
  moduleId: module.id,
  selector: 'app-wallet',
  templateUrl: 'wallet.component.html',
  styleUrls: ['wallet.component.css']
})
export class WalletComponent implements  AfterViewInit {
  private currentStep = 0;
  private devicePin = '';
  private walletPin = '';
  private recoveryWordList = [];
  private keyMap = [];
  private deviceName = '';
  private isConnect = false;
  private reEnterDevicePin = '';
  private reEnterWalletPin = '';
  private recoveryWordIndex = 0;
  private recoveryWordStartIndex = 0;

  constructor(
    private store: Store<any>,
    private deviceService: DeviceService
  ) {
    store.subscribe(({ device }) => {
      this.loadData(device);
    });
  }

  ngAfterViewInit() {
    const checkDeviceConenctionInterval = setInterval(() => {
      this.deviceService.callToDevice({ command: 'check-is-setup' }).then((res) => {
        if (res && !res.error) {
          this.store.dispatch(deviceAction.setConnectStatus(!this.isConnect));
          clearInterval(checkDeviceConenctionInterval);
        }
      });
    }, 500);
  }

  loadData(payload) {
    const {
      currentStep,
      recoveryWordList,
      deviceName,
      devicePin,
      walletPin,
      isConnect,
      keyMap
    } = payload;

    this.currentStep = currentStep;
    this.recoveryWordList = recoveryWordList;
    this.deviceName = deviceName;
    this.devicePin = devicePin;
    this.walletPin = walletPin;
    this.isConnect = isConnect;
    this.keyMap = keyMap;
  }

  onVirtualKeyBoardClick(key, type) {
    switch (type) {
      case 'devicePin':
        this.devicePin = this.devicePin.concat(key);
      break;

      case 'walletPin':
        this.walletPin = this.walletPin.concat(key);
      break;
    }
  }

  processToNextStep() {
    this.currentStep ++;
  }

  processToPreviousStep() {
    if (this.currentStep > 0) {
      this.currentStep --;
    }
  }

  onEnterClick(popupType) {
    switch (popupType) {
      case 'deivceName':
        if (this.deviceName.trim() !== '') {
          this.processToNextStep();
          this.getKeyMap();
        } else {
          alert(`device name can't be left blanked`);
        }
      break;

      case 'devicePin':
        if (this.devicePin.trim() !== '') {
          this.getKeyMap();
          this.reEnterDevicePin = this.devicePin
          this.devicePin = '';
          this.processToNextStep();
        } else {
          alert('invalid device pin');
        }
      break;

      case 'reEnterDevicePin':
        if (this.devicePin === this.reEnterDevicePin) {
          const getDeviceRecoveryWordList = setInterval(() => {
            this.deviceService.callToDevice({ command: 'get-recovery-phase' }).then((res) => {
              if (res.status) {
                this.recoveryWordList = Object.keys(res.data).map(key => res.data[key]);
                this.getRecoveryWordIndex();
                this.processToNextStep();
                clearInterval(getDeviceRecoveryWordList);
              }
            });
          }, 500);
          this.processToNextStep();
        } else {
          this.devicePin = '';
          alert('Invalid reenter pin');
        }
      break;

      case 'recoveryWord':
        this.getRecoveryWordIndex();
        this.processToNextStep();
      break;
    }
  }

  onRecoveryWordClick(word) {
    if (this.recoveryWordList[this.recoveryWordIndex] === word) {
      this.getRecoveryWordIndex();
      this.processToNextStep();
    } else {
      alert('wrong word please check again');
    }
  }

  onCancelClick() {
    this.processToPreviousStep();
  }

  async getKeyMap() {
    await this.deviceService.callToDevice({
      command: 'get-keyboard-map'
    }).then((res) => {
      this.keyMap = Object.keys(res.data).map(key => res.data[key]);
    });
  }

  getRecoveryWordIndex() {
    this.recoveryWordIndex = Math.floor(Math.random() * (this.recoveryWordList.length - 7));

    if (this.recoveryWordIndex <= 6) {
      this.recoveryWordStartIndex = 0;
    } else {
      this.recoveryWordStartIndex
      = Math.floor(Math.random() * (this.recoveryWordIndex - (this.recoveryWordIndex - 6) + 1)) + (this.recoveryWordIndex - 6);
    }
  }
}
