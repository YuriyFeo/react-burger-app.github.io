import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './form.module.css';
import { forgotPasswordReset } from '../utils/api';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/use-form';

export function ForgotPasswordPage() {

  const location = useLocation();



  const { values, handleChange } = useForm({
    email: '',
  })

  const navigate = useNavigate();

  const onClickResetPassword = (e) => {
    e.preventDefault();

    forgotPasswordReset(values)
    .then(() => {
      navigate('/reset-password', { state: location })
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const onLoginClick = () => {
    navigate('/login');
  }

  return (
    <form className={`${styles.form}`} onSubmit={onClickResetPassword}>
      <h2 className={`text text_type_main-medium mb-6`}>Восстановление пароля</h2>
      <EmailInput
        name={'email'}
        isIcon={false}
        extraClass="mb-6"
        placeholder="Укажите e-mail"
        onChange={handleChange}
        value={values.email}
      />
      <Button
        htmlType="submit"
        type="primary"
        size="medium"
        extraClass="mb-20"
        >
        Восстановить
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