/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MarketGridComponent } from './market-grid.component';

describe('MarketGridComponent', () => {
  let component: MarketGridComponent;
  let fixture: ComponentFixture<MarketGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
