/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DialogDetailPurchaseSaleComponent } from './dialog-detail-purchase-sale.component';

describe('DialogDetailPurchaseSaleComponent', () => {
  let component: DialogDetailPurchaseSaleComponent;
  let fixture: ComponentFixture<DialogDetailPurchaseSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDetailPurchaseSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDetailPurchaseSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
