/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CatDefaultComponent } from './catDefault.component';

describe('CatDefaultComponent', () => {
  let component: CatDefaultComponent;
  let fixture: ComponentFixture<CatDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CatDefaultComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
