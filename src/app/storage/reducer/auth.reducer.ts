import { User } from 'src/app/models/user';
import { ActionEx, AuthActionTypes } from '../actions/auth.actions';

export const initialState: User = {
  isAuthenticated: false,
  user: null,
};

export function AuthReducer(state = initialState, action: ActionEx) {
  switch (action.type) {
    case AuthActionTypes.Login: {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    }
    case AuthActionTypes.Logout:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case AuthActionTypes.TNCACCEPT: {
      return {
        ...state,
        user: {
          ...state.user,
          tnc_accepted: true,
        },
      };
    }
    case AuthActionTypes.UpdatePermissions: {
      return {
        ...state,
        user: {
          ...state.user,
          permissions: action.payload,
        },
      };
    }
    default: {
      return state;
    }
  }
}
