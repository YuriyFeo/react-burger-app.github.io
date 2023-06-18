import { request } from "../../utils/api";

export const GET_BURGER_INGREDIENTS_REQUEST = 'GET_BURGER_INGREDIENT_REQUEST';
export const GET_BURGER_INGREDIENTS_SUCCESS = 'GET_BURGER_INGREDIENTS_SUCCESS';
export const GET_BURGER_INGREDIENTS_FAILED = 'GET_BURGER_INGREDIENTS_FAILED';
export const INCREASE_COUNTER = 'INCREASE_COUNTER';
export const DECREASE_COUNTER = 'DECREASE_COUNTER';
export const RESET_COUNTER = 'RESET_COUNTER'

const getIngredients = () => request('/ingredients');

export function getBurgerIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_BURGER_INGREDIENTS_REQUEST
    })
    getIngredients()
      .then(data => {
        const ingredients = data.data.map(item => {
          item.count = 0; return item;
        })
        dispatch({
          type: GET_BURGER_INGREDIENTS_SUCCESS,
          ingredients: ingredients
        })
      })
      .catch(err => {
        dispatch({
          type: GET_BURGER_INGREDIENTS_FAILED
        })
        console.log(`Ошибка: ${err.status}`);
      });
  }
}