// Добавляем хуки для роутинга
// Routes - функция/компонент, которая объединяет компоненты Route
// Route - компонент REACT, в котором указывается маршрут
// useNavigate - использовать для программной навигации в приложении.
// useLocation - для получения текущего URL-адреса приложения https://disk.yandex.ru/d/YzZHOa8JAgJCOQ
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
//  Делаем импорт страниц из папки pages
import {
  RegisterPage,
  LoginPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  HomePage,
  ProfilePage,
  IngredientPage,
  OrdersPage,
  FeedPage,
  NotFoundPage,
} from "./pages";
// Импортируем защищенный компонент
import { ProtectedRouteElement } from "./components/protected-route/protected-route";
// Импортируем компонент
import { IngredientDetails } from "./components/ingredient-details/ingredient-details";
// Импортируем модалку
import { Modal } from "./components/modal/modal";
//Импортируем константы
import { pageUrls } from "./utils/constants";




const App = () => {

  const location = useLocation();
  const navigate = useNavigate();

  //  Смотрю как открывают ингридиент и показываю модалку или страницу 
  const isBackground = location.state && location.state.ingredientModal;

  //  Маршруты для всех: home, ingredient, feed,  404 //
  //  ...для авторизованных: profile, profile/orders, profile/orders/:id  //
  //  ...для не-авторизованных: login, register?, forgot-password, reset-password?  //
  return (
    <Routes>
      <Route path={ pageUrls.home } element={<HomePage />} />
      <Route
        path={ pageUrls.reg }
        element={
          <ProtectedRouteElement
            element={<RegisterPage />}
            showWhen="notLoggedIn"
          />
        }
      />
      <Route
        path={ pageUrls.login }
        element={
          <ProtectedRouteElement
            element={<LoginPage />}
            showWhen="notLoggedIn"
          />
        }
      />
      <Route
        path={ pageUrls.forgot }
        element={
          <ProtectedRouteElement
            element={<ForgotPasswordPage />}
            showWhen="notLoggedIn"
          />
        }
      />
      <Route
        path={ pageUrls.reset }
        element={
          <ProtectedRouteElement
            element={<ResetPasswordPage />}
            showWhen="notLoggedIn"
          />
        }
      />
      <Route
        path={ pageUrls.profile }
        element={
          <ProtectedRouteElement
            element={<ProfilePage />}
            showWhen="loggedIn"
          />
        }
      />
      <Route
        path={ pageUrls.proforders }
        element={
          <ProtectedRouteElement element={<OrdersPage />} showWhen="loggedIn" />
        }
      />
      <Route path={ pageUrls.feed } element={<FeedPage />} />
      {isBackground && (
        <Route
          path={ pageUrls.ingred }
          element={
            <Modal handleClose={() => navigate(-1)} title="Детали ингредиента">
              <IngredientDetails />
            </Modal>
          }
        />
      )}
      <Route path={ pageUrls.ingred } element={<IngredientPage />} />
      <Route path={ pageUrls.notfound } element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
