import { createAction, createReducer, on } from '@ngrx/store';

export interface UserState {
  maskUserPassword: boolean;
}

export const userReducer = createReducer<UserState>(
  { maskUserPassword: false },
  on(createAction('[User] Toggle Mask User Name'), state => {
    return {
      ...state,
      maskUserPassword: !state.maskUserPassword,
    };
  }),
);
