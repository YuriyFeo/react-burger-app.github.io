import {
  GET_CONSTRUCTOR_INGREDIENT,
  DELETE_CONSTRUCTOR_ELEMENT,
  GET_CONSTRUCTOR_BUN,
  RESET_CONSTRUCTOR
} from '../actions/burger-constructor';

const burgerConstractorInitialState = {
  bun: {},
  ingredients: []
}

export const ingredientsConstructorReducer = (state = burgerConstractorInitialState, action) => {
  switch(action.type) {
    case GET_CONSTRUCTOR_BUN: {
      return {
        ...state,
        bun: action.bun
      }
    }
    case GET_CONSTRUCTOR_INGREDIENT: {
      return {
        ...state,
        ingredients: action.ingredients
      };
    }
    case DELETE_CONSTRUCTOR_ELEMENT: {
      return {
        ...state,
        ingredients: [...state.ingredients].filter(item => item.uuid !== action.uuid)
      }
    }
    case RESET_CONSTRUCTOR: {
      return {
        ...state,
        bun: null,
        ingredients: []
      }
    }
    default: {
      return state;
    }
  }
}