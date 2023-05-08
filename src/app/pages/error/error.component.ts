import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { getErrorMessage } from 'src/app/states/crypto/cryptos.selector';
import { CryptoState } from 'src/app/states/crypto/cryptos.state';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit {
  errorMessage$: Observable<string>;
  errorMessageSubscription$: Subscription;
  errorMessage: string;

  constructor(private store: Store<CryptoState>) {}

  ngOnInit(): void {
    this.errorMessage$ = this.store.select(getErrorMessage);
    this.errorMessageSubscription$ = this.errorMessage$.subscribe((message) => {
      this.errorMessage = message;
    });
  }
}
