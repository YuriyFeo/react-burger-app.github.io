import React, { useRef } from "react";
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from "react-dnd";
import PropTypes from 'prop-types';
import styles from './burger-constructor-element.module.css'
import {
  ConstructorElement,
  DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { DELETE_CONSTRUCTOR_ELEMENT } from '../../services/actions/burger-constructor';
import { DECREASE_COUNTER } from '../../services/actions/burger-ingredients';

export function BurgerConstructorElement({ name, _id, uuid, image, price, moveIngredient, index }) {

  const dispatch = useDispatch();

  const ref = useRef();

  const handleClose = () => {
    dispatch({
      type: DELETE_CONSTRUCTOR_ELEMENT,
      uuid: uuid
    })
    dispatch({
      type: DECREASE_COUNTER,
      id: _id,
      count: 1
    })
  }

  const [, sortDropRef] = useDrop({
    accept: 'sort',
    hover(item, monitor) {
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveIngredient(dragIndex, hoverIndex);

      item.index = hoverIndex;
    }
  })

  const [{ opacity }, sortRef] = useDrag({
    type: 'sort',
    item: () => {
      return { index, _id }
    },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0 : 1,

    })
  });

  sortRef(sortDropRef(ref));

  return (
    <li className={`${styles.item} ml-2`} ref={ref} style={{ opacity }}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        handleClose={handleClose}
      />
    </li>
  );
}

BurgerConstructorElement.propTypes = {
  name: PropTypes.string,
  _id: PropTypes.string,
  uuid: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
  moveIngredient: PropTypes.func,
  index: PropTypes.number
}