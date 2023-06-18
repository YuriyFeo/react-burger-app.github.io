import { IS_REQUEST, IS_FAILED, IS_SUCCESS, SET_MODAL, RESET_MODAL } from "../actions/modal";

const modalInitialState = {
  isRequest: false,
  isFailed: false,

  currentModal: null,
  resetActionType: ''
}

export const modalReducer = (state = modalInitialState, action) => {
  switch(action.type) {
    case IS_REQUEST: {
      return {
        ...state,
        isRequest: true
      }
    };
    case IS_SUCCESS: {
      return {
        ...state,
        isRequest: false,
        isFailed: false
      }
    }
    case IS_FAILED: {
      return {
        ...state,
        isRequest: false,
        isFailed: true
      }
    }
    case SET_MODAL: {
      return {
        currentModal: action.currentModal,
        resetActionType: action.resetActionType
      }
    }
    case RESET_MODAL: {
      return {
        currentModal: null,
        resetActionType: ''
      }
    }
    default: {
      return state;
    }
  }
}