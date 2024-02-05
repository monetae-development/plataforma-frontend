/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OtcBriefcaseComponent } from './otcBriefcase.component';

describe('OtcBriefcaseComponent', () => {
  let component: OtcBriefcaseComponent;
  let fixture: ComponentFixture<OtcBriefcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtcBriefcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtcBriefcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
