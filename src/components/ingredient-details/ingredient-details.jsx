//  Компонент для отображения в модальном окне при клике на ингредиент  //
import { ingredientType } from '../../utils/types';  //
import ingredientDetailsStyle from './ingredient-details.module.css';
import IngredientNutrition from '../ingredient-nutrition/ingredient-nutrition';

//  Сводный компонент с гридом свойств  //
const IngredientDetails = ({ item }) => {
  return(
    <div className={ingredientDetailsStyle.general}>
      <img className={ingredientDetailsStyle.image} src={item.image} alt={item.name}></img>
      <p className='mt-4 mb-8 text text_type_main-medium'>{item.name}</p>
      <div className={ingredientDetailsStyle.details}>
        <IngredientNutrition type={'Калории, ккал'} amount={item.calories} />
        <IngredientNutrition type={'Белки, г'} amount={item.proteins} />
        <IngredientNutrition type={'Жиры, г'} amount={item.fat} />
        <IngredientNutrition type={'Углеводы, г'} amount={item.carbohydrates} />
      </div>
    </div>  
  )    
}

//  Здесь есть пропсы, проверяю типизацию, но не через ingredientType  //
IngredientDetails.propTypes = {
  item: ingredientType,
};

export default IngredientDetails;
