import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';

// Action to dispatch
import * as deviceAction from '../../store/device/actions';

// Service
import { DeviceService } from '../../../shared/service/device.service';


@Component({
  moduleId: module.id,
  selector: 'app-wallet',
  templateUrl: 'wallet.component.html',
  styleUrls: ['wallet.component.css']
})
export class WalletComponent implements  AfterViewInit {
  private keyMap = [];
  private reDevicePin = '';
  private reWalletPin = '';
  private recoveryWord: any = {};
  private recoveryWordStartIndex = 0;
  private sidebarActiveItem = 'wallet';
  private deviceData: any = {};
  private recoveryWordList = [];

  constructor(
    private store: Store<any>,
    private deviceService: DeviceService,
    private elementRef: ElementRef
  ) {
    store.subscribe(({ device, state }) => {
      this.loadDeviceData(device);
      this.loadStateData(state);
    });
  }

  ngAfterViewInit() {
    window.addEventListener('keydown', (e) => {
      if (this.sidebarActiveItem === 'wallet') {
        switch (e.key) {
          case 'Backspace':
            this.onBackSpaceBtnPressed();
          break;

          case 'Enter':
            this.onEnterBtnPress();
          break;
        }
      }
    });
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
              this.deviceData.recoveryWordList = Object.keys(res.data).map(key => ({
                'key': key,
                'word': res.data[key]
              }));
              this.deviceData.currentStep ++;
              this.getRecoveryWordIndex();
              this.store.dispatch(deviceAction.setDeviceData(this.deviceData));
              clearInterval(getDeviceRecoveryWordList);
            }
          });
        }, 500);
      break;

      case 'showFinishScene':
        this.deviceService.callToDevice({ command: 'show-finish' });
      break;

      case 'checkRecoveryPhaseFinish':
        this.deviceService.callToDevice({ command: 'check-recovery-phase-finish' });
      break;

      case 'getWallet':
        this.deviceService.callToDevice({ command: 'show-finish', data: {} });
        const walletInterval = setInterval(() => {
          this.deviceService
              .callToDevice({ command: 'get-wallet', data: {} })
              .then((res) => {
                if (res.status) {
                  this.deviceData.wallet = res.data;
                  this.deviceData.currentStep = 9;
                  this.store.dispatch(deviceAction.setDeviceData(this.deviceData));
                  this.callToDeviceApi('showFinishScene');
                  clearInterval(walletInterval);
                }
              });
        }, 1000);
      break;
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

    this.sidebarActiveItem = sidebarActiveItem;
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
          this.callToDeviceApi('getWallet');
          this.callToDeviceApi('checkRecoveryPhaseFinish');
        } else {
          alert(`Device pin can't be left blank`);
          this.reDevicePin = '';
        }
      break;
    }
  }

  onBackSpaceBtnPressed() {
    const {
      currentStep
    } = this.deviceData;

    switch (currentStep) {
      case 2:
        this.deviceData.devicePin = this.deviceData.devicePin.substring(0, this.deviceData.devicePin.length - 1);
        this.store.dispatch(deviceAction.setDeviceData(this.deviceData));
      break;

      case 3:
        this.reDevicePin = this.reDevicePin.substring(0, this.reDevicePin.length - 1);
      break;
    }
  }

  onEnterBtnPress() {
    const {
      currentStep,
    } = this.deviceData;

    switch (currentStep) {
      case 1:
        this.onEnterBtnClick('setDeviceName');
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
    if (this.recoveryWord.word === word) {
      this.getRecoveryWordIndex();
      this.deviceData.currentStep ++;
      this.store.dispatch(deviceAction.setDeviceData(this.deviceData));
      if (type === 'reRecoveryStep') {
        this.callToDeviceApi('keyboardMap');
      }
    } else {
      alert('Wrong word please check again');
    }
  }

  getRecoveryWordIndex() {
    const recoveryWordIndex = Math.floor(Math.random() * (5 - 0 + 1)) + 0;

    this.recoveryWordStartIndex = Math.floor(Math.random() * (16 - 0 + 1)) + 0;
    this.recoveryWordList = this.deviceData.recoveryWordList.map(element => element);
    this.recoveryWordList = this.recoveryWordList.splice(this.recoveryWordStartIndex, 6);
    this.recoveryWord = this.recoveryWordList[recoveryWordIndex];
  }
}
