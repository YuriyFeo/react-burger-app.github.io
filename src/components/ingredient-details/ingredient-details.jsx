import PropTypes from 'prop-types';
import styles from './ingredient-details.module.css';

function IngredientDetails({ingredient}){
    return(
        <div className={styles.container}>
            <div className={styles.title}>
                <p className={`pl-10 text text_type_main-large`}>Детали ингредиента</p> 
            </div>
            <div className={"mt-8"}>
                <img src={ingredient.image} className={styles.image} alt=""/>
            </div>
            <p className="text text_type_main-medium mt-4">{ingredient.name}</p>  
            <div className={`${styles.details} mt-8`}>
                <div className={styles.detailItem}>
                    <p className="text text_type_main-default text_color_inactive ">
                        Калории,ккал
                    </p>    
                    <p className="text text_type_digits-default text_color_inactive">{ingredient.calories}</p>
                </div >
                <div className={styles.detailItem}>
                    <p className={`text text_type_main-default text_color_inactive `}>
                         Белки, г
                    </p> 
                    <p className="text text_type_digits-default text_color_inactive">{ingredient.proteins}</p>
                </div>
                <div className={styles.detailItem}>
                    <p className="text text_type_main-default text_color_inactive">
                         Жиры, г
                    </p> 
                    <p className="text text_type_digits-default text_color_inactive">{ingredient.fat}</p>
                </div>
                
                <div className={styles.detailItem}>
                    <p className="text text_type_main-default text_color_inactive">
                        Углеводы, г
                    </p> 
                    <p className="text text_type_digits-default text_color_inactive">{ingredient.carbohydrates}</p>
                </div>                 
            </div>
       </div>
    )
}

IngredientDetails.propTypes = {
    ingredient: PropTypes.shape({
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
          })}

export default IngredientDetails