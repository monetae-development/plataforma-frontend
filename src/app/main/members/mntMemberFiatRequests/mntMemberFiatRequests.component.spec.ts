/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MntMemberFiatRequestsComponent } from './mntMemberFiatRequests.component';

describe('MntMemberFiatRequestsComponent', () => {
  let component: MntMemberFiatRequestsComponent;
  let fixture: ComponentFixture<MntMemberFiatRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MntMemberFiatRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MntMemberFiatRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
