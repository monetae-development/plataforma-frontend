/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MntMemberFiatComponent } from './mntMemberFiat.component';

describe('MntMemberFiatComponent', () => {
  let component: MntMemberFiatComponent;
  let fixture: ComponentFixture<MntMemberFiatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MntMemberFiatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MntMemberFiatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
