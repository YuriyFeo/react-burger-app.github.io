//  Здесь все утилиты для регистрации и авторизации. Все как в тренажере

import { pageUrls } from "./constants";

//  Получаю куки
export const getCookie = (name) => {
  //  создаю массив cookie, подходящих под regexp
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)"
    )
  );
  //  если массив не нулевой, возвращаю второй (узнать почему?) элемент или undefined
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

//  Сохраняю полученный токен в куки
export const setCookie = (name, value, props = {}) => {
  props = { path: pageUrls.home, ...props };
  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
};

//  Сохраняю и обновляю куки, Срок жизни токена — 20 минут
export const setCookies = (accessToken, refreshToken) => {
  const expirationAt = new Date(new Date().getTime() + 20 * 60000);
  setCookie("accessToken", accessToken.split("Bearer ")[1], {
    expires: expirationAt,
  });
  setCookie("refreshToken", refreshToken);
};

//  Удаляю куки и выставляю таймер, чтобы становились невалидными сразу
export const deleteCookie = (name) => {
  setCookie(name, "", { "max-age": -1, path: pageUrls.home });
};

//  Получение токена и рефреш токена из куки
export const authTokens = () => {
  const accessToken = getCookie("accessToken");
  const refreshToken = getCookie("refreshToken");
  return { accessToken, refreshToken };
};
