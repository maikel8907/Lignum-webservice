export const GET_IS_SETUP = 'device/get/isSetup';
export const SET_CONNECT_STATUS = 'device/set/connectStatus'
export const SET_DEVICE_DATA = 'device/set/data';

export const getIsSetup = () => ({
  type: GET_IS_SETUP
});

export const setConnectStatus = (payload) => ({
  type: SET_CONNECT_STATUS,
  payload
});

export const getDeviceData = () => ({
  type: SET_DEVICE_DATA
});
