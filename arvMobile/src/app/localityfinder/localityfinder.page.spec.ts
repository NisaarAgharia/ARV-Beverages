import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalityfinderPage } from './localityfinder.page';

describe('LocalityfinderPage', () => {
  let component: LocalityfinderPage;
  let fixture: ComponentFixture<LocalityfinderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalityfinderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalityfinderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
