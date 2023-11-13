/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OtcTradingComponent } from './otcTrading.component';

describe('OtcTradingComponent', () => {
  let component: OtcTradingComponent;
  let fixture: ComponentFixture<OtcTradingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtcTradingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtcTradingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
