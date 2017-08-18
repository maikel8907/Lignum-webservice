import { Action } from '@ngrx/store';
import * as stateAction from './actions';

const initialState = {
  subSidebarItems: [
    {
      content: 'Graphics'
    },
    {
      content: 'Chart'
    }
  ],
  sidebarActiveItem: 'Wallet',
  subSidebarActiveItem: 'graphics'
};

class StateActionInterface implements Action {
  public type;
  public payload;

  constructor(type, payload = {}) {
    this.type = type;
    this.payload = payload;
  }
}

export function stateReducer(state: Object = initialState, action: StateActionInterface) {
  const _state: any = { ...state };

  switch (action.type) {
    case stateAction.SET_CURRENT_SCENE:
      _state.currentScene = action.payload;
    break;

    case stateAction.SET_SIDEBAR_ACTIVE_ITEM:
      _state.sidebarActiveItem = action.payload;
    break;

    case stateAction.SET_SUBSIDEBAR_ACTIVE_ITEM:
      _state.subSidebarActiveItem = action.payload;
    break;

    case stateAction.SET_SUBSIDEBAR_ITEMS:
      _state.subSidebarItems = action.payload;
    break;
  }

  return _state;
}
