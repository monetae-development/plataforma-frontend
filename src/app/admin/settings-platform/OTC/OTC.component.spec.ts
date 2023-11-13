/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OTCComponent } from './OTC.component';

describe('OTCComponent', () => {
  let component: OTCComponent;
  let fixture: ComponentFixture<OTCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OTCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OTCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
