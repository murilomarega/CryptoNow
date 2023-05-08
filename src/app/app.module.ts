import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EntityDataModule } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BottomSheetComponent } from './components/bottom-sheet/bottom-sheet.component';
import { ChipsComponent } from './components/chips/chips.component';
import { CryptosFavoriteListComponent } from './components/cryptos/cryptos-favorite-list/cryptos-favorite-list.component';
import { CryptosListComponent } from './components/cryptos/cryptos-list/cryptos-list.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { FilterComponent } from './components/filter/filter.component';
import { HeaderComponent } from './components/header/header.component';
import { LoadingComponent } from './components/loading/loading.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { entityConfig } from './entity-metadata';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { HomeComponent } from './pages/home/home.component';
import { CryptosEffects } from './states/crypto/cryptos.effects';
import { cryptosReducer } from './states/crypto/cryptos.reducer';
import { MatMenuModule } from '@angular/material/menu';
import { ErrorComponent } from './pages/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FavoritesComponent,
    CryptosListComponent,
    CryptosFavoriteListComponent,
    FilterComponent,
    HeaderComponent,
    ChipsComponent,
    BottomSheetComponent,
    PageHeaderComponent,
    LoadingComponent,
    EmptyStateComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatChipsModule,
    MatIconModule,
    FormsModule,
    MatRippleModule,
    MatButtonModule,
    MatInputModule,
    MatBottomSheetModule,
    MatListModule,
    MatCardModule,
    ScrollingModule,
    MatCheckboxModule,
    MatMenuModule,
    StoreModule.forRoot(
      { crypto: cryptosReducer },
      {
        metaReducers: [localStorageSyncReducer],
      }
    ),
    EffectsModule.forRoot([CryptosEffects]),
    EntityDataModule.forRoot(entityConfig),
    BrowserAnimationsModule,
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function localStorageSyncReducer(reducer: any) {
  return localStorageSync({ keys: ['crypto'] })(reducer);
}
