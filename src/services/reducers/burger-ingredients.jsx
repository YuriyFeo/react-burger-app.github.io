import {
  GET_BURGER_INGREDIENTS_FAILED,
  GET_BURGER_INGREDIENTS_SUCCESS,
  GET_BURGER_INGREDIENTS_REQUEST,
  INCREASE_COUNTER,
  DECREASE_COUNTER,
  RESET_COUNTER
} from '../actions/burger-ingredients';

const burgerIngredientsInitialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false
}

export const burgerIngredientsReducer = (state = burgerIngredientsInitialState, action) => {
  switch (action.type) {
    case GET_BURGER_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true
      };
    }
    case GET_BURGER_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: false,
        ingredients: action.ingredients
      };
    }
    case GET_BURGER_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: true
      };
    }
    case INCREASE_COUNTER: {
      return {
        ...state,
        ingredients: [...state.ingredients].map(item => {
          if (item._id === action.id._id) {
            item.count += action.count;
          }
          return item
        })
      }
    }
    case DECREASE_COUNTER: {
      return {
        ...state,
        ingredients: [...state.ingredients].map(item => {
          if (item._id === action.id) {
            item.count -= action.count;
          }
          return item
        })
      }
    }
    case RESET_COUNTER: {
      return {
        ...state,
        ingredients: [...state.ingredients].map(item => {
          item.count = 0;

          return item
        })
      }
    }
    default: {
      return state;
    }
  }
}