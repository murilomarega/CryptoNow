import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { updateCryptoFavoriteArray, updateFavoriteCryptosDataSuccess } from 'src/app/states/crypto/cryptos.actions';
import {
  getCryptoFavorites,
  getFavoriteCryptosData,
} from 'src/app/states/crypto/cryptos.selector';
import { CryptoState, ICrypto } from 'src/app/states/crypto/cryptos.state';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss'],
})
export class ChipsComponent implements OnInit, OnDestroy {
  savedCryptos$: Observable<string[]>;
  savedCryptos: string[];
  savedCryptosSubscription: Subscription;

  savedCryptosData$: Observable<ICrypto[]>;
  savedCryptosData: ICrypto[];
  savedCryptosDataSubscription$: Subscription;

  constructor(private store: Store<CryptoState>) {}

  ngOnInit(): void {
    this.savedCryptos$ = this.store.select(getCryptoFavorites);
    this.savedCryptosSubscription = this.savedCryptos$.subscribe(
      (items) => (this.savedCryptos = items)
    );

    this.savedCryptosData$ = this.store.select(getFavoriteCryptosData);
    this.savedCryptosDataSubscription$ = this.savedCryptosData$.subscribe(
      (subscribeSavedData) => {
        this.savedCryptosData = subscribeSavedData;
      }
    );
  }

  ngOnDestroy(): void {
    this.savedCryptosSubscription.unsubscribe();
  }

  removeCryptoFromFavorites(cryptoId: string) {
    let editableArr = [...this.savedCryptos];
    let editableArrData = [...this.savedCryptosData];

    editableArr.splice(
      editableArr.findIndex((item) => item === cryptoId),
      1
    );

    editableArrData.splice(
      editableArrData.findIndex((item) => item.asset_id === cryptoId),
      1
    );
    this.store.dispatch(
      updateCryptoFavoriteArray({ favoriteCryptos: editableArr })
    );

    this.store.dispatch(
      updateFavoriteCryptosDataSuccess({ favoriteCryptosData: editableArrData })
    );
  }
}
