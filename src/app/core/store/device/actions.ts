export const GET_IS_SETUP = 'device/get/isSetup';
export const SET_CONNECT_STATUS = 'device/set/connectStatus'

export const getIsSetup = () => ({
  type: GET_IS_SETUP
});

export const setConnectStatus = (payload) => ({
  type: SET_CONNECT_STATUS,
  payload
});
