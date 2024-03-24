import { Component, Injector, ViewEncapsulation, OnInit, ViewChild, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SelectItem } from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { CompanyStatus } from '@shared/service-proxies/enum/Company/CompanyStatus.enum';
import { CompanyType } from '@shared/service-proxies/enum/Company/CompanyType.enum';

@Component({
  selector: 'kyc-companyType-form',
  templateUrl: './kycCompanyType.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: [appModuleAnimation()]
})
export class KYCCompanyTypeComponent extends AppComponentBase implements OnInit {

  @Input() companyTypeSelected: CompanyType;
  @Output() onComplete: EventEmitter<CompanyType> = new EventEmitter();
  @ViewChild('companyType') companyType: Dropdown;

  companyStatus = CompanyStatus.Register;
  companyTypes: SelectItem[];
  feedback: string;
  isLoaded = false;

  companyTypeForm = this._formBuilder.group({
    'companyType': new FormControl('', Validators.required),
  });

  constructor(
    injector: Injector,
    private _formBuilder: FormBuilder
  ) {
    super(injector);
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.companyTypes = this.buildCompoanyTypeSelect();
    this.isLoaded = true;
  }

  save() {
    if (this.companyTypeForm.invalid) {
      this.validateForm(this.companyTypeForm);
    } else {
      this.onComplete.emit(this.companyTypeSelected);
    }
  }

  private validateForm(formGroup: FormGroup): boolean {
    let firstElement = false;
    let validate = true;
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      let tempElement;
      if (control.enabled) {
        if (!control.valid) {
          control.markAsDirty();
          //console.log(field);
          //console.log(this[field]);
          validate = false;
          if (!firstElement) {
            if (this?.[field]?.el !== undefined) {
              tempElement = this[field].el.nativeElement.parentElement.parentElement.parentElement;
              tempElement?.scrollIntoView({ behavior: 'smooth' });
            } else if (this?.[field]?.inputViewChild !== undefined) {
              tempElement = this[field].inputViewChild.nativeElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
              tempElement?.scrollIntoView({ behavior: 'smooth' });
            } else if (this?.[field] !== undefined) {
              tempElement = this[field].nativeElement.parentElement.parentElement.parentElement;
              tempElement?.scrollIntoView({ behavior: 'smooth' });
            }
            firstElement = true;
          }
        }
      }
    });
    return validate;
  }

  private buildCompoanyTypeSelect(): any[] {
    let results = [];
    // eslint-disable-next-line guard-for-in
    for (const type in CompanyType) {
      if (!isNaN(Number(type))) {
        let item = { 'label': this.l(CompanyType[type]), 'value': type };
        results.push(item);
      }
    }
    return results;
  }

}
