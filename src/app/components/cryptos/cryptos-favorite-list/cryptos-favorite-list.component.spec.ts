import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptosFavoriteListComponent } from './cryptos-favorite-list.component';

describe('CryptosFavoriteListComponent', () => {
  let component: CryptosFavoriteListComponent;
  let fixture: ComponentFixture<CryptosFavoriteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CryptosFavoriteListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CryptosFavoriteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
