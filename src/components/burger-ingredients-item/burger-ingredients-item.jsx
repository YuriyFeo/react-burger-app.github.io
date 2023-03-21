import styles from './burger-ingredients-item.module.css'
import {CurrencyIcon,Counter} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';

export default function BurgerIngredientsItem({data, groupedCart, type, onIngredientClick}) {
  return(
    <div className={styles.grid}> 
                {data.map(ingredient => {
                    if(ingredient.type===type){
                        var count = groupedCart[ingredient._id] 
                        return ( 
                            <div className={`mt-6 ml-4 mr-2 ${styles.card}`} key={ingredient._id} onClick={()=>onIngredientClick(ingredient)}>
                            {count>0 && <div className={styles.counter}>
                                <Counter count={count} size="default" />
                            </div>}
                            <div className={"ml-4"}> 
                                <img src={ingredient.image} alt=""/>
                            </div> 
                            <div className={`mt-1 mb-1 ${styles.price}`}>
                                <div className={styles.container_price}>
                                    <p className={`text text_type_digits-large mr-3 ${styles.price_price}`}>{ingredient.price}</p>
                                    <CurrencyIcon type="primary" />
                                </div>
                            </div>  
                            <p className={`text text_type_main-small ${styles.name}`}>{ingredient.name}</p> 
                        </div>
                        )
                    }else{return(<></>)}
                })}
    </div>
)
}


BurgerIngredientsItem.propTypes = { 
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
type: PropTypes.string.isRequired,
groupedCart: PropTypes.object.isRequired,
onAddIngredient: PropTypes.func.isRequired,
onIngredientClick: PropTypes.func.isRequired,
};
