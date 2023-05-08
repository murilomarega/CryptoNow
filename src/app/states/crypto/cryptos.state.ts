export interface ICrypto {
  asset_id: string;
  name: string;
  type_is_crypto: number;
  id_icon: string;
  data_end: string;
  data_orderbook_end: string;
  data_orderbook_start: string;
  data_quote_end: string;
  data_quote_start: string;
  data_start: string;
  data_symbols_count: number;
  data_trade_end: string;
  data_trade_start: string;
  volume_1day_usd: number;
  volume_1hrs_usd: number;
  volume_1mth_usd: number;
  price_usd?: number;
}

export interface ICryptosList {
  asset_id: string;
  name: string;
  type_is_crypto: number;
}

export interface CryptoState {
  cryptos: ICryptosList[];
  loading: boolean;
  errorMessage: string;
  textFilter: string;
  favoriteCryptos: string[];
  favoriteCryptosData: ICrypto[];
  isFirstAccess: boolean;
  favoritesUpdatedAt: Date;
}

export const initialState: CryptoState = {
  cryptos: getLocalStorageInitialStateValue('cryptos', []),
  loading: false,
  errorMessage: '',
  textFilter: '',
  favoriteCryptos: getLocalStorageInitialStateValue('favoriteCryptos', []),
  favoriteCryptosData: [],
  isFirstAccess: getLocalStorageInitialStateValue('isFirstAccess', true),
  favoritesUpdatedAt: getLocalStorageInitialStateValue(
    'favoritesUpdatedAt',
    null
  ),
};

function getLocalStorageInitialStateValue(
  key: string,
  defaultValue: any = null
): any {
  const cryptoState = localStorage.getItem('crypto');
  if (cryptoState) {
    return JSON.parse(cryptoState)[key];
  }
  return defaultValue;
}
