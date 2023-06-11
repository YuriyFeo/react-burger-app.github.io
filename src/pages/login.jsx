/*  
Страница авторизации с использованием библиотеки компонентов.
Пока не нужно описывать саму функциональность авторизации.
В качестве минимальной работы необходимо настроить переходы:
Клик на «Зарегистрироваться» направляет пользователя на маршрут /register.
Клик на «Восстановить пароль» направляет пользователя на маршрут /forgot-password.
*/
//  Хуки react, router-dom, redux, useForm
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "../hooks/useForm";
// Шапка
import { AppHeader } from "../components/app-header/app-header";
//  Из библиотеки беру кнопку, поле ввода обычный инпут и поле пароля
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
//  action логина для redux
import { loginUser } from "../services/actions/auth-actions";
//  Стиль
import LoginStyle from "./login.module.css";
import {pageUrls} from "../utils/constants";

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // хук для стейтов поля ввода useForm тоже пока не делаю
  //  Задаю начальное состояние данных пользователя
  const { data, handleDataChange } = useForm({
    email: "",
    password: "",
  });

  const submitLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(data));
  };

  //  Разметка: шапка, flex-контейнер с grid-формой внутри 
  return (
    <div>
      <AppHeader />
      <div className={LoginStyle.container}>
        <form className={LoginStyle.form} onSubmit={submitLogin}>
          <h1 className="text text_type_main-medium">Вход</h1>
          <Input
            type={"email"}
            placeholder={"E-mail"}
            onChange={handleDataChange}
            value={data.email}
            name={"email"}
          />
          <PasswordInput
            onChange={handleDataChange}
            value={data.password}
            name={"password"}
            icon="ShowIcon"
          />
          <Button htmlType="submit" type="primary" size="medium">
            Войти
          </Button>
        </form>
        <p className="text text_type_main-default">
          Вы&nbsp;— новый пользователь?
          <Button
            onClick={() => navigate( pageUrls.reg  )}
            htmlType="button"
            type="secondary"
            size="medium"
          >
            Зарегистрироваться
          </Button>
        </p>
        <p className="text text_type_main-default">
          Забыли пароль?
          <Button
            onClick={() => navigate(pageUrls.forgot)}
            htmlType="button"
            type="secondary"
            size="medium"
          >
            Восстановить пароль
          </Button>
        </p>
      </div>
    </div>
  );
};