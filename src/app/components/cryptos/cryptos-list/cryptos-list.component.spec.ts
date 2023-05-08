import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptosListComponent } from './cryptos-list.component';

describe('CryptosListComponent', () => {
  let component: CryptosListComponent;
  let fixture: ComponentFixture<CryptosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CryptosListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CryptosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
