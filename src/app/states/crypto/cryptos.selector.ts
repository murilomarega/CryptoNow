import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CryptoState } from './cryptos.state';
export const CRYPTO_STATE_NAME = 'crypto';

const getCryptoState = createFeatureSelector<CryptoState>(CRYPTO_STATE_NAME);

export const getLoading = createSelector(getCryptoState, (state) => {
  return state.loading;
});

export const getErrorMessage = createSelector(getCryptoState, (state) => {
  return state.errorMessage;
});

export const getCryptos = createSelector(getCryptoState, (state) => {
  return state.cryptos.filter(
    (item) =>
      item.asset_id.toLowerCase().includes(state.textFilter.toLowerCase()) ||
      item.name.toLowerCase().includes(state.textFilter.toLowerCase())
  );
});

export const getCryptoFavorites = createSelector(getCryptoState, (state) => {
  return state.favoriteCryptos;
});

export const getFavoriteCryptosData = createSelector(
  getCryptoState,
  (state) => {
    return state.favoriteCryptosData;
  }
);

export const getTextFilter = createSelector(getCryptoState, (state) => {
  return state.textFilter;
});

export const getIsFirstAccess = createSelector(getCryptoState, (state) => {
  return {
    isFirstAccess: state.isFirstAccess,
    favoriteCryptos: state.favoriteCryptos,
  };
});

export const getFavoritesUpdatedDate = createSelector(
  getCryptoState,
  (state) => state.favoritesUpdatedAt
);