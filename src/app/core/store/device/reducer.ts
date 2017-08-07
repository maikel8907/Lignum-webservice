import { Action } from '@ngrx/store';
import * as deviceAction from './actions';

const initialState = {
  isConnect: false,
  currentStep: 0,
  isSetup: false,
  deviceName: '',
  devicePin: '',
  walletPin: '',
  ballance: {
    usd: 100,
    btc: 10
  },
  keyMap: [],
  recoveryWordList: []
};

class DeviceActionInterface implements Action {
  public type;
  public payload;

  constructor(type, payload = {}) {
    this.type = type;
    this.payload = payload;
  }
}

export function deviceReducer(state: Object = initialState, action: DeviceActionInterface) {
  const _state: any = { ...state };

  switch (action.type) {
    case deviceAction.SET_DEVICE_DATA:
    return _state;

    case deviceAction.SET_CONNECT_STATUS:
      _state.isConnect = action.payload;
    return _state;

    default:
    return _state;
  }
}
