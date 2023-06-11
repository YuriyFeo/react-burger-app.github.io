//  Компонент 'Страница не найдена' реализую самостоятельно 
import { useNavigate } from 'react-router-dom';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
//  Стили пока беру из логина 
import NotFoundStyle from './login.module.css';
import {pageUrls} from "../utils/constants";

export const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className={NotFoundStyle.container}>
      <h1 className='text text_type_main-large mb-5'>Ошибка 404</h1>
      <p className='text text_type_main-medium mb-10'>Страница не найдена.</p>
      <p className='text text_type_main-default'>
        Перейти на страницу
        <Button
          onClick={() => navigate(pageUrls.home)}
          htmlType='button'
          size='medium'
          type='secondary'
        >
          конструктора бургера
        </Button>
      </p>
    </div>
  );
}