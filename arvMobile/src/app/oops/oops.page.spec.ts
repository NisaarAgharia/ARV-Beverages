import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OOPSPage } from './oops.page';

describe('OOPSPage', () => {
  let component: OOPSPage;
  let fixture: ComponentFixture<OOPSPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OOPSPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OOPSPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
