import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { setFilterByText } from 'src/app/states/crypto/cryptos.actions';
import {
  getLoading,
  getTextFilter,
} from 'src/app/states/crypto/cryptos.selector';
import { CryptoState } from 'src/app/states/crypto/cryptos.state';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit, OnDestroy {
  loading$: Observable<boolean>;
  subscriptionLoading$: Subscription;
  loading: boolean;

  filterInputValue$: Observable<string>;
  subscriptionFilterInputValue$: Subscription;
  filterInputValue: string;

  constructor(private store: Store<CryptoState>) {}

  handleFilterCryptos() {
    this.disptachUpdateFilterValue();
  }

  handleClearFilterInputField() {
    this.filterInputValue = '';
    this.disptachUpdateFilterValue();
  }

  disptachUpdateFilterValue() {
    this.store.dispatch(setFilterByText({ text: this.filterInputValue }));
  }

  ngOnInit(): void {
    this.loading$ = this.store.select(getLoading);
    this.filterInputValue$ = this.store.select(getTextFilter);

    this.subscriptionLoading$ = this.loading$.subscribe(
      (value) => (this.loading = value)
    );

    this.subscriptionFilterInputValue$ = this.filterInputValue$.subscribe(
      (value) => (this.filterInputValue = value)
    );
  }
  ngOnDestroy(): void {
    this.subscriptionLoading$.unsubscribe();
    this.subscriptionFilterInputValue$.unsubscribe();
  }
}
