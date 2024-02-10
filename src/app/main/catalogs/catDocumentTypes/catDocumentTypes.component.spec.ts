/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CatDocumentTypesComponent } from './catDocumentTypes.component';

describe('CatDocumentTypesComponent', () => {
  let component: CatDocumentTypesComponent;
  let fixture: ComponentFixture<CatDocumentTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatDocumentTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatDocumentTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
