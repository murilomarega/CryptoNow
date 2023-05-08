import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetConfig,
} from '@angular/material/bottom-sheet';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { BottomSheetComponent } from 'src/app/components/bottom-sheet/bottom-sheet.component';
import {
  getCryptoFavorites,
  getLoading,
} from 'src/app/states/crypto/cryptos.selector';
import { CryptoState } from 'src/app/states/crypto/cryptos.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  loading$: Observable<boolean>;

  homeInputValue: string;

  savedCryptos$: Observable<string[]>;
  savedCryptosSubscription$: Subscription;
  savedCryptos: string[];

  config: MatBottomSheetConfig = {
    autoFocus: true,
    restoreFocus: false,
  };

  constructor(
    private _bottomSheet: MatBottomSheet,
    private store: Store<CryptoState>
  ) {}

  ngOnInit(): void {
    this.loading$ = this.store.select(getLoading);
    this.savedCryptos$ = this.store.select(getCryptoFavorites);
    this.savedCryptosSubscription$ = this.savedCryptos$.subscribe(
      (items) => (this.savedCryptos = items)
    );
  }

  ngOnDestroy(): void {
    this.savedCryptosSubscription$.unsubscribe();
  }

  handleHomeInputValue(event: any) {
    event.preventDefault();
    this.homeInputValue = '';
    this.handleOpenBottomSheet();
  }

  handleOpenBottomSheet() {
    this._bottomSheet.open(BottomSheetComponent, this.config);
  }
}
