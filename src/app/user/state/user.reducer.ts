import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { User } from '../user';
import * as UserActions from './user.actions';

export interface UserState {
  maskUserPassword: boolean;
  currentUser: User;
}

const initialState: UserState = {
  maskUserPassword: true,
  currentUser: null,
};

const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getMaskUserPassword = createSelector(
  getUserFeatureState,
  state => state.maskUserPassword,
);

export const getCurrentUser = createSelector(
  getUserFeatureState,
  state => state.currentUser,
);

export const userReducer = createReducer<UserState>(
  initialState,
  on(UserActions.maskUserPassword, state => {
    return {
      ...state,
      maskUserPassword: !state.maskUserPassword,
    };
  }),
);
