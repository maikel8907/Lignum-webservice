import { deviceReducer } from './device/reducer';
import { stateReducer } from './state/reducer';

export const store = {
  device: deviceReducer,
  state: stateReducer
};
