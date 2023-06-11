//  Cоздаю корневой редьюсер и комбинируем в нем остальные  //
import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredient-reducer';
import { ingredientDetailsReducer } from './ingredient-details-reducer';
import { orderReducer } from './order-reducer';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredientDetails: ingredientDetailsReducer,
  order: orderReducer,
});