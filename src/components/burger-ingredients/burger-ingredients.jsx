import React, {useEffect, useRef,useContext} from 'react';
import PropTypes from 'prop-types';
import { Tab  } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredients.module.css' 
import BurgerIngredientsItem from '../burger-ingredients-item/burger-ingredients-item.jsx';
import {CartContext } from '../../context/app-context';

export default function BurgerIngredients(props){

    const bunRef = useRef(null)
    const sauceRef = useRef(null)
    const mainRef = useRef(null)
    const listRef = useRef(null)

    const [currentTab, setCurrentTab] = React.useState('bun')
    const [groupedCart, setGroupedCart] = React.useState({})
    const {cartState} = useContext(CartContext);


    useEffect(() => {
        const newGroupedCart = {}
        cartState.cart.forEach(element => {           
           if  (newGroupedCart[element._id]===undefined){
             if (element.type==='bun')  {
                newGroupedCart[element._id] = 2
             }
             else{
                newGroupedCart[element._id] = 1
             }
           }
           else{
            newGroupedCart[element._id] = newGroupedCart[element._id] +1
           }
        });        
        setGroupedCart(newGroupedCart)
    }, [cartState.cart])

    const handleScroll = e =>{
        const position =listRef.current.scrollTop +264
        if (sauceRef.current.offsetTop > position){
            setCurrentTab('bun')
        }
        else if (mainRef.current.offsetTop > position && position >=sauceRef.current.offsetTop){
            setCurrentTab('sauce')
        }
        else{
            setCurrentTab('main')
        }
    }

    const onTabClick =(value) =>{
        setCurrentTab(value);
        switch (value){
            case 'bun':
                bunRef.current.scrollIntoView({behavior: "smooth"});
                break;
            case 'sauce':
                sauceRef.current.scrollIntoView({behavior: "smooth"});
                break;
                default :
                mainRef.current.scrollIntoView({behavior: "smooth"});
                break;
        }
    }

    return(
        <section className={`mr-5 mt-10 ${styles.container}`}>
            <p className="text text_type_main-large">Соберите бургер</p>
            <div style={{ display: 'flex' }}>
                <Tab value="bun" active={currentTab === 'bun'} onClick={onTabClick}>
                    Булки
                </Tab>
                <Tab value="sauce" active={currentTab === 'sauce'} onClick={onTabClick}>
                    Соусы
                </Tab>
                <Tab value="main" active={currentTab === 'main'} onClick={onTabClick}>
                    Начинки
                </Tab>
            </div>
            <div className={`${styles.list}`} onScroll={handleScroll} ref={listRef}>
                <p className="mt-10 text text_type_main-medium" ref={bunRef}>Булки</p>
                <BurgerIngredientsItem 
                    data={props.data} 
                    groupedCart={groupedCart} 
                    type={'bun'} 
                    onAddIngredient={props.onAddIngredient}
                    onIngredientClick={props.onIngredientClick}
                />
                <p className="mt-10 text text_type_main-medium" ref={sauceRef}>Соусы</p>
                <BurgerIngredientsItem 
                    data={props.data} 
                    groupedCart={groupedCart} 
                    type={'sauce'} 
                    onAddIngredient={props.onAddIngredient}
                    onIngredientClick={props.onIngredientClick}
                />
                <p className="mt-10 text text_type_main-medium" ref={mainRef}>Начинки</p>
                <BurgerIngredientsItem 
                    data={props.data} 
                    groupedCart={groupedCart} type={'main'} 
                    onAddIngredient={props.onAddIngredient} 
                    onIngredientClick={props.onIngredientClick}
                />
            </div>            
        </section>    
    )
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf({
                _id: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
                type: PropTypes.string.isRequired,
                proteins: PropTypes.number.isRequired,
                fat: PropTypes.number.isRequired,
                carbohydrates: PropTypes.number.isRequired,
                calories: PropTypes.number.isRequired,
                price: PropTypes.number.isRequired,
                image: PropTypes.string.isRequired,
                image_mobile: PropTypes.string.isRequired,
                image_large: PropTypes.string.isRequired,
                __v: PropTypes.number.isRequired,
              }),
    onAddIngredient: PropTypes.func.isRequired,
    onIngredientClick: PropTypes.func.isRequired,
};