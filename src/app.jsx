// Добавляем хуки для роутинга
// Routes - функция/компонент, которая объединяет компоненты Route
// Route - компонент REACT, в котором указывается маршрут
// useLocation - для получения текущего URL-адреса приложения https://disk.yandex.ru/d/YzZHOa8JAgJCOQ
import { Routes, Route, useLocation } from 'react-router-dom';
import AppHeader from './components/app-header/app-header';
//  Делаем импорт страниц из папки pages
import {
  RegisterPage,
  IngredientsPage,
  LoginPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  HomePage,
  ProfilePage,
  FeedPage,
  NotFoundPage,
} from './pages';

import { useEffect } from 'react';
import { getCookie } from './utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './services/actions/auth';
import { ProtectedRouteElement } from './components/protected-route';
import { getBurgerIngredients } from './services/actions/burger-ingredients';
import { DELETE_CURRENT_INGREDIENT, SET_CURRENT_INGREDIENT } from './services/actions/current-ingredient';
import { SET_MODAL } from './services/actions/modal';
// Импортируем компонент
import IngredientDetails from './components/inngredient-details/ingredient-details';
// Импортируем модалку
import Modal from './components/modal/modal';
//Импортируем константы
import { pageUrls } from "./utils/constants";

function App() {
  const { currentModal } = useSelector(store => store.modal)
  const location = useLocation();
  const background = location.state && location.state.background;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(getCookie('token')));
    dispatch(getBurgerIngredients()); 
    if (location.state) {
      dispatch({
        type: SET_CURRENT_INGREDIENT,
        current: location.state.currentIngredient
      })
      dispatch({
        type: SET_MODAL,
        currentModal: <IngredientDetails ingredient={location.state.currentIngredient} />,
        resetActionType: DELETE_CURRENT_INGREDIENT
      })
    }
  }, [dispatch]);

  const app = (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route path='/login' element={<ProtectedRouteElement element={<LoginPage />} anonymous={true} />} />
        <Route path='/register' element={<ProtectedRouteElement element={<RegisterPage />} anonymous={true} />} />
        <Route path='/forgot-password' element={<ProtectedRouteElement element={<ForgotPasswordPage />} anonymous={true} />} />
        <Route path='/reset-password' element={<ProtectedRouteElement element={<ResetPasswordPage />}  anonymous={true} /> } />
        <Route path='/profile' element={<ProtectedRouteElement element={<ProfilePage />} />} />
        <Route path='/profile/orders' element={<ProtectedRouteElement element={<ProfilePage />} />} />
        <Route path='/profile/orders/:id' element={<ProtectedRouteElement element={<ProfilePage />} />} />
        <Route path='*' element={<NotFoundPage />} />
        <Route path='/ingredients/:id' element={<IngredientsPage />} />
        <Route path={ pageUrls.feed } element={<FeedPage />} />
      </Routes>
      {background && <Routes>
        <Route path='/ingredients/:id' element={
          <Modal>
            {currentModal}
          </Modal>} />
      </Routes>}
    </>
  );

  return app;
}

export default App;