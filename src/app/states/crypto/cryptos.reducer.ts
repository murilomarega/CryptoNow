import { createReducer, on } from '@ngrx/store';
import {
  loadCryptosSuccess,
  setErrorMessage,
  setFilterByText,
  setLoading,
  updateCryptoFavoriteArray,
  updateFavoriteCryptosDataSuccess,
  updateFirstAccess,
} from './cryptos.actions';
import { initialState } from './cryptos.state';

export const cryptosReducer = createReducer(
  initialState,
  on(loadCryptosSuccess, (state, payload) => {
    return {
      ...state,
      cryptos: payload.cryptos,
    };
  }),
  on(setLoading, (state, payload) => {
    return {
      ...state,
      loading: payload.status,
    };
  }),
  on(setFilterByText, (state, payload) => {
    return {
      ...state,
      textFilter: payload.text,
    };
  }),
  on(updateCryptoFavoriteArray, (state, payload) => {
    return {
      ...state,
      favoriteCryptos: payload.favoriteCryptos,
    };
  }),
  on(updateFavoriteCryptosDataSuccess, (state, payload) => {
    return {
      ...state,
      favoriteCryptosData: payload.favoriteCryptosData,
      favoritesUpdatedAt: new Date(),
    };
  }),
  on(updateFirstAccess, (state) => {
    return {
      ...state,
      isFirstAccess: false,
    };
  }),
  on(setErrorMessage, (state, payload) => {
    return {
      ...state,
      errorMessage: payload.message,
    };
  })
);
