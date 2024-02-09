/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DialogDetailDepositWithdrawComponent } from './dialog-detail-deposit-withdraw.component';

describe('DialogDetailDepositWithdrawComponent', () => {
  let component: DialogDetailDepositWithdrawComponent;
  let fixture: ComponentFixture<DialogDetailDepositWithdrawComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDetailDepositWithdrawComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDetailDepositWithdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
