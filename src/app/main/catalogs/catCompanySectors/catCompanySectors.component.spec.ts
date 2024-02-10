/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CatCompanySectorsComponent } from './catCompanySectors.component';

describe('CatCompanySectorsComponent', () => {
  let component: CatCompanySectorsComponent;
  let fixture: ComponentFixture<CatCompanySectorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatCompanySectorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatCompanySectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
