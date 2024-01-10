/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MntMemberTransactionsRequestsComponent } from './mntMemberTransactionsRequests.component';

describe('MntMemberTransactionsRequestsComponent', () => {
  let component: MntMemberTransactionsRequestsComponent;
  let fixture: ComponentFixture<MntMemberTransactionsRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MntMemberTransactionsRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MntMemberTransactionsRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
