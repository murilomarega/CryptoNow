import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, take } from 'rxjs';
import { loadFavoriteCryptosData } from 'src/app/states/crypto/cryptos.actions';
import {
  getCryptoFavorites,
  getFavoritesUpdatedDate,
  getLoading,
} from 'src/app/states/crypto/cryptos.selector';
import { CryptoState } from 'src/app/states/crypto/cryptos.state';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit, OnDestroy {
  updateListInterval: any;

  loading$: Observable<boolean>;

  savedCryptosIds$: Observable<string[]>;
  savedCryptosIdsSubscription$: Subscription;
  savedCryptosIds: string[];

  cryptosLastUpdate$: Observable<Date>;
  cryptosLastUpdateSubscription$: Subscription;
  cryptosLastUpdate: Date;

  constructor(private store: Store<CryptoState>) {}

  updateFavoritesList(updateWithLoading = true) {
    this.store.dispatch(
      loadFavoriteCryptosData({
        favoriteCryptosIds: this.savedCryptosIds,
        updateWithLoading,
      })
    );
  }

  ngOnInit(): void {
    this.loading$ = this.store.select(getLoading);
    this.cryptosLastUpdate$ = this.store.select(getFavoritesUpdatedDate);
    this.savedCryptosIds$ = this.store.select(getCryptoFavorites);

    this.savedCryptosIdsSubscription$ = this.savedCryptosIds$.subscribe(
      (favoritesArr) => {
        this.savedCryptosIds = favoritesArr;
      }
    );

    this.cryptosLastUpdateSubscription$ = this.cryptosLastUpdate$.subscribe(
      (lastUpdate) => (this.cryptosLastUpdate = lastUpdate)
    );

    this.store
      .pipe(select(getCryptoFavorites), take(1))
      .subscribe((favoritesArr) => {
        if (Boolean(favoritesArr.length)) {
          this.updateFavoritesList();
          this.updateListInterval = setInterval(
            () => this.updateFavoritesList(false),
            60000
          );
        }
      })
      .unsubscribe();
  }

  ngOnDestroy(): void {
    this.cryptosLastUpdateSubscription$.unsubscribe();
    this.savedCryptosIdsSubscription$.unsubscribe();
    clearInterval(this.updateListInterval);
  }
}
