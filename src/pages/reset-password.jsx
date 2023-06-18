import { useEffect } from 'react';
import { PasswordInput, Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './form.module.css';
import { resetPasswordRequest } from '../utils/api';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/use-form';

export function ResetPasswordPage() {

  const navigate = useNavigate();
  const location = useLocation();

  const { values, handleChange } = useForm({
    password: '',
    token: ''
  })

  const onClickSubmit = (e) => {
    e.preventDefault();

    resetPasswordRequest(values)
      .then(() => {
        navigate('/login');
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const onLoginClick = () => {
    navigate('/login');
  }

  useEffect(() => {
    if (location.state) {
      location.state.pathname !== '/forgot-password' && navigate('/')
    } else {
      navigate('/');  
    }
  }, [])

  return (
    <form className={`${styles.form}`} onSubmit={onClickSubmit}>
      <h2 className={`text text_type_main-medium mb-6`}>Восстановление пароля</h2>
      <PasswordInput
        placeholder="Введите новый пароль"
        extraClass={'mb-6'}
        onChange={handleChange}
        value={values.password}
      />
      <Input
        type="text"
        placeholder="Введите код из письма"
        extraClass="mb-6"
        onChange={handleChange}
        value={values.token}
      />
      <Button
        htmlType="submit"
        type="primary"
        size="medium"
        extraClass="mb-20"
      >
        Сохранить
      </Button>
      <p className="text text_type_main-default text_color_inactive">
        Вспомнили пароль?
        <Button
          htmlType="button"
          type="secondary"
          size="medium"
          extraClass={`${styles.secondary_button}`}
          onClick={onLoginClick}
        >
          Войти
        </Button>
      </p>
    </form>
  );
}