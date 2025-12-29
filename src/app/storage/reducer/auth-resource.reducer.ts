import { Resource } from 'src/app/models/Resource';
import {
  ActionEx,
  AuthResourceActionTypes,
} from '../actions/auth-resource.action';

export const initialState: Resource = {
  isResourceAuthenticated: false,
  resource: null,
};

export function AuthResourceReducer(state = initialState, action: ActionEx) {
  switch (action.type) {
    case AuthResourceActionTypes.LoginResource: {
      return {
        isResourceAuthenticated: true,
        resource: action.payload,
      };
    }
    case AuthResourceActionTypes.LogoutResource:
      return {
        isResourceAuthenticated: false,
        resource: null,
      };
    case AuthResourceActionTypes.UpdateResourcePermissions: {
      return {
        ...state,
        resource: {
          ...state.resource,
          permissions: action.payload,
        },
      };
    }
    default: {
      return state;
    }
  }
}
