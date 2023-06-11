
//  Страница ленты заказов 
import { AppHeader } from '../components/app-header/app-header';
//  Стили как в профиле
import FeedStyles from './feed.module.css';

//  Пока в разметке шапка и заголовок страницы
export const FeedPage = () => {
  return (
    <div>
      <AppHeader />
      <div className={FeedStyles.container}>
        <h1 className='text text_type_main-large'>Лента заказов</h1>
      </div>
    </div>
  );
}