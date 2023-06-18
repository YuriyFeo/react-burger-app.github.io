import {
  SET_CURRENT_INGREDIENT,
  DELETE_CURRENT_INGREDIENT
} from '../actions/current-ingredient';

const currentIngredientInitialState = {
  current: null
}

export const currentIngredientReducer = (state = currentIngredientInitialState, action) => {
  switch(action.type) {
    case SET_CURRENT_INGREDIENT: {
      return {
        ...state,
        current: action.current
      };
    }
    case DELETE_CURRENT_INGREDIENT: {
      return {
        ...state,
        current: null
      }
    }
    default: {
      return state;
    }
  }
}