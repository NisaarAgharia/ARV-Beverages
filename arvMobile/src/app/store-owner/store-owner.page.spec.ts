import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreOwnerPage } from './store-owner.page';

describe('StoreOwnerPage', () => {
  let component: StoreOwnerPage;
  let fixture: ComponentFixture<StoreOwnerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreOwnerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreOwnerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
