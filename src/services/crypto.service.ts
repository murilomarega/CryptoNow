import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICrypto } from 'src/app/states/crypto/cryptos.state';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  constructor(private http: HttpClient) {}

  getCryptos(queryIds?: string[]): Observable<ICrypto[]> {
    return this.http.get<ICrypto[]>(`https://rest.coinapi.io/v1/assets`, {
      headers: {
        'X-CoinAPI-Key': environment.xCoinApiKey,
      },
      params: {
        filter_asset_id: queryIds ? queryIds.join(';') : [],
      },
    });
  }
}
