import React, { useMemo } from 'react';
//  Добавил хуки для работы с Redux  //
import { useDispatch, useSelector } from 'react-redux';
//  Добавил хуки для работы с DND  - здесь не нужен useDrag  //
import { useDrop } from 'react-dnd';
import ConstructorElements from '../constructor-elements/constructor-elements';
import OrderDetails from '../order-details/order-details';
import ConstructorTotal from '../constructor-total/constructor-total';
import { Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../modal/modal';
import { dispatchOrder, ADD_BUN, ADD_INGREDIENT, DELETE_ORDER } from '../../services/actions/order-actions';
//  Импортировал actions для работы с ингредиентами в конструкторе заказа  //
//  Добавил универсальный генератор уникальных идентификаторов для элементов без id  //
import { v4 as uuidv4 } from 'uuid';
import { selectorOrders } from "../../utils/constants";
import burgerConstructorStyle from './burger-constructor.module.css';


const BurgerConstructor = () => {

  //  Получаю из стора состояние для номера состава заказа  //
  const dispatch = useDispatch();
  const { orderData, orderNumber } = useSelector(selectorOrders);
  
  //  Редьюсеры со свитчем и действия вынес в отдельные файлы  //

	const bun = useMemo(() => {
		return orderData.find((element) => element.type === "bun");
	}, [orderData]);



  //  Начинку и соус можно не разделять, т.к. логика едина  //
  const ingredientsMidStuff = useMemo(() => {
		return orderData.filter((element) => element.type !== 'bun');
  }, [orderData]);
  
  //  Считаю сумму заказа с мемоизацией  //
  //  Прибавляю к старой сумме заказа (если не пуст) цены элементов (булки * 2)  //
  const totalAmount = useMemo(() => {
    if (orderData.length > 0) {
      return orderData
        .map((element) => element.price * (element.type === 'bun' ? 2 : 1))
        .reduce((sum, price) => sum + price, 0);
    } else {
      //  Если в заказе нет данных, то возвращаем 0  //
      return 0;
    }
  }, [orderData]);
    
    const onDropIngredient = (ingredient) => {
    if (ingredient.type === 'bun') {
      dispatch({
        type: ADD_BUN,
        payload: { _uid: uuidv4(), ...ingredient },
      });
    } else {
      dispatch({
        type: ADD_INGREDIENT,
        payload: { _uid: uuidv4(), ...ingredient },
      });
    }
  };

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop: (ingredientData) => onDropIngredient(ingredientData),
  });

  const handleOpenIngredientModal = () => {
    dispatch(dispatchOrder(orderData.map((ingredient) => ingredient._id)));
  };
  const handleCloseOrderModal = () => {
    dispatch({ type: DELETE_ORDER });
  };
  
  //  Цены суммирую и вывожу в конструкторе, в попапе вывожу номер заказа  //
  //  Добавил ref, отключил контекст провайдер, теперь беру состояние из redux-стора  //
  //  Открытие окна с деталями ингредиента вынес в отдельную функцию handleOpenIngredientModal  //
  //  Открываю окно заказа при условии, что есть номер заказа, закрытие вынес в handleCloseOrderModal  //
  //  Показываю сумму заказа и кнопку, только если выбраны ингредиенты (кроме булок)  //
  return (
    <>
      <section className={`${burgerConstructorStyle.element__section}`} ref={dropTarget}>
        <div className={`${burgerConstructorStyle.element__container}`}>
          {bun && (
            <div className={`${burgerConstructorStyle.element__bun}`}>
              <ConstructorElement 
                type={'top'}
                isLocked={true} 
                text={`${bun.name} (верх)`} 
                price={bun.price}
                thumbnail={bun.image} 
              />
            </div>
          )}

            <ul className={`${burgerConstructorStyle.element_midstuff}`}>
            {ingredientsMidStuff.map((element, index) => { 
              return (
                <li key={element._id} className={burgerConstructorStyle.element}>
                  <ConstructorElements 
                    elementData={element}
                    bunType={''} 
                    bunTypeName={''} 
                    isLocked={false} 
                    index={index}
                    key={element._id} 
                  />
                </li>
              );
            })}
            {ingredientsMidStuff.length === 0 && (
              <div className={burgerConstructorStyle.element}>
                <span className='text mt-30 text_type_main-default'>
                  Добавьте ингредиенты для Вашего бургера!
                </span>
              </div>
            )}
            </ul>
          {bun && (
            <div className={`${burgerConstructorStyle.element__bun}`}>
              <ConstructorElement 
                type={'bottom'} 
                isLocked={true} 
                text={`${bun.name} (низ)`} 
                price={bun.price}
                thumbnail={bun.image} 
              />
            </div>
          )}

      </div>
      {ingredientsMidStuff.length > 0 && 
        <div className={`mt-10 ${burgerConstructorStyle.constructor_total}`}>
          <ConstructorTotal total={totalAmount} />
        
          <Button type='primary' size='large' htmlType='button' onClick={handleOpenIngredientModal}>Оформить заказ</Button>
        </div>
      }
      </section>
      {orderNumber && 
        (
          <Modal handleClose={handleCloseOrderModal} title={'Детали заказа'}>
            <OrderDetails orderNumber={orderNumber} />
          </Modal>
        )
      }
   </>
  )
}

//  Типизация не нужна, нет пропсов  //

export default BurgerConstructor;