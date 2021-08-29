import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PwsOrderPage } from './pws-order.page';

describe('PwsOrderPage', () => {
  let component: PwsOrderPage;
  let fixture: ComponentFixture<PwsOrderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PwsOrderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PwsOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
