import { GET_USER_SUCCESS, IS_AUTH, UPDATE_TOKEN, USER_LOGIN, USER_LOGOUT } from "../actions/auth";

const userDataInitialState = 
{
  isAuth: false,
  user: null
};

export const authReducer = (state = userDataInitialState, action) => {
  switch(action.type) {
    case IS_AUTH: {
      return {
        ...state,
        isAuth: true
      }
    }
    case USER_LOGIN: {
      return {
        ...state,
        user: {
          ...state.user,
          email: action.email,
          name: action.name,
          accessToken: action.accessToken
        }
      };
    }
    case UPDATE_TOKEN: {
      return {
        ...state,
        accessToken: action.accessToken
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        user: {
          ...state.user,
          email: action.email,
          name: action.name,
          accessToken: action.accessToken
        }
      };
    }
    case USER_LOGOUT: {
      return {
        ...userDataInitialState,
        isAuth: true
      };
    }
    default: {
      return state;
    }
  }
}