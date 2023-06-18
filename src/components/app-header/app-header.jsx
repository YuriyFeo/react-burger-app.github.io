//  Компонент шапка  
//  Из UI-библиотеки: лого, иконки, типо, отступы 
//  @ya.praktikum/react-developer-burger-ui-components 

import React from 'react';
//  Позже сделаем импорт хуков для управления состоянием меню 
import { useLocation, NavLink, matchPath } from 'react-router-dom';
import AppHeaderStyle from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import {pageUrls} from "../../utils/constants";


function AppHeader() {
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
    <header className={AppHeaderStyle.header}>
      {/* <nav className={AppHeaderStyle.navigation}> */}
      {/*   <ul className={AppHeaderStyle.menu}>
          <li className={AppHeaderStyle.menu_bar}>
            <Link to='/' className={`${AppHeaderStyle.menu_item} pl-5 pr-5 pt-4 pb-4 mr-2`}  >
              <BurgerIcon type="primary" />
              <p className="text text_type_main-default pl-2">
                Конструктор
              </p>
            </Link>
            <a className={`${AppHeaderStyle.menu_item} pr-5 pl-5 pt-4 pb-4`} href='#'>
              <ListIcon type="secondary" />
              <p className="text text_type_main-default pl-2 text_color_inactive">
                Лента заказов
              </p>
            </a>

          </li>
          <li className={AppHeaderStyle.logo}>
            <Link to='/'>
              <Logo />
            </Link>
          </li>
          <li>
            <Link to={'/profile'} className={`${AppHeaderStyle.personal_account_login} pr-5 pl-5 pt-4 pb-4`}>
              <ProfileIcon type="secondary" />
              <p className="text text_type_main-default pl-2 text_color_inactive">
                Личный кабинет
              </p>
            </Link>
          </li>
        </ul> */}


<nav className={AppHeaderStyle.navigation}>
        <ul className={AppHeaderStyle.menu}>
          <NavLink to={pageUrls.home} className={`${AppHeaderStyle.menu_item} pl-5 pr-5 pt-4 pb-4 mr-2`}>
            <BurgerIcon type={activeHome ? 'primary' : 'secondary'} />
            <p className={activeHome ? 'ml-2 text text_type_main-default' : 'ml-2 text text_type_main-default text_color_inactive'}>Конструктор</p>
          </NavLink>
          <NavLink to={pageUrls.feed} className={`${AppHeaderStyle.menu_item} pl-5 pr-5 pt-4 pb-4 mr-2`}>
            <ListIcon type={activeFeed ? 'primary' : 'secondary'} />
            <p className={activeFeed ? 'ml-2 text text_type_main-default' : 'ml-2 text text_type_main-default text_color_inactive'}>Лента заказов</p>
          </NavLink>
          <NavLink to={pageUrls.home} className={AppHeaderStyle.logo}>  
            <Logo />
          </NavLink>
          <NavLink to={pageUrls.profile} className={`${AppHeaderStyle.menu_item} pl-5 pr-5 pt-4 pb-4 mr-2`}>
            <ProfileIcon type={activeProfile ? 'primary' : 'secondary'} />
            <p className={activeProfile ? 'ml-2 text text_type_main-default' : 'ml-2 text text_type_main-default text_color_inactive'}>Личный кабинет</p>
          </NavLink>
        </ul>
      </nav>
    </header>
  );
}

//  Типизация не нужна, нет пропсов  //

export default React.memo(AppHeader);