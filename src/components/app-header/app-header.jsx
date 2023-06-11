//  Компонент шапка  
//  Из UI-библиотеки: лого, иконки, типо, отступы 
//  @ya.praktikum/react-developer-burger-ui-components 

import React from 'react';
//  Позже сделаем импорт хуков для управления состоянием меню 
import { useLocation, NavLink, matchPath } from 'react-router-dom';
import { Logo, BurgerIcon, ListIcon,  ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeaderStyle from './app-header.module.css';

import {pageUrls} from "../../utils/constants";

export const AppHeader = () => {
  const location = useLocation();
  
  //  вынести URLы в контстанты 
  const activeHome = matchPath(location.pathname, pageUrls.home );
  const activeFeed = matchPath(location.pathname, pageUrls.feed );
  const activeProfileHome = matchPath(location.pathname, pageUrls.profile );
  const activeOrders = matchPath(location.pathname, pageUrls.proforders );
  const activeLogin = matchPath(location.pathname, pageUrls.login );
  const activeRegister = matchPath(location.pathname, pageUrls.reg );
  const activeProfile = activeProfileHome || activeOrders || activeLogin || activeRegister;


  return (
    <header className={`pt-4 pb-4 ${AppHeaderStyle.header}`}>  
      <nav className={AppHeaderStyle.navbar}>
        <NavLink to={pageUrls.home} className={`mt-4 mr-7 mb-4 ${AppHeaderStyle.navitem}`}>
          <BurgerIcon type={activeHome ? 'primary' : 'secondary'} />
          <p className={activeHome ? 'ml-2 text text_type_main-default' : 'ml-2 text text_type_main-default text_color_inactive'}>Конструктор</p>
        </NavLink>
        <NavLink to={pageUrls.feed} className={`mt-4 mr-5 mb-4 ml-5 ${AppHeaderStyle.navitem}`}>
          <ListIcon type={activeFeed ? 'primary' : 'secondary'} />
          <p className={activeFeed ? 'ml-2 text text_type_main-default' : 'ml-2 text text_type_main-default text_color_inactive'}>Лента заказов</p>
        </NavLink>
        <NavLink to={pageUrls.home} className={AppHeaderStyle.logo}>  
          <Logo />
        </NavLink>
        <NavLink to={pageUrls.profile} className={`mt-4 mb-4 ml-5 ${AppHeaderStyle.navitem}`}>
          <ProfileIcon type={activeProfile ? 'primary' : 'secondary'} />
          <p className={activeProfile ? 'ml-2 text text_type_main-default' : 'ml-2 text text_type_main-default text_color_inactive'}>Личный кабинет</p>
        </NavLink>
      </nav>
    </header>
  );
}

//  Типизация не нужна, нет пропсов  //

export default React.memo(AppHeader);