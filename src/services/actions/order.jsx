import { request } from "../../utils/api";
import { RESET_CONSTRUCTOR } from "./burger-constructor";
import { RESET_COUNTER } from "./burger-ingredients";
import { IS_FAILED, IS_REQUEST, IS_SUCCESS} from "./modal";

export const ORDER_REQUEST = 'ORDER_NUMBER_REQUEST';
export const ORDER_SUCCESS = 'ORDER_NUMBER_SUCCESS';
export const ORDER_FAILED = 'ORDER_NUMBER_FAILED';
export const ORDER_RESET = 'ORDER_RESET';

const getOrder = (ingredientsId) => request('/orders', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    ingredients: ingredientsId
  })
})

export function sentOrderNumber(ingredientsId) {
  return function (dispatch) {
    dispatch({
      type: ORDER_REQUEST
    })
    dispatch({
      type: IS_REQUEST
    })
    getOrder(ingredientsId)
      .then(data => {
          dispatch({
            type: ORDER_SUCCESS,
            name: data.name,
            order: {
              number: data.order.number
            }
          })
          dispatch({
            type: IS_SUCCESS
          })
          dispatch({
            type: RESET_CONSTRUCTOR
          })
          dispatch({
            type: RESET_COUNTER
          })

      })
      .catch(err => {
        dispatch({
          type: ORDER_FAILED
        })
        dispatch({
          type: IS_FAILED
        })
        console.log(`Ошибка: ${err.status}`);
      })
  }
}