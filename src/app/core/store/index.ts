import { deviceReducer } from './device/reducer';

export const store = {
  ...{ device: deviceReducer },
};
