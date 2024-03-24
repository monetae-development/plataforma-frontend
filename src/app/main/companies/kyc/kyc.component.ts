import { AppConsts } from '@shared/AppConsts';
import { Component, Injector, ViewEncapsulation, OnInit, ViewChild, AfterViewInit, Input, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifyService } from 'abp-ng2-module';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { SessionServiceProxy, CurrentUserProfileEditDto, ProfileServiceProxy } from '@shared/service-proxies/service-proxies';
import { ServiceCommonProxy } from '@shared/service-proxies/service-common-proxies';
import { KYCCompanyTypeComponent } from './components/form-step-0/kycCompanyType.component';
import { KYCCompanyInfoComponent } from './components/01-PersonShareholder/kycCompanyInfo/kycCompanyInfo.component';
import { CompanyInfoDto } from '@shared/service-proxies/dto/Company/KycPersonShareholder/CompanyInfoDto';
import { GetSelectIntDto } from '@shared/service-proxies/dto/Common/SelectInput/GetSelectIntDto';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PrimeNGConfig } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import { RadioButton } from 'primeng/radiobutton';
import { FileUpload } from 'primeng/fileupload';
import { DialogService } from 'primeng/dynamicdialog';
import * as _ from 'lodash';
import { DateTime } from 'luxon';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { EventEmitter } from 'stream';
import { environment } from 'environments/environment';
import { CompanyStatus } from '@shared/service-proxies/enum/Company/CompanyStatus.enum';
import { CompanyType } from '@shared/service-proxies/enum/Company/CompanyType.enum';

@Component({
  selector: 'company-kyc',
  templateUrl: './kyc.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: [appModuleAnimation()],
  providers: [DialogService],
})
export class CompanyKycComponent extends AppComponentBase implements OnInit, AfterViewInit {
  @ViewChild('kycCompanyType') kycCompanyType: KYCCompanyTypeComponent;
  @ViewChild('kycCompanyInfo') kycCompanyInfo: KYCCompanyInfoComponent;

  countries: SelectItem[];
  phoneCodes: SelectItem[];
  phoneCodeFlags: GetSelectIntDto[] = [];
  companyStatus = CompanyStatus.Register;
  _companyStatus = CompanyStatus;
  feedback: string;

  companyTypeSelected: CompanyType;
  companyInfoDto: CompanyInfoDto;

  stepCompanyType = true;
  stepPSCompanyInfo = false;

  constructor(
    injector: Injector,
    private _serviceCommonProxy: ServiceCommonProxy,
    private _router: Router,
    private _notifyService: NotifyService,
    private _tokenAuth: TokenAuthServiceProxy,
    private _activatedRoute: ActivatedRoute,
    private _primeConfig: PrimeNGConfig,
    private _formBuilder: FormBuilder,
    private _dateTimeService: DateTimeService,
  ) {
    super(injector);
    this.companyInfoDto = new CompanyInfoDto();
  }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }

  companyTypeStepComplete(companyType: CompanyType) {
    this.companyTypeSelected = companyType;
    this.goStep(1);
  }

  companyInfoSetData(data: CompanyInfoDto) {
    this.companyInfoDto = data;
  }

  companyInfoStepComplete(data: CompanyInfoDto) {
    this.companyInfoDto = data;
    this.goStep(2);
  }

  loadCountries() {
    if (this.countries === undefined) {
      this._serviceCommonProxy.getSelectOptions('MntMemberDataComplements/GetAllContriesForSelect', null).subscribe((result) => {
        this.countries = result.items;
        this.kycCompanyInfo.isCountriesLoaded = true;
      });
    }
  }

  locadPhoneCodes() {
    if (this.phoneCodes === undefined) {
      this._serviceCommonProxy.getSelectOptions('MntMemberDataComplements/GetAllCountryPhoneCodesForSelect', null).subscribe((result) => {
        this.phoneCodes = result.items;
        this.phoneCodeFlags = this.setFlagsOptions(result.items);
        this.kycCompanyInfo.isPhoneCodesLoaded = true;
      });
    }
  }

  goStep(step: number): void {
    switch (step) {
      case 0:
        // eslint-disable-next-line eqeqeq
        if (this.companyTypeSelected == CompanyType.PersonShareholder) {
          this.stepCompanyType = true;
          this.stepPSCompanyInfo = false;
        } else {

        }
        break;
      case 1:
        // eslint-disable-next-line eqeqeq
        if (this.companyTypeSelected == CompanyType.PersonShareholder) {
          this.loadCountries();
          this.locadPhoneCodes();
          this.stepCompanyType = false;
          this.stepPSCompanyInfo = true;
        } else {

        }
        break;
    }
  }

  private setFlagsOptions(items: any): GetSelectIntDto[] {
    let flags = [];
    for (const record of items) {
      let temp = new GetSelectIntDto();
      temp.value = record.value;
      temp.label = record.label;
      temp.subtitle = record.subtitle;
      flags[record.value] = temp;
    }
    return flags;
  }

}
