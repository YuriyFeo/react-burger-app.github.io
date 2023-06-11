/* eslint-disable array-callback-return */
//  Блок (левый) с выбором ингредиентов по типам  //
//  Для табов (типы ингредиентов) делаем состояние выбора таба  //
//  Подумать над ограничением высоты блока на разных разрешениях   //
//  Фильтруем ингредиенты по типам и кладем в массивы  //
//  Затем в разметку вставляем карточки ингредиентов по типам  //
//  Убрать все инлайн стили, добавить отступы, убрать SelectTab в отд.компонент  //

import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
//  Добавил хуки для навигации по каталогу ингридиентов и пр.  //
//  import { useInView } from 'react-intersection-observer';
//  Добавил хуки для работы с Redux  //
import { useSelector, useDispatch } from 'react-redux';
//  Modal, IngredientDetails и IngredientPrice теперь в IngredientItem  //
//  IngredientItem теперь вложен в IngredientCategory для навигации  //

import { IngredientCategory } from '../ingredient-category/ingredient-category';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { getIngredients } from '../../services/actions/ingredient-actions';
import BurgerIngredientsStyle from './burger-ingredients.module.css';
     
export const BurgerIngredients = () => {

  //  Теперь получаю состояние из redux, а не из контекста  //
  //  Включаю хуки для получения и отправки данные в redux  //
  //  Отправляю экшен, после успешного запроса, записываю данные в Redux  //
  //  С помощью useSelector получаю доступ к данным об ингридиентах. PROFIT!  //
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const dispatch = useDispatch();
  //  По умолчанию мой ингредиент = булка, без булки нельзя  //
  const [current, setCurrent] = useState('bun');
  
  //  При монтировании получаем список ингредиентов  //
  useEffect(() => {
    dispatch(getIngredients());
 //{/*  eslint-disable-next-line react-hooks/exhaustive-deps/*}
  }, []);

  //  Фильтрую массив по типу нужного ингредиента  //
  const buns = useMemo(
    () => ingredients.filter((item) => item.type === 'bun'),
    [ingredients]
  );
  const sauces = useMemo(
    () => ingredients.filter((item) => item.type === 'sauce'),
    [ingredients]
  );
  const mains = useMemo(
    () => ingredients.filter((item) => item.type === 'main'),
    [ingredients]
  );

  //  Здесь по тренажеру  //
  //  Нахожу по id контейнер, привязываюсь к его координатам, чтобы выделять разделы  //
  const scrollToCategory = () => {
    const topTop = document
      .getElementById('typeContainer')
      .getBoundingClientRect().top;
    const bunTop = document.getElementById('bun').getBoundingClientRect().top;
    const sauceTop = document
      .getElementById('sauce')
      .getBoundingClientRect().top;

    //  topTop - верх раздела, butTop - верх 'булок', sauceTop - соусов  //
    if (bunTop + topTop > topTop + 60) {
      setCurrent('bun');
    } else if (sauceTop + topTop > 110) {
      setCurrent('sauce');
    } else {
      setCurrent('main');
    }
  };

  //  Переключатели по типам ингредиентов использую как панель навигации  //
  //  Когда пользователь скроллит ингредиенты, выделяю активным нужный переключатель  //
  //  Считаю, какой заголовок в контейнере ближе к его верхней левой границе //
  //  Заголовок не обязательно в поле зрения, но находится ближе всего к html-элементу с ингредиентами  //
  //  Только в этом случае переключатель становится активным  //
  //  Нажатие на переключатель пока не делал  //
  // return (
  //   <section className={`mr-10 ${BurgerIngredientsStyle.ingredients}`}> 
  //     <h1 className='mb-5 text text_type_main-large'>Соберите бургер</h1>
  //     <nav className={BurgerIngredientsStyle.navbar}>
  //       <Tab active={current === 'bun'} onClick={setCurrent}>Булки</Tab>
  //       <Tab active={current === 'sauce'} onClick={setCurrent}>Соусы</Tab>
  //       <Tab active={current === 'main'} onClick={setCurrent}>Начинки</Tab>
  //     </nav>
  //     <div className={BurgerIngredientsStyle.ingredient_types} id='typeContainer' onScroll={scrollToCategory}>
  //       <IngredientCategory type={'Булки'} typeList={buns} id='bun' />
  //       <IngredientCategory type={'Соусы'} typeList={sauces} id='sauce' />
  //       <IngredientCategory type={'Начинки'} typeList={mains} id='main' />
  //     </div>
  //   </section>
  // );

  //Делаем скролл на раздел

	const bunRef = useRef(null);
	const sauceRef = useRef(null);
	const mainRef = useRef(null);
	const listRef = useRef(null);

	const onTabClick = useCallback((value) => {
		setCurrent(value);
		switch (value) {
			case "bun":
				bunRef.current.scrollIntoView({ behavior: "smooth" });
				break;
			case "sauce":
				sauceRef.current.scrollIntoView({ behavior: "smooth" });
				break;
			case "main":
				mainRef.current.scrollIntoView({ behavior: "smooth" });
				break;
			default:
				bunRef.current.scrollIntoView({ behavior: "smooth" });
				break;
		}
	}, []);

  return (
    <section className={`mr-10 ${BurgerIngredientsStyle.ingredients}`}> 
      <h1 className='mb-5 text text_type_main-large'>Соберите бургер</h1>
      <nav className={BurgerIngredientsStyle.navbar}>
        <Tab value="bun" active={current === 'bun'} onClick={onTabClick}>Булки</Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={onTabClick}>Соусы</Tab>
        <Tab value="main" active={current === 'main'} onClick={onTabClick}>Начинки</Tab>
      </nav>
      <div className={BurgerIngredientsStyle.ingredient_types} id='typeContainer' onScroll={scrollToCategory}  ref={listRef}>
      <p className="mt-10 text text_type_main-medium" ref={bunRef}>
					Булки
				</p>
        <IngredientCategory typeList={buns} id='bun'/>
        <p className="mt-10 text text_type_main-medium" ref={sauceRef}>
					Соусы
				</p>
        <IngredientCategory typeList={sauces} id='sauce'/>
        <p className="mt-10 text text_type_main-medium" ref={mainRef}>
					Начинки
				</p>
        <IngredientCategory typeList={mains} id='main'/>
      </div>
    </section>
  );
}

//  propTypes и типизация не нужны, нет пропсов  //

export default React.memo(BurgerIngredients);