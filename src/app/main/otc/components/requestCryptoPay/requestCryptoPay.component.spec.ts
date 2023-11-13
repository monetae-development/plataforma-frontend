/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OTCRequestCryptoPayComponent } from './requestCryptoPay.component';

describe('RequestCryptoPayComponent', () => {
  let component: OTCRequestCryptoPayComponent;
  let fixture: ComponentFixture<OTCRequestCryptoPayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OTCRequestCryptoPayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OTCRequestCryptoPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
