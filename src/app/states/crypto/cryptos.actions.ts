import { createAction, props } from '@ngrx/store';
import { ICrypto, ICryptosList } from './cryptos.state';

export const LOAD_CRYPTOS = '[cryptos list] load cryptos';
export const LOAD_CRYPTOS_SUCCESS = '[cryptos list] load cryptos success';

export const UPDATE_CRYPTO_FAVORITE_ACTION =
  '[cryptos list] update crypto favorite';

export const SET_LOADING_ACTION = '[cryptos list] set loading spinner';
export const SET_ERROR_MESSAGE = '[cryptos list] set error message';

export const SET_FILTER_BY_TEXT = '[cryptos list] set filter by text';

export const UPDATE_IS_FIRST_ACCESS = '[cryptos list] update is first access';

export const LOAD_FAVORITES_CRYPTOS_DATA =
  '[cryptos list] load favorite cryptos data';
export const LOAD_FAVORITES_CRYPTOS_DATA_SUCCESS =
  '[cryptos list] load favorite cryptos success';

export const loadCryptos = createAction(LOAD_CRYPTOS);
export const loadCryptosSuccess = createAction(
  LOAD_CRYPTOS_SUCCESS,
  props<{ cryptos: ICryptosList[] }>()
);

export const updateCryptoFavoriteArray = createAction(
  UPDATE_CRYPTO_FAVORITE_ACTION,
  props<{ favoriteCryptos: string[] }>()
);

export const setLoading = createAction(
  SET_LOADING_ACTION,
  props<{ status: boolean }>()
);

export const setErrorMessage = createAction(
  SET_ERROR_MESSAGE,
  props<{ message: string }>()
);

export const setFilterByText = createAction(
  SET_FILTER_BY_TEXT,
  props<{ text: string }>()
);

export const loadFavoriteCryptosData = createAction(
  LOAD_FAVORITES_CRYPTOS_DATA,
  props<{ favoriteCryptosIds: string[]; updateWithLoading: boolean }>()
);

export const updateFavoriteCryptosDataSuccess = createAction(
  LOAD_FAVORITES_CRYPTOS_DATA_SUCCESS,
  props<{ favoriteCryptosData: ICrypto[] }>()
);

export const updateFirstAccess = createAction(UPDATE_IS_FIRST_ACCESS);
