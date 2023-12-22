/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DialogResumenSendComponent } from './dialog-resumen-send.component';

describe('DialogResumenSendComponent', () => {
  let component: DialogResumenSendComponent;
  let fixture: ComponentFixture<DialogResumenSendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogResumenSendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogResumenSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
