import {
    OPEN_INGREDIENT_DETAILS,
    CLOSE_INGREDIENT_DETAILS,
  } from "../actions/ingredient-actions";

//  Обнуленное начальное состояние стора инфо по ингредиенту  //
const initialIngredientDetailsState = {
    ingredientDetails: null,
  };
  
  //  Refactor: вынести редьюсер в отдельный файл  //
  //  Редьюсер для обработки действий с деталями ингредиента в redux store (открыть/закрыть)  //
  export const ingredientDetailsReducer = (
    state = initialIngredientDetailsState,
    action
  ) => {
    switch (action.type) {
      case OPEN_INGREDIENT_DETAILS: {
        return {
          ...state,
          ingredientDetails: action.payload,
        };
      }
      case CLOSE_INGREDIENT_DETAILS: {
        return {
          ...state,
          ingredientDetails: null,
        };
      }
      default: {
        return state;
      }
    }
  };
  