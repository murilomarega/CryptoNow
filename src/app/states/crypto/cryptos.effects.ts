import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { CryptoService } from 'src/services/crypto.service';
import {
  loadCryptos,
  loadCryptosSuccess,
  loadFavoriteCryptosData,
  setErrorMessage,
  setLoading,
  updateFavoriteCryptosDataSuccess,
} from './cryptos.actions';
import { CryptoState, ICryptosList } from './cryptos.state';
import { Router } from '@angular/router';

@Injectable()
export class CryptosEffects {
  constructor(
    private actions$: Actions,
    private cryptosService: CryptoService,
    private store: Store<CryptoState>,
    private router: Router
  ) {}

  loadCryptos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCryptos),
      exhaustMap(() => {
        this.store.dispatch(setLoading({ status: true }));
        return this.cryptosService.getCryptos().pipe(
          map((cryptos) => {
            let mapedCryptos: ICryptosList[] = cryptos.map((crypto) => {
              return {
                asset_id: crypto.asset_id,
                name: crypto.name,
                type_is_crypto: crypto.type_is_crypto,
              };
            });
            this.store.dispatch(setLoading({ status: false }));
            this.store.dispatch(setErrorMessage({ message: '' }));
            return loadCryptosSuccess({ cryptos: mapedCryptos });
          }),
          catchError((err) => {
            this.store.dispatch(setLoading({ status: false }));
            this.store.dispatch(setErrorMessage({ message: err.error.error }));
            this.router.navigate(['error']);
            return EMPTY;
          })
        );
      })
    )
  );

  getFavoriteCryptosData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFavoriteCryptosData),
      exhaustMap(({ favoriteCryptosIds, updateWithLoading }) => {
        if (updateWithLoading) {
          this.store.dispatch(setLoading({ status: true }));
        }
        return this.cryptosService.getCryptos(favoriteCryptosIds).pipe(
          map((cryptos) => {
            this.store.dispatch(setLoading({ status: false }));
            this.store.dispatch(setErrorMessage({ message: '' }));
            return updateFavoriteCryptosDataSuccess({
              favoriteCryptosData: cryptos,
            });
          }),
          catchError((err) => {
            this.store.dispatch(setLoading({ status: false }));
            this.store.dispatch(setErrorMessage({ message: err.error.error }));
            this.router.navigate(['error']);
            return EMPTY;
          })
        );
      })
    )
  );
}
