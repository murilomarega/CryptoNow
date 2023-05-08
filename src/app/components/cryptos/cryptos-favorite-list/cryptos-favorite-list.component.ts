import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import {
  updateCryptoFavoriteArray,
  updateFavoriteCryptosDataSuccess,
} from 'src/app/states/crypto/cryptos.actions';
import {
  getCryptoFavorites,
  getFavoriteCryptosData,
} from 'src/app/states/crypto/cryptos.selector';
import { CryptoState, ICrypto } from 'src/app/states/crypto/cryptos.state';

@Component({
  selector: 'app-cryptos-favorite-list',
  templateUrl: './cryptos-favorite-list.component.html',
  styleUrls: ['./cryptos-favorite-list.component.scss'],
})
export class CryptosFavoriteListComponent implements OnInit, OnDestroy {
  colspan = 1;
  rowspan = 1;

  savedCryptosIds$: Observable<string[]>;
  savedCryptosIdsSubscription$: Subscription;
  savedCryptosIds: string[];

  savedCryptosData$: Observable<ICrypto[]>;
  savedCryptosDataSubscription$: Subscription;
  savedCryptosData: ICrypto[];

  constructor(private store: Store<CryptoState>) {}

  ngOnInit(): void {
    this.savedCryptosIds$ = this.store.select(getCryptoFavorites);
    this.savedCryptosIdsSubscription$ = this.savedCryptosIds$.subscribe(
      (subscribeSavedIds) => {
        this.savedCryptosIds = subscribeSavedIds;
      }
    );
    this.savedCryptosData$ = this.store.select(getFavoriteCryptosData);
    this.savedCryptosDataSubscription$ = this.savedCryptosData$.subscribe(
      (subscribeSavedData) => {
        this.savedCryptosData = subscribeSavedData;
      }
    );
  }

  removeFromFavorites(cryptoId: string) {
    let editableArrIds = [...this.savedCryptosIds];
    let editableArrData = [...this.savedCryptosData];

    editableArrIds.splice(
      editableArrIds.findIndex((item) => item === cryptoId),
      1
    );

    editableArrData.splice(
      editableArrData.findIndex((item) => item.asset_id === cryptoId),
      1
    );

    this.store.dispatch(
      updateCryptoFavoriteArray({ favoriteCryptos: editableArrIds })
    );

    this.store.dispatch(
      updateFavoriteCryptosDataSuccess({ favoriteCryptosData: editableArrData })
    );
  }

  ngOnDestroy(): void {
    this.savedCryptosIdsSubscription$.unsubscribe();
    this.savedCryptosDataSubscription$.unsubscribe();
  }
}
