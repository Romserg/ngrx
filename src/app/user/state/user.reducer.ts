import { createAction, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

export interface UserState {
  maskUserPassword: boolean;
}

const initialState: UserState = {
  maskUserPassword: true,
};

const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getMaskUserPassword = createSelector(
  getUserFeatureState,
  state => state.maskUserPassword,
);

export const userReducer = createReducer<UserState>(
  initialState,
  on(createAction('[User] Toggle Mask User Name'), state => {
    return {
      ...state,
      maskUserPassword: !state.maskUserPassword,
    };
  }),
);
