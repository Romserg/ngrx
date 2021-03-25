import { createAction, createReducer, on } from '@ngrx/store';

export const userReducer = createReducer(
  { maskUserName: false, maskUserPassword: false },
  on(createAction('[User] Toggle Mask User Name'), state => {
    return {
      ...state,
      maskUserName: !state.maskUserName,
      maskUserPassword: !state.maskUserPassword,
    };
  }),
);
