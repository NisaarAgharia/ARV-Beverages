import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PwsStoresNearbyPage } from './pws-stores-nearby.page';

describe('PwsStoresNearbyPage', () => {
  let component: PwsStoresNearbyPage;
  let fixture: ComponentFixture<PwsStoresNearbyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PwsStoresNearbyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PwsStoresNearbyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
