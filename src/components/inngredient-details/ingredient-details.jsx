import React from 'react';
import { useSelector } from 'react-redux';
import styles from './ingredient-details.module.css';

export default function IngredientDetails({ingredient}) {


  return (
    <>
      <h2 className={`${styles.ingredient_info_title} text text_type_main-large ml-10 mt-10 mr-10`}>
        Детали ингредиента
      </h2>
      <img src={ingredient.image_large} alt={ingredient.name} />
      <p className="text text_type_main-medium mt-4">
        {ingredient.name}
      </p>
      <ul className={`${styles.ingredient_info} mt-8 mb-15`}>
        <li className={`${styles.ingredient_info_item}`}>
          <h3 className="text text_type_main-default text_color_inactive">
            Калории, ккал
          </h3>
          <p className="text text_type_main-default text_color_inactive">
            {ingredient.calories}
          </p>
        </li>
        <li className={`${styles.ingredient_info_item}`}>
          <h3 className="text text_type_main-default text_color_inactive">
            Белки, г
          </h3>
          <p className="text text_type_main-default text_color_inactive">
            {ingredient.proteins}
          </p>
        </li>
        <li className={`${styles.ingredient_info_item}`}>
          <h3 className="text text_type_main-default text_color_inactive">
            Жиры, г
          </h3>
          <p className="text text_type_main-default text_color_inactive">
            {ingredient.fat}
          </p>
        </li>
        <li className={`${styles.ingredient_info_item}`}>
          <h3 className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </h3>
          <p className="text text_type_main-default text_color_inactive">
            {ingredient.carbohydrates}
          </p>
        </li>
      </ul>
    </>
  );
}