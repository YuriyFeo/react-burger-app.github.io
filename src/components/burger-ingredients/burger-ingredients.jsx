//  Блок (левый) с выбором ингредиентов по типам  //
//  Для табов (типы ингредиентов) делаем состояние выбора таба  //
//  Подумать над ограничением высоты блока на разных разрешениях   //
//  Фильтруем ингредиенты по типам и кладем в массивы  //
//  Затем в разметку вставляем карточки ингредиентов по типам  //

import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
//  Добавил хуки для работы с Redux  //
import { useSelector, useDispatch } from 'react-redux';
//  Modal, IngredientDetails и IngredientPrice теперь в IngredientItem  //
//  IngredientItem теперь вложен в IngredientCategory для навигации  //
import { IngredientCategory } from '../ingredient-category/ingredient-category';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { getIngredients } from '../../services/actions/ingredient-actions';
//  PropTypes и контекст больше не нужны  //
import BurgerIngredientsStyle from './burger-ingredients.module.css';
     
const BurgerIngredients = () => {

  //  Теперь получаю состояние из redux, а не из контекста  //
  //  Включаю хуки для получения и отправки данные в redux  //
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const dispatch = useDispatch();
  //  По умолчанию мой ингредиент = булка, без булки нельзя  //
  const [current, setCurrent] = useState('bun');
  
  //  При монтировании получаем список ингредиентов  //
  useEffect(() => {
    dispatch(getIngredients());
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

  //  Нахожу по id контейнер, привязываюсь к его координатам, чтобы выделять разделы  //
  const scrollToCategory = () => {
    const topTop = document.getElementById('typeContainer').getBoundingClientRect().top;
    const bunTop = document.getElementById('bun').getBoundingClientRect().top;
    const sauceTop = document.getElementById('sauce').getBoundingClientRect().top;

    //  topTop - верх раздела, butTop - верх "булок", sauceTop - соусов  //
    if (bunTop + topTop > topTop + 60) {
      setCurrent('bun');
    } else if (sauceTop + topTop > 110) {
      setCurrent('sauce');
    } else {
      setCurrent('main');
    }
  };

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

export default BurgerIngredients;