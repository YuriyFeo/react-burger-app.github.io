//  Компонент категории ингредиентов для работы с навигацией по табам  //

import PropTypes from 'prop-types';
import { IngredientItem } from '../ingredient-item/ingredient-item';
import IngredientCategoryStyle from './ingredient-category.module.css';
import {ingredientType} from '../../utils/types';

//  В разметке div с вложенным div-списком ингредиентов заданной категории  //
export function IngredientCategory({ id, typeList }) {
  return (
    <div id={id}>
      <div className={IngredientCategoryStyle.ingredient_category}>
        {typeList.map((element) => {
          return <IngredientItem ingredientData={element} key={element._id} />;
        })}
      </div>
    </div>
  );
}

IngredientCategory.propTypes = {
  typeList: PropTypes.arrayOf(ingredientType).isRequired,
  id: PropTypes.string.isRequired,
};
