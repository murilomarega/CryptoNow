import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import {
  loadCryptos,
  updateCryptoFavoriteArray,
} from 'src/app/states/crypto/cryptos.actions';
import {
  getCryptoFavorites,
  getCryptos,
  getLoading,
} from 'src/app/states/crypto/cryptos.selector';
import { CryptoState, ICryptosList } from 'src/app/states/crypto/cryptos.state';

@Component({
  selector: 'app-cryptos-list',
  templateUrl: './cryptos-list.component.html',
  styleUrls: ['./cryptos-list.component.scss'],
})
export class CryptosListComponent implements OnInit, OnDestroy {
  cryptosSubscription$: Subscription;
  cryptos$: Observable<ICryptosList[]>;
  cryptos: ICryptosList[];

  loadingSubscription$: Subscription;
  loading$: Observable<boolean>;
  loading: boolean;

  savedCryptosSubscription: Subscription;
  savedCryptos$: Observable<string[]>;
  savedCryptos: string[];

  inputValue = '';

  constructor(private store: Store<CryptoState>) {}

  handleFavoriteUnfavoriteCrypto(crypto: string) {
    let editableArr: string[] = [...this.savedCryptos];

    if (crypto) {
      if (editableArr.findIndex((item) => item === crypto) < 0) {
        editableArr.push(crypto);
      } else {
        editableArr.splice(
          editableArr.findIndex((item) => item === crypto),
          1
        );
      }
      this.store.dispatch(
        updateCryptoFavoriteArray({ favoriteCryptos: editableArr })
      );
    }
  }

  handleVerifyIsSaved(crypto: string) {
    return this.savedCryptos.includes(crypto);
  }

  ngOnInit(): void {
    this.cryptos$ = this.store.select(getCryptos);
    this.loading$ = this.store.select(getLoading);
    this.savedCryptos$ = this.store.select(getCryptoFavorites);

    this.loadingSubscription$ = this.loading$.subscribe(
      (loading) => (this.loading = loading)
    );

    this.cryptosSubscription$ = this.cryptos$.subscribe((cryptosList) => {
      if (!Boolean(cryptosList.length)) {
        this.store.dispatch(loadCryptos());
      } else {
        this.cryptos = cryptosList;
      }
    });

    this.savedCryptosSubscription = this.savedCryptos$.subscribe(
      (items) => (this.savedCryptos = items)
    );
  }

  ngOnDestroy(): void {
    this.loadingSubscription$.unsubscribe();
    this.cryptosSubscription$.unsubscribe();
    this.savedCryptosSubscription.unsubscribe();
  }
}
