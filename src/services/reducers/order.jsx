import {
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_FAILED,
  ORDER_RESET
} from '../actions/order';

const orderInitialState = {
  name: '',
  order: { number: 0 },

  orderRequest: false,
  orderFailed: false
}

export const newOrderReducer = (state = orderInitialState, action) => {
  switch (action.type) {
    case ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true
      }
    }
    case ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: false,
        name: action.name,
        order: { number: action.order.number }
      }
    }
    case ORDER_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true
      }
    }
    case ORDER_RESET: {
      return {
        name: '',
        order: { number: 0 }
      }
    }
    default: {
      return state;
    }
  }
}