//  Начальные actions для ингредиентов B-Ingredients и B-Constructor  //
import { fetchIngredients } from '../../utils/api';
//  Все константы экспортирую, потом, видимо, вынесу в отдельный файл  //
//  Получение списка ингредиентов от API используется в B-I и  //
export const GET_INGREDIENTS_API = 'GET_INGREDIENTS_API';
export const GET_INGREDIENTS_API_OK = 'GET_INGREDIENTS_API_OK';
export const GET_INGREDIENTS_API_FAIL = 'GET_INGREDIENTS_API_FAIL';

//  Добавление, удаление данных о просматриваемом ингредиенте (попап с I-Details)  //
export const OPEN_INGREDIENT_DETAILS = 'OPEN_INGREDIENT_DETAILS';
export const CLOSE_INGREDIENT_DETAILS = 'CLOSE_INGREDIENT_DETAILS';

//  Добавил dispatch для получения результата запроса ингредиентов в API  //
export const getIngredients = () => {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_API
    });
    fetchIngredients().then((res) => {
      if (res && res.success) {
        dispatch({
          type: GET_INGREDIENTS_API_OK,
          ingredients: res.data
        });
      } else {
        dispatch({
          type: GET_INGREDIENTS_API_FAIL
        });
      }
    });
  };
};