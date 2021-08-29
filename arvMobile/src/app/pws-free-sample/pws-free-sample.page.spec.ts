import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PwsFreeSamplePage } from './pws-free-sample.page';

describe('PwsFreeSamplePage', () => {
  let component: PwsFreeSamplePage;
  let fixture: ComponentFixture<PwsFreeSamplePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PwsFreeSamplePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PwsFreeSamplePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
