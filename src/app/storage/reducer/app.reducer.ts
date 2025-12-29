import { DistrictDetail } from 'src/app/models/districtDetails';
import { ActionEx, AppActionTypes } from '../actions/app.actions';

export const initialState = {
  isSidebar: true,
  isLoading: false,
  defaultLang: 'hi',
  districtDetails: DistrictDetail,
  isTableRefresh: false,
  isViewDataRefresh: false,
  isEditing: false,
  isEditingData: null,
};

export function AppReducer(state = initialState, action: ActionEx) {
  switch (action.type) {
    case AppActionTypes.SidebarShow: {
      return {
        ...state,
        isSidebar: true,
      };
    }
    case AppActionTypes.SidebarHide:
      return {
        ...state,
        isSidebar: false,
      };
    case AppActionTypes.LoadderShow: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case AppActionTypes.LoadderHide:
      return {
        ...state,
        isLoading: false,
      };
    case AppActionTypes.ChangeLanguage:
      return {
        ...state,
        defaultLang: action.payload,
      };
    case AppActionTypes.UpdateDistrictDetails:
      return {
        ...state,
        districtDetails: action.payload,
      };
    case AppActionTypes.UpdateTableData:
      state = Object.assign({}, state, {
        isTableRefresh: action.payload,
      });
      return state;
    case AppActionTypes.RefreshViewDataStart:
      state = Object.assign({}, state, {
        isViewDataRefresh: true,
      });
      return state;
    case AppActionTypes.RefreshViewDataStop:
      state = Object.assign({}, state, {
        isViewDataRefresh: false,
      });
      return state;
    case AppActionTypes.RefreshTableAndForm:
      state = Object.assign({}, state, {
        isTableRefresh: action.payload,
        isViewDataRefresh: true,
      });
      return state;
    case AppActionTypes.EditFormData: {
      return {
        ...state,
        isEditing: true,
        isEditingData: action.payload,
      };
    }
    case AppActionTypes.StopEditFormData:
      return {
        ...state,
        isEditing: false,
        isEditingData: null,
      };
    default: {
      return state;
    }
  }
}
