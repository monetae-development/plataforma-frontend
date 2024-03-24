import { Component, Injector, ViewEncapsulation, OnInit, AfterViewInit, ViewChild, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AppComponentBase } from '@shared/common/app-component-base';
import { GetSelectIntDto } from '@shared/service-proxies/dto/Common/SelectInput/GetSelectIntDto';
import { CompanyInfoDto } from '@shared/service-proxies/dto/Company/KycPersonShareholder/CompanyInfoDto';
import { SelectItem } from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import { appModuleAnimation } from '@shared/animations/routerTransition';

@Component({
  selector: 'kyc-companyInfo-form',
  templateUrl: './kycCompanyInfo.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: [appModuleAnimation()]
})
export class KYCCompanyInfoComponent extends AppComponentBase implements OnInit, AfterViewInit {
  @Input() companyInfoDto: CompanyInfoDto;
  @Input() countries: SelectItem[];
  @Input() phoneCodes: SelectItem[];
  @Input() phoneCodeFlags: GetSelectIntDto[];
  @Output() onComplete: EventEmitter<CompanyInfoDto> = new EventEmitter();
  @Output() onSetData: EventEmitter<CompanyInfoDto> = new EventEmitter();
  @Output() onBack: EventEmitter<number> = new EventEmitter();

  @ViewChild('fiscalConstitutionCountry') fiscalConstitutionCountry: Dropdown;
  @ViewChild('phone1CodeId') phone1CodeId: Dropdown;

  //flags: GetSelectIntDto[] = [];
  feedback: string;
  isLoaded = false;

  companyInfoForm = this._formBuilder.group({
    'legalName': new FormControl('', Validators.required),
    'commercialName': new FormControl('', Validators.required),
    'nit': new FormControl('', Validators.required),
    'fiscalNoId': new FormControl('', Validators.required),
    'fiscalConstitutionCountry': new FormControl('', Validators.required),
    'fiscalConstitutionDate': new FormControl('', Validators.required),
    'phone1CodeId': new FormControl('', Validators.required),
    'phone1': new FormControl('', Validators.required),
  });

  private _countriesLoaded = false;

  constructor(
    injector: Injector,
    private _formBuilder: FormBuilder
  ) {
    super(injector);
  }

  set isCountriesLoaded(value: boolean) {
    if (value) {
      this.fiscalConstitutionCountry.disabled = false;
    } else {
      this.fiscalConstitutionCountry.disabled = true;
    }
  }

  set isPhoneCodesLoaded(value: boolean) {
    if (value) {
      this.phone1CodeId.disabled = false;
    } else {
      this.phone1CodeId.disabled = true;
    }
  }

  ngOnInit() {
    this.load();
  }

  ngAfterViewInit() {
    if (this.companyInfoDto.fiscalConstitutionCountryId === undefined) {
      this.fiscalConstitutionCountry.disabled = true;
    }

    if (this.companyInfoDto.phone1CodeId === undefined) {
      this.phone1CodeId.disabled = true;
    }
  }

  load() {
    this.isLoaded = true;
  }

  save() {
    if (this.companyInfoForm.invalid) {
      this.validateForm(this.companyInfoForm);
    } else {
      this.onComplete.emit(this.companyInfoDto);
    }
  }

  backStep(): void {
    this.onSetData.emit(this.companyInfoDto);
    this.onBack.emit();
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

}
