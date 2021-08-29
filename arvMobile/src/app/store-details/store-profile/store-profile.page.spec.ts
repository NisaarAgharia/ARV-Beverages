import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreProfilePage } from './store-profile.page';

describe('StoreProfilePage', () => {
  let component: StoreProfilePage;
  let fixture: ComponentFixture<StoreProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreProfilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
