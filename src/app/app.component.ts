import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { take } from 'rxjs';
import { updateFirstAccess } from './states/crypto/cryptos.actions';
import { getIsFirstAccess } from './states/crypto/cryptos.selector';
import { CryptoState } from './states/crypto/cryptos.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'CryptoNow';

  constructor(private store: Store<CryptoState>, private router: Router) {}

  ngOnInit(): void {
    this.store
      .pipe(select(getIsFirstAccess), take(1))
      .subscribe((data) => {
        if (data.isFirstAccess) {
          this.store.dispatch(updateFirstAccess());
          return;
        }

        if (!!data.favoriteCryptos.length) {
          this.router.navigate(['/favorites']);
          return;
        }

        this.router.navigate(['/home']);
      })
      .unsubscribe();
  }
}
