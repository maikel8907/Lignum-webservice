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
  private recoveryWordList = [];
  private keyMap = [];
  private reDevicePin = '';
  private reWalletPin = '';
  private recoveryWordIndex = 0;
  private recoveryWordStartIndex = 0;
  private deviceData: any = {};

  constructor(
    private store: Store<any>,
    private deviceService: DeviceService
  ) {
    store.subscribe(({ device }) => {
      this.loadData(device);
    });
  }

  ngAfterViewInit() {
  }

  callToDeviceApi(name, payload = {}) {
    switch (name) {
      case 'moveToConfigScene':
        this.deviceService.callToDevice({
          command: 'check-is-setup'
        });
      break;
      case 'keyboardMap':
        this.deviceService.callToDevice({
          command: 'get-keyboard-map'
        }).then((res) => {
          this.keyMap = Object.keys(res.data).map(key => res.data[key]);
        });
      break;

      case 'recoveryWord':
        const getDeviceRecoveryWordList = setInterval(() => {
          this.deviceService.callToDevice({ command: 'get-recovery-phase' }).then((res) => {
            if (res.status) {
              this.deviceData.recoveryWordList = Object.keys(res.data).map(key => res.data[key]);
              this.deviceData.currentStep ++;
              this.getRecoveryWordIndex();
              this.store.dispatch(deviceAction.setDeviceData(this.deviceData));
              clearInterval(getDeviceRecoveryWordList);
            }
          });
        }, 500);
      break;

      case 'showFinishScene':
        this.deviceService.callToDevice({ command: 'show-finish'});
      break;

      case 'checkRecoveryPhaseFinish':
        this.deviceService.callToDevice({ command: 'check-recovery-phase-finish'});
      break;

      default:
      break;
    }
  }

  loadData(payload) {
    const {
      currentStep,
      recoveryWordList,
      deviceName,
      devicePin,
      walletPin,
      isConnect
    } = payload;

    this.deviceData = {
      currentStep,
      recoveryWordList,
      deviceName,
      devicePin,
      walletPin,
      isConnect
    };
  }

  onCloseBtnClick(popUpName) {
    switch (popUpName) {
      case 'deviceConnected':
        this.deviceData.currentStep ++;
        this.callToDeviceApi('moveToConfigScene');
      break;

      case 'done':
        this.deviceData.currentStep ++;
      break;

      default:
        this.deviceData.currentStep --;
      break;
    }

    this.store.dispatch(deviceAction.setDeviceData(this.deviceData));
  }

  onEnterBtnClick(popUpName) {
    switch (popUpName) {
      case 'setDeviceName':
        if (!this.deviceData.deviceName.trim()) {
          alert(`Device name can't be left blank`);
        } else {
          this.deviceData.currentStep ++;
          this.callToDeviceApi('keyboardMap');
          this.store.dispatch(deviceAction.setDeviceData(this.deviceData));
        }
      break;

      case 'devicePin':
        if (this.deviceData.devicePin.length === 0) {
          alert(`Device pin can't be left blank`);
        } else {
          this.deviceData.currentStep ++;
          this.callToDeviceApi('keyboardMap');
          this.store.dispatch(deviceAction.setDeviceData(this.deviceData));
        }
      break;

      case 'reDevicePin':
        if (this.deviceData.devicePin === this.reDevicePin) {
          this.deviceData.currentStep ++;
          this.store.dispatch(deviceAction.setDeviceData(this.deviceData));
          this.callToDeviceApi('recoveryWord');
        } else {
          alert(`Reentered pin doesn't match`);
          this.reDevicePin = '';
        }
      break;

      case 'walletPin':
        if (this.deviceData.walletPin.trim()) {
          this.deviceData.currentStep ++;
          this.store.dispatch(deviceAction.setDeviceData(this.deviceData));
          this.callToDeviceApi('showFinishScene');
        } else {
          alert(`Device pin can't be left blank`);
          this.reDevicePin = '';
        }
      break;
    }
  }

  onCancelBtnClick(popUpName) {
    switch (popUpName) {
      case 'deviceConnected':
      case 'setDeviceName':
      case 'devicePin':
      case 'walletPin':
        this.onCloseBtnClick(popUpName);
      break;
    }
  }

  onVirtualKeyBoardClick(key, type) {
    switch (type) {
      case 'devicePin':
        this.deviceData.devicePin = this.deviceData.devicePin.concat(key);
      break;

      case 'walletPin':
        this.deviceData.walletPin = this.deviceData.walletPin.concat(key);
      break;

      case 'reDevicePin':
        this.reDevicePin = this.reDevicePin.concat(key);
      break;
    }
  }

  onRecoveryWordClick(word, type) {
    if (this.deviceData.recoveryWordList[this.recoveryWordIndex] === word) {
      this.getRecoveryWordIndex();
      this.deviceData.currentStep ++;
      this.store.dispatch(deviceAction.setDeviceData(this.deviceData));
      if (type === 'reRecoveryStep') {
        this.callToDeviceApi('checkRecoveryPhaseFinish');

        setTimeout(() => {
            this.callToDeviceApi('keyboardMap');
            this.deviceData.currentStep ++;
            this.store.dispatch(deviceAction.setDeviceData(this.deviceData));
        }, 2000);
      }
    } else {
      alert('wrong word please check again');
    }
  }

  getRecoveryWordIndex() {
    this.recoveryWordIndex = Math.floor(Math.random() * (23));

    if (this.recoveryWordIndex <= 6) {
      this.recoveryWordStartIndex = 0;
    } else if (this.recoveryWordIndex >= 17) {
      this.recoveryWordStartIndex = 17;
    } else {
      this.recoveryWordStartIndex
      = Math.floor(Math.random() * (this.recoveryWordIndex - (this.recoveryWordIndex - 6) + 1)) + (this.recoveryWordIndex - 5);
    }

    console.log(this.recoveryWordStartIndex);
    console.log(this.recoveryWordIndex);
  }
}
