export const SET_CURRENT_SCENE = 'state/set/currentScene';
export const SET_SUBSIDEBAR_ITEMS = 'state/set/subSidebarItems';
export const SET_SIDEBAR_ACTIVE_ITEM = 'state/set/sidebarActiveItem';
export const SET_SUBSIDEBAR_ACTIVE_ITEM = 'state/set/subSidebarActiveItem';

export const setCurrentScene = (payload) => ({
  type: SET_CURRENT_SCENE,
  payload
});

export const setSubSidebarItems = (payload) => ({
    type: SET_SUBSIDEBAR_ITEMS,
    payload
});

export const setSidebarActiveItem = (payload) => ({
  type: SET_SIDEBAR_ACTIVE_ITEM,
  payload
});

export const setSubSidebarActiveItem = (payload) => ({
  type: SET_SUBSIDEBAR_ACTIVE_ITEM,
  payload
});
