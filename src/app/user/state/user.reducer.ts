import { createAction, createReducer, on } from '@ngrx/store';

export const userReducer = createReducer(
  { maskUserPassword: false },
  on(createAction('[User] Toggle Mask User Name'), state => {
    return {
      ...state,
      maskUserPassword: !state.maskUserPassword,
    };
  }),
);
