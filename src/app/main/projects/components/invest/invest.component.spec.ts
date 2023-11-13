/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InvestComponent } from './invest.component';

describe('InvestComponent', () => {
  let component: InvestComponent;
  let fixture: ComponentFixture<InvestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
